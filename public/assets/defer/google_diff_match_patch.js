/**
 * Diff Match and Patch
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function diff_match_patch() {
    this.Diff_Timeout = 1, this.Diff_EditCost = 4
}
var DIFF_DELETE = -1, DIFF_INSERT = 1, DIFF_EQUAL = 0;
diff_match_patch.Diff, diff_match_patch.prototype.diff_main = function (e, t, s, n) {
    "undefined" == typeof n && (n = 0 >= this.Diff_Timeout ? Number.MAX_VALUE : (new Date).getTime() + 1e3 * this.Diff_Timeout);
    var r = n;
    if (null == e || null == t)throw new Error("Null input. (diff_main)");
    if (e == t)return e ? [
        [DIFF_EQUAL, e]
    ] : [];
    "undefined" == typeof s && (s = !0);
    var a = s, i = this.diff_commonPrefix(e, t), o = e.substring(0, i);
    e = e.substring(i), t = t.substring(i), i = this.diff_commonSuffix(e, t);
    var u = e.substring(e.length - i);
    e = e.substring(0, e.length - i), t = t.substring(0, t.length - i);
    var h = this.diff_compute_(e, t, a, r);
    return o && h.unshift([DIFF_EQUAL, o]), u && h.push([DIFF_EQUAL, u]), this.diff_cleanupMerge(h), h
}, diff_match_patch.prototype.diff_compute_ = function (e, t, s, n) {
    var r;
    if (!e)return[
        [DIFF_INSERT, t]
    ];
    if (!t)return[
        [DIFF_DELETE, e]
    ];
    var a = e.length > t.length ? e : t, i = e.length > t.length ? t : e, o = a.indexOf(i);
    if (-1 != o)return r = [
        [DIFF_INSERT, a.substring(0, o)],
        [DIFF_EQUAL, i],
        [DIFF_INSERT, a.substring(o + i.length)]
    ], e.length > t.length && (r[0][0] = r[2][0] = DIFF_DELETE), r;
    if (1 == i.length)return[
        [DIFF_DELETE, e],
        [DIFF_INSERT, t]
    ];
    var u = this.diff_halfMatch_(e, t);
    if (u) {
        var h = u[0], c = u[1], l = u[2], p = u[3], f = u[4], d = this.diff_main(h, l, s, n), m = this.diff_main(c, p, s, n);
        return d.concat([
            [DIFF_EQUAL, f]
        ], m)
    }
    return s && e.length > 100 && t.length > 100 ? this.diff_lineMode_(e, t, n) : this.diff_bisect_(e, t, n)
}, diff_match_patch.prototype.diff_lineMode_ = function (e, t, s) {
    var n = this.diff_linesToChars_(e, t);
    e = n.chars1, t = n.chars2;
    var r = n.lineArray, a = this.diff_main(e, t, !1, s);
    this.diff_charsToLines_(a, r), this.diff_cleanupSemantic(a), a.push([DIFF_EQUAL, ""]);
    for (var i = 0, o = 0, u = 0, h = "", c = ""; a.length > i;) {
        switch (a[i][0]) {
            case DIFF_INSERT:
                u++, c += a[i][1];
                break;
            case DIFF_DELETE:
                o++, h += a[i][1];
                break;
            case DIFF_EQUAL:
                if (o >= 1 && u >= 1) {
                    a.splice(i - o - u, o + u), i = i - o - u;
                    for (var n = this.diff_main(h, c, !1, s), l = n.length - 1; l >= 0; l--)a.splice(i, 0, n[l]);
                    i += n.length
                }
                u = 0, o = 0, h = "", c = ""
        }
        i++
    }
    return a.pop(), a
}, diff_match_patch.prototype.diff_bisect_ = function (e, t, s) {
    for (var n = e.length, r = t.length, a = Math.ceil((n + r) / 2), i = a, o = 2 * a, u = new Array(o), h = new Array(o), c = 0; o > c; c++)u[c] = -1, h[c] = -1;
    u[i + 1] = 0, h[i + 1] = 0;
    for (var l = n - r, p = 0 != l % 2, f = 0, d = 0, m = 0, g = 0, b = 0; a > b && !((new Date).getTime() > s); b++) {
        for (var y = -b + f; b - d >= y; y += 2) {
            var v, x = i + y;
            v = y == -b || y != b && u[x - 1] < u[x + 1] ? u[x + 1] : u[x - 1] + 1;
            for (var _ = v - y; n > v && r > _ && e.charAt(v) == t.charAt(_);)v++, _++;
            if (u[x] = v, v > n)d += 2; else if (_ > r)f += 2; else if (p) {
                var w = i + l - y;
                if (w >= 0 && o > w && -1 != h[w]) {
                    var E = n - h[w];
                    if (v >= E)return this.diff_bisectSplit_(e, t, v, _, s)
                }
            }
        }
        for (var T = -b + m; b - g >= T; T += 2) {
            var E, w = i + T;
            E = T == -b || T != b && h[w - 1] < h[w + 1] ? h[w + 1] : h[w - 1] + 1;
            for (var C = E - T; n > E && r > C && e.charAt(n - E - 1) == t.charAt(r - C - 1);)E++, C++;
            if (h[w] = E, E > n)g += 2; else if (C > r)m += 2; else if (!p) {
                var x = i + l - T;
                if (x >= 0 && o > x && -1 != u[x]) {
                    var v = u[x], _ = i + v - x;
                    if (E = n - E, v >= E)return this.diff_bisectSplit_(e, t, v, _, s)
                }
            }
        }
    }
    return[
        [DIFF_DELETE, e],
        [DIFF_INSERT, t]
    ]
}, diff_match_patch.prototype.diff_bisectSplit_ = function (e, t, s, n, r) {
    var a = e.substring(0, s), i = t.substring(0, n), o = e.substring(s), u = t.substring(n), h = this.diff_main(a, i, !1, r), c = this.diff_main(o, u, !1, r);
    return h.concat(c)
}, diff_match_patch.prototype.diff_linesToChars_ = function (e, t) {
    function s(e) {
        for (var t = "", s = 0, a = -1, i = n.length; e.length - 1 > a;) {
            a = e.indexOf("\n", s), -1 == a && (a = e.length - 1);
            var o = e.substring(s, a + 1);
            s = a + 1, (r.hasOwnProperty ? r.hasOwnProperty(o) : void 0 !== r[o]) ? t += String.fromCharCode(r[o]) : (t += String.fromCharCode(i), r[o] = i, n[i++] = o)
        }
        return t
    }

    var n = [], r = {};
    n[0] = "";
    var a = s(e), i = s(t);
    return{chars1: a, chars2: i, lineArray: n}
}, diff_match_patch.prototype.diff_charsToLines_ = function (e, t) {
    for (var s = 0; e.length > s; s++) {
        for (var n = e[s][1], r = [], a = 0; n.length > a; a++)r[a] = t[n.charCodeAt(a)];
        e[s][1] = r.join("")
    }
}, diff_match_patch.prototype.diff_commonPrefix = function (e, t) {
    if (!e || !t || e.charAt(0) != t.charAt(0))return 0;
    for (var s = 0, n = Math.min(e.length, t.length), r = n, a = 0; r > s;)e.substring(a, r) == t.substring(a, r) ? (s = r, a = s) : n = r, r = Math.floor((n - s) / 2 + s);
    return r
}, diff_match_patch.prototype.diff_commonSuffix = function (e, t) {
    if (!e || !t || e.charAt(e.length - 1) != t.charAt(t.length - 1))return 0;
    for (var s = 0, n = Math.min(e.length, t.length), r = n, a = 0; r > s;)e.substring(e.length - r, e.length - a) == t.substring(t.length - r, t.length - a) ? (s = r, a = s) : n = r, r = Math.floor((n - s) / 2 + s);
    return r
}, diff_match_patch.prototype.diff_commonOverlap_ = function (e, t) {
    var s = e.length, n = t.length;
    if (0 == s || 0 == n)return 0;
    s > n ? e = e.substring(s - n) : n > s && (t = t.substring(0, s));
    var r = Math.min(s, n);
    if (e == t)return r;
    for (var a = 0, i = 1; ;) {
        var o = e.substring(r - i), u = t.indexOf(o);
        if (-1 == u)return a;
        i += u, (0 == u || e.substring(r - i) == t.substring(0, i)) && (a = i, i++)
    }
}, diff_match_patch.prototype.diff_halfMatch_ = function (e, t) {
    function s(e, t, s) {
        for (var n, r, a, o, u = e.substring(s, s + Math.floor(e.length / 4)), h = -1, c = ""; -1 != (h = t.indexOf(u, h + 1));) {
            var l = i.diff_commonPrefix(e.substring(s), t.substring(h)), p = i.diff_commonSuffix(e.substring(0, s), t.substring(0, h));
            p + l > c.length && (c = t.substring(h - p, h) + t.substring(h, h + l), n = e.substring(0, s - p), r = e.substring(s + l), a = t.substring(0, h - p), o = t.substring(h + l))
        }
        return 2 * c.length >= e.length ? [n, r, a, o, c] : null
    }

    if (0 >= this.Diff_Timeout)return null;
    var n = e.length > t.length ? e : t, r = e.length > t.length ? t : e;
    if (4 > n.length || 2 * r.length < n.length)return null;
    var a, i = this, o = s(n, r, Math.ceil(n.length / 4)), u = s(n, r, Math.ceil(n.length / 2));
    if (!o && !u)return null;
    a = u ? o ? o[4].length > u[4].length ? o : u : u : o;
    var h, c, l, p;
    e.length > t.length ? (h = a[0], c = a[1], l = a[2], p = a[3]) : (l = a[0], p = a[1], h = a[2], c = a[3]);
    var f = a[4];
    return[h, c, l, p, f]
}, diff_match_patch.prototype.diff_cleanupSemantic = function (e) {
    for (var t = !1, s = [], n = 0, r = null, a = 0, i = 0, o = 0, u = 0, h = 0; e.length > a;)e[a][0] == DIFF_EQUAL ? (s[n++] = a, i = u, o = h, u = 0, h = 0, r = e[a][1]) : (e[a][0] == DIFF_INSERT ? u += e[a][1].length : h += e[a][1].length, r && r.length <= Math.max(i, o) && r.length <= Math.max(u, h) && (e.splice(s[n - 1], 0, [DIFF_DELETE, r]), e[s[n - 1] + 1][0] = DIFF_INSERT, n--, n--, a = n > 0 ? s[n - 1] : -1, i = 0, o = 0, u = 0, h = 0, r = null, t = !0)), a++;
    for (t && this.diff_cleanupMerge(e), this.diff_cleanupSemanticLossless(e), a = 1; e.length > a;) {
        if (e[a - 1][0] == DIFF_DELETE && e[a][0] == DIFF_INSERT) {
            var c = e[a - 1][1], l = e[a][1], p = this.diff_commonOverlap_(c, l), f = this.diff_commonOverlap_(l, c);
            p >= f ? (p >= c.length / 2 || p >= l.length / 2) && (e.splice(a, 0, [DIFF_EQUAL, l.substring(0, p)]), e[a - 1][1] = c.substring(0, c.length - p), e[a + 1][1] = l.substring(p), a++) : (f >= c.length / 2 || f >= l.length / 2) && (e.splice(a, 0, [DIFF_EQUAL, c.substring(0, f)]), e[a - 1][0] = DIFF_INSERT, e[a - 1][1] = l.substring(0, l.length - f), e[a + 1][0] = DIFF_DELETE, e[a + 1][1] = c.substring(f), a++), a++
        }
        a++
    }
}, diff_match_patch.prototype.diff_cleanupSemanticLossless = function (e) {
    function t(e, t) {
        if (!e || !t)return 6;
        var s = e.charAt(e.length - 1), n = t.charAt(0), r = s.match(diff_match_patch.nonAlphaNumericRegex_), a = n.match(diff_match_patch.nonAlphaNumericRegex_), i = r && s.match(diff_match_patch.whitespaceRegex_), o = a && n.match(diff_match_patch.whitespaceRegex_), u = i && s.match(diff_match_patch.linebreakRegex_), h = o && n.match(diff_match_patch.linebreakRegex_), c = u && e.match(diff_match_patch.blanklineEndRegex_), l = h && t.match(diff_match_patch.blanklineStartRegex_);
        return c || l ? 5 : u || h ? 4 : r && !i && o ? 3 : i || o ? 2 : r || a ? 1 : 0
    }

    for (var s = 1; e.length - 1 > s;) {
        if (e[s - 1][0] == DIFF_EQUAL && e[s + 1][0] == DIFF_EQUAL) {
            var n = e[s - 1][1], r = e[s][1], a = e[s + 1][1], i = this.diff_commonSuffix(n, r);
            if (i) {
                var o = r.substring(r.length - i);
                n = n.substring(0, n.length - i), r = o + r.substring(0, r.length - i), a = o + a
            }
            for (var u = n, h = r, c = a, l = t(n, r) + t(r, a); r.charAt(0) === a.charAt(0);) {
                n += r.charAt(0), r = r.substring(1) + a.charAt(0), a = a.substring(1);
                var p = t(n, r) + t(r, a);
                p >= l && (l = p, u = n, h = r, c = a)
            }
            e[s - 1][1] != u && (u ? e[s - 1][1] = u : (e.splice(s - 1, 1), s--), e[s][1] = h, c ? e[s + 1][1] = c : (e.splice(s + 1, 1), s--))
        }
        s++
    }
}, diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/, diff_match_patch.whitespaceRegex_ = /\s/, diff_match_patch.linebreakRegex_ = /[\r\n]/, diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/, diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/, diff_match_patch.prototype.diff_cleanupEfficiency = function (e) {
    for (var t = !1, s = [], n = 0, r = null, a = 0, i = !1, o = !1, u = !1, h = !1; e.length > a;)e[a][0] == DIFF_EQUAL ? (e[a][1].length < this.Diff_EditCost && (u || h) ? (s[n++] = a, i = u, o = h, r = e[a][1]) : (n = 0, r = null), u = h = !1) : (e[a][0] == DIFF_DELETE ? h = !0 : u = !0, r && (i && o && u && h || r.length < this.Diff_EditCost / 2 && 3 == i + o + u + h) && (e.splice(s[n - 1], 0, [DIFF_DELETE, r]), e[s[n - 1] + 1][0] = DIFF_INSERT, n--, r = null, i && o ? (u = h = !0, n = 0) : (n--, a = n > 0 ? s[n - 1] : -1, u = h = !1), t = !0)), a++;
    t && this.diff_cleanupMerge(e)
}, diff_match_patch.prototype.diff_cleanupMerge = function (e) {
    e.push([DIFF_EQUAL, ""]);
    for (var t, s = 0, n = 0, r = 0, a = "", i = ""; e.length > s;)switch (e[s][0]) {
        case DIFF_INSERT:
            r++, i += e[s][1], s++;
            break;
        case DIFF_DELETE:
            n++, a += e[s][1], s++;
            break;
        case DIFF_EQUAL:
            n + r > 1 ? (0 !== n && 0 !== r && (t = this.diff_commonPrefix(i, a), 0 !== t && (s - n - r > 0 && e[s - n - r - 1][0] == DIFF_EQUAL ? e[s - n - r - 1][1] += i.substring(0, t) : (e.splice(0, 0, [DIFF_EQUAL, i.substring(0, t)]), s++), i = i.substring(t), a = a.substring(t)), t = this.diff_commonSuffix(i, a), 0 !== t && (e[s][1] = i.substring(i.length - t) + e[s][1], i = i.substring(0, i.length - t), a = a.substring(0, a.length - t))), 0 === n ? e.splice(s - r, n + r, [DIFF_INSERT, i]) : 0 === r ? e.splice(s - n, n + r, [DIFF_DELETE, a]) : e.splice(s - n - r, n + r, [DIFF_DELETE, a], [DIFF_INSERT, i]), s = s - n - r + (n ? 1 : 0) + (r ? 1 : 0) + 1) : 0 !== s && e[s - 1][0] == DIFF_EQUAL ? (e[s - 1][1] += e[s][1], e.splice(s, 1)) : s++, r = 0, n = 0, a = "", i = ""
    }
    "" === e[e.length - 1][1] && e.pop();
    var o = !1;
    for (s = 1; e.length - 1 > s;)e[s - 1][0] == DIFF_EQUAL && e[s + 1][0] == DIFF_EQUAL && (e[s][1].substring(e[s][1].length - e[s - 1][1].length) == e[s - 1][1] ? (e[s][1] = e[s - 1][1] + e[s][1].substring(0, e[s][1].length - e[s - 1][1].length), e[s + 1][1] = e[s - 1][1] + e[s + 1][1], e.splice(s - 1, 1), o = !0) : e[s][1].substring(0, e[s + 1][1].length) == e[s + 1][1] && (e[s - 1][1] += e[s + 1][1], e[s][1] = e[s][1].substring(e[s + 1][1].length) + e[s + 1][1], e.splice(s + 1, 1), o = !0)), s++;
    o && this.diff_cleanupMerge(e)
}, diff_match_patch.prototype.diff_xIndex = function (e, t) {
    var s, n = 0, r = 0, a = 0, i = 0;
    for (s = 0; e.length > s && (e[s][0] !== DIFF_INSERT && (n += e[s][1].length), e[s][0] !== DIFF_DELETE && (r += e[s][1].length), !(n > t)); s++)a = n, i = r;
    return e.length != s && e[s][0] === DIFF_DELETE ? i : i + (t - a)
}, diff_match_patch.prototype.diff_prettyHtml = function (e) {
    for (var t = [], s = 0; e.length > s; s++) {
        var n = e[s][0], r = e[s][1];
        switch (n) {
            case DIFF_INSERT:
                t[s] = "<ins>" + r + "</ins>";
                break;
            case DIFF_DELETE:
                t[s] = "<del>" + r + "</del>";
                break;
            case DIFF_EQUAL:
                t[s] = r
        }
    }
    return t.join("")
}, diff_match_patch.prototype.diff_text1 = function (e) {
    for (var t = [], s = 0; e.length > s; s++)e[s][0] !== DIFF_INSERT && (t[s] = e[s][1]);
    return t.join("")
}, diff_match_patch.prototype.diff_text2 = function (e) {
    for (var t = [], s = 0; e.length > s; s++)e[s][0] !== DIFF_DELETE && (t[s] = e[s][1]);
    return t.join("")
}, diff_match_patch.prototype.diff_levenshtein = function (e) {
    for (var t = 0, s = 0, n = 0, r = 0; e.length > r; r++) {
        var a = e[r][0], i = e[r][1];
        switch (a) {
            case DIFF_INSERT:
                s += i.length;
                break;
            case DIFF_DELETE:
                n += i.length;
                break;
            case DIFF_EQUAL:
                t += Math.max(s, n), s = 0, n = 0
        }
    }
    return t += Math.max(s, n)
}, diff_match_patch.prototype.diff_toDelta = function (e) {
    for (var t = [], s = 0; e.length > s; s++)switch (e[s][0]) {
        case DIFF_INSERT:
            t[s] = "+" + encodeURI(e[s][1]);
            break;
        case DIFF_DELETE:
            t[s] = "-" + e[s][1].length;
            break;
        case DIFF_EQUAL:
            t[s] = "=" + e[s][1].length
    }
    return t.join("	").replace(/%20/g, " ")
}, diff_match_patch.prototype.diff_fromDelta = function (e, t) {
    for (var s = [], n = 0, r = 0, a = t.split(/\t/g), i = 0; a.length > i; i++) {
        var o = a[i].substring(1);
        switch (a[i].charAt(0)) {
            case"+":
                try {
                    s[n++] = [DIFF_INSERT, decodeURI(o)]
                } catch (u) {
                    throw new Error("Illegal escape in diff_fromDelta: " + o)
                }
                break;
            case"-":
            case"=":
                var h = parseInt(o, 10);
                if (isNaN(h) || 0 > h)throw new Error("Invalid number in diff_fromDelta: " + o);
                var c = e.substring(r, r += h);
                s[n++] = "=" == a[i].charAt(0) ? [DIFF_EQUAL, c] : [DIFF_DELETE, c];
                break;
            default:
                if (a[i])throw new Error("Invalid diff operation in diff_fromDelta: " + a[i])
        }
    }
    if (r != e.length)throw new Error("Delta length (" + r + ") does not equal source text length (" + e.length + ").");
    return s
}, this.diff_match_patch = diff_match_patch, this.DIFF_DELETE = DIFF_DELETE, this.DIFF_INSERT = DIFF_INSERT, this.DIFF_EQUAL = DIFF_EQUAL;