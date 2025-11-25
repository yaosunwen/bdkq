var e = require("../../common/vendor.js"), t = require("../../common/assets.js"), n = require("../../request/request.js"), a = require("../../utils/util.js");

Math || i();

var i = function() {
    return "../../components/nodata/index.js";
}, l = {
    __name: "index",
    setup: function(i) {
        getApp();
        var l = e.ref(!1), u = e.ref(""), s = e.ref([ {
            value: "0",
            name: "魏公村总院区",
            phone: "010-62179977",
            checked: "true",
            distance: "",
            img: "/static/area.png",
            address: "北京市海淀区中关村南大街22号",
            latitude: 39.95227,
            longitude: 116.32524
        }, {
            value: "6",
            name: "国合门诊部(国际门诊)",
            distance: "",
            phone: "",
            img: "/static/area.png",
            address: "北京市海淀区中关村南大街18号北京国际大厦B座1-5楼",
            latitude: 39.953164,
            longitude: 116.324532
        }, {
            value: "1",
            name: "第一门诊部",
            distance: "",
            phone: "010-53295000",
            img: "/static/area.png",
            address: "北京市西城区西黄城根北街10号",
            latitude: 39.924101,
            longitude: 116.378039
        }, {
            value: "2",
            name: "第二门诊部",
            distance: "",
            phone: "010-82196299",
            img: "/static/area.png",
            address: "北京市朝阳区安立路66号安立写字楼C座5楼",
            latitude: 40.00346,
            longitude: 116.4083
        }, {
            value: "3",
            name: "第三门诊部",
            distance: "",
            phone: "010-82037030",
            img: "/static/area.png",
            address: "北京市海淀区花园东路10号高德大厦A座2层203室",
            latitude: 39.98277,
            longitude: 116.37011
        }, {
            value: "4",
            name: "第四门诊部(非医保单位)",
            distance: "",
            phone: "010-85715955",
            img: "/static/area.png",
            address: "北京市朝阳区东四环中路41号嘉泰国际大厦A座1楼",
            latitude: 39.91692,
            longitude: 116.48834
        }, {
            value: "5",
            name: "第五门诊部(非医保单位)",
            distance: "",
            phone: "010-65538893",
            img: "/static/area.png",
            address: "北京市朝阳区朝阳门外大街吉庆里14号佳汇国际中心A座305室",
            latitude: 39.92742,
            longitude: 116.44106
        }, {
            value: "7",
            name: "天竺门诊部(非医保单位)",
            distance: "",
            phone: "",
            img: "/static/area.png",
            address: "北京市顺义区金航西路4号院绿地自由港B座一层",
            latitude: 40.114408,
            longitude: 116.580015
        } ]), o = e.ref("");
        e.ref("");
        var d = "", r = "", g = e.ref("1"), c = e.ref([ {
            value: "0",
            name: "魏公村总院区"
        }, {
            value: "6",
            name: "国合门诊部(国际门诊)"
        }, {
            value: "1",
            name: "第一门诊部"
        }, {
            value: "2",
            name: "第二门诊部"
        }, {
            value: "3",
            name: "第三门诊部"
        }, {
            value: "4",
            name: "第四门诊部(非医保单位)"
        }, {
            value: "5",
            name: "第五门诊部(非医保单位)"
        }, {
            value: "7",
            name: "天竺门诊部(非医保单位)"
        } ]), f = e.ref(0), p = "魏公村总院区", v = e.ref([]), h = e.ref(!1), m = "", x = "";
        function y() {
            l.value = !1;
        }
        function z() {
            l.value = !1, "yygh" == o.value ? a.util.navigateTo("/intelligent/yygh/xzjzr/index?tapIndex=" + x + "&area=" + p) : a.util.navigateTo("/intelligent/dtgh/xzjzr/index?tapIndex=" + x + "&area=" + p);
        }
        function j() {
            a.util.navigateTo("/intelligent/syhy/index?popupModel=" + o.value);
        }
        function T(e) {
            v.value = [], h.value = !1, f.value = e.value, p = e.name, function(e) {
                var t = {
                    tapIndex: e,
                    withRemain: "1"
                };
                "dtgh" == o.value ? n.getTodayDeptList(t).then(function(e) {
                    if (console.log("getTodayDeptList", e), 0 == e.status) {
                        var t = e.data.lists;
                        0 != t.length ? (t.sort(function(e, t) {
                            return t.remainNum - e.remainNum;
                        }), v.value = t, h.value = !0) : v.value = [];
                    } else a.util._showModal({
                        content: e.message || "查询失败"
                    });
                }).catch(function(e) {
                    console.log(e), a.util._showModal({
                        content: e.message || JSON.stringify(e) || "查询失败，请稍候重试"
                    });
                }) : n.getYyDeptList(t).then(function(e) {
                    if (console.log("getYyDeptList", e), 0 == e.status) {
                        var t = e.data.lists;
                        0 != t.length ? (t.sort(function(e, t) {
                            return t.remainNum - e.remainNum;
                        }), v.value = t, h.value = !0) : v.value = [];
                    } else a.util._showModal({
                        content: e.message || "查询失败"
                    });
                }).catch(function(e) {
                    console.log(e), a.util._showModal({
                        content: e.message || JSON.stringify(e) || "查询失败，请稍候重试"
                    });
                });
            }(e.value);
        }
        function M() {
            "dtgh" != o.value && "yygh" != o.value ? "hygs" != o.value ? e.index.showToast({
                title: "暂未开通！",
                icon: "none"
            }) : a.util.navigateTo("/intelligent/hygs/gsSearch/index?myToday=" + m) : a.util.navigateTo("/intelligent/yqSearch/index?popupModel=".concat(o.value));
        }
        e.onLoad(function(t) {
            console.log(t), o.value = t.popupModel, m = t.myToday, e.index.showLoading({
                title: "加载中..."
            }), e.index.getLocation({
                type: "wgs84",
                success: function(t) {
                    console.log("位置", t), r = t.latitude, d = t.longitude, s.value.forEach(function(e, t) {
                        var n, a, i, l, u, s, o, g, c;
                        e.distance = (n = r, a = d, i = e.latitude, l = e.longitude, o = (u = n * Math.PI / 180) - (s = i * Math.PI / 180), 
                        g = a * Math.PI / 180 - l * Math.PI / 180, c = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(o / 2), 2) + Math.cos(u) * Math.cos(s) * Math.pow(Math.sin(g / 2), 2))), 
                        c *= 6378.137, c = (c = Math.round(1e4 * c) / 1e4).toFixed(2));
                    }), console.log("items", s.value), e.index.hideLoading();
                },
                fail: function(t) {
                    console.log("位置err", t), e.index.hideLoading();
                }
            });
        });
        var I = a.util._throttle(function(t) {
            var n = t.name;
            if (p = n, x = t.value, "yygh" == o.value) 6 == x ? a.util.showModal({
                confirmText: "已知晓",
                content: "国际门诊（3-5层）价格高于北京市统一标准，均为自费；暂不提供住院服务；国际门诊预约电话：010-83013555\n国合门诊部（2层）为普通正畸和普通儿科门诊，价格执行北京市统一标准，均为自费；咨询电话：010-83013610",
                success: function(e) {
                    e.cancel || a.util.navigateTo("/intelligent/yygh/xzjzr/index?tapIndex=" + x + "&area=" + n + "&distance=" + t.distance);
                }
            }) : 7 == x ? (l.value = !0, u.value = "<p class='tzwxts'>天竺门诊部尚未开通医保，均需自费，暂不提供住院和验血服务；</p><p class='tzwxts'>普通门诊费用标准：与总院费用标准一致，预约咨询电话:010-81418000；</p> <p style='color:red' class='tzwxts'>特需医疗费用标准：较普通门诊有不同比例增加，预约咨询电话:010-81418088。</p>") : a.util.navigateTo("/intelligent/yygh/xzjzr/index?tapIndex=" + x + "&area=" + n + "&distance=" + t.distance); else if ("dtgh" == o.value) 6 == x ? a.util.showModal({
                confirmText: "已知晓",
                content: "国际门诊（3-5层）价格高于北京市统一标准，均为自费；暂不提供住院服务；国际门诊预约电话：010-83013555\n国合门诊部（2层）为普通正畸和普通儿科门诊，价格执行北京市统一标准，均为自费；咨询电话：010-83013610",
                success: function(e) {
                    e.cancel || a.util.navigateTo("/intelligent/dtgh/xzjzr/index?tapIndex=" + x + "&area=" + n + "&distance=" + t.distance);
                }
            }) : 7 == x ? (l.value = !0, u.value = "<p class='tzwxts'>天竺门诊部尚未开通医保，均需自费，暂不提供住院和验血服务；</p><p class='tzwxts'>普通门诊费用标准：与总院费用标准一致，预约咨询电话:010-81418000；</p> <p style='color:red' class='tzwxts'>特需医疗费用标准：较普通门诊有不同比例增加，预约咨询电话:010-81418088。</p>") : a.util.navigateTo("/intelligent/dtgh/xzjzr/index?tapIndex=" + x + "&area=" + n + "&distance=" + t.distance); else if ("hygs" == o.value) e.index.navigateTo({
                url: "/intelligent/hygs/xzks/index?tapIndex=" + x + "&myToday=" + m
            }); else if ("tzgs" == o.value) e.index.navigateTo({
                url: "/intelligent/hygs/index/index?tapIndex=" + +x + "&popupModel=tzgs"
            }); else if ("ksjs" == o.value) e.index.navigateTo({
                url: "/intelligent/hospital/ksjs/index?tapIndex=" + x
            }); else if ("zjjs" == o.value) e.index.navigateTo({
                url: "/intelligent/hospital/ksjs/index?tapIndex=" + x + "&isDoctor=1"
            }); else if ("czxx" == o.value) a.util.navigateTo("/intelligent/fyjj/index?code=" + x + "&name=" + n); else if ("yyjj" == o.value) a.util.navigateTo("/intelligent/hospital/yyjj/index?tapIndex=" + x); else if ("lydh" == o.value) {
                if (0 == x) var i = "北京大学口腔医院", s = "北京市海淀区中关村南大街22号", d = 39.95227, r = 116.32524, g = 16; else 1 == x ? (i = "北京大学口腔医院（西什库门诊部）", 
                s = "北京市西城区西黄城根北街10号", d = 39.924101, r = 116.378039, g = 16) : 2 == x ? (i = "北京大学口腔医院第二门诊部", 
                s = " 北京市朝阳区安立路66号安立写字楼C座5楼", d = 40.00346, r = 116.4083, g = 16) : 3 == x ? (i = "北京大学口腔医院第三门诊部", 
                s = "北京市海淀区花园东路10号高德大厦A座2层203室", d = 39.98277, r = 116.37011, g = 16) : 4 == x ? (i = "北京大学口腔医院第四门诊部", 
                s = "北京市朝阳区东四环中路41号嘉泰国际大厦A座1楼", d = 39.91692, r = 116.48834, g = 16) : 5 == x ? (i = "北京大学口腔医院第五门诊部", 
                s = "北京市朝阳区朝阳门外大街吉庆里14号佳汇国际中心A座305室", d = 39.92742, r = 116.44106) : 6 == x ? (i = "北京大学口腔医院国合门诊部", 
                s = "北京市海淀区中关村南大街18号北京国际大厦B座1-5楼", d = 39.953164, r = 116.324532) : 7 == x ? (i = "北京大学口腔医院天竺门诊部", 
                s = "北京市顺义区金航西路4号院绿地自由港B座一层", d = 40.114408, r = 116.580015) : 99 == x && (i = "北京大学口腔医院第一门诊部C楼", 
                s = "北京市西城区西黄城根北街10号", d = 39.923957, r = 116.378626);
                a.util.openLocation({
                    name: i,
                    address: s,
                    latitude: d,
                    longitude: r,
                    scale: g
                });
            }
        }, 1e3);
        return function(n, i) {
            return e.e({
                a: "tzgs" != e.unref(o) && "ksjs" != e.unref(o) && "zjjs" != e.unref(o)
            }, "tzgs" != e.unref(o) && "ksjs" != e.unref(o) && "zjjs" != e.unref(o) ? e.e({
                b: t._imports_1$6,
                c: e.o(M),
                d: "yygh" == e.unref(o) || "dtgh" == e.unref(o)
            }, "yygh" == e.unref(o) || "dtgh" == e.unref(o) ? {
                e: e.o(j)
            } : {}) : {}, {
                f: "yygh" == e.unref(o) || "dtgh" == e.unref(o)
            }, ("yygh" == e.unref(o) || e.unref(o), {}), {
                g: "1" == e.unref(g)
            }, "1" == e.unref(g) ? {
                h: e.f(e.unref(s), function(n, a, i) {
                    return e.e({
                        a: "tzgs" != e.unref(o) || 0 == a
                    }, "tzgs" != e.unref(o) || 0 == a ? e.e({
                        b: n.img,
                        c: e.t(n.name),
                        d: n.distance
                    }, n.distance ? {
                        e: t._imports_1$7,
                        f: e.t(n.distance)
                    } : {}, {
                        g: e.t(n.address),
                        h: e.o(function(t) {
                            return e.unref(I)(n);
                        }, a)
                    }) : {}, {
                        i: a
                    });
                }),
                i: e.n("tzgs" != e.unref(o) && "ksjs" != e.unref(o) && "zjjs" != e.unref(o) ? "list" : "list list1")
            } : e.e({
                j: e.f(e.unref(c), function(t, n, a) {
                    return {
                        a: e.t(t.name),
                        b: e.n(e.unref(f) == t.value ? "selected hd_item" : "hd_item"),
                        c: e.o(function(e) {
                            return T(t);
                        }, n),
                        d: n
                    };
                }),
                k: e.unref(h)
            }, e.unref(h) ? e.e({
                l: 0 == e.unref(v).length
            }, 0 == e.unref(v).length ? {
                m: e.p({
                    content: "未放号",
                    top: "40"
                })
            } : {
                n: e.f(e.unref(v), function(t, n, i) {
                    return e.e({
                        a: e.t(t.deptName),
                        b: 0 == t.remainNum
                    }, 0 == t.remainNum ? {} : {
                        c: e.t(t.remainNum)
                    }, {
                        d: e.o(function(e) {
                            return function(e) {
                                e.remainNum <= 0 || ("yygh" == o.value ? a.util.navigateTo("/intelligent/yygh/xzjzr/index?tapIndex=" + e.tapIndex + "&area=" + p + "&deptCode=" + e.majorDetailId + "&deptName=" + e.deptName + "&showJzxz=true") : "dtgh" == o.value && a.util.navigateTo("/intelligent/dtgh/xzjzr/index?tapIndex=" + e.tapIndex + "&area=" + p + "&deptCode=" + e.majorDetailId + "&deptName=" + e.deptName + "&showJzxz=true"));
                            }(t);
                        }, n),
                        e: n
                    });
                })
            }) : {}), {
                o: e.unref(l)
            }, e.unref(l) ? {
                p: t._imports_1$3,
                q: t._imports_1$3,
                r: t._imports_2$2,
                s: e.unref(u),
                t: e.o(y),
                v: e.o(z)
            } : {});
        };
    }
}, u = e._export_sfc(l, [ [ "__scopeId", "data-v-dc3ea0c1" ] ]);

wx.createPage(u);