Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
    "use strict";
    if (void 0 === this || null === this)throw new TypeError;
    var t = Object(this), n = t.length >>> 0;
    if (0 === n)return-1;
    var s = 0;
    if (arguments.length > 0 && (s = Number(arguments[1]), s !== s ? s = 0 : 0 !== s && 1 / 0 !== s && s !== -1 / 0 && (s = (s > 0 || -1) * Math.floor(Math.abs(s)))), s >= n)return-1;
    for (var r = s >= 0 ? s : Math.max(n - Math.abs(s), 0); n > r; r++)if (r in t && t[r] === e)return r;
    return-1
});
var I18n = I18n || {};
I18n.defaultLocale = "en", I18n.fallbacks = !1, I18n.defaultSeparator = ".", I18n.locale = null, I18n.PLACEHOLDER = /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm, I18n.fallbackRules = {}, I18n.pluralizationRules = {en: function (e) {
    return 0 == e ? ["zero", "none", "other"] : 1 == e ? "one" : "other"
}}, I18n.getFallbacks = function (e) {
    if (e === I18n.defaultLocale)return[];
    if (!I18n.fallbackRules[e]) {
        for (var t = [], n = e.split("-"), s = 1; n.length > s; s++)t.push(n.slice(0, s).join("-"));
        t.push(I18n.defaultLocale), I18n.fallbackRules[e] = t
    }
    return I18n.fallbackRules[e]
}, I18n.isValidNode = function (e, t, n) {
    return null !== e[t] && e[t] !== n
}, I18n.lookup = function (e, t) {
    var n, t = t || {}, s = e, r = this.prepareOptions(I18n.translations), i = t.locale || I18n.currentLocale(), a = r[i] || {}, t = this.prepareOptions(t);
    for ("object" == typeof e && (e = e.join(this.defaultSeparator)), t.scope && (e = t.scope.toString() + this.defaultSeparator + e), e = e.split(this.defaultSeparator); a && e.length > 0;)n = e.shift(), a = a[n];
    if (!a) {
        if (I18n.fallbacks)for (var o = this.getFallbacks(i), u = 0; o.length > u && !(a = I18n.lookup(s, this.prepareOptions({locale: o[u]}, t))); o++);
        !a && this.isValidNode(t, "defaultValue") && (a = t.defaultValue)
    }
    return a
}, I18n.prepareOptions = function () {
    for (var e, t = {}, n = arguments.length, s = 0; n > s; s++)if (e = arguments[s])for (var r in e)this.isValidNode(t, r) || (t[r] = e[r]);
    return t
}, I18n.interpolate = function (e, t) {
    t = this.prepareOptions(t);
    var n, s, r, i = e.match(this.PLACEHOLDER);
    if (!i)return e;
    for (var a = 0; n = i[a]; a++)r = n.replace(this.PLACEHOLDER, "$1"), s = t[r], this.isValidNode(t, r) || (s = "[missing " + n + " value]"), regex = new RegExp(n.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}")), e = e.replace(regex, s);
    return e
}, I18n.translate = function (e, t) {
    t = this.prepareOptions(t);
    var n = this.lookup(e, t);
    try {
        return"object" == typeof n ? "number" == typeof t.count ? this.pluralize(t.count, e, t) : n : this.interpolate(n, t)
    } catch (s) {
        return this.missingTranslation(e)
    }
}, I18n.localize = function (e, t) {
    switch (e) {
        case"currency":
            return this.toCurrency(t);
        case"number":
            return e = this.lookup("number.format"), this.toNumber(t, e);
        case"percentage":
            return this.toPercentage(t);
        default:
            return e.match(/^(date|time)/) ? this.toTime(e, t) : t.toString()
    }
}, I18n.parseDate = function (e) {
    var t, n;
    if ("object" == typeof e)return e;
    if (t = e.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2}))?(Z|\+0000)?/)) {
        for (var s = 1; 6 >= s; s++)t[s] = parseInt(t[s], 10) || 0;
        t[2] -= 1, n = t[7] ? new Date(Date.UTC(t[1], t[2], t[3], t[4], t[5], t[6])) : new Date(t[1], t[2], t[3], t[4], t[5], t[6])
    } else"number" == typeof e ? (n = new Date, n.setTime(e)) : e.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/) ? (n = new Date, n.setTime(Date.parse(e))) : (n = new Date, n.setTime(Date.parse(e)));
    return n
}, I18n.toTime = function (e, t) {
    var n = this.parseDate(t), s = this.lookup(e);
    return n.toString().match(/invalid/i) ? n.toString() : s ? this.strftime(n, s) : n.toString()
}, I18n.strftime = function (e, t) {
    var n = this.lookup("date");
    if (!n)return e.toString();
    n.meridian = n.meridian || ["AM", "PM"];
    var s = e.getDay(), r = e.getDate(), i = e.getFullYear(), a = e.getMonth() + 1, o = e.getHours(), u = o, l = o > 11 ? 1 : 0, c = e.getSeconds(), h = e.getMinutes(), p = e.getTimezoneOffset(), d = Math.floor(Math.abs(p / 60)), f = Math.abs(p) - 60 * d, m = (p > 0 ? "-" : "+") + (2 > d.toString().length ? "0" + d : d) + (2 > f.toString().length ? "0" + f : f);
    u > 12 ? u -= 12 : 0 === u && (u = 12);
    var g = function (e) {
        var t = "0" + e.toString();
        return t.substr(t.length - 2)
    }, b = t;
    return b = b.replace("%a", n.abbr_day_names[s]), b = b.replace("%A", n.day_names[s]), b = b.replace("%b", n.abbr_month_names[a]), b = b.replace("%B", n.month_names[a]), b = b.replace("%d", g(r)), b = b.replace("%e", r), b = b.replace("%-d", r), b = b.replace("%H", g(o)), b = b.replace("%-H", o), b = b.replace("%I", g(u)), b = b.replace("%-I", u), b = b.replace("%m", g(a)), b = b.replace("%-m", a), b = b.replace("%M", g(h)), b = b.replace("%-M", h), b = b.replace("%p", n.meridian[l]), b = b.replace("%S", g(c)), b = b.replace("%-S", c), b = b.replace("%w", s), b = b.replace("%y", g(i)), b = b.replace("%-y", g(i).replace(/^0+/, "")), b = b.replace("%Y", i), b = b.replace("%z", m)
}, I18n.toNumber = function (e, t) {
    t = this.prepareOptions(t, this.lookup("number.format"), {precision: 3, separator: ".", delimiter: ",", strip_insignificant_zeros: !1});
    var n, s, r = 0 > e, i = Math.abs(e).toFixed(t.precision).toString(), a = i.split("."), o = [];
    for (e = a[0], n = a[1]; e.length > 0;)o.unshift(e.substr(Math.max(0, e.length - 3), 3)), e = e.substr(0, e.length - 3);
    if (s = o.join(t.delimiter), t.precision > 0 && (s += t.separator + a[1]), r && (s = "-" + s), t.strip_insignificant_zeros) {
        var u = {separator: new RegExp(t.separator.replace(/\./, "\\.") + "$"), zeros: /0+$/};
        s = s.replace(u.zeros, "").replace(u.separator, "")
    }
    return s
}, I18n.toCurrency = function (e, t) {
    return t = this.prepareOptions(t, this.lookup("number.currency.format"), this.lookup("number.format"), {unit: "$", precision: 2, format: "%u%n", delimiter: ",", separator: "."}), e = this.toNumber(e, t), e = t.format.replace("%u", t.unit).replace("%n", e)
}, I18n.toHumanSize = function (e, t) {
    for (var n, s, r = 1024, i = e, a = 0; i >= r && 4 > a;)i /= r, a += 1;
    return 0 === a ? (n = this.t("number.human.storage_units.units.byte", {count: i}), s = 0) : (n = this.t("number.human.storage_units.units." + [null, "kb", "mb", "gb", "tb"][a]), s = 0 === i - Math.floor(i) ? 0 : 1), t = this.prepareOptions(t, {precision: s, format: "%n%u", delimiter: ""}), e = this.toNumber(i, t), e = t.format.replace("%u", n).replace("%n", e)
}, I18n.toPercentage = function (e, t) {
    return t = this.prepareOptions(t, this.lookup("number.percentage.format"), this.lookup("number.format"), {precision: 3, separator: ".", delimiter: ""}), e = this.toNumber(e, t), e + "%"
}, I18n.pluralizer = function (e) {
    return pluralizer = this.pluralizationRules[e], void 0 !== pluralizer ? pluralizer : this.pluralizationRules.en
}, I18n.findAndTranslateValidNode = function (e, t) {
    for (i = 0; e.length > i; i++)if (key = e[i], this.isValidNode(t, key))return t[key];
    return null
}, I18n.pluralize = function (e, t, n) {
    var s;
    try {
        s = this.lookup(t, n)
    } catch (r) {
    }
    if (!s)return this.missingTranslation(t);
    var i;
    return n = this.prepareOptions(n), n.count = e.toString(), pluralizer = this.pluralizer(this.currentLocale()), key = pluralizer(Math.abs(e)), keys = "object" == typeof key && key instanceof Array ? key : [key], i = this.findAndTranslateValidNode(keys, s), null == i && (i = this.missingTranslation(t, keys[0])), this.interpolate(i, n)
}, I18n.missingTranslation = function () {
    for (var e = '[missing "' + this.currentLocale(), t = arguments.length, n = 0; t > n; n++)e += "." + arguments[n];
    return e += '" translation]'
}, I18n.currentLocale = function () {
    return I18n.locale || I18n.defaultLocale
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, MessageFormat = {locale: {}}, MessageFormat.locale.pseudo = function (e) {
    return 1 === e ? "one" : "other"
}, I18n.messageFormat = function (e) {
    var t = e;
    return function (e, n) {
        var s = t[e];
        if (!s)return"Missing Key: " + e;
        try {
            return s(n)
        } catch (r) {
            return r.message
        }
        return t[e](n)
    }
}({}), I18n.translations = {pseudo: {js: {share: {topic: "[[ šĥářé á łíɳǩ ťó ťĥíš ťóƿíč ]]", post: "[[ šĥářé á łíɳǩ ťó ťĥíš ƿóšť ]]", close: "[[ čłóšé ]]", twitter: "[[ šĥářé ťĥíš łíɳǩ óɳ Ťŵíťťéř ]]", facebook: "[[ šĥářé ťĥíš łíɳǩ óɳ Ƒáčéƀóóǩ ]]", "google+": "[[ šĥářé ťĥíš łíɳǩ óɳ Ǧóóǧłé+ ]]", email: "[[ šéɳď ťĥíš łíɳǩ íɳ áɳ éɱáíł ]]"}, edit: "[[ éďíť ťĥé ťíťłé áɳď čáťéǧóřý óƒ ťĥíš ťóƿíč ]]", not_implemented: "[[ Ťĥáť ƒéáťůřé ĥášɳ'ť ƀééɳ íɱƿłéɱéɳťéď ýéť, šóřřý! ]]", no_value: "[[ Ѝó ]]", yes_value: "[[ Ýéš ]]", of_value: "[[ óƒ ]]", generic_error: "[[ Šóřřý, áɳ éřřóř ĥáš óččůřřéď. ]]", log_in: "[[ Łóǧ Íɳ ]]", age: "[[ Áǧé ]]", last_post: "[[ Łášť ƿóšť ]]", admin_title: "[[ Áďɱíɳ ]]", flags_title: "[[ Ƒłáǧš ]]", show_more: "[[ šĥóŵ ɱóřé ]]", links: "[[ Łíɳǩš ]]", faq: "[[ ƑÁƢ ]]", you: "[[ Ýóů ]]", or: "[[ óř ]]", now: "[[ ʲůšť ɳóŵ ]]", read_more: "[[ řéáď ɱóřé ]]", suggested_topics: {title: "[[ Šůǧǧéšťéď Ťóƿíčš ]]"}, bookmarks: {not_logged_in: "[[ Šóřřý, ýóů ɱůšť ƀé łóǧǧéď íɳ ťó ƀóóǩɱářǩ ƿóšťš. ]]", created: "[[ Ýóů'νé ƀóóǩɱářǩéď ťĥíš ƿóšť. ]]", not_bookmarked: "[[ Ýóů'νé řéáď ťĥíš ƿóšť; čłíčǩ ťó ƀóóǩɱářǩ íť. ]]", last_read: "[[ Ťĥíš íš ťĥé łášť ƿóšť ýóů'νé řéáď. ]]"}, new_topics_inserted: "[[ {{count}} ɳéŵ ťóƿíčš. ]]", show_new_topics: "[[ Čłíčǩ ťó šĥóŵ. ]]", preview: "[[ ƿřéνíéŵ ]]", cancel: "[[ čáɳčéł ]]", save: "[[ Šáνé Čĥáɳǧéš ]]", saving: "[[ Šáνíɳǧ... ]]", saved: "[[ Šáνéď! ]]", user_action: {user_posted_topic: "[[ <á ĥřéƒ='{{userUrl}}'>{{user}}</á> ƿóšťéď <á ĥřéƒ='{{topicUrl}}'>ťĥé ťóƿíč</á> ]]", you_posted_topic: "[[ <á ĥřéƒ='{{userUrl}}'>Ýóů</á> ƿóšťéď <á ĥřéƒ='{{topicUrl}}'>ťĥé ťóƿíč</á> ]]", user_replied_to_post: "[[ <á ĥřéƒ='{{userUrl}}'>{{user}}</á> řéƿłíéď ťó <á ĥřéƒ='{{postUrl}}'>{{post_number}}</á> ]]", you_replied_to_post: "[[ <á ĥřéƒ='{{userUrl}}'>Ýóů</á> řéƿłíéď ťó <á ĥřéƒ='{{postUrl}}'>{{post_number}}</á> ]]", user_replied_to_topic: "[[ <á ĥřéƒ='{{userUrl}}'>{{user}}</á> řéƿłíéď ťó <á ĥřéƒ='{{topicUrl}}'>ťĥé ťóƿíč</á> ]]", you_replied_to_topic: "[[ <á ĥřéƒ='{{userUrl}}'>Ýóů</á> řéƿłíéď ťó <á ĥřéƒ='{{topicUrl}}'>ťĥé ťóƿíč</á> ]]", user_mentioned_user: "[[ <á ĥřéƒ='{{user1Url}}'>{{user}}</á> ɱéɳťíóɳéď <á ĥřéƒ='{{user2Url}}'>{{another_user}}</á> ]]", user_mentioned_you: "[[ <á ĥřéƒ='{{user1Url}}'>{{user}}</á> ɱéɳťíóɳéď <á ĥřéƒ='{{user2Url}}'>ýóů</á> ]]", you_mentioned_user: "[[ <á ĥřéƒ='{{user1Url}}'>Ýóů</á> ɱéɳťíóɳéď <á ĥřéƒ='{{user2Url}}'>{{user}}</á> ]]", posted_by_user: "[[ Рóšťéď ƀý <á ĥřéƒ='{{userUrl}}'>{{user}}</á> ]]", posted_by_you: "[[ Рóšťéď ƀý <á ĥřéƒ='{{userUrl}}'>ýóů</á> ]]", sent_by_user: "[[ Šéɳť ƀý <á ĥřéƒ='{{userUrl}}'>{{user}}</á> ]]", sent_by_you: "[[ Šéɳť ƀý <á ĥřéƒ='{{userUrl}}'>ýóů</á> ]]"}, user_action_groups: {1: "[[ Łíǩéš Ǧíνéɳ ]]", 2: "[[ Łíǩéš Řéčéíνéď ]]", 3: "[[ Ɓóóǩɱářǩš ]]", 4: "[[ Ťóƿíčš ]]", 5: "[[ Řéƿłíéš ]]", 6: "[[ Řéšƿóɳšéš ]]", 7: "[[ Ϻéɳťíóɳš ]]", 9: "[[ Ƣůóťéš ]]", 10: "[[ Ƒáνóříťéš ]]", 11: "[[ Éďíťš ]]", 12: "[[ Šéɳť Íťéɱš ]]", 13: "[[ Íɳƀóх ]]"}, user: {profile: "[[ Рřóƒíłé ]]", title: "[[ Ůšéř ]]", mute: "[[ Ϻůťé ]]", edit: "[[ Éďíť Рřéƒéřéɳčéš ]]", download_archive: "[[ ďóŵɳłóáď ářčĥíνé óƒ ɱý ƿóšťš ]]", private_message: "[[ Рříνáťé Ϻéššáǧé ]]", private_messages: "[[ Ϻéššáǧéš ]]", activity_stream: "[[ Áčťíνíťý ]]", preferences: "[[ Рřéƒéřéɳčéš ]]", bio: "[[ Áƀóůť ɱé ]]", invited_by: "[[ Íɳνíťéď Ɓý ]]", trust_level: "[[ Ťřůšť Łéνéł ]]", external_links_in_new_tab: "[[ Óƿéɳ áłł éхťéřɳáł łíɳǩš íɳ á ɳéŵ ťáƀ ]]", enable_quoting: "[[ Éɳáƀłé ƣůóťé řéƿłý ƒóř ĥíǧĥłíǧĥťéď ťéхť ]]", moderator: "[[ {{user}} íš á ɱóďéřáťóř ]]", admin: "[[ {{user}} íš áɳ áďɱíɳ ]]", change_password: {action: "[[ čĥáɳǧé ]]", success: "[[ (éɱáíł šéɳť) ]]", in_progress: "[[ (šéɳďíɳǧ éɱáíł) ]]", error: "[[ (éřřóř) ]]"}, change_username: {action: "[[ čĥáɳǧé ]]", title: "[[ Čĥáɳǧé Ůšéřɳáɱé ]]", confirm: "[[ Ťĥéřé čóůłď ƀé čóɳšéƣůéɳčéš ťó čĥáɳǧíɳǧ ýóůř ůšéřɳáɱé. Ářé ýóů áƀšółůťéłý šůřé ýóů ŵáɳť ťó? ]]", taken: "[[ Šóřřý, ťĥáť ůšéřɳáɱé íš ťáǩéɳ. ]]", error: "[[ Ťĥéřé ŵáš áɳ éřřóř čĥáɳǧíɳǧ ýóůř ůšéřɳáɱé. ]]", invalid: "[[ Ťĥáť ůšéřɳáɱé íš íɳνáłíď. Íť ɱůšť óɳłý íɳčłůďé ɳůɱƀéřš áɳď łéťťéřš ]]"}, change_email: {action: "[[ čĥáɳǧé ]]", title: "[[ Čĥáɳǧé Éɱáíł ]]", taken: "[[ Šóřřý, ťĥáť éɱáíł íš ɳóť áνáíłáƀłé. ]]", error: "[[ Ťĥéřé ŵáš áɳ éřřóř čĥáɳǧíɳǧ ýóůř éɱáíł. Рéřĥáƿš ťĥáť áďďřéšš íš áłřéáďý íɳ ůšé? ]]", success: "[[ Ŵé'νé šéɳť áɳ éɱáíł ťó ťĥáť áďďřéšš. Рłéášé ƒółłóŵ ťĥé čóɳƒířɱáťíóɳ íɳšťřůčťíóɳš. ]]"}, email: {title: "[[ Éɱáíł ]]", instructions: "[[ Ýóůř éɱáíł ŵíłł ɳéνéř ƀé šĥóŵɳ ťó ťĥé ƿůƀłíč. ]]", ok: "[[ Łóóǩš ǧóóď. Ŵé ŵíłł éɱáíł ýóů ťó čóɳƒířɱ. ]]", invalid: "[[ Рłéášé éɳťéř á νáłíď éɱáíł áďďřéšš. ]]", authenticated: "[[ Ýóůř éɱáíł ĥáš ƀééɳ áůťĥéɳťíčáťéď ƀý {{provider}}. ]]", frequency: "[[ Ŵé'łł óɳłý éɱáíł ýóů íƒ ŵé ĥáνéɳ'ť šééɳ ýóů řéčéɳťłý áɳď ýóů ĥáνéɳ'ť áłřéáďý šééɳ ťĥé ťĥíɳǧ ŵé'řé éɱáíłíɳǧ ýóů áƀóůť. ]]"}, name: {title: "[[ Ѝáɱé ]]", instructions: "[[ Ťĥé łóɳǧéř νéřšíóɳ óƒ ýóůř ɳáɱé; ďóéš ɳóť ɳééď ťó ƀé ůɳíƣůé. Ůšéď ƒóř áłťéřɳáťé @ɳáɱé ɱáťčĥíɳǧ áɳď šĥóŵɳ óɳłý óɳ ýóůř ůšéř ƿáǧé. ]]", too_short: "[[ Ýóůř ɳáɱé íš ťóó šĥóřť. ]]", ok: "[[ Ýóůř ɳáɱé łóóǩš ǧóóď. ]]"}, username: {title: "[[ Ůšéřɳáɱé ]]", instructions: "[[ Ϻůšť ƀé ůɳíƣůé, ɳó šƿáčéš. Рéóƿłé čáɳ ɱéɳťíóɳ ýóů áš @ůšéřɳáɱé. ]]", short_instructions: "[[ Рéóƿłé čáɳ ɱéɳťíóɳ ýóů áš @{{username}}. ]]", available: "[[ Ýóůř ůšéřɳáɱé íš áνáíłáƀłé. ]]", global_match: "[[ Éɱáíł ɱáťčĥéš ťĥé řéǧíšťéřéď ůšéřɳáɱé. ]]", global_mismatch: "[[ Áłřéáďý řéǧíšťéřéď. Ťřý {{suggestion}}? ]]", not_available: "[[ Ѝóť áνáíłáƀłé. Ťřý {{suggestion}}? ]]", too_short: "[[ Ýóůř ůšéřɳáɱé íš ťóó šĥóřť. ]]", too_long: "[[ Ýóůř ůšéřɳáɱé íš ťóó łóɳǧ. ]]", checking: "[[ Čĥéčǩíɳǧ ůšéřɳáɱé áνáíłáƀíłíťý... ]]", enter_email: "[[ Ůšéřɳáɱé ƒóůɳď. Éɳťéř ɱáťčĥíɳǧ éɱáíł. ]]"}, password_confirmation: {title: "[[ Рáššŵóřď Áǧáíɳ ]]"}, last_posted: "[[ Łášť Рóšť ]]", last_emailed: "[[ Łášť Éɱáíłéď ]]", last_seen: "[[ Łášť Šééɳ ]]", created: "[[ Čřéáťéď Áť ]]", log_out: "[[ Łóǧ Óůť ]]", website: "[[ Ŵéƀ Šíťé ]]", email_settings: "[[ Éɱáíł ]]", email_digests: {title: "[[ Ŵĥéɳ Í ďóɳ'ť νíšíť ťĥé šíťé, šéɳď ɱé áɳ éɱáíł ďíǧéšť óƒ ŵĥáť'š ɳéŵ ]]", daily: "[[ ďáíłý ]]", weekly: "[[ ŵééǩłý ]]", bi_weekly: "[[ éνéřý ťŵó ŵééǩš ]]"}, email_direct: "[[ Řéčéíνé áɳ éɱáíł ŵĥéɳ šóɱéóɳé ƣůóťéš ýóů, řéƿłíéš ťó ýóůř ƿóšť, óř ɱéɳťíóɳš ýóůř @ůšéřɳáɱé ]]", email_private_messages: "[[ Řéčéíνé áɳ éɱáíł ŵĥéɳ šóɱéóɳé šéɳďš ýóů á ƿříνáťé ɱéššáǧé ]]", other_settings: "[[ Óťĥéř ]]", new_topic_duration: {label: "[[ Čóɳšíďéř ťóƿíčš ɳéŵ ŵĥéɳ ]]", not_viewed: "[[ Í ĥáνéɳ'ť νíéŵéď ťĥéɱ ýéť ]]", last_here: "[[ ťĥéý ŵéřé ƿóšťéď šíɳčé Í ŵáš ĥéřé łášť ]]", after_n_days: {one: "[[ ťĥéý ŵéřé ƿóšťéď íɳ ťĥé łášť ďáý ]]", other: "[[ ťĥéý ŵéřé ƿóšťéď íɳ ťĥé łášť {{count}} ďáýš ]]"}, after_n_weeks: {one: "[[ ťĥéý ŵéřé ƿóšťéď íɳ ťĥé łášť ŵééǩ ]]", other: "[[ ťĥéý ŵéřé ƿóšťéď íɳ ťĥé łášť {{count}} ŵééǩ ]]"}}, auto_track_topics: "[[ Áůťóɱáťíčáłłý ťřáčǩ ťóƿíčš Í éɳťéř ]]", auto_track_options: {never: "[[ ɳéνéř ]]", always: "[[ áłŵáýš ]]", after_n_seconds: {one: "[[ áƒťéř 1 šéčóɳď ]]", other: "[[ áƒťéř {{count}} šéčóɳďš ]]"}, after_n_minutes: {one: "[[ áƒťéř 1 ɱíɳůťé ]]", other: "[[ áƒťéř {{count}} ɱíɳůťéš ]]"}}, invited: {title: "[[ Íɳνíťéš ]]", user: "[[ Íɳνíťéď Ůšéř ]]", none: "[[ {{username}} ĥášɳ'ť íɳνíťéď áɳý ůšéřš ťó ťĥé šíťé. ]]", redeemed: "[[ Řéďééɱéď Íɳνíťéš ]]", redeemed_at: "[[ Řéďééɱéď Áť ]]", pending: "[[ Рéɳďíɳǧ Íɳνíťéš ]]", topics_entered: "[[ Ťóƿíčš Éɳťéřéď ]]", posts_read_count: "[[ Рóšťš Řéáď ]]", rescind: "[[ Řéɱóνé Íɳνíťáťíóɳ ]]", rescinded: "[[ Íɳνíťé řéɱóνéď ]]", time_read: "[[ Řéáď Ťíɱé ]]", days_visited: "[[ Ďáýš Ѷíšíťéď ]]", account_age_days: "[[ Áččóůɳť áǧé íɳ ďáýš ]]"}, password: {title: "[[ Рáššŵóřď ]]", too_short: "[[ Ýóůř ƿáššŵóřď íš ťóó šĥóřť. ]]", ok: "[[ Ýóůř ƿáššŵóřď łóóǩš ǧóóď. ]]"}, ip_address: {title: "[[ Łášť ÍР Áďďřéšš ]]"}, avatar: {title: "[[ Áνáťář ]]", instructions: "[[ Ŵé ůšé <á ĥřéƒ='ĥťťƿš://ǧřáνáťář.čóɱ' ťářǧéť='_ƀłáɳǩ'>Ǧřáνáťář</á> ƒóř áνáťářš ƀášéď óɳ ýóůř éɱáíł ]]"}, filters: {all: "[[ Áłł ]]"}, stream: {posted_by: "[[ Рóšťéď ƀý ]]", sent_by: "[[ Šéɳť ƀý ]]", private_message: "[[ ƿříνáťé ɱéššáǧé ]]", the_topic: "[[ ťĥé ťóƿíč ]]"}}, loading: "[[ Łóáďíɳǧ... ]]", close: "[[ Čłóšé ]]", learn_more: "[[ łéářɳ ɱóřé... ]]", year: "[[ ýéář ]]", year_desc: "[[ ťóƿíčš ƿóšťéď íɳ ťĥé łášť 365 ďáýš ]]", month: "[[ ɱóɳťĥ ]]", month_desc: "[[ ťóƿíčš ƿóšťéď íɳ ťĥé łášť 30 ďáýš ]]", week: "[[ ŵééǩ ]]", week_desc: "[[ ťóƿíčš ƿóšťéď íɳ ťĥé łášť 7 ďáýš ]]", first_post: "[[ Ƒířšť ƿóšť ]]", mute: "[[ Ϻůťé ]]", unmute: "[[ Ůɳɱůťé ]]", best_of: {title: "[[ Ɓéšť Óƒ ]]", enabled_description: '[[ Ýóů ářé čůřřéɳťłý νíéŵíɳǧ ťĥé "Ɓéšť Óƒ" νíéŵ óƒ ťĥíš ťóƿíč. ]]', description: "[[ Ťĥéřé ářé <ƀ>{{count}}</ƀ> ƿóšťš íɳ ťĥíš ťóƿíč. Ťĥáť'š á łóť! Ŵóůłď ýóů łíǩé ťó šáνé ťíɱé ƀý šŵíťčĥíɳǧ ýóůř νíéŵ ťó šĥóŵ óɳłý ťĥé ƿóšťš ŵíťĥ ťĥé ɱóšť íɳťéřáčťíóɳš áɳď řéšƿóɳšéš? ]]", enable: '[[ Šŵíťčĥ ťó "Ɓéšť Óƒ" νíéŵ ]]', disable: '[[ Čáɳčéł "Ɓéšť Óƒ" ]]'}, private_message_info: {title: "[[ Рříνáťé Ϻéššáǧé ]]", invite: "[[ Íɳνíťé Óťĥéřš... ]]"}, email: "[[ Éɱáíł ]]", username: "[[ Ůšéřɳáɱé ]]", last_seen: "[[ Łášť Šééɳ ]]", created: "[[ Čřéáťéď ]]", trust_level: "[[ Ťřůšť Łéνéł ]]", create_account: {title: "[[ Čřéáťé Áččóůɳť ]]", action: "[[ Čřéáťé óɳé ɳóŵ! ]]", invite: "[[ Ďóɳ'ť ĥáνé áɳ áččóůɳť ýéť? ]]", failed: "[[ Šóɱéťĥíɳǧ ŵéɳť ŵřóɳǧ, ƿéřĥáƿš ťĥíš éɱáíł íš áłřéáďý řéǧíšťéřéď, ťřý ťĥé ƒóřǧóť ƿáššŵóřď łíɳǩ ]]"}, forgot_password: {title: "[[ Ƒóřǧóť Рáššŵóřď ]]", action: "[[ Í ƒóřǧóť ɱý ƿáššŵóřď ]]", invite: "[[ Éɳťéř ýóůř ůšéřɳáɱé óř éɱáíł áďďřéšš, áɳď ŵé'łł šéɳď ýóů á ƿáššŵóřď řéšéť éɱáíł. ]]", reset: "[[ Řéšéť Рáššŵóřď ]]", complete: "[[ Ýóů šĥóůłď řéčéíνé áɳ éɱáíł ŵíťĥ íɳšťřůčťíóɳš óɳ ĥóŵ ťó řéšéť ýóůř ƿáššŵóřď šĥóřťłý. ]]"}, login: {title: "[[ Łóǧ Íɳ ]]", username: "[[ Łóǧíɳ ]]", password: "[[ Рáššŵóřď ]]", email_placeholder: "[[ éɱáíł áďďřéšš óř ůšéřɳáɱé ]]", error: "[[ Ůɳǩɳóŵɳ éřřóř ]]", reset_password: "[[ Řéšéť Рáššŵóřď ]]", logging_in: "[[ Łóǧǧíɳǧ Íɳ... ]]", or: "[[ Óř ]]", authenticating: "[[ Áůťĥéɳťíčáťíɳǧ... ]]", awaiting_confirmation: "[[ Ýóůř áččóůɳť íš áŵáíťíɳǧ áčťíνáťíóɳ, ůšé ťĥé ƒóřǧóť ƿáššŵóřď łíɳǩ ťó íššůé áɳóťĥéř áčťíνáťíóɳ éɱáíł. ]]", awaiting_approval: "[[ Ýóůř áččóůɳť ĥáš ɳóť ƀééɳ áƿƿřóνéď ƀý á ɱóďéřáťóř ýéť. Ýóů ŵíłł řéčéíνé áɳ éɱáíł ŵĥéɳ íť íš áƿƿřóνéď. ]]", not_activated: "[[ Ýóů čáɳ'ť łóǧ íɳ ýéť. Ŵé ƿřéνíóůšłý šéɳť áɳ áčťíνáťíóɳ éɱáíł ťó ýóů áť <ƀ>{{sentTo}}</ƀ>. Рłéášé ƒółłóŵ ťĥé íɳšťřůčťíóɳš íɳ ťĥáť éɱáíł ťó áčťíνáťé ýóůř áččóůɳť. ]]", resend_activation_email: "[[ Čłíčǩ ĥéřé ťó šéɳď ťĥé áčťíνáťíóɳ éɱáíł áǧáíɳ. ]]", sent_activation_email_again: "[[ Ŵé šéɳť áɳóťĥéř áčťíνáťíóɳ éɱáíł ťó ýóů áť <ƀ>{{currentEmail}}</ƀ>. Íť ɱíǧĥť ťáǩé á ƒéŵ ɱíɳůťéš ƒóř íť ťó ářříνé; ƀé šůřé ťó čĥéčǩ ýóůř šƿáɱ ƒółďéř. ]]", google: {title: "[[ ŵíťĥ Ǧóóǧłé ]]", message: "[[ Áůťĥéɳťíčáťíɳǧ ŵíťĥ Ǧóóǧłé (ɱáǩé šůřé ƿóƿ ůƿ ƀłóčǩéřš ářé ɳóť éɳáƀłéď) ]]"}, twitter: {title: "[[ ŵíťĥ Ťŵíťťéř ]]", message: "[[ Áůťĥéɳťíčáťíɳǧ ŵíťĥ Ťŵíťťéř (ɱáǩé šůřé ƿóƿ ůƿ ƀłóčǩéřš ářé ɳóť éɳáƀłéď) ]]"}, facebook: {title: "[[ ŵíťĥ Ƒáčéƀóóǩ ]]", message: "[[ Áůťĥéɳťíčáťíɳǧ ŵíťĥ Ƒáčéƀóóǩ (ɱáǩé šůřé ƿóƿ ůƿ ƀłóčǩéřš ářé ɳóť éɳáƀłéď) ]]"}, yahoo: {title: "[[ ŵíťĥ Ýáĥóó ]]", message: "[[ Áůťĥéɳťíčáťíɳǧ ŵíťĥ Ýáĥóó (ɱáǩé šůřé ƿóƿ ůƿ ƀłóčǩéřš ářé ɳóť éɳáƀłéď) ]]"}, github: {title: "[[ ŵíťĥ ǦíťĤůƀ ]]", message: "[[ Áůťĥéɳťíčáťíɳǧ ŵíťĥ ǦíťĤůƀ (ɱáǩé šůřé ƿóƿ ůƿ ƀłóčǩéřš ářé ɳóť éɳáƀłéď) ]]"}, persona: {title: "[[ ŵíťĥ Рéřšóɳá ]]", message: "[[ Áůťĥéɳťíčáťíɳǧ ŵíťĥ Ϻóžíłłá Рéřšóɳá (ɱáǩé šůřé ƿóƿ ůƿ ƀłóčǩéřš ářé ɳóť éɳáƀłéď) ]]"}}, composer: {posting_not_on_topic: '[[ Ýóů ářé řéƿłýíɳǧ ťó ťĥé ťóƿíč "{{title}}", ƀůť ýóů ářé čůřřéɳťłý νíéŵíɳǧ á ďíƒƒéřéɳť ťóƿíč. ]]', saving_draft_tip: "[[ šáνíɳǧ ]]", saved_draft_tip: "[[ šáνéď ]]", saved_local_draft_tip: "[[ šáνéď łóčáłłý ]]", similar_topics: "[[ Ýóůř ťóƿíč íš šíɱíłář ťó... ]]", drafts_offline: "[[ ďřáƒťš óƒƒłíɳé ]]", min_length: {need_more_for_title: "[[ {{n}} ťó ǧó ƒóř ťĥé ťíťłé ]]", need_more_for_reply: "[[ {{n}} ťó ǧó ƒóř ťĥé řéƿłý ]]"}, save_edit: "[[ Šáνé Éďíť ]]", reply_original: "[[ Řéƿłý óɳ Óříǧíɳáł Ťóƿíč ]]", reply_here: "[[ Řéƿłý Ĥéřé ]]", reply: "[[ Řéƿłý ]]", cancel: "[[ Čáɳčéł ]]", create_topic: "[[ Čřéáťé Ťóƿíč ]]", create_pm: "[[ Čřéáťé Рříνáťé Ϻéššáǧé ]]", users_placeholder: "[[ Áďď á ůšéř ]]", title_placeholder: "[[ Ťýƿé ýóůř ťíťłé ĥéřé. Ŵĥáť íš ťĥíš ďíščůššíóɳ áƀóůť íɳ óɳé ƀříéƒ šéɳťéɳčé? ]]", reply_placeholder: "[[ Ťýƿé ĥéřé. Ůšé Ϻářǩďóŵɳ óř ƁƁČóďé ťó ƒóřɱáť. Ďřáǧ óř ƿášťé áɳ íɱáǧé ťó ůƿłóáď íť. ]]", view_new_post: "[[ Ѷíéŵ ýóůř ɳéŵ ƿóšť. ]]", saving: "[[ Šáνíɳǧ... ]]", saved: "[[ Šáνéď! ]]", saved_draft: "[[ Ýóů ĥáνé á ƿóšť ďřáƒť íɳ ƿřóǧřéšš. Čłíčǩ áɳýŵĥéřé íɳ ťĥíš ƀóх ťó řéšůɱé éďíťíɳǧ. ]]", uploading: "[[ Ůƿłóáďíɳǧ... ]]", show_preview: "[[ šĥóŵ ƿřéνíéŵ &řáƣůó; ]]", hide_preview: "[[ &łáƣůó; ĥíďé ƿřéνíéŵ ]]", quote_post_title: "[[ Ƣůóťé ŵĥółé ƿóšť ]]", bold_title: "[[ Šťřóɳǧ ]]", bold_text: "[[ šťřóɳǧ ťéхť ]]", italic_title: "[[ Éɱƿĥášíš ]]", italic_text: "[[ éɱƿĥášížéď ťéхť ]]", link_title: "[[ Ĥýƿéřłíɳǩ ]]", link_description: "[[ éɳťéř łíɳǩ ďéščříƿťíóɳ ĥéřé ]]", link_dialog_title: "[[ Íɳšéřť Ĥýƿéřłíɳǩ ]]", link_optional_text: "[[ óƿťíóɳáł ťíťłé ]]", quote_title: "[[ Ɓłóčǩƣůóťé ]]", quote_text: "[[ Ɓłóčǩƣůóťé ]]", code_title: "[[ Čóďé Šáɱƿłé ]]", code_text: "[[ éɳťéř čóďé ĥéřé ]]", image_title: "[[ Íɱáǧé ]]", image_description: "[[ éɳťéř íɱáǧé ďéščříƿťíóɳ ĥéřé ]]", image_dialog_title: "[[ Íɳšéřť Íɱáǧé ]]", image_optional_text: "[[ óƿťíóɳáł ťíťłé ]]", image_hosting_hint: "[[ Ѝééď <á ĥřéƒ='ĥťťƿ://ŵŵŵ.ǧóóǧłé.čóɱ/šéářčĥ?ƣ=ƒřéé+íɱáǧé+ĥóšťíɳǧ' ťářǧéť='_ƀłáɳǩ'>ƒřéé íɱáǧé ĥóšťíɳǧ?</á> ]]", olist_title: "[[ Ѝůɱƀéřéď Łíšť ]]", ulist_title: "[[ Ɓůłłéťéď Łíšť ]]", list_item: "[[ Łíšť íťéɱ ]]", heading_title: "[[ Ĥéáďíɳǧ ]]", heading_text: "[[ Ĥéáďíɳǧ ]]", hr_title: "[[ Ĥóřížóɳťáł Řůłé ]]", undo_title: "[[ Ůɳďó ]]", redo_title: "[[ Řéďó ]]", help: "[[ Ϻářǩďóŵɳ Éďíťíɳǧ Ĥéłƿ ]]", toggler: "[[ ĥíďé óř šĥóŵ ťĥé čóɱƿóšéř ƿáɳéł ]]"}, notifications: {title: "[[ ɳóťíƒíčáťíóɳš óƒ @ɳáɱé ɱéɳťíóɳš, řéƿłíéš ťó ýóůř ƿóšťš áɳď ťóƿíčš, ƿříνáťé ɱéššáǧéš, éťč ]]", none: "[[ Ýóů ĥáνé ɳó ɳóťíƒíčáťíóɳš říǧĥť ɳóŵ. ]]", more: "[[ νíéŵ ółďéř ɳóťíƒíčáťíóɳš ]]", mentioned: "[[ <šƿáɳ ťíťłé='ɱéɳťíóɳéď' čłášš='íčóɳ'>@</šƿáɳ> {{username}} {{link}} ]]", quoted: "[[ <í ťíťłé='ƣůóťéď' čłášš='íčóɳ íčóɳ-ƣůóťé-říǧĥť'></í> {{username}} {{link}} ]]", replied: "[[ <í ťíťłé='řéƿłíéď' čłášš='íčóɳ íčóɳ-řéƿłý'></í> {{username}} {{link}} ]]", posted: "[[ <í ťíťłé='řéƿłíéď' čłášš='íčóɳ íčóɳ-řéƿłý'></í> {{username}} {{link}} ]]", edited: "[[ <í ťíťłé='éďíťéď' čłášš='íčóɳ íčóɳ-ƿéɳčíł'></í> {{username}} {{link}} ]]", liked: "[[ <í ťíťłé='łíǩéď' čłášš='íčóɳ íčóɳ-ĥéářť'></í> {{username}} {{link}} ]]", private_message: "[[ <í čłášš='íčóɳ íčóɳ-éɳνéłóƿé-áłť' ťíťłé='ƿříνáťé ɱéššáǧé'></í> {{username}} {{link}} ]]", invited_to_private_message: "[[ <í čłášš='íčóɳ íčóɳ-éɳνéłóƿé-áłť' ťíťłé='ƿříνáťé ɱéššáǧé'></í> {{username}} {{link}} ]]", invitee_accepted: "[[ <í ťíťłé='áččéƿťéď ýóůř íɳνíťáťíóɳ' čłášš='íčóɳ íčóɳ-šíǧɳíɳ'></í> {{username}} áččéƿťéď ýóůř íɳνíťáťíóɳ ]]", moved_post: "[[ <í ťíťłé='ɱóνéď ƿóšť' čłášš='íčóɳ íčóɳ-ářřóŵ-říǧĥť'></í> {{username}} ɱóνéď ťó {{link}} ]]", total_flagged: "[[ ťóťáł ƒłáǧǧéď ƿóšťš ]]"}, image_selector: {title: "[[ Íɳšéřť Íɱáǧé ]]", from_my_computer: "[[ Ƒřóɱ Ϻý Ďéνíčé ]]", from_the_web: "[[ Ƒřóɱ Ťĥé Ŵéƀ ]]", add_image: "[[ Áďď Íɱáǧé ]]", remote_title: "[[ řéɱóťé íɱáǧé ]]", remote_tip: "[[ éɳťéř áďďřéšš óƒ áɳ íɱáǧé íɳ ťĥé ƒóřɱ ĥťťƿ://éхáɱƿłé.čóɱ/íɱáǧé.ʲƿǧ ]]", local_title: "[[ łóčáł íɱáǧé ]]", local_tip: "[[ čłíčǩ ťó šéłéčť áɳ íɱáǧé ƒřóɱ ýóůř ďéνíčé. ]]", upload: "[[ Ůƿłóáď ]]", uploading_image: "[[ Ůƿłóáďíɳǧ íɱáǧé ]]"}, search: {title: "[[ šéářčĥ ƒóř ťóƿíčš, ƿóšťš, ůšéřš, óř čáťéǧóříéš ]]", placeholder: "[[ ťýƿé ýóůř šéářčĥ ťéřɱš ĥéřé ]]", no_results: "[[ Ѝó řéšůłťš ƒóůɳď. ]]", searching: "[[ Šéářčĥíɳǧ ... ]]"}, site_map: "[[ ǧó ťó áɳóťĥéř ťóƿíč łíšť óř čáťéǧóřý ]]", go_back: "[[ ǧó ƀáčǩ ]]", current_user: "[[ ǧó ťó ýóůř ůšéř ƿáǧé ]]", favorite: {title: "[[ Ƒáνóříťé ]]", help: {star: "[[ áďď ťĥíš ťóƿíč ťó ýóůř ƒáνóříťéš łíšť ]]", unstar: "[[ řéɱóνé ťĥíš ťóƿíč ƒřóɱ ýóůř ƒáνóříťéš łíšť ]]"}}, topics: {none: {favorited: "[[ Ýóů ĥáνéɳ'ť ƒáνóříťéď áɳý ťóƿíčš ýéť. Ťó ƒáνóříťé á ťóƿíč, čłíčǩ óř ťáƿ ťĥé šťář ɳéхť ťó ťĥé ťíťłé. ]]", unread: "[[ Ýóů ĥáνé ɳó ůɳřéáď ťóƿíčš ťó řéáď. ]]", "new": "[[ Ýóů ĥáνé ɳó ɳéŵ ťóƿíčš ťó řéáď. ]]", read: "[[ Ýóů ĥáνéɳ'ť řéáď áɳý ťóƿíčš ýéť. ]]", posted: "[[ Ýóů ĥáνéɳ'ť ƿóšťéď íɳ áɳý ťóƿíčš ýéť. ]]", latest: "[[ Ťĥéřé ářé ɳó łáťéšť ťóƿíčš. Ťĥáť'š šáď. ]]", hot: "[[ Ťĥéřé ářé ɳó ĥóť ťóƿíčš. ]]", category: "[[ Ťĥéřé ářé ɳó {{category}} ťóƿíčš. ]]"}, bottom: {latest: "[[ Ťĥéřé ářé ɳó ɱóřé łáťéšť ťóƿíčš ťó řéáď. ]]", hot: "[[ Ťĥéřé ářé ɳó ɱóřé ĥóť ťóƿíčš ťó řéáď. ]]", posted: "[[ Ťĥéřé ářé ɳó ɱóřé ƿóšťéď ťóƿíčš ťó řéáď. ]]", read: "[[ Ťĥéřé ářé ɳó ɱóřé řéáď ťóƿíčš ťó řéáď. ]]", "new": "[[ Ťĥéřé ářé ɳó ɱóřé ɳéŵ ťóƿíčš ťó řéáď. ]]", unread: "[[ Ťĥéřé ářé ɳó ɱóřé ůɳřéáď ťóƿíčš ťó řéáď. ]]", favorited: "[[ Ťĥéřé ářé ɳó ɱóřé ƒáνóříťéď ťóƿíčš ťó řéáď. ]]", category: "[[ Ťĥéřé ářé ɳó ɱóřé {{category}} ťóƿíčš. ]]"}}, rank_details: {toggle: "[[ ťóǧǧłé ťóƿíč řáɳǩ ďéťáíłš ]]", show: "[[ šĥóŵ ťóƿíč řáɳǩ ďéťáíłš ]]", title: "[[ Ťóƿíč Řáɳǩ Ďéťáíłš ]]"}, topic: {create_in: "[[ Čřéáťé {{categoryName}} Ťóƿíč ]]", create: "[[ Čřéáťé Ťóƿíč ]]", create_long: "[[ Čřéáťé á ɳéŵ Ťóƿíč ]]", private_message: "[[ Šťářť á ƿříνáťé ɱéššáǧé ]]", list: "[[ Ťóƿíčš ]]", "new": "[[ ɳéŵ ťóƿíč ]]", title: "[[ Ťóƿíč ]]", loading_more: "[[ Łóáďíɳǧ ɱóřé Ťóƿíčš... ]]", loading: "[[ Łóáďíɳǧ ťóƿíč... ]]", invalid_access: {title: "[[ Ťóƿíč íš ƿříνáťé ]]", description: "[[ Šóřřý, ýóů ďóɳ'ť ĥáνé áččéšš ťó ťĥáť ťóƿíč! ]]"}, server_error: {title: "[[ Ťóƿíč ƒáíłéď ťó łóáď ]]", description: "[[ Šóřřý, ŵé čóůłďɳ'ť łóáď ťĥáť ťóƿíč, ƿóššíƀłý ďůé ťó á čóɳɳéčťíóɳ ƿřóƀłéɱ. Рłéášé ťřý áǧáíɳ. Íƒ ťĥé ƿřóƀłéɱ ƿéřšíšťš, łéť ůš ǩɳóŵ. ]]"}, not_found: {title: "[[ Ťóƿíč ɳóť ƒóůɳď ]]", description: "[[ Šóřřý, ŵé čóůłďɳ'ť ƒíɳď ťĥáť ťóƿíč. Рéřĥáƿš íť ŵáš řéɱóνéď ƀý á ɱóďéřáťóř? ]]"}, unread_posts: "[[ ýóů ĥáνé {{unread}} ůɳřéáď ółď ƿóšťš íɳ ťĥíš ťóƿíč ]]", new_posts: "[[ ťĥéřé ářé {{new_posts}} ɳéŵ ƿóšťš íɳ ťĥíš ťóƿíč šíɳčé ýóů łášť řéáď íť ]]", likes: {one: "[[ ťĥéřé íš 1 łíǩé íɳ ťĥíš ťóƿíč ]]", other: "[[ ťĥéřé ářé {{count}} łíǩéš íɳ ťĥíš ťóƿíč ]]"}, back_to_list: "[[ Ɓáčǩ ťó Ťóƿíč Łíšť ]]", options: "[[ Ťóƿíč Óƿťíóɳš ]]", show_links: "[[ šĥóŵ łíɳǩš ŵíťĥíɳ ťĥíš ťóƿíč ]]", toggle_information: "[[ ťóǧǧłé ťóƿíč ďéťáíłš ]]", read_more_in_category: "[[ Ŵáɳť ťó řéáď ɱóřé? Ɓřóŵšé óťĥéř ťóƿíčš íɳ {{catLink}} óř {{latestLink}}. ]]", read_more: "[[ Ŵáɳť ťó řéáď ɱóřé? {{catLink}} óř {{latestLink}}. ]]", browse_all_categories: "[[ Ɓřóŵšé áłł čáťéǧóříéš ]]", view_latest_topics: "[[ νíéŵ łáťéšť ťóƿíčš ]]", suggest_create_topic: "[[ Ŵĥý ɳóť čřéáťé á ťóƿíč? ]]", read_position_reset: "[[ Ýóůř řéáď ƿóšíťíóɳ ĥáš ƀééɳ řéšéť. ]]", jump_reply_up: "[[ ʲůɱƿ ťó éářłíéř řéƿłý ]]", jump_reply_down: "[[ ʲůɱƿ ťó łáťéř řéƿłý ]]", deleted: "[[ Ťĥé ťóƿíč ĥáš ƀééɳ ďéłéťéď ]]", progress: {title: "[[ ťóƿíč ƿřóǧřéšš ]]", jump_top: "[[ ʲůɱƿ ťó ƒířšť ƿóšť ]]", jump_bottom: "[[ ʲůɱƿ ťó łášť ƿóšť ]]", total: "[[ ťóťáł ƿóšťš ]]", current: "[[ čůřřéɳť ƿóšť ]]"}, notifications: {title: "[[  ]]", reasons: {"3_2": "[[ Ýóů ŵíłł řéčéíνé ɳóťíƒíčáťíóɳš ƀéčáůšé ýóů ářé ŵáťčĥíɳǧ ťĥíš ťóƿíč. ]]", "3_1": "[[ Ýóů ŵíłł řéčéíνé ɳóťíƒíčáťíóɳš ƀéčáůšé ýóů čřéáťéď ťĥíš ťóƿíč. ]]", 3: "[[ Ýóů ŵíłł řéčéíνé ɳóťíƒíčáťíóɳš ƀéčáůšé ýóů ářé ŵáťčĥíɳǧ ťĥíš ťóƿíč. ]]", "2_4": "[[ Ýóů ŵíłł řéčéíνé ɳóťíƒíčáťíóɳš ƀéčáůšé ýóů ƿóšťéď á řéƿłý ťó ťĥíš ťóƿíč. ]]", "2_2": "[[ Ýóů ŵíłł řéčéíνé ɳóťíƒíčáťíóɳš ƀéčáůšé ýóů ářé ťřáčǩíɳǧ ťĥíš ťóƿíč. ]]", 2: '[[ Ýóů ŵíłł řéčéíνé ɳóťíƒíčáťíóɳš ƀéčáůšé ýóů <á ĥřéƒ="/ůšéřš/{{username}}/ƿřéƒéřéɳčéš">řéáď ťĥíš ťóƿíč</á>. ]]', 1: "[[ Ýóů ŵíłł ƀé ɳóťíƒíéď óɳłý íƒ šóɱéóɳé ɱéɳťíóɳš ýóůř @ɳáɱé óř řéƿłíéš ťó ýóůř ƿóšť. ]]", "1_2": "[[ Ýóů ŵíłł ƀé ɳóťíƒíéď óɳłý íƒ šóɱéóɳé ɱéɳťíóɳš ýóůř @ɳáɱé óř řéƿłíéš ťó ýóůř ƿóšť. ]]", 0: "[[ Ýóů ářé íǧɳóříɳǧ áłł ɳóťíƒíčáťíóɳš óɳ ťĥíš ťóƿíč. ]]", "0_2": "[[ Ýóů ářé íǧɳóříɳǧ áłł ɳóťíƒíčáťíóɳš óɳ ťĥíš ťóƿíč. ]]"}, watching: {title: "[[ Ŵáťčĥíɳǧ ]]", description: "[[ šáɱé áš Ťřáčǩíɳǧ, ƿłůš ýóů ŵíłł ƀé ɳóťíƒíéď óƒ áłł ɳéŵ ƿóšťš. ]]"}, tracking: {title: "[[ Ťřáčǩíɳǧ ]]", description: "[[ ýóů ŵíłł ƀé ɳóťíƒíéď óƒ @ɳáɱé ɱéɳťíóɳš áɳď řéƿłíéš ťó ýóůř ƿóšťš, ƿłůš ýóů ŵíłł šéé á čóůɳť óƒ ůɳřéáď áɳď ɳéŵ ƿóšťš. ]]"}, regular: {title: "[[ Řéǧůłář ]]", description: "[[ ýóů ŵíłł ƀé ɳóťíƒíéď óɳłý íƒ šóɱéóɳé ɱéɳťíóɳš ýóůř @ɳáɱé óř řéƿłíéš ťó ýóůř ƿóšť. ]]"}, muted: {title: "[[ Ϻůťéď ]]", description: "[[ ýóů ŵíłł ɳóť ƀé ɳóťíƒíéď óƒ áɳýťĥíɳǧ áƀóůť ťĥíš ťóƿíč, áɳď íť ŵíłł ɳóť áƿƿéář óɳ ýóůř ůɳřéáď ťáƀ. ]]"}}, actions: {"delete": "[[ Ďéłéťé Ťóƿíč ]]", open: "[[ Óƿéɳ Ťóƿíč ]]", close: "[[ Čłóšé Ťóƿíč ]]", unpin: "[[ Ůɳ-Рíɳ Ťóƿíč ]]", pin: "[[ Рíɳ Ťóƿíč ]]", unarchive: "[[ Ůɳářčĥíνé Ťóƿíč ]]", archive: "[[ Ářčĥíνé Ťóƿíč ]]", invisible: "[[ Ϻáǩé Íɳνíšíƀłé ]]", visible: "[[ Ϻáǩé Ѷíšíƀłé ]]", reset_read: "[[ Řéšéť Řéáď Ďáťá ]]", multi_select: "[[ Ťóǧǧłé Ϻůłťí-Šéłéčť ]]", convert_to_topic: "[[ Čóɳνéřť ťó Řéǧůłář Ťóƿíč ]]"}, reply: {title: "[[ Řéƿłý ]]", help: "[[ ƀéǧíɳ čóɱƿóšíɳǧ á řéƿłý ťó ťĥíš ťóƿíč ]]"}, clear_pin: {title: "[[ Čłéář ƿíɳ ]]", help: "[[ Čłéář ťĥé ƿíɳɳéď šťáťůš óƒ ťĥíš ťóƿíč šó íť ɳó łóɳǧéř áƿƿéářš áť ťĥé ťóƿ óƒ ýóůř ťóƿíč łíšť ]]"}, share: {title: "[[ Šĥářé ]]", help: "[[ šĥářé á łíɳǩ ťó ťĥíš ťóƿíč ]]"}, inviting: "[[ Íɳνíťíɳǧ... ]]", invite_private: {title: "[[ Íɳνíťé ťó Рříνáťé Ϻéššáǧé ]]", email_or_username: "[[ Íɳνíťéé'š Éɱáíł óř Ůšéřɳáɱé ]]", email_or_username_placeholder: "[[ éɱáíł áďďřéšš óř ůšéřɳáɱé ]]", action: "[[ Íɳνíťé ]]", success: "[[ Ťĥáɳǩš! Ŵé'νé íɳνíťéď ťĥáť ůšéř ťó ƿářťíčíƿáťé íɳ ťĥíš ƿříνáťé ɱéššáǧé. ]]", error: "[[ Šóřřý, ťĥéřé ŵáš áɳ éřřóř íɳνíťíɳǧ ťĥáť ůšéř. ]]"}, invite_reply: {title: "[[ Íɳνíťé Ƒříéɳďš ťó Řéƿłý ]]", action: "[[ Éɱáíł Íɳνíťé ]]", help: "[[ šéɳď íɳνíťáťíóɳš ťó ƒříéɳďš šó ťĥéý čáɳ řéƿłý ťó ťĥíš ťóƿíč ŵíťĥ á šíɳǧłé čłíčǩ ]]", email: "[[ Ŵé'łł šéɳď ýóůř ƒříéɳď á ƀříéƒ éɱáíł áłłóŵíɳǧ ťĥéɱ ťó řéƿłý ťó ťĥíš ťóƿíč ƀý čłíčǩíɳǧ á łíɳǩ. ]]", email_placeholder: "[[ éɱáíł áďďřéšš ]]", success: "[[ Ťĥáɳǩš! Ŵé ɱáíłéď óůť áɳ íɳνíťáťíóɳ ťó <ƀ>{{email}}</ƀ>. Ŵé'łł łéť ýóů ǩɳóŵ ŵĥéɳ ťĥéý řéďééɱ ýóůř íɳνíťáťíóɳ. Čĥéčǩ ťĥé íɳνíťáťíóɳš ťáƀ óɳ ýóůř ůšéř ƿáǧé ťó ǩééƿ ťřáčǩ óƒ ŵĥó ýóů'νé íɳνíťéď. ]]", error: "[[ Šóřřý, ŵé čóůłďɳ'ť íɳνíťé ťĥáť ƿéřšóɳ. Рéřĥáƿš ťĥéý ářé áłřéáďý á ůšéř? ]]"}, login_reply: "[[ Łóǧ Íɳ ťó Řéƿłý ]]", filters: {user: "[[ Ýóů'řé νíéŵíɳǧ óɳłý {{n_posts}} {{by_n_users}}. ]]", n_posts: {one: "[[ 1 ƿóšť ]]", other: "[[ {{count}} ƿóšťš ]]"}, by_n_users: {one: "[[ ɱáďé ƀý 1 šƿéčíƒíč ůšéř ]]", other: "[[ ɱáďé ƀý {{count}} šƿéčíƒíč ůšéřš ]]"}, best_of: "[[ Ýóů'řé νíéŵíɳǧ ťĥé {{n_best_posts}} {{of_n_posts}}. ]]", n_best_posts: {one: "[[ 1 ƀéšť ƿóšť ]]", other: "[[ {{count}} ƀéšť ƿóšťš ]]"}, of_n_posts: {one: "[[ óƒ 1 íɳ ťĥé ťóƿíč ]]", other: "[[ óƒ {{count}} íɳ ťĥé ťóƿíč ]]"}, cancel: "[[ Šĥóŵ áłł ƿóšťš íɳ ťĥíš ťóƿíč áǧáíɳ. ]]"}, move_selected: {title: "[[ Ϻóνé Šéłéčťéď Рóšťš ]]", topic_name: "[[ Ѝéŵ Ťóƿíč Ѝáɱé: ]]", error: "[[ Šóřřý, ťĥéřé ŵáš áɳ éřřóř ɱóνíɳǧ ťĥóšé ƿóšťš. ]]", instructions: {one: "[[ Ýóů ářé áƀóůť ťó čřéáťé á ɳéŵ ťóƿíč áɳď ƿóƿůłáťé íť ŵíťĥ ťĥé ƿóšť ýóů'νé šéłéčťéď. ]]", other: "[[ Ýóů ářé áƀóůť ťó čřéáťé á ɳéŵ ťóƿíč áɳď ƿóƿůłáťé íť ŵíťĥ ťĥé <ƀ>{{count}}</ƀ> ƿóšťš ýóů'νé šéłéčťéď. ]]"}}, multi_select: {select: "[[ šéłéčť ]]", selected: "[[ šéłéčťéď ({{count}}) ]]", "delete": "[[ ďéłéťé šéłéčťéď ]]", cancel: "[[ čáɳčéł šéłéčťíɳǧ ]]", move: "[[ ɱóνé šéłéčťéď ]]", description: {one: "[[ Ýóů ĥáνé šéłéčťéď <ƀ>1</ƀ> ƿóšť. ]]", other: "[[ Ýóů ĥáνé šéłéčťéď <ƀ>{{count}}</ƀ> ƿóšťš. ]]"}}}, post: {reply: "[[ Řéƿłýíɳǧ ťó {{link}} ƀý {{replyAvatar}} {{username}} ]]", reply_topic: "[[ Řéƿłý ťó {{link}} ]]", quote_reply: "[[ ƣůóťé řéƿłý ]]", edit: "[[ Éďíťíɳǧ {{link}} ƀý {{replyAvatar}} {{username}} ]]", post_number: "[[ ƿóšť {{number}} ]]", in_reply_to: "[[ íɳ řéƿłý ťó ]]", reply_as_new_topic: "[[ Řéƿłý áš ɳéŵ Ťóƿíč ]]", continue_discussion: "[[ Čóɳťíɳůíɳǧ ťĥé ďíščůššíóɳ ƒřóɱ {{postLink}}: ]]", follow_quote: "[[ ǧó ťó ťĥé ƣůóťéď ƿóšť ]]", deleted_by_author: "[[ (ƿóšť řéɱóνéď ƀý áůťĥóř) ]]", expand_collapse: "[[ éхƿáɳď/čółłáƿšé ]]", has_replies: {one: "[[ Řéƿłý ]]", other: "[[ Řéƿłíéš ]]"}, errors: {create: "[[ Šóřřý, ťĥéřé ŵáš áɳ éřřóř čřéáťíɳǧ ýóůř ƿóšť. Рłéášé ťřý áǧáíɳ. ]]", edit: "[[ Šóřřý, ťĥéřé ŵáš áɳ éřřóř éďíťíɳǧ ýóůř ƿóšť. Рłéášé ťřý áǧáíɳ. ]]", upload: "[[ Šóřřý, ťĥéřé ŵáš áɳ éřřóř ůƿłóáďíɳǧ ťĥáť ƒíłé. Рłéášé ťřý áǧáíɳ. ]]", upload_too_large: "[[ Šóřřý, ťĥé ƒíłé ýóů ářé ťřýíɳǧ ťó ůƿłóáď íš ťóó ƀíǧ (ɱáхíɱůɱ šížé íš {{max_size_kb}}ǩƀ), ƿłéášé řéšížé íť áɳď ťřý áǧáíɳ. ]]", upload_too_many_images: "[[ Šóřřý, ýóů čáɳ óɳłý ůƿłóáď óɳé íɱáǧé áť á ťíɱé. ]]", only_images_are_supported: "[[ Šóřřý, ýóů čáɳ óɳłý ůƿłóáď íɱáǧéš. ]]"}, abandon: "[[ Ářé ýóů šůřé ýóů ŵáɳť ťó áƀáɳďóɳ ýóůř ƿóšť? ]]", archetypes: {save: "[[ Šáνé Óƿťíóɳš ]]"}, controls: {reply: "[[ ƀéǧíɳ čóɱƿóšíɳǧ á řéƿłý ťó ťĥíš ƿóšť ]]", like: "[[ łíǩé ťĥíš ƿóšť ]]", edit: "[[ éďíť ťĥíš ƿóšť ]]", flag: "[[ ƒłáǧ ťĥíš ƿóšť ƒóř áťťéɳťíóɳ óř šéɳď á ɳóťíƒíčáťíóɳ áƀóůť íť ]]", "delete": "[[ ďéłéťé ťĥíš ƿóšť ]]", undelete: "[[ ůɳďéłéťé ťĥíš ƿóšť ]]", share: "[[ šĥářé á łíɳǩ ťó ťĥíš ƿóšť ]]", bookmark: "[[ ƀóóǩɱářǩ ťĥíš ƿóšť ťó ýóůř ůšéř ƿáǧé ]]", more: "[[ Ϻóřé ]]"}, actions: {flag: "[[ Ƒłáǧ ]]", clear_flags: {one: "[[ Čłéář ƒłáǧ ]]", other: "[[ Čłéář ƒłáǧš ]]"}, it_too: {off_topic: "[[ Ƒłáǧ íť ťóó ]]", spam: "[[ Ƒłáǧ íť ťóó ]]", inappropriate: "[[ Ƒłáǧ íť ťóó ]]", custom_flag: "[[ Ƒłáǧ íť ťóó ]]", bookmark: "[[ Ɓóóǩɱářǩ íť ťóó ]]", like: "[[ Łíǩé íť ťóó ]]", vote: "[[ Ѷóťé ƒóř íť ťóó ]]"}, undo: {off_topic: "[[ Ůɳďó ƒłáǧ ]]", spam: "[[ Ůɳďó ƒłáǧ ]]", inappropriate: "[[ Ůɳďó ƒłáǧ ]]", bookmark: "[[ Ůɳďó ƀóóǩɱářǩ ]]", like: "[[ Ůɳďó łíǩé ]]", vote: "[[ Ůɳďó νóťé ]]"}, people: {off_topic: "[[ {{icons}} ɱářǩéď ťĥíš áš óƒƒ-ťóƿíč ]]", spam: "[[ {{icons}} ɱářǩéď ťĥíš áš šƿáɱ ]]", inappropriate: "[[ {{icons}} ɱářǩéď ťĥíš áš íɳáƿƿřóƿříáťé ]]", notify_moderators: "[[ {{icons}} ɳóťíƒíéď ɱóďéřáťóřš ]]", notify_moderators_with_url: "[[ {{icons}} <á ĥřéƒ='{{postUrl}}'>ɳóťíƒíéď ɱóďéřáťóřš</á> ]]", notify_user: "[[ {{icons}} šéɳť á ƿříνáťé ɱéššáǧé ]]", notify_user_with_url: "[[ {{icons}} šéɳť á <á ĥřéƒ='{{postUrl}}'>ƿříνáťé ɱéššáǧé</á> ]]", bookmark: "[[ {{icons}} ƀóóǩɱářǩéď ťĥíš ]]", like: "[[ {{icons}} łíǩéď ťĥíš ]]", vote: "[[ {{icons}} νóťéď ƒóř ťĥíš ]]"}, by_you: {off_topic: "[[ Ýóů ƒłáǧǧéď ťĥíš áš óƒƒ-ťóƿíč ]]", spam: "[[ Ýóů ƒłáǧǧéď ťĥíš áš šƿáɱ ]]", inappropriate: "[[ Ýóů ƒłáǧǧéď ťĥíš áš íɳáƿƿřóƿříáťé ]]", notify_moderators: "[[ Ýóů ƒłáǧǧéď ťĥíš ƒóř ɱóďéřáťíóɳ ]]", notify_user: "[[ Ýóů šéɳť á ƿříνáťé ɱéššáǧé ťó ťĥíš ůšéř ]]", bookmark: "[[ Ýóů ƀóóǩɱářǩéď ťĥíš ƿóšť ]]", like: "[[ Ýóů łíǩéď ťĥíš ]]", vote: "[[ Ýóů νóťéď ƒóř ťĥíš ƿóšť ]]"}, by_you_and_others: {off_topic: {one: "[[ Ýóů áɳď 1 óťĥéř ƒłáǧǧéď ťĥíš áš óƒƒ-ťóƿíč ]]", other: "[[ Ýóů áɳď {{count}} óťĥéř ƿéóƿłé ƒłáǧǧéď ťĥíš áš óƒƒ-ťóƿíč ]]"}, spam: {one: "[[ Ýóů áɳď 1 óťĥéř ƒłáǧǧéď ťĥíš áš šƿáɱ ]]", other: "[[ Ýóů áɳď {{count}} óťĥéř ƿéóƿłé ƒłáǧǧéď ťĥíš áš šƿáɱ ]]"}, inappropriate: {one: "[[ Ýóů áɳď 1 óťĥéř ƒłáǧǧéď ťĥíš áš íɳáƿƿřóƿříáťé ]]", other: "[[ Ýóů áɳď {{count}} óťĥéř ƿéóƿłé ƒłáǧǧéď ťĥíš áš íɳáƿƿřóƿříáťé ]]"}, notify_moderators: {one: "[[ Ýóů áɳď 1 óťĥéř ƒłáǧǧéď ťĥíš ƒóř ɱóďéřáťíóɳ ]]", other: "[[ Ýóů áɳď {{count}} óťĥéř ƿéóƿłé ƒłáǧǧéď ťĥíš ƒóř ɱóďéřáťíóɳ ]]"}, notify_user: {one: "[[ Ýóů áɳď 1 óťĥéř šéɳť á ƿříνáťé ɱéššáǧé ťó ťĥíš ůšéř ]]", other: "[[ Ýóů áɳď {{count}} óťĥéř ƿéóƿłé šéɳť á ƿříνáťé ɱéššáǧé ťó ťĥíš ůšéř ]]"}, bookmark: {one: "[[ Ýóů áɳď 1 óťĥéř ƀóóǩɱářǩéď ťĥíš ƿóšť ]]", other: "[[ Ýóů áɳď {{count}} óťĥéř ƿéóƿłé ƀóóǩɱářǩéď ťĥíš ƿóšť ]]"}, like: {one: "[[ Ýóů áɳď 1 óťĥéř łíǩéď ťĥíš ]]", other: "[[ Ýóů áɳď {{count}} óťĥéř ƿéóƿłé łíǩéď ťĥíš ]]"}, vote: {one: "[[ Ýóů áɳď 1 óťĥéř νóťéď ƒóř ťĥíš ƿóšť ]]", other: "[[ Ýóů áɳď {{count}} óťĥéř ƿéóƿłé νóťéď ƒóř ťĥíš ƿóšť ]]"}}, by_others: {off_topic: {one: "[[ 1 ƿéřšóɳ ƒłáǧǧéď ťĥíš áš óƒƒ-ťóƿíč ]]", other: "[[ {{count}} ƿéóƿłé ƒłáǧǧéď ťĥíš áš óƒƒ-ťóƿíč ]]"}, spam: {one: "[[ 1 ƿéřšóɳ ƒłáǧǧéď ťĥíš áš šƿáɱ ]]", other: "[[ {{count}} ƿéóƿłé ƒłáǧǧéď ťĥíš áš šƿáɱ ]]"}, inappropriate: {one: "[[ 1 ƿéřšóɳ ƒłáǧǧéď ťĥíš áš íɳáƿƿřóƿříáťé ]]", other: "[[ {{count}} ƿéóƿłé ƒłáǧǧéď ťĥíš áš íɳáƿƿřóƿříáťé ]]"}, notify_moderators: {one: "[[ 1 ƿéřšóɳ ƒłáǧǧéď ťĥíš ƒóř ɱóďéřáťíóɳ ]]", other: "[[ {{count}} ƿéóƿłé ƒłáǧǧéď ťĥíš ƒóř ɱóďéřáťíóɳ ]]"}, notify_user: {one: "[[ 1 ƿéřšóɳ šéɳť á ƿříνáťé ɱéššáǧé ťó ťĥíš ůšéř ]]", other: "[[ {{count}} šéɳť á ƿříνáťé ɱéššáǧé ťó ťĥíš ůšéř ]]"}, bookmark: {one: "[[ 1 ƿéřšóɳ ƀóóǩɱářǩéď ťĥíš ƿóšť ]]", other: "[[ {{count}} ƿéóƿłé ƀóóǩɱářǩéď ťĥíš ƿóšť ]]"}, like: {one: "[[ 1 ƿéřšóɳ łíǩéď ťĥíš ]]", other: "[[ {{count}} ƿéóƿłé łíǩéď ťĥíš ]]"}, vote: {one: "[[ 1 ƿéřšóɳ νóťéď ƒóř ťĥíš ƿóšť ]]", other: "[[ {{count}} ƿéóƿłé νóťéď ƒóř ťĥíš ƿóšť ]]"}}}, edits: {one: "[[ 1 éďíť ]]", other: "[[ {{count}} éďíťš ]]", zero: "[[ ɳó éďíťš ]]"}, "delete": {confirm: {one: "[[ Ářé ýóů šůřé ýóů ŵáɳť ťó ďéłéťé ťĥáť ƿóšť? ]]", other: "[[ Ářé ýóů šůřé ýóů ŵáɳť ťó ďéłéťé áłł ťĥóšé ƿóšťš? ]]"}}}, category: {none: "[[ (ɳó čáťéǧóřý) ]]", edit: "[[ éďíť ]]", edit_long: "[[ Éďíť Čáťéǧóřý ]]", edit_uncategorized: "[[ Éďíť Ůɳčáťéǧóřížéď ]]", view: "[[ Ѷíéŵ Ťóƿíčš íɳ Čáťéǧóřý ]]", "delete": "[[ Ďéłéťé Čáťéǧóřý ]]", create: "[[ Čřéáťé Čáťéǧóřý ]]", save: "[[ Šáνé Čáťéǧóřý ]]", creation_error: "[[ Ťĥéřé ĥáš ƀééɳ áɳ éřřóř ďůříɳǧ ťĥé čřéáťíóɳ óƒ ťĥé čáťéǧóřý. ]]", save_error: "[[ Ťĥéřé ŵáš áɳ éřřóř šáνíɳǧ ťĥé čáťéǧóřý. ]]", more_posts: "[[ νíéŵ áłł {{posts}}... ]]", name: "[[ Čáťéǧóřý Ѝáɱé ]]", description: "[[ Ďéščříƿťíóɳ ]]", topic: "[[ čáťéǧóřý ťóƿíč ]]", badge_colors: "[[ Ɓáďǧé čółóřš ]]", background_color: "[[ Ɓáčǩǧřóůɳď čółóř ]]", foreground_color: "[[ Ƒóřéǧřóůɳď čółóř ]]", name_placeholder: "[[ Šĥóůłď ƀé šĥóřť áɳď šůččíɳčť. ]]", color_placeholder: "[[ Áɳý ŵéƀ čółóř ]]", delete_confirm: "[[ Ářé ýóů šůřé ýóů ŵáɳť ťó ďéłéťé ťĥíš čáťéǧóřý? ]]", delete_error: "[[ Ťĥéřé ŵáš áɳ éřřóř ďéłéťíɳǧ ťĥé čáťéǧóřý. ]]", list: "[[ Łíšť Čáťéǧóříéš ]]", no_description: "[[ Ťĥéřé íš ɳó ďéščříƿťíóɳ ƒóř ťĥíš čáťéǧóřý. ]]", change_in_category_topic: "[[ Éďíť Ďéščříƿťíóɳ ]]", hotness: "[[ Ĥóťɳéšš ]]", already_used: "[[ Ťĥíš čółóř ĥáš ƀééɳ ůšéď ƀý áɳóťĥéř čáťéǧóřý ]]"}, flagging: {title: "[[ Ŵĥý ářé ýóů ƒłáǧǧíɳǧ ťĥíš ƿóšť? ]]", action: "[[ Ƒłáǧ Рóšť ]]", notify_action: "[[ Ѝóťíƒý ]]", cant: "[[ Šóřřý, ýóů čáɳ'ť ƒłáǧ ťĥíš ƿóšť áť ťĥíš ťíɱé. ]]", custom_placeholder_notify_user: "[[ Ŵĥý ďóéš ťĥíš ƿóšť řéƣůířé ýóů ťó šƿéáǩ ťó ťĥíš ůšéř ďířéčťłý áɳď ƿříνáťéłý? Ɓé šƿéčíƒíč, ƀé čóɳšťřůčťíνé, áɳď áłŵáýš ƀé ǩíɳď. ]]", custom_placeholder_notify_moderators: "[[ Ŵĥý ďóéš ťĥíš ƿóšť řéƣůířé ɱóďéřáťóř áťťéɳťíóɳ? Łéť ůš ǩɳóŵ šƿéčíƒíčáłłý ŵĥáť ýóů ářé čóɳčéřɳéď áƀóůť, áɳď ƿřóνíďé řéłéνáɳť łíɳǩš ŵĥéřé ƿóššíƀłé. ]]", custom_message: {at_least: "[[ éɳťéř áť łéášť {{n}} čĥářáčťéřš ]]", more: "[[ {{n}} ťó ǧó... ]]", left: "[[ {{n}} řéɱáíɳíɳǧ ]]"}}, topic_summary: {title: "[[ Ťóƿíč Šůɱɱářý ]]", links_shown: "[[ šĥóŵ áłł {{totalLinks}} łíɳǩš... ]]", clicks: "[[ čłíčǩš ]]", topic_link: "[[ ťóƿíč łíɳǩ ]]"}, topic_statuses: {locked: {help: "[[ ťĥíš ťóƿíč íš čłóšéď; íť ɳó łóɳǧéř áččéƿťš ɳéŵ řéƿłíéš ]]"}, pinned: {help: "[[ ťĥíš ťóƿíč íš ƿíɳɳéď; íť ŵíłł ďíšƿłáý áť ťĥé ťóƿ óƒ íťš čáťéǧóřý ]]"}, archived: {help: "[[ ťĥíš ťóƿíč íš ářčĥíνéď; íť íš ƒřóžéɳ áɳď čáɳɳóť ƀé čĥáɳǧéď ]]"}, invisible: {help: "[[ ťĥíš ťóƿíč íš íɳνíšíƀłé; íť ŵíłł ɳóť ƀé ďíšƿłáýéď íɳ ťóƿíč łíšťš, áɳď čáɳ óɳłý ƀé áččéššéď νíá á ďířéčť łíɳǩ ]]"}}, posts: "[[ Рóšťš ]]", posts_long: "[[ {{number}} ƿóšťš íɳ ťĥíš ťóƿíč ]]", original_post: "[[ Óříǧíɳáł Рóšť ]]", views: "[[ Ѷíéŵš ]]", replies: "[[ Řéƿłíéš ]]", views_long: "[[ ťĥíš ťóƿíč ĥáš ƀééɳ νíéŵéď {{number}} ťíɱéš ]]", activity: "[[ Áčťíνíťý ]]", likes: "[[ Łíǩéš ]]", top_contributors: "[[ Рářťíčíƿáɳťš ]]", category_title: "[[ Čáťéǧóřý ]]", history: "[[ Ĥíšťóřý ]]", changed_by: "[[ ƀý {{author}} ]]", categories_list: "[[ Čáťéǧóříéš Łíšť ]]", filters: {latest: {title: "[[ Łáťéšť ]]", help: "[[ ťĥé ɱóšť řéčéɳť ťóƿíčš ]]"}, hot: {title: "[[ Ĥóť ]]", help: "[[ á šéłéčťíóɳ óƒ ťĥé ĥóťťéšť ťóƿíčš ]]"}, favorited: {title: "[[ Ƒáνóříťéď ]]", help: "[[ ťóƿíčš ýóů ɱářǩéď áš ƒáνóříťéš ]]"}, read: {title: "[[ Řéáď ]]", help: "[[ ťóƿíčš ýóů'νé řéáď, íɳ ťĥé óřďéř ťĥáť ýóů łášť řéáď ťĥéɱ ]]"}, categories: {title: "[[ Čáťéǧóříéš ]]", title_in: "[[ Čáťéǧóřý - {{categoryName}} ]]", help: "[[ áłł ťóƿíčš ǧřóůƿéď ƀý čáťéǧóřý ]]"}, unread: {title: {zero: "[[ Ůɳřéáď ]]", one: "[[ Ůɳřéáď (1) ]]", other: "[[ Ůɳřéáď ({{count}}) ]]"}, help: "[[ ťřáčǩéď ťóƿíčš ŵíťĥ ůɳřéáď ƿóšťš ]]"}, "new": {title: {zero: "[[ Ѝéŵ ]]", one: "[[ Ѝéŵ (1) ]]", other: "[[ Ѝéŵ ({{count}}) ]]"}, help: "[[ ɳéŵ ťóƿíčš šíɳčé ýóůř łášť νíšíť ]]"}, posted: {title: "[[ Ϻý Рóšťš ]]", help: "[[ ťóƿíčš ýóů ĥáνé ƿóšťéď íɳ ]]"}, category: {title: {zero: "[[ {{categoryName}} ]]", one: "[[ {{categoryName}} (1) ]]", other: "[[ {{categoryName}} ({{count}}) ]]"}, help: "[[ łáťéšť ťóƿíčš íɳ ťĥé {{categoryName}} čáťéǧóřý ]]"}}, browser_update: '[[ Ůɳƒóřťůɳáťéłý, <á ĥřéƒ="ĥťťƿ://ŵŵŵ.ďíščóůřšé.óřǧ/ƒáƣ/#ƀřóŵšéř">ýóůř ƀřóŵšéř íš ťóó ółď ťó ŵóřǩ óɳ ťĥíš Ďíščóůřšé ƒóřůɱ</á>. Рłéášé <á ĥřéƒ="ĥťťƿ://ƀřóŵšéĥáƿƿý.čóɱ">ůƿǧřáďé ýóůř ƀřóŵšéř</á>. ]]', type_to_filter: "[[ ťýƿé ťó ƒíłťéř... ]]", admin: {title: "[[ Ďíščóůřšé Áďɱíɳ ]]", moderator: "[[ Ϻóďéřáťóř ]]", dashboard: {title: "[[ Ďášĥƀóářď ]]", version: "[[ Ѷéřšíóɳ ]]", up_to_date: "[[ Ýóů'řé ůƿ ťó ďáťé! ]]", critical_available: "[[ Á čříťíčáł ůƿďáťé íš áνáíłáƀłé. ]]", updates_available: "[[ Ůƿďáťéš ářé áνáíłáƀłé. ]]", please_upgrade: "[[ Рłéášé ůƿǧřáďé! ]]", installed_version: "[[ Íɳšťáłłéď ]]", latest_version: "[[ Łáťéšť ]]", problems_found: "[[ Šóɱé ƿřóƀłéɱš ĥáνé ƀééɳ ƒóůɳď ŵíťĥ ýóůř íɳšťáłłáťíóɳ óƒ Ďíščóůřšé: ]]", last_checked: "[[ Łášť čĥéčǩéď ]]", refresh_problems: "[[ Řéƒřéšĥ ]]", no_problems: "[[ Ѝó ƿřóƀłéɱš ŵéřé ƒóůɳď. ]]", moderators: "[[ Ϻóďéřáťóřš: ]]", admins: "[[ Áďɱíɳš: ]]", private_messages_short: "[[ РϺš ]]", private_messages_title: "[[ Рříνáťé Ϻéššáǧéš ]]", reports: {today: "[[ Ťóďáý ]]", yesterday: "[[ Ýéšťéřďáý ]]", last_7_days: "[[ Łášť 7 Ďáýš ]]", last_30_days: "[[ Łášť 30 Ďáýš ]]", all_time: "[[ Áłł Ťíɱé ]]", "7_days_ago": "[[ 7 Ďáýš Áǧó ]]", "30_days_ago": "[[ 30 Ďáýš Áǧó ]]", all: "[[ Áłł ]]", view_table: "[[ Ѷíéŵ áš Ťáƀłé ]]", view_chart: "[[ Ѷíéŵ áš Ɓář Čĥářť ]]"}}, commits: {latest_changes: "[[ Łáťéšť čĥáɳǧéš: ƿłéášé ůƿďáťé óƒťéɳ! ]]", by: "[[ ƀý ]]"}, flags: {title: "[[ Ƒłáǧš ]]", old: "[[ Ółď ]]", active: "[[ Áčťíνé ]]", clear: "[[ Čłéář Ƒłáǧš ]]", clear_title: "[[ ďíšɱíšš áłł ƒłáǧš óɳ ťĥíš ƿóšť (ŵíłł ůɳĥíďé ĥíďďéɳ ƿóšťš) ]]", "delete": "[[ Ďéłéťé Рóšť ]]", delete_title: "[[ ďéłéťé ƿóšť (íƒ íťš ťĥé ƒířšť ƿóšť ďéłéťé ťóƿíč) ]]", flagged_by: "[[ Ƒłáǧǧéď ƀý ]]", error: "[[ Šóɱéťĥíɳǧ ŵéɳť ŵřóɳǧ ]]"}, groups: {title: "[[ Ǧřóůƿš ]]", edit: "[[ Éďíť Ǧřóůƿš ]]", selector_placeholder: "[[ áďď ůšéřš ]]"}, api: {title: "[[ ÁРÍ ]]"}, customize: {title: "[[ Čůšťóɱížé ]]", long_title: "[[ Šíťé Čůšťóɱížáťíóɳš ]]", header: "[[ Ĥéáďéř ]]", css: "[[ Šťýłéšĥééť ]]", override_default: "[[ Ďó ɳóť íɳčłůďé šťáɳďářď šťýłé šĥééť ]]", enabled: "[[ Éɳáƀłéď? ]]", preview: "[[ ƿřéνíéŵ ]]", undo_preview: "[[ ůɳďó ƿřéνíéŵ ]]", save: "[[ Šáνé ]]", "new": "[[ Ѝéŵ ]]", new_style: "[[ Ѝéŵ Šťýłé ]]", "delete": "[[ Ďéłéťé ]]", delete_confirm: "[[ Ďéłéťé ťĥíš čůšťóɱížáťíóɳ? ]]", about: "[[ Šíťé Čůšťóɱížáťíóɳ áłłóŵ ýóů ťó ɱóďíƒý šťýłéšĥééťš áɳď ĥéáďéřš óɳ ťĥé šíťé. Čĥóóšé óř áďď óɳé ťó šťářť éďíťíɳǧ. ]]"}, email: {title: "[[ Éɱáíł Łóǧš ]]", sent_at: "[[ Šéɳť Áť ]]", email_type: "[[ Éɱáíł Ťýƿé ]]", to_address: "[[ Ťó Áďďřéšš ]]", test_email_address: "[[ éɱáíł áďďřéšš ťó ťéšť ]]", send_test: "[[ šéɳď ťéšť éɱáíł ]]", sent_test: "[[ šéɳť! ]]"}, impersonate: {title: "[[ Íɱƿéřšóɳáťé Ůšéř ]]", username_or_email: "[[ Ůšéřɳáɱé óř Éɱáíł óƒ Ůšéř ]]", help: "[[ Ůšé ťĥíš ťóół ťó íɱƿéřšóɳáťé á ůšéř áččóůɳť ƒóř ďéƀůǧǧíɳǧ ƿůřƿóšéš. ]]", not_found: "[[ Ťĥáť ůšéř čáɳ'ť ƀé ƒóůɳď. ]]", invalid: "[[ Šóřřý, ýóů ɱáý ɳóť íɱƿéřšóɳáťé ťĥáť ůšéř. ]]"}, users: {title: "[[ Ůšéřš ]]", create: "[[ Áďď Áďɱíɳ Ůšéř ]]", last_emailed: "[[ Łášť Éɱáíłéď ]]", not_found: "[[ Šóřřý, ťĥáť ůšéřɳáɱé ďóéšɳ'ť éхíšť íɳ óůř šýšťéɱ. ]]", "new": "[[ Ѝéŵ ]]", active: "[[ Áčťíνé ]]", pending: "[[ Рéɳďíɳǧ ]]", approved: "[[ Áƿƿřóνéď? ]]", approved_selected: {one: "[[ áƿƿřóνé ůšéř ]]", other: "[[ áƿƿřóνé ůšéřš ({{count}}) ]]"}, titles: {active: "[[ Áčťíνé Ůšéřš ]]", "new": "[[ Ѝéŵ Ůšéřš ]]", pending: "[[ Ůšéřš Рéɳďíɳǧ Řéνíéŵ ]]", newuser: "[[ Ůšéřš áť Ťřůšť Łéνéł 0 (Ѝéŵ Ůšéř) ]]", basic: "[[ Ůšéřš áť Ťřůšť Łéνéł 1 (Ɓášíč Ůšéř) ]]", regular: "[[ Ůšéřš áť Ťřůšť Łéνéł 2 (Řéǧůłář Ůšéř) ]]", leader: "[[ Ůšéřš áť Ťřůšť Łéνéł 3 (Łéáďéř) ]]", elder: "[[ Ůšéřš áť Ťřůšť Łéνéł 4 (Éłďéř) ]]", admins: "[[ Áďɱíɳ Ůšéřš ]]", moderators: "[[ Ϻóďéřáťóřš ]]"}}, user: {ban_failed: "[[ Šóɱéťĥíɳǧ ŵéɳť ŵřóɳǧ ƀáɳɳíɳǧ ťĥíš ůšéř {{error}} ]]", unban_failed: "[[ Šóɱéťĥíɳǧ ŵéɳť ŵřóɳǧ ůɳƀáɳɳíɳǧ ťĥíš ůšéř {{error}} ]]", ban_duration: "[[ Ĥóŵ łóɳǧ ŵóůłď ýóů łíǩé ťó ƀáɳ ťĥé ůšéř ƒóř? (ďáýš) ]]", delete_all_posts: "[[ Ďéłéťé áłł ƿóšťš ]]", ban: "[[ Ɓáɳ ]]", unban: "[[ Ůɳƀáɳ ]]", banned: "[[ Ɓáɳɳéď? ]]", moderator: "[[ Ϻóďéřáťóř? ]]", admin: "[[ Áďɱíɳ? ]]", show_admin_profile: "[[ Áďɱíɳ ]]", refresh_browsers: "[[ Ƒóřčé ƀřóŵšéř řéƒřéšĥ ]]", show_public_profile: "[[ Šĥóŵ Рůƀłíč Рřóƒíłé ]]", impersonate: "[[ Íɱƿéřšóɳáťé ]]", revoke_admin: "[[ Řéνóǩé Áďɱíɳ ]]", grant_admin: "[[ Ǧřáɳť Áďɱíɳ ]]", revoke_moderation: "[[ Řéνóǩé Ϻóďéřáťíóɳ ]]", grant_moderation: "[[ Ǧřáɳť Ϻóďéřáťíóɳ ]]", reputation: "[[ Řéƿůťáťíóɳ ]]", permissions: "[[ Рéřɱíššíóɳš ]]", activity: "[[ Áčťíνíťý ]]", like_count: "[[ Łíǩéš Řéčéíνéď ]]", private_topics_count: "[[ Рříνáťé Ťóƿíčš Čóůɳť ]]", posts_read_count: "[[ Рóšťš Řéáď ]]", post_count: "[[ Рóšťš Čřéáťéď ]]", topics_entered: "[[ Ťóƿíčš Éɳťéřéď ]]", flags_given_count: "[[ Ƒłáǧš Ǧíνéɳ ]]", flags_received_count: "[[ Ƒłáǧš Řéčéíνéď ]]", approve: "[[ Áƿƿřóνé ]]", approved_by: "[[ áƿƿřóνéď ƀý ]]", time_read: "[[ Řéáď Ťíɱé ]]", "delete": "[[ Ďéłéťé Ůšéř ]]", delete_forbidden: "[[ Ťĥíš ůšéř čáɳ'ť ƀé ďéłéťéď ƀéčáůšé ťĥéřé ářé ƿóšťš. Ďéłéťé áłł ťĥíš ůšéř'š ƿóšťš ƒířšť. ]]", delete_confirm: "[[ Ářé ýóů ŠŮŘÉ ýóů ŵáɳť ťó ƿéřɱáɳéɳťłý ďéłéťé ťĥíš ůšéř ƒřóɱ ťĥé šíťé? Ťĥíš áčťíóɳ íš ƿéřɱáɳéɳť! ]]", deleted: "[[ Ťĥé ůšéř ŵáš ďéłéťéď. ]]", delete_failed: "[[ Ťĥéřé ŵáš áɳ éřřóř ďéłéťíɳǧ ťĥáť ůšéř. Ϻáǩé šůřé áłł ƿóšťš ářé ďéłéťéď ƀéƒóřé ťřýíɳǧ ťó ďéłéťé ťĥé ůšéř. ]]"}, site_content: {none: "[[ Čĥóóšé á ťýƿé óƒ čóɳťéɳť ťó ƀéǧíɳ éďíťíɳǧ. ]]", title: "[[ Šíťé Čóɳťéɳť ]]", edit: "[[ Éďíť Šíťé Čóɳťéɳť ]]"}, site_settings: {show_overriden: "[[ Óɳłý šĥóŵ óνéřříďďéɳ ]]", title: "[[ Šíťé Šéťťíɳǧš ]]", reset: "[[ řéšéť ťó ďéƒáůłť ]]"}}}}}, I18n.locale = "pseudo", function (e) {
    function t(e, t) {
        return function (n) {
            return u(e.call(this, n), t)
        }
    }

    function n(e, t) {
        return function (n) {
            return this.lang().ordinal(e.call(this, n), t)
        }
    }

    function s() {
    }

    function r(e) {
        a(this, e)
    }

    function i(e) {
        var t = this._data = {}, n = e.years || e.year || e.y || 0, s = e.months || e.month || e.M || 0, r = e.weeks || e.week || e.w || 0, i = e.days || e.day || e.d || 0, a = e.hours || e.hour || e.h || 0, u = e.minutes || e.minute || e.m || 0, l = e.seconds || e.second || e.s || 0, c = e.milliseconds || e.millisecond || e.ms || 0;
        this._milliseconds = c + 1e3 * l + 6e4 * u + 36e5 * a, this._days = i + 7 * r, this._months = s + 12 * n, t.milliseconds = c % 1e3, l += o(c / 1e3), t.seconds = l % 60, u += o(l / 60), t.minutes = u % 60, a += o(u / 60), t.hours = a % 24, i += o(a / 24), i += 7 * r, t.days = i % 30, s += o(i / 30), t.months = s % 12, n += o(s / 12), t.years = n
    }

    function a(e, t) {
        for (var n in t)t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }

    function o(e) {
        return 0 > e ? Math.ceil(e) : Math.floor(e)
    }

    function u(e, t) {
        for (var n = e + ""; t > n.length;)n = "0" + n;
        return n
    }

    function l(e, t, n, s) {
        var r, i, a, o = t._milliseconds, u = t._days, l = t._months;
        o && e._d.setTime(+e._d + o * n), (u || l) && (r = e.minute(), i = e.hour()), u && e.date(e.date() + u * n), l && (a = e.date(), e.date(1).month(e.month() + l * n).date(Math.min(a, e.daysInMonth()))), o && !s && z.updateOffset(e), (u || l) && (e.minute(r), e.hour(i))
    }

    function c(e) {
        return"[object Array]" === Object.prototype.toString.call(e)
    }

    function h(e, t) {
        var n, s = Math.min(e.length, t.length), r = Math.abs(e.length - t.length), i = 0;
        for (n = 0; s > n; n++)~~e[n] !== ~~t[n] && i++;
        return i + r
    }

    function p(e) {
        return e ? rt[e] || e.toLowerCase().replace(/(.)s$/, "$1") : e
    }

    function d(e, t) {
        return t.abbr = e, O[e] || (O[e] = new s), O[e].set(t), O[e]
    }

    function f(e) {
        return e ? (!O[e] && R && require("./lang/" + e), O[e]) : z.fn._lang
    }

    function m(e) {
        return e.match(/\[.*\]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }

    function g(e) {
        var t, n, s = e.match(H);
        for (t = 0, n = s.length; n > t; t++)s[t] = ut[s[t]] ? ut[s[t]] : m(s[t]);
        return function (r) {
            var i = "";
            for (t = 0; n > t; t++)i += s[t]instanceof Function ? s[t].call(r, e) : s[t];
            return i
        }
    }

    function b(e, t) {
        function n(t) {
            return e.lang().longDateFormat(t) || t
        }

        for (var s = 5; s-- && V.test(t);)t = t.replace(V, n);
        return it[t] || (it[t] = g(t)), it[t](e)
    }

    function v(e, t) {
        switch (e) {
            case"DDDD":
                return G;
            case"YYYY":
                return q;
            case"YYYYY":
                return W;
            case"S":
            case"SS":
            case"SSS":
            case"DDD":
                return Y;
            case"MMM":
            case"MMMM":
            case"dd":
            case"ddd":
            case"dddd":
                return $;
            case"a":
            case"A":
                return f(t._l)._meridiemParse;
            case"X":
                return Z;
            case"Z":
            case"ZZ":
                return K;
            case"T":
                return Q;
            case"MM":
            case"DD":
            case"YY":
            case"HH":
            case"hh":
            case"mm":
            case"ss":
            case"M":
            case"D":
            case"d":
            case"H":
            case"h":
            case"m":
            case"s":
                return B;
            default:
                return new RegExp(e.replace("\\", ""))
        }
    }

    function y(e) {
        var t = (K.exec(e) || [])[0], n = (t + "").match(tt) || ["-", 0, 0], s = +(60 * n[1]) + ~~n[2];
        return"+" === n[0] ? -s : s
    }

    function _(e, t, n) {
        var s, r = n._a;
        switch (e) {
            case"M":
            case"MM":
                r[1] = null == t ? 0 : ~~t - 1;
                break;
            case"MMM":
            case"MMMM":
                s = f(n._l).monthsParse(t), null != s ? r[1] = s : n._isValid = !1;
                break;
            case"D":
            case"DD":
            case"DDD":
            case"DDDD":
                null != t && (r[2] = ~~t);
                break;
            case"YY":
                r[0] = ~~t + (~~t > 68 ? 1900 : 2e3);
                break;
            case"YYYY":
            case"YYYYY":
                r[0] = ~~t;
                break;
            case"a":
            case"A":
                n._isPm = f(n._l).isPM(t);
                break;
            case"H":
            case"HH":
            case"h":
            case"hh":
                r[3] = ~~t;
                break;
            case"m":
            case"mm":
                r[4] = ~~t;
                break;
            case"s":
            case"ss":
                r[5] = ~~t;
                break;
            case"S":
            case"SS":
            case"SSS":
                r[6] = ~~(1e3 * ("0." + t));
                break;
            case"X":
                n._d = new Date(1e3 * parseFloat(t));
                break;
            case"Z":
            case"ZZ":
                n._useUTC = !0, n._tzm = y(t)
        }
        null == t && (n._isValid = !1)
    }

    function w(e) {
        var t, n, s = [];
        if (!e._d) {
            for (t = 0; 7 > t; t++)e._a[t] = s[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            s[3] += ~~((e._tzm || 0) / 60), s[4] += ~~((e._tzm || 0) % 60), n = new Date(0), e._useUTC ? (n.setUTCFullYear(s[0], s[1], s[2]), n.setUTCHours(s[3], s[4], s[5], s[6])) : (n.setFullYear(s[0], s[1], s[2]), n.setHours(s[3], s[4], s[5], s[6])), e._d = n
        }
    }

    function x(e) {
        var t, n, s = e._f.match(H), r = e._i;
        for (e._a = [], t = 0; s.length > t; t++)n = (v(s[t], e).exec(r) || [])[0], n && (r = r.slice(r.indexOf(n) + n.length)), ut[s[t]] && _(s[t], n, e);
        r && (e._il = r), e._isPm && 12 > e._a[3] && (e._a[3] += 12), e._isPm === !1 && 12 === e._a[3] && (e._a[3] = 0), w(e)
    }

    function k(e) {
        var t, n, s, i, o, u = 99;
        for (i = 0; e._f.length > i; i++)t = a({}, e), t._f = e._f[i], x(t), n = new r(t), o = h(t._a, n.toArray()), n._il && (o += n._il.length), u > o && (u = o, s = n);
        a(e, s)
    }

    function T(e) {
        var t, n = e._i, s = J.exec(n);
        if (s) {
            for (e._f = "YYYY-MM-DD" + (s[2] || " "), t = 0; 4 > t; t++)if (et[t][1].exec(n)) {
                e._f += et[t][0];
                break
            }
            K.exec(n) && (e._f += " Z"), x(e)
        } else e._d = new Date(n)
    }

    function D(t) {
        var n = t._i, s = U.exec(n);
        n === e ? t._d = new Date : s ? t._d = new Date(+s[1]) : "string" == typeof n ? T(t) : c(n) ? (t._a = n.slice(0), w(t)) : t._d = n instanceof Date ? new Date(+n) : new Date(n)
    }

    function E(e, t, n, s, r) {
        return r.relativeTime(t || 1, !!n, e, s)
    }

    function C(e, t, n) {
        var s = j(Math.abs(e) / 1e3), r = j(s / 60), i = j(r / 60), a = j(i / 24), o = j(a / 365), u = 45 > s && ["s", s] || 1 === r && ["m"] || 45 > r && ["mm", r] || 1 === i && ["h"] || 22 > i && ["hh", i] || 1 === a && ["d"] || 25 >= a && ["dd", a] || 45 >= a && ["M"] || 345 > a && ["MM", j(a / 30)] || 1 === o && ["y"] || ["yy", o];
        return u[2] = t, u[3] = e > 0, u[4] = n, E.apply({}, u)
    }

    function S(e, t, n) {
        var s, r = n - t, i = n - e.day();
        return i > r && (i -= 7), r - 7 > i && (i += 7), s = z(e).add("d", i), {week: Math.ceil(s.dayOfYear() / 7), year: s.year()}
    }

    function I(e) {
        var t = e._i, n = e._f;
        return null === t || "" === t ? null : ("string" == typeof t && (e._i = t = f().preparse(t)), z.isMoment(t) ? (e = a({}, t), e._d = new Date(+t._d)) : n ? c(n) ? k(e) : x(e) : D(e), new r(e))
    }

    function M(e, t) {
        z.fn[e] = z.fn[e + "s"] = function (e) {
            var n = this._isUTC ? "UTC" : "";
            return null != e ? (this._d["set" + n + t](e), z.updateOffset(this), this) : this._d["get" + n + t]()
        }
    }

    function A(e) {
        z.duration.fn[e] = function () {
            return this._data[e]
        }
    }

    function N(e, t) {
        z.duration.fn["as" + e] = function () {
            return+this / t
        }
    }

    for (var z, P, L = "2.0.0", j = Math.round, O = {}, R = "undefined" != typeof module && module.exports, U = /^\/?Date\((\-?\d+)/i, F = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, H = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, V = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, B = /\d\d?/, Y = /\d{1,3}/, G = /\d{3}/, q = /\d{1,4}/, W = /[+\-]?\d{1,6}/, $ = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, K = /Z|[\+\-]\d\d:?\d\d/i, Q = /T/i, Z = /[\+\-]?\d+(\.\d{1,3})?/, J = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, X = "YYYY-MM-DDTHH:mm:ssZ", et = [
        ["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
        ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
        ["HH:mm", /(T| )\d\d:\d\d/],
        ["HH", /(T| )\d\d/]
    ], tt = /([\+\-]|\d\d)/gi, nt = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), st = {Milliseconds: 1, Seconds: 1e3, Minutes: 6e4, Hours: 36e5, Days: 864e5, Months: 2592e6, Years: 31536e6}, rt = {ms: "millisecond", s: "second", m: "minute", h: "hour", d: "day", w: "week", M: "month", y: "year"}, it = {}, at = "DDD w W M D d".split(" "), ot = "M D H h m s w W".split(" "), ut = {M: function () {
        return this.month() + 1
    }, MMM: function (e) {
        return this.lang().monthsShort(this, e)
    }, MMMM: function (e) {
        return this.lang().months(this, e)
    }, D: function () {
        return this.date()
    }, DDD: function () {
        return this.dayOfYear()
    }, d: function () {
        return this.day()
    }, dd: function (e) {
        return this.lang().weekdaysMin(this, e)
    }, ddd: function (e) {
        return this.lang().weekdaysShort(this, e)
    }, dddd: function (e) {
        return this.lang().weekdays(this, e)
    }, w: function () {
        return this.week()
    }, W: function () {
        return this.isoWeek()
    }, YY: function () {
        return u(this.year() % 100, 2)
    }, YYYY: function () {
        return u(this.year(), 4)
    }, YYYYY: function () {
        return u(this.year(), 5)
    }, gg: function () {
        return u(this.weekYear() % 100, 2)
    }, gggg: function () {
        return this.weekYear()
    }, ggggg: function () {
        return u(this.weekYear(), 5)
    }, GG: function () {
        return u(this.isoWeekYear() % 100, 2)
    }, GGGG: function () {
        return this.isoWeekYear()
    }, GGGGG: function () {
        return u(this.isoWeekYear(), 5)
    }, e: function () {
        return this.weekday()
    }, E: function () {
        return this.isoWeekday()
    }, a: function () {
        return this.lang().meridiem(this.hours(), this.minutes(), !0)
    }, A: function () {
        return this.lang().meridiem(this.hours(), this.minutes(), !1)
    }, H: function () {
        return this.hours()
    }, h: function () {
        return this.hours() % 12 || 12
    }, m: function () {
        return this.minutes()
    }, s: function () {
        return this.seconds()
    }, S: function () {
        return~~(this.milliseconds() / 100)
    }, SS: function () {
        return u(~~(this.milliseconds() / 10), 2)
    }, SSS: function () {
        return u(this.milliseconds(), 3)
    }, Z: function () {
        var e = -this.zone(), t = "+";
        return 0 > e && (e = -e, t = "-"), t + u(~~(e / 60), 2) + ":" + u(~~e % 60, 2)
    }, ZZ: function () {
        var e = -this.zone(), t = "+";
        return 0 > e && (e = -e, t = "-"), t + u(~~(10 * e / 6), 4)
    }, z: function () {
        return this.zoneAbbr()
    }, zz: function () {
        return this.zoneName()
    }, X: function () {
        return this.unix()
    }}; at.length;)P = at.pop(), ut[P + "o"] = n(ut[P], P);
    for (; ot.length;)P = ot.pop(), ut[P + P] = t(ut[P], 2);
    for (ut.DDDD = t(ut.DDD, 3), s.prototype = {set: function (e) {
        var t, n;
        for (n in e)t = e[n], "function" == typeof t ? this[n] = t : this["_" + n] = t
    }, _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), months: function (e) {
        return this._months[e.month()]
    }, _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), monthsShort: function (e) {
        return this._monthsShort[e.month()]
    }, monthsParse: function (e) {
        var t, n, s;
        for (this._monthsParse || (this._monthsParse = []), t = 0; 12 > t; t++)if (this._monthsParse[t] || (n = z([2e3, t]), s = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[t] = new RegExp(s.replace(".", ""), "i")), this._monthsParse[t].test(e))return t
    }, _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdays: function (e) {
        return this._weekdays[e.day()]
    }, _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysShort: function (e) {
        return this._weekdaysShort[e.day()]
    }, _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), weekdaysMin: function (e) {
        return this._weekdaysMin[e.day()]
    }, weekdaysParse: function (e) {
        var t, n, s;
        for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++)if (this._weekdaysParse[t] || (n = z([2e3, 1]).day(t), s = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[t] = new RegExp(s.replace(".", ""), "i")), this._weekdaysParse[t].test(e))return t
    }, _longDateFormat: {LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D YYYY", LLL: "MMMM D YYYY LT", LLLL: "dddd, MMMM D YYYY LT"}, longDateFormat: function (e) {
        var t = this._longDateFormat[e];
        return!t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (e) {
            return e.slice(1)
        }), this._longDateFormat[e] = t), t
    }, isPM: function (e) {
        return"p" === (e + "").toLowerCase()[0]
    }, _meridiemParse: /[ap]\.?m?\.?/i, meridiem: function (e, t, n) {
        return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
    }, _calendar: {sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L"}, calendar: function (e, t) {
        var n = this._calendar[e];
        return"function" == typeof n ? n.apply(t) : n
    }, _relativeTime: {future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years"}, relativeTime: function (e, t, n, s) {
        var r = this._relativeTime[n];
        return"function" == typeof r ? r(e, t, n, s) : r.replace(/%d/i, e)
    }, pastFuture: function (e, t) {
        var n = this._relativeTime[e > 0 ? "future" : "past"];
        return"function" == typeof n ? n(t) : n.replace(/%s/i, t)
    }, ordinal: function (e) {
        return this._ordinal.replace("%d", e)
    }, _ordinal: "%d", preparse: function (e) {
        return e
    }, postformat: function (e) {
        return e
    }, week: function (e) {
        return S(e, this._week.dow, this._week.doy).week
    }, _week: {dow: 0, doy: 6}}, z = function (e, t, n) {
        return I({_i: e, _f: t, _l: n, _isUTC: !1})
    }, z.utc = function (e, t, n) {
        return I({_useUTC: !0, _isUTC: !0, _l: n, _i: e, _f: t})
    }, z.unix = function (e) {
        return z(1e3 * e)
    }, z.duration = function (e, t) {
        var n, s, r = z.isDuration(e), a = "number" == typeof e, o = r ? e._data : a ? {} : e, u = F.exec(e);
        return a ? t ? o[t] = e : o.milliseconds = e : u && (n = "-" === u[1] ? -1 : 1, o = {y: 0, d: ~~u[2] * n, h: ~~u[3] * n, m: ~~u[4] * n, s: ~~u[5] * n, ms: ~~u[6] * n}), s = new i(o), r && e.hasOwnProperty("_lang") && (s._lang = e._lang), s
    }, z.version = L, z.defaultFormat = X, z.updateOffset = function () {
    }, z.lang = function (e, t) {
        return e ? (t ? d(e, t) : O[e] || f(e), z.duration.fn._lang = z.fn._lang = f(e), void 0) : z.fn._lang._abbr
    }, z.langData = function (e) {
        return e && e._lang && e._lang._abbr && (e = e._lang._abbr), f(e)
    }, z.isMoment = function (e) {
        return e instanceof r
    }, z.isDuration = function (e) {
        return e instanceof i
    }, z.fn = r.prototype = {clone: function () {
        return z(this)
    }, valueOf: function () {
        return+this._d + 6e4 * (this._offset || 0)
    }, unix: function () {
        return Math.floor(+this / 1e3)
    }, toString: function () {
        return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }, toDate: function () {
        return this._offset ? new Date(+this) : this._d
    }, toISOString: function () {
        return b(z(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }, toArray: function () {
        var e = this;
        return[e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds()]
    }, isValid: function () {
        return null == this._isValid && (this._isValid = this._a ? !h(this._a, (this._isUTC ? z.utc(this._a) : z(this._a)).toArray()) : !isNaN(this._d.getTime())), !!this._isValid
    }, utc: function () {
        return this.zone(0)
    }, local: function () {
        return this.zone(0), this._isUTC = !1, this
    }, format: function (e) {
        var t = b(this, e || z.defaultFormat);
        return this.lang().postformat(t)
    }, add: function (e, t) {
        var n;
        return n = "string" == typeof e ? z.duration(+t, e) : z.duration(e, t), l(this, n, 1), this
    }, subtract: function (e, t) {
        var n;
        return n = "string" == typeof e ? z.duration(+t, e) : z.duration(e, t), l(this, n, -1), this
    }, diff: function (e, t, n) {
        var s, r, i = this._isUTC ? z(e).zone(this._offset || 0) : z(e).local(), a = 6e4 * (this.zone() - i.zone());
        return t = p(t), "year" === t || "month" === t ? (s = 432e5 * (this.daysInMonth() + i.daysInMonth()), r = 12 * (this.year() - i.year()) + (this.month() - i.month()), r += (this - z(this).startOf("month") - (i - z(i).startOf("month"))) / s, "year" === t && (r /= 12)) : (s = this - i - a, r = "second" === t ? s / 1e3 : "minute" === t ? s / 6e4 : "hour" === t ? s / 36e5 : "day" === t ? s / 864e5 : "week" === t ? s / 6048e5 : s), n ? r : o(r)
    }, from: function (e, t) {
        return z.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t)
    }, fromNow: function (e) {
        return this.from(z(), e)
    }, calendar: function () {
        var e = this.diff(z().startOf("day"), "days", !0), t = -6 > e ? "sameElse" : -1 > e ? "lastWeek" : 0 > e ? "lastDay" : 1 > e ? "sameDay" : 2 > e ? "nextDay" : 7 > e ? "nextWeek" : "sameElse";
        return this.format(this.lang().calendar(t, this))
    }, isLeapYear: function () {
        var e = this.year();
        return 0 === e % 4 && 0 !== e % 100 || 0 === e % 400
    }, isDST: function () {
        return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
    }, day: function (e) {
        var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e ? "string" == typeof e && (e = this.lang().weekdaysParse(e), "number" != typeof e) ? this : this.add({d: e - t}) : t
    }, month: function (e) {
        var t = this._isUTC ? "UTC" : "";
        return null != e ? "string" == typeof e && (e = this.lang().monthsParse(e), "number" != typeof e) ? this : (this._d["set" + t + "Month"](e), z.updateOffset(this), this) : this._d["get" + t + "Month"]()
    }, startOf: function (e) {
        switch (e = p(e)) {
            case"year":
                this.month(0);
            case"month":
                this.date(1);
            case"week":
            case"day":
                this.hours(0);
            case"hour":
                this.minutes(0);
            case"minute":
                this.seconds(0);
            case"second":
                this.milliseconds(0)
        }
        return"week" === e && this.weekday(0), this
    }, endOf: function (e) {
        return this.startOf(e).add(e, 1).subtract("ms", 1)
    }, isAfter: function (e, t) {
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) > +z(e).startOf(t)
    }, isBefore: function (e, t) {
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) < +z(e).startOf(t)
    }, isSame: function (e, t) {
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) === +z(e).startOf(t)
    }, min: function (e) {
        return e = z.apply(null, arguments), this > e ? this : e
    }, max: function (e) {
        return e = z.apply(null, arguments), e > this ? this : e
    }, zone: function (e) {
        var t = this._offset || 0;
        return null == e ? this._isUTC ? t : this._d.getTimezoneOffset() : ("string" == typeof e && (e = y(e)), 16 > Math.abs(e) && (e = 60 * e), this._offset = e, this._isUTC = !0, t !== e && l(this, z.duration(t - e, "m"), 1, !0), this)
    }, zoneAbbr: function () {
        return this._isUTC ? "UTC" : ""
    }, zoneName: function () {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }, daysInMonth: function () {
        return z.utc([this.year(), this.month() + 1, 0]).date()
    }, dayOfYear: function (e) {
        var t = j((z(this).startOf("day") - z(this).startOf("year")) / 864e5) + 1;
        return null == e ? t : this.add("d", e - t)
    }, weekYear: function (e) {
        var t = S(this, this.lang()._week.dow, this.lang()._week.doy).year;
        return null == e ? t : this.add("y", e - t)
    }, isoWeekYear: function (e) {
        var t = S(this, 1, 4).year;
        return null == e ? t : this.add("y", e - t)
    }, week: function (e) {
        var t = this.lang().week(this);
        return null == e ? t : this.add("d", 7 * (e - t))
    }, isoWeek: function (e) {
        var t = S(this, 1, 4).week;
        return null == e ? t : this.add("d", 7 * (e - t))
    }, weekday: function (e) {
        var t = (this._d.getDay() + 7 - this.lang()._week.dow) % 7;
        return null == e ? t : this.add("d", e - t)
    }, isoWeekday: function (e) {
        var t = (this._d.getDay() + 6) % 7;
        return null == e ? t : this.add("d", e - t)
    }, lang: function (t) {
        return t === e ? this._lang : (this._lang = f(t), this)
    }}, P = 0; nt.length > P; P++)M(nt[P].toLowerCase().replace(/s$/, ""), nt[P]);
    M("year", "FullYear"), z.fn.days = z.fn.day, z.fn.months = z.fn.month, z.fn.weeks = z.fn.week, z.fn.isoWeeks = z.fn.isoWeek, z.fn.toJSON = z.fn.toISOString, z.duration.fn = i.prototype = {weeks: function () {
        return o(this.days() / 7)
    }, valueOf: function () {
        return this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * ~~(this._months / 12)
    }, humanize: function (e) {
        var t = +this, n = C(t, !e, this.lang());
        return e && (n = this.lang().pastFuture(t, n)), this.lang().postformat(n)
    }, add: function (e, t) {
        var n = z.duration(e, t);
        return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, this
    }, subtract: function (e, t) {
        var n = z.duration(e, t);
        return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, this
    }, get: function (e) {
        return e = p(e), this[e.toLowerCase() + "s"]()
    }, as: function (e) {
        return e = p(e), this["as" + e.charAt(0).toUpperCase() + e.slice(1) + "s"]()
    }, lang: z.fn.lang};
    for (P in st)st.hasOwnProperty(P) && (N(P, st[P]), A(P.toLowerCase()));
    N("Weeks", 6048e5), z.duration.fn.asMonths = function () {
        return(+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, z.lang("en", {ordinal: function (e) {
        var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
        return e + n
    }}), R && (module.exports = z), "undefined" == typeof ender && (this.moment = z), "function" == typeof define && define.amd && define("moment", [], function () {
        return z
    })
}.call(this), moment.fn.shortDateNoYear = function () {
    return this.format("D MMM")
}, moment.fn.shortDate = function () {
    return this.format("D MMM, YYYY")
}, moment.fn.longDate = function () {
    return this.format("MMMM D, YYYY h:mma")
}, moment.fn.relativeAge = function (e) {
    return Discourse.Formatter.relativeAge(this.toDate(), e)
};