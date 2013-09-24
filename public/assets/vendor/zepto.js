(function (e) {
    String.prototype.trim === e && (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    }), Array.prototype.reduce === e && (Array.prototype.reduce = function (t) {
        if (void 0 === this || null === this)throw new TypeError;
        var n, s = Object(this), r = s.length >>> 0, a = 0;
        if ("function" != typeof t)throw new TypeError;
        if (0 == r && 1 == arguments.length)throw new TypeError;
        if (arguments.length >= 2)n = arguments[1]; else for (; ;) {
            if (a in s) {
                n = s[a++];
                break
            }
            if (++a >= r)throw new TypeError
        }
        for (; r > a;)a in s && (n = t.call(e, n, s[a], a, s)), a++;
        return n
    })
})();
var Zepto = function () {
    function e(e) {
        return null == e ? String(e) : $[K.call(e)] || "object"
    }

    function t(t) {
        return"function" == e(t)
    }

    function n(e) {
        return null != e && e == e.window
    }

    function s(e) {
        return null != e && e.nodeType == e.DOCUMENT_NODE
    }

    function r(t) {
        return"object" == e(t)
    }

    function a(e) {
        return r(e) && !n(e) && e.__proto__ == Object.prototype
    }

    function i(e) {
        return e instanceof Array
    }

    function o(e) {
        return"number" == typeof e.length
    }

    function u(e) {
        return M.call(e, function (e) {
            return null != e
        })
    }

    function l(e) {
        return e.length > 0 ? T.fn.concat.apply([], e) : e
    }

    function c(e) {
        return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function h(e) {
        return e in z ? z[e] : z[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
    }

    function d(e, t) {
        return"number" != typeof t || L[c(e)] ? t : t + "px"
    }

    function p(e) {
        var t, n;
        return N[e] || (t = A.createElement(e), A.body.appendChild(t), n = P(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), "none" == n && (n = "block"), N[e] = n), N[e]
    }

    function f(e) {
        return"children"in e ? I.call(e.children) : T.map(e.childNodes, function (e) {
            return 1 == e.nodeType ? e : void 0
        })
    }

    function m(e, t, n) {
        for (k in t)n && (a(t[k]) || i(t[k])) ? (a(t[k]) && !a(e[k]) && (e[k] = {}), i(t[k]) && !i(e[k]) && (e[k] = []), m(e[k], t[k], n)) : t[k] !== x && (e[k] = t[k])
    }

    function g(e, t) {
        return t === x ? T(e) : T(e).filter(t)
    }

    function v(e, n, s, r) {
        return t(n) ? n.call(e, s, r) : n
    }

    function b(e, t, n) {
        null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
    }

    function _(e, t) {
        var n = e.className, s = n && n.baseVal !== x;
        return t === x ? s ? n.baseVal : n : (s ? n.baseVal = t : e.className = t, void 0)
    }

    function y(e) {
        var t;
        try {
            return e ? "true" == e || ("false" == e ? !1 : "null" == e ? null : isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? T.parseJSON(e) : e : t) : e
        } catch (n) {
            return e
        }
    }

    function w(e, t) {
        t(e);
        for (var n in e.childNodes)w(e.childNodes[n], t)
    }

    var x, k, T, D, E, C, S = [], I = S.slice, M = S.filter, A = window.document, N = {}, z = {}, P = A.defaultView.getComputedStyle, L = {"column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1}, j = /^\s*<(\w+|!)[^>]*>/, O = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, R = /^(?:body|html)$/i, U = ["val", "css", "html", "text", "data", "width", "height", "offset"], F = ["after", "prepend", "before", "append"], Y = A.createElement("table"), H = A.createElement("tr"), V = {tr: A.createElement("tbody"), tbody: Y, thead: Y, tfoot: Y, td: H, th: H, "*": A.createElement("div")}, B = /complete|loaded|interactive/, G = /^\.([\w-]+)$/, q = /^#([\w-]*)$/, W = /^[\w-]+$/, $ = {}, K = $.toString, Z = {}, Q = A.createElement("div");
    return Z.matches = function (e, t) {
        if (!e || 1 !== e.nodeType)return!1;
        var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
        if (n)return n.call(e, t);
        var s, r = e.parentNode, a = !r;
        return a && (r = Q).appendChild(e), s = ~Z.qsa(r, t).indexOf(e), a && Q.removeChild(e), s
    }, E = function (e) {
        return e.replace(/-+(.)?/g, function (e, t) {
            return t ? t.toUpperCase() : ""
        })
    }, C = function (e) {
        return M.call(e, function (t, n) {
            return e.indexOf(t) == n
        })
    }, Z.fragment = function (e, t, n) {
        e.replace && (e = e.replace(O, "<$1></$2>")), t === x && (t = j.test(e) && RegExp.$1), t in V || (t = "*");
        var s, r, i = V[t];
        return i.innerHTML = "" + e, r = T.each(I.call(i.childNodes), function () {
            i.removeChild(this)
        }), a(n) && (s = T(r), T.each(n, function (e, t) {
            U.indexOf(e) > -1 ? s[e](t) : s.attr(e, t)
        })), r
    }, Z.Z = function (e, t) {
        return e = e || [], e.__proto__ = T.fn, e.selector = t || "", e
    }, Z.isZ = function (e) {
        return e instanceof Z.Z
    }, Z.init = function (e, n) {
        if (e) {
            if (t(e))return T(A).ready(e);
            if (Z.isZ(e))return e;
            var s;
            if (i(e))s = u(e); else if (r(e))s = [a(e) ? T.extend({}, e) : e], e = null; else if (j.test(e))s = Z.fragment(e.trim(), RegExp.$1, n), e = null; else {
                if (n !== x)return T(n).find(e);
                s = Z.qsa(A, e)
            }
            return Z.Z(s, e)
        }
        return Z.Z()
    }, T = function (e, t) {
        return Z.init(e, t)
    }, T.extend = function (e) {
        var t, n = I.call(arguments, 1);
        return"boolean" == typeof e && (t = e, e = n.shift()), n.forEach(function (n) {
            m(e, n, t)
        }), e
    }, Z.qsa = function (e, t) {
        var n;
        return s(e) && q.test(t) ? (n = e.getElementById(RegExp.$1)) ? [n] : [] : 1 !== e.nodeType && 9 !== e.nodeType ? [] : I.call(G.test(t) ? e.getElementsByClassName(RegExp.$1) : W.test(t) ? e.getElementsByTagName(t) : e.querySelectorAll(t))
    }, T.contains = function (e, t) {
        return e !== t && e.contains(t)
    }, T.type = e, T.isFunction = t, T.isWindow = n, T.isArray = i, T.isPlainObject = a, T.isEmptyObject = function (e) {
        var t;
        for (t in e)return!1;
        return!0
    }, T.inArray = function (e, t, n) {
        return S.indexOf.call(t, e, n)
    }, T.camelCase = E, T.trim = function (e) {
        return e.trim()
    }, T.uuid = 0, T.support = {}, T.expr = {}, T.map = function (e, t) {
        var n, s, r, a = [];
        if (o(e))for (s = 0; e.length > s; s++)n = t(e[s], s), null != n && a.push(n); else for (r in e)n = t(e[r], r), null != n && a.push(n);
        return l(a)
    }, T.each = function (e, t) {
        var n, s;
        if (o(e)) {
            for (n = 0; e.length > n; n++)if (t.call(e[n], n, e[n]) === !1)return e
        } else for (s in e)if (t.call(e[s], s, e[s]) === !1)return e;
        return e
    }, T.grep = function (e, t) {
        return M.call(e, t)
    }, window.JSON && (T.parseJSON = JSON.parse), T.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        $["[object " + t + "]"] = t.toLowerCase()
    }), T.fn = {forEach: S.forEach, reduce: S.reduce, push: S.push, sort: S.sort, indexOf: S.indexOf, concat: S.concat, map: function (e) {
        return T(T.map(this, function (t, n) {
            return e.call(t, n, t)
        }))
    }, slice: function () {
        return T(I.apply(this, arguments))
    }, ready: function (e) {
        return B.test(A.readyState) ? e(T) : A.addEventListener("DOMContentLoaded", function () {
            e(T)
        }, !1), this
    }, get: function (e) {
        return e === x ? I.call(this) : this[e >= 0 ? e : e + this.length]
    }, toArray: function () {
        return this.get()
    }, size: function () {
        return this.length
    }, remove: function () {
        return this.each(function () {
            null != this.parentNode && this.parentNode.removeChild(this)
        })
    }, each: function (e) {
        return S.every.call(this, function (t, n) {
            return e.call(t, n, t) !== !1
        }), this
    }, filter: function (e) {
        return t(e) ? this.not(this.not(e)) : T(M.call(this, function (t) {
            return Z.matches(t, e)
        }))
    }, add: function (e, t) {
        return T(C(this.concat(T(e, t))))
    }, is: function (e) {
        return this.length > 0 && Z.matches(this[0], e)
    }, not: function (e) {
        var n = [];
        if (t(e) && e.call !== x)this.each(function (t) {
            e.call(this, t) || n.push(this)
        }); else {
            var s = "string" == typeof e ? this.filter(e) : o(e) && t(e.item) ? I.call(e) : T(e);
            this.forEach(function (e) {
                0 > s.indexOf(e) && n.push(e)
            })
        }
        return T(n)
    }, has: function (e) {
        return this.filter(function () {
            return r(e) ? T.contains(this, e) : T(this).find(e).size()
        })
    }, eq: function (e) {
        return-1 === e ? this.slice(e) : this.slice(e, +e + 1)
    }, first: function () {
        var e = this[0];
        return e && !r(e) ? e : T(e)
    }, last: function () {
        var e = this[this.length - 1];
        return e && !r(e) ? e : T(e)
    }, find: function (e) {
        var t, n = this;
        return t = "object" == typeof e ? T(e).filter(function () {
            var e = this;
            return S.some.call(n, function (t) {
                return T.contains(t, e)
            })
        }) : 1 == this.length ? T(Z.qsa(this[0], e)) : this.map(function () {
            return Z.qsa(this, e)
        })
    }, closest: function (e, t) {
        var n = this[0], r = !1;
        for ("object" == typeof e && (r = T(e)); n && !(r ? r.indexOf(n) >= 0 : Z.matches(n, e));)n = n !== t && !s(n) && n.parentNode;
        return T(n)
    }, parents: function (e) {
        for (var t = [], n = this; n.length > 0;)n = T.map(n, function (e) {
            return(e = e.parentNode) && !s(e) && 0 > t.indexOf(e) ? (t.push(e), e) : void 0
        });
        return g(t, e)
    }, parent: function (e) {
        return g(C(this.pluck("parentNode")), e)
    }, children: function (e) {
        return g(this.map(function () {
            return f(this)
        }), e)
    }, contents: function () {
        return this.map(function () {
            return I.call(this.childNodes)
        })
    }, siblings: function (e) {
        return g(this.map(function (e, t) {
            return M.call(f(t.parentNode), function (e) {
                return e !== t
            })
        }), e)
    }, empty: function () {
        return this.each(function () {
            this.innerHTML = ""
        })
    }, pluck: function (e) {
        return T.map(this, function (t) {
            return t[e]
        })
    }, show: function () {
        return this.each(function () {
            "none" == this.style.display && (this.style.display = null), "none" == P(this, "").getPropertyValue("display") && (this.style.display = p(this.nodeName))
        })
    }, replaceWith: function (e) {
        return this.before(e).remove()
    }, wrap: function (e) {
        var n = t(e);
        if (this[0] && !n)var s = T(e).get(0), r = s.parentNode || this.length > 1;
        return this.each(function (t) {
            T(this).wrapAll(n ? e.call(this, t) : r ? s.cloneNode(!0) : s)
        })
    }, wrapAll: function (e) {
        if (this[0]) {
            T(this[0]).before(e = T(e));
            for (var t; (t = e.children()).length;)e = t.first();
            T(e).append(this)
        }
        return this
    }, wrapInner: function (e) {
        var n = t(e);
        return this.each(function (t) {
            var s = T(this), r = s.contents(), a = n ? e.call(this, t) : e;
            r.length ? r.wrapAll(a) : s.append(a)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            T(this).replaceWith(T(this).children())
        }), this
    }, clone: function () {
        return this.map(function () {
            return this.cloneNode(!0)
        })
    }, hide: function () {
        return this.css("display", "none")
    }, toggle: function (e) {
        return this.each(function () {
            var t = T(this);
            (e === x ? "none" == t.css("display") : e) ? t.show() : t.hide()
        })
    }, prev: function (e) {
        return T(this.pluck("previousElementSibling")).filter(e || "*")
    }, next: function (e) {
        return T(this.pluck("nextElementSibling")).filter(e || "*")
    }, html: function (e) {
        return e === x ? this.length > 0 ? this[0].innerHTML : null : this.each(function (t) {
            var n = this.innerHTML;
            T(this).empty().append(v(this, e, t, n))
        })
    }, text: function (e) {
        return e === x ? this.length > 0 ? this[0].textContent : null : this.each(function () {
            this.textContent = e
        })
    }, attr: function (e, t) {
        var n;
        return"string" == typeof e && t === x ? 0 == this.length || 1 !== this[0].nodeType ? x : "value" == e && "INPUT" == this[0].nodeName ? this.val() : !(n = this[0].getAttribute(e)) && e in this[0] ? this[0][e] : n : this.each(function (n) {
            if (1 === this.nodeType)if (r(e))for (k in e)b(this, k, e[k]); else b(this, e, v(this, t, n, this.getAttribute(e)))
        })
    }, removeAttr: function (e) {
        return this.each(function () {
            1 === this.nodeType && b(this, e)
        })
    }, prop: function (e, t) {
        return t === x ? this[0] && this[0][e] : this.each(function (n) {
            this[e] = v(this, t, n, this[e])
        })
    }, data: function (e, t) {
        var n = this.attr("data-" + c(e), t);
        return null !== n ? y(n) : x
    }, val: function (e) {
        return e === x ? this[0] && (this[0].multiple ? T(this[0]).find("option").filter(function () {
            return this.selected
        }).pluck("value") : this[0].value) : this.each(function (t) {
            this.value = v(this, e, t, this.value)
        })
    }, offset: function (e) {
        if (e)return this.each(function (t) {
            var n = T(this), s = v(this, e, t, n.offset()), r = n.offsetParent().offset(), a = {top: s.top - r.top, left: s.left - r.left};
            "static" == n.css("position") && (a.position = "relative"), n.css(a)
        });
        if (0 == this.length)return null;
        var t = this[0].getBoundingClientRect();
        return{left: t.left + window.pageXOffset, top: t.top + window.pageYOffset, width: Math.round(t.width), height: Math.round(t.height)}
    }, css: function (t, n) {
        if (2 > arguments.length && "string" == typeof t)return this[0] && (this[0].style[E(t)] || P(this[0], "").getPropertyValue(t));
        var s = "";
        if ("string" == e(t))n || 0 === n ? s = c(t) + ":" + d(t, n) : this.each(function () {
            this.style.removeProperty(c(t))
        }); else for (k in t)t[k] || 0 === t[k] ? s += c(k) + ":" + d(k, t[k]) + ";" : this.each(function () {
            this.style.removeProperty(c(k))
        });
        return this.each(function () {
            this.style.cssText += ";" + s
        })
    }, index: function (e) {
        return e ? this.indexOf(T(e)[0]) : this.parent().children().indexOf(this[0])
    }, hasClass: function (e) {
        return S.some.call(this, function (e) {
            return this.test(_(e))
        }, h(e))
    }, addClass: function (e) {
        return this.each(function (t) {
            D = [];
            var n = _(this), s = v(this, e, t, n);
            s.split(/\s+/g).forEach(function (e) {
                T(this).hasClass(e) || D.push(e)
            }, this), D.length && _(this, n + (n ? " " : "") + D.join(" "))
        })
    }, removeClass: function (e) {
        return this.each(function (t) {
            return e === x ? _(this, "") : (D = _(this), v(this, e, t, D).split(/\s+/g).forEach(function (e) {
                D = D.replace(h(e), " ")
            }), _(this, D.trim()), void 0)
        })
    }, toggleClass: function (e, t) {
        return this.each(function (n) {
            var s = T(this), r = v(this, e, n, _(this));
            r.split(/\s+/g).forEach(function (e) {
                (t === x ? !s.hasClass(e) : t) ? s.addClass(e) : s.removeClass(e)
            })
        })
    }, scrollTop: function () {
        return this.length ? "scrollTop"in this[0] ? this[0].scrollTop : this[0].scrollY : void 0
    }, position: function () {
        if (this.length) {
            var e = this[0], t = this.offsetParent(), n = this.offset(), s = R.test(t[0].nodeName) ? {top: 0, left: 0} : t.offset();
            return n.top -= parseFloat(T(e).css("margin-top")) || 0, n.left -= parseFloat(T(e).css("margin-left")) || 0, s.top += parseFloat(T(t[0]).css("border-top-width")) || 0, s.left += parseFloat(T(t[0]).css("border-left-width")) || 0, {top: n.top - s.top, left: n.left - s.left}
        }
    }, offsetParent: function () {
        return this.map(function () {
            for (var e = this.offsetParent || A.body; e && !R.test(e.nodeName) && "static" == T(e).css("position");)e = e.offsetParent;
            return e
        })
    }}, T.fn.detach = T.fn.remove, ["width", "height"].forEach(function (e) {
        T.fn[e] = function (t) {
            var r, a = this[0], i = e.replace(/./, function (e) {
                return e[0].toUpperCase()
            });
            return t === x ? n(a) ? a["inner" + i] : s(a) ? a.documentElement["offset" + i] : (r = this.offset()) && r[e] : this.each(function (n) {
                a = T(this), a.css(e, v(this, t, n, a[e]()))
            })
        }
    }), F.forEach(function (t, n) {
        var s = n % 2;
        T.fn[t] = function () {
            var t, r, a = T.map(arguments, function (n) {
                return t = e(n), "object" == t || "array" == t || null == n ? n : Z.fragment(n)
            }), i = this.length > 1;
            return 1 > a.length ? this : this.each(function (e, t) {
                r = s ? t : t.parentNode, t = 0 == n ? t.nextSibling : 1 == n ? t.firstChild : 2 == n ? t : null, a.forEach(function (e) {
                    if (i)e = e.cloneNode(!0); else if (!r)return T(e).remove();
                    w(r.insertBefore(e, t), function (e) {
                        null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src || window.eval.call(window, e.innerHTML)
                    })
                })
            })
        }, T.fn[s ? t + "To" : "insert" + (n ? "Before" : "After")] = function (e) {
            return T(e)[t](this), this
        }
    }), Z.Z.prototype = T.fn, Z.uniq = C, Z.deserializeValue = y, T.zepto = Z, T
}();
window.Zepto = Zepto, "$"in window || (window.$ = Zepto), function (e) {
    function t(e) {
        var t = this.os = {}, n = this.browser = {}, s = e.match(/WebKit\/([\d.]+)/), r = e.match(/(Android)\s+([\d.]+)/), a = e.match(/(iPad).*OS\s([\d_]+)/), i = !a && e.match(/(iPhone\sOS)\s([\d_]+)/), o = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), u = o && e.match(/TouchPad/), l = e.match(/Kindle\/([\d.]+)/), c = e.match(/Silk\/([\d._]+)/), h = e.match(/(BlackBerry).*Version\/([\d.]+)/), d = e.match(/(BB10).*Version\/([\d.]+)/), p = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/), f = e.match(/PlayBook/), m = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/), g = e.match(/Firefox\/([\d.]+)/);
        (n.webkit = !!s) && (n.version = s[1]), r && (t.android = !0, t.version = r[2]), i && (t.ios = t.iphone = !0, t.version = i[2].replace(/_/g, ".")), a && (t.ios = t.ipad = !0, t.version = a[2].replace(/_/g, ".")), o && (t.webos = !0, t.version = o[2]), u && (t.touchpad = !0), h && (t.blackberry = !0, t.version = h[2]), d && (t.bb10 = !0, t.version = d[2]), p && (t.rimtabletos = !0, t.version = p[2]), f && (n.playbook = !0), l && (t.kindle = !0, t.version = l[1]), c && (n.silk = !0, n.version = c[1]), !c && t.android && e.match(/Kindle Fire/) && (n.silk = !0), m && (n.chrome = !0, n.version = m[1]), g && (n.firefox = !0, n.version = g[1]), t.tablet = !!(a || f || r && !e.match(/Mobile/) || g && e.match(/Tablet/)), t.phone = !(t.tablet || !(r || i || o || h || d || m && e.match(/Android/) || m && e.match(/CriOS\/([\d.]+)/) || g && e.match(/Mobile/)))
    }

    t.call(e, navigator.userAgent), e.__detect = t
}(Zepto), function (e) {
    function t(e) {
        return e._zid || (e._zid = p++)
    }

    function n(e, n, a, i) {
        if (n = s(n), n.ns)var o = r(n.ns);
        return(d[t(e)] || []).filter(function (e) {
            return!(!e || n.e && e.e != n.e || n.ns && !o.test(e.ns) || a && t(e.fn) !== t(a) || i && e.sel != i)
        })
    }

    function s(e) {
        var t = ("" + e).split(".");
        return{e: t[0], ns: t.slice(1).sort().join(" ")}
    }

    function r(e) {
        return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
    }

    function a(t, n, s) {
        "string" != e.type(t) ? e.each(t, s) : t.split(/\s/).forEach(function (e) {
            s(e, n)
        })
    }

    function i(e, t) {
        return e.del && ("focus" == e.e || "blur" == e.e) || !!t
    }

    function o(e) {
        return m[e] || e
    }

    function u(n, r, u, l, c, h) {
        var p = t(n), f = d[p] || (d[p] = []);
        a(r, u, function (t, r) {
            var a = s(t);
            a.fn = r, a.sel = l, a.e in m && (r = function (t) {
                var n = t.relatedTarget;
                return!n || n !== this && !e.contains(this, n) ? a.fn.apply(this, arguments) : void 0
            }), a.del = c && c(r, t);
            var u = a.del || r;
            a.proxy = function (e) {
                var t = u.apply(n, [e].concat(e.data));
                return t === !1 && (e.preventDefault(), e.stopPropagation()), t
            }, a.i = f.length, f.push(a), n.addEventListener(o(a.e), a.proxy, i(a, h))
        })
    }

    function l(e, s, r, u, l) {
        var c = t(e);
        a(s || "", r, function (t, s) {
            n(e, t, s, u).forEach(function (t) {
                delete d[c][t.i], e.removeEventListener(o(t.e), t.proxy, i(t, l))
            })
        })
    }

    function c(t) {
        var n, s = {originalEvent: t};
        for (n in t)b.test(n) || void 0 === t[n] || (s[n] = t[n]);
        return e.each(_, function (e, n) {
            s[e] = function () {
                return this[n] = g, t[e].apply(t, arguments)
            }, s[n] = v
        }), s
    }

    function h(e) {
        if (!("defaultPrevented"in e)) {
            e.defaultPrevented = !1;
            var t = e.preventDefault;
            e.preventDefault = function () {
                this.defaultPrevented = !0, t.call(this)
            }
        }
    }

    var d = (e.zepto.qsa, {}), p = 1, f = {}, m = {mouseenter: "mouseover", mouseleave: "mouseout"};
    f.click = f.mousedown = f.mouseup = f.mousemove = "MouseEvents", e.event = {add: u, remove: l}, e.proxy = function (n, s) {
        if (e.isFunction(n)) {
            var r = function () {
                return n.apply(s, arguments)
            };
            return r._zid = t(n), r
        }
        if ("string" == typeof s)return e.proxy(n[s], n);
        throw new TypeError("expected function")
    }, e.fn.bind = function (e, t) {
        return this.each(function () {
            u(this, e, t)
        })
    }, e.fn.unbind = function (e, t) {
        return this.each(function () {
            l(this, e, t)
        })
    }, e.fn.one = function (e, t) {
        return this.each(function (n, s) {
            u(this, e, t, null, function (e, t) {
                return function () {
                    var n = e.apply(s, arguments);
                    return l(s, t, e), n
                }
            })
        })
    };
    var g = function () {
        return!0
    }, v = function () {
        return!1
    }, b = /^([A-Z]|layer[XY]$)/, _ = {preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped"};
    e.fn.delegate = function (t, n, s) {
        return this.each(function (r, a) {
            u(a, n, s, t, function (n) {
                return function (s) {
                    var r, i = e(s.target).closest(t, a).get(0);
                    return i ? (r = e.extend(c(s), {currentTarget: i, liveFired: a}), n.apply(i, [r].concat([].slice.call(arguments, 1)))) : void 0
                }
            })
        })
    }, e.fn.undelegate = function (e, t, n) {
        return this.each(function () {
            l(this, t, n, e)
        })
    }, e.fn.live = function (t, n) {
        return e(document.body).delegate(this.selector, t, n), this
    }, e.fn.die = function (t, n) {
        return e(document.body).undelegate(this.selector, t, n), this
    }, e.fn.on = function (t, n, s) {
        return!n || e.isFunction(n) ? this.bind(t, n || s) : this.delegate(n, t, s)
    }, e.fn.off = function (t, n, s) {
        return!n || e.isFunction(n) ? this.unbind(t, n || s) : this.undelegate(n, t, s)
    }, e.fn.trigger = function (t, n) {
        return("string" == typeof t || e.isPlainObject(t)) && (t = e.Event(t)), h(t), t.data = n, this.each(function () {
            "dispatchEvent"in this && this.dispatchEvent(t)
        })
    }, e.fn.triggerHandler = function (t, s) {
        var r, a;
        return this.each(function (i, o) {
            r = c("string" == typeof t ? e.Event(t) : t), r.data = s, r.target = o, e.each(n(o, t.type || t), function (e, t) {
                return a = t.proxy(r), r.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), a
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (t) {
        e.fn[t] = function (e) {
            return e ? this.bind(t, e) : this.trigger(t)
        }
    }), ["focus", "blur"].forEach(function (t) {
        e.fn[t] = function (e) {
            return e ? this.bind(t, e) : this.each(function () {
                try {
                    this[t]()
                } catch (e) {
                }
            }), this
        }
    }), e.Event = function (e, t) {
        "string" != typeof e && (t = e, e = t.type);
        var n = document.createEvent(f[e] || "Events"), s = !0;
        if (t)for (var r in t)"bubbles" == r ? s = !!t[r] : n[r] = t[r];
        return n.initEvent(e, s, !0, null, null, null, null, null, null, null, null, null, null, null, null), n.isDefaultPrevented = function () {
            return this.defaultPrevented
        }, n
    }
}(Zepto), function (e) {
    function t(t, n, s) {
        var r = e.Event(n);
        return e(t).trigger(r, s), !r.defaultPrevented
    }

    function n(e, n, s, r) {
        return e.global ? t(n || b, s, r) : void 0
    }

    function s(t) {
        t.global && 0 === e.active++ && n(t, null, "ajaxStart")
    }

    function r(t) {
        t.global && !--e.active && n(t, null, "ajaxStop")
    }

    function a(e, t) {
        var s = t.context;
        return t.beforeSend.call(s, e, t) === !1 || n(t, s, "ajaxBeforeSend", [e, t]) === !1 ? !1 : (n(t, s, "ajaxSend", [e, t]), void 0)
    }

    function i(e, t, s) {
        var r = s.context, a = "success";
        s.success.call(r, e, a, t), n(s, r, "ajaxSuccess", [t, s, e]), u(a, t, s)
    }

    function o(e, t, s, r) {
        var a = r.context;
        r.error.call(a, s, t, e), n(r, a, "ajaxError", [s, r, e]), u(t, s, r)
    }

    function u(e, t, s) {
        var a = s.context;
        s.complete.call(a, t, e), n(s, a, "ajaxComplete", [t, s]), r(s)
    }

    function l() {
    }

    function c(e) {
        return e && (e = e.split(";", 2)[0]), e && (e == k ? "html" : e == x ? "json" : y.test(e) ? "script" : w.test(e) && "xml") || "text"
    }

    function h(e, t) {
        return(e + "&" + t).replace(/[&?]{1,2}/, "?")
    }

    function d(t) {
        t.processData && t.data && "string" != e.type(t.data) && (t.data = e.param(t.data, t.traditional)), !t.data || t.type && "GET" != t.type.toUpperCase() || (t.url = h(t.url, t.data))
    }

    function p(t, n, s, r) {
        var a = !e.isFunction(n);
        return{url: t, data: a ? n : void 0, success: a ? e.isFunction(s) ? s : void 0 : n, dataType: a ? r || s : s}
    }

    function f(t, n, s, r) {
        var a, i = e.isArray(n);
        e.each(n, function (n, o) {
            a = e.type(o), r && (n = s ? r : r + "[" + (i ? "" : n) + "]"), !r && i ? t.add(o.name, o.value) : "array" == a || !s && "object" == a ? f(t, o, s, n) : t.add(n, o)
        })
    }

    var m, g, v = 0, b = window.document, _ = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, y = /^(?:text|application)\/javascript/i, w = /^(?:text|application)\/xml/i, x = "application/json", k = "text/html", T = /^\s*$/;
    e.active = 0, e.ajaxJSONP = function (t) {
        if (!("type"in t))return e.ajax(t);
        var n, s = "jsonp" + ++v, r = b.createElement("script"), u = function () {
            clearTimeout(n), e(r).remove(), delete window[s]
        }, c = function (e) {
            u(), e && "timeout" != e || (window[s] = l), o(null, e || "abort", h, t)
        }, h = {abort: c};
        return a(h, t) === !1 ? (c("abort"), !1) : (window[s] = function (e) {
            u(), i(e, h, t)
        }, r.onerror = function () {
            c("error")
        }, r.src = t.url.replace(/=\?/, "=" + s), e("head").append(r), t.timeout > 0 && (n = setTimeout(function () {
            c("timeout")
        }, t.timeout)), h)
    }, e.ajaxSettings = {type: "GET", beforeSend: l, success: l, error: l, complete: l, context: null, global: !0, xhr: function () {
        return new window.XMLHttpRequest
    }, accepts: {script: "text/javascript, application/javascript", json: x, xml: "application/xml, text/xml", html: k, text: "text/plain"}, crossDomain: !1, timeout: 0, processData: !0, cache: !0}, e.ajax = function (t) {
        var n = e.extend({}, t || {});
        for (m in e.ajaxSettings)void 0 === n[m] && (n[m] = e.ajaxSettings[m]);
        s(n), n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host), n.url || (n.url = window.location.toString()), d(n), n.cache === !1 && (n.url = h(n.url, "_=" + Date.now()));
        var r = n.dataType, u = /=\?/.test(n.url);
        if ("jsonp" == r || u)return u || (n.url = h(n.url, "callback=?")), e.ajaxJSONP(n);
        var p, f = n.accepts[r], v = {}, b = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol, _ = n.xhr();
        n.crossDomain || (v["X-Requested-With"] = "XMLHttpRequest"), f && (v.Accept = f, f.indexOf(",") > -1 && (f = f.split(",", 2)[0]), _.overrideMimeType && _.overrideMimeType(f)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && (v["Content-Type"] = n.contentType || "application/x-www-form-urlencoded"), n.headers = e.extend(v, n.headers || {}), _.onreadystatechange = function () {
            if (4 == _.readyState) {
                _.onreadystatechange = l, clearTimeout(p);
                var t, s = !1;
                if (_.status >= 200 && 300 > _.status || 304 == _.status || 0 == _.status && "file:" == b) {
                    r = r || c(_.getResponseHeader("content-type")), t = _.responseText;
                    try {
                        "script" == r ? (1, eval)(t) : "xml" == r ? t = _.responseXML : "json" == r && (t = T.test(t) ? null : e.parseJSON(t))
                    } catch (a) {
                        s = a
                    }
                    s ? o(s, "parsererror", _, n) : i(t, _, n)
                } else o(null, _.status ? "error" : "abort", _, n)
            }
        };
        var y = "async"in n ? n.async : !0;
        _.open(n.type, n.url, y);
        for (g in n.headers)_.setRequestHeader(g, n.headers[g]);
        return a(_, n) === !1 ? (_.abort(), !1) : (n.timeout > 0 && (p = setTimeout(function () {
            _.onreadystatechange = l, _.abort(), o(null, "timeout", _, n)
        }, n.timeout)), _.send(n.data ? n.data : null), _)
    }, e.get = function () {
        return e.ajax(p.apply(null, arguments))
    }, e.post = function () {
        var t = p.apply(null, arguments);
        return t.type = "POST", e.ajax(t)
    }, e.getJSON = function () {
        var t = p.apply(null, arguments);
        return t.dataType = "json", e.ajax(t)
    }, e.fn.load = function (t, n, s) {
        if (!this.length)return this;
        var r, a = this, i = t.split(/\s/), o = p(t, n, s), u = o.success;
        return i.length > 1 && (o.url = i[0], r = i[1]), o.success = function (t) {
            a.html(r ? e("<div>").html(t.replace(_, "")).find(r) : t), u && u.apply(a, arguments)
        }, e.ajax(o), this
    };
    var D = encodeURIComponent;
    e.param = function (e, t) {
        var n = [];
        return n.add = function (e, t) {
            this.push(D(e) + "=" + D(t))
        }, f(n, e, t), n.join("&").replace(/%20/g, "+")
    }
}(Zepto), function (e) {
    e.fn.serializeArray = function () {
        var t, n = [];
        return e(Array.prototype.slice.call(this.get(0).elements)).each(function () {
            t = e(this);
            var s = t.attr("type");
            "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != s && "reset" != s && "button" != s && ("radio" != s && "checkbox" != s || this.checked) && n.push({name: t.attr("name"), value: t.val()})
        }), n
    }, e.fn.serialize = function () {
        var e = [];
        return this.serializeArray().forEach(function (t) {
            e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
        }), e.join("&")
    }, e.fn.submit = function (t) {
        if (t)this.bind("submit", t); else if (this.length) {
            var n = e.Event("submit");
            this.eq(0).trigger(n), n.defaultPrevented || this.get(0).submit()
        }
        return this
    }
}(Zepto), function (e, t) {
    function n(e) {
        return s(e.replace(/([a-z])([A-Z])/, "$1-$2"))
    }

    function s(e) {
        return e.toLowerCase()
    }

    function r(e) {
        return a ? a + e : s(e)
    }

    var a, i, o, u, l, c, h, d, p = "", f = {Webkit: "webkit", Moz: "", O: "o", ms: "MS"}, m = window.document, g = m.createElement("div"), v = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, b = {};
    e.each(f, function (e, n) {
        return g.style[e + "TransitionProperty"] !== t ? (p = "-" + s(e) + "-", a = n, !1) : void 0
    }), i = p + "transform", b[o = p + "transition-property"] = b[u = p + "transition-duration"] = b[l = p + "transition-timing-function"] = b[c = p + "animation-name"] = b[h = p + "animation-duration"] = b[d = p + "animation-timing-function"] = "", e.fx = {off: a === t && g.style.transitionProperty === t, speeds: {_default: 400, fast: 200, slow: 600}, cssPrefix: p, transitionEnd: r("TransitionEnd"), animationEnd: r("AnimationEnd")}, e.fn.animate = function (t, n, s, r) {
        return e.isPlainObject(n) && (s = n.easing, r = n.complete, n = n.duration), n && (n = ("number" == typeof n ? n : e.fx.speeds[n] || e.fx.speeds._default) / 1e3), this.anim(t, n, s, r)
    }, e.fn.anim = function (s, r, a, p) {
        var f, m, g, _ = {}, y = "", w = this, x = e.fx.transitionEnd;
        if (r === t && (r = .4), e.fx.off && (r = 0), "string" == typeof s)_[c] = s, _[h] = r + "s", _[d] = a || "linear", x = e.fx.animationEnd; else {
            m = [];
            for (f in s)v.test(f) ? y += f + "(" + s[f] + ") " : (_[f] = s[f], m.push(n(f)));
            y && (_[i] = y, m.push(i)), r > 0 && "object" == typeof s && (_[o] = m.join(", "), _[u] = r + "s", _[l] = a || "linear")
        }
        return g = function (t) {
            if ("undefined" != typeof t) {
                if (t.target !== t.currentTarget)return;
                e(t.target).unbind(x, g)
            }
            e(this).css(b), p && p.call(this)
        }, r > 0 && this.bind(x, g), this.size() && this.get(0).clientLeft, this.css(_), 0 >= r && setTimeout(function () {
            w.each(function () {
                g.call(this)
            })
        }, 0), this
    }, g = null
}(Zepto), function (e, t) {
    function n(n, s, r, a, i) {
        "function" != typeof s || i || (i = s, s = t);
        var o = {opacity: r};
        return a && (o.scale = a, n.css(e.fx.cssPrefix + "transform-origin", "0 0")), n.animate(o, s, null, i)
    }

    function s(t, s, r, a) {
        return n(t, s, 0, r, function () {
            i.call(e(this)), a && a.call(this)
        })
    }

    var r = window.document, a = (r.documentElement, e.fn.show), i = e.fn.hide, o = e.fn.toggle;
    e.fn.show = function (e, s) {
        return a.call(this), e === t ? e = 0 : this.css("opacity", 0), n(this, e, 1, "1,1", s)
    }, e.fn.hide = function (e, n) {
        return e === t ? i.call(this) : s(this, e, "0,0", n)
    }, e.fn.toggle = function (n, s) {
        return n === t || "boolean" == typeof n ? o.call(this, n) : this.each(function () {
            var t = e(this);
            t["none" == t.css("display") ? "show" : "hide"](n, s)
        })
    }, e.fn.fadeTo = function (e, t, s) {
        return n(this, e, t, null, s)
    }, e.fn.fadeIn = function (e, t) {
        var n = this.css("opacity");
        return n > 0 ? this.css("opacity", 0) : n = 1, a.call(this).fadeTo(e, n, t)
    }, e.fn.fadeOut = function (e, t) {
        return s(this, e, null, t)
    }, e.fn.fadeToggle = function (t, n) {
        return this.each(function () {
            var s = e(this);
            s[0 == s.css("opacity") || "none" == s.css("display") ? "fadeIn" : "fadeOut"](t, n)
        })
    }
}(Zepto), function (e) {
    var t, n = [];
    e.fn.remove = function () {
        return this.each(function () {
            this.parentNode && ("IMG" === this.tagName && (n.push(this), this.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", t && clearTimeout(t), t = setTimeout(function () {
                n = []
            }, 6e4)), this.parentNode.removeChild(this))
        })
    }
}(Zepto), function (e) {
    function t(t, s) {
        var u = t[o], l = u && r[u];
        if (void 0 === s)return l || n(t);
        if (l) {
            if (s in l)return l[s];
            var c = i(s);
            if (c in l)return l[c]
        }
        return a.call(e(t), s)
    }

    function n(t, n, a) {
        var u = t[o] || (t[o] = ++e.uuid), l = r[u] || (r[u] = s(t));
        return void 0 !== n && (l[i(n)] = a), l
    }

    function s(t) {
        var n = {};
        return e.each(t.attributes, function (t, s) {
            0 == s.name.indexOf("data-") && (n[i(s.name.replace("data-", ""))] = e.zepto.deserializeValue(s.value))
        }), n
    }

    var r = {}, a = e.fn.data, i = e.camelCase, o = e.expando = "Zepto" + +new Date;
    e.fn.data = function (s, r) {
        return void 0 === r ? e.isPlainObject(s) ? this.each(function (t, r) {
            e.each(s, function (e, t) {
                n(r, e, t)
            })
        }) : 0 == this.length ? void 0 : t(this[0], s) : this.each(function () {
            n(this, s, r)
        })
    }, e.fn.removeData = function (t) {
        return"string" == typeof t && (t = t.split(/\s+/)), this.each(function () {
            var n = this[o], s = n && r[n];
            s && e.each(t, function () {
                delete s[i(this)]
            })
        })
    }
}(Zepto), function (e) {
    function t(t) {
        return t = e(t), !(!t.width() && !t.height()) && "none" !== t.css("display")
    }

    function n(e, t) {
        e = e.replace(/=#\]/g, '="#"]');
        var n, s, r = o.exec(e);
        if (r && r[2]in i && (n = i[r[2]], s = r[3], e = r[1], s)) {
            var a = Number(s);
            s = isNaN(a) ? s.replace(/^["']|["']$/g, "") : a
        }
        return t(e, n, s)
    }

    var s = e.zepto, r = s.qsa, a = s.matches, i = e.expr[":"] = {visible: function () {
        return t(this) ? this : void 0
    }, hidden: function () {
        return t(this) ? void 0 : this
    }, selected: function () {
        return this.selected ? this : void 0
    }, checked: function () {
        return this.checked ? this : void 0
    }, parent: function () {
        return this.parentNode
    }, first: function (e) {
        return 0 === e ? this : void 0
    }, last: function (e, t) {
        return e === t.length - 1 ? this : void 0
    }, eq: function (e, t, n) {
        return e === n ? this : void 0
    }, contains: function (t, n, s) {
        return e(this).text().indexOf(s) > -1 ? this : void 0
    }, has: function (e, t, n) {
        return s.qsa(this, n).length ? this : void 0
    }}, o = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"), u = /^\s*>/, l = "Zepto" + +new Date;
    s.qsa = function (t, a) {
        return n(a, function (n, i, o) {
            try {
                var c;
                !n && i ? n = "*" : u.test(n) && (c = e(t).addClass(l), n = "." + l + " " + n);
                var h = r(t, n)
            } catch (d) {
                throw console.error("error performing selector: %o", a), d
            } finally {
                c && c.removeClass(l)
            }
            return i ? s.uniq(e.map(h, function (e, t) {
                return i.call(e, t, h, o)
            })) : h
        })
    }, s.matches = function (e, t) {
        return n(t, function (t, n, s) {
            return!(t && !a(e, t) || n && n.call(e, null, s) !== e)
        })
    }
}(Zepto), function (e) {
    e.fn.end = function () {
        return this.prevObject || e()
    }, e.fn.andSelf = function () {
        return this.add(this.prevObject || e())
    }, "filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function (t) {
        var n = e.fn[t];
        e.fn[t] = function () {
            var e = n.apply(this, arguments);
            return e.prevObject = this, e
        }
    })
}(Zepto), function (e) {
    function t(e) {
        return"tagName"in e ? e : e.parentNode
    }

    function n(e, t, n, s) {
        var r = Math.abs(e - t), a = Math.abs(n - s);
        return r >= a ? e - t > 0 ? "Left" : "Right" : n - s > 0 ? "Up" : "Down"
    }

    function s() {
        l = null, c.last && (c.el.trigger("longTap"), c = {})
    }

    function r() {
        l && clearTimeout(l), l = null
    }

    function a() {
        i && clearTimeout(i), o && clearTimeout(o), u && clearTimeout(u), l && clearTimeout(l), i = o = u = l = null, c = {}
    }

    var i, o, u, l, c = {}, h = 750;
    e(document).ready(function () {
        var d, p;
        e(document.body).bind("touchstart",function (n) {
            d = Date.now(), p = d - (c.last || d), c.el = e(t(n.touches[0].target)), i && clearTimeout(i), c.x1 = n.touches[0].pageX, c.y1 = n.touches[0].pageY, p > 0 && 250 >= p && (c.isDoubleTap = !0), c.last = d, l = setTimeout(s, h)
        }).bind("touchmove",function (e) {
            r(), c.x2 = e.touches[0].pageX, c.y2 = e.touches[0].pageY, Math.abs(c.x1 - c.x2) > 10 && e.preventDefault()
        }).bind("touchend",function () {
            r(), c.x2 && Math.abs(c.x1 - c.x2) > 30 || c.y2 && Math.abs(c.y1 - c.y2) > 30 ? u = setTimeout(function () {
                c.el.trigger("swipe"), c.el.trigger("swipe" + n(c.x1, c.x2, c.y1, c.y2)), c = {}
            }, 0) : "last"in c && (o = setTimeout(function () {
                var t = e.Event("tap");
                t.cancelTouch = a, c.el.trigger(t), c.isDoubleTap ? (c.el.trigger("doubleTap"), c = {}) : i = setTimeout(function () {
                    i = null, c.el.trigger("singleTap"), c = {}
                }, 250)
            }, 0))
        }).bind("touchcancel", a), e(window).bind("scroll", a)
    }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (t) {
        e.fn[t] = function (e) {
            return this.bind(t, e)
        }
    })
}(Zepto), this.Zepto && function (e) {
    var t, n;
    return t = function (e, t, n, s, r) {
        var a, i;
        return e ? (i = e[n](), a = {width: ["left", "right"], height: ["top", "bottom"]}, a[n].forEach(function (t) {
            return i += parseInt(e.css("padding-" + t), 10), s && (i += parseInt(e.css("border-" + t + "-width"), 10)), r ? i += parseInt(e.css("margin-" + t), 10) : void 0
        }), i) : null
    }, ["width", "height"].forEach(function (n) {
        var s, r, a, i, o;
        return s = n.replace(/./, function (e) {
            return e[0].toUpperCase()
        }), (r = e.fn)[i = "inner" + s] || (r[i] = function (e) {
            return t(this, s, n, !1, e)
        }), (a = e.fn)[o = "outer" + s] || (a[o] = function (e) {
            return t(this, s, n, !0, e)
        })
    }), (n = e.fn).detach || (n.detach = function (e) {
        var t, n;
        return n = this, null != e && (n = n.filter(e)), t = n.clone(!0), n.remove(), t
    })
}(Zepto);