var _define_property = require("../@babel/runtime/helpers/defineProperty"),
 _typeof = require("../@babel/runtime/helpers/typeof"),
 _vendor_js = require("../common/vendor.js"), 
 _url = require("./url.js"), 
 _util = require("../utils/util.js"), 
 _base_config = require("../service/baseConfig.js"), 
 _crypto_js = require("../utils/crypto-js.js"), 
 btoa = require("../utils/base64.min.js").btoa, 
 _app = getApp(), 
 _api_secret = _app.globalData.apiSecret;

function d() {
    return new Promise(function(t, n) {
        if (_util.util.isDesktop()) n({
            message: "Access Denied"
        }); else {
            var i = _vendor_js.index.getDeviceInfo(), a = _vendor_js.index.getAppBaseInfo();
            i.hostName = a.hostName, i.hostVersion = a.hostVersion, console.log("deviceInfo:", i), 
            console.log("appBaseInfo:", a), console.log("客户端：" + i.deviceBrand + ";" + i.osName + " " + i.osVersion + ";" + i.hostName + " " + i.hostVersion), 
            _vendor_js.index.login({
                success: function(e) {
                    var a = {
                        loading: !0,
                        method: "POST",
                        data: {
                            code: e.code,
                            gzhCode: _app.globalData.gzhCode,
                            loginDevice: i.deviceBrand + ";" + i.osName + " " + i.osVersion + ";" + i.hostName + " " + i.hostVersion
                        },
                        url: _url.url.login,
                        header: new_request_headers()
                    };
                    return send_request(a).then(function(e) {
                        if (console.log("登录返回：", e), 0 == e.status) return e.data.init && _util.util.clearStorage(), 
                        l(e.data), _app.globalData.gzhCode = "", void t(e);
                        n(e);
                    }).catch(function(t) {
                        n(t);
                    });
                },
                fail: function(t) {
                    n(t);
                }
            });
        }
    });
}

function l(t) {
    _app.globalData.sessionKey = t.sessionKey || "", _app.globalData.accessToken = t.accessToken || "", 
    _vendor_js.index.setStorageSync("accessToken", t.accessToken), _app.globalData.registered = t.registered || !1, 
    _app.globalData.cardInfo = t.cardInfo || [], _app.globalData.subscribeWeb = t.subscribeWeb || !1, 
    _app.globalData.newLoginVo = t.newLoginVo || null, _util.util._isNotEmpty(t.newLoginVo) && (_base_config.baseConfig.bindPatients = t.newLoginVo.bindPatients, 
    console.log("新patient", _base_config.baseConfig.bindPatients), _base_config.baseConfig.imLoginInfo = t.newLoginVo.imLoginVo, 
    _base_config.baseConfig.isLoginIm = !_util.util._isEmpty(t.newLoginVo.imLoginVo), _vendor_js.index.setStorageSync("realName", t.newLoginVo.realName), 
    _vendor_js.index.setStorageSync("userInfo", t.newLoginVo.realUser), _vendor_js.index.setStorageSync("nickName", t.newLoginVo.nickName), 
    _vendor_js.index.setStorageSync("phoneNo", t.newLoginVo.phoneNo), _vendor_js.index.setStorageSync("nickName", t.newLoginVo.nickName), 
    _vendor_js.index.setStorageSync("phoneNo", t.newLoginVo.phoneNo), _vendor_js.index.setStorageSync("imLoginInfo", t.newLoginVo.imLoginVo));
}

function new_request_headers() {
    return {
        "Content-Type": "application/json",
        access_token: _vendor_js.index.getStorageSync("accessToken") || ""
    };
}

function h(t, n, r, o) {
    return t && _vendor_js.index.showLoading({
        title: "努力上传中...",
        mask: !0
    }), new Promise(function(i, a) {
        var u = {
            method: "POST",
            contentType: "multipart/form-data"
        };
        u.data = o.formData || {}, u.header = r, u.filePath = o.filePath, u.name = o.name, 
        u.url = n, fill_common_headers(u);
        var s = _app.globalData.apiDomain + _app.globalData.service;
        _app.globalData.shake && -1 == n.indexOf("/online") && -1 == n.indexOf("/common") && (s += "@" + _app.globalData.version), 
        _vendor_js.index.uploadFile({
            url: s + n,
            header: u.header,
            method: u.method,
            formData: u.data,
            name: u.name || "file",
            filePath: u.filePath || "",
            success: function(n) {
                console.log("上传文件反参：", n);
                var r = decrypt_response(u, n);
                console.log("上传文件反参解密：", r), i(r), t && _vendor_js.index.hideLoading();
            },
            fail: function(n) {
                console.log(n, "系统异常"), a({
                    message: "系统异常~"
                }), t && _vendor_js.index.hideLoading();
            }
        });
    });
}

var send_request = function(req) {
    req.contentType = (req.header || {})["content-type"] || "application/json", fill_common_headers(req);
    var n = _app.globalData.apiDomain + _app.globalData.service;
    _app.globalData.shake && -1 == req.url.indexOf("/online") && -1 == req.url.indexOf("/common") && (n += "@" + _app.globalData.version);
    var r = n + req.url, i = req.method || "POST", a = req.data || {}, u = req.header;
    _vendor_js.index.getStorageSync("accessToken") && (u.access_token = _vendor_js.index.getStorageSync("accessToken")), 
    req.loading && _vendor_js.index.showLoading({
        title: "加载中...",
        mask: !0
    });
    var s = m(u.signature.substring(24, 40));
    return new Promise(function(n, l) {
        _vendor_js.index.request({
            url: r,
            method: i,
            header: u,
            responseType: req.responseType || "text",
            data: _app.globalData.isSecret && "POST" == i.toUpperCase() ? {
                data: _vendor_js.SMCrypto.sm4.encrypt(JSON.stringify(a), s)
            } : a,
            success: function(r) {
                var i = decrypt_response(req, r);
                200 == r.statusCode ? 1e3 == i.status ? d().then(function(e) {
                    0 == e.status ? send_request(req, !1).then(function(t) {
                        n(t);
                    }).catch(function(t) {
                        l(t);
                    }) : l(e);
                }) : 1001 == i.status ? (_util.util._setStorage("out-of-service", i.message), _vendor_js.index.reLaunch({
                    url: "/pages/out-of-service/index"
                })) : n(i) : l(i);
            },
            fail: function(t) {
                console.log("接口原始输出err：", t), l(t);
            },
            complete: function() {
                req.loading && _vendor_js.index.hideLoading();
            }
        });
    });
}, fill_common_headers = function(request) {
    request.url.indexOf("/wechat/login") >= 0 && (_app.globalData.version = "default");
    var params = get_params(request.url), data = "", data = request.data;
    if (!_is_empty(data)) {
        var method = request.method.toLowerCase(), content_type = request.contentType.toLowerCase();
        "get" == method || "post" == method && ("application/x-www-form-urlencoded" == content_type || "application/octet-stream" == content_type || content_type.startsWith("multipart/form-data"))
         ? "object" == _typeof(data) ? Object.assign(params, data) : Object.assign(params, get_params("?" + data))
         : data = JSON.stringify(data);
    }
    var request_time = new Date().getTime(), request_otp = request_otp(), signature = signature(params, data, request_otp, request_time), headers = request.header || {};
    (_is_empty(request.auth) || request.auth) && (headers = Object.assign(headers, {
        access_token: _vendor_js.index.getStorageSync("accessToken") || ""
    })), Object.assign(headers || {}, {
        request_otp: request_otp,
        request_time: request_time,
        signature: signature,
        rid: rid()
    }), request.header = headers;
}, m = function(t) {
    return unescape(encodeURIComponent(t)).split("").map(function(t) {
        return t.charCodeAt();
    });
}, _is_empty = function(t) {
    return null == t || null == t || "" == t.toString().trim() || "null" == t.toString().trim().toLowerCase() || "undefined" == t.toString().trim().toLowerCase() || "{}" == JSON.stringify(t) || "[]" == JSON.stringify(t);
}, get_params = function(n) {
    var e = new Object();
    if (_is_empty(n)) return e;
    var r = new RegExp("[?&][^&]+=?[^&]*", "g"), o = n.match(r);
    if (_is_empty(o)) return e;
    for (var i = 0; i < o.length; i++) {
        var a = o[i].substring(1).split("=");
        Object.assign(e, _define_property({}, a[0], 2 == a.length ? a[1] : ""));
    }
    return e;
}, rid = function() {
    var t = _vendor_js.index.getStorageSync("accessToken") || "";
    return _md5(t).substring(8, 24).toLowerCase() + "#" + _md5(_random_str()).substring(8, 24).toLowerCase();
}, _random_str = function() {
    return Math.floor(Date.now() / 1e3).toString(16) + Math.floor(16777215 * Math.random()).toString(16).padStart(6, "0") + Math.floor(65535 * Math.random()).toString(16).padStart(4, "0") + Math.floor(16777215 * Math.random()).toString(16).padStart(6, "0");
}, request_otp = function() {
    for (var t = [], n = "0123456789abcdef", e = 0; e < 36; e++) t[e] = n.substr(Math.floor(16 * Math.random()), 1);
    return t[14] = "4", t[19] = n.substr(3 & t[19] | 8, 1), t[8] = t[13] = t[18] = t[23] = "-", 
    t.join("");
};

exports.request_otp = request_otp;
exports.rid = rid;

var _md5 = function(t) {
    return _crypto_js.MD5(t).toString();
}, decrypt_response = function(t, r) {
    t.url.indexOf("/wechat/login") >= 0 && (_app.globalData.version = r.header["x-version"] || "default");
    var o, i = r.data;
    if ("object" != _typeof(i)) try {
        i = JSON.parse(i);
    } catch (t) {}
    if ("false" != (r.header.cipher || !1).toString()) {
        for (var a = t.header.signature || "", u = _vendor_js.SMCrypto.sm3((o = a + ":" + _api_secret, _is_empty(o) ? o : o.split("").reverse().join(""))).substring(24, 40).split(""), d = 0; d < u.length / 2; d++) {
            var l = u[2 * d];
            u[2 * d] = u[2 * d + 1], u[2 * d + 1] = l;
        }
        var f = u.join(""), h = m(f), g = i.data, p = _vendor_js.SMCrypto.sm4.decrypt(g, h);
        try {
            i = JSON.parse(p);
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            i = p;
        }
    }
    return i;/*params, data, request_otp, request_time*/
};
exports.decrypt_response = decrypt_response;

var signature = function(params, data, request_otp, request_time) {
    var i = new Array();
    Object.keys(params).sort().forEach(function(n) {
        var e = params[n];
        if (_not_empty_and_small(e)) {
            var r = _to_string_and_trim(e);
            i.push(_to_unicode(n) + "=" + _to_unicode(r));
        }
    })
    if (_not_empty_and_small(data)) {
        var a = _to_string_and_trim(data);
        i.push(_to_unicode(a));
    }
    i.push("requesttime=" + request_time),
    i.push("requestotp=" + request_otp), 
    i.push("secret=" + _api_secret);
    var u = i.join("&"), 
    c = _vendor_js.SMCrypto.sm3(request_time + "##" + _api_secret), 
    d = _vendor_js.SMCrypto.sm3(request_otp + "##" + _api_secret), 
    l = _base64(u);
    return _vendor_js.SMCrypto.sm3("[" + c + "#" + _vendor_js.SMCrypto.sm3(l) + "#" + d + "]");
};
exports.signature = signature;
// export default signature;
function _to_unicode(t) {
    for (var n = "", e = t.length, r = 0; r < e; ++r) {
        var o = t.charCodeAt(r), i = t.charAt(r);
        n += o >= " " && o < 127 ? i : "\\u".concat(o.toString(16).padStart(4, "0"));
    }
    return n;
}

var _not_empty_and_small = function(t) {
    var n = _to_string_and_trim(t).toLowerCase();
    return !_is_empty(n) && !O(n, [ "null", "undefined", "{}", "[]" ]) && n.length <= 2048;
}, _base64 = function(t) {
    for (var n = unescape(encodeURIComponent(t)).split("").map(function(t) {
        return t.charCodeAt();
    }), e = "", r = 0; r < n.length; r++) e += String.fromCharCode(n[r]);
    return btoa(e);
}, O = function(t, n) {
    var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if (e) {
        for (var r = !1, o = 0; o < n.length; o++) if (-1 != n[o].indexOf(t) || -1 != t.indexOf(n[o])) {
            r = !0;
            break;
        }
        return r;
    }
    return -1 != n.indexOf(t);
}, _to_string_and_trim = function(t) {
    return _to_string(t).trim();
}, _to_string = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    return function(t) {
        return null == t || null == t;
    }(t) ? e : "object" == _typeof(t) ? JSON.stringify(t) : t.toString();
};

exports.appointmentCancelByYb = function(t) {
    var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return new Promise(function(e, o) {
        var i = {
            loading: n,
            method: "post",
            data: t,
            url: _url.url.appointmentCancelByYb,
            header: new_request_headers()
        };
        return send_request(i).then(function(t) {
            e(t);
        }).catch(function(t) {
            o(t);
        });
    });
}, exports.beforeInHospitalPay = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.beforeInHospitalPay,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.bindHisAppointment = function(t) {
    var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return new Promise(function(e, o) {
        var i = {
            loading: n,
            method: "post",
            data: t,
            url: _url.url.bindHisAppointment,
            header: new_request_headers()
        };
        return send_request(i).then(function(t) {
            e(t);
        }).catch(function(t) {
            o(t);
        });
    });
}, exports.bindHisOutpatient = function(t, n) {
    return new Promise(function(e, o) {
        var i = {
            loading: t,
            method: "post",
            data: n,
            url: _url.url.bindHisOutpatient,
            header: new_request_headers()
        };
        return send_request(i).then(function(t) {
            e(t);
        }).catch(function(t) {
            o(t);
        });
    });
}, exports.bindUser = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.bindUser,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.bindUserNew = function(t) {
    return new Promise(function(n, e) {
        var i = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.bindUserNew,
            header: new_request_headers()
        };
        return send_request(i).then(function(t) {
            0 == t.code && _util.util.setBaseInfo(t), n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.cancelAppointment = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.cancelAppointment,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.cancelAppointmentSuccess = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.cancelAppointmentSuccess,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.cancelYyAppointment = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.cancelYyAppointment,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.consultApply = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.consultApply,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.consultCancel = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.consultCancel,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.consultDetail = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            url: _url.url.consultDetail + "/" + t,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.consultOrder = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.consultOrder,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.consultPage = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.consultPage,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.consultReview = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.consultReview,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.createArchive = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.createArchive,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.drugSpecification = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.drugSpecification,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.fileUpload = function(t, n) {
    return new Promise(function(e, o) {
        return h(t, _url.url.fileUpload, new_request_headers(), n).then(function(t) {
            e(t);
        }).catch(function(t) {
            o(t);
        });
    });
}, exports.fileUploadNew = function(t, n) {
    return new Promise(function(e, o) {
        return h(t, _url.url.fileUploadNew, new_request_headers(), n).then(function(t) {
            e(t);
        }).catch(function(t) {
            o(t);
        });
    });
}, exports.getAddress = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getAddress,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getAppointmentRecord = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.getAppointmentRecord,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getAuthNo = function(t, n) {
    return new Promise(function(e, o) {
        var i = {
            loading: t,
            method: "post",
            data: n,
            url: _url.url.getAuthNo,
            header: new_request_headers()
        };
        return send_request(i).then(function(t) {
            e(t);
        }).catch(function(t) {
            o(t);
        });
    });
}, exports.getBreakAppointmentRecord = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.getBreakAppointmentRecord,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getDoctorInfo = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getDoctorInfo,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getGlobalCardInfo = function() {
    var t = _app.globalData.cardInfo || [], n = {};
    return t.forEach(function(t) {
        t.age = _util.util._getAgeByBirthDay(t.birthday), "1" == t.isDefaultFlag && (n = t);
    }), _util.util.isEmpty(n) && _util.util.isNotEmpty(t) && (t[0].isDefaultFlag = "1"), t;
}, exports.getGlobalRegistered = function() {
    return _app.globalData.registered || !1;
}, exports.getHisAdviseDetial = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.getHisAdviseDetial,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getHisAdviseList = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getHisAdviseList,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getInPatientCase = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getInPatientCase,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getInPatientCasePdf = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getInPatientCasePdf,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getInPatientDrug = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getInPatientDrug,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getInhospitalAccount = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getInhospitalAccount,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getInhospitalInfo = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getInhospitalInfo,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getLisPDF = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getLisPDF,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getMyCaseid = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getMyCaseid,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getOriginateQuantity = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getOriginateQuantity,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getOutPatientCf = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getOutPatientCf,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getPatientAppointments = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getPatientAppointments,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getPatientFee = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getPatientFee,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getPatientIndex = function(t) {
    var n = _app.globalData.cardInfo || [];
    return n && t ? n.findIndex(function(n) {
        return n.platPid == t;
    }) : 0;
}, exports.getPatientLis = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getPatientLis,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getPatientOutiagnosis = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getPatientOutiagnosis,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getPatientPacs = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getPatientPacs,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getPatientPath = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getPatientPath,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getPayCostList = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getPayCostList,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getPayCostListDetail = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getPayCostListDetail,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getPhoneNo = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getPhoneNo,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getScheduleList = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getScheduleList,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getSchedulePlanList = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getSchedulePlanList,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getSurplusTime = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.getSurplusTime,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getTodayDeptList = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.getTodayDeptList,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getTodayDeptSearch = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.getTodayDeptSearch,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getTodaySuggest = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.getTodaySuggest,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getTzDoctorList = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.getTzDoctorList,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getUserInfoNew = function(t) {
    return new Promise(function(n, e) {
        var i = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getUserInfoNew,
            header: new_request_headers()
        };
        return send_request(i).then(function(t) {
            0 == t.code && _util.util.setBaseInfo(t), n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getVideoReport = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getVideoReport,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getVideoReportBaseSixFour = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getVideoReportBaseSixFour,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getViewLeft = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getViewLeft,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getViewtv = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getViewtv,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getYyAppointmentTimes = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.getYyAppointmentTimes,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getYyDeptList = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.getYyDeptList,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getYyDeptSearch = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.getYyDeptSearch,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getYyDoctorList = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getYyDoctorList,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getYyScheduleList = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.getYyScheduleList,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getYySuggest = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.getYySuggest,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.getYySurplusTime = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.getYySurplusTime,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.inHospitalInfoSubmit = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.inHospitalInfoSubmit,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.inhosChargePay = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.inhosChargePay,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.inhospitalSettlement = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.inhospitalSettlement,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.login = d, exports.loginByH5 = function(t) {
    var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return new Promise(function(i, a) {
        _util.util.isDesktop() ? a({
            message: "Access Denied"
        }) : _vendor_js.index.login({
            success: function(e) {
                var u = {
                    loading: n,
                    method: "POST",
                    data: {
                        code: e.code,
                        wxmed_authcode: t
                    },
                    url: _url.url.loginByH5,
                    header: new_request_headers()
                };
                return send_request(u).then(function(t) {
                    if (console.log("H5登录返回：", t), 0 == t.status) return t.data.init && _util.util.clearStorage(), 
                    l(t.data), void i(t);
                    a(t);
                }).catch(function(t) {
                    a(t);
                });
            },
            fail: function(t) {
                a(t);
            }
        });
    });
}, exports.logoutUser = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.logoutUser,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.needSubMessage = function(t, n) {
    console.log("app:", _app);
    var r = _app.globalData.hospitalInfo.subMessageArrays[t] || [];
    _vendor_js.index.getSetting({
        withSubscriptions: !0,
        success: function(t) {
            var e = t.subscriptionsSetting || {};
            if (_util.util.isFalse(e.mainSwitch)) return console.warn("订阅消息失败：用户关闭了主开关"), void (n && n(!1));
            var i = e.itemSettings || {}, a = r.filter(function(t) {
                return _util.util.isEmpty(i[t]);
            });
            n && n(a.length > 0);
        },
        fail: function() {
            n && n(!1);
        }
    });
}, exports.orderDetailRequest = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "POST",
            url: _url.url.orderDetailRequest + "/" + t,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.orderStatusRequest = function(t, n) {
    return new Promise(function(e, o) {
        var i = {
            loading: n,
            method: "POST",
            url: _url.url.orderStatus + "/" + t,
            header: new_request_headers()
        };
        return send_request(i).then(function(t) {
            e(t);
        }).catch(function(t) {
            o(t);
        });
    });
}, exports.orgDeptList = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.orgDeptList,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.orgDict = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "POST",
            data: t,
            url: _url.url.orgDict,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.orgPersonDetail = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            url: _url.url.orgPersonDetail + "/" + t,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.orgPersonPage = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.orgPersonPage,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.orgReviewPage = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "POST",
            data: t,
            url: _url.url.orgReviewPage,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.outpatientPay = function(t, n) {
    return new Promise(function(e, o) {
        var i = {
            loading: t,
            method: "post",
            data: n,
            url: _url.url.outpatientPay,
            header: new_request_headers()
        };
        return send_request(i).then(function(t) {
            e(t);
        }).catch(function(t) {
            o(t);
        });
    });
}, exports.pageMsg = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.pageMsg,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.pdfToImg = function(t) {
    return new Promise(function(n, o) {
        _vendor_js.index.showLoading({
            title: "拼命加载中...",
            mask: !0
        }), _vendor_js.index.request({
            url: _app.globalData.apiDomain + _app.globalData.service + _url.url.pdfToImg,
            method: "GET",
            data: t,
            responseType: "arraybuffer",
            success: function(t) {
                console.log("接口原始输出res：", t), n(t);
            },
            fail: function(t) {
                console.log("接口原始输出err：", t), o(t);
            },
            complete: function() {
                _vendor_js.index.hideLoading();
            }
        });
    });
}, exports.queryArchiveInfo = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.queryArchiveInfo,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.queryDeptIntroduct = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.queryDeptIntroduct,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.queryDeptListNew = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.queryDeptListNew,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.queryDoctorIntroduct = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.queryDoctorIntroduct,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.queryDoctorList = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.queryDoctorList,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.queryInHosInfo = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.queryInHosInfo,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.queryInhosChargeRecord = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.queryInhosChargeRecord,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.queryInhospitalInfo = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.queryInhospitalInfo,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.queryMessageIsOpen = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.queryMessageIsOpen,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.queryOrder = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "get",
            data: t,
            url: _url.url.queryOrder,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.queryOtherAreaNumber = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.queryOtherAreaNumber,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.queryYyOtherAreaNumber = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.queryYyOtherAreaNumber,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.quickRegister = function(t) {
    return new Promise(function(n, e) {
        var i = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.quickRegister,
            header: new_request_headers()
        };
        return send_request(i).then(function(t) {
            0 == t.code && _util.util.setBaseInfo(t), n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.rareChineseCharacter = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.rareChineseCharacter,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.searchPublicity = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.searchPublicity,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.sendBatchReadMsg = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.sendBatchReadMsg,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.sendFileMsg = function(t, n) {
    var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    return new Promise(function(o, i) {
        var a = {
            formData: t,
            filePath: n
        };
        return h(e, _url.url.sendFileMsg, new_request_headers(), a).then(function(t) {
            o(t);
        }).catch(function(t) {
            i(t);
        });
    });
}, exports.sendRecallMsg = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.sendRecallMsg,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.sendTextMsg = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.sendTextMsg,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.sendVedioOrAudioMsg = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !1,
            method: "POST",
            data: t,
            url: "1" == t.callType ? _url.url.sendAudioMsg : _url.url.sendVideoMsg,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.setDefault = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.setDefault,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.setGlobalRegistered = function(t) {
    _app.globalData.registered = t;
}, exports.settlementReturn = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.settlementReturn,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.todayAppointmentCreateOrder = function(t) {
    var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return new Promise(function(e, o) {
        var i = {
            loading: n,
            method: "post",
            data: t,
            url: _url.url.todayAppointmentCreateOrder,
            header: new_request_headers()
        };
        return send_request(i).then(function(t) {
            e(t);
        }).catch(function(t) {
            o(t);
        });
    });
}, exports.unBindPatient = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.unBindPatient,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.unregister = function(t) {
    return new Promise(function(n, e) {
        var i = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.unregister,
            header: new_request_headers()
        };
        return send_request(i).then(function(t) {
            0 == t.code && _util.util.setBaseInfo(t), n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.updateMessageIsOpen = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.updateMessageIsOpen,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.updatePatientInfo = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.updatePatientInfo,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.userRegister = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.userRegister,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.userRegisterNew = function(t) {
    return new Promise(function(n, e) {
        var i = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.userRegisterNew,
            header: new_request_headers()
        };
        return send_request(i).then(function(t) {
            0 == t.code && _util.util.setBaseInfo(t), n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.verifyUser = function(t) {
    return new Promise(function(n, e) {
        var o = {
            loading: !0,
            method: "post",
            data: t,
            url: _url.url.verifyUser,
            header: new_request_headers()
        };
        return send_request(o).then(function(t) {
            n(t);
        }).catch(function(t) {
            e(t);
        });
    });
}, exports.yyAppointmentCreateOrder = function(t) {
    var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return new Promise(function(e, o) {
        var i = {
            loading: n,
            method: "post",
            data: t,
            url: _url.url.yyAppointmentCreateOrder,
            header: new_request_headers()
        };
        return send_request(i).then(function(t) {
            e(t);
        }).catch(function(t) {
            o(t);
        });
    });
};