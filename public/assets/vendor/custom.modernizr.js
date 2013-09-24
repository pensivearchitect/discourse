window.Modernizr = function (e, t, n) {
    function s(e) {
        f.cssText = e
    }

    function r(e, t) {
        return typeof e === t
    }

    var a, i, o, l = "2.6.2", u = {}, c = !0, h = t.documentElement, d = "modernizr", p = t.createElement(d), f = p.style, m = {}.toString, g = " -webkit- -moz- -o- -ms- ".split(" "), v = {svg: "http://www.w3.org/2000/svg"}, b = {}, _ = [], y = _.slice, w = function (e, n, s, r) {
        var a, i, o, l, u = t.createElement("div"), c = t.body, p = c || t.createElement("body");
        if (parseInt(s, 10))for (; s--;)o = t.createElement("div"), o.id = r ? r[s] : d + (s + 1), u.appendChild(o);
        return a = ["&#173;", '<style id="s', d, '">', e, "</style>"].join(""), u.id = d, (c ? u : p).innerHTML += a, p.appendChild(u), c || (p.style.background = "", p.style.overflow = "hidden", l = h.style.overflow, h.style.overflow = "hidden", h.appendChild(p)), i = n(u, e), c ? u.parentNode.removeChild(u) : (p.parentNode.removeChild(p), h.style.overflow = l), !!i
    }, x = function (t) {
        var n = e.matchMedia || e.msMatchMedia;
        if (n)return n(t).matches;
        var s;
        return w("@media " + t + " { #" + d + " { position: absolute; } }", function (t) {
            s = "absolute" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position
        }), s
    }, k = {}.hasOwnProperty;
    o = r(k, "undefined") || r(k.call, "undefined") ? function (e, t) {
        return t in e && r(e.constructor.prototype[t], "undefined")
    } : function (e, t) {
        return k.call(e, t)
    }, Function.prototype.bind || (Function.prototype.bind = function (e) {
        var t = this;
        if ("function" != typeof t)throw new TypeError;
        var n = y.call(arguments, 1), s = function () {
            if (this instanceof s) {
                var r = function () {
                };
                r.prototype = t.prototype;
                var a = new r, i = t.apply(a, n.concat(y.call(arguments)));
                return Object(i) === i ? i : a
            }
            return t.apply(e, n.concat(y.call(arguments)))
        };
        return s
    }), b.touch = function () {
        var n;
        return"ontouchstart"in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : w(["@media (", g.join("touch-enabled),("), d, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (e) {
            n = 9 === e.offsetTop
        }), n
    }, b.svg = function () {
        return!!t.createElementNS && !!t.createElementNS(v.svg, "svg").createSVGRect
    }, b.inlinesvg = function () {
        var e = t.createElement("div");
        return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == v.svg
    }, b.svgclippaths = function () {
        return!!t.createElementNS && /SVGClipPath/.test(m.call(t.createElementNS(v.svg, "clipPath")))
    };
    for (var D in b)o(b, D) && (i = D.toLowerCase(), u[i] = b[D](), _.push((u[i] ? "" : "no-") + i));
    return u.addTest = function (e, t) {
        if ("object" == typeof e)for (var s in e)o(e, s) && u.addTest(s, e[s]); else {
            if (e = e.toLowerCase(), u[e] !== n)return u;
            t = "function" == typeof t ? t() : t, "undefined" != typeof c && c && (h.className += " " + (t ? "" : "no-") + e), u[e] = t
        }
        return u
    }, s(""), p = a = null, function (e, t) {
        function n(e, t) {
            var n = e.createElement("p"), s = e.getElementsByTagName("head")[0] || e.documentElement;
            return n.innerHTML = "x<style>" + t + "</style>", s.insertBefore(n.lastChild, s.firstChild)
        }

        function s() {
            var e = v.elements;
            return"string" == typeof e ? e.split(" ") : e
        }

        function r(e) {
            var t = g[e[f]];
            return t || (t = {}, m++, e[f] = m, g[m] = t), t
        }

        function a(e, n, s) {
            if (n || (n = t), c)return n.createElement(e);
            s || (s = r(n));
            var a;
            return a = s.cache[e] ? s.cache[e].cloneNode() : p.test(e) ? (s.cache[e] = s.createElem(e)).cloneNode() : s.createElem(e), a.canHaveChildren && !d.test(e) ? s.frag.appendChild(a) : a
        }

        function i(e, n) {
            if (e || (e = t), c)return e.createDocumentFragment();
            n = n || r(e);
            for (var a = n.frag.cloneNode(), i = 0, o = s(), l = o.length; l > i; i++)a.createElement(o[i]);
            return a
        }

        function o(e, t) {
            t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) {
                return v.shivMethods ? a(n, e, t) : t.createElem(n)
            }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + s().join().replace(/\w+/g, function (e) {
                return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
            }) + ");return n}")(v, t.frag)
        }

        function l(e) {
            e || (e = t);
            var s = r(e);
            return v.shivCSS && !u && !s.hasCSS && (s.hasCSS = !!n(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), c || o(e, s), e
        }

        var u, c, h = e.html5 || {}, d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, f = "_html5shiv", m = 0, g = {};
        (function () {
            try {
                var e = t.createElement("a");
                e.innerHTML = "<xyz></xyz>", u = "hidden"in e, c = 1 == e.childNodes.length || function () {
                    t.createElement("a");
                    var e = t.createDocumentFragment();
                    return"undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                }()
            } catch (n) {
                u = !0, c = !0
            }
        })();
        var v = {elements: h.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video", shivCSS: h.shivCSS !== !1, supportsUnknownElements: c, shivMethods: h.shivMethods !== !1, type: "default", shivDocument: l, createElement: a, createDocumentFragment: i};
        e.html5 = v, l(t)
    }(this, t), u._version = l, u._prefixes = g, u.mq = x, u.testStyles = w, h.className = h.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (c ? " js " + _.join(" ") : ""), u
}(this, this.document), function (e, t, n) {
    function s(e) {
        return"[object Function]" == g.call(e)
    }

    function r(e) {
        return"string" == typeof e
    }

    function a() {
    }

    function i(e) {
        return!e || "loaded" == e || "complete" == e || "uninitialized" == e
    }

    function o() {
        var e = v.shift();
        b = 1, e ? e.t ? f(function () {
            ("c" == e.t ? d.injectCss : d.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
        }, 0) : (e(), o()) : b = 0
    }

    function l(e, n, s, r, a, l, u) {
        function c(t) {
            if (!p && i(h.readyState) && (_.r = p = 1, !b && o(), h.onload = h.onreadystatechange = null, t)) {
                "img" != e && f(function () {
                    w.removeChild(h)
                }, 50);
                for (var s in E[n])E[n].hasOwnProperty(s) && E[n][s].onload()
            }
        }

        var u = u || d.errorTimeout, h = t.createElement(e), p = 0, g = 0, _ = {t: s, s: n, e: a, a: l, x: u};
        1 === E[n] && (g = 1, E[n] = []), "object" == e ? h.data = n : (h.src = n, h.type = e), h.width = h.height = "0", h.onerror = h.onload = h.onreadystatechange = function () {
            c.call(this, g)
        }, v.splice(r, 0, _), "img" != e && (g || 2 === E[n] ? (w.insertBefore(h, y ? null : m), f(c, u)) : E[n].push(h))
    }

    function u(e, t, n, s, a) {
        return b = 0, t = t || "j", r(e) ? l("c" == t ? k : x, e, t, this.i++, n, s, a) : (v.splice(this.i++, 0, e), 1 == v.length && o()), this
    }

    function c() {
        var e = d;
        return e.loader = {load: u, i: 0}, e
    }

    var h, d, p = t.documentElement, f = e.setTimeout, m = t.getElementsByTagName("script")[0], g = {}.toString, v = [], b = 0, _ = "MozAppearance"in p.style, y = _ && !!t.createRange().compareNode, w = y ? p : m.parentNode, p = e.opera && "[object Opera]" == g.call(e.opera), p = !!t.attachEvent && !p, x = _ ? "object" : p ? "script" : "img", k = p ? "script" : x, D = Array.isArray || function (e) {
        return"[object Array]" == g.call(e)
    }, T = [], E = {}, C = {timeout: function (e, t) {
        return t.length && (e.timeout = t[0]), e
    }};
    d = function (e) {
        function t(e) {
            var t, n, s, e = e.split("!"), r = T.length, a = e.pop(), i = e.length, a = {url: a, origUrl: a, prefixes: e};
            for (n = 0; i > n; n++)s = e[n].split("="), (t = C[s.shift()]) && (a = t(a, s));
            for (n = 0; r > n; n++)a = T[n](a);
            return a
        }

        function i(e, r, a, i, o) {
            var l = t(e), u = l.autoCallback;
            l.url.split(".").pop().split("?").shift(), l.bypass || (r && (r = s(r) ? r : r[e] || r[i] || r[e.split("/").pop().split("?")[0]]), l.instead ? l.instead(e, r, a, i, o) : (E[l.url] ? l.noexec = !0 : E[l.url] = 1, a.load(l.url, l.forceCSS || !l.forceJS && "css" == l.url.split(".").pop().split("?").shift() ? "c" : n, l.noexec, l.attrs, l.timeout), (s(r) || s(u)) && a.load(function () {
                c(), r && r(l.origUrl, o, i), u && u(l.origUrl, o, i), E[l.url] = 2
            })))
        }

        function o(e, t) {
            function n(e, n) {
                if (e) {
                    if (r(e))n || (h = function () {
                        var e = [].slice.call(arguments);
                        d.apply(this, e), p()
                    }), i(e, h, t, 0, u); else if (Object(e) === e)for (l in o = function () {
                        var t, n = 0;
                        for (t in e)e.hasOwnProperty(t) && n++;
                        return n
                    }(), e)e.hasOwnProperty(l) && (!n && !--o && (s(h) ? h = function () {
                        var e = [].slice.call(arguments);
                        d.apply(this, e), p()
                    } : h[l] = function (e) {
                        return function () {
                            var t = [].slice.call(arguments);
                            e && e.apply(this, t), p()
                        }
                    }(d[l])), i(e[l], h, t, l, u))
                } else!n && p()
            }

            var o, l, u = !!e.test, c = e.load || e.both, h = e.callback || a, d = h, p = e.complete || a;
            n(u ? e.yep : e.nope, !!c), c && n(c)
        }

        var l, u, h = this.yepnope.loader;
        if (r(e))i(e, 0, h, 0); else if (D(e))for (l = 0; e.length > l; l++)u = e[l], r(u) ? i(u, 0, h, 0) : D(u) ? d(u) : Object(u) === u && o(u, h); else Object(e) === e && o(e, h)
    }, d.addPrefix = function (e, t) {
        C[e] = t
    }, d.addFilter = function (e) {
        T.push(e)
    }, d.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", h = function () {
        t.removeEventListener("DOMContentLoaded", h, 0), t.readyState = "complete"
    }, 0)), e.yepnope = c(), e.yepnope.executeStack = o, e.yepnope.injectJs = function (e, n, s, r, l, u) {
        var c, h, p = t.createElement("script"), r = r || d.errorTimeout;
        p.src = e;
        for (h in s)p.setAttribute(h, s[h]);
        n = u ? o : n || a, p.onreadystatechange = p.onload = function () {
            !c && i(p.readyState) && (c = 1, n(), p.onload = p.onreadystatechange = null)
        }, f(function () {
            c || (c = 1, n(1))
        }, r), l ? p.onload() : m.parentNode.insertBefore(p, m)
    }, e.yepnope.injectCss = function (e, n, s, r, i, l) {
        var u, r = t.createElement("link"), n = l ? o : n || a;
        r.href = e, r.rel = "stylesheet", r.type = "text/css";
        for (u in s)r.setAttribute(u, s[u]);
        i || (m.parentNode.insertBefore(r, m), f(n, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
}, Modernizr.addTest("ie8compat", function () {
    return!window.addEventListener && document.documentMode && 7 === document.documentMode
});