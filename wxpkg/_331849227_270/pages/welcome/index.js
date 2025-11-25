var e = require("../../common/vendor.js"), t = require("../../utils/util.js"), o = require("../../request/request.js"), i = require("../../common/assets.js"), r = getApp(), n = {
    data: function() {
        return {
            errorMsg: "",
            imgBase: t.util.getImgBase(),
            screenHeight: 0,
            redirectPage: "/pages/home/index",
            error: !1,
            miniVersion: "",
            isShow: !1,
            timestamp: 0,
            hospital: "北京大学口腔医院",
            oauthUrl: t.util.getOauthUrl(),
            version: "1.0"
        };
    },
    components: {
        privacyAgreement: function() {
            return "../../components/privacyAgreement/index.js";
        }
    },
    onLoad: function(o) {
        console.log(o, "欢迎页面"), this.miniVersion = t.util.getMiniGrogVersion();
        var i = o.q;
        if (t.util._isNotEmpty(i)) {
            var n = decodeURIComponent(i), s = t.util.getQueryString(n, "path"), a = t.util.getQueryString(n, "join");
            t.util._isNotEmpty(s) && e.index.setStorageSync("redirectPath", decodeURIComponent(s)), 
            t.util._isNotEmpty(a) && t.util.setInviteCode(a);
        }
        var l = o.page;
        t.util._isNotEmpty(l) && e.index.setStorageSync("redirectPage", decodeURIComponent(l));
        var c = o.code;
        r.globalData.gzhCode = c, this.isShow = t.util._isEmpty(c) && !t.util.isDesktop(), 
        this.timestamp = t.util.string(new Date().getTime());
    },
    methods: {
        showErrorMsg: function() {
            var e = {
                title: "错误信息",
                content: this.errorMsg
            };
            console.log("1", e), t.util.showModal(e);
        },
        agree: function() {
            console.log("2"), t.util._isNotEmpty(r.globalData.gzhCode) && this.loginXcx();
        },
        loginXcx: function() {
            var e = this;
            this.error = !1, o.login().then(function(t) {
                e._resolve();
            }).catch(function(t) {
                console.log(t), e._reject(t);
            });
        },
        _resolve: function() {
            var i = this, n = e.index.getStorageSync("redirectPage");
            n && (i.redirectPage = n, e.index.removeStorage({
                key: "redirectPage",
                success: function(e) {
                    console.log(e);
                }
            }));
            var s = t.util.getStorage("content_info");
            if (t.util._isNotEmpty(s)) return r.globalData.noticeList = s.noticeList || [], 
            r.globalData.dtghInfoObj = s.dtghInfoObj || {}, r.globalData.yyghInfoObj = s.yyghInfoObj || {}, 
            r.globalData.clInfoObj = s.clInfoObj || {}, void t.util.reLaunch(i.redirectPage);
            o.getHisAdviseList({
                typeId: "05,12,hlwfzxz,cfjftx,BAFYGZ,YYXZ"
            }).then(function(e) {
                if (console.log("YYGG：", e), 0 == e.status) {
                    var o, n, s, a = [], l = [], c = [], g = [], u = [], f = [];
                    (e.data || []).forEach(function(e) {
                        var t = e.info_type || "";
                        if ("05" == t) a.push(e); else if ("12" == t) l.push(e); else if ("hlwfzxz" == t) g.push(e); else if ("cfjftx" == t) u.push(e); else if ("BAFYGZ" == t) {
                            var o = e.info_content;
                            e.info_content = o.substring(0, 2) + " style='text-align: left; text-indent: 0em;'" + o.substring(2), 
                            f.push(e);
                        } else "YYXZ" == t && c.push(e);
                    }), r.globalData.noticeList = a, r.globalData.hlwyyFz = g, r.globalData.jftx = u, 
                    r.globalData.BAFYGZ = f, l.forEach(function(e) {
                        var t = e.info_order || "";
                        "1" == t ? o = e : "2" == t ? n = e : "3" == t && (s = e);
                    }), c.forEach(function(e) {
                        "1130" == (e.info_id || "") && (s = e);
                    }), console.log(s), r.globalData.dtghInfoObj = o, r.globalData.yyghInfoObj = n, 
                    r.globalData.clInfoObj = s;
                    var h = {
                        dtghInfoObj: o,
                        yyghInfoObj: n,
                        clInfoObj: s,
                        noticeList: a,
                        hlwyyFz: g,
                        jftx: u,
                        BAFYGZ: f
                    };
                    t.util.setStorage("content_info", h, 864e5);
                }
                t.util.reLaunch(i.redirectPage);
            }).catch(function(e) {
                console.log(e), t.util._showModal({
                    content: e.message || JSON.stringify(e) || "查询失败，请稍候重试"
                });
            });
        },
        _reject: function(e) {
            this.error = !0, this.errorMsg = e.message || "系统繁忙，请稍后再试";
        }
    }
};

Array || e.resolveComponent("privacy-agreement")();

var s = e._export_sfc(n, [ [ "render", function(t, o, r, n, s, a) {
    return e.e({
        a: !s.error
    }, s.error ? {} : e.e({
        b: s.isShow
    }, s.isShow ? {
        c: s.oauthUrl + "?appid=wx6f6997163ca03272&redirect_uri=%2Fpages%2Fwelcome%2Findex&redirect_type=mp-weixin&scope=snsapi_base&v=" + s.version
    } : {
        d: i._imports_0,
        e: e.t(s.miniVersion)
    }), {
        f: s.error
    }, s.error ? {
        g: i._imports_1,
        h: e.o(function() {
            return a.loginXcx && a.loginXcx.apply(a, arguments);
        }),
        i: e.o(function() {
            return a.showErrorMsg && a.showErrorMsg.apply(a, arguments);
        })
    } : {}, {
        j: e.o(a.agree),
        k: e.p({
            hospital: s.hospital
        })
    });
} ] ]);

wx.createPage(s);