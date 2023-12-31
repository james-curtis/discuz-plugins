// <!-----------------2017-04-06 14:20:24.199---------------------->
!(function(document, undefined) {
    if ("undefined" == typeof SOTool)
        var SOTool = {}
          , SOTool = {
            PluginStack: {},
            JsList: {},
            shareObj: function(a, b) {
                "undefined" == typeof window.CloudSdkPlugin && (window.CloudSdkPlugin = {});
                window.CloudSdkPlugin.hasOwnProperty("STK") || (window.CloudSdkPlugin.STK = {});
                window.CloudSdkPlugin.STK[a] = b
            },
            getObj: function(a) {
                "undefined" == typeof window.CloudSdkPlugin && (window.CloudSdkPlugin = {});
                if (!window.CloudSdkPlugin.hasOwnProperty("STK"))
                    throw Error("no " + a + " Obj");
                return window.CloudSdkPlugin.STK[a]
            },
            creatPlugin: function(a, b) {
                "undefined" == typeof window.CloudSdkPlugin && (window.CloudSdkPlugin = {});
                window.CloudSdkPlugin[a] = b
            },
            getPlugin: function(a, b) {
                if ("STK" == a)
                    throw Error(a + " is not support");
                window.CloudSdkPlugin && "undefined" != typeof window.CloudSdkPlugin[a] ? b && b(window.CloudSdkPlugin[a]) : SOTool.JsList.hasOwnProperty(SOTool.PluginStack[a]) ? b && SOTool.JsList[SOTool.PluginStack[a]].push(b) : (SOTool.JsList[SOTool.PluginStack[a]] = [],
                b && SOTool.JsList[SOTool.PluginStack[a]].push(b),
                videoSdkTool.getJS(SOTool.PluginStack[a], function() {
                    var b = videoSdkTool.clone(SOTool.JsList[SOTool.PluginStack[a]]);
                    delete SOTool.JsList[SOTool.PluginStack[a]];
                    for (var c = 0; c < b.length; c++) {
                        var g = b[c];
                        g && g(window.CloudSdkPlugin[a])
                    }
                }, function() {
                    var b = videoSdkTool.clone(SOTool.JsList[SOTool.PluginStack[a]]);
                    delete SOTool.JsList[SOTool.PluginStack[a]];
                    for (var c = 0; c < b.length; c++) {
                        var g = b[c];
                        g && g(null)
                    }
                }, this, "utf-8"))
            },
            setPluginStack: function(a, b) {
                if (videoSdkTool.isArray(a))
                    for (var d = 0; d < a.length; d++)
                        arguments.callee(a[d], b);
                else if (a.hasOwnProperty("name") && a.hasOwnProperty("url"))
                    SOTool.PluginStack[a.name] = a.url,
                    "http" != a.url.substr(0, 4) && (SOTool.PluginStack[a.name] = "https:" == window.location.protocol ? window.location.protocol + SOTool.PluginStack[a.name].replace(/{domain}/g, "s.yuntv.letv.com") : "http:" + SOTool.PluginStack[a.name].replace(/{domain}/g, "yuntv.letv.com"),
                    SOTool.PluginStack[a.name] = SOTool.PluginStack[a.name].replace(/{LANG}/g, b));
                else
                    throw Error(a + "must has name and url");
            },
            preload: function() {
                for (var a = arguments, b = 0; b < a.length; b++)
                    SOTool.getPlugin(a[b])
            }
        };
    SOTool.shareObj("common.SOTool", SOTool);
    var DomainTool = function() {
        function a(a, b) {
            var c = "";
            -1 != a.indexOf("://") && (c = a.split("://")[1]);
            var h = c;
            d.hasOwnProperty(c) && d[c].hasOwnProperty(b) && (h = d[c][b]);
            return a.replace(c, h)
        }
        function b(a, b) {
            var d = a;
            if (window && "https:" == window.location.protocol || "undefined" != typeof b && b) {
                if (-1 != a.indexOf("http://"))
                    return d = a.split("://")[1],
                    c.hasOwnProperty(d) && (d = c[d]),
                    "https://" + d;
                c.hasOwnProperty(d) && (d = c[d])
            }
            return d
        }
        var d = {
            "api.mms.lecloud.com": {
                en_US: "api.usmms.lecloud.com"
            },
            "apple.www.letv.com": {
                en_US: "apple.us.www.letv.com"
            }
        }
          , c = {
            "yuntv.letv.com": "s.yuntv.letv.com",
            "sdk.lecloud.com": "sdkletv.lecloud.com",
            "ark.letv.com": "arkletv.lecloud.com",
            "api.letvcloud.com": "apiletv.lecloud.com",
            "api.mms.lecloud.com": "api-mms.lecloud.com",
            "api.live.letvcloud.com": "api-live.lecloud.com",
            "apple.www.letv.com": "apple-www.le.com",
            "log.cdn.letvcloud.com": "log-cdn.letvcloud.com"
        };
        return {
            getDomain: function(c, d, f) {
                var h = c;
                -1 != c.indexOf("://") && (h = c.match(/^http(|s):\/\/[a-zA-Z\.0-9:]*/)[0],
                h = c.replace(h, b(a(h, d), f)));
                return h
            }
        }
    }();
    SOTool.shareObj("common.DomainTool", DomainTool);
    var Message = function() {
        return {
            NoSupportPano: 0,
            Drm: 1,
            NoStart: 2,
            INTERRUPT: 3,
            END: 4,
            GSLB_IO: 470,
            Other: "other"
        }
    }();
    SOTool.shareObj("model.Message", Message);
    var LangTool = function() {
        var a = !1, b;
        return {
            loadLang: a,
            toMessage: function(d, c, g) {
                if (a)
                    return b.hasOwnProperty(g) ? {
                        message: b[g]
                    } : {
                        message: g
                    };
                SOTool.getPlugin("lang.message.plugin." + c, function(c) {
                    c && (b = c,
                    a = !0);
                    d()
                });
                return !1
            },
            toMessageN: function(d, c, g) {
                if (a)
                    return b.hasOwnProperty(g.message) ? {
                        message: b[g.message]
                    } : "490" == g.code ? {
                        message: g.message
                    } : {
                        message: b[Message.Other]
                    };
                SOTool.getPlugin("lang.message.plugin." + c, function(c) {
                    c && (b = c,
                    a = !0);
                    d()
                });
                return !1
            },
            ms: b
        }
    }();
    SOTool.shareObj("common.LangTool", LangTool);
    var videoSdkTool = function() {
        function a(a) {
            for (var b = [{
                name: "ie",
                test: /msie/
            }, {
                name: "opera",
                test: /opera/
            }, {
                name: "firefox",
                test: /firefox/
            }, {
                name: "safari",
                test: /safari.*(?!chrome)/
            }, {
                name: "chrome",
                test: /chrome/
            }, {
                name: "wph",
                test: /windows phone/
            }, {
                name: "ps",
                test: /playstation/
            }, {
                name: "uc",
                test: /ucbrowser|ucweb/
            }, {
                name: "ps",
                test: /playstation/
            }, {
                name: "xiaomi",
                test: /xiaomi/
            }, {
                name: "qq",
                test: /qqbrowser/
            }, {
                name: "weixin",
                test: /micromessenger/
            }, {
                name: "360",
                test: /360browser/
            }, {
                name: "baidu",
                test: /baidu/
            }, {
                name: "qqwebview",
                test: / qq/
            }, {
                name: "sougou",
                test: /sougou/
            }, {
                name: "liebao",
                test: /liebaofast/
            }, {
                name: "letv",
                test: /eui browser/
            }], c = "un", d = 0; d < b.length; d++) {
                var k = b[d];
                k.test.test(a) && (c = k.name)
            }
            return c
        }
        function b(a) {
            var b = "Win32" == navigator.platform || "Windows" == navigator.platform
              , c = "Mac68K" == navigator.platform || "MacPPC" == navigator.platform || "Macintosh" == navigator.platform || "MacIntel" == navigator.platform;
            if (c)
                return "mac";
            if (b) {
                if (-1 < a.indexOf("windows nt 5.0") || -1 < a.indexOf("windows 2000"))
                    return "win2000";
                if (-1 < a.indexOf("windows nt 5.1") || -1 < a.indexOf("windows XP"))
                    return "winXP";
                if (-1 < a.indexOf("windows nt 5.2") || -1 < a.indexOf("windows 2003"))
                    return "win2003";
                if (-1 < a.indexOf("windows nt 6.0") || -1 < a.indexOf("windows vista"))
                    return "winVista";
                if (-1 < a.indexOf("windows nt 6.1") || -1 < a.indexOf("windows 7"))
                    return "win7"
            }
            return /android/.test(a) ? "android" : a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || a.match(/iphone/) || a.match(/ipad/) ? "ios" : "X11" != navigator.platform || b || c ? -1 < String(navigator.platform).indexOf("Linux") ? "linux" : "un" : "unix"
        }
        var d = navigator.userAgent.toLowerCase()
          , c = {
            br: "",
            device: "",
            ver: "",
            params: null,
            os: ""
        };
        return {
            br: c,
            getOs: function() {
                "" == c.os && (c.os = b(d));
                return c.os
            },
            getUrlParams: function(a) {
                if (null == c.params) {
                    var b = window.location.search
                      , d = {};
                    if (-1 != b.indexOf("?"))
                        for (var b = b.substr(1).split("&"), h = 0; h < b.length; h++) {
                            var k = b[h].substr(0, b[h].indexOf("="))
                              , l = b[h].substr(b[h].indexOf("=") + 1);
                            d[k] = l
                        }
                    c.params = d
                }
                return c.params && c.params.hasOwnProperty(a) ? c.params[a] : !1
            },
            getDevice: function() {
                if ("" == c.device) {
                    var a;
                    a: {
                        a = [{
                            name: "wph",
                            test: /windows phone/
                        }, {
                            name: "ipad",
                            test: /ipad/
                        }, {
                            name: "iphone",
                            test: /iphone/
                        }, {
                            name: "androidPad",
                            test: /(?!.*mobile)android/
                        }, {
                            name: "androidPhone",
                            test: /android.*mobile/
                        }, {
                            name: "android",
                            test: /android/
                        }, {
                            name: "pc",
                            test: /windows/
                        }, {
                            name: "mac",
                            test: /macintosh|mac os x/
                        }];
                        for (var b = 0; b < a.length; b++) {
                            var f = a[b];
                            if (f.test.test(d)) {
                                a = f.name;
                                break a
                            }
                        }
                        a = "un"
                    }
                    c.device = a
                }
                return c.device
            },
            getBrowser: function() {
                "" == c.br && (c.br = a(d));
                return c.br
            },
            getBrowserVersion: function() {
                "" == c.br && (c.br = a(d));
                if ("" == c.ver) {
                    var b = {}, e;
                    (e = d.match(/msie ([\d.]+)/)) ? b.msie = e[1] : (e = d.match(/firefox\/([\d.]+)/)) ? b.firefox = e[1] : (e = d.match(/360browser/)) ? b.b360 = e[1] ? e[1] : "-" : (e = d.match(/qqbrowser\/([\d.]+)/)) ? b.bqq = e[1] : (e = d.match(/ucbrowser\/([\d.]+)/)) ? b.buc = e[1] : (e = d.match(/baidubrowser\/([\d.]+)/)) ? b.bbaidu = e[1] : (e = d.match(/sogoumobilebrowser\/([\d.]+)/)) ? b.bsgm = e[1] : (e = d.match(/liebaofast\/([\d.]+)/)) ? b.blbfast = e[1] : (e = d.match(/mb2345browser\/([\d.]+)/)) ? b.b2345 = e[1] : (e = d.match(/4g explorer\/([\d.]+)/)) ? b.b4g = e[1] : (e = d.match(/huohoubrowser\/([\d.]+)/)) ? b.bhuohou = e[1] : (e = d.match(/maxthon[\/ ]([\d.]+)/)) ? b.maxthon = e[1] : (e = d.match(/(opera)|(opr)\/([\d.]+)/)) ? b.opera = e[3] : (e = d.match(/chrome\/([\d.]+)/)) ? b.chrome = e[1] : (e = d.match(/version\/([\d.]+).*safari/)) ? b.safari = e[1] : b.other = "-";
                    e = "";
                    for (var f in b)
                        e = b[f];
                    c.ver = e
                }
                return c.br + c.ver
            },
            now: Date.now || function() {
                return +new Date
            }
            ,
            getJS: function(a, b, c, d, k, l) {
                if ("undefined" != typeof a) {
                    var m = document.head || document.getElementsByTagName("head")[0] || document.documentElement, n = document.createElement("script"), s;
                    n.type = "text/javascript";
                    k && (n.charset = k);
                    n.onload = n.onreadystatechange = function() {
                        n.readyState && "loaded" != n.readyState && "complete" != n.readyState || (n = n.onreadystatechange = n.onload = n.onerror = null,
                        clearTimeout(s),
                        "function" == typeof b && b.call(d))
                    }
                    ;
                    n.onerror = function() {
                        n = n.onload = n.onreadystatechange = n.onerror = null;
                        clearTimeout(s);
                        "function" == typeof c && c.call(d)
                    }
                    ;
                    n.src = a;
                    m.appendChild(n);
                    l || (l = 1E4);
                    s = setTimeout(function() {
                        clearTimeout(s);
                        "function" == typeof c && c()
                    }, l)
                }
            },
            getJSON: function(a, b, c, d, k, l) {
                var m = this.now(), n = "letvcloud" + m + Math.floor(100 * Math.random()), s = "$1" + n + "$2", t = 0, q = 0, u = this, r, v = -1, w = document.head || document.getElementsByTagName("head")[0] || document.documentElement, x = this.urlToObj(a);
                x.hasOwnProperty("callback") ? n = x.callback : (/_r=/i.test(a) || (a += "&callback=?"),
                a = a.replace(/(\=)\?(&|$)|\?\?/i, s));
                d = d || 5E3;
                var B = k || 2
                  , C = l || 1E3;
                window[n] = function(a) {
                    z();
                    window[n] = null;
                    v = -1;
                    b.call(this, a, {
                        responseTime: u.now() - m,
                        retryCount: t
                    })
                }
                ;
                var z = function() {
                    clearTimeout(q);
                    r && r.parentNode && (w.removeChild(r),
                    r.onload = r.onreadystatechange = null,
                    r.onerror = null,
                    r = void 0)
                }
                  , D = function() {
                    z();
                    t >= B ? (clearTimeout(q),
                    window[n] = null,
                    c && c.call(this, null, {
                        responseTime: u.now() - m,
                        retryCount: t,
                        error: v
                    })) : setTimeout(A, C)
                }
                  , A = function() {
                    z();
                    t++;
                    a = a.replace(/&_r=[\d|\?]+/i, "&_r=" + t);
                    r = document.createElement("script");
                    r.setAttribute("type", "text/javascript");
                    r.setAttribute("src", a);
                    r.setAttribute("charset", "utf-8");
                    r.onload = r.onreadystatechange = function(a) {
                        r.onload = r.onreadystatechange = null;
                        clearTimeout(q)
                    }
                    ;
                    w.insertBefore(r, w.firstChild);
                    v = 1;
                    q = setTimeout(D, d)
                };
                A()
            },
            getJSONbyAjax: function(a, b, c, d, k, l) {
                var m = this.now(), n = 0, s = this, t = -1, q;
                d = d || 5E3;
                var u = k || 2
                  , r = l || 1E3
                  , v = function() {
                    clearTimeout(0);
                    q && (q.onreadystatechange = null)
                }
                  , w = function() {
                    v();
                    n >= u ? (clearTimeout(0),
                    c && c.call(this, null, {
                        responseTime: s.now() - m,
                        retryCount: n,
                        error: t
                    })) : setTimeout(x, r)
                }
                  , x = function() {
                    v();
                    n++;
                    q = new XMLHttpRequest;
                    q.timeout = d;
                    q.onreadystatechange = function(a) {
                        4 == q.readyState && (200 == q.status ? (a = q.responseText,
                        v(),
                        t = -1,
                        b.call(this, a, {
                            responseTime: s.now() - m,
                            retryCount: n
                        })) : w())
                    }
                    ;
                    q.ontimeout = w;
                    q.open("GET", a, !0);
                    q.send();
                    t = 1
                };
                x()
            },
            creatUuid: function() {
                var a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), b = [], c, d;
                d = 16;
                for (c = 0; 32 > c; c++)
                    b[c] = a[0 | Math.random() * d];
                return b.join("")
            },
            urlToObj: function(a) {
                var b = {}
                  , c = a;
                -1 != a.indexOf("?") && (c = a.substr(1));
                a = c.split("&");
                for (c = 0; c < a.length; c++) {
                    var d = a[c].substr(0, a[c].indexOf("="))
                      , k = a[c].substr(a[c].indexOf("=") + 1);
                    b[d] = k
                }
                return b
            },
            objectParseToString: function(a) {
                if (null == a)
                    return "";
                var b = "", c = 0, d;
                for (d in a)
                    b = 0 < c ? b + ("&" + d + "=" + a[d]) : b + (d + "=" + a[d]),
                    c++;
                return b
            },
            cookie: function(a, b, c) {
                if ("undefined" != typeof b) {
                    c = c || {};
                    null === b && (b = "",
                    c.expires = -1);
                    var d = "";
                    c.expires && ("number" == typeof c.expires || c.expires.toUTCString) && ("number" == typeof c.expires ? (d = new Date,
                    d.setTime(d.getTime() + 864E5 * c.expires)) : d = c.expires,
                    d = "; expires=" + d.toUTCString());
                    var k = c.path ? "; path=" + c.path : ""
                      , l = c.domain ? "; domain=" + c.domain : "";
                    c = c.secure ? "; secure" : "";
                    document.cookie = [a, "=", encodeURIComponent(b), d, k, l, c].join("")
                } else {
                    b = null;
                    if (document.cookie && "" != document.cookie)
                        for (c = document.cookie.split(";"),
                        d = 0; d < c.length; d++)
                            if (k = c[d],
                            k.substring(0, a.length + 1) == a + "=") {
                                b = decodeURIComponent(k.substring(a.length + 1));
                                break
                            }
                    return b
                }
                return null
            },
            setLocal: function(a, b, c) {
                "undefined" == typeof c && (c = !0);
                if (window.localStorage)
                    try {
                        localStorage.setItem(a, b)
                    } catch (d) {}
                c && this.cookie(a, b, c)
            },
            getLocal: function(a, b) {
                "undefined" == typeof b && (b = !0);
                if (window.localStorage)
                    try {
                        if (localStorage.getItem(a))
                            return localStorage.getItem(a)
                    } catch (c) {}
                return b ? this.cookie(a) : -1
            },
            num2Time: function(a) {
                var b;
                b = 10 > parseInt(a / 60) ? "0" + parseInt(a / 60) + ":" : parseInt(a / 60) + ":";
                a = 10 > parseInt(a % 60) ? "0" + parseInt(a % 60) + "" : parseInt(a % 60) + "";
                return b + a
            },
            lt10: function(a) {
                return 10 > a ? "0" + a : a
            },
            num2Duration: function(a) {
                return 60 <= parseInt(a / 60) ? this.lt10(parseInt(a / 3600)) + ":" + this.lt10(parseInt(a / 60 % 60)) + ":" + this.lt10(parseInt(a % 60)) : this.lt10(parseInt(a / 60)) + ":" + this.lt10(parseInt(a % 60))
            },
            clone: function(a) {
                var b, c, d;
                if ("object" != typeof a || null === a)
                    return a;
                if (a instanceof Array)
                    for (b = [],
                    c = 0,
                    d = a.length; c < d; c++)
                        b[c] = "object" == typeof a[c] && null != a[c] ? arguments.callee(a[c]) : a[c];
                else
                    for (c in b = {},
                    a)
                        b[c] = "object" == typeof a[c] && null != a[c] ? arguments.callee(a[c]) : a[c];
                return b
            },
            isHttps: function() {
                try {
                    return "https:" == window.location.protocol
                } catch (a) {}
                return !1
            },
            isArray: function(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            },
            isFunction: function(a) {
                return "[object Function]" === Object.prototype.toString.call(a)
            },
            addUrlParams: function(a, b) {
                for (var c = 0; c < a.length; c++) {
                    var d = a[c], k;
                    for (k in b)
                        -1 == d.indexOf("&" + k + "=") && -1 == d.indexOf("?" + k + "=") && (d = -1 != d.indexOf("?") ? d + ("&" + k + "=" + b[k]) : d + ("?" + k + "=" + b[k]));
                    a[c] = d
                }
            },
            bindFun: function(a, b) {
                return a.bind ? a.bind(b) : function() {
                    return a.apply(b, arguments)
                }
            },
            split: function(a, b, c) {
                a = a.split(b);
                var d = [];
                if ("undefined" == typeof c || c >= a.length)
                    return a;
                for (; d.length < c - 1; )
                    d.push(a[0]),
                    a.shift();
                d[c - 1] = a.join(b);
                return d
            }
        }
    }();
    SOTool.shareObj("common.videoSdkTool", videoSdkTool);
    videoSdkTool.checkPano = function() {
        try {
            var a = document.createElement("canvas");
            if (window.WebGLRenderingContext && (a.getContext("webgl") || a.getContext("experimental-webgl")))
                switch (videoSdkTool.getDevice()) {
                case "androidPad":
                case "androidPhone":
                case "android":
                    if ("chrome" == videoSdkTool.getBrowser() || "firefox" == videoSdkTool.getBrowser())
                        return !0;
                    break;
                case "pc":
                    return !0
                }
        } catch (b) {}
        return !1
    }
    ;
    SOTool.shareObj("common.videoSdkTool", videoSdkTool);
    var WIN = window
      , DC = document
      , ApiList = "playNewId getVideoSetting getVideoTime pauseVideo resumeVideo seekTo replayVideo closeVideo setVolume shutDown startUp getBufferPercent setDefinition getDefinition getDefaultDefinition getDefinitionList getDefList setVideoPercent getVideoPercent setVideoScale getVideoScale resetVideoScale fullVideoScale setVideoRect getLoadPercent getDownloadSpeed getPlayRecord getPlayState setVideoColor getVideoColor getVersion setAutoReplay feedback getLog getServerTime setTipInfo setPlayerInfo setHorseRaceLampInfo barrageInput barrageStop barrageStart barrageResume barragePause callFlash setPoint removePoint".split(" ")
      , BaseCode = {
        decode: function(a) {
            var b, d, c, g, e, f = 0, h = 0;
            g = "";
            var k = [];
            if (!a)
                return a;
            a += "";
            do
                b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(f++)),
                d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(f++)),
                g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(f++)),
                e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(f++)),
                c = b << 18 | d << 12 | g << 6 | e,
                b = c >> 16 & 255,
                d = c >> 8 & 255,
                c &= 255,
                64 == g ? k[h++] = String.fromCharCode(b) : 64 == e ? k[h++] = String.fromCharCode(b, d) : k[h++] = String.fromCharCode(b, d, c);
            while (f < a.length);return g = k.join("")
        },
        encode: function(a) {
            var b, d, c, g, e = 0, f = 0, h = "", h = [];
            if (!a)
                return a;
            a = this.utf8_encode(a + "");
            do
                b = a.charCodeAt(e++),
                d = a.charCodeAt(e++),
                c = a.charCodeAt(e++),
                g = b << 16 | d << 8 | c,
                b = g >> 18 & 63,
                d = g >> 12 & 63,
                c = g >> 6 & 63,
                g &= 63,
                h[f++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g);
            while (e < a.length);h = h.join("");
            switch (a.length % 3) {
            case 1:
                h = h.slice(0, -2) + "==";
                break;
            case 2:
                h = h.slice(0, -1) + "="
            }
            return h
        },
        utf8to16: function(a) {
            var b, d, c, g, e, f;
            b = "";
            c = a.length;
            for (d = 0; d < c; )
                switch (g = a.charCodeAt(d++),
                g >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    b += a.charAt(d - 1);
                    break;
                case 12:
                case 13:
                    e = a.charCodeAt(d++);
                    b += String.fromCharCode((g & 31) << 6 | e & 63);
                    break;
                case 14:
                    e = a.charCodeAt(d++),
                    f = a.charCodeAt(d++),
                    b += String.fromCharCode((g & 15) << 12 | (e & 63) << 6 | (f & 63) << 0)
                }
            return b
        }
    }
      , MD5 = function() {
        function a(a, b, c, d, l, m) {
            a = g(g(b, a), g(d, m));
            return g(a << l | a >>> 32 - l, c)
        }
        function b(b, c, d, g, l, m, n) {
            return a(c & d | ~c & g, b, c, l, m, n)
        }
        function d(b, c, d, g, l, m, n) {
            return a(c & g | d & ~g, b, c, l, m, n)
        }
        function c(b, c, d, g, l, m, n) {
            return a(d ^ (c | ~g), b, c, l, m, n)
        }
        function g(a, b) {
            var c = (a & 65535) + (b & 65535);
            return (a >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535
        }
        return {
            hash: function(e) {
                for (var f = [], h = 0; h < 8 * e.length; h += 8)
                    f[h >> 5] |= (e.charCodeAt(h / 8) & 255) << h % 32;
                e = 8 * e.length;
                f[e >> 5] |= 128 << e % 32;
                f[(e + 64 >>> 9 << 4) + 14] = e;
                e = 1732584193;
                for (var h = -271733879, k = -1732584194, l = 271733878, m = 0; m < f.length; m += 16) {
                    var n = e
                      , s = h
                      , t = k
                      , q = l;
                    e = b(e, h, k, l, f[m + 0], 7, -680876936);
                    l = b(l, e, h, k, f[m + 1], 12, -389564586);
                    k = b(k, l, e, h, f[m + 2], 17, 606105819);
                    h = b(h, k, l, e, f[m + 3], 22, -1044525330);
                    e = b(e, h, k, l, f[m + 4], 7, -176418897);
                    l = b(l, e, h, k, f[m + 5], 12, 1200080426);
                    k = b(k, l, e, h, f[m + 6], 17, -1473231341);
                    h = b(h, k, l, e, f[m + 7], 22, -45705983);
                    e = b(e, h, k, l, f[m + 8], 7, 1770035416);
                    l = b(l, e, h, k, f[m + 9], 12, -1958414417);
                    k = b(k, l, e, h, f[m + 10], 17, -42063);
                    h = b(h, k, l, e, f[m + 11], 22, -1990404162);
                    e = b(e, h, k, l, f[m + 12], 7, 1804603682);
                    l = b(l, e, h, k, f[m + 13], 12, -40341101);
                    k = b(k, l, e, h, f[m + 14], 17, -1502002290);
                    h = b(h, k, l, e, f[m + 15], 22, 1236535329);
                    e = d(e, h, k, l, f[m + 1], 5, -165796510);
                    l = d(l, e, h, k, f[m + 6], 9, -1069501632);
                    k = d(k, l, e, h, f[m + 11], 14, 643717713);
                    h = d(h, k, l, e, f[m + 0], 20, -373897302);
                    e = d(e, h, k, l, f[m + 5], 5, -701558691);
                    l = d(l, e, h, k, f[m + 10], 9, 38016083);
                    k = d(k, l, e, h, f[m + 15], 14, -660478335);
                    h = d(h, k, l, e, f[m + 4], 20, -405537848);
                    e = d(e, h, k, l, f[m + 9], 5, 568446438);
                    l = d(l, e, h, k, f[m + 14], 9, -1019803690);
                    k = d(k, l, e, h, f[m + 3], 14, -187363961);
                    h = d(h, k, l, e, f[m + 8], 20, 1163531501);
                    e = d(e, h, k, l, f[m + 13], 5, -1444681467);
                    l = d(l, e, h, k, f[m + 2], 9, -51403784);
                    k = d(k, l, e, h, f[m + 7], 14, 1735328473);
                    h = d(h, k, l, e, f[m + 12], 20, -1926607734);
                    e = a(h ^ k ^ l, e, h, f[m + 5], 4, -378558);
                    l = a(e ^ h ^ k, l, e, f[m + 8], 11, -2022574463);
                    k = a(l ^ e ^ h, k, l, f[m + 11], 16, 1839030562);
                    h = a(k ^ l ^ e, h, k, f[m + 14], 23, -35309556);
                    e = a(h ^ k ^ l, e, h, f[m + 1], 4, -1530992060);
                    l = a(e ^ h ^ k, l, e, f[m + 4], 11, 1272893353);
                    k = a(l ^ e ^ h, k, l, f[m + 7], 16, -155497632);
                    h = a(k ^ l ^ e, h, k, f[m + 10], 23, -1094730640);
                    e = a(h ^ k ^ l, e, h, f[m + 13], 4, 681279174);
                    l = a(e ^ h ^ k, l, e, f[m + 0], 11, -358537222);
                    k = a(l ^ e ^ h, k, l, f[m + 3], 16, -722521979);
                    h = a(k ^ l ^ e, h, k, f[m + 6], 23, 76029189);
                    e = a(h ^ k ^ l, e, h, f[m + 9], 4, -640364487);
                    l = a(e ^ h ^ k, l, e, f[m + 12], 11, -421815835);
                    k = a(l ^ e ^ h, k, l, f[m + 15], 16, 530742520);
                    h = a(k ^ l ^ e, h, k, f[m + 2], 23, -995338651);
                    e = c(e, h, k, l, f[m + 0], 6, -198630844);
                    l = c(l, e, h, k, f[m + 7], 10, 1126891415);
                    k = c(k, l, e, h, f[m + 14], 15, -1416354905);
                    h = c(h, k, l, e, f[m + 5], 21, -57434055);
                    e = c(e, h, k, l, f[m + 12], 6, 1700485571);
                    l = c(l, e, h, k, f[m + 3], 10, -1894986606);
                    k = c(k, l, e, h, f[m + 10], 15, -1051523);
                    h = c(h, k, l, e, f[m + 1], 21, -2054922799);
                    e = c(e, h, k, l, f[m + 8], 6, 1873313359);
                    l = c(l, e, h, k, f[m + 15], 10, -30611744);
                    k = c(k, l, e, h, f[m + 6], 15, -1560198380);
                    h = c(h, k, l, e, f[m + 13], 21, 1309151649);
                    e = c(e, h, k, l, f[m + 4], 6, -145523070);
                    l = c(l, e, h, k, f[m + 11], 10, -1120210379);
                    k = c(k, l, e, h, f[m + 2], 15, 718787259);
                    h = c(h, k, l, e, f[m + 9], 21, -343485551);
                    e = g(e, n);
                    h = g(h, s);
                    k = g(k, t);
                    l = g(l, q)
                }
                f = [e, h, k, l];
                e = "";
                for (h = 0; h < 4 * f.length; h++)
                    e += "0123456789abcdef".charAt(f[h >> 2] >> h % 4 * 8 + 4 & 15) + "0123456789abcdef".charAt(f[h >> 2] >> h % 4 * 8 & 15);
                return e
            }
        }
    }()
      , UiTool = {
        getTemplate: function(a, b, d, c) {
            "undefined" != typeof d && (d = d.replace(/{#}/g, c),
            b = b.replace(/{#}/g, c),
            UiTool.loadCss(d));
            d = (new Date).getTime();
            c = b.match(/#{[a-z_A-Z0-9]{1,}}/g) || [];
            for (var g = [], e = 0; e < c.length; e++) {
                var f = c[e].replace(/^#{?|}$/g, "");
                b = b.replace(c[e], f + d);
                g.push(f)
            }
            a.innerHTML = b;
            for (e = 0; e < g.length; e++)
                f = g[e],
                a[f] = UiTool.$E(f + d);
            return g
        },
        loadCss: function(a) {
            var b = document.head || document.getElementsByTagName("head")[0] || document.documentElement
              , d = document.createElement("style");
            d.setAttribute("type", "text/css");
            d.innerHTML = a;
            b.appendChild(d)
        },
        $E: function(a) {
            a = "string" == typeof a ? document.getElementById(a) : a;
            return null != a ? a : null
        },
        $C: function(a) {
            return document.createElement(a)
        },
        hasClassName: function(a, b) {
            if (a) {
                var d = a.className;
                return 0 == d.length ? !1 : d == b || d.match(new RegExp("(^|\\s)" + b + "(\\s|$)")) ? !0 : !1
            }
        },
        addClassName: function(a, b) {
            if (a) {
                var d = a.className;
                0 == d.length ? a.className = b : d == b || d.match(new RegExp("(^|\\s)" + b + "(\\s|$)")) || (a.className = d + " " + b)
            }
        },
        removeClassName: function(a, b) {
            if (a) {
                var d = a.className;
                0 != d.length && (d == b ? a.className = "" : d.match(new RegExp("(^|\\s)" + b + "(\\s|$)")) && (a.className = d.replace(new RegExp("(^|\\s)" + b + "(\\s|$)"), " ")))
            }
        },
        addEvent: function(a, b, d) {
            if (-1 != b.indexOf(",")) {
                b = b.split(",");
                for (var c = 0, g = b.length; c < g; c++) {
                    var e = b[c];
                    if ("" == e)
                        break;
                    a.attachEvent ? a.attachEvent("on" + e, d) : a.addEventListener(e, d, !1)
                }
            } else
                a.attachEvent ? a.attachEvent("on" + b, d) : a.addEventListener(b, d, !1)
        },
        removeEvent: function(a, b, d) {
            a = this.$E(a);
            if (null != a && "function" == typeof d && "undefined" != typeof b)
                if (-1 != b.indexOf(",")) {
                    b = b.split(",");
                    for (var c = 0, g = b.length; c < g; c++) {
                        var e = b[c];
                        if ("" == e)
                            break;
                        a.addEventListener ? a.removeEventListener(e, d, !1) : a.attachEvent && a.detachEvent("on" + e, d)
                    }
                } else
                    a.addEventListener ? a.removeEventListener(b, d, !1) : a.attachEvent && a.detachEvent("on" + b, d)
        },
        getPos: function(a) {
            a = this.$E(a);
            if (a.getBoundingClientRect) {
                var b = "CSS1Compat" == document.compatMode ? document.documentElement : document.body;
                a = a.getBoundingClientRect();
                return {
                    x: a.left + b.scrollLeft,
                    y: a.top + b.scrollTop
                }
            }
            for (b = y_ = 0; a.offsetParent; )
                b += a.offsetLeft,
                y_ += a.offsetTop,
                a = a.offsetParent;
            b += a.offsetLeft;
            y_ += a.offsetTop;
            return {
                x: b,
                y: y_
            }
        },
        getMousePoint: function(a) {
            var b = "createTouch"in document
              , d = y = 0
              , c = document.documentElement
              , g = document.body;
            a || (a = window.event);
            window.pageYOffset ? (d = window.pageXOffset,
            y = window.pageYOffset) : (d = (c && c.scrollLeft || g && g.scrollLeft || 0) - (c && c.clientLeft || g && g.clientLeft || 0),
            y = (c && c.scrollTop || g && g.scrollTop || 0) - (c && c.clientTop || g && g.clientTop || 0));
            b ? (a = a.touches.item(0),
            d = a.pageX,
            y = a.pageY) : (d += a.clientX,
            y += a.clientY);
            return {
                x: d,
                y: y
            }
        },
        preventDefault: function(a) {
            a ? a.preventDefault() : window.event.returnValue = !1
        },
        turnEvent: function(a) {
            var b = {
                mousedown: "touchstart",
                mousemove: "touchmove",
                mouseup: "touchend",
                mouseover: "touchstart",
                mouseout: "-",
                click: "touchstart"
            };
            return UiTool.isSupportsTouches() && b.hasOwnProperty(a) ? b[a] : a
        },
        isSupportsTouches: function(a) {
            return "createTouch"in document
        },
        drag: function(a, b) {
            var d = "createTouch"in document
              , c = UiTool.turnEvent("mousedown")
              , g = UiTool.turnEvent("mousemove")
              , e = UiTool.turnEvent("mouseup");
            "string" == typeof a && (a = document.getElementById(a));
            a.orig_index = a.style.zIndex;
            a.startX = 0;
            a.startY = 0;
            a["on" + c] = function(c) {
                var h, k;
                function l(c) {
                    c || (c = window.event);
                    d ? (c = c.touches.item(0),
                    h = c.pageX - s,
                    k = c.pageY - t) : (h = c.pageX ? c.pageX - s : c.clientX + document.body.scrollLeft - s,
                    k = c.pageY ? c.pageY - t : c.clientY + document.body.scrollTop - t);
                    h = u.x + h;
                    k = u.x + k;
                    q && (h < q.x ? h = q.x : h > q.x + q.w && (h = q.x + q.w),
                    k < q.y ? k = q.y : k > q.y + 0 + q.h && (k = q.y + q.h));
                    a.style.left = h + "px";
                    a.style.top = k + "px";
                    b.onMove && b.onMove((parseInt(a.style.left) - q.x) / q.w);
                    return !1
                }
                function m() {
                    a.releaseCapture ? a.releaseCapture() : window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                    UiTool.removeEvent(n, g, l);
                    UiTool.removeEvent(n, e, m);
                    a.style.zIndex = a.orig_index;
                    b.onUp && b.onUp((parseInt(a.style.left) - q.x) / q.w)
                }
                var n = document;
                k = h = void 0;
                var s, t, q;
                this.style.zIndex = 1E4;
                b.rect && (q = b.rect());
                c || (c = window.event);
                c.preventDefault();
                d ? (c = c.touches.item(0),
                s = c.pageX,
                t = c.pageY) : (s = c.clientX + n.body.scrollLeft,
                t = c.clientY + n.body.scrollTop);
                var u = {
                    x: parseInt(a.offsetLeft),
                    y: parseInt(a.offsetTop)
                };
                n.ondragstart = "return false;";
                n.onselectstart = "return false;";
                n.onselect = "document.selection.empty();";
                a.setCapture ? a.setCapture() : window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                b.onDown && b.onDown((parseInt(a.style.left) - q.x) / q.w);
                UiTool.addEvent(n, g, l);
                UiTool.addEvent(n, e, m);
                return !1
            }
        },
        fullScreen: function(a) {
            if (a.requestFullscreen)
                return a.requestFullscreen();
            if (a.mozRequestFullScreen)
                return a.mozRequestFullScreen();
            if (a.webkitRequestFullscreen)
                return a.webkitRequestFullScreen();
            if (a.msRequestFullscreen)
                return a.msRequestFullscreen();
            if (a.oRequestFullscreen)
                return a.oRequestFullscreen()
        },
        isFullScreen: function() {
            return document.webkitIsFullScreen || document.fullscreen || document.mozFullScreen || document.msFullscreenElement ? !0 : !1
        },
        cancelFullScreen: function() {
            document.cancelFullscreen ? document.cancelFullscreen() : document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.webkitCancelFullScreen && element.webkitCancelFullScreen()
        },
        supportFullScreen: function() {
            var a = document.documentElement;
            return "requestFullscreen"in a || "mozRequestFullScreen"in a && document.mozFullScreenEnabled || "webkitRequestFullscreen"in a || "msRequestFullscreen"in a
        },
        getClientWidth: function() {
            return document.body.clientWidth
        },
        getImgRealRect: function(a) {
            var b = a.width
              , d = a.height;
            "undefined" != typeof a.naturalWidth && (b = a.naturalWidth,
            d = a.naturalHeight);
            return {
                width: b,
                height: d
            }
        },
        isMobileEvent: function(a) {
            return -1 != ["touchstart", "touchmove", "touchend"].indexOf(a)
        },
        hexToRgba: function(a, b) {
            var d = a.toLowerCase()
              , c = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            if (d && c.test(d)) {
                if (4 === d.length) {
                    for (var g = "#", c = 1; 4 > c; c += 1)
                        g += d.slice(c, c + 1).concat(d.slice(c, c + 1));
                    d = g
                }
                g = [];
                for (c = 1; 7 > c; c += 2)
                    g.push(parseInt("0x" + d.slice(c, c + 2)));
                return "RGBA(" + g.join(",") + "," + b + ")"
            }
            return d
        },
        setCanvasColor: function(a, b) {
            for (var d = a.getContext("2d"), c = d.getImageData(0, 0, a.width, a.height), g = 0; g < c.data.length; g += 4)
                if (0 != c.data[g + 3]) {
                    var e = b.toLocaleLowerCase()
                      , e = e.replace(/rgba\(|\)/g, "").split(",");
                    c.data[g] = e[0];
                    c.data[g + 1] = e[1];
                    c.data[g + 2] = e[2]
                }
            d.putImageData(c, 0, 0)
        }
    };
    SOTool.shareObj("common.UiTool", UiTool);
    var jsonTool = {
        isString: function(a) {
            return "string" === typeof a
        },
        stringToJson: function(a) {
            if (this.isString(a))
                try {
                    return window.JSON.parse(a)
                } catch (b) {
                    return {}
                }
            else
                return a
        },
        isJson: function(a) {
            return a && "object" === typeof a && "Object" === a.constructor ? !0 : !1
        },
        jsonToString: function(a) {
            var b = "";
            try {
                b = window.JSON.stringify(a)
            } catch (d) {
                b = d
            }
            return b
        }
    }
      , logTool = function() {
        var a = ""
          , b = [];
        return {
            log: function(d, c, g) {
                c = "undefined" != typeof c ? "[" + c.constructor.name + "]" : "-";
                g = "undefined" != typeof g ? g : "-";
                if (a != d)
                    try {
                        var e = new Date
                          , f = "[" + e.getFullYear() + "-" + e.getMonth() + "-" + e.getDate() + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds() + ":" + e.getMilliseconds() + "]";
                        b.push(f + d + "  target--\x3e" + c);
                        1E3 < b.length && b.shift();
                        if (-1 != window.location.href.indexOf("#dSDK=1") || "file" == window.location.href.substr(0, 4).toLocaleLowerCase())
                            -1 != window.location.href.indexOf("#stack=1") && console.log(Error().stack),
                            window.console && window.console.log(d, c, g, f);
                        if (-1 != window.location.href.indexOf("#dSDK=2")) {
                            if (document.getElementById("log"))
                                var h = document.createElement("DIV");
                            else {
                                var k = document.createElement("DIV");
                                k.id = "log";
                                document.body.appendChild(k);
                                h = document.createElement("DIV")
                            }
                            h.innerHTML = d + c + f;
                            document.getElementById("log").appendChild(h);
                            a = d
                        }
                    } catch (l) {}
            },
            getLog: function(a) {
                return b.join("<br>\r\n")
            }
        }
    }();
    logTool.log("js \u52a0\u8f7d\u6210\u529f  ua:" + window.navigator.userAgent);
    var ReportTool = function() {
        var a = document.createElement("DIV");
        a.style.cssText = "width:85%;height:80%;position:fixed;left:0px;top:0px;z-index: 3000;background-color:rgba(255, 255, 255, 1);";
        var b = document.createElement("IFRAME");
        b.name = "submit";
        b.style.cssText = "display:none;position:absolute;";
        var d = document.createElement("form");
        return {
            print: function(c, b) {
                a.innerHTML = '<div style="width:100%;"><span>\u7528\u6237id:</span><input type="text" style="width:300px;"><input style="float:right;" type="button" value="\u5173\u95ed"></div><textarea class="input" style="width: 100%;height: 100%"  placeholder="Once upon a time..."></textarea>';
                document.body.appendChild(a);
                a.style.display = "";
                a.getElementsByTagName("textarea")[0].innerHTML = c;
                var d = a.getElementsByTagName("input")[0];
                a.getElementsByTagName("input")[1].onclick = function() {
                    a.style.display = "none"
                }
                ;
                d.value = b
            },
            report: function(a, g) {
                document.body.appendChild(b);
                d.innerHTML = "";
                d.action = a;
                d.method = "post";
                d.target = "submit";
                d.style.display = "none";
                for (var e in g) {
                    var f = document.createElement("textarea");
                    f.name = e;
                    f.value = g[e];
                    d.appendChild(f)
                }
                document.body.appendChild(d);
                d.submit()
            }
        }
    }()
      , FlashPlayer = {
        isSupportFlash: !1,
        isEmdbed: !1,
        num: 0,
        check: function(a) {
            var b = "";
            if ("undefined" != typeof window.ActiveXObject || "ActiveXObject"in window)
                try {
                    b = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
                } catch (d) {}
            if (window.navigator.plugins && window.navigator.plugins["Shockwave Flash"])
                try {
                    b = window.navigator.plugins["Shockwave Flash"].description,
                    this.isEmdbed = !0
                } catch (c) {}
            "" == b && (this.isSupportFlash = !1);
            for (var b = b.split(/\s+/), g = 0, e = b.length; g < e; g++)
                parseInt(b[g]) > a && (this.isSupportFlash = !0);
            return this.isSupportFlash
        },
        getPlayer: function(a) {
            return this.isEmdbed ? document[a] || window[a] : document.getElementById(a)
        },
        create: function(a, b, d) {
            var c = "cloudPlayer" + (new Date).getTime() + this.num;
            this.num++;
            var g = {
                bgcolor: "#000000",
                allowscriptaccess: "always",
                wmode: "Opaque",
                width: "100%",
                height: "100%",
                align: "middle",
                quality: "high",
                allowFullScreen: !0,
                version: 10
            }, e;
            for (e in b)
                g[e] = b[e];
            g.flashvars = d;
            b = "";
            if (this.check(g.version)) {
                if (this.isEmdbed)
                    for (e in d = ["<embed name='" + c + "'src='" + g.url + "' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='" + g.width + "' height='" + g.height + "' ", " />"],
                    b = "",
                    g)
                        "width" != e && "height" != e && "url" != e && (b += e + "='" + g[e] + "' ");
                else
                    for (e in b = "",
                    d = ["<object id='" + c + "' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,45,0' type='application/x-shockwave-flash' width='" + g.width + "' height='" + g.height + "'><param name='movie' value='" + g.url + "'/>", "</object>"],
                    g)
                        "width" != e && "height" != e && "url" != e && (b += "<param name='" + e + "' value='" + g[e] + "'/>");
                b = d.join(b)
            } else
                b = '<div style="width:' + g.width + "px; height:" + g.height + 'px; text-align:center;"><span style="line-height:200%; font-size:18px">\u5b89\u88c5\u6216\u8005\u66f4\u65b0\u7248\u672c\u4e0d\u5c0f\u4e8e<b style="color:red">' + g.version + '</b>\u7684flash\u64ad\u653e\u5668, \u8bf7\u70b9\u51fb<a href="http://get.adobe.com/cn/flashplayer/" target="_blank">\u8fd9\u91cc</a>\u5b89\u88c5</span></div>';
            "string" == typeof a && "" != a && document.getElementById(a) ? document.getElementById(a).innerHTML = b : document.write(b);
            return c
        }
    }
      , ClassTool = function() {
        var a = {};
        return {
            inherits: function(a, d) {
                function c() {}
                try {
                    c.prototype = d.prototype,
                    a.prototype = new c,
                    a.prototype.constructor = a,
                    a.prototype.superClass = d.prototype
                } catch (g) {
                    debugger
                }
            },
            provideClass: function(a, d) {
                var c = a.split(".");
                if (1 < c.length)
                    for (var g = 0; g < c.length - 1; g++) {
                        var e = c[g];
                        last.hasOwnProperty(e) || (last[e] = {});
                        last = last[e]
                    }
                last[c[c.length - 1]] = d
            },
            importClass: function(b) {
                for (var d = b.split("."), c = a, g = 0; g < d.length - 1; g++) {
                    var e = d[g];
                    if (!c.hasOwnProperty(e))
                        throw "the " + b + "--" + e + " class is not provide";
                    c = c[e]
                }
                return c
            }
        }
    }();
    SOTool.shareObj("common.ClassTool", ClassTool);
    var GlobalHandler = function() {
        var a = "cid pid vid mmsid pic title url nextvid nextpic nexttitle nexturl nextchapter duration total percent rotation fullscreen color volume jump continuePlay gpu gpuing definition defaultDefinition trylook fullScale originalScale originalRect videoWidth videoHeight".split(" ")
          , b = {
            57: "180",
            58: "180",
            1: "350",
            21: "350",
            9: "350",
            161: "350",
            16: "1000",
            13: "1000",
            162: "1000",
            17: "1300",
            22: "1300",
            163: "1300",
            27: "yuanhua",
            28: "yuanhua",
            18: "720p",
            51: "720p",
            35: "1080p",
            52: "1080p",
            20: "1080p",
            36: "1080p",
            54: "k4"
        };
        return {
            defList: "180 350 1000 1300 yuanhua 720p 1080p k4".split(" "),
            settingList: function() {
                return a
            },
            getHttpsDomain: function(a) {
                if ("https:" == window.location.protocol) {
                    a = a.split("://")[1];
                    var c = {
                        "yuntv.letv.com": "s.yuntv.letv.com",
                        "ark.letv.com": "arkletv.lecloud.com",
                        "api.letvcloud.com": "apiletv.lecloud.com",
                        "sdk.lecloud.com": "sdkletv.lecloud.com"
                    };
                    c.hasOwnProperty(a) && (a = c[a]);
                    return "https://" + a
                }
                return a
            },
            checkPlayType: function() {
                var a = "samsung-sm-n9009__weibo__5.1.2__android__android4.3;HUAWEI MT1-T00 Build/HuaweiMT1-T00;cpqb;360zqb;p6-t00;sm-n9008;sm-;samsung;huawei;android.+chrome".split(";");
                switch (videoSdkTool.getDevice()) {
                case "ipad":
                case "iphone":
                    return "ios";
                case "androidPad":
                case "androidPhone":
                case "android":
                    if ("mp4" == videoSdkTool.getLocal("playType"))
                        break;
                    for (var c = navigator.userAgent.toLowerCase(), b = 0; b < a.length; b++)
                        if (-1 != c.indexOf(a[b].toLowerCase()))
                            return "mp4";
                    if (/samsung/i.test(c) && /weibo/i.test(c))
                        break;
                    if (document.createElement("video") && "" == document.createElement("video").canPlayType("application/x-mpegURL"))
                        break;
                    return "ios"
                }
                return "mp4"
            },
            def2Type: function(a, c) {
                return c.hasOwnProperty(a) ? c[a] : a
            },
            type2Def: function(a) {
                return b.hasOwnProperty(a) ? b[a] : a
            },
            initTypeDefObj: function(a, c) {
                for (var g = 0; g < a.length; g++) {
                    var e = a[g];
                    b.hasOwnProperty(e) && (c[b[e]] = e)
                }
            }
        }
    }()
      , PlayState = {
        PLAY: 0,
        PAUSE: 1,
        STOP: 2
    }
      , ERR = {
        PARAMS: "1",
        NOSTART: "2",
        INTERRUPT: "3",
        END: "7",
        NOPLAN: "4",
        PEOPLE_OUT: "5",
        WHITE_LIST: "6",
        ACTIVITY_IO: "60",
        ACTIVITY_TIMEOUT: "61",
        ACTIVITY_ANALY: "63",
        NOSTREAM: "64",
        LIVE_ANALY: "50",
        LIVE_IO: "51",
        LIVE_TIMEOUT: "53",
        PLAY_IO: "480",
        PLAY_TIMEOUT: "481",
        VOD_CONFIG_IO: "150",
        VOD_CONFIG_TIMEOUT: "152",
        VOD_MMSID_ANALY: "153",
        VOD_CONFIG_DRM: "154",
        GSLB_IO: "470",
        GSLB_ANALY: "473",
        NOSupport: "490"
    };
    SOTool.shareObj("manager.ColorManager", function() {
        function a() {
            this.managerDsipayList = [];
            this.cList = [];
            this.colorConfig = {
                bgColor: "#000000",
                fault: "#aaaaaa",
                active: "#208ac3"
            }
        }
        var b = SOTool.getObj("common.UiTool");
        a.prototype.setColor = function(a, c, g, e) {
            "undefined" == typeof g && (g = "bg");
            "undefined" == typeof e && (e = 1);
            a.setColor(b.hexToRgba(this.colorConfig[c], e), g);
            var f = this.managerDsipayList.indexOf(a);
            -1 == f ? (this.managerDsipayList.push(a),
            this.cList.push({
                display: a,
                key: c,
                type: g,
                alpha: e
            })) : (this.cList[f].key = c,
            this.cList[f].type = g,
            this.cList[f].alpha = e)
        }
        ;
        a.prototype.register = function(a) {
            for (var c in a)
                this.colorConfig.hasOwnProperty(c) && ("0x" == a[c].substr(0, 2) && (a[c] = a[c].substr(2)),
                "#" != a[c].substr(0, 1) ? this.colorConfig[c] = "#" + a[c] : this.colorConfig[c] = a[c])
        }
        ;
        a.prototype.refresh = function(a) {
            this.register(a);
            for (a = 0; a < this.cList.length; a++)
                this.cList[a].display.setColor(b.hexToRgba(this.colorConfig[this.cList[a].key], this.cList[a].alpha), this.cList[a].type)
        }
        ;
        return a
    }());
    var ClassObject = function() {
        function a() {
            this.init()
        }
        a.prototype = {
            init: function() {},
            addEventListener: function(a, d, c, g) {
                if ("undefined" == typeof a)
                    throw this.log(a),
                    Error("type is undefined");
                if ("undefined" == typeof d)
                    throw this.log(d),
                    Error("handler is undefined");
                "undefined" == typeof c && (c = this);
                this.hasOwnProperty("EventMap") || (this.EventMap = {});
                this.EventMap.hasOwnProperty(a) || (this.EventMap[a] = []);
                this.hasEventListener(a, d, c) || this.EventMap[a].push({
                    fun: d,
                    target: c
                })
            },
            hasEventListener: function(a, d, c) {
                if ("undefined" == typeof a)
                    throw this.log(a),
                    Error("type is undefined");
                if ("undefined" == typeof d)
                    throw this.log(d),
                    Error("handler is undefined");
                if ("undefined" == typeof c)
                    throw this.log(c),
                    Error("handlerThis is undefined");
                if (this.hasOwnProperty("EventMap") && this.EventMap.hasOwnProperty(a))
                    for (var g = 0; g < this.EventMap[a].length; g++) {
                        var e = this.EventMap[a][g];
                        if (e.fun == d && e.target == c)
                            return !0
                    }
                return !1
            },
            dispatchEvent: function(a) {
                var d = a.type;
                a.target = this;
                this.hasOwnProperty("EventMap") || (this.EventMap = {});
                if (this.EventMap.hasOwnProperty(d)) {
                    for (var c = [], g = 0; g < this.EventMap[d].length; g++)
                        c.push(this.EventMap[d][g]);
                    for (g = 0; g < c.length; g++)
                        c[g].fun.call(this.EventMap[d][g].target, a)
                }
            },
            removeEventListener: function(a, d, c) {
                this.hasOwnProperty("EventMap") || (this.EventMap = {});
                if (this.EventMap.hasOwnProperty(a))
                    for (var g = 0; g < this.EventMap[a].length; g++)
                        if (this.EventMap[a][g].fun == d && this.EventMap[a][g].target == c) {
                            this.EventMap[a].splice(g, 1);
                            0 == this.EventMap[a].length && delete this.EventMap[a];
                            break
                        }
            },
            destroy: function() {
                for (var a in this.EventMap)
                    delete this.EventMap[a];
                this.EventMap = null
            },
            log: function(a) {
                logTool.log(a, this)
            }
        };
        return a
    }();
    SOTool.shareObj("core.ClassObject", ClassObject);
    var Control = function() {
        function a(a, d) {
            this.init(a, d)
        }
        ClassTool.inherits(a, ClassObject);
        a.prototype.init = function(a, d) {
            this.facade = a;
            this.model = d
        }
        ;
        return a
    }()
      , Event = function() {
        return function() {
            this.type = arguments[0];
            this.args = arguments
        }
    }();
    SOTool.shareObj("core.Event", Event);
    var Facade = function() {
        function a() {}
        var b = SOTool.getObj("manager.ColorManager");
        ClassTool.inherits(a, SOTool.getObj("core.ClassObject"));
        a.prototype.init = function(a) {
            this.color = new b;
            this.color.register(a)
        }
        ;
        return a
    }();
    SOTool.shareObj("core.Facade", Facade);
    var Proxy = function() {
        function a() {}
        ClassTool.inherits(a, ClassObject);
        a.prototype.load = function(a) {
            this.loader = new AutoLoader;
            this.isClose = !1;
            a = this.getRequestList();
            2 == this.requestType ? this.loader.load2(a, this.loadCmp, this.loadError, this) : this.loader.load(a, this.loadCmp, this.loadError, this)
        }
        ;
        a.prototype.getUrl = function(a) {
            return 1 < this.loader.urlList.length ? this.loader.urlList[0].url : ""
        }
        ;
        a.prototype.getRequestList = function(a) {
            return []
        }
        ;
        a.prototype.unload = function(a) {
            this.loader && this.loader.destroy();
            this.isClose = !0
        }
        ;
        a.prototype.loadCmp = function(a, d) {
            !this.isClose && this.dispatchEvent(new Event(LoadEvent.LOADCMP,[a, d]))
        }
        ;
        a.prototype.loadError = function(a, d) {
            !this.isClose && this.dispatchEvent(new Event(LoadEvent.LOADERROR,[a, d]))
        }
        ;
        return a
    }()
      , Plugin = function() {
        function a() {}
        ClassTool.inherits(a, ClassObject);
        a.prototype.initPlugin = function(a, d, c) {
            this.pluginCmpFun = d;
            this.REConf = c;
            if (this.REConf.hasOwnProperty(a.type))
                if (d = this.REConf[a.type],
                d.hasOwnProperty("check"))
                    if ("function" == typeof d.check)
                        if (d.check())
                            this.load(a);
                        else
                            a.onerror(d.err);
                    else if (d.check)
                        this.load(a);
                    else
                        a.onerror(d.err);
                else
                    this.load(a);
            else
                this.pluginCmpFun(null),
                a.onstart()
        }
        ;
        a.prototype.load = function(a) {
            var d = this;
            d.pl = this.REConf[a.type];
            SOTool.getPlugin(d.pl.name, function(c) {
                if (c)
                    d.pluginCmpFun(c);
                else
                    a.onerror({
                        code: 420,
                        message: "\u63d2\u4ef6\u52a0\u8f7d\u9519\u8bef"
                    })
            })
        }
        ;
        return a
    }()
      , View = function() {
        function a(a, d) {
            this.facade = a;
            this.model = d;
            this.init()
        }
        ClassTool.inherits(a, ClassObject);
        a.prototype.init = function() {
            this.tplKey = "view";
            this.addEvent = !0
        }
        ;
        a.prototype.setUp = function(a, d, c) {
            "undefined" == typeof c && (c = "");
            c = SkinRender.SkinTpl[this.tplKey] || c;
            this.el = UiTool.$E(a);
            this.skin = new DisplayObject(this.el);
            a = UiTool.getTemplate(this.el, c);
            if (d)
                for (d = 0; d < a.length; d++)
                    this.el[a[d]] = new DisplayObject(this.el[a[d]]);
            this.addEvent && this.facade.addEventListener(SkinEvent.EVENT, this.skinHandler, this)
        }
        ;
        a.prototype.skinHandler = function(a) {}
        ;
        a.prototype.setSize = function(a, d) {}
        ;
        a.prototype.show = function() {
            this.skin.setVisible(!0)
        }
        ;
        a.prototype.hide = function() {
            this.skin.setVisible(!1)
        }
        ;
        return a
    }();
    SOTool.shareObj("core.View", View);
    var DisplayObject = function() {
        function a(a, c) {
            this.init(a);
            "undefined" == typeof c && (c = window.CloudSdkPlugin.skinUuid);
            this.sid = c
        }
        var b = SOTool.getObj("common.ClassTool")
          , d = SOTool.getObj("core.ClassObject")
          , c = SOTool.getObj("common.UiTool");
        b.inherits(a, d);
        a.prototype.init = function(a) {
            this.el = a
        }
        ;
        a.prototype.render = function(a) {
            if (this.el.hasAttribute("render-data")) {
                var b = videoSdkTool.split(this.el.getAttribute("render-data"), ";", 3)
                  , d = b[1]
                  , h = b[2];
                switch (b[0]) {
                case "canvas":
                    if ("img" == d)
                        if (this.renderCanvas)
                            this.el.hasOwnProperty("renderOption") ? this.el.renderOption = a : c.setCanvasColor(this.renderCanvas, a.color);
                        else {
                            var b = videoSdkTool.split(h, ";", 3)
                              , k = document.createElement("img")
                              , l = document.createElement("canvas");
                            k.width = b[0];
                            k.height = b[1];
                            this.el.appendChild(l);
                            l.width = k.width;
                            l.height = k.height;
                            this.renderCanvas = l;
                            this.el.renderOption = a;
                            k.onload = videoSdkTool.bindFun(function() {
                                l.getContext("2d").drawImage(k, 0, 0);
                                c.setCanvasColor(l, this.el.renderOption.color);
                                delete this.el.renderOption
                            }, this);
                            k.src = b[2]
                        }
                }
            }
        }
        ;
        a.prototype.addEventListener = function(a, b, d) {
            a = c.turnEvent(a);
            "-" != a && c.addEvent(this.el, a, b)
        }
        ;
        a.prototype.removeEventListener = function(a, b, d) {
            a = c.turnEvent(a);
            c.removeEvent(this.el, a, b)
        }
        ;
        a.prototype.drag = function(a) {
            c.drag(this.el, a)
        }
        ;
        a.prototype.setButtonMode = function(a) {
            this.el.style.cursor = a ? "pointer" : "default"
        }
        ;
        a.prototype.setEnabled = function(a) {
            this.el.style.pointerEvents = a ? "auto" : "none"
        }
        ;
        a.prototype.setVisible = function(a) {
            a ? (this.el.style.display = "block",
            this.setAttribute({
                orgwidth: this.el.offsetWidth,
                orgheight: this.el.offsetHeight
            })) : this.el.style.display = "none"
        }
        ;
        a.prototype.getVisible = function() {
            return "none" != this.el.style.display
        }
        ;
        a.prototype.setWidth = function(a) {
            a += "";
            -1 != a.indexOf("%") ? this.el.style.width = a : this.el.style.width = a + "px"
        }
        ;
        a.prototype.getWidth = function() {
            return 0 == this.el.offsetWidth ? this.getAttribute("orgwidth") : this.el.offsetWidth
        }
        ;
        a.prototype.setHeight = function(a) {
            a += "";
            -1 != a.indexOf("%") ? this.el.style.height = a : this.el.style.height = a + "px"
        }
        ;
        a.prototype.getHeight = function() {
            return 0 == this.el.offsetHeight ? this.getAttribute("orgheight") : this.el.offsetHeight
        }
        ;
        a.prototype.setX = function(a) {
            a += "";
            -1 != a.indexOf("%") ? this.el.style.left = a : this.el.style.left = a + "px"
        }
        ;
        a.prototype.getX = function() {
            return this.el.offsetLeft
        }
        ;
        a.prototype.setY = function(a) {
            a += "";
            -1 != a.indexOf("%") ? this.el.style.top = a : this.el.style.top = a + "px"
        }
        ;
        a.prototype.getY = function() {
            return this.el.offsetTop
        }
        ;
        a.prototype.appendChild = function(a) {
            a.hasOwnProperty("el") && (a = a.el);
            this.el.appendChild(a)
        }
        ;
        a.prototype.setColor = function(a, c) {
            "bg" == c ? this.el.hasAttribute("render-data") ? this.render({
                color: a
            }) : this.el.style.backgroundColor = a : "text" == c && (this.el.style.color = a)
        }
        ;
        a.prototype.html = function(a) {
            this.el.innerHTML = a
        }
        ;
        a.prototype.gethtml = function(a) {
            return this.el.innerHTML
        }
        ;
        a.prototype.setClassName = function(a) {
            a = a.split(" ").join(this.sid + " ");
            a += this.sid;
            this.el.className = a
        }
        ;
        a.prototype.hasClassName = function(a) {
            a = a.split(" ").join(this.sid + " ");
            a += this.sid;
            return c.hasClassName(this.el, a)
        }
        ;
        a.prototype.addClassName = function(a) {
            a = a.split(" ").join(this.sid + " ");
            a += this.sid;
            c.addClassName(this.el, a)
        }
        ;
        a.prototype.removeClassName = function(a) {
            a = a.split(" ").join(this.sid + " ");
            a += this.sid;
            c.removeClassName(this.el, a)
        }
        ;
        a.prototype.getAttribute = function(a) {
            return this.el.getAttribute(a)
        }
        ;
        a.prototype.hasAttribute = function(a) {
            return this.el.hasAttribute(a)
        }
        ;
        a.prototype.setAttribute = function(a) {
            for (var c in a)
                this.el.setAttribute(c, a[c])
        }
        ;
        a.prototype.removeAttribute = function(a) {
            if (videoSdkTool.isArray(a))
                for (var c = 0; c < a.length; c++)
                    this.el.removeAttribute(a[c]);
            else
                this.el.removeAttribute(a)
        }
        ;
        a.prototype.setStyle = function(a) {
            for (var c in a)
                this.el.style[c] = a[c]
        }
        ;
        return a
    }();
    SOTool.shareObj("core.view.DisplayObject", DisplayObject);
    SOTool.shareObj("core.view.display.DisplayObject", DisplayObject);
    var DragBar = function() {
        function a(a, b, d) {
            this.init(a, d);
            "undefined" == typeof b && (b = window.CloudSdkPlugin.skinUuid);
            this.sid = b
        }
        var b = SOTool.getObj("common.ClassTool")
          , d = SOTool.getObj("core.ClassObject");
        SOTool.getObj("common.UiTool");
        b.inherits(a, d);
        a.prototype.init = function(a, b) {
            this.percent = 0;
            this.view = a;
            this.rect = {
                x: 0.5 * -this.view.el.sliderOver.getWidth(),
                y: this.view.el.sliderOver.getY(),
                w: this.view.el.trackBg.getWidth(),
                h: 0
            };
            this.addEvents()
        }
        ;
        a.prototype.reSetRect = function() {
            this.rect = {
                x: 0.5 * -this.view.el.sliderOver.getWidth(),
                y: this.view.el.sliderOver.getY(),
                w: this.view.el.trackBg.getWidth(),
                h: 0
            }
        }
        ;
        a.prototype.render = function(a) {}
        ;
        a.prototype.setPercent = function(a) {
            this.percent = a;
            this.updateView()
        }
        ;
        a.prototype.updateView = function(a) {
            a = this.percent * this.view.el.trackBg.getWidth();
            this.view.el.track.setWidth(a);
            this.view.el.sliderOver.setX(this.rect.x + a)
        }
        ;
        a.prototype.addEvents = function(a, b, d) {
            var f = this;
            this.view.el.sliderOver.drag({
                rect: function() {
                    (!f.rect.w || 0 >= f.rect.w) && f.reSetRect();
                    return f.rect
                },
                onDown: function(a) {
                    f.isSeeking = !0
                },
                onMove: function(a) {
                    f.seekHanler.apply(f, [!1])
                },
                onUp: function(a) {
                    f.seekHanler.apply(f, [!0]);
                    f.isSeeking = !1
                }
            })
        }
        ;
        a.prototype.seekHanler = function(a) {
            this.percent = (this.view.el.sliderOver.getX() - this.rect.x) / this.view.el.trackBg.getWidth();
            this.updateView();
            this.dispatchEvent(new Event("change",this.percent))
        }
        ;
        return a
    }();
    SOTool.shareObj("core.view.conttrols.DragBar", DragBar);
    var AutoLoader = function() {
        function a() {}
        a.prototype = {
            load: function(a, d, c, g) {
                this.urlList = a;
                var e = this
                  , f = 0
                  , h = videoSdkTool.now()
                  , k = function() {
                    clearTimeout(e.delayID);
                    var a = e.getRealUrl(e.urlList[0]);
                    e.log("load url:" + a);
                    videoSdkTool.getJSON(a, function(a, c) {
                        f += c.retryCount;
                        d && d.call(g, a, {
                            responseTime: videoSdkTool.now() - h,
                            retryCount: f
                        })
                    }, function(a, b) {
                        1 < e.urlList.length ? (f += e.urlList[0].maxCount,
                        e.urlList.shift(),
                        e.delayID = setTimeout(k, e.urlList[0].retryTime)) : (f += b.retryCount,
                        c && c.call(g, null, {
                            responseTime: videoSdkTool.now() - h,
                            retryCount: f
                        }))
                    }, e.urlList[0].timeout, e.urlList[0].maxCount, e.urlList[0].retryTime)
                };
                k()
            },
            load2: function(a, d, c, g) {
                this.urlList = a;
                var e = this
                  , f = 0
                  , h = videoSdkTool.now()
                  , k = function() {
                    clearTimeout(e.delayID);
                    var a = e.getRealUrl(e.urlList[0]);
                    e.log("load url:" + a);
                    videoSdkTool.getJSONbyAjax(a, function(a, c) {
                        f += c.retryCount;
                        d && d.call(g, a, {
                            responseTime: videoSdkTool.now() - h,
                            retryCount: f
                        })
                    }, function(a, b) {
                        1 < e.urlList.length ? (f += e.urlList[0].maxCount,
                        e.urlList.shift(),
                        e.delayID = setTimeout(k, e.urlList[0].retryTime)) : (f += b.retryCount,
                        c && c.call(g, null, {
                            responseTime: videoSdkTool.now() - h,
                            retryCount: f
                        }))
                    }, e.urlList[0].timeout, e.urlList[0].maxCount, e.urlList[0].retryTime)
                };
                k()
            },
            getRealUrl: function(a) {
                return videoSdkTool.isFunction(a.url) ? a.hasOwnProperty("args") ? a.url(a.args) : a.url() : a.url
            },
            destroy: function() {
                clearTimeout(this.delayID)
            },
            log: function(a) {
                logTool.log(a, this)
            }
        };
        return a
    }()
      , Timer = function() {
        function a(a, d, c, g) {
            this.delay = a;
            this.timerHandler = c;
            this.handlerThis = d;
            "undefined" == typeof g && (g = 0);
            this.max = g;
            this.currentCount = this.T = 0;
            this.running = !0
        }
        a.prototype = {
            start: function() {
                this.running = !0;
                this.checkTime(!1)
            },
            checkTime: function(a) {
                var d = this;
                clearTimeout(this.T);
                if (a && (d.currentCount++,
                d.timerHandler.call(d.handlerThis),
                0 < d.max && d.currentCount >= d.max)) {
                    d.stop();
                    return
                }
                d.T = setTimeout(function() {
                    d.checkTime.call(d, !0)
                }, d.delay)
            },
            stop: function() {
                this.running = !1;
                clearTimeout(this.T)
            },
            reset: function() {
                this.stop();
                this.currentCount = 0
            },
            clear: function() {
                this.handlerThis = this.timerHandler = this.delay = null;
                this.T = 0
            }
        };
        return a
    }();
    SOTool.shareObj("core.util.Timer", Timer);
    var SkinRender = {
        SkinTpl: "",
        setPlayerCss: function(a) {
            "" != a && (a = "." + a + " ");
            a = "{id} img{width: auto !important;height: auto !important;}".replace(/{id}/g, a);
            UiTool.loadCss(a)
        },
        setMediacontrols: function(a, b) {
            var d;
            "" != a && (a = "." + a + " ");
            d = "{id}video::-webkit-media-controls-enclosure,{id}video::-webkit-media-controls {display: {dislay} !important;}".replace(/{id}/g, a);
            d = b ? d.replace("{dislay}", "") : d.replace("{dislay}", "none");
            UiTool.loadCss(d)
        },
        setMediafullscreen: function(a, b) {
            var d;
            "" != a && (a = "." + a + " ");
            d = "{id}video::-webkit-media-controls-fullscreen-button {display: {dislay} !important;}".replace(/{id}/g, a);
            d = b ? d.replace("{dislay}", "") : d.replace("{dislay}", "none");
            UiTool.loadCss(d)
        },
        getSkinTpl: function(a, b, d, c) {
            if ("" == SkinRender.SkinTpl) {
                "undefined" == typeof window.CloudSdkPlugin && (window.CloudSdkPlugin = {});
                window.CloudSdkPlugin.skinUuid = videoSdkTool.creatUuid();
                var g = window.CloudSdkPlugin.skinUuid;
                b = b.replace(/{#BGP}/g, d);
                b = b.replace(/{#}/g, g);
                UiTool.loadCss(b);
                for (var e in a)
                    for (a[e] = a[e].replace(/{#}/g, g),
                    b = a[e].match(/{[a-z_A-Z0-9]{1,}\.[a-z_A-Z0-9]{1,}}/g) || [],
                    d = 0; d < b.length; d++) {
                        var f = b[d].replace(/{|}/g, "").split(".")
                          , h = f[0]
                          , f = f[1];
                        c && c.hasOwnProperty(h) && c[h].hasOwnProperty(f) && (h = [h, c[h][f].width, c[h][f].height, c[h][f].src].join(";"),
                        a[e] = a[e].replace(b[d], h))
                    }
                SkinRender.SkinTpl = a
            }
        }
    };
    SOTool.shareObj("core.SkinRender", SkinRender);
    var AdEvent = function() {
        return {
            EVENT: "adEvent",
            HEADSTART: "adHeadPlayStart",
            HEADEND: "adHeadPlayComplete",
            NOAD: "adHeadPlayNone"
        }
    }();
    SOTool.shareObj("event.AdEvent", AdEvent);
    var LoadEvent = function() {
        return {
            LOADCMP: "loadcmp",
            LOADERROR: "loaderror"
        }
    }();
    SOTool.shareObj("event.LoadEvent", LoadEvent);
    var PlayerEvent = function() {
        return {
            EVENT: "playerEvent",
            INIT: "playerInit",
            VIDEO_AUTH_VALID: "videoAuthValid",
            VIDEO_DATA_START: "videoDataStart",
            VIDEO_DATA_CMP: "videoDataCmp",
            GSLB_START: "gslbStart",
            GSLB_CMP: "gslbCmp",
            VPH: "videoPageHide",
            VPS: "videoPageShow",
            WPH: "webPageHide",
            ERROR: "playerError",
            RESIZE: "playerResize",
            VIDEO_INFO: "videoInfo",
            FULLSCREEN: "fullscreen",
            PRESIZE: "resize",
            VIDEO_LIVESTOP: "videoLiveStop",
            VIDEO_INTERRUPT: "videoLiveInterupt",
            USER_INFO: "user_info",
            NEXT: "playNext",
            POINT: "point",
            DELPOINT: "delPoint"
        }
    }();
    SOTool.shareObj("event.PlayerEvent", PlayerEvent);
    var MediaEvent = function() {
        return {
            EVENT: "MediaEvent",
            CONNECT: "videoConnect",
            START: "videoStart",
            PLAY: "videoResume",
            STOP: "videoStop",
            COMPLETE: "video_complete",
            PAUSE: "videoPause",
            BUFFEREMPTY: "videoEmpty",
            BUFFEREFULL: "videoFull",
            SEEK: "videoSeek",
            SEEKEMPTY: "videoSeekEmpty",
            PLAYING: "videoPlaying",
            LODING: "videoLoading",
            METADATA: "MetaData",
            DURATION: "videoDuration",
            DEFSTART: "swapDefinition",
            ERROR: "videoError",
            VOL: "vol",
            REPLAY: "videoReplay"
        }
    }();
    SOTool.shareObj("event.MediaEvent", MediaEvent);
    var SkinEvent = function() {
        return {
            EVENT: "skinEvent",
            PLAY: "skinPlay",
            PAUSE: "skinPause",
            SETDEFINITION: "setDefinition",
            SEEK: "skinSeek",
            VOLUME: "skinVolume",
            FULLSCREEN: "skinFullScreen",
            REPLAY: "skinReplay",
            POINT: "skinPoint",
            DELPOINT: "skinDelPoint"
        }
    }();
    SOTool.shareObj("event.SkinEvent", SkinEvent);
    var Model = function() {
        function a() {
            for (var a = "mac nt os osv app bd xh ro cs ssid lo la".split(" "), c = this, b = 0; b < a.length; b++)
                this[a[b]] = "";
            this.refresh = function(a) {
                for (var b in a)
                    c[b] = a[b]
            }
        }
        function b() {
            var a = this;
            this.autoplay = 0;
            this.refresh = function(c) {
                for (var b in c)
                    a[b] = c[b]
            }
        }
        function d() {
            var a = this;
            this.refresh = function(c) {
                for (var b in c)
                    a[b] = c[b]
            }
        }
        function c() {
            for (var a = ["userId"], c = this, b = 0; b < a.length; b++)
                this[a[b]] = "";
            this.refresh = function(a) {
                for (var b in a)
                    c[b] = a[b]
            }
        }
        function g() {
            for (var a = "title duration volume definition defaultDefinition fullscreen percent time url videoWidth videoHeight".split(" "), c = this, b = 0; b < a.length; b++)
                this[a[b]] = "";
            this.definitionCount = 0;
            this.refresh = function(a) {
                for (var b in a)
                    c[b] = a[b]
            }
        }
        function e() {
            this.systemData = new a;
            this.config = new b;
            this.reportParam = {};
            this.clear()
        }
        e.prototype = {
            init: function(a) {
                switch (this.platform) {
                case "sdk":
                    this._uuid = "";
                    this.playType = a.ptype;
                    delete a.ptype;
                    for (var c = "autoplay uu vu liveId streamId activityId lang".split(" "), b = 0; b < c.length; b++) {
                        var d = c[b];
                        a.hasOwnProperty(d) && (this.config[d] = a[d],
                        delete a[d])
                    }
                    this.systemData.refresh(a);
                    logTool.log("[Stat K]  model init:" + this.systemData.deviceId + "  _2017-04-06 14:20:24.199");
                    this._apprunid = this.systemData.deviceId + "_" + videoSdkTool.now();
                    break;
                case "html5":
                    this.systemData.refresh(a),
                    this._apprunid = this.lc() + "_" + videoSdkTool.now()
                }
            },
            clear: function() {
                this._uuid = "";
                this._lc = videoSdkTool.getLocal("lc");
                this.userData = new c;
                this.videoSetting = new g;
                this.playerConfig = new d;
                this.platform = "html5";
                this.playType = "vod"
            },
            uuid: function() {
                if ("sdk" == this.platform) {
                    if (this.videoSetting.hasOwnProperty("uuid") && 6 < this.videoSetting.uuid.length)
                        return this.videoSetting.uuid;
                    var a = ExternalInterface.callSDK(this.systemData.os, "getVideoSetting", "");
                    this.videoSetting.refresh(a);
                    if (this.videoSetting.hasOwnProperty("uuid") && 6 < this.videoSetting.uuid.length)
                        return this.videoSetting.uuid
                }
                "" == this._uuid && (this._uuid = videoSdkTool.creatUuid());
                return this._uuid + "_" + this.videoSetting.definitionCount
            },
            clearUuid: function() {
                this._uuid = ""
            },
            lc: function() {
                null == this._lc && (this._lc = videoSdkTool.creatUuid(),
                videoSdkTool.setLocal("lc", this._lc));
                return this._lc
            },
            getTypeFrom: function() {
                var a = videoSdkTool.getUrlParams("ch");
                if (a)
                    return a.toString();
                try {
                    if ("" != this.userInfo().userId)
                        return "bcloud_" + this.userInfo().userId
                } catch (c) {}
                return "letv"
            },
            apprunid: function() {
                return this._apprunid
            },
            auid: function() {
                return this.systemData.deviceId
            },
            pcode: function() {
                return "-"
            },
            videoInfo: function() {
                switch (this.platform) {
                case "sdk":
                    var a = ExternalInterface.callSDK(this.systemData.os, "getVideoSetting", "");
                    a.hasOwnProperty("cid") && "" != a.cid || (a.cid = 100);
                    a.hasOwnProperty("liveid") && (a.lid = a.liveid,
                    delete a.liveid);
                    a.hasOwnProperty("time") && "" == a.time && (a.time = "0");
                    this.videoSetting.refresh(a);
                    return a;
                case "html5":
                    return a = this.api.getVideoInfo(),
                    this.videoSetting.refresh(a),
                    a
                }
            },
            userInfo: function() {
                switch (this.platform) {
                case "sdk":
                    if ("" == this.userData.userId) {
                        var a = ExternalInterface.callSDK(this.systemData.os, "getUserSetting", "");
                        this.userData.refresh(a)
                    }
                    return this.userData;
                case "html5":
                    return this.userData
                }
            }
        };
        return e
    }()
      , UrlProxy = function() {
        function a(a) {
            this.model = a;
            this.model.defaultDefinitionList = []
        }
        ClassTool.inherits(a, Proxy);
        a.prototype.load = function(a) {
            var d = this.model;
            d.playerConfig.refresh({
                mloadingUrl: "",
                logo: {
                    pic: ""
                }
            });
            var c = {
                ark: 0,
                gslb: !1
            }
              , g = {
                350: {}
            };
            g["350"].vtype = "350";
            g["350"].definition = "\u539f\u753b";
            g["350"].urls = [d.config.url];
            c.isdrm = 0;
            d.defaultDefinitionList.push("350");
            c.media = g;
            d.videoSetting.refresh(c);
            this.dispatchEvent(new Event(LoadEvent.LOADCMP,[a]))
        }
        ;
        a.prototype.reload = function() {
            this.unload();
            this.superClass.load.call(this)
        }
        ;
        return a
    }()
      , CloudVodProxy = function() {
        function a(a) {
            this.model = a;
            this.model.defaultDefinitionList = []
        }
        var b = MD5.hash("gpc_pet")
          , d = MD5.hash("gpc_playerInfo");
        ClassTool.inherits(a, Proxy);
        a.prototype.load = function(a) {
            this.curTime = 0;
            this.superClass.load.call(this, a)
        }
        ;
        a.prototype.getRequestList = function() {
            for (var a = [], d = ["//36.110.219.232/", "//111.206.208.64/", "//123.59.126.233/"], e = {
                cf: this.getCf(),
                ran: this.getCurTime(),
                pver: this.model.playerConfig.version,
                bver: encodeURIComponent(videoSdkTool.getBrowserVersion()),
                uuid: this.model.uuid(),
                pf: "html5",
                spf: this.getSpf()
            }, f = DomainTool.getDomain("http://api.letvcloud.com", this.model.config.lang) + "/gpc.php?format=jsonp&ver=2.4", h = "ark uu vu payer_name check_code pu lang cuid utoken".split(" "), k = 0; k < h.length; k++) {
                var l = h[k];
                this.model.config.hasOwnProperty(l) && (e[l] = this.model.config[l])
            }
            e.pet = Math.max(0, videoSdkTool.getLocal(b, !1) + 0);
            e.sign = this.getSign([e.cf, e.uu, e.vu, e.ran]);
            for (l in e)
                f += "&" + l + "=" + e[l];
            f += "&page_url=" + encodeURIComponent(window.location.href);
            a.push({
                url: f,
                timeout: 5E3,
                maxCount: 3,
                retryTime: 0
            });
            for (k = 0; k < d.length; k++)
                -1 != a[0].url.indexOf("//api.letvcloud.com/") && (e = f.replace("//api.letvcloud.com/", d[k]),
                a.push({
                    url: e,
                    timeout: 5E3,
                    maxCount: 3,
                    retryTime: 0
                }));
            return a
        }
        ;
        a.prototype.getSign = function(a) {
            return MD5.hash(a.join("") + "fbeh5player12c43eccf2bec3300344")
        }
        ;
        a.prototype.getCurTime = function(a) {
            return 0 != this.curTime ? this.curTime : parseInt(0.001 * videoSdkTool.now())
        }
        ;
        a.prototype.getCf = function() {
            switch (videoSdkTool.getDevice()) {
            case "ipad":
            case "iphone":
                return "html5_ios"
            }
            return "html5"
        }
        ;
        a.prototype.getSpf = function() {
            var a = videoSdkTool.getDevice()
              , b = {
                androidPhone: 0,
                iphone: 1,
                letvTv: 2,
                ipad: 3,
                androidPad: 4
            };
            return b.hasOwnProperty(a) ? b[a] : 0
        }
        ;
        a.prototype.loadCmp = function(a, g) {
            if (!this.isClose) {
                var e = this.model;
                this.log("gpc ok data:" + jsonTool.jsonToString(a) + "----time:" + jsonTool.jsonToString(g));
                if (0 == a.code) {
                    a = a.data;
                    var f = {};
                    f.userId = a.userinfo.userid;
                    e.userData.refresh(f);
                    f = {};
                    videoSdkTool.getLocal(b, !1) != a.playerinfo.pet && a.playerinfo.hasOwnProperty("logo") ? videoSdkTool.setLocal(d, jsonTool.jsonToString(a.playerinfo), !1) : (f = jsonTool.stringToJson(videoSdkTool.getLocal(d)),
                    a.playerinfo = f);
                    var h = {
                        buttonColor: "fault",
                        progressBarColor: "active"
                    }
                      , f = {};
                    f.mloadingUrl = a.playerinfo.loadingpic;
                    f.logo = a.playerinfo.logo;
                    f.watermark = a.playerinfo.watermark;
                    e.playerConfig.refresh(f);
                    !e.outConfig.hasOwnProperty("nskin") && a.playerinfo.hasOwnProperty("nskin") && (e.config.nskin = a.playerinfo.nskin);
                    for (var k in a.playerinfo.onoff)
                        h.hasOwnProperty(k) && (a.playerinfo.onoff[h[k]] = a.playerinfo.onoff[k],
                        delete a.playerinfo.onoff[k],
                        k = h[k]),
                        e.outConfig.hasOwnProperty(k) || (e.config.hasOwnProperty(k) ? "boolean" == typeof e.config[k] && (e.config[k] = "1" == a.playerinfo.onoff[k]) : e.config[k] = a.playerinfo.onoff[k]);
                    "zh_CN" != e.config.lang && (e.config.nskin = 7,
                    e.config.share = !1);
                    f = {};
                    f.pic = a.videoinfo.pic;
                    f.vid = a.videoinfo.vid;
                    f.cid = a.videoinfo.cid;
                    f.pid = a.videoinfo.pid;
                    f.title = a.videoinfo.name;
                    f.duration = a.videoinfo.duration;
                    f.defaultDefinition = a.videoinfo.medialist[0].vtype;
                    f.isdrm = a.videoinfo.isdrm;
                    f.ark = a.videoinfo.ark;
                    f.mmsid = a.videoinfo.mmsid;
                    f.pano = a.videoinfo.pa;
                    f.needbuy = a.videoinfo.needbuy;
                    f.tryLookTime = a.videoinfo.tryLookTime;
                    a.videoinfo.hasOwnProperty("businessline") && (f.p = a.videoinfo.businessline);
                    a.videoinfo.hasOwnProperty("point") && (f.point = a.videoinfo.point);
                    a.videoinfo.hasOwnProperty("seekRange") && !e.outConfig.hasOwnProperty("seekRange") && (e.config.seekRange = a.videoinfo.seekRange);
                    for (var h = {}, l = 0; l < a.videoinfo.medialist.length; l++) {
                        var m = a.videoinfo.medialist[l];
                        k = m.vtype;
                        h[k] = {};
                        h[k].urls = [];
                        for (var n = 0; n < m.urllist.length; n++)
                            h[k].urls.push(this.checkGslbUrl(BaseCode.decode(m.urllist[n].url)));
                        h[k].videoWidth = m.vwidth;
                        h[k].videoHeight = m.vheight;
                        h[k].gbr = m.gbr;
                        h[k].vtype = m.vtype;
                        h[k].definition = m.definition;
                        h[k].videoType = m.urllist[0].videotype;
                        e.defaultDefinitionList.push(k)
                    }
                    f.media = h;
                    videoSdkTool.setLocal(b, a.playerinfo.pet, !1);
                    e.videoSetting.refresh(f);
                    this.dispatchEvent(new Event(LoadEvent.LOADCMP,[a, g]))
                } else
                    "10071" == a.code ? (this.curTime = a.timestamp,
                    this.reload()) : this.dispatchEvent(new Event(LoadEvent.LOADERROR,[{
                        code: ERR.VOD_MMSID_ANALY,
                        message: a.message
                    }, g]))
            }
        }
        ;
        a.prototype.reload = function() {
            this.unload();
            this.superClass.load.call(this)
        }
        ;
        a.prototype.checkGslbUrl = function(a) {
            switch (videoSdkTool.getDevice()) {
            case "ipad":
            case "iphone":
                -1 == a.indexOf("&tss=ios&") && (a = -1 != a.indexOf("&tss=no&") ? a.replace("&tss=no&", "&tss=ios&") : a + "&tss=ios")
            }
            return a
        }
        ;
        a.prototype.loadError = function(a, b) {
            this.isClose || this.dispatchEvent(new Event(LoadEvent.LOADERROR,[{
                code: ERR.VOD_CONFIG_IO,
                errInfo: "url:" + this.getUrl()
            }, b]))
        }
        ;
        return a
    }()
      , CloudMmsProxy = function() {
        function a(a) {
            this.model = a;
            this.model.defaultDefinitionList = []
        }
        var b = MD5.hash("mms_pet")
          , d = MD5.hash("mms_playerInfo");
        ClassTool.inherits(a, Proxy);
        a.prototype.getRequestList = function() {
            for (var a = [], d = [], e = DomainTool.getDomain("http://api.mms.lecloud.com/v2/mms/play", this.model.config.lang), f = "cf uu vu format callback pageurl pver ran ver p pu pet userId utoken".split(" "), h = {}, k = 0; k < f.length; k++) {
                var l = f[k];
                this.model.config.hasOwnProperty(l) && (h[l] = this.model.config[l])
            }
            h.cf = this.getCf();
            h.p = this.model.config.p;
            h.format = "jsonp";
            h.pver = this.model.playerConfig.version;
            h.ran = this.getCurTime();
            h.pet = Math.max(0, videoSdkTool.getLocal(b, !1) + 0);
            h.ver = "1.0";
            a.push({
                url: videoSdkTool.bindFun(function(a) {
                    h.callback = "vbk" + videoSdkTool.now() + Math.floor(100 * Math.random());
                    var b = e, b = b + ("?cf=" + h.cf), c;
                    for (c in h)
                        "cf" != c && (b += "&" + c + "=" + encodeURIComponent(h[c]));
                    h.pageurl = window.location.href;
                    c = this.getSign(h);
                    b += "&sign=" + c + "&pageurl=" + encodeURIComponent(h.pageurl);
                    "undefined" != typeof a && (b = b.replace("//api.mms.lecloud.com/", a));
                    return b
                }, this),
                timeout: 5E3,
                maxCount: 3,
                retryTime: 0
            });
            for (k = 0; k < d.length; k++)
                a.push({
                    url: a[0].url,
                    timeout: 5E3,
                    maxCount: 3,
                    retryTime: 0,
                    args: d[k]
                });
            return a
        }
        ;
        a.prototype.getSign = function(a) {
            var b = [], d;
            for (d in a)
                b.push(d);
            b.sort();
            d = "";
            for (var f = 0; f < b.length; f++)
                d += a[b[f]];
            return MD5.hash(d + "04c5e1e616f668bc559af2afa98b9a25")
        }
        ;
        a.prototype.getCf = function() {
            switch (videoSdkTool.getDevice()) {
            case "ipad":
                return "h5-ipad";
            case "iphone":
                return "h5-ios";
            case "androidPad":
                return "h5-androidpad";
            case "androidPhone":
                return "h5-android";
            case "wph":
            case "pc":
                return "h5-win";
            case "mac":
                return "h5-mac"
            }
            return this.model.config.hasOwnProperty("cf") ? this.model.config.cf : "other"
        }
        ;
        a.prototype.getSpf = function() {
            var a = videoSdkTool.getDevice()
              , b = {
                androidPhone: 0,
                iphone: 1,
                letvTv: 2,
                ipad: 3,
                androidPad: 4
            };
            return b.hasOwnProperty(a) ? b[a] : 0
        }
        ;
        a.prototype.getCurTime = function(a) {
            return this.curTime ? this.curTime : parseInt(0.001 * videoSdkTool.now())
        }
        ;
        a.prototype.loadCmp = function(a, g) {
            if (!this.isClose) {
                var e = this.model;
                if (0 == a.code) {
                    a = a.data;
                    var f = {};
                    f.userId = a.userinfo.userid;
                    e.userData.refresh(f);
                    videoSdkTool.getLocal(b, !1) != a.playerinfo.pet && a.playerinfo.hasOwnProperty("logo") ? videoSdkTool.setLocal(d, jsonTool.jsonToString(a.playerinfo), !1) : (f = jsonTool.stringToJson(videoSdkTool.getLocal(d)),
                    a.playerinfo = f);
                    f = {};
                    f.mloadingUrl = a.playerinfo.loadingpic;
                    f.logo = a.playerinfo.logo;
                    f.watermark = a.playerinfo.watermark;
                    e.playerConfig.refresh(f);
                    var f = {
                        buttonColor: "fault",
                        progressBarColor: "active"
                    }, h;
                    for (h in a.playerinfo.onoff)
                        f.hasOwnProperty(h) && (a.playerinfo.onoff[f[h]] = a.playerinfo.onoff[h],
                        delete a.playerinfo.onoff[h],
                        h = f[h]),
                        e.outConfig.hasOwnProperty(h) || (e.config[h] = a.playerinfo.onoff[h]);
                    "zh_CN" != e.config.lang && (e.config.share = !1);
                    e.config.nskin = 7;
                    f = {};
                    f.vid = a.videoinfo.vid;
                    f.cid = a.videoinfo.cid;
                    f.pid = a.videoinfo.pid;
                    f.title = a.videoinfo.name;
                    f.duration = a.videoinfo.duration;
                    f.defaultDefinition = a.videoinfo.medialist[0].vtype;
                    f.isdrm = a.videoinfo.isdrm;
                    if (a.videoinfo.hasOwnProperty("ark"))
                        f.ark = a.videoinfo.ark;
                    else if (a.videoinfo.hasOwnProperty("sspAd")) {
                        h = {};
                        h.sspId = a.videoinfo.sspAd.sspMediaId;
                        if (a.videoinfo.sspAd.hasOwnProperty("slots"))
                            for (var k = 0; k < a.videoinfo.sspAd.slots.length; k++)
                                a.videoinfo.sspAd.slots[k].hasOwnProperty("rollType") && ("PRE" == a.videoinfo.sspAd.slots[k].rollType ? h.preSlotId = a.videoinfo.sspAd.slots[k].slotId : "PAUSE" == a.videoinfo.sspAd.slots[k].rollType && (h.pauseSlotId = a.videoinfo.sspAd.slots[k].slotId));
                        f.sspAd = h
                    }
                    f.mmsid = a.videoinfo.mmsid;
                    f.pano = a.videoinfo.pa;
                    a.videoinfo.hasOwnProperty("businessline") && (f.p = a.videoinfo.businessline);
                    for (var l = {}, k = 0; k < a.videoinfo.medialist.length; k++) {
                        var m = a.videoinfo.medialist[k];
                        h = m.vtype;
                        l[h] = {};
                        l[h].urls = [];
                        for (var n = 0; n < m.urllist.length; n++)
                            l[h].urls.push(m.urllist[n].url);
                        l[h].videoWidth = m.vwidth;
                        l[h].videoHeight = m.vheight;
                        l[h].gbr = m.gbr;
                        l[h].vtype = m.vtype;
                        l[h].definition = m.definition;
                        l[h].videoType = m.urllist[0].videotype;
                        e.defaultDefinitionList.push(h)
                    }
                    f.media = l;
                    f.pic = a.videoinfo.pic["485*303"];
                    e.videoSetting.refresh(f);
                    videoSdkTool.setLocal(b, a.playerinfo.pet, !1);
                    this.dispatchEvent(new Event(LoadEvent.LOADCMP,[a, g]))
                } else
                    "10071" == a.code ? (this.curTime = a.timestamp,
                    this.reload()) : this.dispatchEvent(new Event(LoadEvent.LOADERROR,[{
                        code: ERR.VOD_MMSID_ANALY,
                        message: a.message
                    }, g]))
            }
        }
        ;
        a.prototype.reload = function() {
            this.unload();
            this.superClass.load.call(this)
        }
        ;
        a.prototype.checkGslbUrl = function(a) {
            switch (videoSdkTool.getDevice()) {
            case "ipad":
            case "iphone":
                -1 == a.indexOf("&tss=ios&") && (a = -1 != a.indexOf("&tss=no&") ? a.replace("&tss=no&", "&tss=ios&") : a + "&tss=ios")
            }
            return a
        }
        ;
        a.prototype.loadError = function(a, b) {
            this.isClose || this.dispatchEvent(new Event(LoadEvent.LOADERROR,[{
                code: ERR.VOD_CONFIG_IO
            }, b]))
        }
        ;
        return a
    }()
      , GslbProxy = function() {
        function a(a) {
            this.model = a
        }
        ClassTool.inherits(a, Proxy);
        a.prototype.getRequestList = function() {
            var a = []
              , d = videoSdkTool.clone(this.model.videoSetting.urls);
            videoSdkTool.addUrlParams(d, {
                jsonp: "?",
                _r: "jsonp",
                format: 1,
                expect: 3
            });
            for (var c = 0; c < d.length; c++) {
                var g = this.checkGslbUrl(d[c]);
                a.push({
                    url: g,
                    timeout: 1E4,
                    maxCount: 3,
                    retryTime: 0
                })
            }
            return a
        }
        ;
        a.prototype.checkGslbUrl = function(a) {
            "ios" == this.model.vodPlayType && -1 == a.indexOf("&tss=ios&") && (a = -1 != a.indexOf("&tss=no&") ? a.replace("&tss=no&", "&tss=ios&") : a + "&tss=ios");
            "mp4" == this.model.vodPlayType && -1 == a.indexOf("&tss=no&") && (a = -1 != a.indexOf("&tss=ios&") ? a.replace("&tss=ios&", "&tss=no&") : a + "&tss=no");
            return a
        }
        ;
        a.prototype.loadCmp = function(a, d) {
            if (!this.isClose)
                if (this.log("gslb data:" + jsonTool.jsonToString(a) + " time" + jsonTool.jsonToString(d)),
                200 == a.status) {
                    a.ercode = "0";
                    for (var c = [a.location], g = 0; g < a.nodelist.length; g++)
                        a.nodelist[g].location != c[0] && c.push(a.nodelist[g].location);
                    this.dispatchEvent(new Event(LoadEvent.LOADCMP,c))
                } else
                    this.dispatchEvent(new Event(LoadEvent.LOADERROR,[{
                        code: ERR.GSLB_ANALY,
                        message: "\u8c03\u5ea6\u9519\u8bef"
                    }, d]))
        }
        ;
        a.prototype.loadError = function(a, d) {
            this.isClose || this.dispatchEvent(new Event(LoadEvent.LOADERROR,[{
                code: ERR.GSLB_IO,
                message: Message.GSLB_IO,
                errInfo: "url:" + this.getUrl()
            }, d]))
        }
        ;
        return a
    }()
      , Reporter = function() {
        function a() {
            this.lastTime = this.pt = 0;
            this.isStartPlay = this.isPauseRecord = !1;
            this.state = "";
            this.replaytype = 1
        }
        function b(a) {
            this.model = a;
            this.reset()
        }
        var d = {
            envUrl: "http://apple.www.letv.com/env/",
            playUrl: "http://apple.www.letv.com/cloud_pl/",
            erUrl: "http://apple.www.letv.com/er/",
            VERSION: "3.7.5",
            heartTime: 6E4
        }
          , c = {
            pc: {
                value: 30,
                sub: {
                    value: 300
                }
            },
            sdk: {
                value: 32,
                sub: {
                    value: 321,
                    ios: {
                        value: 321,
                        domain: "https://apple-www.le.com"
                    },
                    android: {
                        value: 322
                    }
                }
            },
            html5: {
                value: 31,
                sub: {
                    value: 310,
                    ios: {
                        value: 311
                    },
                    android: {
                        value: 312
                    },
                    pc: {
                        value: 310
                    }
                }
            },
            wx: {
                value: 31,
                sub: {
                    value: 310,
                    ios: {
                        value: 311
                    },
                    android: {
                        value: 312
                    },
                    pc: {
                        value: 310
                    }
                }
            }
        }
          , g = {
            android: 600,
            ios: 601
        };
        b.prototype = {
            init: function() {
                this.model.reportParam.p1 = 3;
                this.model.reportParam.p2 = c[this.model.platform.toLowerCase()].value;
                c[this.model.platform.toLowerCase()].sub.hasOwnProperty(this.model.systemData.os.toLowerCase()) ? (this.replaceDomain(c[this.model.platform.toLowerCase()].sub[this.model.systemData.os.toLowerCase()]),
                this.model.reportParam.p3 = c[this.model.platform.toLowerCase()].sub[this.model.systemData.os.toLowerCase()].value) : this.model.reportParam.p3 = c[this.model.platform.toLowerCase()].sub.value
            },
            replaceDomain: function(a) {
                if (a.hasOwnProperty("domain"))
                    for (var b in d)
                        "string" == typeof d[b] && ("http" === a.domain.substr(0, 4) ? d[b] = d[b].replace(/^http:\/\/apple.www.letv.com/g, a.domain) : d[b] = d[b].replace(/apple.www.letv.com/g, a.domain))
            },
            reset: function() {
                this.heartTimer && (this.heartTimer.stop(),
                this.heartTimer = null);
                this.reportParam = new a
            },
            onStateChanged: function(a, b) {
                b = jsonTool.stringToJson(b);
                logTool.log("[Stat K \u65e5\u5fd7\u6570\u636e]  type:" + a + " data:" + b);
                switch (a) {
                case "init":
                    this.reportParam.isStartPlay = !1;
                    this.model.init(b);
                    this.init();
                    this.sendEnvStat();
                    break;
                case "start":
                    this.reportParam.isStartPlay = !1;
                    this.sendPlayStat("init");
                    break;
                case "play":
                    this.reportParam.isStartPlay || (this.sendPlayStat("play", b),
                    this.startHeartTimer(),
                    this.resumePtStat(),
                    this.reportParam.isStartPlay = !0);
                    break;
                case "bufferEmpty":
                    this.reportParam.state != a && this.reportParam.isStartPlay && (this.pausePtStat(),
                    this.sendPlayStat("block"));
                    break;
                case "bufferFull":
                    "bufferEmpty" == this.reportParam.state && this.reportParam.isStartPlay && (this.resumePtStat(),
                    this.sendPlayStat("eblock"));
                    this.reportParam.isStartPlay || (this.reportParam.isStartPlay = !0);
                    break;
                case "seek":
                    this.reportParam.isStartPlay && (this.pausePtStat(),
                    this.sendPlayStat("drag", {
                        py: {
                            dr: this.model.videoInfo().time + "_" + b.time
                        }
                    }));
                    break;
                case "pause":
                    this.reportParam.state != a && this.reportParam.isStartPlay && (this.pausePtStat(),
                    this.sendPlayStat("pa"));
                    break;
                case "resume":
                    this.reportParam.isStartPlay && (this.resumePtStat(),
                    this.sendPlayStat("resume"));
                    break;
                case "definition":
                    this.reportParam.isStartPlay && (this.pausePtStat(),
                    this.model.videoSetting.definitionCount++,
                    this.reportParam.replaytype = 2,
                    this.sendPlayStat("tg"));
                    break;
                case "stopPlay":
                    this.reportParam.isStartPlay && (this.reportParam.isStartPlay = !1,
                    this.pausePtStat(),
                    this.pauseHeadStat(),
                    this.sendPlayStat("end"));
                    break;
                case "playStop":
                    this.reportParam.isStartPlay && (this.reportParam.isStartPlay = !1,
                    this.pauseHeadStat(),
                    this.sendPlayStat("end"),
                    this.sendPlayStat("finish"));
                    break;
                case "hide":
                    null != this.heartTimer && this.reportParam.isStartPlay && (this.pausePtStat(!0),
                    this.heartTimer.stop());
                    break;
                case "show":
                    null != this.heartTimer && this.reportParam.isStartPlay && (this.resumePtStat(!0),
                    this.heartTimer.start());
                    break;
                case "error":
                    this.reportParam.isStartPlay = !1,
                    this.sendErrorStat(b),
                    null != this.heartTimer && this.heartTimer.stop()
                }
                this.reportParam.state = a
            },
            startHeartTimer: function() {
                this.heartTimer ? this.heartTimer.running || (this.setDelay(),
                this.heartTimer.start()) : (this.heartTimer = new Timer(d.heartTime,this,this.heartHanlder),
                this.setDelay(),
                this.heartTimer.start())
            },
            pauseHeadStat: function() {
                this.heartHanlder();
                this.heartTimer && this.heartTimer.stop()
            },
            setDelay: function() {
                if (this.heartTimer)
                    switch (this.heartTimer.currentCount) {
                    case 0:
                        this.heartTimer.delay = 15E3;
                        break;
                    case 1:
                        this.heartTimer.delay = 6E4;
                        break;
                    default:
                        this.heartTimer.delay = d.heartTime
                    }
            },
            heartHanlder: function() {
                this.pausePtStat(!0);
                this.resumePtStat(!0);
                this.setDelay();
                this.sendPlayStat("time");
                this.reportParam.pt = 0
            },
            pausePtStat: function(a) {
                "undefined" == typeof a && (a = !1);
                var b = videoSdkTool.now();
                this.reportParam.isPauseRecord || 0 == this.reportParam.lastTime || (this.reportParam.pt += b - this.reportParam.lastTime);
                0 == this.reportParam.lastTime && (this.reportParam.pt = 0);
                this.reportParam.lastTime = b;
                a || (this.reportParam.isPauseRecord = !0)
            },
            resumePtStat: function(a) {
                "undefined" == typeof a && (a = !1);
                var b = videoSdkTool.now();
                this.reportParam.lastTime = b;
                a || (this.reportParam.isPauseRecord = !1)
            },
            checkValue: function(a, b) {
                return "undefined" === typeof a || "" === a || null === a ? "undefined" === typeof b ? "-" : b : a
            },
            sendEnvStat: function() {
                var a = d.envUrl
                  , b = this.model
                  , a = a + ("?ver=" + this.checkValue(d.VERSION))
                  , a = a + ("&p1=" + this.checkValue(this.model.reportParam.p1))
                  , a = a + ("&p2=" + this.checkValue(this.model.reportParam.p2))
                  , a = a + ("&p3=" + this.checkValue(this.model.reportParam.p3));
                if ("html5" == this.model.platform || "wx" == this.model.platform)
                    a += "&lc=" + this.checkValue(b.lc()),
                    a += "&app_name=bcloud_h5";
                "sdk" == this.model.platform && (a += "&auid=" + this.checkValue(b.auid()),
                a += "&app_name=0");
                a += "&uuid=" + this.checkValue(b.uuid());
                a += "&mac=" + this.checkValue(b.systemData.mac);
                a += "&nt=" + this.checkValue(b.systemData.nt, "none");
                a += "&os=" + this.checkValue(b.systemData.os);
                a += "&osv=" + this.checkValue(b.systemData.osv);
                a += "&app=" + this.checkValue(b.systemData.appv);
                a += "&bd=" + encodeURIComponent(this.checkValue(b.systemData.bd));
                a += "&xh=" + encodeURIComponent(this.checkValue(b.systemData.xh));
                a += "&ro=" + encodeURIComponent(this.checkValue(b.systemData.ro));
                a = a + "&src=pl" + ("&ch=" + this.checkValue(b.getTypeFrom()));
                a += "&cs=" + encodeURIComponent(this.checkValue(b.systemData.cs));
                a += "&ssid=" + encodeURIComponent(this.checkValue(b.systemData.ssid));
                a += "&lo=" + encodeURIComponent(this.checkValue(b.systemData.lo));
                a += "&la=" + encodeURIComponent(this.checkValue(b.systemData.la));
                a += "&apprunid=" + this.checkValue(b.apprunid());
                a += "&ctime=" + videoSdkTool.now();
                a += "&r=" + Math.round((Math.random() + 1) * Math.pow(10, 11));
                this.report(a)
            },
            sendPlayStat: function(a, b) {
                var c = d.playUrl
                  , k = this.model
                  , c = c + ("?ver=" + this.checkValue(d.VERSION))
                  , c = c + ("&p1=" + this.checkValue(this.model.reportParam.p1))
                  , c = c + ("&p2=" + this.checkValue(this.model.reportParam.p2))
                  , c = c + ("&p3=" + this.checkValue(this.model.reportParam.p3))
                  , c = c + ("&ac=" + this.checkValue(a))
                  , c = c + ("&prg=" + this.checkValue(k.videoInfo().time));
                "time" == a && (6E4 < this.reportParam.pt && (this.reportParam.pt = 6E4),
                0 > this.reportParam.pt && (this.reportParam.pt = 0),
                c += "&pt=" + this.checkValue(Math.abs(Math.round(0.001 * this.reportParam.pt))));
                if ("html5" == this.model.platform || "wx" == this.model.platform)
                    c += "&lc=" + this.checkValue(k.lc()),
                    c += "&app_name=bcloud_h5";
                "sdk" == this.model.platform && (c += "&auid=" + this.checkValue(k.auid()),
                c += "&app_name=0");
                c += "&uuid=" + this.checkValue(k.uuid());
                "vod" == k.playType && (c += "&cid=" + this.checkValue(k.videoSetting.cid),
                "" != k.videoSetting.pid && (c += "&pid=" + this.checkValue(k.videoSetting.pid)),
                c += "&vid=" + this.checkValue(k.videoSetting.vid),
                c = c + "&ty=0" + ("&vlen=" + this.checkValue(k.videoSetting.duration)));
                "live" == k.playType && (c += "&lid=" + this.checkValue(k.videoSetting.lid),
                c += "&sid=" + this.checkValue(k.videoSetting.sid),
                c += "&ty=1",
                c += "&vlen=6000",
                k.videoSetting.hasOwnProperty("activityId") && (c += "&zid=" + this.checkValue(k.videoSetting.activityId)));
                c += "&ch=" + this.checkValue(k.getTypeFrom());
                c += "&vt=" + this.checkValue(k.videoSetting.vtype, "unknown");
                c += "&pv=" + encodeURIComponent(this.checkValue(this.model.systemData.appv));
                "sdk" == this.model.platform && (b || (b = {}),
                b.hasOwnProperty("py") || (b.py = {}),
                b.py.replaytype = this.reportParam.replaytype);
                this.model.videoSetting.hasOwnProperty("p") && (b || (b = {}),
                b.hasOwnProperty("py") || (b.py = {}),
                b.py.p = this.model.videoSetting.p);
                null != b && b.hasOwnProperty("py") && (c += "&py=" + encodeURIComponent(this.checkValue(videoSdkTool.objectParseToString(b.py))));
                "sdk" == this.model.platform && (c += "&pcode=" + this.checkValue(this.model.pcode()));
                c += "&nt=" + this.checkValue(k.systemData.nt, "none");
                c += "&ap=" + this.checkValue(this.model.config.autoplay);
                "init" == a && "sdk" == this.model.platform && (c += "&cdev=" + this.checkValue(k.systemData.cdev),
                c += "&caid=" + this.checkValue(g[k.systemData.os.toLowerCase()]));
                "play" == a && (c += "&pay=0",
                b && b.hasOwnProperty("cv") && (c += "&stc=" + encodeURIComponent(this.checkValue(videoSdkTool.objectParseToString(b.cv.stc))),
                c += "&joint=" + this.checkValue(b.cv.joint)));
                c += "&prl=0";
                c += "&ctime=" + this.checkValue(videoSdkTool.now());
                c += "&custid=" + this.checkValue(k.userInfo().userId);
                c += "&ipt=0";
                c += "&owner=1";
                c += "&apprunid=" + this.checkValue(k.apprunid());
                "sdk" != this.model.platform && (c += "&url=" + encodeURIComponent(this.checkValue(window ? window.location.href : "")),
                c += "&ref=" + encodeURIComponent(this.checkValue(document ? document.referrer : "")));
                c += "&mac=" + this.checkValue(k.systemData.mac);
                c += "&key=letv01";
                c += "&r=" + Math.round((Math.random() + 1) * Math.pow(10, 11));
                this.report(c)
            },
            sendErrorStat: function(a) {
                var b = d.erUrl
                  , c = this.model
                  , b = b + ("?ver=" + this.checkValue(d.VERSION))
                  , b = b + ("&p1=" + this.checkValue(this.model.reportParam.p1))
                  , b = b + ("&p2=" + this.checkValue(this.model.reportParam.p2))
                  , b = b + ("&p3=" + this.checkValue(this.model.reportParam.p3))
                  , b = b + "&et=pl" + ("&err=" + this.checkValue(a.errcode));
                if ("html5" == this.model.platform || "wx" == this.model.platform)
                    b += "&lc=" + this.checkValue(c.lc()),
                    b += "&app_name=bcloud_h5";
                "sdk" == this.model.platform && (b += "&auid=" + this.checkValue(c.auid()),
                b += "&app_name=0");
                b += "&mac=" + this.checkValue(c.systemData.mac);
                b += "&nt=" + this.checkValue(c.systemData.nt, "none");
                b += "&os=" + this.checkValue(c.systemData.os);
                b += "&osv=" + this.checkValue(c.systemData.osv);
                b += "&app=" + this.checkValue(c.systemData.appv);
                b += "&bd=" + this.checkValue(c.systemData.bd);
                b += "&xh=" + this.checkValue(c.systemData.xh);
                b += "&ro=" + this.checkValue(c.systemData.ro);
                "vod" == c.playType && (b += "&cid=" + this.checkValue(c.videoSetting.cid),
                "" != c.videoSetting.pid && (b += "&pid=" + this.checkValue(c.videoSetting.pid)),
                b += "&vid=" + this.checkValue(c.videoSetting.vid));
                a = {
                    ch: this.checkValue(c.getTypeFrom()),
                    custid: this.checkValue(c.userInfo().userId)
                };
                this.model.videoSetting.hasOwnProperty("p") && (a.p = this.checkValue(this.model.videoSetting.p));
                for (var g = ["uu", "vu", "liveId", "streamId", "activityId"], l = 0; l < g.length; l++)
                    c.config.hasOwnProperty(g[l]) && (a[g[l]] = c.config[g[l]]);
                b += "&ep=" + encodeURIComponent(videoSdkTool.objectParseToString(a));
                b += "&uuid=" + this.checkValue(c.uuid());
                b += "&apprunid=" + this.checkValue(c.apprunid());
                b += "&r=" + Math.round((Math.random() + 1) * Math.pow(10, 11));
                this.report(b)
            },
            report: function(a) {
                a = DomainTool.getDomain(a, this.model.config.lang, this.isMustHttps());
                logTool.log("[Stat K]  url:" + a);
                switch (this.model.platform) {
                case "html5":
                    var b = new Image(1,1);
                    b.onload = b.onerror = b.onabort = function() {
                        b = b.onload = b.onerror = b.onabort = null
                    }
                    ;
                    b.src = a;
                    break;
                case "wx":
                    wx.request({
                        url: a
                    });
                    break;
                case "sdk":
                    ExternalInterface.callSDK(this.model.systemData.os, "logRequest", {
                        url: a
                    })
                }
            },
            isMustHttps: function() {
                return "wx" == this.model.platform || "sdk" == this.model.platform ? !0 : !1
            }
        };
        return b
    }()
      , ModelHandler = function() {
        function a(a) {
            this.model = a
        }
        ClassTool.inherits(a, ClassObject);
        a.prototype.setUp = function(a, d) {
            if (this.model.config.hasOwnProperty("url")) {
                var c = new UrlProxy(this.model);
                c.addEventListener(LoadEvent.LOADCMP, this.gpcCmp, this);
                c.load()
            } else
                a.hasOwnProperty("uu") && a.hasOwnProperty("vu") && a.uu && a.vu ? (this.model.vodPlayType = GlobalHandler.checkPlayType(),
                this.vodproxy = "101" == this.model.videoSetting.p ? new CloudVodProxy(this.model) : new CloudMmsProxy(this.model),
                this.vodproxy.addEventListener(LoadEvent.LOADCMP, this.gpcCmp, this),
                this.vodproxy.addEventListener(LoadEvent.LOADERROR, this.errorHanlder, this),
                this.vodproxy.load()) : this.dispatchEvent(new Event(LoadEvent.LOADERROR,[{
                    code: ERR.PARAMS
                }]))
        }
        ;
        a.prototype.destroy = function(a) {
            this.vodproxy && this.vodproxy.unload()
        }
        ;
        a.prototype.errorHanlder = function(a) {
            this.dispatchEvent(new Event(LoadEvent.LOADERROR,a.args[1]))
        }
        ;
        a.prototype.gpcCmp = function(a) {
            this.refreshLoadingData(a);
            this.dispatchEvent(new Event(LoadEvent.LOADCMP,a))
        }
        ;
        a.prototype.refreshLoadingData = function() {
            this.model.config.hasOwnProperty("loadingurl") && (this.model.playerConfig.mloadingUrl = 0 == this.model.config.loadingurl ? this.model.playerConfig.loadingUrl : this.model.config.loadingurl)
        }
        ;
        return a
    }()
      , BasePlayer = function() {
        function a() {}
        ClassTool.inherits(a, ClassObject);
        a.prototype.init = function() {
            this.playUrlList = [];
            this.isFtc = this.startPlay = this.autoplay = !1;
            this.playState = 0;
            this.render = null;
            this.emptyDelay = 1E3
        }
        ;
        a.prototype.setConfig = function(a) {}
        ;
        a.prototype.errorHandler = function(a) {
            1 < this.playUrlList.length && a && a.code && 4 != a.code ? (this.playUrlList.shift(),
            this.log("\u64ad\u653e\u5931\u8d25\uff0c errCode:" + a.code + ",\u5207\u6362\u4e0b\u4e00\u4e2a\u5730\u5740:" + this.playUrlList[0]),
            this.changeurl(this.playUrlList[0])) : (a.hasOwnProperty("retryCdn") || (a.retryCdn = !0),
            a.hasOwnProperty("code") || (a.code = ERR.PLAY_TIMEOUT),
            this.log("\u64ad\u653e\u5931\u8d25: errCode:" + a.code + ",url:" + this.playUrlList[0]),
            this.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.ERROR,[a])))
        }
        ;
        a.prototype.onPlaySeekHandler = function() {
            this.emptyST && clearTimeout(this.emptyST);
            this.startPlay && (this.playState = 5,
            this.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.SEEK,this.getTime())))
        }
        ;
        a.prototype.onPlayFullHandler = function() {
            this.startPlay || (this.startPlay = !0,
            this.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.START)),
            this.render && this.render.start());
            1 != this.playState && (this.playState = 1,
            this.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.BUFFEREFULL,this.getTime())));
            this.emptyST && clearTimeout(this.emptyST)
        }
        ;
        a.prototype.onPlayEmptyHandler = function() {
            var a = this;
            a.emptyST && clearTimeout(a.emptyST);
            a.startPlay && 3 != a.playState && (5 != a.playState ? (a.playState = 3,
            a.emptyST = setTimeout(function() {
                a.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.BUFFEREMPTY,a.getTime()))
            }, a.emptyDelay)) : (a.playState = 3,
            a.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.SEEKEMPTY,a.getTime()))))
        }
        ;
        a.prototype.onPlaStopHandler = function() {
            this.emptyST && clearTimeout(this.emptyST);
            4 != this.playState && (this.playState = 4,
            this.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.COMPLETE)))
        }
        ;
        a.prototype.onPlayHandler = function() {
            this.emptyST && clearTimeout(this.emptyST);
            this.playState = 1;
            this.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.PLAY,this.getTime()))
        }
        ;
        a.prototype.onPauseHandler = function() {
            this.emptyST && clearTimeout(this.emptyST);
            this.playState = 2;
            this.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.PAUSE,this.getTime()))
        }
        ;
        a.prototype.onPlayIngHandler = function() {
            var a = this.getTime();
            if (0 <= a && !this.isFtc)
                if (0 < a)
                    this.log("\u7b2c\u4e00\u6b21\u83b7\u5f97\u975e0\u7684\u64ad\u653e\u65f6\u95f4" + a),
                    this.isFtc = !0,
                    this.onPlayFullHandler();
                else if ("iphone" == videoSdkTool.getDevice() && "qq" == videoSdkTool.getBrowser())
                    this.onPlayFullHandler();
            this.startPlay && this.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.PLAYING,a))
        }
        ;
        a.prototype.onLoadIngHandler = function() {
            this.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.LODING,this.getLoadPercent()))
        }
        ;
        a.prototype.onMetaDataHandler = function(a) {
            this.videoWidth = a.width || 0;
            this.videoHeight = a.height || 0;
            !this.mduration || 0 != a.duration && isFinite(a.duration) || (a.duration = this.mduration);
            0 < this.videoWidth && 0 < this.videoHeight && !this.hasMetadata && (this.setSize(),
            this.hasMetadata = !0,
            this.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.METADATA,{
                videoWidth: this.videoWidth,
                videoHeight: this.videoHeight,
                duration: this.duration
            })));
            0 < a.duration && isFinite(a.duration) && this.duration != a.duration && (this.duration = a.duration,
            this.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.DURATION,{
                duration: this.duration
            })))
        }
        ;
        return a
    }()
      , H5SamplePlayer = function() {
        function a() {
            var a = this;
            this.type = "video";
            this._videoRect = {};
            this.videoHandlerBack = function() {
                a.videoHandler.apply(a, arguments)
            }
        }
        var b = 0
          , d = "error emptied abort playing play pause ended canplay waiting loadeddata loadedmetadata timeupdate seeked seeking progress durationchange".split(" ");
        ClassTool.inherits(a, BasePlayer);
        a.prototype.destroy = function() {
            this.removeEvents();
            this.stream && this.stream.close();
            this.render && this.render.close()
        }
        ;
        a.prototype.setPoster = function(a) {
            this.videoEL.poster = a
        }
        ;
        a.prototype.setUp = function(a, d) {
            b++;
            var e = "LecoudPlayer" + (new Date).getTime() + "" + b, f, h = ["preload", "controls", "width", "height"];
            f = '<div id="v{id}" style="left:0px;top:0px;width:100%;height:100%;display: block;position: relative;"><video  id="{id}" controls="controls"  style="width:100%;height:100%;font-size: 12px;"></video></div>'.replace(/{id}/g, e);
            d.innerHTML = f;
            this.outEl = d;
            this.video = this.videoEL = document.getElementById(e);
            this.videoBox = document.getElementById("v" + e);
            this.config = a;
            this.isEndStartSeek = 0 < this.config.start ? !1 : !0;
            a.hasOwnProperty("pic") && (this.videoEL.poster = a.pic);
            a.hasOwnProperty("autoplay") && "1" == a.autoplay ? (this.videoEL.autoplay = "autoplay",
            this.autoplay = !0) : this.autoplay = !1;
            a.hasOwnProperty("playsinline") && "1" == a.playsinline && (this.videoEL.WebKitPlaysInline ? this.videoEL.WebKitPlaysInline = !0 : (this.videoEL.setAttribute("webkit-playsinline", ""),
            this.videoEL.setAttribute("playsinline", "")));
            a.hasOwnProperty("x5Type") && "h5" == a.x5Type && /android/.test(videoSdkTool.getDevice()) && (this.videoEL.setAttribute("x5-video-player-type", "h5"),
            a.hasOwnProperty("x5Fullscreen") && (a.x5Fullscreen ? this.videoEL.setAttribute("x5-video-player-fullscreen", "true") : this.videoEL.setAttribute("x5-video-player-fullscreen", "false")));
            for (e = 0; e < h.length; e++)
                a.hasOwnProperty(h[e]) && "width" != h[e] && "height" != h[e] && (this.videoEL[h[e]] = a[h[e]]);
            this.isShow = !0;
            this.vArea = this.videoBox;
            this.renderType = "";
            0 < this.outEl.offsetWidth & 0 < this.outEl.offsetHeight || (this.videoBox.style.width = "99.5%",
            this.videoBox.style.height = "99.5%");
            this._videoRect = {
                x: 0,
                y: 0,
                width: this.outEl.offsetWidth,
                height: this.outEl.offsetHeight
            }
        }
        ;
        a.prototype.enableControls = function() {
            this.video.controls = !0
        }
        ;
        a.prototype.disableControls = function() {
            this.video.controls = !1
        }
        ;
        a.prototype.setContainer = function(a) {
            this.vArea = a
        }
        ;
        a.prototype.setLoop = function(a) {}
        ;
        a.prototype.hide = function(a) {
            this.isShow && (a ? this.videoBox.style.display = "none" : (this.tmpwidth = this.videoBox.style.width,
            this.tmpheight = this.videoBox.style.height,
            this.videoBox.style.width = "1px",
            this.videoBox.style.height = "1px",
            this.videoBox.style.left = "-1000px",
            this.videoBox.style.top = "-1000px"),
            this.isShow = !1)
        }
        ;
        a.prototype.show = function() {
            this.isShow || (this.videoBox.style.display = "",
            this.videoBox.style.width = this.tmpwidth,
            this.videoBox.style.height = this.tmpheight,
            this.videoBox.style.left = "0px",
            this.videoBox.style.top = "0px",
            this.isShow = !0)
        }
        ;
        a.prototype.setSize = function() {
            this.display = 0 < this.outEl.offsetWidth & 0 < this.outEl.offsetHeight ? !0 : !1;
            this.setVideoRect();
            this.isShow && (this.config.dvideoSize ? this.display && (this.videoBox.style.width = "100%",
            this.videoBox.style.height = "100%") : 0 < this.videoWidth && 0 < this.videoHeight & 0 < this.outEl.offsetWidth & 0 < this.outEl.offsetHeight && (this.videoBox.style.width = this._videoRect.width + "px",
            this.videoBox.style.height = this._videoRect.height + "px",
            this.videoBox.style.top = this._videoRect.y + "px",
            this.videoBox.style.left = this._videoRect.x + "px"));
            this.render && this.render.setSize(this.vArea.offsetWidth, this.vArea.offsetHeight)
        }
        ;
        a.prototype.setVideoRect = function() {
            if ("pano" == this.renderType)
                this._videoRect = {
                    x: 0,
                    y: 0,
                    width: this.vArea.offsetWidth,
                    height: this.vArea.offsetHeight
                };
            else if (0 < this.videoWidth && 0 < this.videoHeight & 0 < this.outEl.offsetWidth & 0 < this.outEl.offsetHeight) {
                var a, b;
                this.videoWidth / this.videoHeight > this.outEl.offsetWidth / this.outEl.offsetHeight ? (a = this.outEl.offsetWidth,
                b = this.videoHeight * this.outEl.offsetWidth / this.videoWidth) : (b = this.outEl.offsetHeight,
                a = this.videoWidth * this.outEl.offsetHeight / this.videoHeight);
                this._videoRect = {
                    x: 0.5 * (this.outEl.offsetWidth - a),
                    y: 0.5 * (this.outEl.offsetHeight - b),
                    width: a,
                    height: b
                }
            }
        }
        ;
        a.prototype.addEvents = function() {
            for (var a = this.video, b = 0; b < d.length; b++)
                a.addEventListener(d[b], this.videoHandlerBack, !0)
        }
        ;
        a.prototype.removeEvents = function() {
            for (var a = this.video, b = 0; b < d.length; b++)
                a.removeEventListener(d[b], this.videoHandlerBack, !0)
        }
        ;
        a.prototype.videoHandler = function(a) {
            switch (a.type) {
            case "error":
                if ("firefox" == videoSdkTool.getBrowser() && null == this.video.error)
                    break;
                if (this.video.error && 4 == this.video.error.code && 0 < this.getTime())
                    break;
                a = {
                    code: ERR.PLAY_TIMEOUT
                };
                this.video.error && this.video.error.code && (a.code = "49" + this.video.error.code);
                this.errorHandler(a);
                break;
            case "playing":
                if (!this.startPlay)
                    this.onMetaDataHandler({
                        width: this.video.videoWidth,
                        height: this.video.videoHeight,
                        duration: this.video.duration
                    });
                this.autoSeek();
                if (this.isEndStartSeek)
                    this.onPlayFullHandler();
                this.isStartSeek && (this.isEndStartSeek = !0);
                break;
            case "emptied":
            case "waiting":
                this.onPlayEmptyHandler();
                break;
            case "seeked":
                this.isEndStartSeek = !0;
                this.onPlayFullHandler();
                break;
            case "seeking":
                this.onPlaySeekHandler();
                break;
            case "play":
                this.onPlayHandler();
                break;
            case "pause":
                this.onPauseHandler();
                break;
            case "ended":
                this.onPlaStopHandler();
                break;
            case "timeupdate":
                this.display || this.setSize();
                if (this.isEndStartSeek)
                    this.onPlayIngHandler();
                break;
            case "progress":
                this.onLoadIngHandler();
                break;
            case "durationchange":
            case "loadedmetadata":
                this.onMetaDataHandler({
                    width: this.video.videoWidth,
                    height: this.video.videoHeight,
                    duration: this.video.duration
                })
            }
        }
        ;
        a.prototype.autoSeek = function() {
            var a = this;
            this.log("autoSeek:" + a.config.start + "--" + a.startPlay + "-" + a.isEndStartSeek);
            0 != a.config.start ? a.startPlay || a.isEndStartSeek ? a.isStartSeek = !0 : setTimeout(function() {
                a.isStartSeek = !0;
                a.seek(a.config.start)
            }, 500) : a.isStartSeek = !0
        }
        ;
        a.prototype.getLoadPercent = function() {
            if (this.video.getLoadPercent)
                return this.video.getLoadPercent();
            for (var a = this.video.buffered, b = 0; b < a.length; b++)
                if (this.getTime() < a.end(b))
                    return Math.min(1, a.end(b) / this.video.duration);
            return 0
        }
        ;
        a.prototype.play = function(a) {
            var b = this;
            b.renderType = a.type;
            b.hasMetadata = !1;
            b.playUrlList = a.urls;
            b.config.start = a.start;
            b.url = b.playUrlList[0];
            b.isEndStartSeek = 0 < b.config.start ? !1 : !0;
            b.isStartSeek = !1;
            this.isFtc = b.startPlay = !1;
            this.render || (this.render = new RenderEngine);
            this.render.init({
                type: a.type,
                video: this.videoEL,
                el: this.vArea,
                onstart: function() {
                    b.log("\u6e32\u67d3\u5f15\u64ce\u521d\u59cb\u5316\u5b8c\u6bd5\uff0c\u56de\u8c03\u64ad\u653e, url:" + b.url);
                    b.prePlay(b.url, b.autoplay || a.play, a)
                },
                onerror: function(a) {
                    b.log("\u6e32\u67d3\u5f15\u64ce\u521d\u59cb\u5316\u5931\u8d25");
                    a.retryCdn = !1;
                    b.errorHandler(a)
                }
            })
        }
        ;
        a.prototype.prePlay = function(a, b, d) {
            var f = this;
            f.stream || (f.stream = new StreamEngine);
            f.stream.init({
                video: f.videoEL,
                el: f.vArea,
                url: a,
                config: d,
                onstart: function() {
                    f.log("\u64ad\u653e\u5f15\u64ce\u521d\u59cb\u5316\u5b8c\u6bd5\uff0c\u56de\u8c03\u64ad\u653e, url:" + f.url);
                    f.video = f.stream.getVideo();
                    f.addEvents();
                    f.video.src = f.url;
                    if (f.autoplay || play)
                        f.video.load && f.video.load(),
                        f.resume(d.callback)
                },
                onerror: function(h) {
                    "flv" == h.message ? (d.useFlv = !1,
                    f.stream.close(),
                    f.prePlay(a, b, d)) : (f.log("\u64ad\u653e\u5f15\u64ce\u521d\u59cb\u5316\u5931\u8d25"),
                    h.retryCdn = !1,
                    f.errorHandler(h))
                }
            })
        }
        ;
        a.prototype.resume = function(a) {
            var b = this;
            if (this.video.play) {
                var d = this.video.play();
                d && d.then ? (d.then(function(b) {
                    a && a()
                }()),
                d["catch"] && d["catch"](function(a) {
                    b.log(a)
                })) : a && a()
            }
        }
        ;
        a.prototype.pause = function() {
            this.video.pause()
        }
        ;
        a.prototype.getTime = function() {
            return this.video.getTime ? this.video.getTime() : this.video.currentTime
        }
        ;
        a.prototype.seek = function(a) {
            if (this.video.seek)
                return this.video.seek(a);
            this.log("seek:" + a);
            this.video.currentTime = a
        }
        ;
        a.prototype.changeurl = function(a) {
            this.url = a;
            this.video.src = this.url;
            this.config.start = this.getTime();
            this.isEndStartSeek = 0 < this.config.start ? !1 : !0;
            this.video.load();
            this.resume()
        }
        ;
        a.prototype.setVol = function(a) {
            this.videoEL.volume = a
        }
        ;
        a.prototype.getVol = function() {
            return this.videoEL.volume
        }
        ;
        a.prototype.stop = function() {
            this.destroy()
        }
        ;
        a.prototype.getVideoRect = function(a) {
            if ("wh" == a)
                return {
                    w: this.video.offsetWidth,
                    h: this.video.offsetHeight
                };
            this._videoRect.hasMetadata = this.hasMetadata;
            return this._videoRect
        }
        ;
        return a
    }()
      , RenderEngine = function() {
        function a(a) {}
        var b = {
            pano: {
                name: "PanoRender",
                check: videoSdkTool.checkPano,
                err: {
                    code: "",
                    message: ""
                }
            }
        };
        ClassTool.inherits(a, Plugin);
        a.prototype.init = function(a) {
            this.isStart = !1;
            this.options = a;
            this.log("\u521d\u59cb\u5316\u6e32\u67d3\u5f15\u64ce" + this.eg);
            this.eg ? a.type != this.eg.type ? this.eg = null : this.eg.reset(a) : this.initPlugin(a, this.pluginOk, b)
        }
        ;
        a.prototype.pluginOk = function(a) {
            this.eg = a ? new a(this.options) : null
        }
        ;
        a.prototype.start = function() {
            this.isStart || (this.isStart = !0,
            this.eg && this.eg.start())
        }
        ;
        a.prototype.close = function() {
            this.log("\u5173\u95ed\u6e32\u67d3\u5f15\u64ce" + this.eg);
            this.eg && (this.eg.close(),
            this.eg = null);
            this.isStart = !1
        }
        ;
        a.prototype.setSize = function(a, b) {
            this.eg && this.eg.setSize(a, b)
        }
        ;
        return a
    }()
      , StreamEngine = function() {
        function a(a) {}
        var b = {
            hls: {
                name: "media.mediaPlay.hls",
                check: function() {
                    return !0
                },
                err: {
                    code: "",
                    message: ""
                }
            },
            flv: {
                name: "media.mediaPlay.flv",
                check: function() {
                    return !0
                },
                err: {
                    code: "",
                    message: ""
                }
            }
        };
        ClassTool.inherits(a, Plugin);
        a.prototype.init = function(a) {
            this.isStart = !1;
            this.getPlayType(a);
            this.options = a;
            "" == a.type ? (this.eg = a.video,
            a.hasOwnProperty("onstart") && a.onstart && a.onstart()) : (this.log("\u521d\u59cb\u5316\u64ad\u653e\u5f15\u64ce" + this.eg),
            this.eg ? a.type != this.eg.type ? this.eg = a.video : this.eg.reset(a) : this.initPlugin(a, this.pluginOk, b))
        }
        ;
        a.prototype.getPlayType = function(a) {
            a.type = a.config.useFlv ? "flv" : a.config.useHls ? "hls" : ""
        }
        ;
        a.prototype.getVideo = function(a) {
            return this.eg
        }
        ;
        a.prototype.pluginOk = function(a) {
            a ? (this.eg = new a(this.options),
            this.eg.init()) : this.eg = null
        }
        ;
        a.prototype.start = function() {
            this.isStart || (this.isStart = !0)
        }
        ;
        a.prototype.close = function() {
            this.log("\u5173\u95ed\u64ad\u653e\u5f15\u64ce" + this.eg);
            this.eg && (this.eg.close ? this.eg.close() : (this.eg.pause && this.eg.pause(),
            this.eg.src = ""),
            this.eg = null);
            this.isStart = !1
        }
        ;
        a.prototype.setSize = function(a, b) {}
        ;
        return a
    }()
      , MediaPlayer = function() {
        function a(a) {
            this.init(a)
        }
        ClassTool.inherits(a, ClassObject);
        a.prototype.init = function(a) {
            this.time = 0;
            this.config = a
        }
        ;
        a.prototype.setUp = function(a, d) {
            var c = videoSdkTool.clone(this.config)
              , g = ["pic", "volume"];
            this.loop = !1;
            this.el = d;
            this.volume = a.volume;
            for (var e = 0; e < g.length; e++) {
                var f = g[e];
                !c.hasOwnProperty(f) && a.hasOwnProperty(f) && (c[f] = a[f])
            }
            this.creatPlayer(c, d)
        }
        ;
        a.prototype.creatPlayer = function(a, d) {
            this.player && (this.player.removeEventListener(MediaEvent.EVENT, this.MediaHanlder, this),
            this.player.destroy(),
            this.player = null);
            this.player = this.getPlayer(a);
            this.player.init();
            this.player.setUp(a, d)
        }
        ;
        a.prototype.setMedia = function(a) {}
        ;
        a.prototype.hide = function(a) {
            this.player.hide(a)
        }
        ;
        a.prototype.show = function() {
            this.player.show()
        }
        ;
        a.prototype.setConfig = function(a) {}
        ;
        a.prototype.setContainer = function(a) {
            null != a && this.player.setContainer(a)
        }
        ;
        a.prototype.getPlayer = function(a) {
            return new H5SamplePlayer
        }
        ;
        a.prototype.startPlay = function(a) {
            var d = {
                start: 0,
                play: !1,
                type: "",
                callback: null
            }, c;
            for (c in d)
                a.hasOwnProperty(c) || (a[c] = d[c]);
            this.destroy();
            this.setVol(this.volume);
            this.player.addEventListener(MediaEvent.EVENT, this.MediaHanlder, this);
            this.player.mduration = a.duration;
            this.player.play(a)
        }
        ;
        a.prototype.setSize = function() {
            this.player.setSize()
        }
        ;
        a.prototype.play = function(a) {
            this.player.resume(a)
        }
        ;
        a.prototype.setVol = function(a) {
            this.player.setVol(a);
            this.volume = a;
            this.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.VOL,a))
        }
        ;
        a.prototype.pause = function() {
            this.player.pause()
        }
        ;
        a.prototype.destroy = function() {
            this.closeVideo();
            this.loop = !1;
            this.player.setLoop(!1);
            this.player.destroy()
        }
        ;
        a.prototype.closeVideo = function() {
            this.player.removeEventListener(MediaEvent.EVENT, this.MediaHanlder, this);
            this.player.stop()
        }
        ;
        a.prototype.getTime = function() {
            return parseInt(this.player.getTime())
        }
        ;
        a.prototype.seek = function(a) {
            0 <= a && 0 >= a - this.player.duration && (this.player.seek(a),
            a < this.player.duration && this.player.resume())
        }
        ;
        a.prototype.getBufferPercent = function(a) {
            return 1
        }
        ;
        a.prototype.getLoadPercent = function(a) {
            return this.player.getLoadPercent()
        }
        ;
        a.prototype.setLoop = function(a) {
            this.loop = a;
            this.player.setLoop(a)
        }
        ;
        a.prototype.MediaHanlder = function(a) {
            switch (a.args[1]) {
            case MediaEvent.COMPLETE:
                if (this.loop) {
                    this.seek(0);
                    return
                }
            }
            this.dispatchEvent(a)
        }
        ;
        a.prototype.changeurl = function(a) {
            this.player.changeurl(a)
        }
        ;
        a.prototype.getVideoRect = function(a) {
            return this.player.getVideoRect(a)
        }
        ;
        a.prototype.replay = function() {
            this.player.seek(0);
            this.dispatchEvent(new Event(MediaEvent.EVENT,MediaEvent.REPLAY,this.getTime()))
        }
        ;
        a.prototype.getVideoEl = function() {
            return this.player.videoEL
        }
        ;
        a.prototype.setPoster = function(a) {
            return this.player.setPoster(a)
        }
        ;
        return a
    }();
    SOTool.shareObj("media.watermask", function() {
        function a(a) {
            this.init(a);
            this.model = a
        }
        ClassTool.inherits(a, ClassObject);
        a.prototype.init = function(a) {
            this.waterList = [];
            this.config = {
                chackTime: 6E4
            };
            this.model = a;
            this._index = 0
        }
        ;
        a.prototype.setUp = function(a) {
            this.setWaterData();
            var d = this.model.playerConfig.watermark;
            this.clear();
            this.player = a;
            this.el = a.getVideoEl().parentNode.parentNode;
            this.waterData = videoSdkTool.clone(d);
            this._index = 0;
            var c = this;
            if (this.waterData)
                for (a = 0; a < this.waterData.length; a++)
                    d = UiTool.$C("img"),
                    d.num = a,
                    this.waterData[a].hasOwnProperty("position") && this.waterData[a].hasOwnProperty("url") && (this.waterData[a].hasOwnProperty("x") || (this.waterData[a].x = 15),
                    this.waterData[a].hasOwnProperty("y") || (this.waterData[a].y = 15),
                    this.waterData[a].hasOwnProperty("width") || (this.waterData[a].width = 640),
                    this.waterData[a].hasOwnProperty("height") || (this.waterData[a].height = 360),
                    d.onload = function() {
                        var a = UiTool.$C("canvas");
                        c.waterData[this.num].img = this;
                        c._renderWater(a, c.waterData[this.num]);
                        c.waterList.push(a);
                        c.start()
                    }
                    ,
                    d.src = this.waterData[a].url)
        }
        ;
        a.prototype.isPano = function() {
            return this.model.config.hasOwnProperty("pano") && "1" == this.model.config.pano || "1" == this.model.videoSetting.pano ? !0 : !1
        }
        ;
        a.prototype.setWaterData = function() {
            this.isPano() ? (this.model.videoSetting.videoOrgHeight = this.model.playerConfig.pHeight,
            this.model.videoSetting.videoOrgWidth = this.model.playerConfig.pWidth) : this.model.videoSetting.videoWidth / this.model.videoSetting.videoHeight < this.model.playerConfig.pWidth / this.model.playerConfig.pHeight ? (this.model.videoSetting.videoOrgHeight = this.model.playerConfig.pHeight,
            this.model.videoSetting.videoOrgWidth = this.model.videoSetting.videoWidth * this.model.playerConfig.pHeight / this.model.videoSetting.videoHeight) : (this.model.videoSetting.videoOrgWidth = this.model.playerConfig.pWidth,
            this.model.videoSetting.videoOrgHeight = this.model.videoSetting.videoHeight * this.model.playerConfig.pWidth / this.model.videoSetting.videoWidth)
        }
        ;
        a.prototype.clear = function() {
            if (this.waterList) {
                for (var a = 0; a < this.waterList.length; a++)
                    this.waterList[a].parentNode == this.el && (this.el.removeChild(this.waterList[a]),
                    this.waterList[a] = null);
                this.waterList = []
            }
        }
        ;
        a.prototype.start = function() {
            function a() {
                _self = this;
                for (var b = 0; b < _self.waterList.length; b++)
                    _self.waterList[b].style.display = b != _self._index ? "none" : "";
                _self._index++;
                _self._index == _self.waterList.length && (_self._index = 0)
            }
            1 < this.waterList.length && (this.changeTimer = new Timer(this.config.chackTime,this,a),
            this.changeTimer.start());
            a.call(this)
        }
        ;
        a.prototype.setSize = function(a, d) {
            for (var c = 0; c < this.waterList.length; c++)
                this._renderWater(this.waterList[c], this.waterData[c])
        }
        ;
        a.prototype.destroy = function(a, d) {
            this.clear();
            this.waterData = null
        }
        ;
        a.prototype._renderWater = function(a, d) {
            var c = d.img
              , g = 1
              , g = this.model.playerConfig.pWidth / this.model.playerConfig.pHeight < d.width / d.height ? Math.min(1, this.model.playerConfig.pWidth / d.width) : Math.min(1, this.model.playerConfig.pHeight / d.height)
              , e = this.player.getVideoRect();
            if (e.hasMetadata) {
                if (this.isPano())
                    var f = 1
                      , h = 1;
                else
                    f = e.width / this.model.videoSetting.videoOrgWidth,
                    h = e.height / this.model.videoSetting.videoOrgHeight;
                g = a.fScale ? a.fScale : this.model.playerConfig.pWidth / this.model.playerConfig.pHeight < f * c.width / (h * c.height) ? Math.min(g, 0.5 * e.width / c.width) : Math.min(g, 0.5 * e.height / c.height);
                a.style.position = "absolute";
                switch (d.position + "") {
                case "1":
                    a.style.top = e.y + h * g * d.y + "px";
                    a.style.left = e.x + f * g * d.x + "px";
                    break;
                case "2":
                    a.style.top = e.y + h * g * d.y + "px";
                    a.style.right = 0.5 * (this.el.offsetWidth - e.width) + f * g * d.x + "px";
                    break;
                case "3":
                    a.style.bottom = 0.5 * (this.el.offsetHeight - e.height) + h * g * d.y + "px";
                    a.style.left = e.x + f * g * d.x + "px";
                    break;
                case "4":
                    a.style.bottom = 0.5 * (this.el.offsetHeight - e.height) + h * g * d.y + "px",
                    a.style.right = 0.5 * (this.el.offsetWidth - e.width) + f * g * d.x + "px"
                }
                a.fScale = g;
                a.width = f * g * c.width;
                a.height = h * g * c.height;
                a.getContext("2d").drawImage(c, 0, 0, c.width, c.height, 0, 0, a.width, a.height);
                this.el.appendChild(a)
            }
        }
        ;
        return a
    }());
    var PlayUrlProxy = function() {
        function a(a) {
            this.model = a
        }
        ClassTool.inherits(a, ClassObject);
        a.prototype.translate = function() {
            this.gslbLoader = new GslbProxy(this.model);
            this.model.videoSetting.gslb ? (this.gslbLoader.addEventListener(LoadEvent.LOADCMP, this.gslbCmp, this),
            this.gslbLoader.addEventListener(LoadEvent.LOADERROR, this.gslbErr, this),
            this.gslbLoader.load()) : this.dispatchEvent(new Event(LoadEvent.LOADCMP,this.leUrlsHandler()))
        }
        ;
        a.prototype.gslbCmp = function(a) {
            this.dispatchEvent(new Event(LoadEvent.LOADCMP,a.args[1]))
        }
        ;
        a.prototype.gslbErr = function(a) {
            this.dispatchEvent(new Event(LoadEvent.LOADCMP,this.leUrlsHandler()))
        }
        ;
        a.prototype.leUrlsHandler = function(a) {
            a = videoSdkTool.clone(this.model.videoSetting.urls);
            for (var d = 0; d < a.length; d++)
                a[d] = this.gslbLoader.checkGslbUrl(a[d]);
            return a
        }
        ;
        return a
    }()
      , ReportPlayer = function() {
        function a() {
            this.superClass.constructor.apply(this, arguments)
        }
        ClassTool.inherits(a, Control);
        a.prototype.init = function(a, d) {
            this.facade = a;
            this.model = d;
            this.model.record = {};
            this.reportApi = new Reporter(d);
            this.reportApi.onStateChanged("init", {
                deviceId: this.model.lc(),
                os: videoSdkTool.getOs(),
                osv: "-",
                width: window.screen.width,
                height: window.screen.height,
                appv: this.model.playerConfig.version
            })
        }
        ;
        a.prototype.setUp = function(a, d) {
            this.model.config.report && (this.model.videoSetting.errCode = 0,
            this.facade.addEventListener(PlayerEvent.EVENT, this.videoSateHandler, this))
        }
        ;
        a.prototype.destroy = function() {
            this.model.config.report && (this.superClass.destroy.apply(this, arguments),
            this.reportApi.reset(),
            this.facade.removeEventListener(PlayerEvent.EVENT, this.videoSateHandler, this))
        }
        ;
        a.prototype.videoSateHandler = function(a) {
            if (this.model.config.report)
                switch (a.args[1]) {
                case PlayerEvent.VIDEO_DATA_CMP:
                    0 != this.model.record.ms && (this.model.record.mr = videoSdkTool.now() - this.model.record.ms,
                    this.model.record.ms = 0);
                    this.reportApi.onStateChanged("start", {});
                    break;
                case MediaEvent.BUFFEREMPTY:
                    this.reportApi.onStateChanged("bufferEmpty");
                    break;
                case MediaEvent.BUFFEREFULL:
                    this.reportApi.onStateChanged("bufferFull");
                    break;
                case MediaEvent.PLAY:
                    this.reportApi.onStateChanged("resume");
                    break;
                case MediaEvent.START:
                    0 != this.model.record.vs && (this.model.record.pr = videoSdkTool.now() - this.model.record.vs,
                    this.model.record.vs = 0);
                    this.reportApi.onStateChanged("play", {
                        cv: {
                            stc: {
                                mr: this.model.record.mr,
                                adr: this.model.record.adr,
                                pr: this.model.record.pr,
                                gslbr: this.model.record.gslbr
                            },
                            joint: this.model.joint
                        }
                    });
                    break;
                case MediaEvent.STOP:
                    if (a.args[2])
                        this.reportApi.onStateChanged("playStop");
                    else
                        this.reportApi.onStateChanged("stopPlay");
                    break;
                case MediaEvent.PAUSE:
                    this.reportApi.onStateChanged("pause");
                    break;
                case MediaEvent.SEEK:
                    this.reportApi.onStateChanged("seek", {
                        time: a.args[2]
                    });
                    break;
                case PlayerEvent.VPH:
                    this.reportApi.onStateChanged("hide");
                    break;
                case PlayerEvent.VPS:
                    this.reportApi.onStateChanged("show");
                    break;
                case MediaEvent.DEFSTART:
                    this.reportApi.onStateChanged("definition");
                    break;
                case PlayerEvent.ERROR:
                case MediaEvent.ERROR:
                    a = a.args[2][0];
                    this.model.videoSetting.errCode = a.code;
                    this.reportApi.onStateChanged("error", {
                        errcode: a.code
                    });
                    this.report({
                        logcontent: a.errInfo || ""
                    });
                    break;
                case AdEvent.HEADEND:
                case AdEvent.NOAD:
                    0 != this.model.record.as && (this.model.record.adr = videoSdkTool.now() - this.model.record.as,
                    this.model.record.as = 0);
                    this.model.record.vs = videoSdkTool.now();
                    break;
                case PlayerEvent.VIDEO_DATA_START:
                    this.model.record.ms = videoSdkTool.now();
                    break;
                case PlayerEvent.GSLB_START:
                    this.model.record.gslbs = videoSdkTool.now();
                    break;
                case PlayerEvent.GSLB_CMP:
                    0 != this.model.record.gslbs && (this.model.record.gslbr = videoSdkTool.now() - this.model.record.gslbs,
                    this.model.record.gslbs = 0);
                    this.model.record.vs = videoSdkTool.now();
                    break;
                case PlayerEvent.VIDEO_LIVESTOP:
                    this.reportApi.onStateChanged("stopPlay")
                }
        }
        ;
        a.prototype.report = function(a) {
            var d = this.model.videoSetting.errCode;
            a && a.hasOwnProperty("code") && (d = a.code);
            var c = {
                ver: "1.0"
            };
            c.uuid = this.model.uuid();
            c.ec = d;
            c.p3 = "h5";
            c.cvid = "vod" == this.model.playType ? this.model.videoSetting.vid : this.model.videoSetting.sid;
            c.vtyp = this.model.playType;
            c.mtyp = "cloud";
            c.cuid = this.model.userData.userId;
            c.leid = this.model.lc();
            c.pver = this.model.playerConfig.version;
            c.type = 1;
            c.logcontent = "";
            for (var g in a)
                c[g] = a[g];
            ReportTool.report(DomainTool.getDomain("http://log.cdn.letvcloud.com/sdk/epl", this.model.config.lang), c)
        }
        ;
        a.prototype.showLog = function() {
            ReportTool.print(logTool.getLog(), this.model.lc())
        }
        ;
        a.prototype.getLog = function() {
            return logTool.getLog()
        }
        ;
        return a
    }()
      , AdCtrl = function() {
        function a() {
            this.up = this.isvip = 0;
            this.isTrylook = !1;
            this.pname = "";
            this.ark = this.gdur = 0
        }
        function b() {
            this.superClass.constructor.apply(this, arguments)
        }
        ClassTool.inherits(b, Control);
        b.prototype.setUp = function(a, b) {
            var g = this;
            g.player = a;
            g.videoOutEl = b;
            if (g.model.config.hasOwnProperty("onPlayerReady"))
                if ("function" != typeof g.model.config.onPlayerReady && (g.model.config.onPlayerReady = window[g.model.config.onPlayerReady]),
                "function" == typeof g.model.config.onPlayerReady)
                    try {
                        var e = setTimeout(function() {
                            g.startLeAd.call(g)
                        }, 5E3);
                        g.model.config.onPlayerReady({
                            video: g.player.player.video,
                            el: this.videoOutEl
                        }, function(a, b) {
                            switch (a) {
                            case "adstart":
                                clearTimeout(e);
                                break;
                            case "adend":
                                g.startLeAd.call(g)
                            }
                        })
                    } catch (f) {
                        g.startLeAd.call(g)
                    }
                else
                    g.startLeAd.call(g);
            else
                g.startLeAd.call(g)
        }
        ;
        b.prototype.startLeAd = function() {
            this.checkAd() ? this.model.videoSetting.hasOwnProperty("ark") ? "undefined" == typeof H5AD || "function" != typeof H5AD ? videoSdkTool.getJS(SOTool.PluginStack.Ad, this.initAd, this.initAd, this, "utf-8") : this.initAd() : this.model.videoSetting.hasOwnProperty("sspAd") && ("undefined" == typeof leH5AD || "function" != typeof leH5AD.initH5 ? videoSdkTool.getJS(SOTool.PluginStack.ssp, this.initAd, this.initAd, this, "utf-8") : this.initAd()) : this.facade.dispatchEvent(new Event(AdEvent.EVENT,AdEvent.NOAD,"skip"))
        }
        ;
        b.prototype.checkAd = function() {
            return this.model.config.hasOwnProperty("letvad") && "0" == this.model.config.letvad.toString() || this.model.videoSetting.hasOwnProperty("needbuy") && "1" == this.model.videoSetting.needbuy.toString() || this.model.videoSetting.hasOwnProperty("ark") && "0" == this.model.videoSetting.ark.toString() || !this.model.videoSetting.hasOwnProperty("ark") && !this.model.videoSetting.hasOwnProperty("sspAd") ? !1 : !0
        }
        ;
        b.prototype.initAd = function(b, c) {
            function g(a, b) {
                if (e.player)
                    switch (a) {
                    case "playAD":
                        e.adList = b;
                        e.adList && 0 == e.adList.length ? setTimeout(function() {
                            e.destroy();
                            e.facade.dispatchEvent(new Event(AdEvent.EVENT,AdEvent.NOAD))
                        }, 0) : (e.curAdIndex = 0,
                        e.playAD(),
                        e.facade.dispatchEvent(new Event(AdEvent.EVENT,AdEvent.HEADSTART)));
                        break;
                    case "stopAD":
                        setTimeout(function() {
                            e.destroy();
                            e.facade.dispatchEvent(new Event(AdEvent.EVENT,AdEvent.HEADEND))
                        }, 0);
                        break;
                    case "resumeAD":
                        e.videoPlay();
                        break;
                    case "pauseAD":
                        e.videoPause();
                        break;
                    case "getCurrTime":
                        return e.getTime() || 0;
                    case "getVideoRect":
                        return e.getVideoRect()
                    }
            }
            var e = this;
            if (e.model.videoSetting.hasOwnProperty("ark") && "undefined" != typeof H5AD && "function" == typeof H5AD)
                e.H5AD = new H5AD;
            else if ("undefined" != typeof leH5AD && "function" == typeof leH5AD.initH5) {
                var f = "_h5ad_" + Math.floor(Math.random() * +new Date);
                e.H5AD = leH5AD.initH5(e, f)
            } else {
                this.facade.dispatchEvent(new Event(AdEvent.EVENT,AdEvent.NOAD,"error"));
                return
            }
            "undefined" != typeof e.H5AD && "function" == typeof e.H5AD.initAD && (f = new a,
            f.p1 = this.model.reportParam.p1,
            f.p2 = this.model.reportParam.p2,
            f.p3 = this.model.reportParam.p2,
            f.lc = this.model.lc(),
            f.uuid = this.model.uuid(),
            f.ver = this.model.playerConfig.version,
            f.gdur = this.model.videoSetting.duration,
            f.cont = this.videoOutEl.id,
            "vod" == this.model.playType ? (f.islive = !1,
            f.cid = this.model.videoSetting.cid,
            f.vid = this.model.videoSetting.vid,
            f.mmsid = this.model.videoSetting.mmsid,
            this.model.videoSetting.hasOwnProperty("pid") && (f.pid = this.model.videoSetting.pid)) : "live" == this.model.playType && (f.islive = !0,
            f.sid = this.model.config.activityId),
            f.ch = this.model.getTypeFrom(),
            f.ark = this.model.videoSetting.ark,
            f.useui = 1,
            this.model.videoSetting.hasOwnProperty("p") && (f.ext = "" == this.model.userData.userId ? this.model.videoSetting.p : this.model.videoSetting.p + "|" + this.model.userData.userId),
            530 > this.videoOutEl.clientWidth && (f.pname = "MPlayer"),
            e.model.videoSetting.hasOwnProperty("sspAd") && (f.sspid = this.model.videoSetting.sspAd.sspId,
            f.slotid = this.model.videoSetting.sspAd.preSlotId,
            f.playid = this.model.uuid() + "_" + videoSdkTool.now(),
            f.playInline = 1),
            e.H5AD.initAD(f, g))
        }
        ;
        b.prototype.sspPause = function(a) {
            var b = this;
            b.adVideo = b.player.player.videoEL;
            b.adVideo.addEventListener("play", function() {
                b.H5AD.closePauseRender(b.H5AD)
            });
            b.adVideo.addEventListener("pause", function() {
                var g = {
                    onTime: Math.round(1E3 * b.adVideo.currentTime),
                    sspid: b.model.videoSetting.sspAd.sspId,
                    slotid: b.model.videoSetting.sspAd.pauseSlotId,
                    playid: b.model.uuid() + "_" + videoSdkTool.now(),
                    pauseID: a
                };
                b.H5AD.getPauseData(g)
            })
        }
        ;
        b.prototype.playAD = function() {
            if (this.curAdIndex < this.adList.length) {
                this.curAd = this.adList[this.curAdIndex];
                this.player.addEventListener(MediaEvent.EVENT, this.mediaHandler, this);
                this.facade.addEventListener(PlayerEvent.EVENT, this.playerHandler, this);
                var a = !0;
                0 == this.curAdIndex && -2 == this.model.config.posterType && (a = "1" == this.model.config.autoplay);
                this.player.startPlay({
                    urls: [this.curAd.url],
                    duration: 0,
                    start: 0,
                    play: a
                })
            } else
                this.destroy(),
                this.facade.dispatchEvent(new Event(AdEvent.EVENT,AdEvent.HEADEND))
        }
        ;
        b.prototype.mediaHandler = function(a) {
            switch (a.args[1]) {
            case MediaEvent.PLAY:
                this.H5AD.sendEvent("AD_PLAY", {
                    curAD: this.curAd,
                    curIndex: this.curAdIndex
                });
                break;
            case MediaEvent.PAUSE:
                this.H5AD.sendEvent("AD_PAUSE", {
                    curAD: this.curAd,
                    curIndex: this.curAdIndex
                });
                break;
            case MediaEvent.COMPLETE:
                this.H5AD.sendEvent("AD_ENDED", {
                    curAD: this.curAd,
                    curIndex: this.curAdIndex
                });
                this.curAdIndex++;
                this.playAD();
                break;
            case MediaEvent.ERROR:
                this.H5AD.sendEvent("AD_ERROR", {
                    curAD: this.curAd,
                    curIndex: this.curAdIndex
                }),
                this.curAdIndex++,
                this.H5AD.destory(this.curAd),
                this.playAD()
            }
        }
        ;
        b.prototype.playerHandler = function(a) {
            switch (a.args[1]) {
            case PlayerEvent.VPH:
                this.videoPause()
            }
        }
        ;
        b.prototype.videoPlay = function() {
            this.player && this.player.play()
        }
        ;
        b.prototype.getTime = function() {
            return this.player ? this.player.getTime() : 0
        }
        ;
        b.prototype.videoPause = function() {
            this.player && this.player.pause()
        }
        ;
        b.prototype.getVideoRect = function() {
            return this.player ? this.player.getVideoRect("wh") : {
                w: 0,
                h: 0
            }
        }
        ;
        b.prototype.destroy = function() {
            this.player && (!this.model.videoSetting.hasOwnProperty("ark") && this.model.videoSetting.hasOwnProperty("sspAd") && this.sspPause(this.videoOutEl.skin.id),
            this.player.removeEventListener(MediaEvent.EVENT, this.mediaHandler, this),
            this.facade.removeEventListener(PlayerEvent.EVENT, this.playerHandler, this),
            this.player.closeVideo(),
            this.player = null);
            try {
                this.H5AD && this.curAd && this.H5AD.destory(this.curAd)
            } catch (a) {
                this.log("ad error " + a)
            }
        }
        ;
        return b
    }()
      , SkinPlayer = function() {
        function a() {
            this.superClass.constructor.apply(this, arguments)
        }
        var b = {
            7: "//{domain}/player/plugin/skin/skin.js"
        };
        ClassTool.inherits(a, Control);
        a.prototype.setUp = function(a, b, g) {
            a = '<div id="#{video}" style="left:0px;top:0px;position: absolute;width:{width};height:{height};z-index:1;display: block;background-color: #000000;overflow:hidden"></div><div id="#{skin}" style="left:0px;top:0px;position: relative;width:{width};height:{height};z-index:2;overflow: hidden;"></div><div id="#{error}" style="left:0px;top:0px;position: absolute;width:{width};height:{height};z-index:3;overflow: hidden;display:none;"></div>'.replace(/{width}/g, "100%");
            a = a.replace(/{height}/g, "100%");
            this.el = UiTool.$E(b);
            this.outEl = UiTool.$E(g);
            this.setStylebyConfig(this.model.config);
            this.skin = new DisplayObject(this.el);
            UiTool.getTemplate(this.el, a);
            this.facade.addEventListener(PlayerEvent.EVENT, this.videoSateHandler, this)
        }
        ;
        a.prototype.load = function(a) {
            var b = this;
            SOTool.setPluginStack({
                name: "view.skin",
                url: b.getSkinUrl()
            });
            if (b.model.config.skinnable)
                SOTool.getPlugin("view.skin", function(a) {
                    if (a)
                        b.skinView = new a(b.facade,b.model),
                        b.skinView.addEventListener(SkinEvent.EVENT, b.skinHandler, b),
                        b.skinView.setUp(b.el.skin);
                    else
                        for (a = 0; a < b.el.childNodes.length; a++)
                            if (b.el.childNodes[a] == b.el.skin) {
                                b.el.removeChild(b.el.skin);
                                break
                            }
                    b.dispatchEvent(new Event(LoadEvent.LOADCMP))
                });
            else {
                for (a = 0; a < b.el.childNodes.length; a++)
                    if (b.el.childNodes[a] == b.el.skin) {
                        b.el.removeChild(b.el.skin);
                        break
                    }
                b.facade.removeEventListener(PlayerEvent.EVENT, b.videoSateHandler, b);
                b.dispatchEvent(new Event(LoadEvent.LOADCMP))
            }
        }
        ;
        a.prototype.getSkinUrl = function() {
            return this.model.config.hasOwnProperty("nskin") && b.hasOwnProperty(this.model.config.nskin) ? b[this.model.config.nskin] : "//{domain}/player/plugin/skin/oldskin.js"
        }
        ;
        a.prototype.setStylebyConfig = function(a) {
            var b = ["controls", "fullscreen"]
              , g = "vb" + videoSdkTool.creatUuid();
            this.el.className = g;
            for (var e = 0; e < b.length; e++)
                if (!a[b[e]])
                    if (a.pageControls)
                        SkinRender["setMedia" + b[e]]("", !1);
                    else
                        SkinRender["setMedia" + b[e]](g, !1)
        }
        ;
        a.prototype.getVideArea = function() {
            return this.el.skin.videoArea || null
        }
        ;
        a.prototype.autoSize = function() {
            var a = this.model.videoSetting.videoWidth
              , b = this.model.videoSetting.videoHeight;
            if (0 != a && 0 != b)
                switch (a /= b,
                this.model.config.autoSize + "") {
                case "1":
                    b = UiTool.$E(this.el).offsetWidth;
                    this.log("\u83b7\u5f97\u5bb9\u5668\u7684\u5bbd\u5ea6==============================" + b);
                    0 == b && (b = UiTool.$E(this.outEl).style.width,
                    b = -1 == b.indexOf("%") ? parseInt(b) : 0);
                    this.log("\u83b7\u5f97\u5bb9\u5668\u7684\u5bbd\u5ea6==============================" + b);
                    0 < b && (this.model.config.changeParent && (this.outEl.style.height = b / a + "px"),
                    this.el.style.height = b / a + "px");
                    break;
                case "2":
                    b = UiTool.$E(this.el).offsetHeight,
                    0 == b && (b = UiTool.$E(this.outEl).style.height,
                    b = -1 == b.indexOf("%") ? parseInt(b) : 0),
                    0 < b && (this.model.config.changeParent && (this.outEl.style.width = b * a + "px"),
                    this.el.style.width = b * a + "px")
                }
        }
        ;
        a.prototype.setSize = function() {
            this.display = 0 < this.el.offsetWidth && 0 < this.el.offsetHeight ? !0 : !1
        }
        ;
        a.prototype.addEvents = function() {}
        ;
        a.prototype.removeEvents = function() {}
        ;
        a.prototype.destroy = function() {
            this.shutDown();
            this.skinView && (this.facade.removeEventListener(PlayerEvent.EVENT, this.videoSateHandler, this),
            this.skinView.removeEventListener(SkinEvent.EVENT, this.skinHandler, this),
            this.skinView = null)
        }
        ;
        a.prototype.skinHandler = function(a) {
            this.facade.dispatchEvent(a)
        }
        ;
        a.prototype.shutDown = function() {
            this.skinView && this.skinView.shutDown()
        }
        ;
        a.prototype.videoSateHandler = function(a) {
            a.args[1] !== MediaEvent.LODING && a.args[1] != MediaEvent.PLAYING && this.log(a.args[1]);
            this.skinView && this.skinView.listNotification(a.args[1], a.args[2])
        }
        ;
        a.prototype.setVideoPercent = function(a) {}
        ;
        a.prototype.setVideoScale = function(a) {}
        ;
        a.prototype.setVideoRect = function(a) {}
        ;
        a.prototype.refreshPlayerInfo = function(a) {
            this.skinView && this.skinView.refreshPlayerInfo(a)
        }
        ;
        return a
    }()
      , VideoPlayer = function() {
        function a() {
            this.superClass.constructor.apply(this, arguments)
        }
        var b = SOTool.getObj("media.watermask");
        ClassTool.inherits(a, Control);
        a.prototype.setUp = function(a, c) {
            this.log("\u5f00\u59cb\u521b\u5efa\u89c6\u9891\u6a21\u5757");
            this.el = c;
            this.skin = new DisplayObject(c);
            this.mediaPlayer = new MediaPlayer(this.getConfig());
            this.water = new b(this.model);
            this.model.videoSetting.volume = 0.8;
            this.model.videoSetting.fullscreen = !1;
            this.setDefinitionList();
            this.getDefaultConfig(this.model.config);
            this.changeVideoInfo(this.definition);
            this.mediaPlayer.setUp(this.model.videoSetting, c);
            this.facade.color.setColor(this.skin, "bgColor");
            this.isComplete = !1;
            this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.INIT))
        }
        ;
        a.prototype.getConfig = function(a) {
            a = videoSdkTool.clone(this.model.config);
            switch (a.posterType) {
            case "-1":
            case "-2":
                break;
            default:
                a.autoplay = "1",
                a.pic = ""
            }
            return a
        }
        ;
        a.prototype.changeVideoInfo = function(a) {
            this.videoInfo = videoSdkTool.clone(this.model.videoSetting.media[a]);
            this.videoInfo.definitionName = this.videoInfo.definition;
            this.videoInfo.definition = a;
            this.videoInfo.duration = this.model.videoSetting.duration;
            a = {
                uuid: this.model.uuid(),
                p1: this.model.reportParam.p1,
                p2: this.model.reportParam.p2,
                p3: this.model.reportParam.p3
            };
            this.model.videoSetting.hasOwnProperty("liveId") && (a.liveid = this.model.videoSetting.liveId,
            this.videoInfo.lid = this.model.videoSetting.liveId);
            this.model.videoSetting.hasOwnProperty("vid") && (a.vid = this.model.videoSetting.vid);
            a.ajax = 1;
            videoSdkTool.addUrlParams(this.videoInfo.urls, a);
            this.model.videoSetting.refresh(this.videoInfo)
        }
        ;
        a.prototype.setDefinitionList = function() {
            var a = [], b = this.model, g;
            for (g in b.videoSetting.media)
                a.push(g);
            b.definition2TypeObj = {};
            GlobalHandler.initTypeDefObj(b.defaultDefinitionList, b.definition2TypeObj);
            a.sort(function(a, b) {
                return GlobalHandler.defList.indexOf(GlobalHandler.type2Def(a)) - GlobalHandler.defList.indexOf(GlobalHandler.type2Def(b))
            });
            b.videoSetting.refresh({
                definitionList: a
            })
        }
        ;
        a.prototype.getDefaultConfig = function(a) {
            this.definition = this.model.videoSetting.defaultDefinition || this.model.videoSetting.definitionList[0];
            a.hasOwnProperty("rate") && (a.rate = GlobalHandler.def2Type(a.rate, this.model.definition2TypeObj));
            a.hasOwnProperty("rate") && -1 != this.model.videoSetting.definitionList.indexOf(a.rate) && (this.definition = a.rate);
            this.startime = 0;
            a.hasOwnProperty("start") && (this.startime = a.start)
        }
        ;
        a.prototype.setSize = function(a, b, g) {
            this.mediaPlayer.setSize();
            this.water && this.water.setSize()
        }
        ;
        a.prototype.showPoster = function(a) {
            var b = this;
            b.hidePoster();
            b.poster = null;
            b.mediaPlayer.hide(!1);
            switch (this.model.config.posterType) {
            case "-2":
                break;
            case "-1":
                b.mediaPlayer.show();
                break;
            case "0":
                break;
            default:
                b.addPoster()
            }
            if (-2 == b.model.config.posterType)
                b.mediaPlayer.show(),
                b.mediaPlayer.setPoster(b.getPosterUrl()),
                b.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.VIDEO_AUTH_VALID));
            else if (this.model.config.skinnable || b.model.config.controls)
                "7" == this.model.config.nskin ? (b.playBtn = UiTool.$C("canvas"),
                b.playBtn.style.cssText = "position:absolute;width:80px;height:80px;left:50%;top:50%;z-index:2;cursor:pointer;margin-left:-40px;margin-top:-40px;",
                b.playBtn.width = 80,
                b.playBtn.height = 80,
                b.render()) : (b.playBtn = UiTool.$C("DIV"),
                b.playBtn.style.cssText = "position:absolute;width:75px;height:75px;left:50%;top:50%;background:rgba(1, 1, 1, 0) url(" + DomainTool.getDomain("//yuntv.letv.com/", b.model.config.lang) + "assets/img/skin.png?v=1901) no-repeat -111px -101px;margin: -40px 0 0 -38px;z-index:2;cursor:pointer;"),
                b.el.appendChild(b.playBtn),
                UiTool.addEvent(b.playBtn, "click", function(a) {
                    b.startAuth.call(b)
                })
        }
        ;
        a.prototype.render = function() {
            if (this.playBtn) {
                var a = this.playBtn.getContext("2d");
                a.beginPath();
                a.arc(40, 40, 37, 0, 2 * Math.PI, !0);
                a.closePath();
                a.fillStyle = UiTool.hexToRgba("#000000", 0.5);
                a.fill();
                a.lineWidth = 5;
                a.strokeStyle = this.facade.color.colorConfig.active;
                a.lineWidth = 1;
                a.strokeStyle = this.facade.color.colorConfig.fault;
                a.beginPath();
                a.moveTo(32, 25);
                a.lineTo(55, 40);
                a.lineTo(32, 55);
                a.closePath();
                a.stroke();
                a.fillStyle = UiTool.hexToRgba(this.facade.color.colorConfig.fault, 1);
                a.fill()
            }
        }
        ;
        a.prototype.addPoster = function(a) {
            this.poster ? (this.poster.style.display = "",
            this.el.appendChild(this.poster)) : (a = ["", "contain", "cover", "100% 100%"],
            this.poster = UiTool.$C("DIV"),
            this.poster.src = this.getPosterUrl(),
            this.poster.src && (this.poster.style.cssText = "position:absolute;width:100%;height:100%; top: 0px;left: 0px;background:rgba(1, 1, 1, 0) url(" + this.poster.src + ") no-repeat 50% 50%;background-size:" + a[this.model.config.posterType] + ";z-index:2;cursor:pointer;",
            this.el.appendChild(this.poster)))
        }
        ;
        a.prototype.hidePoster = function(a) {
            this.poster && this.el && this.poster.parentNode == this.el && (this.el.removeChild(this.poster),
            this.poster = null);
            this.playBtn && this.el && this.playBtn.parentNode == this.el && (this.el.removeChild(this.playBtn),
            this.playBtn = null)
        }
        ;
        a.prototype.startAuth = function(a) {
            var b = this;
            b.hidePoster();
            b.model.config.onlyPic ? b.mediaPlayer.hide() : b.mediaPlayer.show();
            0 > b.model.config.posterType + 0 ? b.mediaPlayer.setPoster(b.getPosterUrl()) : b.mediaPlayer.setPoster("");
            b.mediaPlayer.play(function() {
                b.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.VIDEO_AUTH_VALID))
            })
        }
        ;
        a.prototype.startPlay = function(a) {
            this.log("\u5f00\u59cb\u5c1d\u8bd5\u64ad\u653e");
            this.isStartPlay = !1;
            this.setDefinitionList();
            this.getDefaultConfig(this.model.config);
            this.mediaPlayer.addEventListener(MediaEvent.EVENT, this.mediaHandler, this);
            this.facade.addEventListener(SkinEvent.EVENT, this.skinSateHandler, this);
            this.facade.addEventListener(PlayerEvent.EVENT, this.videoSateHandler, this);
            this.mediaPlayer.setContainer(a);
            this.mediaPlayer.setLoop(this.model.config.loop);
            this.playVideo(this.start);
            this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,MediaEvent.CONNECT))
        }
        ;
        a.prototype.startGslb = function(a) {
            this.gslbplayTime = a;
            this.gslbLoader = new PlayUrlProxy(this.model);
            this.gslbLoader.addEventListener(LoadEvent.LOADCMP, this.gslbCmp, this);
            this.gslbLoader.addEventListener(LoadEvent.LOADERROR, this.gslbErr, this);
            this.gslbLoader.translate();
            this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.GSLB_START))
        }
        ;
        a.prototype.gslbCmp = function(a) {
            this.videoInfo.urls = a.args[1];
            this.model.config.onlyPic ? (this.mediaPlayer.show(),
            setTimeout(videoSdkTool.bindFun(this.play, this), 10)) : this.play()
        }
        ;
        a.prototype.play = function() {
            var a = this
              , b = !0;
            0 != a.model.joint || a.isStartPlay || -2 != a.model.config.posterType || (b = "1" == a.model.config.autoplay);
            var g = a.mediaPlayer.player.videoEL.canPlayType && "" == a.mediaPlayer.player.videoEL.canPlayType("application/x-mpegURL")
              , e = a.model.videoSetting.hasOwnProperty("playTypes") && a.model.videoSetting.playTypes.match(/3/) && "1" == a.model.videoSetting.playTypes.charAt(0);
            a.mediaPlayer.startPlay({
                urls: a.videoInfo.urls,
                duration: a.videoInfo.duration,
                start: a.gslbplayTime,
                play: b,
                type: a.getPlayerType(),
                useHls: "live" == a.model.playType && g && ("pc" == videoSdkTool.getDevice() || "mac" == videoSdkTool.getDevice()),
                useFlv: "live" == a.model.playType && e && "flv" == a.model.livePlayType && ("pc" == videoSdkTool.getDevice() || "mac" == videoSdkTool.getDevice()),
                callback: function() {
                    a.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.GSLB_CMP))
                }
            });
            a.mediaPlayer.setLoop(this.model.config.loop)
        }
        ;
        a.prototype.gslbErr = function(a) {
            this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.ERROR,a.args[2]))
        }
        ;
        a.prototype.setAutoReplay = function(a) {
            this.mediaPlayer.setLoop(a)
        }
        ;
        a.prototype.setDefinition = function(a) {
            this.definition != a && -1 != this.model.videoSetting.definitionList.indexOf(a) && (this.log("\u5207\u6362\u7801\u6d41-----------------------------" + a),
            this.definition = a,
            this.isStartPlay = !1,
            a = 0,
            "vod" == this.model.playType && (a = this.mediaPlayer.getTime()),
            this.playVideo(a),
            this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,MediaEvent.DEFSTART)))
        }
        ;
        a.prototype.playVideo = function(a) {
            "pano" != this.getPlayerType() || videoSdkTool.checkPano() ? (this.changeVideoInfo(this.definition),
            this.mediaPlayer.getVideoEl() && this.mediaPlayer.getVideoEl().setAttribute("data-rate", GlobalHandler.type2Def(this.model.videoSetting.definition)),
            this.startGslb(a)) : this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.VIDEO_INFO,[{
                code: 490,
                message: "\u8be5\u8bbe\u5907\u8fd8\u4e0d\u652f\u63013d\u529f\u80fd,\u5efa\u8bae\u4f7f\u7528windows\u548c\u5b89\u5353\u7cfb\u7edf\u4e0b\u7684\u8c37\u6b4c\u6d4f\u89c8\u5668\u4f53\u9a8c\u8be5\u529f\u80fd"
            }]))
        }
        ;
        a.prototype.getDefinitionList = function() {
            return this.model.videoSetting.definitionList
        }
        ;
        a.prototype.videoSateHandler = function(a) {
            switch (a.args[1]) {
            case PlayerEvent.VPH:
                this.isStartPlay && this.mediaPlayer.pause();
                break;
            case MediaEvent.START:
                this.isStartPlay = !0;
                this.mediaPlayer.show();
                this.model.config.onlyPic && this.addPoster();
                this.water.setUp(this.mediaPlayer);
                break;
            case MediaEvent.STOP:
                this.isStartPlay = !1;
                break;
            case PlayerEvent.ERROR:
            case MediaEvent.ERROR:
                this.isStartPlay = !1;
            case PlayerEvent.VIDEO_INFO:
                this.model.config.skinnable && this.mediaPlayer.hide(!1);
                break;
            case PlayerEvent.FULLSCREEN:
                this.model.config.onlyPic && !this.model.videoSetting.fullscreen && this.mediaPlayer.hide();
                break;
            case PlayerEvent.PRESIZE:
                this.setSize();
                break;
            case MediaEvent.METADATA:
                this.setSize()
            }
        }
        ;
        a.prototype.skinSateHandler = function(a) {
            switch (a.args[1]) {
            case SkinEvent.PLAY:
                if (this.model.config.onlyPic) {
                    var b = this;
                    b.mediaPlayer.show();
                    setTimeout(function() {
                        b.mediaPlayer.play()
                    }, 10)
                } else
                    this.mediaPlayer.play();
                break;
            case SkinEvent.PAUSE:
                this.mediaPlayer.pause();
                break;
            case SkinEvent.SEEK:
                this.mediaPlayer.seek(a.args[2]);
                break;
            case SkinEvent.VOLUME:
                this.model.videoSetting.volume = a.args[2];
                this.mediaPlayer.setVol(this.model.videoSetting.volume);
                break;
            case SkinEvent.SETDEFINITION:
                this.setDefinition(a.args[2]);
                break;
            case SkinEvent.REPLAY:
                this.mediaPlayer.replay();
                break;
            case SkinEvent.POINT:
                this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.POINT,a.args[2]));
                break;
            case SkinEvent.DELPOINT:
                this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.DELPOINT,a.args[2]))
            }
        }
        ;
        a.prototype.getPlayerType = function() {
            return this.model.config.hasOwnProperty("pano") && "1" == this.model.config.pano || "1" == this.model.videoSetting.pano ? "pano" : ""
        }
        ;
        a.prototype.mediaHandler = function(a) {
            switch (a.args[1]) {
            case MediaEvent.ERROR:
                if ("vod" == this.model.playType && this.model.vodPlayType && "ios" == this.model.vodPlayType && a.args[2][0].retryCdn) {
                    this.model.vodPlayType = "mp4";
                    videoSdkTool.setLocal("playType", this.model.vodPlayType);
                    this.log("\u91cd\u65b0\u8c03\u5ea6");
                    this.startGslb(0);
                    return
                }
                break;
            case MediaEvent.PLAYING:
                if (1 == this.model.videoSetting.needbuy && Math.floor(a.args[2]) > this.model.videoSetting.tryLookTime) {
                    this.mediaPlayer.pause();
                    this.destroy();
                    return
                }
                break;
            case MediaEvent.COMPLETE:
                this.isComplete = !0;
                if (this.model.config.hasOwnProperty("callbackJs")) {
                    var b = a.args[1]
                      , g = a.args[2];
                    WIN[this.model.config.callbackJs] && (a.args[2] = WIN[this.model.config.callbackJs](b, g))
                }
                a.args[2] && a.args[2].hasOwnProperty("nextvid") && "" != a.args[2].nextvid ? this.facade.dispatchEvent(new Event(PlayerEvent.NEXT,a.args[1],a.args[2])) : this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,MediaEvent.STOP,!0))
            }
            this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,a.args[1],a.args[2]))
        }
        ;
        a.prototype.getPosterUrl = function(a) {
            return this.model.config.hasOwnProperty("pic") ? this.model.config.pic : this.model.videoSetting.hasOwnProperty("pic") ? this.model.videoSetting.pic : ""
        }
        ;
        a.prototype.destroy = function(a) {
            this.facade.removeEventListener(SkinEvent.EVENT, this.skinSateHandler, this);
            this.facade.removeEventListener(PlayerEvent.EVENT, this.videoSateHandler, this);
            this.mediaPlayer.removeEventListener(MediaEvent.EVENT, this.mediaHandler, this);
            this.mediaPlayer.destroy();
            this.water && this.water.destroy();
            this.isComplete || this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,MediaEvent.STOP,!1))
        }
        ;
        a.prototype.refreshPlayerInfo = function(a) {
            "7" == this.model.config.nskin && this.render();
            this.water.setUp(this.mediaPlayer)
        }
        ;
        return a
    }()
      , GlobalPlayer = function() {
        function a() {
            this.superClass.constructor.apply(this, arguments)
        }
        ClassTool.inherits(a, Control);
        a.prototype.setUp = function(a) {
            this.player = a;
            this.addEvents()
        }
        ;
        a.prototype.addEvents = function() {
            var a = this;
            a.addVideoEvent = !1;
            a.facade.addEventListener(SkinEvent.EVENT, a.skinSateHandler, a);
            a.facade.addEventListener(PlayerEvent.EVENT, a.videoSateHandler, a);
            a.fullChangeFun = videoSdkTool.bindFun(a.fullChange, a);
            a.resizeFun = videoSdkTool.bindFun(a.resize, a);
            UiTool.addEvent(document, "fullscreenchange,webkitfullscreenchange,mozfullscreenchange,MSFullscreenChange", a.fullChangeFun);
            UiTool.addEvent(window, "resize", this.resizeFun);
            UiTool.addEvent(window, "pagehide", videoSdkTool.bindFun(this.pageHide, this));
            var d;
            ["webkit", "moz", "o", "ms"].forEach(function(a) {
                "undefined" != typeof document[a + "Hidden"] && (d = a)
            });
            UiTool.addEvent(document, d + "visibilitychange", function() {
                "hidden" == document[d + "VisibilityState"] ? a.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.VPH)) : "visible" == document[d + "VisibilityState"] && a.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.VPS))
            })
        }
        ;
        a.prototype.videoSateHandler = function(a) {
            switch (a.args[1]) {
            case PlayerEvent.INIT:
                this.addVideoEvents()
            }
        }
        ;
        a.prototype.pageHide = function(a) {
            this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.WPH))
        }
        ;
        a.prototype.fullChange = function() {
            this.model.videoSetting && (this.model.videoSetting.fullscreen = UiTool.isFullScreen(),
            this.model.videoSetting.fullscreen || (this.cancelFullscreen(),
            this.resizeFun()),
            this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.FULLSCREEN,this.model.videoSetting.fullscreen)))
        }
        ;
        a.prototype.resize = function() {
            this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.PRESIZE))
        }
        ;
        a.prototype.cancelFullscreen = function() {
            var a = this.player.skinplugin.skin;
            a.hasAttribute("tmpStyle") && (a.setStyle({
                cssText: a.getAttribute("tmpStyle")
            }),
            a.removeAttribute("tmpStyle"));
            this.bodyTmpOverFlow && (document.body.style.overflow = this.bodyTmpOverFlow)
        }
        ;
        a.prototype.addVideoEvents = function(a) {
            a = this.player.videoplugin.mediaPlayer.getVideoEl();
            var d = this;
            d.addVideoEvent || (a.addEventListener("webkitbeginfullscreen", function() {
                d.model.videoSetting.fullscreen = !0;
                d.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.FULLSCREEN,d.model.videoSetting.fullscreen))
            }),
            a.addEventListener("webkitendfullscreen", function() {
                d.model.videoSetting.fullscreen = !1;
                d.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.FULLSCREEN,d.model.videoSetting.fullscreen));
                d.resizeFun()
            }),
            d.addVideoEvent = !0)
        }
        ;
        a.prototype.skinSateHandler = function(a) {
            switch (a.args[1]) {
            case SkinEvent.FULLSCREEN:
                a = this.player.videoplugin.mediaPlayer.getVideoEl();
                if (this.model.config.dfull && a && a.webkitEnterFullscreen && "chrome" != videoSdkTool.getBrowser()) {
                    a.webkitEnterFullscreen();
                    break
                }
                this.model.videoSetting.fullscreen ? (this.model.videoSetting.fullscreen = !1,
                this.cancelFullscreen(),
                UiTool.supportFullScreen() && this.model.config.dfull && UiTool.cancelFullScreen()) : (this.model.videoSetting.fullscreen = !0,
                this.player.skinplugin.skin.setAttribute({
                    tmpStyle: this.player.skinplugin.el.style.cssText
                }),
                UiTool.supportFullScreen() && this.model.config.dfull ? UiTool.fullScreen(this.player.skinplugin.el) : (this.bodyTmpOverFlow = document.body.style.overflow,
                document.body.style.overflow = "hidden"),
                this.player.skinplugin.skin.setStyle({
                    cssText: "background: #000;width:100%;height:100%;position:fixed;top:0;left:0;z-index:1000;overflow:hidden;"
                }));
                this.resizeFun()
            }
        }
        ;
        return a
    }()
      , ErrorPlayer = function() {
        function a() {
            this.superClass.constructor.apply(this, arguments)
        }
        ClassTool.inherits(a, Control);
        a.prototype.setUp = function(a, d, c) {
            this.el = d;
            this._api = c;
            this.skin = new DisplayObject(this.el);
            this.playingStop = !1;
            this.error = null;
            this.facade.addEventListener(PlayerEvent.EVENT, this.videoSateHandler, this)
        }
        ;
        a.prototype.videoSateHandler = function(a) {
            switch (a.args[1]) {
            case MediaEvent.START:
            case MediaEvent.BUFFEREFULL:
                this.skin.setVisible(!1);
                break;
            case MediaEvent.ERROR:
            case PlayerEvent.ERROR:
            case PlayerEvent.VIDEO_INFO:
                this.skin.setVisible(!0);
                if (!this.model.config.skinnable || !this.model.config.showError)
                    break;
                this.show(a.args[2]);
                break;
            case MediaEvent.STOP:
                this.playingStop = !0;
                this.skin.setVisible(!1);
                break;
            case MediaEvent.PLAYING:
                this.playingStop && this.skin.setVisible(!1);
                this.playingStop = !1;
                break;
            case PlayerEvent.VIDEO_LIVESTOP:
                this.playingStop = !0
            }
        }
        ;
        a.prototype.show = function(a) {
            var d = this;
            d.error ? d.error.show(a, d.el, {
                api: d._api,
                model: d.model
            }) : SOTool.getPlugin("ErrorInfo", function(c) {
                c && (d.error = new c,
                d.error.show(a, d.el, {
                    api: d._api,
                    model: d.model
                }))
            })
        }
        ;
        a.prototype.report = function() {}
        ;
        return a
    }()
      , Api = function() {
        function a(a, d, c) {
            "undefined" != typeof c.api[a] && (d[a] = function() {
                return c.api[a].apply(c.api, arguments)
            }
            )
        }
        return function(b) {
            for (var d = 0; d < ApiList.length; d++)
                a(ApiList[d], this, b)
        }
    }()
      , FlashSdk = function() {
        function a(a, d, c) {
            d[a] = function() {
                return c[a].apply(c, arguments)
            }
        }
        return function(b) {
            for (var d = 0; d < ApiList.length; d++)
                a(ApiList[d], this, b.plugin);
            this.playNewId = function(a) {
                return b.plugin.setLejuData(a)
            }
            ;
            this.getDefinitionList = function() {
                return b.plugin.getDefinitionList()
            }
            ;
            this.callFlash = function(a) {
                return b.plugin[b.action](a.value)
            }
        }
    }()
      , H5Sdk = function() {
        function a(a) {
            this._pl = a
        }
        a.prototype.playNewId = function(a) {
            return this._pl.playNewId(a)
        }
        ;
        a.prototype.getVideoSetting = function() {
            for (var a = videoSdkTool.clone(this._pl.model.videoSetting), d = {}, c = 0; c < GlobalHandler.settingList().length; c++) {
                var g = GlobalHandler.settingList()[c];
                a.hasOwnProperty(g) ? d[g] = "definition" == g ? this.getDefinition() : "defaultDefinition" == g ? this.getDefaultDefinition() : a[g] : d[g] = ""
            }
            return d
        }
        ;
        a.prototype.getVideoTime = function() {
            return this._pl.videoplugin ? this._pl.videoplugin.mediaPlayer.getTime() : 0
        }
        ;
        a.prototype.pauseVideo = function() {
            this._pl.facade.dispatchEvent(new Event(SkinEvent.EVENT,SkinEvent.PAUSE))
        }
        ;
        a.prototype.resumeVideo = function() {
            this._pl.facade.dispatchEvent(new Event(SkinEvent.EVENT,SkinEvent.PLAY))
        }
        ;
        a.prototype.seekTo = function(a) {
            this._pl.facade.dispatchEvent(new Event(SkinEvent.EVENT,SkinEvent.SEEK,a))
        }
        ;
        a.prototype.setPoint = function(a) {
            this._pl.facade.dispatchEvent(new Event(SkinEvent.EVENT,SkinEvent.POINT,a))
        }
        ;
        a.prototype.removePoint = function(a) {
            this._pl.facade.dispatchEvent(new Event(SkinEvent.EVENT,SkinEvent.DELPOINT,a))
        }
        ;
        a.prototype.replayVideo = function() {
            this._pl.facade.dispatchEvent(new Event(SkinEvent.EVENT,SkinEvent.REPLAY))
        }
        ;
        a.prototype.closeVideo = function() {
            this._pl.closeVideo()
        }
        ;
        a.prototype.setVolume = function(a) {
            this._pl.facade.dispatchEvent(new Event(SkinEvent.EVENT,SkinEvent.VOLUME,a))
        }
        ;
        a.prototype.shutDown = function() {
            this._pl.shutDown()
        }
        ;
        a.prototype.startUp = function() {
            this._pl.startUp()
        }
        ;
        a.prototype.getBufferPercent = function() {
            return this._pl.videoplugin ? this._pl.videoplugin.mediaPlayer.getBufferPercent() : 0
        }
        ;
        a.prototype.setDefinition = function(a) {
            a = GlobalHandler.def2Type(a, this._pl.model.definition2TypeObj);
            this._pl.facade.dispatchEvent(new Event(SkinEvent.EVENT,SkinEvent.SETDEFINITION,a))
        }
        ;
        a.prototype.getDefinition = function() {
            return GlobalHandler.type2Def(this._pl.model.videoSetting.definition)
        }
        ;
        a.prototype.getDefaultDefinition = function() {
            return GlobalHandler.type2Def(this._pl.model.videoSetting.defaultDefinition)
        }
        ;
        a.prototype.getDefList = function() {
            for (var a = [], d = 0; d < this._pl.model.defaultDefinitionList.length; d++) {
                var c = GlobalHandler.type2Def(this._pl.model.defaultDefinitionList[d]);
                a.push(c)
            }
            return a
        }
        ;
        a.prototype.getDefinitionList = function() {
            for (var a = [], d = 0; d < this._pl.model.videoSetting.definitionList.length; d++) {
                var c = GlobalHandler.type2Def(this._pl.model.videoSetting.definitionList[d]);
                a.push(c)
            }
            return a
        }
        ;
        a.prototype.setVideoPercent = function(a) {
            this._pl.skinplugin.setVideoPercent(a)
        }
        ;
        a.prototype.getVideoPercent = function() {}
        ;
        a.prototype.setVideoScale = function(a) {
            this._pl.skinplugin.setVideoScale(a);
            return 0
        }
        ;
        a.prototype.getVideoScale = function() {
            return 0
        }
        ;
        a.prototype.resetVideoScale = function() {
            this._pl.skinplugin.setVideoScale(0);
            return 0
        }
        ;
        a.prototype.fullVideoScale = function() {
            this._pl.skinplugin.setVideoScale(1)
        }
        ;
        a.prototype.setVideoRect = function(a) {
            this._pl.skinplugin.setVideoScale(a)
        }
        ;
        a.prototype.getLoadPercent = function() {
            if (this._pl.videoplugin)
                return this._pl.videoplugin.mediaPlayer.getLoadPercent()
        }
        ;
        a.prototype.getDownloadSpeed = function() {
            return 0
        }
        ;
        a.prototype.getPlayRecord = function() {
            if (this._pl.videoplugin)
                return this._pl.videoplugin.getPlayRecord()
        }
        ;
        a.prototype.getPlayState = function() {
            if (this._pl.videoplugin)
                return this._pl.videoplugin.getPlayState()
        }
        ;
        a.prototype.setVideoColor = function() {
            return -1
        }
        ;
        a.prototype.getVideoColor = function() {
            return -1
        }
        ;
        a.prototype.getVersion = function() {
            return this._pl.version
        }
        ;
        a.prototype.setAutoReplay = function(a) {
            return this._pl.videoplugin.setAutoReplay(a)
        }
        ;
        a.prototype.feedback = function(a) {
            return this._pl.feedback(a)
        }
        ;
        a.prototype.getLog = function(a) {
            return this._pl.getLog(a)
        }
        ;
        a.prototype.getServerTime = function(a) {}
        ;
        a.prototype.setPlayerInfo = function(a) {
            this._pl.setPlayerInfo(a)
        }
        ;
        a.prototype.setHorseRaceLampInfo = function(a) {}
        ;
        return a
    }()
      , PlayerConf = {
        configConver: function(a, b) {
            var d = {
                lang: ["zh_CN", "en_US"]
            }
              , c = {
                report: !0,
                dfull: !0,
                fullscreen: !0,
                skinnable: !0,
                controls: !1,
                loop: !1,
                definition: !0,
                autoSize: "0",
                changeParent: !1,
                posterType: "1",
                playsinline: "1",
                autoplay: "0",
                onlyPic: !1,
                playIngBg: !1,
                dvideoSize: !0,
                mustAutoplay: !1,
                next: !1,
                setBtn: !1,
                seek: !0,
                share: !1,
                controlBarVisible: !0,
                bigPlayBtnVisible: !0,
                lang: "zh_CN",
                pageControls: !1,
                endToLiveback: !1,
                x5Type: "x5",
                showError: !0
            };
            a.setBtn = !1;
            a.share = !1;
            a.hasOwnProperty("pa") && (a.pano = a.pa,
            delete a.pa);
            a.hasOwnProperty("auto_play") && (a.autoplay = a.auto_play,
            delete a.auto_play);
            a.hasOwnProperty("autoReplay") && (a.loop = "1" == a.autoReplay,
            delete a.autoReplay);
            a.hasOwnProperty("url") && (a.report = !1,
            a.nskin = 7,
            a.definition = !1);
            0 > parseInt(a.posterType) && !a.hasOwnProperty("controls") && !a.hasOwnProperty("skinnable") && (a.controls = "1",
            a.skinnable = "0");
            b.skinnable = 1;
            b.controls = 1;
            for (var g in a) {
                if (d.hasOwnProperty(g)) {
                    for (var e = 0; e < d[g].length && g != d[g][e]; e++)
                        ;
                    e == d[g].length && (a[g] = d[g][0])
                }
                b[g] = a[g]
            }
            for (g in c)
                a.hasOwnProperty(g) ? "boolean" == typeof c[g] && (a[g] = "1" == a[g]) : a[g] = c[g];
            if (1 < parseInt(a.autoplay) || 0 > parseInt(a.autoplay))
                a.autoplay = "0";
            if (3 < parseInt(a.posterType) || -2 > parseInt(a.posterType))
                a.posterType = "1";
            a.autoplay += "";
            a.posterType += "";
            a.onlyPic = !1;
            a.playIngBg = !0;
            switch (videoSdkTool.getDevice()) {
            case "androidPhone":
            case "androidPad":
            case "android":
                switch (videoSdkTool.getBrowser()) {
                case "uc":
                    a.skinnable = !1;
                    a.controls = !0;
                    break;
                default:
                    a.mustAutoplay || (a.autoplay = "0")
                }
                a.soundVisible = !1;
                b.soundVisible = !1;
                break;
            case "iphone":
                switch (videoSdkTool.getBrowser()) {
                case "uc":
                    a.dfull = !1;
                    break;
                case "qq":
                    a.onlyPic = !0;
                    break;
                default:
                    d = navigator.userAgent.toLowerCase();
                    c = [/cpu iphone os 8_/];
                    for (e = 0; e < c.length; e++)
                        if (c[e].test(d)) {
                            a.dvideoSize = !1;
                            break
                        }
                    if (0 <= parseInt(a.posterType) && (c = [/cpu iphone os 6_/],
                    a.skinnable))
                        for (e = 0; e < c.length; e++)
                            if (c[e].test(d)) {
                                a.onlyPic = !0;
                                break
                            }
                }
                a.soundVisible = !1;
                b.soundVisible = !1;
            case "ipad":
                switch (videoSdkTool.getBrowser()) {
                case "qqwebview":
                    d = navigator.userAgent.toLowerCase();
                    /cpu iphone os 8_/.test(d) && !a.mustAutoplay && (a.autoplay = "0");
                    break;
                default:
                    a.mustAutoplay || (a.autoplay = "0")
                }
                break;
            case "pc":
                a.playIngBg = !1
            }
        }
    }
      , BaseH5Player = function() {
        function a() {
            this.init()
        }
        ClassTool.inherits(a, ClassObject);
        a.prototype.init = function() {
            this.api = new H5Sdk(this)
        }
        ;
        a.prototype.setUp = function(a, d, c) {
            this.vModelInit = this.canplay = !1;
            this.model = new Model;
            this.setModelByEnv();
            this.model.api = this.getVideoApi();
            this.model.outConfig = {};
            this.configHanlder(a, this.model.outConfig);
            this.model.config.refresh(a);
            this.model.playerConfig.refresh({
                version: this.version
            });
            this.initPlugin();
            this.facade = new Facade;
            this.facade.init(this.model.config);
            this.reportplugin = new ReportPlayer(this.facade,this.model);
            this.reportplugin.setUp();
            this.globalplugin = new GlobalPlayer(this.facade,this.model);
            this.globalplugin.setUp(this);
            this.skinplugin = new SkinPlayer(this.facade,this.model);
            this.skinplugin.setUp(a, d, c);
            this.errorplugin = new ErrorPlayer(this.facade,this.model);
            this.errorplugin.setUp(this, this.skinplugin.el.error, this.api);
            this.addEvents();
            this.envCheck() && this.startGetData()
        }
        ;
        a.prototype.initPlugin = function() {}
        ;
        a.prototype.envCheck = function() {
            return "1" == this.model.config.pano ? this.checkPano() : !0
        }
        ;
        a.prototype.checkPano = function() {
            if (videoSdkTool.checkPano())
                return !0;
            this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.VIDEO_INFO,[{
                code: ERR.NOSupport,
                message: Message.NoSupportPano
            }]));
            return !1
        }
        ;
        a.prototype.setModelByEnv = function() {
            switch (videoSdkTool.getDevice()) {
            case "pc":
            case "mac":
                this.model.systemData.refresh({
                    pc: !0
                });
                break;
            default:
                this.model.systemData.refresh({
                    pc: !1
                })
            }
        }
        ;
        a.prototype.configHanlder = function(a, d) {
            PlayerConf.configConver(a, d);
            a.hasOwnProperty("p") && (this.model.videoSetting.p = a.p)
        }
        ;
        a.prototype.addEvents = function() {
            this.facade.addEventListener(SkinEvent.EVENT, this.skinHandler, this);
            this.facade.addEventListener(PlayerEvent.EVENT, this.videoHandler, this);
            this.facade.addEventListener(PlayerEvent.NEXT, this.nextHandler, this)
        }
        ;
        a.prototype.removedEvents = function() {
            this.facade.removeEventListener(SkinEvent.EVENT, this.skinHandler, this);
            this.facade.removeEventListener(PlayerEvent.EVENT, this.videoHandler, this);
            this.facade.removeEventListener(PlayerEvent.NEXT, this.nextHandler, this)
        }
        ;
        a.prototype.startGetData = function() {
            this.log("\u5f00\u59cb\u8bf7\u6c42\u6570\u636e");
            this.vModel = new ModelHandler(this.model);
            this.vModel.addEventListener(LoadEvent.LOADCMP, this.dataCmp, this);
            this.vModel.addEventListener(LoadEvent.LOADERROR, this.errorHanlder, this);
            this.vModel.setUp(this.model.config, this.skinplugin);
            this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.VIDEO_DATA_START))
        }
        ;
        a.prototype.dataCmp = function() {
            this.log("\u8bf7\u6c42GpC\u6210\u529f");
            "0" == this.model.videoSetting.isdrm ? (this.setupPlayer(),
            this.vModelInit = !0,
            this.skinplugin.addEventListener(LoadEvent.LOADCMP, this.skinCmp, this),
            this.facade.color.register(this.model.config),
            this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.VIDEO_DATA_CMP)),
            this.skinplugin.load()) : this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.ERROR,[{
                code: ERR.VOD_CONFIG_DRM,
                message: Message.Drm
            }]))
        }
        ;
        a.prototype.skinCmp = function() {
            "0" == this.model.config.autoplay ? this.videoplugin.showPoster() : this.videoplugin.startAuth()
        }
        ;
        a.prototype.setupPlayer = function() {
            this.log("\u5f00\u59cb\u521b\u5efa\u64ad\u653e\u5668");
            this.videoplugin || (this.videoplugin = new VideoPlayer(this.facade,this.model),
            this.videoplugin.setUp(this.model.videoSetting, this.skinplugin.el.video))
        }
        ;
        a.prototype.creatVideo = function() {
            this.log("\u5f00\u59cb\u521b\u5efa\u89c6\u9891");
            this.videoplugin.startPlay(this.skinplugin.getVideArea())
        }
        ;
        a.prototype.setupAdplugin = function() {
            this.model.record.as = videoSdkTool.now();
            this.log("\u5f00\u59cb\u8bf7\u6c42\u5e7f\u544a");
            this.adplugin = new AdCtrl(this.facade,this.model);
            this.facade.addEventListener(AdEvent.EVENT, this.adHandler, this);
            this.adplugin.setUp(this.videoplugin.mediaPlayer, this.skinplugin.el)
        }
        ;
        a.prototype.errorHanlder = function(a) {
            this.log("\u6570\u636e\u8bf7\u6c42\u5931\u8d25");
            this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,PlayerEvent.ERROR,a.args[1]))
        }
        ;
        a.prototype.adHandler = function(a) {
            this.log("\u5e7f\u544a\u8fd4\u56de" + a.args[1]);
            switch (a.args[1]) {
            case AdEvent.HEADSTART:
                this.model.joint = 2;
                this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,AdEvent.HEADSTART));
                break;
            case AdEvent.HEADEND:
            case AdEvent.NOAD:
                a.args[1] == AdEvent.HEADEND ? this.model.joint = 2 : this.model.joint = 0,
                this.facade.removeEventListener(AdEvent.EVENT, this.adHandler, this),
                this.facade.dispatchEvent(new Event(PlayerEvent.EVENT,a.args[1],a.args[2])),
                this.creatVideo()
            }
        }
        ;
        a.prototype.videoHandler = function(a) {
            this.vStateHandler(a);
            switch (a.args[1]) {
            case PlayerEvent.VIDEO_AUTH_VALID:
                if ("pano" == this.videoplugin.getPlayerType() && !this.checkPano())
                    return;
                this.canplay = !0;
                this.setupAdplugin();
                break;
            case PlayerEvent.VIDEO_DATA_START:
            case PlayerEvent.GSLB_START:
            case PlayerEvent.GSLB_CMP:
            case PlayerEvent.VIDEO_DATA_CMP:
            case MediaEvent.PLAYING:
            case MediaEvent.LODING:
            case MediaEvent.COMPLETE:
                return;
            case PlayerEvent.INIT:
                "0" != this.model.config.autoSize && this.skinplugin.autoSize();
                this.model.playerConfig.refresh({
                    pWidth: this.skinplugin.el.offsetWidth,
                    pHeight: this.skinplugin.el.offsetHeight
                });
                break;
            case PlayerEvent.WPH:
                this.destroy();
                return
            }
            if (this.model.config.hasOwnProperty("callbackJs")) {
                var d = a.args[1];
                a = a.args[2];
                d == PlayerEvent.ERROR && (d = MediaEvent.ERROR);
                WIN[this.model.config.callbackJs] && WIN[this.model.config.callbackJs](d, a)
            }
        }
        ;
        a.prototype.nextHandler = function(a) {
            a.args[2] && a.args[2].hasOwnProperty("nextvid") && "" != a.args[2].nextvid && this.playNewId({
                vu: a.args[2].nextvid
            })
        }
        ;
        a.prototype.vStateHandler = function(a) {}
        ;
        a.prototype.skinHandler = function(a) {}
        ;
        a.prototype.destroy = function() {
            this.skinplugin && (this.skinplugin.shutDown(),
            this.skinplugin.removeEventListener(LoadEvent.LOADCMP, this.skinCmp, this));
            this.globalplugin && this.globalplugin.destroy();
            this.videoplugin && this.videoplugin.destroy();
            this.removedEvents();
            this.vModel && (this.vModel.destroy(),
            this.vModel = null);
            this.adplugin && (this.adplugin.destroy(),
            this.adplugin = null);
            this.reportplugin && this.reportplugin.destroy()
        }
        ;
        a.prototype.closeVideo = function() {
            this.videoplugin.destroy()
        }
        ;
        a.prototype.shutDown = function() {
            this.destroy();
            this.addEvents();
            this.videoplugin && this.videoplugin.showPoster()
        }
        ;
        a.prototype.startUp = function() {
            this.log("call startUp -vModelInit:" + this.vModelInit);
            this.destroy();
            this.vModelInit ? (this.reportplugin.setUp(),
            this.addEvents(),
            this.videoplugin && this.videoplugin.startAuth()) : (this.model.config.autoplay = "1",
            this.reportplugin.setUp(),
            this.addEvents(),
            this.startGetData())
        }
        ;
        a.prototype.playNewId = function(a) {
            var d = "";
            this.destroy();
            this.model.clear();
            this.setModelByEnv();
            this.model.playerConfig.refresh({
                version: this.version
            });
            this.model.init({
                deviceId: this.model.lc(),
                os: videoSdkTool.getOs(),
                osv: "-",
                width: window.screen.width,
                height: window.screen.height,
                appv: this.version
            });
            this.vModelInit = !1;
            this.canplay && !a.hasOwnProperty("autoplay") && (d = "1");
            this.configHanlder(a, this.model.outConfig);
            "" != d && (a.autoplay = d);
            this.model.config.refresh(a);
            this.reportplugin.setUp();
            this.addEvents();
            this.startGetData()
        }
        ;
        a.prototype.feedback = function(a) {
            "undefined" == typeof a && (a = {});
            a.type = "0";
            a.logcontent = this.api.getLog();
            this.reportplugin.report(a)
        }
        ;
        a.prototype.getLog = function() {
            return this.reportplugin.getLog()
        }
        ;
        a.prototype.getVideoApi = function() {
            var a = this;
            return {
                getVideoInfo: function() {
                    return {
                        time: a.videoplugin.mediaPlayer.getTime()
                    }
                }
            }
        }
        ;
        a.prototype.setPlayerInfo = function(a) {
            var d = {
                buttonColor: "fault",
                progressBarColor: "active"
            };
            if (a.hasOwnProperty("onoff")) {
                for (var c in a.onoff)
                    a[c] = a.onoff[c];
                delete a.onoff
            }
            for (c in a)
                d.hasOwnProperty(c) && (a[d[c]] = a[c],
                delete a[c]),
                "boolean" == typeof this.model.config[c] && (a[c] = "1" == a[c] + "");
            d = {};
            d.logo = a.logo;
            d.watermark = a.watermark;
            this.model.playerConfig.refresh(d);
            this.model.config.refresh(a);
            this.facade.color.refresh(a);
            this.skinplugin.refreshPlayerInfo(a);
            this.videoplugin.refreshPlayerInfo(a)
        }
        ;
        return a
    }()
      , BlH5Player = function() {
        function a() {
            this.superClass.constructor.apply(this, arguments)
        }
        ClassTool.inherits(a, BaseH5Player);
        a.prototype.init = function() {
            this.superClass.init.apply(this, arguments);
            this.version = "H5_Vod_20170406_4.8.3"
        }
        ;
        a.prototype.setModelByEnv = function() {
            this.superClass.setModelByEnv.apply(this, arguments);
            this.model.videoSetting.p = 101;
            this.model.playType = "vod";
            this.model.videoSetting.gslb = !0;
            videoSdkTool.isHttps() && (this.model.videoSetting.gslb = !1)
        }
        ;
        a.prototype.initPlugin = function() {
            SOTool.setPluginStack([{
                name: "ErrorInfo",
                url: "//{domain}/p/{LANG}/plugin/errorRender.js"
            }, {
                name: "FeedbackInfo",
                url: "//{domain}/p/{LANG}/plugin/feedbackRender.js"
            }, {
                name: "PanoRender",
                url: "//{domain}/p/{LANG}/plugin/panoRender1.2.js"
            }, {
                name: "Ad",
                url: "//{domain}/p/{LANG}/plugin/a.js"
            }, {
                name: "ssp",
                url: "//{domain}/p/{LANG}/plugin/ssp.js"
            }, {
                name: "lang.message.plugin.vod",
                url: "//{domain}/p/{LANG}/plugin/lang/lang_vod.js"
            }], this.model.config.lang);
            SOTool.preload("lang.message.plugin.vod", "ErrorInfo")
        }
        ;
        return a
    }()
      , BlFlashPlayer = function() {
        function a(a) {
            this.minVer = a
        }
        a.prototype = {
            setUp: function(a, d) {
                var c = "//yuntv.letv.com/bcloud.swf";
                videoSdkTool.isHttps() && (c = "//s.yuntv.letv.com/bclouds.swf");
                a.hasOwnProperty("p") && 101 != a.p && (c = "//yuntv.letv.com/player/vrp/vrp.swf");
                a.hasOwnProperty("swf") && (c = a.swf);
                a.hasOwnProperty("url") && (c = "//yuntv.letv.com/player/live/direct/direct.swf");
                DomainTool.getDomain(c);
                a.hasOwnProperty("callback") && (a.callbackJs = a.callback,
                delete a.callback);
                var g = "Opaque";
                a.hasOwnProperty("wmode") && (g = a.wmode,
                delete a.wmode);
                "Opaque" == g && (a.panoType = 1);
                this.id = FlashPlayer.create(d, {
                    url: c,
                    version: this.minVer,
                    wmode: g
                }, this.flashvarsToString(a));
                this.plugin = FlashPlayer.getPlayer(this.id);
                this.api = new FlashSdk(this)
            },
            flashvarsToString: function(a) {
                var d = "", c;
                for (c in a)
                    d += c + "=" + a[c] + "&";
                return d
            }
        };
        return a
    }()
      , CloudPlayer = function() {
        function a(a) {
            this.init(a)
        }
        a.prototype = {
            init: function(a) {
                switch (this.check(a)) {
                case "swf":
                    //this.player = new BlFlashPlayer(10);
                    //break;
                default:
                    this.player = new BlH5Player
                }
            },
            setUp: function(a, d, c) {
                this.player.setUp.apply(this.player, arguments)
            },
            check: function(a) {
                return a.hasOwnProperty("type") ? a.type : a.hasOwnProperty("dbd") && "LETV" == a.dbd ? "h5" : "android" != videoSdkTool.getOs() && "iphone" != videoSdkTool.getDevice() && "ipad" != videoSdkTool.getDevice() && FlashPlayer.check(10) ? "swf" : document.createElement("video").canPlayType ? "h5" : "swf"
            }
        };
        return a
    }()
      , LecloudVodPlayer = function() {
        function a(a, b) {
            var d = "100%"
              , f = "100%"
              , h = "player" + videoSdkTool.creatUuid();
            a.hasOwnProperty("width") && (isNaN(a.width) ? -1 != d.indexOf("%") && (d = a.width) : d = a.width + "px");
            a.hasOwnProperty("height") && (isNaN(a.height) ? -1 != f.indexOf("%") && (f = a.height) : f = a.height + "px");
            d = '<div id="#{player}" style="position: relative;width: {width};height:{height};margin-right:auto;margin-left:auto"></div>'.replace(/{width}/g, d);
            d = d.replace(/{height}/g, f);
            d = d.replace(/#{player}/g, h);
            "string" == typeof b && "" != b && UiTool.$E(b) ? UiTool.$E(b).innerHTML = d : DC.write(d);
            return h
        }
        function b(a, b, d) {
            var f = new CloudPlayer(a);
            f.setUp(a, b, d);
            return f.player
        }
        function d() {}
        ClassTool.inherits(d, ClassObject);
        d.prototype.init = function(c, d, e) {
            var f = a(c, d)
              , h = b(c, f, d);
            this.sdk = new Api(h);
            if (e) {
                var k = function(a) {
                    switch (a.args[1]) {
                    case PlayerEvent.INIT:
                        h.facade.removeEventListener(PlayerEvent.EVENT, k, this),
                        c.hasOwnProperty("callback") && ("function" == typeof c.callback ? c.callback && c.callback(h.videoplugin.mediaPlayer.player.video) : c.callback && WIN[c.callback] && WIN[c.callback](h.videoplugin.mediaPlayer.player.video))
                    }
                };
                h.facade && h.facade.addEventListener(PlayerEvent.EVENT, k, this)
            }
        }
        ;
        return d
    }();
    WIN.CloudVodPlayer = LecloudVodPlayer;
    if ("undefined" != typeof WIN.letvcloud_player_conf) {
        var p = new CloudVodPlayer;
        WIN.letvcloud_player_conf.hasOwnProperty("callbackJs") && (WIN.letvcloud_player_conf.callback = WIN.letvcloud_player_conf.callbackJs,
        delete WIN.letvcloud_player_conf.callbackJs);
        if (!WIN.letvcloud_player_conf.hasOwnProperty("posterType")) {
            WIN.letvcloud_player_conf.posterType = "-1";
            var ua = navigator.userAgent.toLowerCase();
            -1 < ua.indexOf("iphone") && -1 < ua.indexOf("mac") && -1 < ua.indexOf("7.0") && (WIN.letvcloud_player_conf.posterType = "-2")
        }
        p.init(WIN.letvcloud_player_conf, "", !0);
        WIN.letvcloud_player_conf = void 0;
        WIN.Util = {
            setRate: function(a) {
                p.sdk.setDefinition(a)
            },
            getRate: function() {
                return p.sdk.getDefinition()
            }
        }
    }
    ;
}
)(document, undefined);
