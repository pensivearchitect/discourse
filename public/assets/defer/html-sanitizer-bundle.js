// Copyright (C) 2010 Google Inc.
window.sanitizeHtml = function () {
    var e = function () {
        function e(e) {
            var t = ("" + e).match(f);
            return t ? new u(h(t[1]), h(t[2]), h(t[3]), h(t[4]), h(t[5]), h(t[6]), h(t[7])) : null
        }

        function t(e, t, a, i, o, h, c) {
            var l = new u(s(e, d), s(t, d), n(a), i > 0 ? i.toString() : null, s(o, m), null, n(c));
            return h && ("string" == typeof h ? l.setRawQuery(h.replace(/[^?&=0-9A-Za-z_\-~.%]/g, r)) : l.setAllParameters(h)), l
        }

        function n(e) {
            return"string" == typeof e ? encodeURIComponent(e) : null
        }

        function s(e, t) {
            return"string" == typeof e ? encodeURI(e).replace(t, r) : null
        }

        function r(e) {
            var t = e.charCodeAt(0);
            return"%" + "0123456789ABCDEF".charAt(15 & t >> 4) + "0123456789ABCDEF".charAt(15 & t)
        }

        function a(e) {
            return e.replace(/(^|\/)\.(?:\/|$)/g, "$1").replace(/\/{2,}/g, "/")
        }

        function i(e) {
            if (null == e)return null;
            for (var t, n = a(e), s = l; (t = n.replace(s, "$1")) != n; n = t);
            return n
        }

        function o(e, t) {
            var n = e.clone(), s = t.hasScheme();
            s ? n.setRawScheme(t.getRawScheme()) : s = t.hasCredentials(), s ? n.setRawCredentials(t.getRawCredentials()) : s = t.hasDomain(), s ? n.setRawDomain(t.getRawDomain()) : s = t.hasPort();
            var r = t.getRawPath(), a = i(r);
            if (s)n.setPort(t.getPort()), a = a && a.replace(p, ""); else if (s = !!r) {
                if (47 !== a.charCodeAt(0)) {
                    var o = i(n.getRawPath() || "").replace(p, ""), u = o.lastIndexOf("/") + 1;
                    a = i((u ? o.substring(0, u) : "") + i(r)).replace(p, "")
                }
            } else a = a && a.replace(p, ""), a !== r && n.setRawPath(a);
            return s ? n.setRawPath(a) : s = t.hasQuery(), s ? n.setRawQuery(t.getRawQuery()) : s = t.hasFragment(), s && n.setRawFragment(t.getRawFragment()), n
        }

        function u(e, t, n, s, r, a, i) {
            this.scheme_ = e, this.credentials_ = t, this.domain_ = n, this.port_ = s, this.path_ = r, this.query_ = a, this.fragment_ = i, this.paramCache_ = null
        }

        function h(e) {
            return"string" == typeof e && e.length > 0 ? e : null
        }

        var c = new RegExp("(/|^)(?:[^./][^/]*|\\.{2,}(?:[^./][^/]*)|\\.{3,}[^/]*)/\\.\\.(?:/|$)"), l = new RegExp(c), p = /^(?:\.\.\/)*(?:\.\.$)?/;
        u.prototype.toString = function () {
            var e = [];
            return null !== this.scheme_ && e.push(this.scheme_, ":"), null !== this.domain_ && (e.push("//"), null !== this.credentials_ && e.push(this.credentials_, "@"), e.push(this.domain_), null !== this.port_ && e.push(":", this.port_.toString())), null !== this.path_ && e.push(this.path_), null !== this.query_ && e.push("?", this.query_), null !== this.fragment_ && e.push("#", this.fragment_), e.join("")
        }, u.prototype.clone = function () {
            return new u(this.scheme_, this.credentials_, this.domain_, this.port_, this.path_, this.query_, this.fragment_)
        }, u.prototype.getScheme = function () {
            return this.scheme_ && decodeURIComponent(this.scheme_).toLowerCase()
        }, u.prototype.getRawScheme = function () {
            return this.scheme_
        }, u.prototype.setScheme = function (e) {
            return this.scheme_ = s(e, d), this
        }, u.prototype.setRawScheme = function (e) {
            return this.scheme_ = e ? e : null, this
        }, u.prototype.hasScheme = function () {
            return null !== this.scheme_
        }, u.prototype.getCredentials = function () {
            return this.credentials_ && decodeURIComponent(this.credentials_)
        }, u.prototype.getRawCredentials = function () {
            return this.credentials_
        }, u.prototype.setCredentials = function (e) {
            return this.credentials_ = s(e, d), this
        }, u.prototype.setRawCredentials = function (e) {
            return this.credentials_ = e ? e : null, this
        }, u.prototype.hasCredentials = function () {
            return null !== this.credentials_
        }, u.prototype.getDomain = function () {
            return this.domain_ && decodeURIComponent(this.domain_)
        }, u.prototype.getRawDomain = function () {
            return this.domain_
        }, u.prototype.setDomain = function (e) {
            return this.setRawDomain(e && encodeURIComponent(e))
        }, u.prototype.setRawDomain = function (e) {
            return this.domain_ = e ? e : null, this.setRawPath(this.path_)
        }, u.prototype.hasDomain = function () {
            return null !== this.domain_
        }, u.prototype.getPort = function () {
            return this.port_ && decodeURIComponent(this.port_)
        }, u.prototype.setPort = function (e) {
            if (e) {
                if (e = Number(e), e !== (65535 & e))throw new Error("Bad port number " + e);
                this.port_ = "" + e
            } else this.port_ = null;
            return this
        }, u.prototype.hasPort = function () {
            return null !== this.port_
        }, u.prototype.getPath = function () {
            return this.path_ && decodeURIComponent(this.path_)
        }, u.prototype.getRawPath = function () {
            return this.path_
        }, u.prototype.setPath = function (e) {
            return this.setRawPath(s(e, m))
        }, u.prototype.setRawPath = function (e) {
            return e ? (e = String(e), this.path_ = !this.domain_ || /^\//.test(e) ? e : "/" + e) : this.path_ = null, this
        }, u.prototype.hasPath = function () {
            return null !== this.path_
        }, u.prototype.getQuery = function () {
            return this.query_ && decodeURIComponent(this.query_).replace(/\+/g, " ")
        }, u.prototype.getRawQuery = function () {
            return this.query_
        }, u.prototype.setQuery = function (e) {
            return this.paramCache_ = null, this.query_ = n(e), this
        }, u.prototype.setRawQuery = function (e) {
            return this.paramCache_ = null, this.query_ = e ? e : null, this
        }, u.prototype.hasQuery = function () {
            return null !== this.query_
        }, u.prototype.setAllParameters = function (e) {
            if ("object" == typeof e && !(e instanceof Array) && (e instanceof Object || "[object Array]" !== Object.prototype.toString.call(e))) {
                var t = [], n = -1;
                for (var s in e) {
                    var r = e[s];
                    "string" == typeof r && (t[++n] = s, t[++n] = r)
                }
                e = t
            }
            this.paramCache_ = null;
            for (var a = [], i = "", o = 0; e.length > o;) {
                var s = e[o++], r = e[o++];
                a.push(i, encodeURIComponent(s.toString())), i = "&", r && a.push("=", encodeURIComponent(r.toString()))
            }
            return this.query_ = a.join(""), this
        }, u.prototype.checkParameterCache_ = function () {
            if (!this.paramCache_) {
                var e = this.query_;
                if (e) {
                    for (var t = e.split(/[&\?]/), n = [], s = -1, r = 0; t.length > r; ++r) {
                        var a = t[r].match(/^([^=]*)(?:=(.*))?$/);
                        n[++s] = decodeURIComponent(a[1]).replace(/\+/g, " "), n[++s] = decodeURIComponent(a[2] || "").replace(/\+/g, " ")
                    }
                    this.paramCache_ = n
                } else this.paramCache_ = []
            }
        }, u.prototype.setParameterValues = function (e, t) {
            "string" == typeof t && (t = [t]), this.checkParameterCache_();
            for (var n = 0, s = this.paramCache_, r = [], a = 0; s.length > a; a += 2)e === s[a] ? t.length > n && r.push(e, t[n++]) : r.push(s[a], s[a + 1]);
            for (; t.length > n;)r.push(e, t[n++]);
            return this.setAllParameters(r), this
        }, u.prototype.removeParameter = function (e) {
            return this.setParameterValues(e, [])
        }, u.prototype.getAllParameters = function () {
            return this.checkParameterCache_(), this.paramCache_.slice(0, this.paramCache_.length)
        }, u.prototype.getParameterValues = function (e) {
            this.checkParameterCache_();
            for (var t = [], n = 0; this.paramCache_.length > n; n += 2)e === this.paramCache_[n] && t.push(this.paramCache_[n + 1]);
            return t
        }, u.prototype.getParameterMap = function () {
            this.checkParameterCache_();
            for (var e = {}, t = 0; this.paramCache_.length > t; t += 2) {
                var n = this.paramCache_[t++], s = this.paramCache_[t++];
                n in e ? e[n].push(s) : e[n] = [s]
            }
            return e
        }, u.prototype.getParameterValue = function (e) {
            this.checkParameterCache_();
            for (var t = 0; this.paramCache_.length > t; t += 2)if (e === this.paramCache_[t])return this.paramCache_[t + 1];
            return null
        }, u.prototype.getFragment = function () {
            return this.fragment_ && decodeURIComponent(this.fragment_)
        }, u.prototype.getRawFragment = function () {
            return this.fragment_
        }, u.prototype.setFragment = function (e) {
            return this.fragment_ = e ? encodeURIComponent(e) : null, this
        }, u.prototype.setRawFragment = function (e) {
            return this.fragment_ = e ? e : null, this
        }, u.prototype.hasFragment = function () {
            return null !== this.fragment_
        };
        var f = new RegExp("^(?:([^:/?#]+):)?(?://(?:([^/?#]*)@)?([^/?#:@]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"), d = /[#\/\?@]/g, m = /[\#\?]/g;
        return u.parse = e, u.create = t, u.resolve = o, u.collapse_dots = i, u.utils = {mimeTypeOf: function (t) {
            var n = e(t);
            return/\.html$/.test(n.getPath()) ? "text/html" : "application/javascript"
        }, resolve: function (t, n) {
            return t ? o(e(t), e(n)).toString() : "" + n
        }}, u
    }(), t = {};
    t.atype = {NONE: 0, URI: 1, URI_FRAGMENT: 11, SCRIPT: 2, STYLE: 3, HTML: 12, ID: 4, IDREF: 5, IDREFS: 6, GLOBAL_NAME: 7, LOCAL_NAME: 8, CLASSES: 9, FRAME_TARGET: 10, MEDIA_QUERY: 13}, t.ATTRIBS = {"*::class": 9, "*::dir": 0, "*::draggable": 0, "*::hidden": 0, "*::id": 4, "*::inert": 0, "*::itemprop": 0, "*::itemref": 6, "*::itemscope": 0, "*::lang": 0, "*::onblur": 2, "*::onchange": 2, "*::onclick": 2, "*::ondblclick": 2, "*::onfocus": 2, "*::onkeydown": 2, "*::onkeypress": 2, "*::onkeyup": 2, "*::onload": 2, "*::onmousedown": 2, "*::onmousemove": 2, "*::onmouseout": 2, "*::onmouseover": 2, "*::onmouseup": 2, "*::onreset": 2, "*::onscroll": 2, "*::onselect": 2, "*::onsubmit": 2, "*::onunload": 2, "*::spellcheck": 0, "*::style": 3, "*::title": 0, "*::translate": 0, "a::accesskey": 0, "a::coords": 0, "a::href": 1, "a::hreflang": 0, "a::name": 7, "a::onblur": 2, "a::onfocus": 2, "a::shape": 0, "a::tabindex": 0, "a::target": 10, "a::type": 0, "area::accesskey": 0, "area::alt": 0, "area::coords": 0, "area::href": 1, "area::nohref": 0, "area::onblur": 2, "area::onfocus": 2, "area::shape": 0, "area::tabindex": 0, "area::target": 10, "audio::controls": 0, "audio::loop": 0, "audio::mediagroup": 5, "audio::muted": 0, "audio::preload": 0, "bdo::dir": 0, "blockquote::cite": 1, "br::clear": 0, "button::accesskey": 0, "button::disabled": 0, "button::name": 8, "button::onblur": 2, "button::onfocus": 2, "button::tabindex": 0, "button::type": 0, "button::value": 0, "canvas::height": 0, "canvas::width": 0, "caption::align": 0, "col::align": 0, "col::char": 0, "col::charoff": 0, "col::span": 0, "col::valign": 0, "col::width": 0, "colgroup::align": 0, "colgroup::char": 0, "colgroup::charoff": 0, "colgroup::span": 0, "colgroup::valign": 0, "colgroup::width": 0, "command::checked": 0, "command::command": 5, "command::disabled": 0, "command::icon": 1, "command::label": 0, "command::radiogroup": 0, "command::type": 0, "data::value": 0, "del::cite": 1, "del::datetime": 0, "details::open": 0, "dir::compact": 0, "div::align": 0, "dl::compact": 0, "fieldset::disabled": 0, "font::color": 0, "font::face": 0, "font::size": 0, "form::accept": 0, "form::action": 1, "form::autocomplete": 0, "form::enctype": 0, "form::method": 0, "form::name": 7, "form::novalidate": 0, "form::onreset": 2, "form::onsubmit": 2, "form::target": 10, "h1::align": 0, "h2::align": 0, "h3::align": 0, "h4::align": 0, "h5::align": 0, "h6::align": 0, "hr::align": 0, "hr::noshade": 0, "hr::size": 0, "hr::width": 0, "iframe::align": 0, "iframe::frameborder": 0, "iframe::height": 0, "iframe::marginheight": 0, "iframe::marginwidth": 0, "iframe::width": 0, "img::align": 0, "img::alt": 0, "img::border": 0, "img::height": 0, "img::hspace": 0, "img::ismap": 0, "img::name": 7, "img::src": 1, "img::usemap": 11, "img::vspace": 0, "img::width": 0, "input::accept": 0, "input::accesskey": 0, "input::align": 0, "input::alt": 0, "input::autocomplete": 0, "input::checked": 0, "input::disabled": 0, "input::inputmode": 0, "input::ismap": 0, "input::list": 5, "input::max": 0, "input::maxlength": 0, "input::min": 0, "input::multiple": 0, "input::name": 8, "input::onblur": 2, "input::onchange": 2, "input::onfocus": 2, "input::onselect": 2, "input::placeholder": 0, "input::readonly": 0, "input::required": 0, "input::size": 0, "input::src": 1, "input::step": 0, "input::tabindex": 0, "input::type": 0, "input::usemap": 11, "input::value": 0, "ins::cite": 1, "ins::datetime": 0, "label::accesskey": 0, "label::for": 5, "label::onblur": 2, "label::onfocus": 2, "legend::accesskey": 0, "legend::align": 0, "li::type": 0, "li::value": 0, "map::name": 7, "menu::compact": 0, "menu::label": 0, "menu::type": 0, "meter::high": 0, "meter::low": 0, "meter::max": 0, "meter::min": 0, "meter::value": 0, "ol::compact": 0, "ol::reversed": 0, "ol::start": 0, "ol::type": 0, "optgroup::disabled": 0, "optgroup::label": 0, "option::disabled": 0, "option::label": 0, "option::selected": 0, "option::value": 0, "output::for": 6, "output::name": 8, "p::align": 0, "pre::width": 0, "progress::max": 0, "progress::min": 0, "progress::value": 0, "q::cite": 1, "select::autocomplete": 0, "select::disabled": 0, "select::multiple": 0, "select::name": 8, "select::onblur": 2, "select::onchange": 2, "select::onfocus": 2, "select::required": 0, "select::size": 0, "select::tabindex": 0, "source::type": 0, "table::align": 0, "table::bgcolor": 0, "table::border": 0, "table::cellpadding": 0, "table::cellspacing": 0, "table::frame": 0, "table::rules": 0, "table::summary": 0, "table::width": 0, "tbody::align": 0, "tbody::char": 0, "tbody::charoff": 0, "tbody::valign": 0, "td::abbr": 0, "td::align": 0, "td::axis": 0, "td::bgcolor": 0, "td::char": 0, "td::charoff": 0, "td::colspan": 0, "td::headers": 6, "td::height": 0, "td::nowrap": 0, "td::rowspan": 0, "td::scope": 0, "td::valign": 0, "td::width": 0, "textarea::accesskey": 0, "textarea::autocomplete": 0, "textarea::cols": 0, "textarea::disabled": 0, "textarea::inputmode": 0, "textarea::name": 8, "textarea::onblur": 2, "textarea::onchange": 2, "textarea::onfocus": 2, "textarea::onselect": 2, "textarea::placeholder": 0, "textarea::readonly": 0, "textarea::required": 0, "textarea::rows": 0, "textarea::tabindex": 0, "textarea::wrap": 0, "tfoot::align": 0, "tfoot::char": 0, "tfoot::charoff": 0, "tfoot::valign": 0, "th::abbr": 0, "th::align": 0, "th::axis": 0, "th::bgcolor": 0, "th::char": 0, "th::charoff": 0, "th::colspan": 0, "th::headers": 6, "th::height": 0, "th::nowrap": 0, "th::rowspan": 0, "th::scope": 0, "th::valign": 0, "th::width": 0, "thead::align": 0, "thead::char": 0, "thead::charoff": 0, "thead::valign": 0, "tr::align": 0, "tr::bgcolor": 0, "tr::char": 0, "tr::charoff": 0, "tr::valign": 0, "track::default": 0, "track::kind": 0, "track::label": 0, "track::srclang": 0, "ul::compact": 0, "ul::type": 0, "video::controls": 0, "video::height": 0, "video::loop": 0, "video::mediagroup": 5, "video::muted": 0, "video::poster": 1, "video::preload": 0, "video::width": 0}, t.eflags = {OPTIONAL_ENDTAG: 1, EMPTY: 2, CDATA: 4, RCDATA: 8, UNSAFE: 16, FOLDABLE: 32, SCRIPT: 64, STYLE: 128, VIRTUALIZED: 256}, t.ELEMENTS = {a: 0, abbr: 0, acronym: 0, address: 0, applet: 272, area: 2, article: 0, aside: 0, audio: 0, b: 0, base: 274, basefont: 274, bdi: 0, bdo: 0, big: 0, blockquote: 0, body: 305, br: 2, button: 0, canvas: 0, caption: 0, center: 0, cite: 0, code: 0, col: 2, colgroup: 1, command: 2, data: 0, datalist: 0, dd: 1, del: 0, details: 0, dfn: 0, dialog: 272, dir: 0, div: 0, dl: 0, dt: 1, em: 0, fieldset: 0, figcaption: 0, figure: 0, font: 0, footer: 0, form: 0, frame: 274, frameset: 272, h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0, head: 305, header: 0, hgroup: 0, hr: 2, html: 305, i: 0, iframe: 4, img: 2, input: 2, ins: 0, isindex: 274, kbd: 0, keygen: 274, label: 0, legend: 0, li: 1, link: 274, map: 0, mark: 0, menu: 0, meta: 274, meter: 0, nav: 0, nobr: 0, noembed: 276, noframes: 276, noscript: 276, object: 272, ol: 0, optgroup: 0, option: 1, output: 0, p: 1, param: 274, pre: 0, progress: 0, q: 0, s: 0, samp: 0, script: 84, section: 0, select: 0, small: 0, source: 2, span: 0, strike: 0, strong: 0, style: 148, sub: 0, summary: 0, sup: 0, table: 0, tbody: 1, td: 1, textarea: 8, tfoot: 1, th: 1, thead: 1, time: 0, title: 280, tr: 1, track: 2, tt: 0, u: 0, ul: 0, "var": 0, video: 0, wbr: 2}, t.ELEMENT_DOM_INTERFACES = {a: "HTMLAnchorElement", abbr: "HTMLElement", acronym: "HTMLElement", address: "HTMLElement", applet: "HTMLAppletElement", area: "HTMLAreaElement", article: "HTMLElement", aside: "HTMLElement", audio: "HTMLAudioElement", b: "HTMLElement", base: "HTMLBaseElement", basefont: "HTMLBaseFontElement", bdi: "HTMLElement", bdo: "HTMLElement", big: "HTMLElement", blockquote: "HTMLQuoteElement", body: "HTMLBodyElement", br: "HTMLBRElement", button: "HTMLButtonElement", canvas: "HTMLCanvasElement", caption: "HTMLTableCaptionElement", center: "HTMLElement", cite: "HTMLElement", code: "HTMLElement", col: "HTMLTableColElement", colgroup: "HTMLTableColElement", command: "HTMLCommandElement", data: "HTMLElement", datalist: "HTMLDataListElement", dd: "HTMLElement", del: "HTMLModElement", details: "HTMLDetailsElement", dfn: "HTMLElement", dialog: "HTMLDialogElement", dir: "HTMLDirectoryElement", div: "HTMLDivElement", dl: "HTMLDListElement", dt: "HTMLElement", em: "HTMLElement", fieldset: "HTMLFieldSetElement", figcaption: "HTMLElement", figure: "HTMLElement", font: "HTMLFontElement", footer: "HTMLElement", form: "HTMLFormElement", frame: "HTMLFrameElement", frameset: "HTMLFrameSetElement", h1: "HTMLHeadingElement", h2: "HTMLHeadingElement", h3: "HTMLHeadingElement", h4: "HTMLHeadingElement", h5: "HTMLHeadingElement", h6: "HTMLHeadingElement", head: "HTMLHeadElement", header: "HTMLElement", hgroup: "HTMLElement", hr: "HTMLHRElement", html: "HTMLHtmlElement", i: "HTMLElement", iframe: "HTMLIFrameElement", img: "HTMLImageElement", input: "HTMLInputElement", ins: "HTMLModElement", isindex: "HTMLUnknownElement", kbd: "HTMLElement", keygen: "HTMLKeygenElement", label: "HTMLLabelElement", legend: "HTMLLegendElement", li: "HTMLLIElement", link: "HTMLLinkElement", map: "HTMLMapElement", mark: "HTMLElement", menu: "HTMLMenuElement", meta: "HTMLMetaElement", meter: "HTMLMeterElement", nav: "HTMLElement", nobr: "HTMLElement", noembed: "HTMLElement", noframes: "HTMLElement", noscript: "HTMLElement", object: "HTMLObjectElement", ol: "HTMLOListElement", optgroup: "HTMLOptGroupElement", option: "HTMLOptionElement", output: "HTMLOutputElement", p: "HTMLParagraphElement", param: "HTMLParamElement", pre: "HTMLPreElement", progress: "HTMLProgressElement", q: "HTMLQuoteElement", s: "HTMLElement", samp: "HTMLElement", script: "HTMLScriptElement", section: "HTMLElement", select: "HTMLSelectElement", small: "HTMLElement", source: "HTMLSourceElement", span: "HTMLSpanElement", strike: "HTMLElement", strong: "HTMLElement", style: "HTMLStyleElement", sub: "HTMLElement", summary: "HTMLElement", sup: "HTMLElement", table: "HTMLTableElement", tbody: "HTMLTableSectionElement", td: "HTMLTableDataCellElement", textarea: "HTMLTextAreaElement", tfoot: "HTMLTableSectionElement", th: "HTMLTableHeaderCellElement", thead: "HTMLTableSectionElement", time: "HTMLTimeElement", title: "HTMLTitleElement", tr: "HTMLTableRowElement", track: "HTMLTrackElement", tt: "HTMLElement", u: "HTMLElement", ul: "HTMLUListElement", "var": "HTMLElement", video: "HTMLVideoElement", wbr: "HTMLElement"}, t.ueffects = {NOT_LOADED: 0, SAME_DOCUMENT: 1, NEW_DOCUMENT: 2}, t.URIEFFECTS = {"a::href": 2, "area::href": 2, "blockquote::cite": 0, "command::icon": 1, "del::cite": 0, "form::action": 2, "img::src": 1, "input::src": 1, "ins::cite": 0, "q::cite": 0, "video::poster": 1}, t.ltypes = {UNSANDBOXED: 2, SANDBOXED: 1, DATA: 0}, t.LOADERTYPES = {"a::href": 2, "area::href": 2, "blockquote::cite": 2, "command::icon": 1, "del::cite": 2, "form::action": 2, "img::src": 1, "input::src": 1, "ins::cite": 2, "q::cite": 2, "video::poster": 1};// Copyright (C) 2006 Google Inc.
    var n = function (t) {
        function n(e) {
            if (N.hasOwnProperty(e))return N[e];
            var t = e.match(P);
            if (t)return String.fromCharCode(parseInt(t[1], 10));
            if (t = e.match(R))return String.fromCharCode(parseInt(t[1], 16));
            if (L && M.test(e)) {
                L.innerHTML = "&" + e + ";";
                var n = L.textContent;
                return N[e] = n, n
            }
            return"&" + e + ";"
        }

        function s(e, t) {
            return n(t)
        }

        function r(e) {
            return e.replace(O, "")
        }

        function a(e) {
            return e.replace(j, s)
        }

        function i(e) {
            return("" + e).replace(H, "&amp;").replace(F, "&lt;").replace(B, "&gt;").replace(G, "&#34;")
        }

        function o(e) {
            return e.replace(V, "&amp;$1").replace(F, "&lt;").replace(B, "&gt;")
        }

        function u(e) {
            var t = {cdata: e.cdata || e.cdata, comment: e.comment || e.comment, endDoc: e.endDoc || e.endDoc, endTag: e.endTag || e.endTag, pcdata: e.pcdata || e.pcdata, rcdata: e.rcdata || e.rcdata, startDoc: e.startDoc || e.startDoc, startTag: e.startTag || e.startTag};
            return function (e, n) {
                return h(e, t, n)
            }
        }

        function h(e, t, n) {
            var s = p(e), r = {noMoreGT: !1, noMoreEndComments: !1};
            l(t, s, 0, r, n)
        }

        function c(e, t, n, s, r) {
            return function () {
                l(e, t, n, s, r)
            }
        }

        function l(e, n, s, r, a) {
            try {
                e.startDoc && 0 == s && e.startDoc(a);
                for (var i, o, u, h = s, l = n.length; l > h;) {
                    var p = n[h++], g = n[h];
                    switch (p) {
                        case"&":
                            U.test(g) ? (e.pcdata && e.pcdata("&" + g, a, Q, c(e, n, h, r, a)), h++) : e.pcdata && e.pcdata("&amp;", a, Q, c(e, n, h, r, a));
                            break;
                        case"</":
                            (i = /^([-\w:]+)[^\'\"]*/.exec(g)) ? i[0].length === g.length && ">" === n[h + 1] ? (h += 2, u = i[1].toLowerCase(), e.endTag && e.endTag(u, a, Q, c(e, n, h, r, a))) : h = f(n, h, e, a, Q, r) : e.pcdata && e.pcdata("&lt;/", a, Q, c(e, n, h, r, a));
                            break;
                        case"<":
                            if (i = /^([-\w:]+)\s*\/?/.exec(g))if (i[0].length === g.length && ">" === n[h + 1]) {
                                h += 2, u = i[1].toLowerCase(), e.startTag && e.startTag(u, [], a, Q, c(e, n, h, r, a));
                                var b = t.ELEMENTS[u];
                                if (b & $) {
                                    var y = {name: u, next: h, eflags: b};
                                    h = m(n, y, e, a, Q, r)
                                }
                            } else h = d(n, h, e, a, Q, r); else e.pcdata && e.pcdata("&lt;", a, Q, c(e, n, h, r, a));
                            break;
                        case"<!--":
                            if (!r.noMoreEndComments) {
                                for (o = h + 1; l > o && (">" !== n[o] || !/--$/.test(n[o - 1])); o++);
                                if (l > o) {
                                    if (e.comment) {
                                        var v = n.slice(h, o).join("");
                                        e.comment(v.substr(0, v.length - 2), a, Q, c(e, n, o + 1, r, a))
                                    }
                                    h = o + 1
                                } else r.noMoreEndComments = !0
                            }
                            r.noMoreEndComments && e.pcdata && e.pcdata("&lt;!--", a, Q, c(e, n, h, r, a));
                            break;
                        case"<!":
                            if (/^\w/.test(g)) {
                                if (!r.noMoreGT) {
                                    for (o = h + 1; l > o && ">" !== n[o]; o++);
                                    l > o ? h = o + 1 : r.noMoreGT = !0
                                }
                                r.noMoreGT && e.pcdata && e.pcdata("&lt;!", a, Q, c(e, n, h, r, a))
                            } else e.pcdata && e.pcdata("&lt;!", a, Q, c(e, n, h, r, a));
                            break;
                        case"<?":
                            if (!r.noMoreGT) {
                                for (o = h + 1; l > o && ">" !== n[o]; o++);
                                l > o ? h = o + 1 : r.noMoreGT = !0
                            }
                            r.noMoreGT && e.pcdata && e.pcdata("&lt;?", a, Q, c(e, n, h, r, a));
                            break;
                        case">":
                            e.pcdata && e.pcdata("&gt;", a, Q, c(e, n, h, r, a));
                            break;
                        case"":
                            break;
                        default:
                            e.pcdata && e.pcdata(p, a, Q, c(e, n, h, r, a))
                    }
                }
                e.endDoc && e.endDoc(a)
            } catch (x) {
                if (x !== Q)throw x
            }
        }

        function p(e) {
            var t = /(<\/|<\!--|<[!?]|[&<>])/g;
            if (e += "", q)return e.split(t);
            for (var n, s = [], r = 0; null != (n = t.exec(e));)s.push(e.substring(r, n.index)), s.push(n[0]), r = n.index + n[0].length;
            return s.push(e.substring(r)), s
        }

        function f(e, t, n, s, r, a) {
            var i = g(e, t);
            return i ? (n.endTag && n.endTag(i.name, s, r, c(n, e, t, a, s)), i.next) : e.length
        }

        function d(e, t, n, s, r, a) {
            var i = g(e, t);
            return i ? (n.startTag && n.startTag(i.name, i.attrs, s, r, c(n, e, i.next, a, s)), i.eflags & $ ? m(e, i, n, s, r, a) : i.next) : e.length
        }

        function m(e, n, s, r, a, i) {
            var u = e.length;
            W.hasOwnProperty(n.name) || (W[n.name] = new RegExp("^" + n.name + "(?:[\\s\\/]|$)", "i"));
            for (var h = W[n.name], l = n.next, p = n.next + 1; u > p && ("</" !== e[p - 1] || !h.test(e[p])); p++);
            u > p && (p -= 1);
            var f = e.slice(l, p).join("");
            if (n.eflags & t.eflags.CDATA)s.cdata && s.cdata(f, r, a, c(s, e, p, i, r)); else {
                if (!(n.eflags & t.eflags.RCDATA))throw new Error("bug");
                s.rcdata && s.rcdata(o(f), r, a, c(s, e, p, i, r))
            }
            return p
        }

        function g(e, n) {
            var s = /^([-\w:]+)/.exec(e[n]), r = {};
            r.name = s[1].toLowerCase(), r.eflags = t.ELEMENTS[r.name];
            for (var a = e[n].substr(s[0].length), i = n + 1, o = e.length; o > i && ">" !== e[i]; i++)a += e[i];
            if (i >= o)return void 0;
            for (var u = []; "" !== a;)if (s = z.exec(a)) {
                if (s[4] && !s[5] || s[6] && !s[7]) {
                    for (var h = s[4] || s[6], c = !1, l = [a, e[i++]]; o > i; i++) {
                        if (c) {
                            if (">" === e[i])break
                        } else e[i].indexOf(h) >= 0 && (c = !0);
                        l.push(e[i])
                    }
                    if (i >= o)break;
                    a = l.join("");
                    continue
                }
                var p = s[1].toLowerCase(), f = s[2] ? b(s[3]) : "";
                u.push(p, f), a = a.substr(s[0].length)
            } else a = a.replace(/^[\s\S][^a-z\s]*/, "");
            return r.attrs = u, r.next = i + 1, r
        }

        function b(e) {
            var t = e.charCodeAt(0);
            return(34 === t || 39 === t) && (e = e.substr(1, e.length - 2)), a(r(e))
        }

        function y(e) {
            var n, s, r = function (e, t) {
                s || t.push(e)
            };
            return u({startDoc: function () {
                n = [], s = !1
            }, startTag: function (r, a, o) {
                if (!s && t.ELEMENTS.hasOwnProperty(r)) {
                    var u = t.ELEMENTS[r];
                    if (!(u & t.eflags.FOLDABLE)) {
                        var h = e(r, a);
                        if (!h)return s = !(u & t.eflags.EMPTY), void 0;
                        if ("object" != typeof h)throw new Error("tagPolicy did not return object (old API?)");
                        if (!("attribs"in h))throw new Error("tagPolicy gave no attribs");
                        a = h.attribs;
                        var c, l;
                        if ("tagName"in h ? (l = h.tagName, c = t.ELEMENTS[l]) : (l = r, c = u), u & t.eflags.OPTIONAL_ENDTAG) {
                            var p = n[n.length - 1];
                            !p || p.orig !== r || p.rep === l && r === l || o.push("</", p.rep, ">")
                        }
                        u & t.eflags.EMPTY || n.push({orig: r, rep: l}), o.push("<", l);
                        for (var f = 0, d = a.length; d > f; f += 2) {
                            var m = a[f], g = a[f + 1];
                            null != g && void 0 !== g && o.push(" ", m, '="', i(g), '"')
                        }
                        o.push(">"), u & t.eflags.EMPTY && !(c & t.eflags.EMPTY) && o.push("</", l, ">")
                    }
                }
            }, endTag: function (e, r) {
                if (s)return s = !1, void 0;
                if (t.ELEMENTS.hasOwnProperty(e)) {
                    var a = t.ELEMENTS[e];
                    if (!(a & (t.eflags.EMPTY | t.eflags.FOLDABLE))) {
                        var i;
                        if (a & t.eflags.OPTIONAL_ENDTAG)for (i = n.length; --i >= 0;) {
                            var o = n[i].orig;
                            if (o === e)break;
                            if (!(t.ELEMENTS[o] & t.eflags.OPTIONAL_ENDTAG))return
                        } else for (i = n.length; --i >= 0 && n[i].orig !== e;);
                        if (0 > i)return;
                        for (var u = n.length; --u > i;) {
                            var h = n[u].rep;
                            t.ELEMENTS[h] & t.eflags.OPTIONAL_ENDTAG || r.push("</", h, ">")
                        }
                        n.length > i && (e = n[i].rep), n.length = i, r.push("</", e, ">")
                    }
                }
            }, pcdata: r, rcdata: r, cdata: r, endDoc: function (e) {
                for (; n.length; n.length--)e.push("</", n[n.length - 1].rep, ">")
            }})
        }

        function v(t, n, s, r, a) {
            if (!a)return null;
            try {
                var i = e.parse("" + t);
                if (i && (!i.hasScheme() || K.test(i.getScheme()))) {
                    var o = a(i, n, s, r);
                    return o ? o.toString() : null
                }
            } catch (u) {
                return null
            }
            return null
        }

        function x(e, t, n, s, r) {
            if (n || e(t + " removed", {change: "removed", tagName: t}), s !== r) {
                var a = "changed";
                s && !r ? a = "removed" : !s && r && (a = "added"), e(t + "." + n + " " + a, {change: a, tagName: t, attribName: n, oldValue: s, newValue: r})
            }
        }

        function _(e, t, n) {
            var s;
            return s = t + "::" + n, e.hasOwnProperty(s) ? e[s] : (s = "*::" + n, e.hasOwnProperty(s) ? e[s] : void 0)
        }

        function E(e, n) {
            return _(t.LOADERTYPES, e, n)
        }

        function w(e, n) {
            return _(t.URIEFFECTS, e, n)
        }

        function T(e, n, s, r, a) {
            for (var i = 0; n.length > i; i += 2) {
                var o, u = n[i], h = n[i + 1], c = h, l = null;
                if (o = e + "::" + u, (t.ATTRIBS.hasOwnProperty(o) || (o = "*::" + u, t.ATTRIBS.hasOwnProperty(o))) && (l = t.ATTRIBS[o]), null != l)switch (l) {
                    case t.atype.NONE:
                        break;
                    case t.atype.SCRIPT:
                        h = null, a && x(a, e, u, c, h);
                        break;
                    case t.atype.STYLE:
                        if ("undefined" == typeof S) {
                            h = null, a && x(a, e, u, c, h);
                            break
                        }
                        var p = [];
                        S(h, {declaration: function (e, n) {
                            var r = e.toLowerCase(), a = A[r];
                            a && (k(r, a, n, s ? function (e) {
                                return v(e, t.ueffects.SAME_DOCUMENT, t.ltypes.SANDBOXED, {TYPE: "CSS", CSS_PROP: r}, s)
                            } : null), p.push(e + ": " + n.join(" ")))
                        }}), h = p.length > 0 ? p.join(" ; ") : null, a && x(a, e, u, c, h);
                        break;
                    case t.atype.ID:
                    case t.atype.IDREF:
                    case t.atype.IDREFS:
                    case t.atype.GLOBAL_NAME:
                    case t.atype.LOCAL_NAME:
                    case t.atype.CLASSES:
                        h = r ? r(h) : h, a && x(a, e, u, c, h);
                        break;
                    case t.atype.URI:
                        h = v(h, w(e, u), E(e, u), {TYPE: "MARKUP", XML_ATTR: u, XML_TAG: e}, s), a && x(a, e, u, c, h);
                        break;
                    case t.atype.URI_FRAGMENT:
                        h && "#" === h.charAt(0) ? (h = h.substring(1), h = r ? r(h) : h, null != h && void 0 !== h && (h = "#" + h)) : h = null, a && x(a, e, u, c, h);
                        break;
                    default:
                        h = null, a && x(a, e, u, c, h)
                } else h = null, a && x(a, e, u, c, h);
                n[i + 1] = h
            }
            return n
        }

        function C(e, n, s) {
            return function (r, a) {
                return t.ELEMENTS[r] & t.eflags.UNSAFE ? (s && x(s, r, void 0, void 0, void 0), void 0) : {attribs: T(r, a, e, n, s)}
            }
        }

        function D(e, t) {
            var n = [];
            return y(t)(e, n), n.join("")
        }

        function I(e, t, n, s) {
            var r = C(t, n, s);
            return D(e, r)
        }

        var S, k, A;
        "undefined" != typeof window && (S = window.parseCssDeclarations, k = window.sanitizeCssProperty, A = window.cssSchema);
        var N = {lt: "<", LT: "<", gt: ">", GT: ">", amp: "&", AMP: "&", quot: '"', apos: "'", nbsp: " "}, P = /^#(\d+)$/, R = /^#x([0-9A-Fa-f]+)$/, M = /^[A-Za-z][A-za-z0-9]+$/, L = "undefined" != typeof window && window.document ? window.document.createElement("textarea") : null, O = /\0/g, j = /&(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/g, U = /^(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/, H = /&/g, V = /&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi, F = /[<]/g, B = />/g, G = /\"/g, z = new RegExp("^\\s*([-.:\\w]+)(?:\\s*(=)\\s*((\")[^\"]*(\"|$)|(')[^']*('|$)|(?=[a-z][-\\w]*\\s*=)|[^\"'\\s]*))?", "i"), q = 3 === "a,b".split(/(,)/).length, $ = t.eflags.CDATA | t.eflags.RCDATA, Q = {}, W = {}, K = /^(?:https?|mailto)$/i, Y = {};
        return Y.escapeAttrib = Y.escapeAttrib = i, Y.makeHtmlSanitizer = Y.makeHtmlSanitizer = y, Y.makeSaxParser = Y.makeSaxParser = u, Y.makeTagPolicy = Y.makeTagPolicy = C, Y.normalizeRCData = Y.normalizeRCData = o, Y.sanitize = Y.sanitize = I, Y.sanitizeAttribs = Y.sanitizeAttribs = T, Y.sanitizeWithPolicy = Y.sanitizeWithPolicy = D, Y.unescapeEntities = Y.unescapeEntities = a, Y
    }(t);
    return function (e) {
        return n.sanitize(e, function (e) {
            return e
        })
    }
}();