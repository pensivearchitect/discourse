/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-2-4
 */
(function (e, t) {
    function n(e) {
        var t = e.length, n = ut.type(e);
        return ut.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function s(e) {
        var t = wt[e] = {};
        return ut.each(e.match(lt) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function r(e, n, s, r) {
        if (ut.acceptData(e)) {
            var a, i, o = ut.expando, u = "string" == typeof n, c = e.nodeType, l = c ? ut.cache : e, h = c ? e[o] : e[o] && o;
            if (h && l[h] && (r || l[h].data) || !u || s !== t)return h || (c ? e[o] = h = J.pop() || ut.guid++ : h = o), l[h] || (l[h] = {}, c || (l[h].toJSON = ut.noop)), ("object" == typeof n || "function" == typeof n) && (r ? l[h] = ut.extend(l[h], n) : l[h].data = ut.extend(l[h].data, n)), a = l[h], r || (a.data || (a.data = {}), a = a.data), s !== t && (a[ut.camelCase(n)] = s), u ? (i = a[n], null == i && (i = a[ut.camelCase(n)])) : i = a, i
        }
    }

    function a(e, t, n) {
        if (ut.acceptData(e)) {
            var s, r, a, i = e.nodeType, u = i ? ut.cache : e, c = i ? e[ut.expando] : ut.expando;
            if (u[c]) {
                if (t && (a = n ? u[c] : u[c].data)) {
                    ut.isArray(t) ? t = t.concat(ut.map(t, ut.camelCase)) : t in a ? t = [t] : (t = ut.camelCase(t), t = t in a ? [t] : t.split(" "));
                    for (s = 0, r = t.length; r > s; s++)delete a[t[s]];
                    if (!(n ? o : ut.isEmptyObject)(a))return
                }
                (n || (delete u[c].data, o(u[c]))) && (i ? ut.cleanData([e], !0) : ut.support.deleteExpando || u != u.window ? delete u[c] : u[c] = null)
            }
        }
    }

    function i(e, n, s) {
        if (s === t && 1 === e.nodeType) {
            var r = "data-" + n.replace(Ct, "-$1").toLowerCase();
            if (s = e.getAttribute(r), "string" == typeof s) {
                try {
                    s = "true" === s ? !0 : "false" === s ? !1 : "null" === s ? null : +s + "" === s ? +s : Tt.test(s) ? ut.parseJSON(s) : s
                } catch (a) {
                }
                ut.data(e, n, s)
            } else s = t
        }
        return s
    }

    function o(e) {
        var t;
        for (t in e)if (("data" !== t || !ut.isEmptyObject(e[t])) && "toJSON" !== t)return!1;
        return!0
    }

    function u() {
        return!0
    }

    function c() {
        return!1
    }

    function l(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function h(e, t, n) {
        if (t = t || 0, ut.isFunction(t))return ut.grep(e, function (e, s) {
            var r = !!t.call(e, s, e);
            return r === n
        });
        if (t.nodeType)return ut.grep(e, function (e) {
            return e === t === n
        });
        if ("string" == typeof t) {
            var s = ut.grep(e, function (e) {
                return 1 === e.nodeType
            });
            if (Gt.test(t))return ut.filter(t, s, !n);
            t = ut.filter(t, s)
        }
        return ut.grep(e, function (e) {
            return ut.inArray(e, t) >= 0 === n
        })
    }

    function p(e) {
        var t = $t.split("|"), n = e.createDocumentFragment();
        if (n.createElement)for (; t.length;)n.createElement(t.pop());
        return n
    }

    function f(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }

    function d(e) {
        var t = e.getAttributeNode("type");
        return e.type = (t && t.specified) + "/" + e.type, e
    }

    function m(e) {
        var t = rn.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function g(e, t) {
        for (var n, s = 0; null != (n = e[s]); s++)ut._data(n, "globalEval", !t || ut._data(t[s], "globalEval"))
    }

    function b(e, t) {
        if (1 === t.nodeType && ut.hasData(e)) {
            var n, s, r, a = ut._data(e), i = ut._data(t, a), o = a.events;
            if (o) {
                delete i.handle, i.events = {};
                for (n in o)for (s = 0, r = o[n].length; r > s; s++)ut.event.add(t, n, o[n][s])
            }
            i.data && (i.data = ut.extend({}, i.data))
        }
    }

    function y(e, t) {
        var n, s, r;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !ut.support.noCloneEvent && t[ut.expando]) {
                r = ut._data(t);
                for (s in r.events)ut.removeEvent(t, s, r.handle);
                t.removeAttribute(ut.expando)
            }
            "script" === n && t.text !== e.text ? (d(t).text = e.text, m(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ut.support.html5Clone && e.innerHTML && !ut.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && tn.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function v(e, n) {
        var s, r, a = 0, i = typeof e.getElementsByTagName !== W ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== W ? e.querySelectorAll(n || "*") : t;
        if (!i)for (i = [], s = e.childNodes || e; null != (r = s[a]); a++)!n || ut.nodeName(r, n) ? i.push(r) : ut.merge(i, v(r, n));
        return n === t || n && ut.nodeName(e, n) ? ut.merge([e], i) : i
    }

    function x(e) {
        tn.test(e.type) && (e.defaultChecked = e.checked)
    }

    function _(e, t) {
        if (t in e)return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), s = t, r = Cn.length; r--;)if (t = Cn[r] + n, t in e)return t;
        return s
    }

    function E(e, t) {
        return e = t || e, "none" === ut.css(e, "display") || !ut.contains(e.ownerDocument, e)
    }

    function w(e, t) {
        for (var n, s, r, a = [], i = 0, o = e.length; o > i; i++)s = e[i], s.style && (a[i] = ut._data(s, "olddisplay"), n = s.style.display, t ? (a[i] || "none" !== n || (s.style.display = ""), "" === s.style.display && E(s) && (a[i] = ut._data(s, "olddisplay", I(s.nodeName)))) : a[i] || (r = E(s), (n && "none" !== n || !r) && ut._data(s, "olddisplay", r ? n : ut.css(s, "display"))));
        for (i = 0; o > i; i++)s = e[i], s.style && (t && "none" !== s.style.display && "" !== s.style.display || (s.style.display = t ? a[i] || "" : "none"));
        return e
    }

    function T(e, t, n) {
        var s = yn.exec(t);
        return s ? Math.max(0, s[1] - (n || 0)) + (s[2] || "px") : t
    }

    function C(e, t, n, s, r) {
        for (var a = n === (s ? "border" : "content") ? 4 : "width" === t ? 1 : 0, i = 0; 4 > a; a += 2)"margin" === n && (i += ut.css(e, n + Tn[a], !0, r)), s ? ("content" === n && (i -= ut.css(e, "padding" + Tn[a], !0, r)), "margin" !== n && (i -= ut.css(e, "border" + Tn[a] + "Width", !0, r))) : (i += ut.css(e, "padding" + Tn[a], !0, r), "padding" !== n && (i += ut.css(e, "border" + Tn[a] + "Width", !0, r)));
        return i
    }

    function D(e, t, n) {
        var s = !0, r = "width" === t ? e.offsetWidth : e.offsetHeight, a = hn(e), i = ut.support.boxSizing && "border-box" === ut.css(e, "boxSizing", !1, a);
        if (0 >= r || null == r) {
            if (r = pn(e, t, a), (0 > r || null == r) && (r = e.style[t]), vn.test(r))return r;
            s = i && (ut.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0
        }
        return r + C(e, t, n || (i ? "border" : "content"), s, a) + "px"
    }

    function I(e) {
        var t = Q, n = _n[e];
        return n || (n = S(e, t), "none" !== n && n || (ln = (ln || ut("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (ln[0].contentWindow || ln[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = S(e, t), ln.detach()), _n[e] = n), n
    }

    function S(e, t) {
        var n = ut(t.createElement(e)).appendTo(t.body), s = ut.css(n[0], "display");
        return n.remove(), s
    }

    function k(e, t, n, s) {
        var r;
        if (ut.isArray(t))ut.each(t, function (t, r) {
            n || In.test(e) ? s(e, r) : k(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, s)
        }); else if (n || "object" !== ut.type(t))s(e, t); else for (r in t)k(e + "[" + r + "]", t[r], n, s)
    }

    function N(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var s, r = 0, a = t.toLowerCase().match(lt) || [];
            if (ut.isFunction(n))for (; s = a[r++];)"+" === s[0] ? (s = s.slice(1) || "*", (e[s] = e[s] || []).unshift(n)) : (e[s] = e[s] || []).push(n)
        }
    }

    function A(e, t, n, s) {
        function r(o) {
            var u;
            return a[o] = !0, ut.each(e[o] || [], function (e, o) {
                var c = o(t, n, s);
                return"string" != typeof c || i || a[c] ? i ? !(u = c) : void 0 : (t.dataTypes.unshift(c), r(c), !1)
            }), u
        }

        var a = {}, i = e === zn;
        return r(t.dataTypes[0]) || !a["*"] && r("*")
    }

    function P(e, n) {
        var s, r, a = ut.ajaxSettings.flatOptions || {};
        for (r in n)n[r] !== t && ((a[r] ? e : s || (s = {}))[r] = n[r]);
        return s && ut.extend(!0, e, s), e
    }

    function R(e, n, s) {
        var r, a, i, o, u = e.contents, c = e.dataTypes, l = e.responseFields;
        for (o in l)o in s && (n[l[o]] = s[o]);
        for (; "*" === c[0];)c.shift(), a === t && (a = e.mimeType || n.getResponseHeader("Content-Type"));
        if (a)for (o in u)if (u[o] && u[o].test(a)) {
            c.unshift(o);
            break
        }
        if (c[0]in s)i = c[0]; else {
            for (o in s) {
                if (!c[0] || e.converters[o + " " + c[0]]) {
                    i = o;
                    break
                }
                r || (r = o)
            }
            i = i || r
        }
        return i ? (i !== c[0] && c.unshift(i), s[i]) : void 0
    }

    function L(e, t) {
        var n, s, r, a, i = {}, o = 0, u = e.dataTypes.slice(), c = u[0];
        if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), u[1])for (r in e.converters)i[r.toLowerCase()] = e.converters[r];
        for (; s = u[++o];)if ("*" !== s) {
            if ("*" !== c && c !== s) {
                if (r = i[c + " " + s] || i["* " + s], !r)for (n in i)if (a = n.split(" "), a[1] === s && (r = i[c + " " + a[0]] || i["* " + a[0]])) {
                    r === !0 ? r = i[n] : i[n] !== !0 && (s = a[0], u.splice(o--, 0, s));
                    break
                }
                if (r !== !0)if (r && e["throws"])t = r(t); else try {
                    t = r(t)
                } catch (l) {
                    return{state: "parsererror", error: r ? l : "No conversion from " + c + " to " + s}
                }
            }
            c = s
        }
        return{state: "success", data: t}
    }

    function M() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    }

    function O() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {
        }
    }

    function j() {
        return setTimeout(function () {
            Jn = t
        }), Jn = ut.now()
    }

    function U(e, t) {
        ut.each(t, function (t, n) {
            for (var s = (as[t] || []).concat(as["*"]), r = 0, a = s.length; a > r; r++)if (s[r].call(e, t, n))return
        })
    }

    function H(e, t, n) {
        var s, r, a = 0, i = rs.length, o = ut.Deferred().always(function () {
            delete u.elem
        }), u = function () {
            if (r)return!1;
            for (var t = Jn || j(), n = Math.max(0, c.startTime + c.duration - t), s = n / c.duration || 0, a = 1 - s, i = 0, u = c.tweens.length; u > i; i++)c.tweens[i].run(a);
            return o.notifyWith(e, [c, a, n]), 1 > a && u ? n : (o.resolveWith(e, [c]), !1)
        }, c = o.promise({elem: e, props: ut.extend({}, t), opts: ut.extend(!0, {specialEasing: {}}, n), originalProperties: t, originalOptions: n, startTime: Jn || j(), duration: n.duration, tweens: [], createTween: function (t, n) {
            var s = ut.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
            return c.tweens.push(s), s
        }, stop: function (t) {
            var n = 0, s = t ? c.tweens.length : 0;
            if (r)return this;
            for (r = !0; s > n; n++)c.tweens[n].run(1);
            return t ? o.resolveWith(e, [c, t]) : o.rejectWith(e, [c, t]), this
        }}), l = c.props;
        for (V(l, c.opts.specialEasing); i > a; a++)if (s = rs[a].call(c, e, l, c.opts))return s;
        return U(c, l), ut.isFunction(c.opts.start) && c.opts.start.call(e, c), ut.fx.timer(ut.extend(u, {elem: e, anim: c, queue: c.opts.queue})), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function V(e, t) {
        var n, s, r, a, i;
        for (r in e)if (s = ut.camelCase(r), a = t[s], n = e[r], ut.isArray(n) && (a = n[1], n = e[r] = n[0]), r !== s && (e[s] = n, delete e[r]), i = ut.cssHooks[s], i && "expand"in i) {
            n = i.expand(n), delete e[s];
            for (r in n)r in e || (e[r] = n[r], t[r] = a)
        } else t[s] = a
    }

    function F(e, t, n) {
        var s, r, a, i, o, u, c, l, h, p = this, f = e.style, d = {}, m = [], g = e.nodeType && E(e);
        n.queue || (l = ut._queueHooks(e, "fx"), null == l.unqueued && (l.unqueued = 0, h = l.empty.fire, l.empty.fire = function () {
            l.unqueued || h()
        }), l.unqueued++, p.always(function () {
            p.always(function () {
                l.unqueued--, ut.queue(e, "fx").length || l.empty.fire()
            })
        })), 1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], "inline" === ut.css(e, "display") && "none" === ut.css(e, "float") && (ut.support.inlineBlockNeedsLayout && "inline" !== I(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", ut.support.shrinkWrapBlocks || p.always(function () {
            f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
        }));
        for (r in t)if (i = t[r], ts.exec(i)) {
            if (delete t[r], u = u || "toggle" === i, i === (g ? "hide" : "show"))continue;
            m.push(r)
        }
        if (a = m.length) {
            o = ut._data(e, "fxshow") || ut._data(e, "fxshow", {}), "hidden"in o && (g = o.hidden), u && (o.hidden = !g), g ? ut(e).show() : p.done(function () {
                ut(e).hide()
            }), p.done(function () {
                var t;
                ut._removeData(e, "fxshow");
                for (t in d)ut.style(e, t, d[t])
            });
            for (r = 0; a > r; r++)s = m[r], c = p.createTween(s, g ? o[s] : 0), d[s] = o[s] || ut.style(e, s), s in o || (o[s] = c.start, g && (c.end = c.start, c.start = "width" === s || "height" === s ? 1 : 0))
        }
    }

    function B(e, t, n, s, r) {
        return new B.prototype.init(e, t, n, s, r)
    }

    function G(e, t) {
        var n, s = {height: e}, r = 0;
        for (t = t ? 1 : 0; 4 > r; r += 2 - t)n = Tn[r], s["margin" + n] = s["padding" + n] = e;
        return t && (s.opacity = s.width = e), s
    }

    function z(e) {
        return ut.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }

    var q, $, W = typeof t, Q = e.document, K = e.location, Y = e.jQuery, X = e.$, Z = {}, J = [], et = "1.9.1", tt = J.concat, nt = J.push, st = J.slice, rt = J.indexOf, at = Z.toString, it = Z.hasOwnProperty, ot = et.trim, ut = function (e, t) {
        return new ut.fn.init(e, t, $)
    }, ct = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, lt = /\S+/g, ht = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, pt = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/, ft = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, dt = /^[\],:{}\s]*$/, mt = /(?:^|:|,)(?:\s*\[)+/g, gt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, bt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, yt = /^-ms-/, vt = /-([\da-z])/gi, xt = function (e, t) {
        return t.toUpperCase()
    }, _t = function (e) {
        (Q.addEventListener || "load" === e.type || "complete" === Q.readyState) && (Et(), ut.ready())
    }, Et = function () {
        Q.addEventListener ? (Q.removeEventListener("DOMContentLoaded", _t, !1), e.removeEventListener("load", _t, !1)) : (Q.detachEvent("onreadystatechange", _t), e.detachEvent("onload", _t))
    };
    ut.fn = ut.prototype = {jquery: et, constructor: ut, init: function (e, n, s) {
        var r, a;
        if (!e)return this;
        if ("string" == typeof e) {
            if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : pt.exec(e), !r || !r[1] && n)return!n || n.jquery ? (n || s).find(e) : this.constructor(n).find(e);
            if (r[1]) {
                if (n = n instanceof ut ? n[0] : n, ut.merge(this, ut.parseHTML(r[1], n && n.nodeType ? n.ownerDocument || n : Q, !0)), ft.test(r[1]) && ut.isPlainObject(n))for (r in n)ut.isFunction(this[r]) ? this[r](n[r]) : this.attr(r, n[r]);
                return this
            }
            if (a = Q.getElementById(r[2]), a && a.parentNode) {
                if (a.id !== r[2])return s.find(e);
                this.length = 1, this[0] = a
            }
            return this.context = Q, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ut.isFunction(e) ? s.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ut.makeArray(e, this))
    }, selector: "", length: 0, size: function () {
        return this.length
    }, toArray: function () {
        return st.call(this)
    }, get: function (e) {
        return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
    }, pushStack: function (e) {
        var t = ut.merge(this.constructor(), e);
        return t.prevObject = this, t.context = this.context, t
    }, each: function (e, t) {
        return ut.each(this, e, t)
    }, ready: function (e) {
        return ut.ready.promise().done(e), this
    }, slice: function () {
        return this.pushStack(st.apply(this, arguments))
    }, first: function () {
        return this.eq(0)
    }, last: function () {
        return this.eq(-1)
    }, eq: function (e) {
        var t = this.length, n = +e + (0 > e ? t : 0);
        return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
    }, map: function (e) {
        return this.pushStack(ut.map(this, function (t, n) {
            return e.call(t, n, t)
        }))
    }, end: function () {
        return this.prevObject || this.constructor(null)
    }, push: nt, sort: [].sort, splice: [].splice}, ut.fn.init.prototype = ut.fn, ut.extend = ut.fn.extend = function () {
        var e, n, s, r, a, i, o = arguments[0] || {}, u = 1, c = arguments.length, l = !1;
        for ("boolean" == typeof o && (l = o, o = arguments[1] || {}, u = 2), "object" == typeof o || ut.isFunction(o) || (o = {}), c === u && (o = this, --u); c > u; u++)if (null != (a = arguments[u]))for (r in a)e = o[r], s = a[r], o !== s && (l && s && (ut.isPlainObject(s) || (n = ut.isArray(s))) ? (n ? (n = !1, i = e && ut.isArray(e) ? e : []) : i = e && ut.isPlainObject(e) ? e : {}, o[r] = ut.extend(l, i, s)) : s !== t && (o[r] = s));
        return o
    }, ut.extend({noConflict: function (t) {
        return e.$ === ut && (e.$ = X), t && e.jQuery === ut && (e.jQuery = Y), ut
    }, isReady: !1, readyWait: 1, holdReady: function (e) {
        e ? ut.readyWait++ : ut.ready(!0)
    }, ready: function (e) {
        if (e === !0 ? !--ut.readyWait : !ut.isReady) {
            if (!Q.body)return setTimeout(ut.ready);
            ut.isReady = !0, e !== !0 && --ut.readyWait > 0 || (q.resolveWith(Q, [ut]), ut.fn.trigger && ut(Q).trigger("ready").off("ready"))
        }
    }, isFunction: function (e) {
        return"function" === ut.type(e)
    }, isArray: Array.isArray || function (e) {
        return"array" === ut.type(e)
    }, isWindow: function (e) {
        return null != e && e == e.window
    }, isNumeric: function (e) {
        return!isNaN(parseFloat(e)) && isFinite(e)
    }, type: function (e) {
        return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? Z[at.call(e)] || "object" : typeof e
    }, isPlainObject: function (e) {
        if (!e || "object" !== ut.type(e) || e.nodeType || ut.isWindow(e))return!1;
        try {
            if (e.constructor && !it.call(e, "constructor") && !it.call(e.constructor.prototype, "isPrototypeOf"))return!1
        } catch (n) {
            return!1
        }
        var s;
        for (s in e);
        return s === t || it.call(e, s)
    }, isEmptyObject: function (e) {
        var t;
        for (t in e)return!1;
        return!0
    }, error: function (e) {
        throw new Error(e)
    }, parseHTML: function (e, t, n) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || Q;
        var s = ft.exec(e), r = !n && [];
        return s ? [t.createElement(s[1])] : (s = ut.buildFragment([e], t, r), r && ut(r).remove(), ut.merge([], s.childNodes))
    }, parseJSON: function (t) {
        return e.JSON && e.JSON.parse ? e.JSON.parse(t) : null === t ? t : "string" == typeof t && (t = ut.trim(t), t && dt.test(t.replace(gt, "@").replace(bt, "]").replace(mt, ""))) ? new Function("return " + t)() : (ut.error("Invalid JSON: " + t), void 0)
    }, parseXML: function (n) {
        var s, r;
        if (!n || "string" != typeof n)return null;
        try {
            e.DOMParser ? (r = new DOMParser, s = r.parseFromString(n, "text/xml")) : (s = new ActiveXObject("Microsoft.XMLDOM"), s.async = "false", s.loadXML(n))
        } catch (a) {
            s = t
        }
        return s && s.documentElement && !s.getElementsByTagName("parsererror").length || ut.error("Invalid XML: " + n), s
    }, noop: function () {
    }, globalEval: function (t) {
        t && ut.trim(t) && (e.execScript || function (t) {
            e.eval.call(e, t)
        })(t)
    }, camelCase: function (e) {
        return e.replace(yt, "ms-").replace(vt, xt)
    }, nodeName: function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }, each: function (e, t, s) {
        var r, a = 0, i = e.length, o = n(e);
        if (s) {
            if (o)for (; i > a && (r = t.apply(e[a], s), r !== !1); a++); else for (a in e)if (r = t.apply(e[a], s), r === !1)break
        } else if (o)for (; i > a && (r = t.call(e[a], a, e[a]), r !== !1); a++); else for (a in e)if (r = t.call(e[a], a, e[a]), r === !1)break;
        return e
    }, trim: ot && !ot.call("﻿ ") ? function (e) {
        return null == e ? "" : ot.call(e)
    } : function (e) {
        return null == e ? "" : (e + "").replace(ht, "")
    }, makeArray: function (e, t) {
        var s = t || [];
        return null != e && (n(Object(e)) ? ut.merge(s, "string" == typeof e ? [e] : e) : nt.call(s, e)), s
    }, inArray: function (e, t, n) {
        var s;
        if (t) {
            if (rt)return rt.call(t, e, n);
            for (s = t.length, n = n ? 0 > n ? Math.max(0, s + n) : n : 0; s > n; n++)if (n in t && t[n] === e)return n
        }
        return-1
    }, merge: function (e, n) {
        var s = n.length, r = e.length, a = 0;
        if ("number" == typeof s)for (; s > a; a++)e[r++] = n[a]; else for (; n[a] !== t;)e[r++] = n[a++];
        return e.length = r, e
    }, grep: function (e, t, n) {
        var s, r = [], a = 0, i = e.length;
        for (n = !!n; i > a; a++)s = !!t(e[a], a), n !== s && r.push(e[a]);
        return r
    }, map: function (e, t, s) {
        var r, a = 0, i = e.length, o = n(e), u = [];
        if (o)for (; i > a; a++)r = t(e[a], a, s), null != r && (u[u.length] = r); else for (a in e)r = t(e[a], a, s), null != r && (u[u.length] = r);
        return tt.apply([], u)
    }, guid: 1, proxy: function (e, n) {
        var s, r, a;
        return"string" == typeof n && (a = e[n], n = e, e = a), ut.isFunction(e) ? (s = st.call(arguments, 2), r = function () {
            return e.apply(n || this, s.concat(st.call(arguments)))
        }, r.guid = e.guid = e.guid || ut.guid++, r) : t
    }, access: function (e, n, s, r, a, i, o) {
        var u = 0, c = e.length, l = null == s;
        if ("object" === ut.type(s)) {
            a = !0;
            for (u in s)ut.access(e, n, u, s[u], !0, i, o)
        } else if (r !== t && (a = !0, ut.isFunction(r) || (o = !0), l && (o ? (n.call(e, r), n = null) : (l = n, n = function (e, t, n) {
            return l.call(ut(e), n)
        })), n))for (; c > u; u++)n(e[u], s, o ? r : r.call(e[u], u, n(e[u], s)));
        return a ? e : l ? n.call(e) : c ? n(e[0], s) : i
    }, now: function () {
        return(new Date).getTime()
    }}), ut.ready.promise = function (t) {
        if (!q)if (q = ut.Deferred(), "complete" === Q.readyState)setTimeout(ut.ready); else if (Q.addEventListener)Q.addEventListener("DOMContentLoaded", _t, !1), e.addEventListener("load", _t, !1); else {
            Q.attachEvent("onreadystatechange", _t), e.attachEvent("onload", _t);
            var n = !1;
            try {
                n = null == e.frameElement && Q.documentElement
            } catch (s) {
            }
            n && n.doScroll && function r() {
                if (!ut.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(r, 50)
                    }
                    Et(), ut.ready()
                }
            }()
        }
        return q.promise(t)
    }, ut.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        Z["[object " + t + "]"] = t.toLowerCase()
    }), $ = ut(Q);
    var wt = {};
    ut.Callbacks = function (e) {
        e = "string" == typeof e ? wt[e] || s(e) : ut.extend({}, e);
        var n, r, a, i, o, u, c = [], l = !e.once && [], h = function (t) {
            for (r = e.memory && t, a = !0, o = u || 0, u = 0, i = c.length, n = !0; c && i > o; o++)if (c[o].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                r = !1;
                break
            }
            n = !1, c && (l ? l.length && h(l.shift()) : r ? c = [] : p.disable())
        }, p = {add: function () {
            if (c) {
                var t = c.length;
                (function s(t) {
                    ut.each(t, function (t, n) {
                        var r = ut.type(n);
                        "function" === r ? e.unique && p.has(n) || c.push(n) : n && n.length && "string" !== r && s(n)
                    })
                })(arguments), n ? i = c.length : r && (u = t, h(r))
            }
            return this
        }, remove: function () {
            return c && ut.each(arguments, function (e, t) {
                for (var s; (s = ut.inArray(t, c, s)) > -1;)c.splice(s, 1), n && (i >= s && i--, o >= s && o--)
            }), this
        }, has: function (e) {
            return e ? ut.inArray(e, c) > -1 : !(!c || !c.length)
        }, empty: function () {
            return c = [], this
        }, disable: function () {
            return c = l = r = t, this
        }, disabled: function () {
            return!c
        }, lock: function () {
            return l = t, r || p.disable(), this
        }, locked: function () {
            return!l
        }, fireWith: function (e, t) {
            return t = t || [], t = [e, t.slice ? t.slice() : t], !c || a && !l || (n ? l.push(t) : h(t)), this
        }, fire: function () {
            return p.fireWith(this, arguments), this
        }, fired: function () {
            return!!a
        }};
        return p
    }, ut.extend({Deferred: function (e) {
        var t = [
            ["resolve", "done", ut.Callbacks("once memory"), "resolved"],
            ["reject", "fail", ut.Callbacks("once memory"), "rejected"],
            ["notify", "progress", ut.Callbacks("memory")]
        ], n = "pending", s = {state: function () {
            return n
        }, always: function () {
            return r.done(arguments).fail(arguments), this
        }, then: function () {
            var e = arguments;
            return ut.Deferred(function (n) {
                ut.each(t, function (t, a) {
                    var i = a[0], o = ut.isFunction(e[t]) && e[t];
                    r[a[1]](function () {
                        var e = o && o.apply(this, arguments);
                        e && ut.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[i + "With"](this === s ? n.promise() : this, o ? [e] : arguments)
                    })
                }), e = null
            }).promise()
        }, promise: function (e) {
            return null != e ? ut.extend(e, s) : s
        }}, r = {};
        return s.pipe = s.then, ut.each(t, function (e, a) {
            var i = a[2], o = a[3];
            s[a[1]] = i.add, o && i.add(function () {
                n = o
            }, t[1 ^ e][2].disable, t[2][2].lock), r[a[0]] = function () {
                return r[a[0] + "With"](this === r ? s : this, arguments), this
            }, r[a[0] + "With"] = i.fireWith
        }), s.promise(r), e && e.call(r, r), r
    }, when: function (e) {
        var t, n, s, r = 0, a = st.call(arguments), i = a.length, o = 1 !== i || e && ut.isFunction(e.promise) ? i : 0, u = 1 === o ? e : ut.Deferred(), c = function (e, n, s) {
            return function (r) {
                n[e] = this, s[e] = arguments.length > 1 ? st.call(arguments) : r, s === t ? u.notifyWith(n, s) : --o || u.resolveWith(n, s)
            }
        };
        if (i > 1)for (t = new Array(i), n = new Array(i), s = new Array(i); i > r; r++)a[r] && ut.isFunction(a[r].promise) ? a[r].promise().done(c(r, s, a)).fail(u.reject).progress(c(r, n, t)) : --o;
        return o || u.resolveWith(s, a), u.promise()
    }}), ut.support = function () {
        var t, n, s, r, a, i, o, u, c, l, h = Q.createElement("div");
        if (h.setAttribute("className", "t"), h.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = h.getElementsByTagName("*"), s = h.getElementsByTagName("a")[0], !n || !s || !n.length)return{};
        a = Q.createElement("select"), o = a.appendChild(Q.createElement("option")), r = h.getElementsByTagName("input")[0], s.style.cssText = "top:1px;float:left;opacity:.5", t = {getSetAttribute: "t" !== h.className, leadingWhitespace: 3 === h.firstChild.nodeType, tbody: !h.getElementsByTagName("tbody").length, htmlSerialize: !!h.getElementsByTagName("link").length, style: /top/.test(s.getAttribute("style")), hrefNormalized: "/a" === s.getAttribute("href"), opacity: /^0.5/.test(s.style.opacity), cssFloat: !!s.style.cssFloat, checkOn: !!r.value, optSelected: o.selected, enctype: !!Q.createElement("form").enctype, html5Clone: "<:nav></:nav>" !== Q.createElement("nav").cloneNode(!0).outerHTML, boxModel: "CSS1Compat" === Q.compatMode, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0, boxSizingReliable: !0, pixelPosition: !1}, r.checked = !0, t.noCloneChecked = r.cloneNode(!0).checked, a.disabled = !0, t.optDisabled = !o.disabled;
        try {
            delete h.test
        } catch (p) {
            t.deleteExpando = !1
        }
        r = Q.createElement("input"), r.setAttribute("value", ""), t.input = "" === r.getAttribute("value"), r.value = "t", r.setAttribute("type", "radio"), t.radioValue = "t" === r.value, r.setAttribute("checked", "t"), r.setAttribute("name", "t"), i = Q.createDocumentFragment(), i.appendChild(r), t.appendChecked = r.checked, t.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked, h.attachEvent && (h.attachEvent("onclick", function () {
            t.noCloneEvent = !1
        }), h.cloneNode(!0).click());
        for (l in{submit: !0, change: !0, focusin: !0})h.setAttribute(u = "on" + l, "t"), t[l + "Bubbles"] = u in e || h.attributes[u].expando === !1;
        return h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === h.style.backgroundClip, ut(function () {
            var n, s, r, a = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", i = Q.getElementsByTagName("body")[0];
            i && (n = Q.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", i.appendChild(n).appendChild(h), h.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = h.getElementsByTagName("td"), r[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === r[0].offsetHeight, r[0].style.display = "", r[1].style.display = "none", t.reliableHiddenOffsets = c && 0 === r[0].offsetHeight, h.innerHTML = "", h.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === h.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== i.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(h, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(h, null) || {width: "4px"}).width, s = h.appendChild(Q.createElement("div")), s.style.cssText = h.style.cssText = a, s.style.marginRight = s.style.width = "0", h.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(s, null) || {}).marginRight)), typeof h.style.zoom !== W && (h.innerHTML = "", h.style.cssText = a + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === h.offsetWidth, h.style.display = "block", h.innerHTML = "<div></div>", h.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== h.offsetWidth, t.inlineBlockNeedsLayout && (i.style.zoom = 1)), i.removeChild(n), n = h = r = s = null)
        }), n = a = i = o = s = r = null, t
    }();
    var Tt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, Ct = /([A-Z])/g;
    ut.extend({cache: {}, expando: "jQuery" + (et + Math.random()).replace(/\D/g, ""), noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0}, hasData: function (e) {
        return e = e.nodeType ? ut.cache[e[ut.expando]] : e[ut.expando], !!e && !o(e)
    }, data: function (e, t, n) {
        return r(e, t, n)
    }, removeData: function (e, t) {
        return a(e, t)
    }, _data: function (e, t, n) {
        return r(e, t, n, !0)
    }, _removeData: function (e, t) {
        return a(e, t, !0)
    }, acceptData: function (e) {
        if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType)return!1;
        var t = e.nodeName && ut.noData[e.nodeName.toLowerCase()];
        return!t || t !== !0 && e.getAttribute("classid") === t
    }}), ut.fn.extend({data: function (e, n) {
        var s, r, a = this[0], o = 0, u = null;
        if (e === t) {
            if (this.length && (u = ut.data(a), 1 === a.nodeType && !ut._data(a, "parsedAttrs"))) {
                for (s = a.attributes; s.length > o; o++)r = s[o].name, r.indexOf("data-") || (r = ut.camelCase(r.slice(5)), i(a, r, u[r]));
                ut._data(a, "parsedAttrs", !0)
            }
            return u
        }
        return"object" == typeof e ? this.each(function () {
            ut.data(this, e)
        }) : ut.access(this, function (n) {
            return n === t ? a ? i(a, e, ut.data(a, e)) : null : (this.each(function () {
                ut.data(this, e, n)
            }), void 0)
        }, null, n, arguments.length > 1, null, !0)
    }, removeData: function (e) {
        return this.each(function () {
            ut.removeData(this, e)
        })
    }}), ut.extend({queue: function (e, t, n) {
        var s;
        return e ? (t = (t || "fx") + "queue", s = ut._data(e, t), n && (!s || ut.isArray(n) ? s = ut._data(e, t, ut.makeArray(n)) : s.push(n)), s || []) : void 0
    }, dequeue: function (e, t) {
        t = t || "fx";
        var n = ut.queue(e, t), s = n.length, r = n.shift(), a = ut._queueHooks(e, t), i = function () {
            ut.dequeue(e, t)
        };
        "inprogress" === r && (r = n.shift(), s--), a.cur = r, r && ("fx" === t && n.unshift("inprogress"), delete a.stop, r.call(e, i, a)), !s && a && a.empty.fire()
    }, _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return ut._data(e, n) || ut._data(e, n, {empty: ut.Callbacks("once memory").add(function () {
            ut._removeData(e, t + "queue"), ut._removeData(e, n)
        })})
    }}), ut.fn.extend({queue: function (e, n) {
        var s = 2;
        return"string" != typeof e && (n = e, e = "fx", s--), s > arguments.length ? ut.queue(this[0], e) : n === t ? this : this.each(function () {
            var t = ut.queue(this, e, n);
            ut._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ut.dequeue(this, e)
        })
    }, dequeue: function (e) {
        return this.each(function () {
            ut.dequeue(this, e)
        })
    }, delay: function (e, t) {
        return e = ut.fx ? ut.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var s = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(s)
            }
        })
    }, clearQueue: function (e) {
        return this.queue(e || "fx", [])
    }, promise: function (e, n) {
        var s, r = 1, a = ut.Deferred(), i = this, o = this.length, u = function () {
            --r || a.resolveWith(i, [i])
        };
        for ("string" != typeof e && (n = e, e = t), e = e || "fx"; o--;)s = ut._data(i[o], e + "queueHooks"), s && s.empty && (r++, s.empty.add(u));
        return u(), a.promise(n)
    }});
    var Dt, It, St = /[\t\r\n]/g, kt = /\r/g, Nt = /^(?:input|select|textarea|button|object)$/i, At = /^(?:a|area)$/i, Pt = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i, Rt = /^(?:checked|selected)$/i, Lt = ut.support.getSetAttribute, Mt = ut.support.input;
    ut.fn.extend({attr: function (e, t) {
        return ut.access(this, ut.attr, e, t, arguments.length > 1)
    }, removeAttr: function (e) {
        return this.each(function () {
            ut.removeAttr(this, e)
        })
    }, prop: function (e, t) {
        return ut.access(this, ut.prop, e, t, arguments.length > 1)
    }, removeProp: function (e) {
        return e = ut.propFix[e] || e, this.each(function () {
            try {
                this[e] = t, delete this[e]
            } catch (n) {
            }
        })
    }, addClass: function (e) {
        var t, n, s, r, a, i = 0, o = this.length, u = "string" == typeof e && e;
        if (ut.isFunction(e))return this.each(function (t) {
            ut(this).addClass(e.call(this, t, this.className))
        });
        if (u)for (t = (e || "").match(lt) || []; o > i; i++)if (n = this[i], s = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(St, " ") : " ")) {
            for (a = 0; r = t[a++];)0 > s.indexOf(" " + r + " ") && (s += r + " ");
            n.className = ut.trim(s)
        }
        return this
    }, removeClass: function (e) {
        var t, n, s, r, a, i = 0, o = this.length, u = 0 === arguments.length || "string" == typeof e && e;
        if (ut.isFunction(e))return this.each(function (t) {
            ut(this).removeClass(e.call(this, t, this.className))
        });
        if (u)for (t = (e || "").match(lt) || []; o > i; i++)if (n = this[i], s = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(St, " ") : "")) {
            for (a = 0; r = t[a++];)for (; s.indexOf(" " + r + " ") >= 0;)s = s.replace(" " + r + " ", " ");
            n.className = e ? ut.trim(s) : ""
        }
        return this
    }, toggleClass: function (e, t) {
        var n = typeof e, s = "boolean" == typeof t;
        return ut.isFunction(e) ? this.each(function (n) {
            ut(this).toggleClass(e.call(this, n, this.className, t), t)
        }) : this.each(function () {
            if ("string" === n)for (var r, a = 0, i = ut(this), o = t, u = e.match(lt) || []; r = u[a++];)o = s ? o : !i.hasClass(r), i[o ? "addClass" : "removeClass"](r); else(n === W || "boolean" === n) && (this.className && ut._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ut._data(this, "__className__") || "")
        })
    }, hasClass: function (e) {
        for (var t = " " + e + " ", n = 0, s = this.length; s > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(St, " ").indexOf(t) >= 0)return!0;
        return!1
    }, val: function (e) {
        var n, s, r, a = this[0];
        {
            if (arguments.length)return r = ut.isFunction(e), this.each(function (n) {
                var a, i = ut(this);
                1 === this.nodeType && (a = r ? e.call(this, n, i.val()) : e, null == a ? a = "" : "number" == typeof a ? a += "" : ut.isArray(a) && (a = ut.map(a, function (e) {
                    return null == e ? "" : e + ""
                })), s = ut.valHooks[this.type] || ut.valHooks[this.nodeName.toLowerCase()], s && "set"in s && s.set(this, a, "value") !== t || (this.value = a))
            });
            if (a)return s = ut.valHooks[a.type] || ut.valHooks[a.nodeName.toLowerCase()], s && "get"in s && (n = s.get(a, "value")) !== t ? n : (n = a.value, "string" == typeof n ? n.replace(kt, "") : null == n ? "" : n)
        }
    }}), ut.extend({valHooks: {option: {get: function (e) {
        var t = e.attributes.value;
        return!t || t.specified ? e.value : e.text
    }}, select: {get: function (e) {
        for (var t, n, s = e.options, r = e.selectedIndex, a = "select-one" === e.type || 0 > r, i = a ? null : [], o = a ? r + 1 : s.length, u = 0 > r ? o : a ? r : 0; o > u; u++)if (n = s[u], !(!n.selected && u !== r || (ut.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ut.nodeName(n.parentNode, "optgroup"))) {
            if (t = ut(n).val(), a)return t;
            i.push(t)
        }
        return i
    }, set: function (e, t) {
        var n = ut.makeArray(t);
        return ut(e).find("option").each(function () {
            this.selected = ut.inArray(ut(this).val(), n) >= 0
        }), n.length || (e.selectedIndex = -1), n
    }}}, attr: function (e, n, s) {
        var r, a, i, o = e.nodeType;
        if (e && 3 !== o && 8 !== o && 2 !== o)return typeof e.getAttribute === W ? ut.prop(e, n, s) : (a = 1 !== o || !ut.isXMLDoc(e), a && (n = n.toLowerCase(), r = ut.attrHooks[n] || (Pt.test(n) ? It : Dt)), s === t ? r && a && "get"in r && null !== (i = r.get(e, n)) ? i : (typeof e.getAttribute !== W && (i = e.getAttribute(n)), null == i ? t : i) : null !== s ? r && a && "set"in r && (i = r.set(e, s, n)) !== t ? i : (e.setAttribute(n, s + ""), s) : (ut.removeAttr(e, n), void 0))
    }, removeAttr: function (e, t) {
        var n, s, r = 0, a = t && t.match(lt);
        if (a && 1 === e.nodeType)for (; n = a[r++];)s = ut.propFix[n] || n, Pt.test(n) ? !Lt && Rt.test(n) ? e[ut.camelCase("default-" + n)] = e[s] = !1 : e[s] = !1 : ut.attr(e, n, ""), e.removeAttribute(Lt ? n : s)
    }, attrHooks: {type: {set: function (e, t) {
        if (!ut.support.radioValue && "radio" === t && ut.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
        }
    }}}, propFix: {tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable"}, prop: function (e, n, s) {
        var r, a, i, o = e.nodeType;
        if (e && 3 !== o && 8 !== o && 2 !== o)return i = 1 !== o || !ut.isXMLDoc(e), i && (n = ut.propFix[n] || n, a = ut.propHooks[n]), s !== t ? a && "set"in a && (r = a.set(e, s, n)) !== t ? r : e[n] = s : a && "get"in a && null !== (r = a.get(e, n)) ? r : e[n]
    }, propHooks: {tabIndex: {get: function (e) {
        var n = e.getAttributeNode("tabindex");
        return n && n.specified ? parseInt(n.value, 10) : Nt.test(e.nodeName) || At.test(e.nodeName) && e.href ? 0 : t
    }}}}), It = {get: function (e, n) {
        var s = ut.prop(e, n), r = "boolean" == typeof s && e.getAttribute(n), a = "boolean" == typeof s ? Mt && Lt ? null != r : Rt.test(n) ? e[ut.camelCase("default-" + n)] : !!r : e.getAttributeNode(n);
        return a && a.value !== !1 ? n.toLowerCase() : t
    }, set: function (e, t, n) {
        return t === !1 ? ut.removeAttr(e, n) : Mt && Lt || !Rt.test(n) ? e.setAttribute(!Lt && ut.propFix[n] || n, n) : e[ut.camelCase("default-" + n)] = e[n] = !0, n
    }}, Mt && Lt || (ut.attrHooks.value = {get: function (e, n) {
        var s = e.getAttributeNode(n);
        return ut.nodeName(e, "input") ? e.defaultValue : s && s.specified ? s.value : t
    }, set: function (e, t, n) {
        return ut.nodeName(e, "input") ? (e.defaultValue = t, void 0) : Dt && Dt.set(e, t, n)
    }}), Lt || (Dt = ut.valHooks.button = {get: function (e, n) {
        var s = e.getAttributeNode(n);
        return s && ("id" === n || "name" === n || "coords" === n ? "" !== s.value : s.specified) ? s.value : t
    }, set: function (e, n, s) {
        var r = e.getAttributeNode(s);
        return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(s)), r.value = n += "", "value" === s || n === e.getAttribute(s) ? n : t
    }}, ut.attrHooks.contenteditable = {get: Dt.get, set: function (e, t, n) {
        Dt.set(e, "" === t ? !1 : t, n)
    }}, ut.each(["width", "height"], function (e, t) {
        ut.attrHooks[t] = ut.extend(ut.attrHooks[t], {set: function (e, n) {
            return"" === n ? (e.setAttribute(t, "auto"), n) : void 0
        }})
    })), ut.support.hrefNormalized || (ut.each(["href", "src", "width", "height"], function (e, n) {
        ut.attrHooks[n] = ut.extend(ut.attrHooks[n], {get: function (e) {
            var s = e.getAttribute(n, 2);
            return null == s ? t : s
        }})
    }), ut.each(["href", "src"], function (e, t) {
        ut.propHooks[t] = {get: function (e) {
            return e.getAttribute(t, 4)
        }}
    })), ut.support.style || (ut.attrHooks.style = {get: function (e) {
        return e.style.cssText || t
    }, set: function (e, t) {
        return e.style.cssText = t + ""
    }}), ut.support.optSelected || (ut.propHooks.selected = ut.extend(ut.propHooks.selected, {get: function (e) {
        var t = e.parentNode;
        return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
    }})), ut.support.enctype || (ut.propFix.enctype = "encoding"), ut.support.checkOn || ut.each(["radio", "checkbox"], function () {
        ut.valHooks[this] = {get: function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }}
    }), ut.each(["radio", "checkbox"], function () {
        ut.valHooks[this] = ut.extend(ut.valHooks[this], {set: function (e, t) {
            return ut.isArray(t) ? e.checked = ut.inArray(ut(e).val(), t) >= 0 : void 0
        }})
    });
    var Ot = /^(?:input|select|textarea)$/i, jt = /^key/, Ut = /^(?:mouse|contextmenu)|click/, Ht = /^(?:focusinfocus|focusoutblur)$/, Vt = /^([^.]*)(?:\.(.+)|)$/;
    ut.event = {global: {}, add: function (e, n, s, r, a) {
        var i, o, u, c, l, h, p, f, d, m, g, b = ut._data(e);
        if (b) {
            for (s.handler && (c = s, s = c.handler, a = c.selector), s.guid || (s.guid = ut.guid++), (o = b.events) || (o = b.events = {}), (h = b.handle) || (h = b.handle = function (e) {
                return typeof ut === W || e && ut.event.triggered === e.type ? t : ut.event.dispatch.apply(h.elem, arguments)
            }, h.elem = e), n = (n || "").match(lt) || [""], u = n.length; u--;)i = Vt.exec(n[u]) || [], d = g = i[1], m = (i[2] || "").split(".").sort(), l = ut.event.special[d] || {}, d = (a ? l.delegateType : l.bindType) || d, l = ut.event.special[d] || {}, p = ut.extend({type: d, origType: g, data: r, handler: s, guid: s.guid, selector: a, needsContext: a && ut.expr.match.needsContext.test(a), namespace: m.join(".")}, c), (f = o[d]) || (f = o[d] = [], f.delegateCount = 0, l.setup && l.setup.call(e, r, m, h) !== !1 || (e.addEventListener ? e.addEventListener(d, h, !1) : e.attachEvent && e.attachEvent("on" + d, h))), l.add && (l.add.call(e, p), p.handler.guid || (p.handler.guid = s.guid)), a ? f.splice(f.delegateCount++, 0, p) : f.push(p), ut.event.global[d] = !0;
            e = null
        }
    }, remove: function (e, t, n, s, r) {
        var a, i, o, u, c, l, h, p, f, d, m, g = ut.hasData(e) && ut._data(e);
        if (g && (l = g.events)) {
            for (t = (t || "").match(lt) || [""], c = t.length; c--;)if (o = Vt.exec(t[c]) || [], f = m = o[1], d = (o[2] || "").split(".").sort(), f) {
                for (h = ut.event.special[f] || {}, f = (s ? h.delegateType : h.bindType) || f, p = l[f] || [], o = o[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = a = p.length; a--;)i = p[a], !r && m !== i.origType || n && n.guid !== i.guid || o && !o.test(i.namespace) || s && s !== i.selector && ("**" !== s || !i.selector) || (p.splice(a, 1), i.selector && p.delegateCount--, h.remove && h.remove.call(e, i));
                u && !p.length && (h.teardown && h.teardown.call(e, d, g.handle) !== !1 || ut.removeEvent(e, f, g.handle), delete l[f])
            } else for (f in l)ut.event.remove(e, f + t[c], n, s, !0);
            ut.isEmptyObject(l) && (delete g.handle, ut._removeData(e, "events"))
        }
    }, trigger: function (n, s, r, a) {
        var i, o, u, c, l, h, p, f = [r || Q], d = it.call(n, "type") ? n.type : n, m = it.call(n, "namespace") ? n.namespace.split(".") : [];
        if (u = h = r = r || Q, 3 !== r.nodeType && 8 !== r.nodeType && !Ht.test(d + ut.event.triggered) && (d.indexOf(".") >= 0 && (m = d.split("."), d = m.shift(), m.sort()), o = 0 > d.indexOf(":") && "on" + d, n = n[ut.expando] ? n : new ut.Event(d, "object" == typeof n && n), n.isTrigger = !0, n.namespace = m.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = r), s = null == s ? [n] : ut.makeArray(s, [n]), l = ut.event.special[d] || {}, a || !l.trigger || l.trigger.apply(r, s) !== !1)) {
            if (!a && !l.noBubble && !ut.isWindow(r)) {
                for (c = l.delegateType || d, Ht.test(c + d) || (u = u.parentNode); u; u = u.parentNode)f.push(u), h = u;
                h === (r.ownerDocument || Q) && f.push(h.defaultView || h.parentWindow || e)
            }
            for (p = 0; (u = f[p++]) && !n.isPropagationStopped();)n.type = p > 1 ? c : l.bindType || d, i = (ut._data(u, "events") || {})[n.type] && ut._data(u, "handle"), i && i.apply(u, s), i = o && u[o], i && ut.acceptData(u) && i.apply && i.apply(u, s) === !1 && n.preventDefault();
            if (n.type = d, !(a || n.isDefaultPrevented() || l._default && l._default.apply(r.ownerDocument, s) !== !1 || "click" === d && ut.nodeName(r, "a") || !ut.acceptData(r) || !o || !r[d] || ut.isWindow(r))) {
                h = r[o], h && (r[o] = null), ut.event.triggered = d;
                try {
                    r[d]()
                } catch (g) {
                }
                ut.event.triggered = t, h && (r[o] = h)
            }
            return n.result
        }
    }, dispatch: function (e) {
        e = ut.event.fix(e);
        var n, s, r, a, i, o = [], u = st.call(arguments), c = (ut._data(this, "events") || {})[e.type] || [], l = ut.event.special[e.type] || {};
        if (u[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
            for (o = ut.event.handlers.call(this, e, c), n = 0; (a = o[n++]) && !e.isPropagationStopped();)for (e.currentTarget = a.elem, i = 0; (r = a.handlers[i++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r, e.data = r.data, s = ((ut.event.special[r.origType] || {}).handle || r.handler).apply(a.elem, u), s !== t && (e.result = s) === !1 && (e.preventDefault(), e.stopPropagation()));
            return l.postDispatch && l.postDispatch.call(this, e), e.result
        }
    }, handlers: function (e, n) {
        var s, r, a, i, o = [], u = n.delegateCount, c = e.target;
        if (u && c.nodeType && (!e.button || "click" !== e.type))for (; c != this; c = c.parentNode || this)if (1 === c.nodeType && (c.disabled !== !0 || "click" !== e.type)) {
            for (a = [], i = 0; u > i; i++)r = n[i], s = r.selector + " ", a[s] === t && (a[s] = r.needsContext ? ut(s, this).index(c) >= 0 : ut.find(s, this, null, [c]).length), a[s] && a.push(r);
            a.length && o.push({elem: c, handlers: a})
        }
        return n.length > u && o.push({elem: this, handlers: n.slice(u)}), o
    }, fix: function (e) {
        if (e[ut.expando])return e;
        var t, n, s, r = e.type, a = e, i = this.fixHooks[r];
        for (i || (this.fixHooks[r] = i = Ut.test(r) ? this.mouseHooks : jt.test(r) ? this.keyHooks : {}), s = i.props ? this.props.concat(i.props) : this.props, e = new ut.Event(a), t = s.length; t--;)n = s[t], e[n] = a[n];
        return e.target || (e.target = a.srcElement || Q), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, i.filter ? i.filter(e, a) : e
    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {props: "char charCode key keyCode".split(" "), filter: function (e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
    }}, mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (e, n) {
        var s, r, a, i = n.button, o = n.fromElement;
        return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || Q, a = r.documentElement, s = r.body, e.pageX = n.clientX + (a && a.scrollLeft || s && s.scrollLeft || 0) - (a && a.clientLeft || s && s.clientLeft || 0), e.pageY = n.clientY + (a && a.scrollTop || s && s.scrollTop || 0) - (a && a.clientTop || s && s.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? n.toElement : o), e.which || i === t || (e.which = 1 & i ? 1 : 2 & i ? 3 : 4 & i ? 2 : 0), e
    }}, special: {load: {noBubble: !0}, click: {trigger: function () {
        return ut.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
    }}, focus: {trigger: function () {
        if (this !== Q.activeElement && this.focus)try {
            return this.focus(), !1
        } catch (e) {
        }
    }, delegateType: "focusin"}, blur: {trigger: function () {
        return this === Q.activeElement && this.blur ? (this.blur(), !1) : void 0
    }, delegateType: "focusout"}, beforeunload: {postDispatch: function (e) {
        e.result !== t && (e.originalEvent.returnValue = e.result)
    }}}, simulate: function (e, t, n, s) {
        var r = ut.extend(new ut.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
        s ? ut.event.trigger(r, null, t) : ut.event.dispatch.call(t, r), r.isDefaultPrevented() && n.preventDefault()
    }}, ut.removeEvent = Q.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        var s = "on" + t;
        e.detachEvent && (typeof e[s] === W && (e[s] = null), e.detachEvent(s, n))
    }, ut.Event = function (e, t) {
        return this instanceof ut.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? u : c) : this.type = e, t && ut.extend(this, t), this.timeStamp = e && e.timeStamp || ut.now(), this[ut.expando] = !0, void 0) : new ut.Event(e, t)
    }, ut.Event.prototype = {isDefaultPrevented: c, isPropagationStopped: c, isImmediatePropagationStopped: c, preventDefault: function () {
        var e = this.originalEvent;
        this.isDefaultPrevented = u, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
    }, stopPropagation: function () {
        var e = this.originalEvent;
        this.isPropagationStopped = u, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
    }, stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = u, this.stopPropagation()
    }}, ut.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
        ut.event.special[e] = {delegateType: t, bindType: t, handle: function (e) {
            var n, s = this, r = e.relatedTarget, a = e.handleObj;
            return(!r || r !== s && !ut.contains(s, r)) && (e.type = a.origType, n = a.handler.apply(this, arguments), e.type = t), n
        }}
    }), ut.support.submitBubbles || (ut.event.special.submit = {setup: function () {
        return ut.nodeName(this, "form") ? !1 : (ut.event.add(this, "click._submit keypress._submit", function (e) {
            var n = e.target, s = ut.nodeName(n, "input") || ut.nodeName(n, "button") ? n.form : t;
            s && !ut._data(s, "submitBubbles") && (ut.event.add(s, "submit._submit", function (e) {
                e._submit_bubble = !0
            }), ut._data(s, "submitBubbles", !0))
        }), void 0)
    }, postDispatch: function (e) {
        e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ut.event.simulate("submit", this.parentNode, e, !0))
    }, teardown: function () {
        return ut.nodeName(this, "form") ? !1 : (ut.event.remove(this, "._submit"), void 0)
    }}), ut.support.changeBubbles || (ut.event.special.change = {setup: function () {
        return Ot.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ut.event.add(this, "propertychange._change", function (e) {
            "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
        }), ut.event.add(this, "click._change", function (e) {
            this._just_changed && !e.isTrigger && (this._just_changed = !1), ut.event.simulate("change", this, e, !0)
        })), !1) : (ut.event.add(this, "beforeactivate._change", function (e) {
            var t = e.target;
            Ot.test(t.nodeName) && !ut._data(t, "changeBubbles") && (ut.event.add(t, "change._change", function (e) {
                !this.parentNode || e.isSimulated || e.isTrigger || ut.event.simulate("change", this.parentNode, e, !0)
            }), ut._data(t, "changeBubbles", !0))
        }), void 0)
    }, handle: function (e) {
        var t = e.target;
        return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
    }, teardown: function () {
        return ut.event.remove(this, "._change"), !Ot.test(this.nodeName)
    }}), ut.support.focusinBubbles || ut.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = 0, s = function (e) {
            ut.event.simulate(t, e.target, ut.event.fix(e), !0)
        };
        ut.event.special[t] = {setup: function () {
            0 === n++ && Q.addEventListener(e, s, !0)
        }, teardown: function () {
            0 === --n && Q.removeEventListener(e, s, !0)
        }}
    }), ut.fn.extend({on: function (e, n, s, r, a) {
        var i, o;
        if ("object" == typeof e) {
            "string" != typeof n && (s = s || n, n = t);
            for (i in e)this.on(i, n, s, e[i], a);
            return this
        }
        if (null == s && null == r ? (r = n, s = n = t) : null == r && ("string" == typeof n ? (r = s, s = t) : (r = s, s = n, n = t)), r === !1)r = c; else if (!r)return this;
        return 1 === a && (o = r, r = function (e) {
            return ut().off(e), o.apply(this, arguments)
        }, r.guid = o.guid || (o.guid = ut.guid++)), this.each(function () {
            ut.event.add(this, e, r, s, n)
        })
    }, one: function (e, t, n, s) {
        return this.on(e, t, n, s, 1)
    }, off: function (e, n, s) {
        var r, a;
        if (e && e.preventDefault && e.handleObj)return r = e.handleObj, ut(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
        if ("object" == typeof e) {
            for (a in e)this.off(a, n, e[a]);
            return this
        }
        return(n === !1 || "function" == typeof n) && (s = n, n = t), s === !1 && (s = c), this.each(function () {
            ut.event.remove(this, e, s, n)
        })
    }, bind: function (e, t, n) {
        return this.on(e, null, t, n)
    }, unbind: function (e, t) {
        return this.off(e, null, t)
    }, delegate: function (e, t, n, s) {
        return this.on(t, e, n, s)
    }, undelegate: function (e, t, n) {
        return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
    }, trigger: function (e, t) {
        return this.each(function () {
            ut.event.trigger(e, t, this)
        })
    }, triggerHandler: function (e, t) {
        var n = this[0];
        return n ? ut.event.trigger(e, t, n, !0) : void 0
    }}), /*!
     * Sizzle CSS Selector Engine
     * Copyright 2012 jQuery Foundation and other contributors
     * Released under the MIT license
     * http://sizzlejs.com/
     */
        function (e, t) {
            function n(e) {
                return dt.test(e + "")
            }

            function s() {
                var e, t = [];
                return e = function (n, s) {
                    return t.push(n += " ") > T.cacheLength && delete e[t.shift()], e[n] = s
                }
            }

            function r(e) {
                return e[H] = !0, e
            }

            function a(e) {
                var t = A.createElement("div");
                try {
                    return e(t)
                } catch (n) {
                    return!1
                } finally {
                    t = null
                }
            }

            function i(e, t, n, s) {
                var r, a, i, o, u, c, l, f, d, m;
                if ((t ? t.ownerDocument || t : V) !== A && N(t), t = t || A, n = n || [], !e || "string" != typeof e)return n;
                if (1 !== (o = t.nodeType) && 9 !== o)return[];
                if (!R && !s) {
                    if (r = mt.exec(e))if (i = r[1]) {
                        if (9 === o) {
                            if (a = t.getElementById(i), !a || !a.parentNode)return n;
                            if (a.id === i)return n.push(a), n
                        } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(i)) && j(t, a) && a.id === i)return n.push(a), n
                    } else {
                        if (r[2])return X.apply(n, Z.call(t.getElementsByTagName(e), 0)), n;
                        if ((i = r[3]) && F.getByClassName && t.getElementsByClassName)return X.apply(n, Z.call(t.getElementsByClassName(i), 0)), n
                    }
                    if (F.qsa && !L.test(e)) {
                        if (l = !0, f = H, d = t, m = 9 === o && e, 1 === o && "object" !== t.nodeName.toLowerCase()) {
                            for (c = h(e), (l = t.getAttribute("id")) ? f = l.replace(yt, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", u = c.length; u--;)c[u] = f + p(c[u]);
                            d = ft.test(e) && t.parentNode || t, m = c.join(",")
                        }
                        if (m)try {
                            return X.apply(n, Z.call(d.querySelectorAll(m), 0)), n
                        } catch (g) {
                        } finally {
                            l || t.removeAttribute("id")
                        }
                    }
                }
                return x(e.replace(it, "$1"), t, n, s)
            }

            function o(e, t) {
                var n = t && e, s = n && (~t.sourceIndex || Q) - (~e.sourceIndex || Q);
                if (s)return s;
                if (n)for (; n = n.nextSibling;)if (n === t)return-1;
                return e ? 1 : -1
            }

            function u(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return"input" === n && t.type === e
                }
            }

            function c(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return("input" === n || "button" === n) && t.type === e
                }
            }

            function l(e) {
                return r(function (t) {
                    return t = +t, r(function (n, s) {
                        for (var r, a = e([], n.length, t), i = a.length; i--;)n[r = a[i]] && (n[r] = !(s[r] = n[r]))
                    })
                })
            }

            function h(e, t) {
                var n, s, r, a, o, u, c, l = q[e + " "];
                if (l)return t ? 0 : l.slice(0);
                for (o = e, u = [], c = T.preFilter; o;) {
                    (!n || (s = ot.exec(o))) && (s && (o = o.slice(s[0].length) || o), u.push(r = [])), n = !1, (s = ct.exec(o)) && (n = s.shift(), r.push({value: n, type: s[0].replace(it, " ")}), o = o.slice(n.length));
                    for (a in T.filter)!(s = pt[a].exec(o)) || c[a] && !(s = c[a](s)) || (n = s.shift(), r.push({value: n, type: a, matches: s}), o = o.slice(n.length));
                    if (!n)break
                }
                return t ? o.length : o ? i.error(e) : q(e, u).slice(0)
            }

            function p(e) {
                for (var t = 0, n = e.length, s = ""; n > t; t++)s += e[t].value;
                return s
            }

            function f(e, t, n) {
                var s = t.dir, r = n && "parentNode" === s, a = G++;
                return t.first ? function (t, n, a) {
                    for (; t = t[s];)if (1 === t.nodeType || r)return e(t, n, a)
                } : function (t, n, i) {
                    var o, u, c, l = B + " " + a;
                    if (i) {
                        for (; t = t[s];)if ((1 === t.nodeType || r) && e(t, n, i))return!0
                    } else for (; t = t[s];)if (1 === t.nodeType || r)if (c = t[H] || (t[H] = {}), (u = c[s]) && u[0] === l) {
                        if ((o = u[1]) === !0 || o === w)return o === !0
                    } else if (u = c[s] = [l], u[1] = e(t, n, i) || w, u[1] === !0)return!0
                }
            }

            function d(e) {
                return e.length > 1 ? function (t, n, s) {
                    for (var r = e.length; r--;)if (!e[r](t, n, s))return!1;
                    return!0
                } : e[0]
            }

            function m(e, t, n, s, r) {
                for (var a, i = [], o = 0, u = e.length, c = null != t; u > o; o++)(a = e[o]) && (!n || n(a, s, r)) && (i.push(a), c && t.push(o));
                return i
            }

            function g(e, t, n, s, a, i) {
                return s && !s[H] && (s = g(s)), a && !a[H] && (a = g(a, i)), r(function (r, i, o, u) {
                    var c, l, h, p = [], f = [], d = i.length, g = r || v(t || "*", o.nodeType ? [o] : o, []), b = !e || !r && t ? g : m(g, p, e, o, u), y = n ? a || (r ? e : d || s) ? [] : i : b;
                    if (n && n(b, y, o, u), s)for (c = m(y, f), s(c, [], o, u), l = c.length; l--;)(h = c[l]) && (y[f[l]] = !(b[f[l]] = h));
                    if (r) {
                        if (a || e) {
                            if (a) {
                                for (c = [], l = y.length; l--;)(h = y[l]) && c.push(b[l] = h);
                                a(null, y = [], c, u)
                            }
                            for (l = y.length; l--;)(h = y[l]) && (c = a ? J.call(r, h) : p[l]) > -1 && (r[c] = !(i[c] = h))
                        }
                    } else y = m(y === i ? y.splice(d, y.length) : y), a ? a(null, i, y, u) : X.apply(i, y)
                })
            }

            function b(e) {
                for (var t, n, s, r = e.length, a = T.relative[e[0].type], i = a || T.relative[" "], o = a ? 1 : 0, u = f(function (e) {
                    return e === t
                }, i, !0), c = f(function (e) {
                    return J.call(t, e) > -1
                }, i, !0), l = [function (e, n, s) {
                    return!a && (s || n !== k) || ((t = n).nodeType ? u(e, n, s) : c(e, n, s))
                }]; r > o; o++)if (n = T.relative[e[o].type])l = [f(d(l), n)]; else {
                    if (n = T.filter[e[o].type].apply(null, e[o].matches), n[H]) {
                        for (s = ++o; r > s && !T.relative[e[s].type]; s++);
                        return g(o > 1 && d(l), o > 1 && p(e.slice(0, o - 1)).replace(it, "$1"), n, s > o && b(e.slice(o, s)), r > s && b(e = e.slice(s)), r > s && p(e))
                    }
                    l.push(n)
                }
                return d(l)
            }

            function y(e, t) {
                var n = 0, s = t.length > 0, a = e.length > 0, o = function (r, o, u, c, l) {
                    var h, p, f, d = [], g = 0, b = "0", y = r && [], v = null != l, x = k, _ = r || a && T.find.TAG("*", l && o.parentNode || o), E = B += null == x ? 1 : Math.random() || .1;
                    for (v && (k = o !== A && o, w = n); null != (h = _[b]); b++) {
                        if (a && h) {
                            for (p = 0; f = e[p++];)if (f(h, o, u)) {
                                c.push(h);
                                break
                            }
                            v && (B = E, w = ++n)
                        }
                        s && ((h = !f && h) && g--, r && y.push(h))
                    }
                    if (g += b, s && b !== g) {
                        for (p = 0; f = t[p++];)f(y, d, o, u);
                        if (r) {
                            if (g > 0)for (; b--;)y[b] || d[b] || (d[b] = Y.call(c));
                            d = m(d)
                        }
                        X.apply(c, d), v && !r && d.length > 0 && g + t.length > 1 && i.uniqueSort(c)
                    }
                    return v && (B = E, k = x), y
                };
                return s ? r(o) : o
            }

            function v(e, t, n) {
                for (var s = 0, r = t.length; r > s; s++)i(e, t[s], n);
                return n
            }

            function x(e, t, n, s) {
                var r, a, i, o, u, c = h(e);
                if (!s && 1 === c.length) {
                    if (a = c[0] = c[0].slice(0), a.length > 2 && "ID" === (i = a[0]).type && 9 === t.nodeType && !R && T.relative[a[1].type]) {
                        if (t = T.find.ID(i.matches[0].replace(xt, _t), t)[0], !t)return n;
                        e = e.slice(a.shift().value.length)
                    }
                    for (r = pt.needsContext.test(e) ? 0 : a.length; r-- && (i = a[r], !T.relative[o = i.type]);)if ((u = T.find[o]) && (s = u(i.matches[0].replace(xt, _t), ft.test(a[0].type) && t.parentNode || t))) {
                        if (a.splice(r, 1), e = s.length && p(a), !e)return X.apply(n, Z.call(s, 0)), n;
                        break
                    }
                }
                return I(e, c)(s, t, R, n, ft.test(e)), n
            }

            function _() {
            }

            var E, w, T, C, D, I, S, k, N, A, P, R, L, M, O, j, U, H = "sizzle" + -new Date, V = e.document, F = {}, B = 0, G = 0, z = s(), q = s(), $ = s(), W = typeof t, Q = 1 << 31, K = [], Y = K.pop, X = K.push, Z = K.slice, J = K.indexOf || function (e) {
                for (var t = 0, n = this.length; n > t; t++)if (this[t] === e)return t;
                return-1
            }, et = "[\\x20\\t\\r\\n\\f]", tt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", nt = tt.replace("w", "w#"), st = "([*^$|!~]?=)", rt = "\\[" + et + "*(" + tt + ")" + et + "*(?:" + st + et + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + nt + ")|)|)" + et + "*\\]", at = ":(" + tt + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + rt.replace(3, 8) + ")*)|.*)\\)|)", it = new RegExp("^" + et + "+|((?:^|[^\\\\])(?:\\\\.)*)" + et + "+$", "g"), ot = new RegExp("^" + et + "*," + et + "*"), ct = new RegExp("^" + et + "*([\\x20\\t\\r\\n\\f>+~])" + et + "*"), lt = new RegExp(at), ht = new RegExp("^" + nt + "$"), pt = {ID: new RegExp("^#(" + tt + ")"), CLASS: new RegExp("^\\.(" + tt + ")"), NAME: new RegExp("^\\[name=['\"]?(" + tt + ")['\"]?\\]"), TAG: new RegExp("^(" + tt.replace("w", "w*") + ")"), ATTR: new RegExp("^" + rt), PSEUDO: new RegExp("^" + at), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + et + "*(even|odd|(([+-]|)(\\d*)n|)" + et + "*(?:([+-]|)" + et + "*(\\d+)|))" + et + "*\\)|)", "i"), needsContext: new RegExp("^" + et + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + et + "*((?:-\\d)?\\d*)" + et + "*\\)|)(?=[^-]|$)", "i")}, ft = /[\x20\t\r\n\f]*[+~]/, dt = /^[^{]+\{\s*\[native code/, mt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, gt = /^(?:input|select|textarea|button)$/i, bt = /^h\d$/i, yt = /'|\\/g, vt = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, xt = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, _t = function (e, t) {
                var n = "0x" + t - 65536;
                return n !== n ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n)
            };
            try {
                Z.call(V.documentElement.childNodes, 0)[0].nodeType
            } catch (Et) {
                Z = function (e) {
                    for (var t, n = []; t = this[e++];)n.push(t);
                    return n
                }
            }
            D = i.isXML = function (e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, N = i.setDocument = function (e) {
                var s = e ? e.ownerDocument || e : V;
                return s !== A && 9 === s.nodeType && s.documentElement ? (A = s, P = s.documentElement, R = D(s), F.tagNameNoComments = a(function (e) {
                    return e.appendChild(s.createComment("")), !e.getElementsByTagName("*").length
                }), F.attributes = a(function (e) {
                    e.innerHTML = "<select></select>";
                    var t = typeof e.lastChild.getAttribute("multiple");
                    return"boolean" !== t && "string" !== t
                }), F.getByClassName = a(function (e) {
                    return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
                }), F.getByName = a(function (e) {
                    e.id = H + 0, e.innerHTML = "<a name='" + H + "'></a><div name='" + H + "'></div>", P.insertBefore(e, P.firstChild);
                    var t = s.getElementsByName && s.getElementsByName(H).length === 2 + s.getElementsByName(H + 0).length;
                    return F.getIdNotName = !s.getElementById(H), P.removeChild(e), t
                }), T.attrHandle = a(function (e) {
                    return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== W && "#" === e.firstChild.getAttribute("href")
                }) ? {} : {href: function (e) {
                    return e.getAttribute("href", 2)
                }, type: function (e) {
                    return e.getAttribute("type")
                }}, F.getIdNotName ? (T.find.ID = function (e, t) {
                    if (typeof t.getElementById !== W && !R) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, T.filter.ID = function (e) {
                    var t = e.replace(xt, _t);
                    return function (e) {
                        return e.getAttribute("id") === t
                    }
                }) : (T.find.ID = function (e, n) {
                    if (typeof n.getElementById !== W && !R) {
                        var s = n.getElementById(e);
                        return s ? s.id === e || typeof s.getAttributeNode !== W && s.getAttributeNode("id").value === e ? [s] : t : []
                    }
                }, T.filter.ID = function (e) {
                    var t = e.replace(xt, _t);
                    return function (e) {
                        var n = typeof e.getAttributeNode !== W && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), T.find.TAG = F.tagNameNoComments ? function (e, t) {
                    return typeof t.getElementsByTagName !== W ? t.getElementsByTagName(e) : void 0
                } : function (e, t) {
                    var n, s = [], r = 0, a = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = a[r++];)1 === n.nodeType && s.push(n);
                        return s
                    }
                    return a
                }, T.find.NAME = F.getByName && function (e, t) {
                    return typeof t.getElementsByName !== W ? t.getElementsByName(name) : void 0
                }, T.find.CLASS = F.getByClassName && function (e, t) {
                    return typeof t.getElementsByClassName === W || R ? void 0 : t.getElementsByClassName(e)
                }, M = [], L = [":focus"], (F.qsa = n(s.querySelectorAll)) && (a(function (e) {
                    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || L.push("\\[" + et + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || L.push(":checked")
                }), a(function (e) {
                    e.innerHTML = "<input type='hidden' i=''/>", e.querySelectorAll("[i^='']").length && L.push("[*^$]=" + et + "*(?:\"\"|'')"), e.querySelectorAll(":enabled").length || L.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), L.push(",.*:")
                })), (F.matchesSelector = n(O = P.matchesSelector || P.mozMatchesSelector || P.webkitMatchesSelector || P.oMatchesSelector || P.msMatchesSelector)) && a(function (e) {
                    F.disconnectedMatch = O.call(e, "div"), O.call(e, "[s!='']:x"), M.push("!=", at)
                }), L = new RegExp(L.join("|")), M = new RegExp(M.join("|")), j = n(P.contains) || P.compareDocumentPosition ? function (e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e, s = t && t.parentNode;
                    return e === s || !(!s || 1 !== s.nodeType || !(n.contains ? n.contains(s) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(s)))
                } : function (e, t) {
                    if (t)for (; t = t.parentNode;)if (t === e)return!0;
                    return!1
                }, U = P.compareDocumentPosition ? function (e, t) {
                    var n;
                    return e === t ? (S = !0, 0) : (n = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t)) ? 1 & n || e.parentNode && 11 === e.parentNode.nodeType ? e === s || j(V, e) ? -1 : t === s || j(V, t) ? 1 : 0 : 4 & n ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                } : function (e, t) {
                    var n, r = 0, a = e.parentNode, i = t.parentNode, u = [e], c = [t];
                    if (e === t)return S = !0, 0;
                    if (!a || !i)return e === s ? -1 : t === s ? 1 : a ? -1 : i ? 1 : 0;
                    if (a === i)return o(e, t);
                    for (n = e; n = n.parentNode;)u.unshift(n);
                    for (n = t; n = n.parentNode;)c.unshift(n);
                    for (; u[r] === c[r];)r++;
                    return r ? o(u[r], c[r]) : u[r] === V ? -1 : c[r] === V ? 1 : 0
                }, S = !1, [0, 0].sort(U), F.detectDuplicates = S, A) : A
            }, i.matches = function (e, t) {
                return i(e, null, null, t)
            }, i.matchesSelector = function (e, t) {
                if ((e.ownerDocument || e) !== A && N(e), t = t.replace(vt, "='$1']"), !(!F.matchesSelector || R || M && M.test(t) || L.test(t)))try {
                    var n = O.call(e, t);
                    if (n || F.disconnectedMatch || e.document && 11 !== e.document.nodeType)return n
                } catch (s) {
                }
                return i(t, A, null, [e]).length > 0
            }, i.contains = function (e, t) {
                return(e.ownerDocument || e) !== A && N(e), j(e, t)
            }, i.attr = function (e, t) {
                var n;
                return(e.ownerDocument || e) !== A && N(e), R || (t = t.toLowerCase()), (n = T.attrHandle[t]) ? n(e) : R || F.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && e[t] === !0 ? t : n && n.specified ? n.value : null
            }, i.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, i.uniqueSort = function (e) {
                var t, n = [], s = 1, r = 0;
                if (S = !F.detectDuplicates, e.sort(U), S) {
                    for (; t = e[s]; s++)t === e[s - 1] && (r = n.push(s));
                    for (; r--;)e.splice(n[r], 1)
                }
                return e
            }, C = i.getText = function (e) {
                var t, n = "", s = 0, r = e.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof e.textContent)return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling)n += C(e)
                    } else if (3 === r || 4 === r)return e.nodeValue
                } else for (; t = e[s]; s++)n += C(t);
                return n
            }, T = i.selectors = {cacheLength: 50, createPseudo: r, match: pt, find: {}, relative: {">": {dir: "parentNode", first: !0}, " ": {dir: "parentNode"}, "+": {dir: "previousSibling", first: !0}, "~": {dir: "previousSibling"}}, preFilter: {ATTR: function (e) {
                return e[1] = e[1].replace(xt, _t), e[3] = (e[4] || e[5] || "").replace(xt, _t), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
            }, CHILD: function (e) {
                return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || i.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && i.error(e[0]), e
            }, PSEUDO: function (e) {
                var t, n = !e[5] && e[2];
                return pt.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && lt.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
            }}, filter: {TAG: function (e) {
                return"*" === e ? function () {
                    return!0
                } : (e = e.replace(xt, _t).toLowerCase(), function (t) {
                    return t.nodeName && t.nodeName.toLowerCase() === e
                })
            }, CLASS: function (e) {
                var t = z[e + " "];
                return t || (t = new RegExp("(^|" + et + ")" + e + "(" + et + "|$)")) && z(e, function (e) {
                    return t.test(e.className || typeof e.getAttribute !== W && e.getAttribute("class") || "")
                })
            }, ATTR: function (e, t, n) {
                return function (s) {
                    var r = i.attr(s, e);
                    return null == r ? "!=" === t : t ? (r += "", "=" === t ? r === n : "!=" === t ? r !== n : "^=" === t ? n && 0 === r.indexOf(n) : "*=" === t ? n && r.indexOf(n) > -1 : "$=" === t ? n && r.slice(-n.length) === n : "~=" === t ? (" " + r + " ").indexOf(n) > -1 : "|=" === t ? r === n || r.slice(0, n.length + 1) === n + "-" : !1) : !0
                }
            }, CHILD: function (e, t, n, s, r) {
                var a = "nth" !== e.slice(0, 3), i = "last" !== e.slice(-4), o = "of-type" === t;
                return 1 === s && 0 === r ? function (e) {
                    return!!e.parentNode
                } : function (t, n, u) {
                    var c, l, h, p, f, d, m = a !== i ? "nextSibling" : "previousSibling", g = t.parentNode, b = o && t.nodeName.toLowerCase(), y = !u && !o;
                    if (g) {
                        if (a) {
                            for (; m;) {
                                for (h = t; h = h[m];)if (o ? h.nodeName.toLowerCase() === b : 1 === h.nodeType)return!1;
                                d = m = "only" === e && !d && "nextSibling"
                            }
                            return!0
                        }
                        if (d = [i ? g.firstChild : g.lastChild], i && y) {
                            for (l = g[H] || (g[H] = {}), c = l[e] || [], f = c[0] === B && c[1], p = c[0] === B && c[2], h = f && g.childNodes[f]; h = ++f && h && h[m] || (p = f = 0) || d.pop();)if (1 === h.nodeType && ++p && h === t) {
                                l[e] = [B, f, p];
                                break
                            }
                        } else if (y && (c = (t[H] || (t[H] = {}))[e]) && c[0] === B)p = c[1]; else for (; (h = ++f && h && h[m] || (p = f = 0) || d.pop()) && ((o ? h.nodeName.toLowerCase() !== b : 1 !== h.nodeType) || !++p || (y && ((h[H] || (h[H] = {}))[e] = [B, p]), h !== t)););
                        return p -= r, p === s || 0 === p % s && p / s >= 0
                    }
                }
            }, PSEUDO: function (e, t) {
                var n, s = T.pseudos[e] || T.setFilters[e.toLowerCase()] || i.error("unsupported pseudo: " + e);
                return s[H] ? s(t) : s.length > 1 ? (n = [e, e, "", t], T.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, n) {
                    for (var r, a = s(e, t), i = a.length; i--;)r = J.call(e, a[i]), e[r] = !(n[r] = a[i])
                }) : function (e) {
                    return s(e, 0, n)
                }) : s
            }}, pseudos: {not: r(function (e) {
                var t = [], n = [], s = I(e.replace(it, "$1"));
                return s[H] ? r(function (e, t, n, r) {
                    for (var a, i = s(e, null, r, []), o = e.length; o--;)(a = i[o]) && (e[o] = !(t[o] = a))
                }) : function (e, r, a) {
                    return t[0] = e, s(t, null, a, n), !n.pop()
                }
            }), has: r(function (e) {
                return function (t) {
                    return i(e, t).length > 0
                }
            }), contains: r(function (e) {
                return function (t) {
                    return(t.textContent || t.innerText || C(t)).indexOf(e) > -1
                }
            }), lang: r(function (e) {
                return ht.test(e || "") || i.error("unsupported lang: " + e), e = e.replace(xt, _t).toLowerCase(), function (t) {
                    var n;
                    do if (n = R ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang)return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                    return!1
                }
            }), target: function (t) {
                var n = e.location && e.location.hash;
                return n && n.slice(1) === t.id
            }, root: function (e) {
                return e === P
            }, focus: function (e) {
                return e === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
            }, enabled: function (e) {
                return e.disabled === !1
            }, disabled: function (e) {
                return e.disabled === !0
            }, checked: function (e) {
                var t = e.nodeName.toLowerCase();
                return"input" === t && !!e.checked || "option" === t && !!e.selected
            }, selected: function (e) {
                return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
            }, empty: function (e) {
                for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType)return!1;
                return!0
            }, parent: function (e) {
                return!T.pseudos.empty(e)
            }, header: function (e) {
                return bt.test(e.nodeName)
            }, input: function (e) {
                return gt.test(e.nodeName)
            }, button: function (e) {
                var t = e.nodeName.toLowerCase();
                return"input" === t && "button" === e.type || "button" === t
            }, text: function (e) {
                var t;
                return"input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
            }, first: l(function () {
                return[0]
            }), last: l(function (e, t) {
                return[t - 1]
            }), eq: l(function (e, t, n) {
                return[0 > n ? n + t : n]
            }), even: l(function (e, t) {
                for (var n = 0; t > n; n += 2)e.push(n);
                return e
            }), odd: l(function (e, t) {
                for (var n = 1; t > n; n += 2)e.push(n);
                return e
            }), lt: l(function (e, t, n) {
                for (var s = 0 > n ? n + t : n; --s >= 0;)e.push(s);
                return e
            }), gt: l(function (e, t, n) {
                for (var s = 0 > n ? n + t : n; t > ++s;)e.push(s);
                return e
            })}};
            for (E in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})T.pseudos[E] = u(E);
            for (E in{submit: !0, reset: !0})T.pseudos[E] = c(E);
            I = i.compile = function (e, t) {
                var n, s = [], r = [], a = $[e + " "];
                if (!a) {
                    for (t || (t = h(e)), n = t.length; n--;)a = b(t[n]), a[H] ? s.push(a) : r.push(a);
                    a = $(e, y(r, s))
                }
                return a
            }, T.pseudos.nth = T.pseudos.eq, T.filters = _.prototype = T.pseudos, T.setFilters = new _, N(), i.attr = ut.attr, ut.find = i, ut.expr = i.selectors, ut.expr[":"] = ut.expr.pseudos, ut.unique = i.uniqueSort, ut.text = i.getText, ut.isXMLDoc = i.isXML, ut.contains = i.contains
        }(e);
    var Ft = /Until$/, Bt = /^(?:parents|prev(?:Until|All))/, Gt = /^.[^:#\[\.,]*$/, zt = ut.expr.match.needsContext, qt = {children: !0, contents: !0, next: !0, prev: !0};
    ut.fn.extend({find: function (e) {
        var t, n, s, r = this.length;
        if ("string" != typeof e)return s = this, this.pushStack(ut(e).filter(function () {
            for (t = 0; r > t; t++)if (ut.contains(s[t], this))return!0
        }));
        for (n = [], t = 0; r > t; t++)ut.find(e, this[t], n);
        return n = this.pushStack(r > 1 ? ut.unique(n) : n), n.selector = (this.selector ? this.selector + " " : "") + e, n
    }, has: function (e) {
        var t, n = ut(e, this), s = n.length;
        return this.filter(function () {
            for (t = 0; s > t; t++)if (ut.contains(this, n[t]))return!0
        })
    }, not: function (e) {
        return this.pushStack(h(this, e, !1))
    }, filter: function (e) {
        return this.pushStack(h(this, e, !0))
    }, is: function (e) {
        return!!e && ("string" == typeof e ? zt.test(e) ? ut(e, this.context).index(this[0]) >= 0 : ut.filter(e, this).length > 0 : this.filter(e).length > 0)
    }, closest: function (e, t) {
        for (var n, s = 0, r = this.length, a = [], i = zt.test(e) || "string" != typeof e ? ut(e, t || this.context) : 0; r > s; s++)for (n = this[s]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
            if (i ? i.index(n) > -1 : ut.find.matchesSelector(n, e)) {
                a.push(n);
                break
            }
            n = n.parentNode
        }
        return this.pushStack(a.length > 1 ? ut.unique(a) : a)
    }, index: function (e) {
        return e ? "string" == typeof e ? ut.inArray(this[0], ut(e)) : ut.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    }, add: function (e, t) {
        var n = "string" == typeof e ? ut(e, t) : ut.makeArray(e && e.nodeType ? [e] : e), s = ut.merge(this.get(), n);
        return this.pushStack(ut.unique(s))
    }, addBack: function (e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }}), ut.fn.andSelf = ut.fn.addBack, ut.each({parent: function (e) {
        var t = e.parentNode;
        return t && 11 !== t.nodeType ? t : null
    }, parents: function (e) {
        return ut.dir(e, "parentNode")
    }, parentsUntil: function (e, t, n) {
        return ut.dir(e, "parentNode", n)
    }, next: function (e) {
        return l(e, "nextSibling")
    }, prev: function (e) {
        return l(e, "previousSibling")
    }, nextAll: function (e) {
        return ut.dir(e, "nextSibling")
    }, prevAll: function (e) {
        return ut.dir(e, "previousSibling")
    }, nextUntil: function (e, t, n) {
        return ut.dir(e, "nextSibling", n)
    }, prevUntil: function (e, t, n) {
        return ut.dir(e, "previousSibling", n)
    }, siblings: function (e) {
        return ut.sibling((e.parentNode || {}).firstChild, e)
    }, children: function (e) {
        return ut.sibling(e.firstChild)
    }, contents: function (e) {
        return ut.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ut.merge([], e.childNodes)
    }}, function (e, t) {
        ut.fn[e] = function (n, s) {
            var r = ut.map(this, t, n);
            return Ft.test(e) || (s = n), s && "string" == typeof s && (r = ut.filter(s, r)), r = this.length > 1 && !qt[e] ? ut.unique(r) : r, this.length > 1 && Bt.test(e) && (r = r.reverse()), this.pushStack(r)
        }
    }), ut.extend({filter: function (e, t, n) {
        return n && (e = ":not(" + e + ")"), 1 === t.length ? ut.find.matchesSelector(t[0], e) ? [t[0]] : [] : ut.find.matches(e, t)
    }, dir: function (e, n, s) {
        for (var r = [], a = e[n]; a && 9 !== a.nodeType && (s === t || 1 !== a.nodeType || !ut(a).is(s));)1 === a.nodeType && r.push(a), a = a[n];
        return r
    }, sibling: function (e, t) {
        for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
        return n
    }});
    var $t = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Wt = / jQuery\d+="(?:null|\d+)"/g, Qt = new RegExp("<(?:" + $t + ")[\\s/>]", "i"), Kt = /^\s+/, Yt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Xt = /<([\w:]+)/, Zt = /<tbody/i, Jt = /<|&#?\w+;/, en = /<(?:script|style|link)/i, tn = /^(?:checkbox|radio)$/i, nn = /checked\s*(?:[^=]|=\s*.checked.)/i, sn = /^$|\/(?:java|ecma)script/i, rn = /^true\/(.*)/, an = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, on = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: ut.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]}, un = p(Q), cn = un.appendChild(Q.createElement("div"));
    on.optgroup = on.option, on.tbody = on.tfoot = on.colgroup = on.caption = on.thead, on.th = on.td, ut.fn.extend({text: function (e) {
        return ut.access(this, function (e) {
            return e === t ? ut.text(this) : this.empty().append((this[0] && this[0].ownerDocument || Q).createTextNode(e))
        }, null, e, arguments.length)
    }, wrapAll: function (e) {
        if (ut.isFunction(e))return this.each(function (t) {
            ut(this).wrapAll(e.call(this, t))
        });
        if (this[0]) {
            var t = ut(e, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;)e = e.firstChild;
                return e
            }).append(this)
        }
        return this
    }, wrapInner: function (e) {
        return ut.isFunction(e) ? this.each(function (t) {
            ut(this).wrapInner(e.call(this, t))
        }) : this.each(function () {
            var t = ut(this), n = t.contents();
            n.length ? n.wrapAll(e) : t.append(e)
        })
    }, wrap: function (e) {
        var t = ut.isFunction(e);
        return this.each(function (n) {
            ut(this).wrapAll(t ? e.call(this, n) : e)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            ut.nodeName(this, "body") || ut(this).replaceWith(this.childNodes)
        }).end()
    }, append: function () {
        return this.domManip(arguments, !0, function (e) {
            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(e)
        })
    }, prepend: function () {
        return this.domManip(arguments, !0, function (e) {
            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(e, this.firstChild)
        })
    }, before: function () {
        return this.domManip(arguments, !1, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this)
        })
    }, after: function () {
        return this.domManip(arguments, !1, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
        })
    }, remove: function (e, t) {
        for (var n, s = 0; null != (n = this[s]); s++)(!e || ut.filter(e, [n]).length > 0) && (t || 1 !== n.nodeType || ut.cleanData(v(n)), n.parentNode && (t && ut.contains(n.ownerDocument, n) && g(v(n, "script")), n.parentNode.removeChild(n)));
        return this
    }, empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++) {
            for (1 === e.nodeType && ut.cleanData(v(e, !1)); e.firstChild;)e.removeChild(e.firstChild);
            e.options && ut.nodeName(e, "select") && (e.options.length = 0)
        }
        return this
    }, clone: function (e, t) {
        return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
            return ut.clone(this, e, t)
        })
    }, html: function (e) {
        return ut.access(this, function (e) {
            var n = this[0] || {}, s = 0, r = this.length;
            if (e === t)return 1 === n.nodeType ? n.innerHTML.replace(Wt, "") : t;
            if (!("string" != typeof e || en.test(e) || !ut.support.htmlSerialize && Qt.test(e) || !ut.support.leadingWhitespace && Kt.test(e) || on[(Xt.exec(e) || ["", ""])[1].toLowerCase()])) {
                e = e.replace(Yt, "<$1></$2>");
                try {
                    for (; r > s; s++)n = this[s] || {}, 1 === n.nodeType && (ut.cleanData(v(n, !1)), n.innerHTML = e);
                    n = 0
                } catch (a) {
                }
            }
            n && this.empty().append(e)
        }, null, e, arguments.length)
    }, replaceWith: function (e) {
        var t = ut.isFunction(e);
        return t || "string" == typeof e || (e = ut(e).not(this).detach()), this.domManip([e], !0, function (e) {
            var t = this.nextSibling, n = this.parentNode;
            n && (ut(this).remove(), n.insertBefore(e, t))
        })
    }, detach: function (e) {
        return this.remove(e, !0)
    }, domManip: function (e, n, s) {
        e = tt.apply([], e);
        var r, a, i, o, u, c, l = 0, h = this.length, p = this, g = h - 1, b = e[0], y = ut.isFunction(b);
        if (y || !(1 >= h || "string" != typeof b || ut.support.checkClone) && nn.test(b))return this.each(function (r) {
            var a = p.eq(r);
            y && (e[0] = b.call(this, r, n ? a.html() : t)), a.domManip(e, n, s)
        });
        if (h && (c = ut.buildFragment(e, this[0].ownerDocument, !1, this), r = c.firstChild, 1 === c.childNodes.length && (c = r), r)) {
            for (n = n && ut.nodeName(r, "tr"), o = ut.map(v(c, "script"), d), i = o.length; h > l; l++)a = c, l !== g && (a = ut.clone(a, !0, !0), i && ut.merge(o, v(a, "script"))), s.call(n && ut.nodeName(this[l], "table") ? f(this[l], "tbody") : this[l], a, l);
            if (i)for (u = o[o.length - 1].ownerDocument, ut.map(o, m), l = 0; i > l; l++)a = o[l], sn.test(a.type || "") && !ut._data(a, "globalEval") && ut.contains(u, a) && (a.src ? ut.ajax({url: a.src, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0}) : ut.globalEval((a.text || a.textContent || a.innerHTML || "").replace(an, "")));
            c = r = null
        }
        return this
    }}), ut.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (e, t) {
        ut.fn[e] = function (e) {
            for (var n, s = 0, r = [], a = ut(e), i = a.length - 1; i >= s; s++)n = s === i ? this : this.clone(!0), ut(a[s])[t](n), nt.apply(r, n.get());
            return this.pushStack(r)
        }
    }), ut.extend({clone: function (e, t, n) {
        var s, r, a, i, o, u = ut.contains(e.ownerDocument, e);
        if (ut.support.html5Clone || ut.isXMLDoc(e) || !Qt.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (cn.innerHTML = e.outerHTML, cn.removeChild(a = cn.firstChild)), !(ut.support.noCloneEvent && ut.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ut.isXMLDoc(e)))for (s = v(a), o = v(e), i = 0; null != (r = o[i]); ++i)s[i] && y(r, s[i]);
        if (t)if (n)for (o = o || v(e), s = s || v(a), i = 0; null != (r = o[i]); i++)b(r, s[i]); else b(e, a);
        return s = v(a, "script"), s.length > 0 && g(s, !u && v(e, "script")), s = o = r = null, a
    }, buildFragment: function (e, t, n, s) {
        for (var r, a, i, o, u, c, l, h = e.length, f = p(t), d = [], m = 0; h > m; m++)if (a = e[m], a || 0 === a)if ("object" === ut.type(a))ut.merge(d, a.nodeType ? [a] : a); else if (Jt.test(a)) {
            for (o = o || f.appendChild(t.createElement("div")), u = (Xt.exec(a) || ["", ""])[1].toLowerCase(), l = on[u] || on._default, o.innerHTML = l[1] + a.replace(Yt, "<$1></$2>") + l[2], r = l[0]; r--;)o = o.lastChild;
            if (!ut.support.leadingWhitespace && Kt.test(a) && d.push(t.createTextNode(Kt.exec(a)[0])), !ut.support.tbody)for (a = "table" !== u || Zt.test(a) ? "<table>" !== l[1] || Zt.test(a) ? 0 : o : o.firstChild, r = a && a.childNodes.length; r--;)ut.nodeName(c = a.childNodes[r], "tbody") && !c.childNodes.length && a.removeChild(c);
            for (ut.merge(d, o.childNodes), o.textContent = ""; o.firstChild;)o.removeChild(o.firstChild);
            o = f.lastChild
        } else d.push(t.createTextNode(a));
        for (o && f.removeChild(o), ut.support.appendChecked || ut.grep(v(d, "input"), x), m = 0; a = d[m++];)if ((!s || -1 === ut.inArray(a, s)) && (i = ut.contains(a.ownerDocument, a), o = v(f.appendChild(a), "script"), i && g(o), n))for (r = 0; a = o[r++];)sn.test(a.type || "") && n.push(a);
        return o = null, f
    }, cleanData: function (e, t) {
        for (var n, s, r, a, i = 0, o = ut.expando, u = ut.cache, c = ut.support.deleteExpando, l = ut.event.special; null != (n = e[i]); i++)if ((t || ut.acceptData(n)) && (r = n[o], a = r && u[r])) {
            if (a.events)for (s in a.events)l[s] ? ut.event.remove(n, s) : ut.removeEvent(n, s, a.handle);
            u[r] && (delete u[r], c ? delete n[o] : typeof n.removeAttribute !== W ? n.removeAttribute(o) : n[o] = null, J.push(r))
        }
    }});
    var ln, hn, pn, fn = /alpha\([^)]*\)/i, dn = /opacity\s*=\s*([^)]*)/, mn = /^(top|right|bottom|left)$/, gn = /^(none|table(?!-c[ea]).+)/, bn = /^margin/, yn = new RegExp("^(" + ct + ")(.*)$", "i"), vn = new RegExp("^(" + ct + ")(?!px)[a-z%]+$", "i"), xn = new RegExp("^([+-])=(" + ct + ")", "i"), _n = {BODY: "block"}, En = {position: "absolute", visibility: "hidden", display: "block"}, wn = {letterSpacing: 0, fontWeight: 400}, Tn = ["Top", "Right", "Bottom", "Left"], Cn = ["Webkit", "O", "Moz", "ms"];
    ut.fn.extend({css: function (e, n) {
        return ut.access(this, function (e, n, s) {
            var r, a, i = {}, o = 0;
            if (ut.isArray(n)) {
                for (a = hn(e), r = n.length; r > o; o++)i[n[o]] = ut.css(e, n[o], !1, a);
                return i
            }
            return s !== t ? ut.style(e, n, s) : ut.css(e, n)
        }, e, n, arguments.length > 1)
    }, show: function () {
        return w(this, !0)
    }, hide: function () {
        return w(this)
    }, toggle: function (e) {
        var t = "boolean" == typeof e;
        return this.each(function () {
            (t ? e : E(this)) ? ut(this).show() : ut(this).hide()
        })
    }}), ut.extend({cssHooks: {opacity: {get: function (e, t) {
        if (t) {
            var n = pn(e, "opacity");
            return"" === n ? "1" : n
        }
    }}}, cssNumber: {columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {"float": ut.support.cssFloat ? "cssFloat" : "styleFloat"}, style: function (e, n, s, r) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
            var a, i, o, u = ut.camelCase(n), c = e.style;
            if (n = ut.cssProps[u] || (ut.cssProps[u] = _(c, u)), o = ut.cssHooks[n] || ut.cssHooks[u], s === t)return o && "get"in o && (a = o.get(e, !1, r)) !== t ? a : c[n];
            if (i = typeof s, "string" === i && (a = xn.exec(s)) && (s = (a[1] + 1) * a[2] + parseFloat(ut.css(e, n)), i = "number"), !(null == s || "number" === i && isNaN(s) || ("number" !== i || ut.cssNumber[u] || (s += "px"), ut.support.clearCloneStyle || "" !== s || 0 !== n.indexOf("background") || (c[n] = "inherit"), o && "set"in o && (s = o.set(e, s, r)) === t)))try {
                c[n] = s
            } catch (l) {
            }
        }
    }, css: function (e, n, s, r) {
        var a, i, o, u = ut.camelCase(n);
        return n = ut.cssProps[u] || (ut.cssProps[u] = _(e.style, u)), o = ut.cssHooks[n] || ut.cssHooks[u], o && "get"in o && (i = o.get(e, !0, s)), i === t && (i = pn(e, n, r)), "normal" === i && n in wn && (i = wn[n]), "" === s || s ? (a = parseFloat(i), s === !0 || ut.isNumeric(a) ? a || 0 : i) : i
    }, swap: function (e, t, n, s) {
        var r, a, i = {};
        for (a in t)i[a] = e.style[a], e.style[a] = t[a];
        r = n.apply(e, s || []);
        for (a in t)e.style[a] = i[a];
        return r
    }}), e.getComputedStyle ? (hn = function (t) {
        return e.getComputedStyle(t, null)
    }, pn = function (e, n, s) {
        var r, a, i, o = s || hn(e), u = o ? o.getPropertyValue(n) || o[n] : t, c = e.style;
        return o && ("" !== u || ut.contains(e.ownerDocument, e) || (u = ut.style(e, n)), vn.test(u) && bn.test(n) && (r = c.width, a = c.minWidth, i = c.maxWidth, c.minWidth = c.maxWidth = c.width = u, u = o.width, c.width = r, c.minWidth = a, c.maxWidth = i)), u
    }) : Q.documentElement.currentStyle && (hn = function (e) {
        return e.currentStyle
    }, pn = function (e, n, s) {
        var r, a, i, o = s || hn(e), u = o ? o[n] : t, c = e.style;
        return null == u && c && c[n] && (u = c[n]), vn.test(u) && !mn.test(n) && (r = c.left, a = e.runtimeStyle, i = a && a.left, i && (a.left = e.currentStyle.left), c.left = "fontSize" === n ? "1em" : u, u = c.pixelLeft + "px", c.left = r, i && (a.left = i)), "" === u ? "auto" : u
    }), ut.each(["height", "width"], function (e, t) {
        ut.cssHooks[t] = {get: function (e, n, s) {
            return n ? 0 === e.offsetWidth && gn.test(ut.css(e, "display")) ? ut.swap(e, En, function () {
                return D(e, t, s)
            }) : D(e, t, s) : void 0
        }, set: function (e, n, s) {
            var r = s && hn(e);
            return T(e, n, s ? C(e, t, s, ut.support.boxSizing && "border-box" === ut.css(e, "boxSizing", !1, r), r) : 0)
        }}
    }), ut.support.opacity || (ut.cssHooks.opacity = {get: function (e, t) {
        return dn.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
    }, set: function (e, t) {
        var n = e.style, s = e.currentStyle, r = ut.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", a = s && s.filter || n.filter || "";
        n.zoom = 1, (t >= 1 || "" === t) && "" === ut.trim(a.replace(fn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || s && !s.filter) || (n.filter = fn.test(a) ? a.replace(fn, r) : a + " " + r)
    }}), ut(function () {
        ut.support.reliableMarginRight || (ut.cssHooks.marginRight = {get: function (e, t) {
            return t ? ut.swap(e, {display: "inline-block"}, pn, [e, "marginRight"]) : void 0
        }}), !ut.support.pixelPosition && ut.fn.position && ut.each(["top", "left"], function (e, t) {
            ut.cssHooks[t] = {get: function (e, n) {
                return n ? (n = pn(e, t), vn.test(n) ? ut(e).position()[t] + "px" : n) : void 0
            }}
        })
    }), ut.expr && ut.expr.filters && (ut.expr.filters.hidden = function (e) {
        return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !ut.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ut.css(e, "display"))
    }, ut.expr.filters.visible = function (e) {
        return!ut.expr.filters.hidden(e)
    }), ut.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        ut.cssHooks[e + t] = {expand: function (n) {
            for (var s = 0, r = {}, a = "string" == typeof n ? n.split(" ") : [n]; 4 > s; s++)r[e + Tn[s] + t] = a[s] || a[s - 2] || a[0];
            return r
        }}, bn.test(e) || (ut.cssHooks[e + t].set = T)
    });
    var Dn = /%20/g, In = /\[\]$/, Sn = /\r?\n/g, kn = /^(?:submit|button|image|reset|file)$/i, Nn = /^(?:input|select|textarea|keygen)/i;
    ut.fn.extend({serialize: function () {
        return ut.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            var e = ut.prop(this, "elements");
            return e ? ut.makeArray(e) : this
        }).filter(function () {
            var e = this.type;
            return this.name && !ut(this).is(":disabled") && Nn.test(this.nodeName) && !kn.test(e) && (this.checked || !tn.test(e))
        }).map(function (e, t) {
            var n = ut(this).val();
            return null == n ? null : ut.isArray(n) ? ut.map(n, function (e) {
                return{name: t.name, value: e.replace(Sn, "\r\n")}
            }) : {name: t.name, value: n.replace(Sn, "\r\n")}
        }).get()
    }}), ut.param = function (e, n) {
        var s, r = [], a = function (e, t) {
            t = ut.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (n === t && (n = ut.ajaxSettings && ut.ajaxSettings.traditional), ut.isArray(e) || e.jquery && !ut.isPlainObject(e))ut.each(e, function () {
            a(this.name, this.value)
        }); else for (s in e)k(s, e[s], n, a);
        return r.join("&").replace(Dn, "+")
    }, ut.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        ut.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), ut.fn.hover = function (e, t) {
        return this.mouseenter(e).mouseleave(t || e)
    };
    var An, Pn, Rn = ut.now(), Ln = /\?/, Mn = /#.*$/, On = /([?&])_=[^&]*/, jn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Un = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Hn = /^(?:GET|HEAD)$/, Vn = /^\/\//, Fn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Bn = ut.fn.load, Gn = {}, zn = {}, qn = "*/".concat("*");
    try {
        Pn = K.href
    } catch ($n) {
        Pn = Q.createElement("a"), Pn.href = "", Pn = Pn.href
    }
    An = Fn.exec(Pn.toLowerCase()) || [], ut.fn.load = function (e, n, s) {
        if ("string" != typeof e && Bn)return Bn.apply(this, arguments);
        var r, a, i, o = this, u = e.indexOf(" ");
        return u >= 0 && (r = e.slice(u, e.length), e = e.slice(0, u)), ut.isFunction(n) ? (s = n, n = t) : n && "object" == typeof n && (i = "POST"), o.length > 0 && ut.ajax({url: e, type: i, dataType: "html", data: n}).done(function (e) {
            a = arguments, o.html(r ? ut("<div>").append(ut.parseHTML(e)).find(r) : e)
        }).complete(s && function (e, t) {
            o.each(s, a || [e.responseText, t, e])
        }), this
    }, ut.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        ut.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), ut.each(["get", "post"], function (e, n) {
        ut[n] = function (e, s, r, a) {
            return ut.isFunction(s) && (a = a || r, r = s, s = t), ut.ajax({url: e, type: n, dataType: a, data: s, success: r})
        }
    }), ut.extend({active: 0, lastModified: {}, etag: {}, ajaxSettings: {url: Pn, type: "GET", isLocal: Un.test(An[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: {"*": qn, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript"}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText"}, converters: {"* text": e.String, "text html": !0, "text json": ut.parseJSON, "text xml": ut.parseXML}, flatOptions: {url: !0, context: !0}}, ajaxSetup: function (e, t) {
        return t ? P(P(e, ut.ajaxSettings), t) : P(ut.ajaxSettings, e)
    }, ajaxPrefilter: N(Gn), ajaxTransport: N(zn), ajax: function (e, n) {
        function s(e, n, s, r) {
            var a, h, y, v, _, w = n;
            2 !== x && (x = 2, u && clearTimeout(u), l = t, o = r || "", E.readyState = e > 0 ? 4 : 0, s && (v = R(p, E, s)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && (_ = E.getResponseHeader("Last-Modified"), _ && (ut.lastModified[i] = _), _ = E.getResponseHeader("etag"), _ && (ut.etag[i] = _)), 204 === e ? (a = !0, w = "nocontent") : 304 === e ? (a = !0, w = "notmodified") : (a = L(p, v), w = a.state, h = a.data, y = a.error, a = !y)) : (y = w, (e || !w) && (w = "error", 0 > e && (e = 0))), E.status = e, E.statusText = (n || w) + "", a ? m.resolveWith(f, [h, w, E]) : m.rejectWith(f, [E, w, y]), E.statusCode(b), b = t, c && d.trigger(a ? "ajaxSuccess" : "ajaxError", [E, p, a ? h : y]), g.fireWith(f, [E, w]), c && (d.trigger("ajaxComplete", [E, p]), --ut.active || ut.event.trigger("ajaxStop")))
        }

        "object" == typeof e && (n = e, e = t), n = n || {};
        var r, a, i, o, u, c, l, h, p = ut.ajaxSetup({}, n), f = p.context || p, d = p.context && (f.nodeType || f.jquery) ? ut(f) : ut.event, m = ut.Deferred(), g = ut.Callbacks("once memory"), b = p.statusCode || {}, y = {}, v = {}, x = 0, _ = "canceled", E = {readyState: 0, getResponseHeader: function (e) {
            var t;
            if (2 === x) {
                if (!h)for (h = {}; t = jn.exec(o);)h[t[1].toLowerCase()] = t[2];
                t = h[e.toLowerCase()]
            }
            return null == t ? null : t
        }, getAllResponseHeaders: function () {
            return 2 === x ? o : null
        }, setRequestHeader: function (e, t) {
            var n = e.toLowerCase();
            return x || (e = v[n] = v[n] || e, y[e] = t), this
        }, overrideMimeType: function (e) {
            return x || (p.mimeType = e), this
        }, statusCode: function (e) {
            var t;
            if (e)if (2 > x)for (t in e)b[t] = [b[t], e[t]]; else E.always(e[E.status]);
            return this
        }, abort: function (e) {
            var t = e || _;
            return l && l.abort(t), s(0, t), this
        }};
        if (m.promise(E).complete = g.add, E.success = E.done, E.error = E.fail, p.url = ((e || p.url || Pn) + "").replace(Mn, "").replace(Vn, An[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ut.trim(p.dataType || "*").toLowerCase().match(lt) || [""], null == p.crossDomain && (r = Fn.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === An[1] && r[2] === An[2] && (r[3] || ("http:" === r[1] ? 80 : 443)) == (An[3] || ("http:" === An[1] ? 80 : 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = ut.param(p.data, p.traditional)), A(Gn, p, n, E), 2 === x)return E;
        c = p.global, c && 0 === ut.active++ && ut.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Hn.test(p.type), i = p.url, p.hasContent || (p.data && (i = p.url += (Ln.test(i) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = On.test(i) ? i.replace(On, "$1_=" + Rn++) : i + (Ln.test(i) ? "&" : "?") + "_=" + Rn++)), p.ifModified && (ut.lastModified[i] && E.setRequestHeader("If-Modified-Since", ut.lastModified[i]), ut.etag[i] && E.setRequestHeader("If-None-Match", ut.etag[i])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && E.setRequestHeader("Content-Type", p.contentType), E.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + qn + "; q=0.01" : "") : p.accepts["*"]);
        for (a in p.headers)E.setRequestHeader(a, p.headers[a]);
        if (p.beforeSend && (p.beforeSend.call(f, E, p) === !1 || 2 === x))return E.abort();
        _ = "abort";
        for (a in{success: 1, error: 1, complete: 1})E[a](p[a]);
        if (l = A(zn, p, n, E)) {
            E.readyState = 1, c && d.trigger("ajaxSend", [E, p]), p.async && p.timeout > 0 && (u = setTimeout(function () {
                E.abort("timeout")
            }, p.timeout));
            try {
                x = 1, l.send(y, s)
            } catch (w) {
                if (!(2 > x))throw w;
                s(-1, w)
            }
        } else s(-1, "No Transport");
        return E
    }, getScript: function (e, n) {
        return ut.get(e, t, n, "script")
    }, getJSON: function (e, t, n) {
        return ut.get(e, t, n, "json")
    }}), ut.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /(?:java|ecma)script/}, converters: {"text script": function (e) {
        return ut.globalEval(e), e
    }}}), ut.ajaxPrefilter("script", function (e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), ut.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var n, s = Q.head || ut("head")[0] || Q.documentElement;
            return{send: function (t, r) {
                n = Q.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, t) {
                    (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || r(200, "success"))
                }, s.insertBefore(n, s.firstChild)
            }, abort: function () {
                n && n.onload(t, !0)
            }}
        }
    });
    var Wn = [], Qn = /(=)\?(?=&|$)|\?\?/;
    ut.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
        var e = Wn.pop() || ut.expando + "_" + Rn++;
        return this[e] = !0, e
    }}), ut.ajaxPrefilter("json jsonp", function (n, s, r) {
        var a, i, o, u = n.jsonp !== !1 && (Qn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Qn.test(n.data) && "data");
        return u || "jsonp" === n.dataTypes[0] ? (a = n.jsonpCallback = ut.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(Qn, "$1" + a) : n.jsonp !== !1 && (n.url += (Ln.test(n.url) ? "&" : "?") + n.jsonp + "=" + a), n.converters["script json"] = function () {
            return o || ut.error(a + " was not called"), o[0]
        }, n.dataTypes[0] = "json", i = e[a], e[a] = function () {
            o = arguments
        }, r.always(function () {
            e[a] = i, n[a] && (n.jsonpCallback = s.jsonpCallback, Wn.push(a)), o && ut.isFunction(i) && i(o[0]), o = i = t
        }), "script") : void 0
    });
    var Kn, Yn, Xn = 0, Zn = e.ActiveXObject && function () {
        var e;
        for (e in Kn)Kn[e](t, !0)
    };
    ut.ajaxSettings.xhr = e.ActiveXObject ? function () {
        return!this.isLocal && M() || O()
    } : M, Yn = ut.ajaxSettings.xhr(), ut.support.cors = !!Yn && "withCredentials"in Yn, Yn = ut.support.ajax = !!Yn, Yn && ut.ajaxTransport(function (n) {
        if (!n.crossDomain || ut.support.cors) {
            var s;
            return{send: function (r, a) {
                var i, o, u = n.xhr();
                if (n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async), n.xhrFields)for (o in n.xhrFields)u[o] = n.xhrFields[o];
                n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), n.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                try {
                    for (o in r)u.setRequestHeader(o, r[o])
                } catch (c) {
                }
                u.send(n.hasContent && n.data || null), s = function (e, r) {
                    var o, c, l, h;
                    try {
                        if (s && (r || 4 === u.readyState))if (s = t, i && (u.onreadystatechange = ut.noop, Zn && delete Kn[i]), r)4 !== u.readyState && u.abort(); else {
                            h = {}, o = u.status, c = u.getAllResponseHeaders(), "string" == typeof u.responseText && (h.text = u.responseText);
                            try {
                                l = u.statusText
                            } catch (p) {
                                l = ""
                            }
                            o || !n.isLocal || n.crossDomain ? 1223 === o && (o = 204) : o = h.text ? 200 : 404
                        }
                    } catch (f) {
                        r || a(-1, f)
                    }
                    h && a(o, l, h, c)
                }, n.async ? 4 === u.readyState ? setTimeout(s) : (i = ++Xn, Zn && (Kn || (Kn = {}, ut(e).unload(Zn)), Kn[i] = s), u.onreadystatechange = s) : s()
            }, abort: function () {
                s && s(t, !0)
            }}
        }
    });
    var Jn, es, ts = /^(?:toggle|show|hide)$/, ns = new RegExp("^(?:([+-])=|)(" + ct + ")([a-z%]*)$", "i"), ss = /queueHooks$/, rs = [F], as = {"*": [function (e, t) {
        var n, s, r = this.createTween(e, t), a = ns.exec(t), i = r.cur(), o = +i || 0, u = 1, c = 20;
        if (a) {
            if (n = +a[2], s = a[3] || (ut.cssNumber[e] ? "" : "px"), "px" !== s && o) {
                o = ut.css(r.elem, e, !0) || n || 1;
                do u = u || ".5", o /= u, ut.style(r.elem, e, o + s); while (u !== (u = r.cur() / i) && 1 !== u && --c)
            }
            r.unit = s, r.start = o, r.end = a[1] ? o + (a[1] + 1) * n : n
        }
        return r
    }]};
    ut.Animation = ut.extend(H, {tweener: function (e, t) {
        ut.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
        for (var n, s = 0, r = e.length; r > s; s++)n = e[s], as[n] = as[n] || [], as[n].unshift(t)
    }, prefilter: function (e, t) {
        t ? rs.unshift(e) : rs.push(e)
    }}), ut.Tween = B, B.prototype = {constructor: B, init: function (e, t, n, s, r, a) {
        this.elem = e, this.prop = n, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = s, this.unit = a || (ut.cssNumber[n] ? "" : "px")
    }, cur: function () {
        var e = B.propHooks[this.prop];
        return e && e.get ? e.get(this) : B.propHooks._default.get(this)
    }, run: function (e) {
        var t, n = B.propHooks[this.prop];
        return this.pos = t = this.options.duration ? ut.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : B.propHooks._default.set(this), this
    }}, B.prototype.init.prototype = B.prototype, B.propHooks = {_default: {get: function (e) {
        var t;
        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ut.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
    }, set: function (e) {
        ut.fx.step[e.prop] ? ut.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ut.cssProps[e.prop]] || ut.cssHooks[e.prop]) ? ut.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
    }}}, B.propHooks.scrollTop = B.propHooks.scrollLeft = {set: function (e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }}, ut.each(["toggle", "show", "hide"], function (e, t) {
        var n = ut.fn[t];
        ut.fn[t] = function (e, s, r) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(G(t, !0), e, s, r)
        }
    }), ut.fn.extend({fadeTo: function (e, t, n, s) {
        return this.filter(E).css("opacity", 0).show().end().animate({opacity: t}, e, n, s)
    }, animate: function (e, t, n, s) {
        var r = ut.isEmptyObject(e), a = ut.speed(t, n, s), i = function () {
            var t = H(this, ut.extend({}, e), a);
            i.finish = function () {
                t.stop(!0)
            }, (r || ut._data(this, "finish")) && t.stop(!0)
        };
        return i.finish = i, r || a.queue === !1 ? this.each(i) : this.queue(a.queue, i)
    }, stop: function (e, n, s) {
        var r = function (e) {
            var t = e.stop;
            delete e.stop, t(s)
        };
        return"string" != typeof e && (s = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
            var t = !0, n = null != e && e + "queueHooks", a = ut.timers, i = ut._data(this);
            if (n)i[n] && i[n].stop && r(i[n]); else for (n in i)i[n] && i[n].stop && ss.test(n) && r(i[n]);
            for (n = a.length; n--;)a[n].elem !== this || null != e && a[n].queue !== e || (a[n].anim.stop(s), t = !1, a.splice(n, 1));
            (t || !s) && ut.dequeue(this, e)
        })
    }, finish: function (e) {
        return e !== !1 && (e = e || "fx"), this.each(function () {
            var t, n = ut._data(this), s = n[e + "queue"], r = n[e + "queueHooks"], a = ut.timers, i = s ? s.length : 0;
            for (n.finish = !0, ut.queue(this, e, []), r && r.cur && r.cur.finish && r.cur.finish.call(this), t = a.length; t--;)a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0), a.splice(t, 1));
            for (t = 0; i > t; t++)s[t] && s[t].finish && s[t].finish.call(this);
            delete n.finish
        })
    }}), ut.each({slideDown: G("show"), slideUp: G("hide"), slideToggle: G("toggle"), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (e, t) {
        ut.fn[e] = function (e, n, s) {
            return this.animate(t, e, n, s)
        }
    }), ut.speed = function (e, t, n) {
        var s = e && "object" == typeof e ? ut.extend({}, e) : {complete: n || !n && t || ut.isFunction(e) && e, duration: e, easing: n && t || t && !ut.isFunction(t) && t};
        return s.duration = ut.fx.off ? 0 : "number" == typeof s.duration ? s.duration : s.duration in ut.fx.speeds ? ut.fx.speeds[s.duration] : ut.fx.speeds._default, (null == s.queue || s.queue === !0) && (s.queue = "fx"), s.old = s.complete, s.complete = function () {
            ut.isFunction(s.old) && s.old.call(this), s.queue && ut.dequeue(this, s.queue)
        }, s
    }, ut.easing = {linear: function (e) {
        return e
    }, swing: function (e) {
        return.5 - Math.cos(e * Math.PI) / 2
    }}, ut.timers = [], ut.fx = B.prototype.init, ut.fx.tick = function () {
        var e, n = ut.timers, s = 0;
        for (Jn = ut.now(); n.length > s; s++)e = n[s], e() || n[s] !== e || n.splice(s--, 1);
        n.length || ut.fx.stop(), Jn = t
    }, ut.fx.timer = function (e) {
        e() && ut.timers.push(e) && ut.fx.start()
    }, ut.fx.interval = 13, ut.fx.start = function () {
        es || (es = setInterval(ut.fx.tick, ut.fx.interval))
    }, ut.fx.stop = function () {
        clearInterval(es), es = null
    }, ut.fx.speeds = {slow: 600, fast: 200, _default: 400}, ut.fx.step = {}, ut.expr && ut.expr.filters && (ut.expr.filters.animated = function (e) {
        return ut.grep(ut.timers,function (t) {
            return e === t.elem
        }).length
    }), ut.fn.offset = function (e) {
        if (arguments.length)return e === t ? this : this.each(function (t) {
            ut.offset.setOffset(this, e, t)
        });
        var n, s, r = {top: 0, left: 0}, a = this[0], i = a && a.ownerDocument;
        if (i)return n = i.documentElement, ut.contains(n, a) ? (typeof a.getBoundingClientRect !== W && (r = a.getBoundingClientRect()), s = z(i), {top: r.top + (s.pageYOffset || n.scrollTop) - (n.clientTop || 0), left: r.left + (s.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)}) : r
    }, ut.offset = {setOffset: function (e, t, n) {
        var s = ut.css(e, "position");
        "static" === s && (e.style.position = "relative");
        var r, a, i = ut(e), o = i.offset(), u = ut.css(e, "top"), c = ut.css(e, "left"), l = ("absolute" === s || "fixed" === s) && ut.inArray("auto", [u, c]) > -1, h = {}, p = {};
        l ? (p = i.position(), r = p.top, a = p.left) : (r = parseFloat(u) || 0, a = parseFloat(c) || 0), ut.isFunction(t) && (t = t.call(e, n, o)), null != t.top && (h.top = t.top - o.top + r), null != t.left && (h.left = t.left - o.left + a), "using"in t ? t.using.call(e, h) : i.css(h)
    }}, ut.fn.extend({position: function () {
        if (this[0]) {
            var e, t, n = {top: 0, left: 0}, s = this[0];
            return"fixed" === ut.css(s, "position") ? t = s.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ut.nodeName(e[0], "html") || (n = e.offset()), n.top += ut.css(e[0], "borderTopWidth", !0), n.left += ut.css(e[0], "borderLeftWidth", !0)), {top: t.top - n.top - ut.css(s, "marginTop", !0), left: t.left - n.left - ut.css(s, "marginLeft", !0)}
        }
    }, offsetParent: function () {
        return this.map(function () {
            for (var e = this.offsetParent || Q.documentElement; e && !ut.nodeName(e, "html") && "static" === ut.css(e, "position");)e = e.offsetParent;
            return e || Q.documentElement
        })
    }}), ut.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, n) {
        var s = /Y/.test(n);
        ut.fn[e] = function (r) {
            return ut.access(this, function (e, r, a) {
                var i = z(e);
                return a === t ? i ? n in i ? i[n] : i.document.documentElement[r] : e[r] : (i ? i.scrollTo(s ? ut(i).scrollLeft() : a, s ? a : ut(i).scrollTop()) : e[r] = a, void 0)
            }, e, r, arguments.length, null)
        }
    }), ut.each({Height: "height", Width: "width"}, function (e, n) {
        ut.each({padding: "inner" + e, content: n, "": "outer" + e}, function (s, r) {
            ut.fn[r] = function (r, a) {
                var i = arguments.length && (s || "boolean" != typeof r), o = s || (r === !0 || a === !0 ? "margin" : "border");
                return ut.access(this, function (n, s, r) {
                    var a;
                    return ut.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (a = n.documentElement, Math.max(n.body["scroll" + e], a["scroll" + e], n.body["offset" + e], a["offset" + e], a["client" + e])) : r === t ? ut.css(n, s, o) : ut.style(n, s, r, o)
                }, n, i ? r : t, i, null)
            }
        })
    }), e.jQuery = e.$ = ut, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return ut
    })
})(window);