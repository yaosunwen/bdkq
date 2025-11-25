globalThis.global = globalThis
globalThis.wx = {
    canIUse: function () {
        console.log('canIUse', ...arguments);
    },
    getSystemInfoSync: function () {
        console.log('getSystemInfoSync', ...arguments);
    },
    getStorageSync: function(key) {
        console.log('getStorageSync', ...arguments);
    }
}
globalThis.Page = () => ({})
globalThis.Component = () => ({})
globalThis.getApp = () => ({
    globalData: {
        careMode: !1,
        jumpEncKey: "Gu3V0qoBJA91xIgj",
        apiDomain: "https://app.bdkq.mingxuan.store/",
        imgDomain: "https://app.bdkq.mingxuan.store/",
        oauthDomain: "https://app.bdkq.mingxuan.store/",
        imgUrlApi: "https://app.bdkq.mingxuan.store/xcx-bjdxkqyy-assets",
        assets: "xcx-bjdxkqyy-assets",
        service: "xcx-bjdxkqyy-wx",
        version: "default",
        shake: !0,
        isSecret: !0,
        apiSecret: "nY-PkxTm54dJ4FD41f_LsJP_cQz7PjTJ",
        registered: !1,
        dist: "0",
        hospital: "北京大学口腔医院",
        address: "",
        latitude: 0,
        longitude: 0,
        hosIcon: "/static/logo.png",
        org_code: "12100000400777097N",
        medical: {},
        orgAppId: "1H4NRR7OE01GE1470B0A000017FC6F77",
        cityCode: "150624",
        channel: "AAEX6MbEZwAm6aWt37M3hjN3",
        orgCodg: "H15062400020",
        orgChnlCrtfCodg: "BqK1kMStlhVDgN2uHf4EsLK/F2LjZPYJ81nK2eYQqxvTfm7KAKrRX+Ay4MX9wwMT",
        orgVersion: "release",
        myUserId: 0,
        bindPatients: {},
        versionStorage: "",
        hospitalInfo: {
            subMessageArrays: {
                medicalAppointment: [ "od7J_d1B4IQtBAhOW8ze_m9uozWIgLYOi4RMBIZaJdE" ],
                medicalTakeCode: [ "GF9jutX36ucTGo2n9FODlUFj7UI7aeaLLk9svZfL7Sc" ],
                appointmentToday: [ "ZoQ2OyUWW4KpULdATuBpiHkktmTBCKez-m7SWqveL2A" ],
                appointmentCancel: [ "iIY3dqIxbXQKopNpAKoGHf-0dHz8ApwJd9d_ffB-MYQ" ],
                appointmentAfterday: [ "XJt8Gstm5ixYxItbTD0Gv7u5yfMxadnoU6ygmEnovzg", "0_CYhkZgugycFunwBPYlxv1I8hACYksMFxFa06u4tXw" ],
                afterPay: [ "Pbo0Z9BA1KiDPQB4HmQl6gy4hTqQpOnEiF27Q0K6aZc" ],
                mzjfList: [ "gPBjg3Y5-M5_u0GYmaC1UjhLAw9z1aJ8OCodES6AfHU", "9pxd7OlH34yZOCTi32EM3l9dv3qIM_7BAEKUoimcP1c" ],
                orderDrugs: [ "be3lNLjQy0nZrpFP-_1BS-EevsrKkScunbVyjFU1iFU" ],
                auditResult: [ "NQsON_WKUdLdkjZIpymyO5FeCSJBAG5M1gq_fUYiPqY" ],
                inhospitalCharge: [ "ZMIRuBQ4BfzLCb80W0JZHlVeHd6ARUu4fQAlaTrRLQk" ],
                inhospitalCharge1: [ "ZMIRuBQ4BfzLCb80W0JZHufm2GnuB0Xm88f_Kt-o20A" ],
                inhospitalSettlement: [ "Pbo0Z9BA1KiDPQB4HmQl6twHStUHeLgsDxfUlmtDcuc" ],
                onlineReceive: [ "gQplPJpk1grdUtGSiCFoPINs6cVJqgBnkoYyIIdrYZ0", "BMXTi7TLhIrfj-38QD0Ii13dqCnYp9yV-gLl3QIvSS0", "LJdw9SEOZJCnt1O9V1Y_4nVktvLWnsjb38gd6XSzxII" ],
                onlineCancel: [ "BM-var4GbNzdlOUuVK876AMC464bL_fmC4orbxM5x08" ],
                onlineRefund: [ "34-OWISx8xPUB1T4YWqmJXLz6nN5eWISEVfPvYzvaoI" ]
            }
        }
    }
})