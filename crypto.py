import hashlib

from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64
from sm_crypto import sm3 as sm3crypto
from sm_crypto import sm4 as sm4crypto


# key长度只能为16或24或32，分别对应AES-128、AES-192、AES-256
def aes_encrypt(plaintext: str, key: str, iv: str,
                mode: int = AES.MODE_CBC,
                padding_style: str = "pkcs7",
                encoding="utf-8") -> str:
    # 将密钥编码为UTF-8格式的bytes
    key_bytes = key.encode(encoding)
    iv_bytes = iv.encode(encoding)
    # 创建AES对象
    cipher = AES.new(key_bytes, mode, iv=iv_bytes)
    # 将明文编码为UTF-8格式的bytes
    plaintext_bytes = plaintext.encode(encoding)
    # 为编码后的明文添加padding
    plaintext_bytes_padded = pad(plaintext_bytes, AES.block_size, padding_style)
    # 执行加密
    ciphertext_bytes = cipher.encrypt(plaintext_bytes_padded)
    # 将加密后的bytes进行base64编码
    # 注意：不能用encodebytes！否则会每76个字符增加一个换行符，见：https://docs.python.org/zh-cn/3/library/base64.html
    ciphertext_base64_bytes = base64.b64encode(ciphertext_bytes)
    # 将base64编码过的bytes，解码为Python中使用的字符串类型（即unicode字符串）
    ciphertext = ciphertext_base64_bytes.decode(encoding)
    return ciphertext


def aes_decrypt(ciphertext: str, key: str, iv: str,
                mode: int = AES.MODE_CBC,
                padding_style: str = "pkcs7",
                encoding="utf-8") -> str:
    # 将密钥编码为UTF-8格式的bytes
    key_bytes = key.encode(encoding)
    iv_bytes = iv.encode(encoding)
    # 创建AES对象
    decrypter = AES.new(key_bytes, mode, iv=iv_bytes)
    # 将密文编码为UTF-8格式的（同时也是base64编码的）bytes
    ciphertext_base64_bytes = ciphertext.encode(encoding)
    # 将base64编码的bytes，解码为原始的密文bytes
    ciphertext_bytes = base64.b64decode(ciphertext_base64_bytes)
    # 解码为明文
    plaintext_bytes_padded = decrypter.decrypt(ciphertext_bytes)
    # 去掉Padding
    plaintext_bytes = unpad(plaintext_bytes_padded, AES.block_size, padding_style)
    # 将UTF-8格式编码的明文bytes，解码为Python中的字符串类型（即unicode字符串）
    plaintext = plaintext_bytes.decode(encoding)
    return plaintext


def md5(text: str) -> str:
    """
    MD5 Hash加密
    :param text: 待加密消息
    :return: 加密后消息的hex字符串
    """
    return hashlib.md5(text.encode()).hexdigest()


def sm3(text: str) -> str:
    """
    SM3 Hash加密
    :param text: 待加密消息
    :return: 加密后消息的hex字符串
    """
    return sm3crypto.sm3_hash(text.encode())


def sm4_encrypt(plaintext: str, key: str,
                encoding="utf-8") -> str:
    """
    SM4加密
    :param plaintext: 未加密文本
    :param key: 密钥
    :param encoding: 未加密文本的编码
    :return: 加密后消息的hex字符串
    """
    sm4 = sm4crypto.CryptSM4(mode=sm4crypto.SM4_ENCRYPT)
    sm4.set_key(key.encode(encoding), sm4crypto.SM4_ENCRYPT)
    encrypt_bytes = sm4.crypt_ecb(plaintext.encode(encoding))
    return encrypt_bytes.hex()


def sm4_decrypt(ciphertext: str, key: str,
                encoding="utf-8") -> str:
    """
    SM4解密
    :param ciphertext: 密文，hex字符串形式
    :param key: 密钥
    :param encoding: 密文字符串的编码
    :return: 解密后的文本
    """
    encrypt_bytes = bytes.fromhex(ciphertext)
    sm4 = sm4crypto.CryptSM4(mode=sm4crypto.SM4_DECRYPT)
    sm4.set_key(key.encode(encoding), sm4crypto.SM4_DECRYPT)
    plaintext = sm4.crypt_ecb(encrypt_bytes).decode(encoding)
    return plaintext


def base64_encode(text: str,
                  encoding="utf-8") -> str:
    return base64.b64encode(text.encode(encoding)).decode(encoding)


def base64_decode(text: str,
                  encoding="utf-8") -> str:
    return base64.b64decode(text.encode(encoding)).decode(encoding)
