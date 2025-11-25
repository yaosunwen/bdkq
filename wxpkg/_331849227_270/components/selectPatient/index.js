var e = require("../../common/vendor.js"), t = require("../../common/assets.js"), n = require("../../utils/util.js"), u = {
    __name: "index",
    props: {
        patient: {
            type: JSON,
            default: {}
        },
        listIndex: {
            type: Number,
            default: 0
        },
        isShowScreening: {
            type: Boolean,
            default: !1
        },
        waiNum: {
            type: Number,
            default: 0
        },
        defaultStatesNum: {
            type: String,
            default: ""
        },
        statesList: {
            type: Array,
            default: null
        },
        dateRange: {
            type: Number,
            default: 0
        }
    },
    emits: [ "show", "selected", "handleGetDate" ],
    setup: function(u, a) {
        var l = a.emit, i = u, r = l, o = e.ref(0), s = e.ref(0), f = e.ref(!1), c = e.ref(!1), v = e.ref(!1), d = e.reactive({}), m = e.ref(0), g = e.ref("");
        g.value = i.defaultStatesNum, console.log("statesActiveValue:", g.value), m.value = i.waiNum, 
        console.log("showDateSelect:", v.value);
        var h = e.ref(!1);
        console.log("组件isShowScreening:", i.isShowScreening), h.value = i.isShowScreening;
        var p = i.dateRange;
        e.watchEffect(function() {
            h.value = i.isShowScreening;
        });
        var w = function(e) {
            var t = new Date(new Date().getTime() - 24 * e * 60 * 60 * 1e3), n = t.getFullYear(), u = t.getMonth() + 1, a = t.getDate();
            return u = u < 10 ? "0" + u : u, a = a < 10 ? "0" + a : a, n.toString() + "-" + u.toString() + "-" + a.toString();
        }, S = function() {
            f.value = !c.value, c.value = !c.value, v.value = !1, r("show");
        }, x = function() {
            f.value = !v.value, c.value = !1, v.value = !v.value;
        }, B = function(e) {
            console.log("startTimeChange:", e), 0 != p && n.util.twoDateTimeDifference(e.detail.value, A.value) > p ? n.util.showToast({
                title: "查询时间不能大于" + p + "天"
            }) : I.value = e.detail.value;
        }, N = function(e) {
            console.log("endTimeChange:", e), 0 != p && n.util.twoDateTimeDifference(I.value, e.detail.value) > p ? n.util.showToast({
                title: "查询时间不能大于" + p + "天"
            }) : A.value = e.detail.value;
        }, _ = function(e) {
            m.value = e, I.value = w(e), console.log("startTime:", I), A.value = w(0);
        }, D = function() {
            I.value = "", A.value = "", m.value = "", g.value = i.defaultStatesNum;
        }, T = function() {
            if ("" != I.value) if ("" != A.value) {
                f.value = !1, v.value = !1;
                var t = {
                    startTime: I.value,
                    endTime: A.value,
                    defaultStates: g.value,
                    waiNum: m.value
                };
                r("handleGetDate", t);
            } else e.index.showToast({
                title: "请选择结束时间！",
                icon: "none"
            }); else e.index.showToast({
                title: "请选择开始时间！",
                icon: "none"
            });
        }, y = i.patient;
        console.log("bindPatients:", y);
        var b = i.patient;
        console.log("组件patient:", b), y.forEach(function(e, t) {
            "1" == e.isDefaultFlag && (o.value = i.listIndex ? i.listIndex : t, d = i.listIndex ? y[i.listIndex] : e);
        }), n.util._isEmpty(d) && y.length > 0 && (d = y[0]), console.log("selectPatient:", d);
        var I = e.ref("");
        I.value = w(m.value);
        var A = e.ref("");
        return A.value = w(0), e.onMounted(function() {
            r("selected", {
                selectPatient: d,
                first: !0
            });
        }), function(a, l) {
            return e.e({
                a: e.unref(f),
                b: e.t(e.unref(d).clientName),
                c: e.t(e.unref(n.util)._hideIdCard(e.unref(d).idCardNo)),
                d: t._imports_0$33,
                e: e.o(S),
                f: e.unref(h)
            }, e.unref(h) ? {
                g: t._imports_1$20,
                h: e.o(x)
            } : {}, {
                i: e.f(e.unref(b), function(t, u, a) {
                    return e.e({
                        a: e.t(t.clientName),
                        b: e.t(e.unref(n.util)._hideIdCard(t.idCardNo)),
                        c: u == e.unref(o) || ""
                    }, (e.unref(o), {}), {
                        d: e.n(u == e.unref(o) ? "listbox active2" : "listbox"),
                        e: e.o(function(e) {
                            return function(e) {
                                console.log("index:", e);
                                var t = b[e];
                                d = t, f.value = !1, c.value = !1, v.value = !1, o.value = e, r("selected", {
                                    selectPatient: d
                                });
                            }(u);
                        }, u),
                        f: u
                    });
                }),
                j: e.n(e.unref(c) ? "slidown" : "sliup"),
                k: e.unref(c),
                l: e.unref(v)
            }, e.unref(v) ? e.e({
                m: 1 == e.unref(s) || 0 == e.unref(s)
            }, 1 == e.unref(s) || 0 == e.unref(s) ? {
                n: e.n(0 == e.unref(m) ? "selectBtnActive selectBtn" : "selectBtn"),
                o: e.o(function(e) {
                    return _(0);
                })
            } : {}, {
                p: 0 == e.unref(s)
            }, 0 == e.unref(s) ? {
                q: e.n(7 == e.unref(m) ? "selectBtnActive selectBtn" : "selectBtn"),
                r: e.o(function(e) {
                    return _(7);
                })
            } : {}, {
                s: 1 == e.unref(s)
            }, 1 == e.unref(s) ? {
                t: e.n(15 == e.unref(m) ? "selectBtnActive selectBtn" : "selectBtn"),
                v: e.o(function(e) {
                    return _(15);
                })
            } : {}, {
                w: 1 == e.unref(s) || 0 == e.unref(s)
            }, 1 == e.unref(s) || 0 == e.unref(s) ? {
                x: e.n(30 == e.unref(m) ? "selectBtnActive selectBtn" : "selectBtn"),
                y: e.o(function(e) {
                    return _(30);
                })
            } : {}, {
                z: e.t(e.unref(I) || "请选择时间"),
                A: e.unref(I),
                B: e.o(B),
                C: e.t(e.unref(A) || "请选择时间"),
                D: e.unref(A),
                E: e.o(N),
                F: u.statesList
            }, u.statesList ? {
                G: e.f(u.statesList, function(t, n, u) {
                    return {
                        a: e.t(t.title),
                        b: e.n(e.unref(g) == t.value ? "statesActive" : ""),
                        c: e.o(function(e) {
                            return function(e) {
                                g.value = e.value;
                            }(t);
                        }, n),
                        d: e.s(t.title.length < 6 ? "width: 180rpx!important" : "width: 150px!important"),
                        e: n
                    };
                })
            } : {}, {
                H: e.o(D),
                I: e.o(T)
            }) : {});
        };
    }
}, a = e._export_sfc(u, [ [ "__scopeId", "data-v-e478a01a" ] ]);

wx.createComponent(a);