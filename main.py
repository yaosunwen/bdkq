import asyncio
import contextlib
import json
import random
import sys
from functools import wraps
import time
from itertools import groupby
from json import JSONDecodeError

from datetime import datetime, date, timedelta
from pathlib import Path
from types import SimpleNamespace
from typing import Callable, Any, List

import yaml

from crypto import md5, sm3, sm4_decrypt, sm4_encrypt, base64_encode

import aiohttp

app_home_path = str(Path(__file__).parent)
app_config: Any
httpclient: aiohttp.ClientSession


def get_nonce() -> str:
    n = "0123456789abcdef"
    t = random.choices(n, k=36)

    t[14] = "4"
    t[19] = n[3 & ord(t[19]) | 8]
    t[8] = t[13] = t[18] = t[23] = "-"

    return "".join(t)


def get_timestamp() -> int:
    return int(time.time() * 1000)


def get_random_hex_string() -> str:
    return '{0:x}{1:06x}{2:04x}{3:06x}'.format(
        int(time.time()),
        int(16777215 * random.random()),
        int(65535 * random.random()),
        int(16777215 * random.random()))


def get_rid() -> str:
    return md5(app_config.access_token)[8:24].lower() + "#" + md5(get_random_hex_string())[8:24].lower()


def get_sm4_key(x_sign: str) -> str:
    text = "".join(reversed(x_sign + ":" + app_config.api_secret))
    # print(text)
    hash = sm3(text)
    hash = hash[24:40]
    l = list(hash)
    for i in range(8):
        t = l[i * 2]
        l[i * 2] = l[i * 2 + 1]
        l[i * 2 + 1] = t
    return "".join(l)


def decrypt_response(encrypt_text: str, x_sign: str) -> str:
    key = get_sm4_key(x_sign)
    return sm4_decrypt(encrypt_text, key)


def to_unicode(text: str) -> str:
    return ''.join(c if ord(' ') <= ord(c) < 127 else '\\u{0:04x}'.format(ord(c)) for c in text)


def get_sign(params: dict, data: dict | str, nonce: str, timestamp: int) -> str:
    arr = []
    if params:
        for key in sorted(params.keys()):
            if params[key] is None:
                continue
            if not str(params[key]):
                continue
            arr.append(to_unicode(key) + "=" + to_unicode(str(params[key])))
    if data:
        if isinstance(data, dict):
            data = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
            # data = json.dumps(data, ensure_ascii=False)
        arr.append(to_unicode(str(data)))

    arr.append("requesttime=" + str(timestamp))
    arr.append("requestotp=" + nonce)
    arr.append("secret=" + app_config.api_secret)
    u = "&".join(arr)

    c = sm3(str(timestamp) + "##" + app_config.api_secret)
    d = sm3(nonce + "##" + app_config.api_secret)
    l = base64_encode(u)
    sign = sm3("[" + c + "#" + sm3(l) + "#" + d + "]")
    return sign


def test_sign():
    assert get_sign({"distCode": 0, "deptCode": 39},
                    None,
                    "4b30a59e-697f-40fd-a2a8-e964a7684fdd",
                    1753106095355) == "a4532a66439d0336cd6a5d535a182b3b30e69026e7a0fca32e3478c16aa8c424"


def test_crypt():
    sign = "25742cee973e02205d155e7b539113dd56eefdae80b044aab4cbf3738c8e8140"
    req_data = "e21745721d5cd0fa054a3bbcd21d8275fe80755ff3d45a53da46d8500d140d9d07e325613190a5f2070ab1d4e9c7ca7b9b24a67be2a28fa3005f721aba9eed739cadcd0d2edf301b62318fac07219f03b86280051d018f9010ae8f1d8bbdc82b073129c2dd2eb40f0065637689fb452642305b3f43eadde52e8d163e7f636c2aa14fa885cdb925863cc3e633c3403f55"
    resp_data = "e025a1600dc22f2ad15396fcd900ec8acbdd14df6d4cb2418dd99870bfd1922109252c7c69dc94ada22ff6ebf5b46737669c655ef073e587cd516a9be14e5bd4"

    req = sm4_decrypt(req_data, sign[24:40])
    assert req == r'{"code":"0e13crHa16K0XJ06DlGa1hji9I23crHE","gzhCode":"091J5TGa1uQyXJ0olEGa1Jd8xJ0J5TGJ","loginDevice":"google;android 11;WeChat 8.0.61"}'
    assert sm4_encrypt(req, sign[24:40]) == req_data

    assert decrypt_response(resp_data, sign) == '{\n  "status" : 504,\n  "message" : "service timeout"\n}'


def replace_response_json(response: aiohttp.ClientResponse):
    original_json = response.json
    content = None

    @wraps(original_json)
    async def json_wrapper(*args, **kwargs):
        nonlocal content
        if content is not None:
            return content
        try:
            content = await original_json(*args, **kwargs)
        except JSONDecodeError as e:
            print(f'JSONDecodeError on {response.request_info.url}\n{response.text()[:1024]}', file=sys.stderr)
            raise e
        if bool(response.headers.get("cipher", False)) and "data" in content:
            content = decrypt_response(content["data"], response.request_info.headers["signature"])
            print(datetime.now().time(), response.request_info.headers['request_time'], 'decrypt ',
                  response.request_info.url, content)
            content = json.loads(content)
            return content
        return content

    response.json = json_wrapper
    return response


def wrap_http_method(func: Callable[..., aiohttp.ClientResponse]):
    @wraps(func)
    @contextlib.asynccontextmanager
    async def wrapper(url, *args, **kwargs):
        kwargs.setdefault("headers", {})
        headers = kwargs.get("headers")

        params = kwargs.get("params")
        data = kwargs.get("data")

        if data is None:
            data = kwargs.get("json")
            if data is not None:
                kwargs.pop("json")
                data = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
                kwargs["data"] = data
                headers["Content-Type"] = "application/json"

        timestamp = kwargs.pop("timestamp", get_timestamp())
        nonce = kwargs.pop("nonce", get_nonce())

        sign = get_sign(params, data, nonce, timestamp)
        headers["signature"] = sign
        headers["request_otp"] = nonce
        headers["request_time"] = str(timestamp)
        headers["access_token"] = app_config.access_token
        headers["rid"] = get_rid()
        headers.setdefault("Charset", "utf-8")
        headers.setdefault("Referer", app_config.referer)
        headers.setdefault("Accept-Encoding", "gzip, deflate, br")

        encrypt_data = sm4_encrypt(kwargs["data"], sign[24:40])
        kwargs["data"] = json.dumps({"data": encrypt_data}, ensure_ascii=False, separators=(',', ':'))
        headers["Content-Type"] = "application/json"

        print(datetime.now().time(), timestamp, 'request ', url, kwargs)
        async with func(url, *args, **kwargs) as response:
            print(datetime.now().time(), timestamp, 'response', response.request_info.url, await response.text())
            response.raise_for_status()

            if hasattr(response, 'json'):
                response = replace_response_json(response)
                response_json = await response.json()
                # {'status': 1000, 'message': '未登录或登录过期'}
                # {'status': 1000, 'message': '访问受限'}
                if response_json.get("status") == 1000:
                    raise StopException(response_json["message"])
                    # await asyncio.sleep(1)
                    # init()
                    # raise RetryException(0.001)

            yield response

    return wrapper


def load_login_data():
    with open(f"{app_home_path}/login.json", "r") as f:
        return json.load(f)


def load_auth_data():
    with open(f"{app_home_path}/auth.json", "r") as f:
        return json.load(f)


def load_app_config():
    with open(f"{app_home_path}/appconfig.yml", "r") as f:
        return yaml.load(f, Loader=yaml.FullLoader)


def init():
    global app_config
    app_config = SimpleNamespace(**load_app_config())

    auth_data = load_auth_data()
    app_config.version = auth_data["version"]
    app_config.access_token = auth_data["access_token"]

    # login_data = load_login_data()
    # sign = login_data["request"]["headers"]["signature"]
    # encrypt = login_data["response"]["body"]["data"]
    # version = login_data["response"]["headers"]["x-version"]
    # print("set version:", version)
    # text = decrypt_response(encrypt, sign)
    # content = json.loads(text)
    # print(content)
    # access_token = content['data']["accessToken"]
    # print("set access token:", access_token)


class RetryException(Exception):
    def __init__(self, interval: float = None, *args, **kwargs):
        super().__init__(*args)
        self.interval = interval


def retry(retry_times: int, interval: float):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            count = 0
            last_error = None
            while retry_times <= 0 or count < retry_times:
                sleep_time = interval
                try:
                    count += 1
                    return await func(*args, **kwargs)
                except RetryException as e:
                    if e.interval is not None:
                        sleep_time = e.interval
                except aiohttp.ClientResponseError as e:
                    last_error = e
                except aiohttp.ClientConnectionError as e:
                    last_error = e
                except aiohttp.ServerTimeoutError as e:
                    last_error = e

                if count == retry_times:
                    raise last_error

                await asyncio.sleep(sleep_time)

        return wrapper

    return decorator


def concurrent(max_workers: int):
    def decorator(func):
        semaphore = asyncio.Semaphore(max_workers)

        @wraps(func)
        async def wrapper(*args, **kwargs):
            async with semaphore:
                return await func(*args, **kwargs)

        return wrapper

    return decorator


@retry(-1, 0.5)
async def get_department_list(**kwargs):
    url = f"{app_config.url_prefix}@{app_config.version}/api/appointmentInfo/getTodayDeptList"
    params = {
        "tapIndex": "0"
    }
    async with httpclient.get(url, params=params, **kwargs) as response:
        content = await response.json()
        if "data" in content:
            return content["data"]["lists"]
        elif "message" in content:
            raise Exception(content["message"])


@retry(-1, 0.5)
async def get_yy_department_list(**kwargs):
    url = f"{app_config.url_prefix}@{app_config.version}/api/appointmentInfo/getYyDeptList"
    params = {
        "tapIndex": "0"
    }
    async with httpclient.get(url, params=params, **kwargs) as response:
        content = await response.json()
        if "data" in content:
            return content["data"]["lists"]
        elif "message" in content:
            raise Exception(content["message"])


@concurrent(5)
@retry(-1, 0.5)
async def get_doctor_list(department_id: int, tap_index: int, **kwargs):
    url = f"{app_config.url_prefix}@{app_config.version}/api/appointmentInfo/getDoctorList"
    payload = {
        "deptCode": str(department_id),
        "tapIndex": str(tap_index)
    }
    async with httpclient.post(url, json=payload, **kwargs) as response:
        content = await response.json()
        if "data" in content:
            return content["data"]
        elif content.get("status") == -1 and content.get("message") == "查询医生信息失败":
            raise RetryException(1)
        elif "message" in content:
            raise Exception(content["message"])


@concurrent(5)
@retry(-1, 0.5)
async def get_yy_doctor_list(department_id: int, tap_index: int, appointment_date: date, **kwargs):
    url = f"{app_config.url_prefix}@{app_config.version}/api/appointmentInfo/getYyDoctorList"
    payload = {
        "time": appointment_date.strftime("%Y-%m-%d"),
        "deptCode": str(department_id),
        "tapIndex": str(tap_index)
    }
    async with httpclient.post(url, json=payload, **kwargs) as response:
        content = await response.json()
        if "data" in content:
            return content["data"]
        elif content.get("status") == -1 and content.get("message") == "查询医生信息失败":
            raise RetryException(1)
        elif content.get("status") == 1 and content.get("message") == "即将放号":
            raise RetryException(1)
        elif "message" in content:
            raise RetryException()
        else:
            raise RetryException()


@concurrent(5)
@retry(100, 0.5)
async def get_schedule_list(department_id: int, tap_index: int, doctor_id: int, **kwargs):
    url = f"{app_config.url_prefix}@{app_config.version}/api/appointmentInfo/getScheduleList"
    payload = {
        "deptId": str(department_id),
        "doctId": str(doctor_id),
        "tapIndex": str(tap_index)
    }
    async with httpclient.post(url, json=payload, **kwargs) as response:
        content = await response.json()
        if "data" in content:
            return content["data"]
        raise RetryException()


@concurrent(5)
@retry(100, 0.5)
async def get_yy_schedule_list(department_id: int, tap_index: int, doctor_id: int, appointment_date: date, **kwargs):
    url = f"{app_config.url_prefix}@{app_config.version}/api/appointmentInfo/getYyScheduleList"
    payload = {
        "time": appointment_date.strftime("%Y-%m-%d"),
        "deptId": str(department_id),
        "doctId": str(doctor_id),
        "tapIndex": str(tap_index)
    }
    async with httpclient.post(url, json=payload, **kwargs) as response:
        content = await response.json()
        if "data" in content:
            return content["data"]
        raise RetryException()


@concurrent(1)
@retry(-1, 0.5)
async def submit_order(patient_id: int, schedule_id: str, appointment_date: date, department_id: int, sgu_id: str,
                       dist: str,
                       **kwargs):
    url = f"{app_config.url_prefix}@{app_config.version}/api/appointmentRecord/todayAppointmentCreateOrder"
    payload = {
        "patientId": str(patient_id),
        "scheduleId": str(schedule_id),
        "visitDate": appointment_date.strftime("%Y-%m-%d"),
        "deptId": str(department_id),
        "sguId": str(sgu_id),
        "dist": str(dist)
    }
    async with httpclient.post(url, json=payload, **kwargs) as response:
        content = await response.json()
        return content


@concurrent(1)
@retry(-1, 0.5)
async def submit_yy_order(patient_id: int, schedule_id: str, appointment_date: date, department_id: int, sgu_id: str,
                          dist: str,
                          **kwargs):
    url = f"{app_config.url_prefix}@{app_config.version}/api/appointmentRecord/yyAppointmentCreateOrder"
    payload = {
        "patientId": str(patient_id),
        "scheduleId": str(schedule_id),
        "visitDate": appointment_date.strftime("%Y-%m-%d"),
        "deptId": str(department_id),
        "sguId": str(sgu_id),
        "dist": str(dist)
    }
    async with httpclient.post(url, json=payload, **kwargs) as response:
        content = await response.json()

        if content.get("status") == 0 and content.get("message") == "预约成功":
            print("$" * 80)
            print("预约成功:", content)
            print()
            raise StopException(content.get("message"))

        # {"status":-2,"message":"您有未支付的订单，请前往支付"}
        if content.get("status") == -2:
            raise StopException(content.get("message"))

        # {"status":-3,"message":"您本周已经约号超过3个，请于下周再次挂号","data":[...]}
        if content.get("status") == -3:
            raise StopException(content.get("message"))

        print("预约失败:", content)
        raise RetryException()

        # return content


async def get_order_list(patient_id: int, **kwargs):
    url = f"{app_config.url_prefix}@{app_config.version}/api/appointmentRecord/getAppointmentRecord"
    params = {
        "page": 0,
        "size": 10,
        "patientId": patient_id,
        "startTime": "2025-07-13 00:00:00",
        "endTime": "2025-07-20 23:59:59",
        "businessStatus": "",
        "visitDateStart": "",
        "visitDateEnd": ""
    }
    async with httpclient.get(url, params=params, **kwargs) as response:
        content = await response.json()
        if "data" in content:
            return content["data"]["lists"]
        elif "message" in content:
            raise Exception(content["message"])


class StopException(Exception):
    pass


async def wait_for_success(tasks: List[asyncio.Task]):
    try:
        pending = set(tasks)
        while len(pending) > 0:
            done, pending = await asyncio.wait(pending, return_when=asyncio.FIRST_COMPLETED)
            for task in done:
                if isinstance(task.exception(), StopException):
                    raise task.exception()
                if task.exception() is None:
                    return task.result()
    finally:
        for task in tasks:
            if not task.done() and not task.cancelled():
                task.cancel()


async def try_doctor(mode: str,
                     patient_id: int,
                     department_id: int,
                     tap_index: int,
                     doctor_id: int,
                     doctor_name: str,
                     appointment_date: date):
    print("try_doctor", mode, doctor_name)
    if mode == "yy":
        schedule_list = await wait_for_success([
            asyncio.create_task(get_yy_schedule_list(department_id,
                                                     tap_index,
                                                     doctor_id,
                                                     appointment_date))
            for i in range(5)
        ])
    else:
        schedule_list = await wait_for_success([
            asyncio.create_task(get_schedule_list(department_id,
                                                  tap_index,
                                                  doctor_id))
            for i in range(5)
        ])

    if schedule_list is None:
        schedule_list = []
    print("-" * 40, "schedule", "-" * 40)
    for schedule in schedule_list:
        print(schedule)
    print()

    schedule_list = [schedule for schedule in schedule_list
                     if int(schedule["numbers"]) > 0
                     ]
    if len(schedule_list) == 0:
        print(f"{doctor_name}没有可预约的排班")
        return

    schedule_list = sorted(schedule_list, key=lambda s: int(s["numbers"]), reverse=True)

    for schedule in schedule_list:
        if mode == "yy":
            await submit_yy_order(patient_id,
                                  schedule["scheduleId"],
                                  date.fromtimestamp(schedule["visitDate"] / 1000),
                                  schedule["deptId"],
                                  schedule["sguID"],
                                  schedule["dist"])
        else:
            await submit_order(patient_id,
                               schedule["scheduleId"],
                               date.fromtimestamp(schedule["visitDate"] / 1000),
                               schedule["deptId"],
                               schedule["sguID"],
                               schedule["dist"])


@retry(100, 1)
async def try_department(mode: str,
                         patient_id: int,
                         department_id: int,
                         tap_index: int,
                         appointment_date: date):
    if mode == "yy":
        doctor_list = await wait_for_success([
            asyncio.create_task(get_yy_doctor_list(department_id,
                                                   tap_index,
                                                   appointment_date))
            for i in range(5)
        ])
    else:
        doctor_list = await wait_for_success([
            asyncio.create_task(get_doctor_list(department_id,
                                                tap_index))
            for i in range(5)
        ])

    if doctor_list is None:
        raise RetryException()

    print("=" * 40, "doctor", "=" * 40)
    for doctor in doctor_list:
        print(doctor)
    print()

    # doctor_list = doctor_list[0:3]
    doctor_list = [doctor for doctor in doctor_list
                   if doctor["numbers"] > 0
                   and doctor["doctId"] != "0"
                   and doctor["ygzc"] != "医师"
                   and doctor["ygzc"] != "主治医师"
                   ]

    if len(doctor_list) == 0:
        print("没有合适的医生")
        raise RetryException(5)

    def doctor_comparator(doctor):
        if doctor["ygzc"] == "知名专家":
            return 1
        elif doctor["ygzc"] == "主任医师":
            return 2
        elif doctor["ygzc"] == "副主任医师":
            return 3
        elif doctor["ygzc"] == "主治医师":
            return 4
        elif doctor["ygzc"] == "医师":
            return 5
        return 6

    doctor_list = sorted(doctor_list, key=doctor_comparator)
    for k, g in groupby(doctor_list, key=doctor_comparator):
        await wait_for_success([
            asyncio.create_task(try_doctor(mode,
                                           patient_id,
                                           department_id,
                                           tap_index,
                                           doctor["doctId"],
                                           doctor["doctName"],
                                           date.fromtimestamp(doctor["visitDate"] / 1000)))
            for doctor in g
        ])

    print("全部执行完毕")


async def main():
    global httpclient
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=False),
                                     headers={'User-Agent': app_config.user_agent}) as session:
        httpclient = session
        httpclient.get = wrap_http_method(httpclient.get)
        httpclient.post = wrap_http_method(httpclient.post)

        try:
            await try_department(app_config.mode,
                                 app_config.patient_id,
                                 app_config.department_id,
                                 app_config.tap_index,
                                 app_config.appointment_date)
        except StopException as e:
            print("Got Stopped", e)


if __name__ == "__main__":
    init()
    test_sign()
    test_crypt()
    asyncio.run(main())
