var e = require("../../common/vendor.js"), t = require("../../common/assets.js"), n = require("../../request/request.js"), i = require("../../utils/util.js"), a = {
    __name: "index",
    setup: function(a) {
        var o = getApp(), r = e.ref(!1), l = e.ref(!1);
        e.ref(300), e.ref(500);
        var u = e.ref(!1), c = e.ref(""), s = e.ref(!1), f = e.ref(""), g = e.ref([]);
        e.ref(1), e.ref([ {
            name: "报告查询",
            image: "/static/bgcx.png"
        }, {
            name: "就诊记录",
            image: "/static/jzjl.png"
        }, {
            name: "门诊缴费",
            image: "/static/mzjf.png"
        }, {
            name: "候诊提醒",
            image: "/static/hztx.png"
        }, {
            name: "门诊费用",
            image: "/static/mzfy.png"
        }, {
            name: "余号查询",
            image: "/static/yhcx.png"
        }, {
            name: "号源公示",
            image: "/static/hygs.png"
        }, {
            name: "停诊公示",
            image: "/static/tzgs.png"
        } ]), e.ref([ {
            title: "莫把病原体口口相传给宝宝",
            content: "唾液是病原体传播的载体，现在有很多研究表明，龋病是可以在母婴间“传播”的，这个所谓的“传播”并不是“遗传”或“传染”，如果妈妈口腔内有多颗未经治疗的龋齿，就算还没有引起什么不适的症状，这些龋齿也都是孕育致龋菌的温床，这些特殊的病菌在日常生活接触中难免就会“传播”到宝宝的口内，那宝宝可就真的是输在起跑线上了。"
        }, {
            title: "选择适合自己的牙刷",
            content: "牙刷，是保持口腔清洁的重要工具，包括手动牙刷和电动牙刷。根据刷头形状和刷毛排列的不同，牙刷又分为通用型和特异型两大类。通用型牙刷以直柄为宜，刷毛软硬适度，排列平齐，毛束排列一般为10～12束长、3～4束宽，各束之间有一定间距（图1-14-1 通用型牙刷）。"
        }, {
            title: "食物嵌塞及牙缝清洁",
            content: "日常生活中，有些人饭后会有食物塞在牙缝之间，必须剔出来才感觉舒服，年龄大的人这种情况更常见。为什么随着年龄增长，会更容易塞牙？除了用牙签剔牙外，还有哪些方法可以清理牙齿间隙呢？"
        } ]);
        var p = e.ref(!1), d = "", v = e.ref(!1);
        e.ref({});
        var _ = [], x = "", m = e.ref(!1);
        e.ref(!0);
        var h = e.ref("明日挂号"), T = e.ref({}), y = "", b = "", z = e.ref(!1), j = e.ref(!1), k = e.ref(!1);
        function w() {
            r.value = !1;
        }
        function M() {
            i.util.goCareModelMini(), r.value = !1;
        }
        function $() {
            z.value = !1;
        }
        function I() {
            u.value = !1;
        }
        function P() {
            u.value = !1, i.util._isNotEmpty(c.value.external_link) ? i.util.navigateToWebPage(c.value.external_link) : e.index.navigateTo({
                url: "/intelligent/ggList/index"
            });
        }
        function S() {
            s.value = !1;
        }
        function D() {
            s.value = !1, i.util.navigateTo("/intelligent/yygh/xzjzr/index?tapIndex=" + y + "&showPopup=false&area=" + b);
        }
        function E(e) {
            i.util.navigateTo("/pages/select/index?popupModel=hygs&myToday=".concat(e)), $();
        }
        function N() {
            e.index.navigateTo({
                url: "/intelligent/ggList/index"
            });
        }
        function R() {
            x = "dtgh", p.value ? i.util.navigateTo("/pages/select/index?popupModel=".concat(x)) : i.util.navigateTo("/intelligent/jzr/jzrrz/index");
        }
        function C() {
            x = "yygh", p.value ? i.util.navigateTo("/pages/select/index?popupModel=".concat(x)) : i.util.navigateTo("/intelligent/jzr/jzrrz/index");
        }
        function q() {
            e.index.navigateTo({
                url: "/intelligent/hospital/yyjj/index"
            });
        }
        function B() {
            e.index.navigateTo({
                url: "/intelligent/hospital/lcfb/index"
            });
        }
        function H() {
            x = "lydh", e.index.navigateTo({
                url: "/pages/select/index?popupModel=" + x
            });
        }
        function F() {
            i.util.navigateToMiniProgram("wx8735a8a39cf58b5e", "pages/index?id=Dx4EVOZfd4,QkNOhuFUkR");
        }
        function L() {
            x = "ksjs", e.index.navigateTo({
                url: "/pages/select/index?popupModel=" + x
            });
        }
        function A() {
            x = "zjjs", e.index.navigateTo({
                url: "/pages/select/index?popupModel=" + x
            });
        }
        function G(e, t) {
            b = t, y = e, "6" == e ? i.util.showModal({
                confirmText: "已知晓",
                content: "国际门诊（3-5层）价格高于北京市统一标准，均为自费；暂不提供住院服务；国际门诊预约电话：010-83013555\n国合门诊部（2层）为普通正畸和普通儿科门诊，价格执行北京市统一标准，均为自费；咨询电话：010-83013610",
                success: function(n) {
                    n.cancel || i.util.navigateTo("/intelligent/yygh/xzjzr/index?tapIndex=" + e + "&showPopup=false&area=" + t);
                }
            }) : "7" == e ? (s.value = !0, f.value = "<p class='tzwxts'>天竺门诊部尚未开通医保，均需自费，暂不提供住院和验血服务；</p><p class='tzwxts'>普通门诊费用标准：与总院费用标准一致，预约咨询电话:010-81418000；</p> <p style='color:red' class='tzwxts'>特需医疗费用标准：较普通门诊有不同比例增加，预约咨询电话:010-81418088。</p>") : "100" == e ? i.util.navigateToMiniProgram("wxdaca93aa687cc531", "/pages/welcome/index") : i.util.navigateTo("/intelligent/yygh/xzjzr/index?tapIndex=" + e + "&showPopup=false&area=魏公村总院区&deptName=" + t);
        }
        function W() {
            i.util.navigateToMiniProgram("wx7ec43a6a6c80544d");
        }
        e.onLoad(function(t) {
            var a = t.page;
            i.util._isNotEmpty(a) && (d = decodeURIComponent(a)), i.util._isNotEmpty(e.index.getStorageSync("redirectPath")) && (d = e.index.getStorageSync("redirectPath"));
            var l = o.globalData.noticeList || [];
            if (i.util._isNotEmpty(l)) {
                for (var s = {}, f = 0; f < l.length; f++) {
                    var p = l[f];
                    if ("1" == p.force_remind && "通知公告" == p.info_title) {
                        s.value = p;
                        break;
                    }
                }
                if (i.util._isNotEmpty(s.value)) {
                    var x = 60 * Number(s.value.remind_period) * 1e3 || 0;
                    i.util.justRun("notice-" + s.value.content_id, x, function() {
                        i.util._isNotEmpty(s.value.theme_picture) ? v.value = !0 : (u.value = !0, c.value = s.value, 
                        console.log("yyggContent.value:", c.value));
                    });
                }
                _ = i.util.chunk(l, 2);
                var m = [];
                _.forEach(function(e) {
                    e.forEach(function(e) {
                        m.push(e);
                    });
                }), g.value = m, console.log(_, "contentInfoList");
            }
            var y = function(e, t) {
                var n, i = new Date(), a = "".concat(i.getFullYear(), "/").concat(i.getMonth() + 1, "/").concat(i.getDate(), " "), o = new Date(a + "00:00").getTime(), r = new Date(a + "05:00").getTime(), l = i.getTime(), u = o > r;
                return u && (o = (n = [ r, o ])[0], r = n[1]), l > o && l < r ? !u : !!u;
            }();
            if (h.value = y ? "当日挂号" : "明日挂号", n.getGlobalRegistered()) {
                var b = n.getGlobalCardInfo();
                if (console.log("patients:", b), i.util.isEmpty(T.value)) for (var z = 0; z < b.length; z++) if ("1" == b[z].isDefaultFlag) {
                    T.value = b[z];
                    break;
                }
                i.util.isEmpty(T.value) && (T.value = b[0]);
                var j = e.index.getAppBaseInfo();
                console.log("appBaseInfo:", j), (T.value.age > 55 || j.fontSizeSetting >= 22 || j.fontSizeScaleFactor >= 1.4) && (r.value = !0);
            } else {
                var k = e.index.getAppBaseInfo();
                console.log("appBaseInfo:", k), (k.fontSizeSetting >= 22 || k.fontSizeScaleFactor >= 1.4) && (r.value = !0);
            }
        }), e.onShow(function() {
            if (console.log(p.value, "是否认证"), console.log(o.globalData.subscribeWeb, "subscribeWeb"), 
            m.value = o.globalData.subscribeWeb, p.value = n.getGlobalRegistered(), j.value = o.globalData.careMode, 
            j.value ? (l.value = !1, e.index.hideTabBar()) : (l.value = !0, e.index.showTabBar()), 
            p.value) {
                var t = n.getGlobalCardInfo();
                if (console.log("patients:", t), i.util.isEmpty(T.value)) for (var a = 0; a < t.length; a++) if ("1" == t[a].isDefaultFlag) {
                    T.value = t[a];
                    break;
                }
                i.util.isEmpty(T.value) && (T.value = t[0]);
            }
        }), e.onShareAppMessage(function() {
            return i.util.getShareMessage();
        }), e.onReady(function() {
            var e = d;
            console.log("home-page:", e), i.util._isNotEmpty(e) && i.util._navigateTo(e);
        }), i.util._throttle(function(t) {
            switch (t) {
              case "报告查询":
                i.util._navigateTo("/intelligent/report/index");
                break;

              case "就诊记录":
                i.util._navigateTo("/intelligent/jzRecord/index");
                break;

              case "门诊缴费":
                i.util._navigateTo("/intelligent/mzjf/waitToPay/index");
                break;

              case "候诊提醒":
                i.util._navigateTo("/intelligent/hztxRecord/index");

              case "门诊费用":
                i.util._navigateTo("/intelligent/mzjf/mzfyRecord/index");
                break;

              case "余号查询":
                i.util._navigateTo("/intelligent/yhcxRecord/index");
                break;

              case "号源公示":
                z.value = !0;
                break;

              case "停诊公示":
                i.util._navigateTo("/pages/select/index?popupModel=tzgs");
                break;

              case "住院登记":
                i.util._navigateTo("/intelligent/inHospital/zydj/index");
                break;

              case "住院预交":
                i.util._navigateTo("/intelligent/inHospital/paying/index");
                break;

              case "住院预交1":
                i.util._navigateTo("/intelligent/inHospital/beforeInHosPaying/index");
                break;

              case "出院结算":
                i.util._navigateTo("/intelligent/cyjsRecord/index");
                break;

              case "出院小结":
                i.util._navigateTo("/intelligent/cyxjRecord/index");
                break;

              case "病案复印":
                e.index.navigateToMiniProgram({
                    appId: "wxff4273542debbc64",
                    path: "pages/index/index?hosId=1031"
                });
                break;

              case "出院带药":
                i.util._navigateTo("/intelligent/cydyRecord/index");
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
                i.util.showToast({
                    title: "功能暂未开放"
                });
                break;

              case "下载处方":
                i.util._navigateTo("/intelligent/downloadCf/index");
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
            }
        }, 800);
        var O = i.util._throttle(function() {
            k.value = !0;
        }), U = i.util._throttle(function() {
            i.util.navigateTo("/intelligent/inHospital/zydj/index"), k.value = !1;
        }), Q = i.util._throttle(function() {
            e.index.navigateTo({
                url: "/intelligent/inHospital/zyzq/index"
            }), k.value = !1;
        });
        function V() {
            i.util.navigateTo("/intelligent/jzr/manage/index");
        }
        i.util._throttle(function() {
            e.index.navigateTo({
                url: "/intelligent/chatbot/index?type=2"
            });
        }), i.util._throttle(function() {
            e.index.navigateTo({
                url: "/careModel/switchPage/index"
            });
        });
        var J = i.util._throttle(function() {
            e.index.navigateTo({
                url: "/intelligent/hospital/jyzn/index"
            });
        }), K = i.util._throttle(function() {
            i.util._navigateTo("/intelligent/report/index");
        }), X = i.util._throttle(function() {
            i.util._navigateTo("/intelligent/mzjf/waitToPay/index");
        }), Y = i.util._throttle(function() {
            e.index.navigateToMiniProgram({
                appId: "wx8e0b79a7f627ca18",
                path: "pages/index/index?agencyCode=64e55178027c48708c876725a9160fd1"
            });
        }), Z = i.util._throttle(function() {
            e.index.navigateTo({
                url: "/intelligent/jzr/quickSign/index"
            });
        }, 1e3), ee = i.util._throttle(function() {
            e.index.navigateTo({
                url: "/careModel/mine/index"
            });
        }, 2e3), te = i.util._throttle(function(e) {
            i.util.navigateTo("/careModel/dtgh/select/index?funType=门诊挂号&appointmentType=" + e);
        }, 2e3), ne = i.util._throttle(function() {
            i.util.navigateTo("/careModel/xzjzr/index?funType=门诊缴费");
        }, 2e3), ie = i.util._throttle(function() {
            i.util.navigateTo("/careModel/xzjzr/index?funType=报告查询");
        }, 2e3), ae = i.util._throttle(function() {
            o.globalData.careMode = !o.globalData.careMode, j.value = o.globalData.careMode, 
            j.value || (i.util.showToast({
                title: "已关闭关怀模式"
            }), e.index.showTabBar());
        }, 2e3);
        return function(n, a) {
            return e.e({
                a: e.unref(j)
            }, e.unref(j) ? e.e({
                b: e.unref(p)
            }, e.unref(p) ? {
                c: "女" != e.unref(T).sex ? "/static/sex_man.png" : "/static/sex_woman.png"
            } : {
                d: t._imports_0$4
            }, {
                e: e.unref(p)
            }, e.unref(p) ? {
                f: e.t(e.unref(T).clientName),
                g: e.t(e.unref(i.util)._hideIdCard(e.unref(T).idCardNo))
            } : {
                h: t._imports_1$2
            }, {
                i: t._imports_2$1,
                j: t._imports_3$1,
                k: e.o(function(t) {
                    return e.unref(te)(1);
                }),
                l: t._imports_4$1,
                m: t._imports_3$1,
                n: e.o(function(t) {
                    return e.unref(te)(0);
                }),
                o: t._imports_5,
                p: t._imports_3$1,
                q: e.o(function() {
                    return e.unref(ne) && e.unref(ne).apply(void 0, arguments);
                }),
                r: t._imports_6,
                s: t._imports_3$1,
                t: e.o(function() {
                    return e.unref(ie) && e.unref(ie).apply(void 0, arguments);
                }),
                v: t._imports_7,
                w: t._imports_3$1,
                x: e.o(function() {
                    return e.unref(ee) && e.unref(ee).apply(void 0, arguments);
                }),
                y: e.o(function() {
                    return e.unref(ae) && e.unref(ae).apply(void 0, arguments);
                })
            }) : e.e({
                z: e.unref(p)
            }, e.unref(p) ? {
                A: t._imports_8
            } : {}, {
                B: e.unref(p)
            }, e.unref(p) ? {
                C: t._imports_4$2,
                D: e.t(e.unref(T).clientName),
                E: e.t(e.unref(i.util)._hideIdCard(e.unref(T).idCardNo)),
                F: t._imports_0$5,
                G: e.o(V)
            } : {
                H: t._imports_0$4,
                I: e.o(function() {
                    return e.unref(Z) && e.unref(Z).apply(void 0, arguments);
                })
            }, {
                J: t._imports_11,
                K: 0 != e.unref(g).length
            }, 0 != e.unref(g).length ? {
                L: e.f(e.unref(g), function(t, n, i) {
                    return {
                        a: e.t(t.info_title),
                        b: n
                    };
                })
            } : {}, {
                M: e.o(N),
                N: t._imports_12,
                O: e.o(C),
                P: t._imports_13,
                Q: e.t(e.unref(h)),
                R: e.o(R),
                S: t._imports_0$5,
                T: e.o(function(e) {
                    return G(0, "特需医疗部");
                }),
                U: t._imports_0$5,
                V: e.o(function(e) {
                    return G(6, "国合门诊部(国际门诊)");
                }),
                W: t._imports_0$5,
                X: e.o(function(e) {
                    return G(7, "天竺门诊部(非医保单位)");
                }),
                Y: t._imports_0$5,
                Z: e.o(function(e) {
                    return G(100, "北大口腔三亚医院");
                }),
                aa: t._imports_14,
                ab: e.o(L),
                ac: t._imports_15,
                ad: e.o(A),
                ae: e.o(function() {
                    return e.unref(J) && e.unref(J).apply(void 0, arguments);
                }),
                af: e.o(function() {
                    return e.unref(K) && e.unref(K).apply(void 0, arguments);
                }),
                ag: e.o(function() {
                    return e.unref(X) && e.unref(X).apply(void 0, arguments);
                }),
                ah: e.o(function() {
                    return e.unref(Y) && e.unref(Y).apply(void 0, arguments);
                }),
                ai: e.o(W),
                aj: e.o(function() {
                    return e.unref(O) && e.unref(O).apply(void 0, arguments);
                }),
                ak: t._imports_16,
                al: t._imports_17,
                am: e.o(q),
                an: t._imports_18,
                ao: e.o(B),
                ap: t._imports_19,
                aq: e.o(H),
                ar: t._imports_20,
                as: e.o(F),
                at: e.unref(s)
            }, e.unref(s) ? {
                av: t._imports_1$3,
                aw: t._imports_1$3,
                ax: t._imports_2$2,
                ay: e.unref(f),
                az: e.o(S),
                aA: e.o(D)
            } : {}, {
                aB: e.unref(u)
            }, e.unref(u) ? {
                aC: t._imports_1$3,
                aD: t._imports_1$3,
                aE: t._imports_2$2,
                aF: e.t(e.unref(c).info_desc),
                aG: e.o(I),
                aH: e.o(P)
            } : {}, {
                aI: e.unref(k)
            }, e.unref(k) ? {
                aJ: t._imports_1$3,
                aK: t._imports_1$3,
                aL: t._imports_2$2,
                aM: e.o(function() {
                    return e.unref(Q) && e.unref(Q).apply(void 0, arguments);
                }),
                aN: e.o(function() {
                    return e.unref(U) && e.unref(U).apply(void 0, arguments);
                })
            } : {}, {
                aO: e.unref(z)
            }, e.unref(z) ? {
                aP: t._imports_0$6,
                aQ: e.o(function(e) {
                    return E(1);
                }),
                aR: t._imports_1$4,
                aS: e.o(function(e) {
                    return E(0);
                }),
                aT: e.o($),
                aU: e.o($)
            } : {}, {
                aV: e.unref(r)
            }, e.unref(r) ? {
                aW: e.o(w),
                aX: e.o(M)
            } : {}));
        };
    }
}, o = e._export_sfc(a, [ [ "__scopeId", "data-v-2bbd6b80" ] ]);

a.__runtimeHooks = 2, wx.createPage(o);