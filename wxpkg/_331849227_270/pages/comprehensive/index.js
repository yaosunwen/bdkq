var e = require("../../common/vendor.js"), n = require("../../common/assets.js");

require("../../request/request.js");

var a = require("../../utils/util.js"), i = {
    __name: "index",
    setup: function(i) {
        getApp();
        var t = e.ref(!0), r = e.ref(0), o = e.ref(0), g = 0, c = 0, l = 0, u = 0, s = 0, d = 0, m = e.ref(!1), f = e.ref([ {
            name: "门诊缴费",
            image: "/static/mzjf.png"
        }, {
            name: "报告查询",
            image: "/static/bgcx.png"
        }, {
            name: "下载处方",
            image: "/static/hztx.png"
        }, {
            name: "电子发票",
            image: "/static/mzfy.png"
        }, {
            name: "门诊费用",
            image: "/static/mzfy.png"
        }, {
            name: "就诊记录",
            image: "/static/jzjl.png"
        }, {
            name: "药品说明书",
            image: "/static/yhcx.png"
        }, {
            name: "复诊预约查询",
            image: "/static/hygs.png"
        } ]), x = e.ref([ {
            name: "住院登记",
            image: "/static/mzfy.png"
        }, {
            name: "住院预交",
            image: "/static/zyyj.png"
        }, {
            name: "出院结算",
            image: "/static/cyjs.png"
        }, {
            name: "出院小结",
            image: "/static/cyxj.png"
        }, {
            name: "出院带药",
            image: "/static/cydy.png"
        }, {
            name: "病案复印",
            image: "/static/bafy.png"
        }, {
            name: "营养点餐",
            image: "/static/yydc.png"
        }, {
            name: "",
            image: ""
        } ]), p = e.ref([ {
            name: "院内便民",
            image: "/static/hygs.png"
        }, {
            name: "余号查询",
            image: "/static/yhcx.png"
        }, {
            name: "号源公示",
            image: "/static/hygs.png"
        }, {
            name: "停诊公示",
            image: "/static/tzgs.png"
        }, {
            name: "护理咨询",
            image: "/static/hlzx.png"
        }, {
            name: "科普宣教",
            image: "/static/kpxj.png"
        }, {
            name: "",
            image: ""
        }, {
            name: "",
            image: ""
        } ]), v = e.ref([ {
            name: "就医指南",
            image: "/static/bgcx.png"
        }, {
            name: "使用指南",
            image: "/static/jzjl.png"
        }, {
            name: "",
            image: ""
        }, {
            name: "",
            image: ""
        } ]);
        function y() {
            m.value = !1;
        }
        function b(n) {
            e.index.navigateTo({
                url: "/pages/select/index?popupModel=hygs&myToday=" + n
            }), y();
        }
        e.ref([ {
            name: "测试挂号",
            image: "/static/bgcx.png"
        }, {
            name: "测试缴费",
            image: "/static/jzjl.png"
        }, {
            name: "测试报告",
            image: "/static/jzjl.png"
        }, {
            name: "测试个人中心",
            image: "/static/jzjl.png"
        } ]), e.onReady(function() {
            a.util._selectElement("#v_aiConsult", function(e) {
                console.log("initAiConsult:", e);
                l = e.width, u = e.height, s = a.util.getSystemInfo().windowWidth, d = a.util.getSystemInfo().windowHeight, 
                r.value = s - l - 10, o.value = d - u - 10 - 120;
            });
        });
        var T = a.util._throttle(function(n) {
            switch (n) {
              case "复诊预约查询":
                a.util._navigateTo("/intelligent/fzyyRecord/index");
                break;

              case "报告查询":
                a.util._navigateTo("/intelligent/report/index");
                break;

              case "就诊记录":
                a.util._navigateTo("/intelligent/jzRecord/index");
                break;

              case "门诊缴费":
                a.util._navigateTo("/intelligent/mzjf/waitToPay/index");
                break;

              case "候诊提醒":
                a.util._navigateTo("/intelligent/hztxRecord/index");

              case "门诊费用":
                a.util._navigateTo("/intelligent/mzjf/mzfyRecord/index");
                break;

              case "余号查询":
                e.index.navigateTo({
                    url: "/intelligent/yhcxRecord/index"
                });
                break;

              case "号源公示":
                m.value = !0;
                break;

              case "停诊公示":
                e.index.navigateTo({
                    url: "/pages/select/index?popupModel=tzgs"
                });
                break;

              case "住院登记":
                a.util._navigateTo("/intelligent/inHospital/zydj/index");
                break;

              case "住院预交":
                a.util._navigateTo("/intelligent/inHospital/paying/index");
                break;

              case "住院预交1":
                a.util._navigateTo("/intelligent/inHospital/beforeInHosPaying/index");
                break;

              case "出院结算":
                a.util._navigateTo("/intelligent/cyjsRecord/index");
                break;

              case "出院小结":
                a.util._navigateTo("/intelligent/cyxjRecord/index");
                break;

              case "病案复印":
                e.index.navigateToMiniProgram({
                    appId: "wxff4273542debbc64",
                    path: "pages/index/index?hosId=1031"
                });
                break;

              case "出院带药":
                a.util._navigateTo("/intelligent/cydyRecord/index");
                break;

              case "营养点餐":
                e.index.navigateTo({
                    url: "/intelligent/xzjzr/index"
                });
                break;

              case "就医指南":
                e.index.navigateTo({
                    url: "/intelligent/hospital/jyzn/index"
                });
                break;

              case "使用指南":
                e.index.navigateTo({
                    url: "/intelligent/hospital/syzn/index"
                });
                break;

              case "随访填写":
                a.util.showToast({
                    title: "功能暂未开放"
                });
                break;

              case "下载处方":
                a.util._navigateTo("/intelligent/downloadCf/index");
                break;

              case "电子发票":
                e.index.navigateToMiniProgram({
                    appId: "wx8e0b79a7f627ca18",
                    path: "pages/index/index?agencyCode=64e55178027c48708c876725a9160fd1"
                });
                break;

              case "药品说明书":
                e.index.navigateTo({
                    url: "/intelligent/hospital/drugList/index"
                });
                break;

              case "院内便民":
                e.index.navigateTo({
                    url: "/intelligent/hospital/ynbm/index"
                });
                break;

              case "护理咨询":
                e.index.navigateTo({
                    url: "/intelligent/chatbot/index?type=1"
                });
                break;

              case "科普宣教":
                e.index.navigateTo({
                    url: "/pages/kpxj/index"
                });
                break;

              case "护理门诊":
                e.index.navigateTo({
                    url: "/internet/onlineConsultation/selectDoctor?type=2"
                });
                break;

              case "测试挂号":
                e.index.navigateTo({
                    url: "/careModel/xzjzr/index?wxmed_authcode=123&funType=门诊挂号"
                });
                break;

              case "测试缴费":
                e.index.navigateTo({
                    url: "/careModel/xzjzr/index?wxmed_authcode=123&funType=门诊缴费"
                });
                break;

              case "测试报告":
                e.index.navigateTo({
                    url: "/careModel/xzjzr/index?wxmed_authcode=123&funType=报告查询"
                });
                break;

              case "测试个人中心":
                e.index.navigateTo({
                    url: "/careModel/xzjzr/index?wxmed_authcode=123&funType=个人中心"
                });
            }
        }, 800), h = a.util._throttle(function() {
            e.index.navigateTo({
                url: "/intelligent/chatbot/index?type=2"
            });
        });
        return a.util._throttle(function(e) {
            console.log("doTouchStart:", e);
            var n = e.currentTarget || {}, a = e.touches[0] || {};
            g = a.clientX - n.offsetLeft, c = a.clientY - n.offsetTop;
        }), a.util._throttle(function(e) {
            console.log("doTouchMove:", e);
            var n = e.touches[0] || {};
            r.value = n.clientX - g, r.value < 0 && (r.value = 0), r.value + l > s && (r.value = s - l), 
            o.value = n.clientY - c, o.value < 0 && (o.value = 0), o.value + u > d && (o.value = d - u);
        }), function(a, i) {
            return e.e({
                a: e.f(e.unref(f), function(n, a, i) {
                    return {
                        a: n.image,
                        b: e.t(n.name),
                        c: a,
                        d: e.o(function(a) {
                            return e.unref(T)(n.name);
                        }, a)
                    };
                }),
                b: e.f(e.unref(x), function(n, a, i) {
                    return {
                        a: n.image,
                        b: e.t(n.name),
                        c: a,
                        d: e.o(function(a) {
                            return e.unref(T)(n.name);
                        }, a)
                    };
                }),
                c: e.f(e.unref(p), function(n, a, i) {
                    return {
                        a: n.image,
                        b: e.t(n.name),
                        c: a,
                        d: e.o(function(a) {
                            return e.unref(T)(n.name);
                        }, a)
                    };
                }),
                d: e.f(e.unref(v), function(n, a, i) {
                    return {
                        a: n.image,
                        b: e.t(n.name),
                        c: a,
                        d: e.o(function(a) {
                            return e.unref(T)(n.name);
                        }, a)
                    };
                }),
                e: e.unref(m)
            }, e.unref(m) ? {
                f: n._imports_0$6,
                g: e.o(function(e) {
                    return b(1);
                }),
                h: n._imports_1$4,
                i: e.o(function(e) {
                    return b(0);
                }),
                j: e.o(y),
                k: e.o(y)
            } : {}, {
                l: e.unref(t)
            }, e.unref(t) ? {
                m: n._imports_2$3,
                n: e.o(function() {
                    return e.unref(h) && e.unref(h).apply(void 0, arguments);
                }),
                o: e.unref(r),
                p: e.unref(o)
            } : {});
        };
    }
}, t = e._export_sfc(i, [ [ "__scopeId", "data-v-6b841943" ] ]);

wx.createPage(t);