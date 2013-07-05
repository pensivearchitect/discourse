(function (e) {
    String.prototype.trim === e && (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    }), Array.prototype.reduce === e && (Array.prototype.reduce = function (t) {
        if (void 0 === this || null === this)throw new TypeError;
        var n, r = Object(this), s = r.length >>> 0, a = 0;
        if ("function" != typeof t)throw new TypeError;
        if (0 == s && 1 == arguments.length)throw new TypeError;
        if (arguments.length >= 2)n = arguments[1]; else for (; ;) {
            if (a in r) {
                n = r[a++];
                break
            }
            if (++a >= s)throw new TypeError
        }
        for (; s > a;)a in r && (n = t.call(e, n, r[a], a, r)), a++;
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

    function r(e) {
        return null != e && e.nodeType == e.DOCUMENT_NODE
    }

    function s(t) {
        return"object" == e(t)
    }

    function a(e) {
        return s(e) && !n(e) && e.__proto__ == Object.prototype
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
        return e in N ? N[e] : N[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
    }

    function d(e, t) {
        return"number" != typeof t || L[c(e)] ? t : t + "px"
    }

    function p(e) {
        var t, n;
        return z[e] || (t = A.createElement(e), A.body.appendChild(t), n = P(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), "none" == n && (n = "block"), z[e] = n), z[e]
    }

    function f(e) {
        return"children"in e ? I.call(e.children) : T.map(e.childNodes, function (e) {
            return 1 == e.nodeType ? e : void 0
        })
    }

    function m(e, t, n) {
        for (x in t)n && (a(t[x]) || i(t[x])) ? (a(t[x]) && !a(e[x]) && (e[x] = {}), i(t[x]) && !i(e[x]) && (e[x] = []), m(e[x], t[x], n)) : t[x] !== k && (e[x] = t[x])
    }

    function g(e, t) {
        return t === k ? T(e) : T(e).filter(t)
    }

    function b(e, n, r, s) {
        return t(n) ? n.call(e, r, s) : n
    }

    function v(e, t, n) {
        null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
    }

    function _(e, t) {
        var n = e.className, r = n && n.baseVal !== k;
        return t === k ? r ? n.baseVal : n : (r ? n.baseVal = t : e.className = t, void 0)
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

    var k, x, T, D, E, C, S = [], I = S.slice, M = S.filter, A = window.document, z = {}, N = {}, P = A.defaultView.getComputedStyle, L = {"column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1}, j = /^\s*<(\w+|!)[^>]*>/, O = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, R = /^(?:body|html)$/i, U = ["val", "css", "html", "text", "data", "width", "height", "offset"], F = ["after", "prepend", "before", "append"], Y = A.createElement("table"), H = A.createElement("tr"), V = {tr: A.createElement("tbody"), tbody: Y, thead: Y, tfoot: Y, td: H, th: H, "*": A.createElement("div")}, B = /complete|loaded|interactive/, G = /^\.([\w-]+)$/, q = /^#([\w-]*)$/, W = /^[\w-]+$/, $ = {}, K = $.toString, Z = {}, Q = A.createElement("div");
    return Z.matches = function (e, t) {
        if (!e || 1 !== e.nodeType)return!1;
        var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
        if (n)return n.call(e, t);
        var r, s = e.parentNode, a = !s;
        return a && (s = Q).appendChild(e), r = ~Z.qsa(s, t).indexOf(e), a && Q.removeChild(e), r
    }, E = function (e) {
        return e.replace(/-+(.)?/g, function (e, t) {
            return t ? t.toUpperCase() : ""
        })
    }, C = function (e) {
        return M.call(e, function (t, n) {
            return e.indexOf(t) == n
        })
    }, Z.fragment = function (e, t, n) {
        e.replace && (e = e.replace(O, "<$1></$2>")), t === k && (t = j.test(e) && RegExp.$1), t in V || (t = "*");
        var r, s, i = V[t];
        return i.innerHTML = "" + e, s = T.each(I.call(i.childNodes), function () {
            i.removeChild(this)
        }), a(n) && (r = T(s), T.each(n, function (e, t) {
            U.indexOf(e) > -1 ? r[e](t) : r.attr(e, t)
        })), s
    }, Z.Z = function (e, t) {
        return e = e || [], e.__proto__ = T.fn, e.selector = t || "", e
    }, Z.isZ = function (e) {
        return e instanceof Z.Z
    }, Z.init = function (e, n) {
        if (e) {
            if (t(e))return T(A).ready(e);
            if (Z.isZ(e))return e;
            var r;
            if (i(e))r = u(e); else if (s(e))r = [a(e) ? T.extend({}, e) : e], e = null; else if (j.test(e))r = Z.fragment(e.trim(), RegExp.$1, n), e = null; else {
                if (n !== k)return T(n).find(e);
                r = Z.qsa(A, e)
            }
            return Z.Z(r, e)
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
        return r(e) && q.test(t) ? (n = e.getElementById(RegExp.$1)) ? [n] : [] : 1 !== e.nodeType && 9 !== e.nodeType ? [] : I.call(G.test(t) ? e.getElementsByClassName(RegExp.$1) : W.test(t) ? e.getElementsByTagName(t) : e.querySelectorAll(t))
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
        var n, r, s, a = [];
        if (o(e))for (r = 0; e.length > r; r++)n = t(e[r], r), null != n && a.push(n); else for (s in e)n = t(e[s], s), null != n && a.push(n);
        return l(a)
    }, T.each = function (e, t) {
        var n, r;
        if (o(e)) {
            for (n = 0; e.length > n; n++)if (t.call(e[n], n, e[n]) === !1)return e
        } else for (r in e)if (t.call(e[r], r, e[r]) === !1)return e;
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
        return e === k ? I.call(this) : this[e >= 0 ? e : e + this.length]
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
        if (t(e) && e.call !== k)this.each(function (t) {
            e.call(this, t) || n.push(this)
        }); else {
            var r = "string" == typeof e ? this.filter(e) : o(e) && t(e.item) ? I.call(e) : T(e);
            this.forEach(function (e) {
                0 > r.indexOf(e) && n.push(e)
            })
        }
        return T(n)
    }, has: function (e) {
        return this.filter(function () {
            return s(e) ? T.contains(this, e) : T(this).find(e).size()
        })
    }, eq: function (e) {
        return-1 === e ? this.slice(e) : this.slice(e, +e + 1)
    }, first: function () {
        var e = this[0];
        return e && !s(e) ? e : T(e)
    }, last: function () {
        var e = this[this.length - 1];
        return e && !s(e) ? e : T(e)
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
        var n = this[0], s = !1;
        for ("object" == typeof e && (s = T(e)); n && !(s ? s.indexOf(n) >= 0 : Z.matches(n, e));)n = n !== t && !r(n) && n.parentNode;
        return T(n)
    }, parents: function (e) {
        for (var t = [], n = this; n.length > 0;)n = T.map(n, function (e) {
            return(e = e.parentNode) && !r(e) && 0 > t.indexOf(e) ? (t.push(e), e) : void 0
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
        if (this[0] && !n)var r = T(e).get(0), s = r.parentNode || this.length > 1;
        return this.each(function (t) {
            T(this).wrapAll(n ? e.call(this, t) : s ? r.cloneNode(!0) : r)
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
            var r = T(this), s = r.contents(), a = n ? e.call(this, t) : e;
            s.length ? s.wrapAll(a) : r.append(a)
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
            (e === k ? "none" == t.css("display") : e) ? t.show() : t.hide()
        })
    }, prev: function (e) {
        return T(this.pluck("previousElementSibling")).filter(e || "*")
    }, next: function (e) {
        return T(this.pluck("nextElementSibling")).filter(e || "*")
    }, html: function (e) {
        return e === k ? this.length > 0 ? this[0].innerHTML : null : this.each(function (t) {
            var n = this.innerHTML;
            T(this).empty().append(b(this, e, t, n))
        })
    }, text: function (e) {
        return e === k ? this.length > 0 ? this[0].textContent : null : this.each(function () {
            this.textContent = e
        })
    }, attr: function (e, t) {
        var n;
        return"string" == typeof e && t === k ? 0 == this.length || 1 !== this[0].nodeType ? k : "value" == e && "INPUT" == this[0].nodeName ? this.val() : !(n = this[0].getAttribute(e)) && e in this[0] ? this[0][e] : n : this.each(function (n) {
            if (1 === this.nodeType)if (s(e))for (x in e)v(this, x, e[x]); else v(this, e, b(this, t, n, this.getAttribute(e)))
        })
    }, removeAttr: function (e) {
        return this.each(function () {
            1 === this.nodeType && v(this, e)
        })
    }, prop: function (e, t) {
        return t === k ? this[0] && this[0][e] : this.each(function (n) {
            this[e] = b(this, t, n, this[e])
        })
    }, data: function (e, t) {
        var n = this.attr("data-" + c(e), t);
        return null !== n ? y(n) : k
    }, val: function (e) {
        return e === k ? this[0] && (this[0].multiple ? T(this[0]).find("option").filter(function () {
            return this.selected
        }).pluck("value") : this[0].value) : this.each(function (t) {
            this.value = b(this, e, t, this.value)
        })
    }, offset: function (e) {
        if (e)return this.each(function (t) {
            var n = T(this), r = b(this, e, t, n.offset()), s = n.offsetParent().offset(), a = {top: r.top - s.top, left: r.left - s.left};
            "static" == n.css("position") && (a.position = "relative"), n.css(a)
        });
        if (0 == this.length)return null;
        var t = this[0].getBoundingClientRect();
        return{left: t.left + window.pageXOffset, top: t.top + window.pageYOffset, width: Math.round(t.width), height: Math.round(t.height)}
    }, css: function (t, n) {
        if (2 > arguments.length && "string" == typeof t)return this[0] && (this[0].style[E(t)] || P(this[0], "").getPropertyValue(t));
        var r = "";
        if ("string" == e(t))n || 0 === n ? r = c(t) + ":" + d(t, n) : this.each(function () {
            this.style.removeProperty(c(t))
        }); else for (x in t)t[x] || 0 === t[x] ? r += c(x) + ":" + d(x, t[x]) + ";" : this.each(function () {
            this.style.removeProperty(c(x))
        });
        return this.each(function () {
            this.style.cssText += ";" + r
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
            var n = _(this), r = b(this, e, t, n);
            r.split(/\s+/g).forEach(function (e) {
                T(this).hasClass(e) || D.push(e)
            }, this), D.length && _(this, n + (n ? " " : "") + D.join(" "))
        })
    }, removeClass: function (e) {
        return this.each(function (t) {
            return e === k ? _(this, "") : (D = _(this), b(this, e, t, D).split(/\s+/g).forEach(function (e) {
                D = D.replace(h(e), " ")
            }), _(this, D.trim()), void 0)
        })
    }, toggleClass: function (e, t) {
        return this.each(function (n) {
            var r = T(this), s = b(this, e, n, _(this));
            s.split(/\s+/g).forEach(function (e) {
                (t === k ? !r.hasClass(e) : t) ? r.addClass(e) : r.removeClass(e)
            })
        })
    }, scrollTop: function () {
        return this.length ? "scrollTop"in this[0] ? this[0].scrollTop : this[0].scrollY : void 0
    }, position: function () {
        if (this.length) {
            var e = this[0], t = this.offsetParent(), n = this.offset(), r = R.test(t[0].nodeName) ? {top: 0, left: 0} : t.offset();
            return n.top -= parseFloat(T(e).css("margin-top")) || 0, n.left -= parseFloat(T(e).css("margin-left")) || 0, r.top += parseFloat(T(t[0]).css("border-top-width")) || 0, r.left += parseFloat(T(t[0]).css("border-left-width")) || 0, {top: n.top - r.top, left: n.left - r.left}
        }
    }, offsetParent: function () {
        return this.map(function () {
            for (var e = this.offsetParent || A.body; e && !R.test(e.nodeName) && "static" == T(e).css("position");)e = e.offsetParent;
            return e
        })
    }}, T.fn.detach = T.fn.remove, ["width", "height"].forEach(function (e) {
        T.fn[e] = function (t) {
            var s, a = this[0], i = e.replace(/./, function (e) {
                return e[0].toUpperCase()
            });
            return t === k ? n(a) ? a["inner" + i] : r(a) ? a.documentElement["offset" + i] : (s = this.offset()) && s[e] : this.each(function (n) {
                a = T(this), a.css(e, b(this, t, n, a[e]()))
            })
        }
    }), F.forEach(function (t, n) {
        var r = n % 2;
        T.fn[t] = function () {
            var t, s, a = T.map(arguments, function (n) {
                return t = e(n), "object" == t || "array" == t || null == n ? n : Z.fragment(n)
            }), i = this.length > 1;
            return 1 > a.length ? this : this.each(function (e, t) {
                s = r ? t : t.parentNode, t = 0 == n ? t.nextSibling : 1 == n ? t.firstChild : 2 == n ? t : null, a.forEach(function (e) {
                    if (i)e = e.cloneNode(!0); else if (!s)return T(e).remove();
                    w(s.insertBefore(e, t), function (e) {
                        null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src || window.eval.call(window, e.innerHTML)
                    })
                })
            })
        }, T.fn[r ? t + "To" : "insert" + (n ? "Before" : "After")] = function (e) {
            return T(e)[t](this), this
        }
    }), Z.Z.prototype = T.fn, Z.uniq = C, Z.deserializeValue = y, T.zepto = Z, T
}();
window.Zepto = Zepto, "$"in window || (window.$ = Zepto), function (e) {
    function t(e) {
        var t = this.os = {}, n = this.browser = {}, r = e.match(/WebKit\/([\d.]+)/), s = e.match(/(Android)\s+([\d.]+)/), a = e.match(/(iPad).*OS\s([\d_]+)/), i = !a && e.match(/(iPhone\sOS)\s([\d_]+)/), o = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), u = o && e.match(/TouchPad/), l = e.match(/Kindle\/([\d.]+)/), c = e.match(/Silk\/([\d._]+)/), h = e.match(/(BlackBerry).*Version\/([\d.]+)/), d = e.match(/(BB10).*Version\/([\d.]+)/), p = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/), f = e.match(/PlayBook/), m = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/), g = e.match(/Firefox\/([\d.]+)/);
        (n.webkit = !!r) && (n.version = r[1]), s && (t.android = !0, t.version = s[2]), i && (t.ios = t.iphone = !0, t.version = i[2].replace(/_/g, ".")), a && (t.ios = t.ipad = !0, t.version = a[2].replace(/_/g, ".")), o && (t.webos = !0, t.version = o[2]), u && (t.touchpad = !0), h && (t.blackberry = !0, t.version = h[2]), d && (t.bb10 = !0, t.version = d[2]), p && (t.rimtabletos = !0, t.version = p[2]), f && (n.playbook = !0), l && (t.kindle = !0, t.version = l[1]), c && (n.silk = !0, n.version = c[1]), !c && t.android && e.match(/Kindle Fire/) && (n.silk = !0), m && (n.chrome = !0, n.version = m[1]), g && (n.firefox = !0, n.version = g[1]), t.tablet = !!(a || f || s && !e.match(/Mobile/) || g && e.match(/Tablet/)), t.phone = !(t.tablet || !(s || i || o || h || d || m && e.match(/Android/) || m && e.match(/CriOS\/([\d.]+)/) || g && e.match(/Mobile/)))
    }

    t.call(e, navigator.userAgent), e.__detect = t
}(Zepto), function (e) {
    function t(e) {
        return e._zid || (e._zid = p++)
    }

    function n(e, n, a, i) {
        if (n = r(n), n.ns)var o = s(n.ns);
        return(d[t(e)] || []).filter(function (e) {
            return!(!e || n.e && e.e != n.e || n.ns && !o.test(e.ns) || a && t(e.fn) !== t(a) || i && e.sel != i)
        })
    }

    function r(e) {
        var t = ("" + e).split(".");
        return{e: t[0], ns: t.slice(1).sort().join(" ")}
    }

    function s(e) {
        return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
    }

    function a(t, n, r) {
        "string" != e.type(t) ? e.each(t, r) : t.split(/\s/).forEach(function (e) {
            r(e, n)
        })
    }

    function i(e, t) {
        return e.del && ("focus" == e.e || "blur" == e.e) || !!t
    }

    function o(e) {
        return m[e] || e
    }

    function u(n, s, u, l, c, h) {
        var p = t(n), f = d[p] || (d[p] = []);
        a(s, u, function (t, s) {
            var a = r(t);
            a.fn = s, a.sel = l, a.e in m && (s = function (t) {
                var n = t.relatedTarget;
                return!n || n !== this && !e.contains(this, n) ? a.fn.apply(this, arguments) : void 0
            }), a.del = c && c(s, t);
            var u = a.del || s;
            a.proxy = function (e) {
                var t = u.apply(n, [e].concat(e.data));
                return t === !1 && (e.preventDefault(), e.stopPropagation()), t
            }, a.i = f.length, f.push(a), n.addEventListener(o(a.e), a.proxy, i(a, h))
        })
    }

    function l(e, r, s, u, l) {
        var c = t(e);
        a(r || "", s, function (t, r) {
            n(e, t, r, u).forEach(function (t) {
                delete d[c][t.i], e.removeEventListener(o(t.e), t.proxy, i(t, l))
            })
        })
    }

    function c(t) {
        var n, r = {originalEvent: t};
        for (n in t)v.test(n) || void 0 === t[n] || (r[n] = t[n]);
        return e.each(_, function (e, n) {
            r[e] = function () {
                return this[n] = g, t[e].apply(t, arguments)
            }, r[n] = b
        }), r
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
    f.click = f.mousedown = f.mouseup = f.mousemove = "MouseEvents", e.event = {add: u, remove: l}, e.proxy = function (n, r) {
        if (e.isFunction(n)) {
            var s = function () {
                return n.apply(r, arguments)
            };
            return s._zid = t(n), s
        }
        if ("string" == typeof r)return e.proxy(n[r], n);
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
        return this.each(function (n, r) {
            u(this, e, t, null, function (e, t) {
                return function () {
                    var n = e.apply(r, arguments);
                    return l(r, t, e), n
                }
            })
        })
    };
    var g = function () {
        return!0
    }, b = function () {
        return!1
    }, v = /^([A-Z]|layer[XY]$)/, _ = {preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped"};
    e.fn.delegate = function (t, n, r) {
        return this.each(function (s, a) {
            u(a, n, r, t, function (n) {
                return function (r) {
                    var s, i = e(r.target).closest(t, a).get(0);
                    return i ? (s = e.extend(c(r), {currentTarget: i, liveFired: a}), n.apply(i, [s].concat([].slice.call(arguments, 1)))) : void 0
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
    }, e.fn.on = function (t, n, r) {
        return!n || e.isFunction(n) ? this.bind(t, n || r) : this.delegate(n, t, r)
    }, e.fn.off = function (t, n, r) {
        return!n || e.isFunction(n) ? this.unbind(t, n || r) : this.undelegate(n, t, r)
    }, e.fn.trigger = function (t, n) {
        return("string" == typeof t || e.isPlainObject(t)) && (t = e.Event(t)), h(t), t.data = n, this.each(function () {
            "dispatchEvent"in this && this.dispatchEvent(t)
        })
    }, e.fn.triggerHandler = function (t, r) {
        var s, a;
        return this.each(function (i, o) {
            s = c("string" == typeof t ? e.Event(t) : t), s.data = r, s.target = o, e.each(n(o, t.type || t), function (e, t) {
                return a = t.proxy(s), s.isImmediatePropagationStopped() ? !1 : void 0
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
        var n = document.createEvent(f[e] || "Events"), r = !0;
        if (t)for (var s in t)"bubbles" == s ? r = !!t[s] : n[s] = t[s];
        return n.initEvent(e, r, !0, null, null, null, null, null, null, null, null, null, null, null, null), n.isDefaultPrevented = function () {
            return this.defaultPrevented
        }, n
    }
}(Zepto), function (e) {
    function t(t, n, r) {
        var s = e.Event(n);
        return e(t).trigger(s, r), !s.defaultPrevented
    }

    function n(e, n, r, s) {
        return e.global ? t(n || v, r, s) : void 0
    }

    function r(t) {
        t.global && 0 === e.active++ && n(t, null, "ajaxStart")
    }

    function s(t) {
        t.global && !--e.active && n(t, null, "ajaxStop")
    }

    function a(e, t) {
        var r = t.context;
        return t.beforeSend.call(r, e, t) === !1 || n(t, r, "ajaxBeforeSend", [e, t]) === !1 ? !1 : (n(t, r, "ajaxSend", [e, t]), void 0)
    }

    function i(e, t, r) {
        var s = r.context, a = "success";
        r.success.call(s, e, a, t), n(r, s, "ajaxSuccess", [t, r, e]), u(a, t, r)
    }

    function o(e, t, r, s) {
        var a = s.context;
        s.error.call(a, r, t, e), n(s, a, "ajaxError", [r, s, e]), u(t, r, s)
    }

    function u(e, t, r) {
        var a = r.context;
        r.complete.call(a, t, e), n(r, a, "ajaxComplete", [t, r]), s(r)
    }

    function l() {
    }

    function c(e) {
        return e && (e = e.split(";", 2)[0]), e && (e == x ? "html" : e == k ? "json" : y.test(e) ? "script" : w.test(e) && "xml") || "text"
    }

    function h(e, t) {
        return(e + "&" + t).replace(/[&?]{1,2}/, "?")
    }

    function d(t) {
        t.processData && t.data && "string" != e.type(t.data) && (t.data = e.param(t.data, t.traditional)), !t.data || t.type && "GET" != t.type.toUpperCase() || (t.url = h(t.url, t.data))
    }

    function p(t, n, r, s) {
        var a = !e.isFunction(n);
        return{url: t, data: a ? n : void 0, success: a ? e.isFunction(r) ? r : void 0 : n, dataType: a ? s || r : r}
    }

    function f(t, n, r, s) {
        var a, i = e.isArray(n);
        e.each(n, function (n, o) {
            a = e.type(o), s && (n = r ? s : s + "[" + (i ? "" : n) + "]"), !s && i ? t.add(o.name, o.value) : "array" == a || !r && "object" == a ? f(t, o, r, n) : t.add(n, o)
        })
    }

    var m, g, b = 0, v = window.document, _ = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, y = /^(?:text|application)\/javascript/i, w = /^(?:text|application)\/xml/i, k = "application/json", x = "text/html", T = /^\s*$/;
    e.active = 0, e.ajaxJSONP = function (t) {
        if (!("type"in t))return e.ajax(t);
        var n, r = "jsonp" + ++b, s = v.createElement("script"), u = function () {
            clearTimeout(n), e(s).remove(), delete window[r]
        }, c = function (e) {
            u(), e && "timeout" != e || (window[r] = l), o(null, e || "abort", h, t)
        }, h = {abort: c};
        return a(h, t) === !1 ? (c("abort"), !1) : (window[r] = function (e) {
            u(), i(e, h, t)
        }, s.onerror = function () {
            c("error")
        }, s.src = t.url.replace(/=\?/, "=" + r), e("head").append(s), t.timeout > 0 && (n = setTimeout(function () {
            c("timeout")
        }, t.timeout)), h)
    }, e.ajaxSettings = {type: "GET", beforeSend: l, success: l, error: l, complete: l, context: null, global: !0, xhr: function () {
        return new window.XMLHttpRequest
    }, accepts: {script: "text/javascript, application/javascript", json: k, xml: "application/xml, text/xml", html: x, text: "text/plain"}, crossDomain: !1, timeout: 0, processData: !0, cache: !0}, e.ajax = function (t) {
        var n = e.extend({}, t || {});
        for (m in e.ajaxSettings)void 0 === n[m] && (n[m] = e.ajaxSettings[m]);
        r(n), n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host), n.url || (n.url = window.location.toString()), d(n), n.cache === !1 && (n.url = h(n.url, "_=" + Date.now()));
        var s = n.dataType, u = /=\?/.test(n.url);
        if ("jsonp" == s || u)return u || (n.url = h(n.url, "callback=?")), e.ajaxJSONP(n);
        var p, f = n.accepts[s], b = {}, v = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol, _ = n.xhr();
        n.crossDomain || (b["X-Requested-With"] = "XMLHttpRequest"), f && (b.Accept = f, f.indexOf(",") > -1 && (f = f.split(",", 2)[0]), _.overrideMimeType && _.overrideMimeType(f)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && (b["Content-Type"] = n.contentType || "application/x-www-form-urlencoded"), n.headers = e.extend(b, n.headers || {}), _.onreadystatechange = function () {
            if (4 == _.readyState) {
                _.onreadystatechange = l, clearTimeout(p);
                var t, r = !1;
                if (_.status >= 200 && 300 > _.status || 304 == _.status || 0 == _.status && "file:" == v) {
                    s = s || c(_.getResponseHeader("content-type")), t = _.responseText;
                    try {
                        "script" == s ? (1, eval)(t) : "xml" == s ? t = _.responseXML : "json" == s && (t = T.test(t) ? null : e.parseJSON(t))
                    } catch (a) {
                        r = a
                    }
                    r ? o(r, "parsererror", _, n) : i(t, _, n)
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
    }, e.fn.load = function (t, n, r) {
        if (!this.length)return this;
        var s, a = this, i = t.split(/\s/), o = p(t, n, r), u = o.success;
        return i.length > 1 && (o.url = i[0], s = i[1]), o.success = function (t) {
            a.html(s ? e("<div>").html(t.replace(_, "")).find(s) : t), u && u.apply(a, arguments)
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
            var r = t.attr("type");
            "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != r && "reset" != r && "button" != r && ("radio" != r && "checkbox" != r || this.checked) && n.push({name: t.attr("name"), value: t.val()})
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
        return r(e.replace(/([a-z])([A-Z])/, "$1-$2"))
    }

    function r(e) {
        return e.toLowerCase()
    }

    function s(e) {
        return a ? a + e : r(e)
    }

    var a, i, o, u, l, c, h, d, p = "", f = {Webkit: "webkit", Moz: "", O: "o", ms: "MS"}, m = window.document, g = m.createElement("div"), b = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, v = {};
    e.each(f, function (e, n) {
        return g.style[e + "TransitionProperty"] !== t ? (p = "-" + r(e) + "-", a = n, !1) : void 0
    }), i = p + "transform", v[o = p + "transition-property"] = v[u = p + "transition-duration"] = v[l = p + "transition-timing-function"] = v[c = p + "animation-name"] = v[h = p + "animation-duration"] = v[d = p + "animation-timing-function"] = "", e.fx = {off: a === t && g.style.transitionProperty === t, speeds: {_default: 400, fast: 200, slow: 600}, cssPrefix: p, transitionEnd: s("TransitionEnd"), animationEnd: s("AnimationEnd")}, e.fn.animate = function (t, n, r, s) {
        return e.isPlainObject(n) && (r = n.easing, s = n.complete, n = n.duration), n && (n = ("number" == typeof n ? n : e.fx.speeds[n] || e.fx.speeds._default) / 1e3), this.anim(t, n, r, s)
    }, e.fn.anim = function (r, s, a, p) {
        var f, m, g, _ = {}, y = "", w = this, k = e.fx.transitionEnd;
        if (s === t && (s = .4), e.fx.off && (s = 0), "string" == typeof r)_[c] = r, _[h] = s + "s", _[d] = a || "linear", k = e.fx.animationEnd; else {
            m = [];
            for (f in r)b.test(f) ? y += f + "(" + r[f] + ") " : (_[f] = r[f], m.push(n(f)));
            y && (_[i] = y, m.push(i)), s > 0 && "object" == typeof r && (_[o] = m.join(", "), _[u] = s + "s", _[l] = a || "linear")
        }
        return g = function (t) {
            if ("undefined" != typeof t) {
                if (t.target !== t.currentTarget)return;
                e(t.target).unbind(k, g)
            }
            e(this).css(v), p && p.call(this)
        }, s > 0 && this.bind(k, g), this.size() && this.get(0).clientLeft, this.css(_), 0 >= s && setTimeout(function () {
            w.each(function () {
                g.call(this)
            })
        }, 0), this
    }, g = null
}(Zepto), function (e, t) {
    function n(n, r, s, a, i) {
        "function" != typeof r || i || (i = r, r = t);
        var o = {opacity: s};
        return a && (o.scale = a, n.css(e.fx.cssPrefix + "transform-origin", "0 0")), n.animate(o, r, null, i)
    }

    function r(t, r, s, a) {
        return n(t, r, 0, s, function () {
            i.call(e(this)), a && a.call(this)
        })
    }

    var s = window.document, a = (s.documentElement, e.fn.show), i = e.fn.hide, o = e.fn.toggle;
    e.fn.show = function (e, r) {
        return a.call(this), e === t ? e = 0 : this.css("opacity", 0), n(this, e, 1, "1,1", r)
    }, e.fn.hide = function (e, n) {
        return e === t ? i.call(this) : r(this, e, "0,0", n)
    }, e.fn.toggle = function (n, r) {
        return n === t || "boolean" == typeof n ? o.call(this, n) : this.each(function () {
            var t = e(this);
            t["none" == t.css("display") ? "show" : "hide"](n, r)
        })
    }, e.fn.fadeTo = function (e, t, r) {
        return n(this, e, t, null, r)
    }, e.fn.fadeIn = function (e, t) {
        var n = this.css("opacity");
        return n > 0 ? this.css("opacity", 0) : n = 1, a.call(this).fadeTo(e, n, t)
    }, e.fn.fadeOut = function (e, t) {
        return r(this, e, null, t)
    }, e.fn.fadeToggle = function (t, n) {
        return this.each(function () {
            var r = e(this);
            r[0 == r.css("opacity") || "none" == r.css("display") ? "fadeIn" : "fadeOut"](t, n)
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
    function t(t, r) {
        var u = t[o], l = u && s[u];
        if (void 0 === r)return l || n(t);
        if (l) {
            if (r in l)return l[r];
            var c = i(r);
            if (c in l)return l[c]
        }
        return a.call(e(t), r)
    }

    function n(t, n, a) {
        var u = t[o] || (t[o] = ++e.uuid), l = s[u] || (s[u] = r(t));
        return void 0 !== n && (l[i(n)] = a), l
    }

    function r(t) {
        var n = {};
        return e.each(t.attributes, function (t, r) {
            0 == r.name.indexOf("data-") && (n[i(r.name.replace("data-", ""))] = e.zepto.deserializeValue(r.value))
        }), n
    }

    var s = {}, a = e.fn.data, i = e.camelCase, o = e.expando = "Zepto" + +new Date;
    e.fn.data = function (r, s) {
        return void 0 === s ? e.isPlainObject(r) ? this.each(function (t, s) {
            e.each(r, function (e, t) {
                n(s, e, t)
            })
        }) : 0 == this.length ? void 0 : t(this[0], r) : this.each(function () {
            n(this, r, s)
        })
    }, e.fn.removeData = function (t) {
        return"string" == typeof t && (t = t.split(/\s+/)), this.each(function () {
            var n = this[o], r = n && s[n];
            r && e.each(t, function () {
                delete r[i(this)]
            })
        })
    }
}(Zepto), function (e) {
    function t(t) {
        return t = e(t), !(!t.width() && !t.height()) && "none" !== t.css("display")
    }

    function n(e, t) {
        e = e.replace(/=#\]/g, '="#"]');
        var n, r, s = o.exec(e);
        if (s && s[2]in i && (n = i[s[2]], r = s[3], e = s[1], r)) {
            var a = Number(r);
            r = isNaN(a) ? r.replace(/^["']|["']$/g, "") : a
        }
        return t(e, n, r)
    }

    var r = e.zepto, s = r.qsa, a = r.matches, i = e.expr[":"] = {visible: function () {
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
    }, contains: function (t, n, r) {
        return e(this).text().indexOf(r) > -1 ? this : void 0
    }, has: function (e, t, n) {
        return r.qsa(this, n).length ? this : void 0
    }}, o = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"), u = /^\s*>/, l = "Zepto" + +new Date;
    r.qsa = function (t, a) {
        return n(a, function (n, i, o) {
            try {
                var c;
                !n && i ? n = "*" : u.test(n) && (c = e(t).addClass(l), n = "." + l + " " + n);
                var h = s(t, n)
            } catch (d) {
                throw console.error("error performing selector: %o", a), d
            } finally {
                c && c.removeClass(l)
            }
            return i ? r.uniq(e.map(h, function (e, t) {
                return i.call(e, t, h, o)
            })) : h
        })
    }, r.matches = function (e, t) {
        return n(t, function (t, n, r) {
            return!(t && !a(e, t) || n && n.call(e, null, r) !== e)
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

    function n(e, t, n, r) {
        var s = Math.abs(e - t), a = Math.abs(n - r);
        return s >= a ? e - t > 0 ? "Left" : "Right" : n - r > 0 ? "Up" : "Down"
    }

    function r() {
        l = null, c.last && (c.el.trigger("longTap"), c = {})
    }

    function s() {
        l && clearTimeout(l), l = null
    }

    function a() {
        i && clearTimeout(i), o && clearTimeout(o), u && clearTimeout(u), l && clearTimeout(l), i = o = u = l = null, c = {}
    }

    var i, o, u, l, c = {}, h = 750;
    e(document).ready(function () {
        var d, p;
        e(document.body).bind("touchstart",function (n) {
            d = Date.now(), p = d - (c.last || d), c.el = e(t(n.touches[0].target)), i && clearTimeout(i), c.x1 = n.touches[0].pageX, c.y1 = n.touches[0].pageY, p > 0 && 250 >= p && (c.isDoubleTap = !0), c.last = d, l = setTimeout(r, h)
        }).bind("touchmove",function (e) {
            s(), c.x2 = e.touches[0].pageX, c.y2 = e.touches[0].pageY, Math.abs(c.x1 - c.x2) > 10 && e.preventDefault()
        }).bind("touchend",function () {
            s(), c.x2 && Math.abs(c.x1 - c.x2) > 30 || c.y2 && Math.abs(c.y1 - c.y2) > 30 ? u = setTimeout(function () {
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
    return t = function (e, t, n, r, s) {
        var a, i;
        return e ? (i = e[n](), a = {width: ["left", "right"], height: ["top", "bottom"]}, a[n].forEach(function (t) {
            return i += parseInt(e.css("padding-" + t), 10), r && (i += parseInt(e.css("border-" + t + "-width"), 10)), s ? i += parseInt(e.css("margin-" + t), 10) : void 0
        }), i) : null
    }, ["width", "height"].forEach(function (n) {
        var r, s, a, i, o;
        return r = n.replace(/./, function (e) {
            return e[0].toUpperCase()
        }), (s = e.fn)[i = "inner" + r] || (s[i] = function (e) {
            return t(this, r, n, !1, e)
        }), (a = e.fn)[o = "outer" + r] || (a[o] = function (e) {
            return t(this, r, n, !0, e)
        })
    }), (n = e.fn).detach || (n.detach = function (e) {
        var t, n;
        return n = this, null != e && (n = n.filter(e)), t = n.clone(!0), n.remove(), t
    })
}(Zepto);