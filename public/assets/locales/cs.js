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
    var n, t = t || {}, s = e, r = this.prepareOptions(I18n.translations), a = t.locale || I18n.currentLocale(), i = r[a] || {}, t = this.prepareOptions(t);
    for ("object" == typeof e && (e = e.join(this.defaultSeparator)), t.scope && (e = t.scope.toString() + this.defaultSeparator + e), e = e.split(this.defaultSeparator); i && e.length > 0;)n = e.shift(), i = i[n];
    if (!i) {
        if (I18n.fallbacks)for (var o = this.getFallbacks(a), u = 0; o.length > u && !(i = I18n.lookup(s, this.prepareOptions({locale: o[u]}, t))); o++);
        !i && this.isValidNode(t, "defaultValue") && (i = t.defaultValue)
    }
    return i
}, I18n.prepareOptions = function () {
    for (var e, t = {}, n = arguments.length, s = 0; n > s; s++)if (e = arguments[s])for (var r in e)this.isValidNode(t, r) || (t[r] = e[r]);
    return t
}, I18n.interpolate = function (e, t) {
    t = this.prepareOptions(t);
    var n, s, r, a = e.match(this.PLACEHOLDER);
    if (!a)return e;
    for (var i = 0; n = a[i]; i++)r = n.replace(this.PLACEHOLDER, "$1"), s = t[r], this.isValidNode(t, r) || (s = "[missing " + n + " value]"), regex = new RegExp(n.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}")), e = e.replace(regex, s);
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
    var s = e.getDay(), r = e.getDate(), a = e.getFullYear(), i = e.getMonth() + 1, o = e.getHours(), u = o, l = o > 11 ? 1 : 0, c = e.getSeconds(), h = e.getMinutes(), p = e.getTimezoneOffset(), f = Math.floor(Math.abs(p / 60)), d = Math.abs(p) - 60 * f, m = (p > 0 ? "-" : "+") + (2 > f.toString().length ? "0" + f : f) + (2 > d.toString().length ? "0" + d : d);
    u > 12 ? u -= 12 : 0 === u && (u = 12);
    var g = function (e) {
        var t = "0" + e.toString();
        return t.substr(t.length - 2)
    }, b = t;
    return b = b.replace("%a", n.abbr_day_names[s]), b = b.replace("%A", n.day_names[s]), b = b.replace("%b", n.abbr_month_names[i]), b = b.replace("%B", n.month_names[i]), b = b.replace("%d", g(r)), b = b.replace("%e", r), b = b.replace("%-d", r), b = b.replace("%H", g(o)), b = b.replace("%-H", o), b = b.replace("%I", g(u)), b = b.replace("%-I", u), b = b.replace("%m", g(i)), b = b.replace("%-m", i), b = b.replace("%M", g(h)), b = b.replace("%-M", h), b = b.replace("%p", n.meridian[l]), b = b.replace("%S", g(c)), b = b.replace("%-S", c), b = b.replace("%w", s), b = b.replace("%y", g(a)), b = b.replace("%-y", g(a).replace(/^0+/, "")), b = b.replace("%Y", a), b = b.replace("%z", m)
}, I18n.toNumber = function (e, t) {
    t = this.prepareOptions(t, this.lookup("number.format"), {precision: 3, separator: ".", delimiter: ",", strip_insignificant_zeros: !1});
    var n, s, r = 0 > e, a = Math.abs(e).toFixed(t.precision).toString(), i = a.split("."), o = [];
    for (e = i[0], n = i[1]; e.length > 0;)o.unshift(e.substr(Math.max(0, e.length - 3), 3)), e = e.substr(0, e.length - 3);
    if (s = o.join(t.delimiter), t.precision > 0 && (s += t.separator + i[1]), r && (s = "-" + s), t.strip_insignificant_zeros) {
        var u = {separator: new RegExp(t.separator.replace(/\./, "\\.") + "$"), zeros: /0+$/};
        s = s.replace(u.zeros, "").replace(u.separator, "")
    }
    return s
}, I18n.toCurrency = function (e, t) {
    return t = this.prepareOptions(t, this.lookup("number.currency.format"), this.lookup("number.format"), {unit: "$", precision: 2, format: "%u%n", delimiter: ",", separator: "."}), e = this.toNumber(e, t), e = t.format.replace("%u", t.unit).replace("%n", e)
}, I18n.toHumanSize = function (e, t) {
    for (var n, s, r = 1024, a = e, i = 0; a >= r && 4 > i;)a /= r, i += 1;
    return 0 === i ? (n = this.t("number.human.storage_units.units.byte", {count: a}), s = 0) : (n = this.t("number.human.storage_units.units." + [null, "kb", "mb", "gb", "tb"][i]), s = 0 === a - Math.floor(a) ? 0 : 1), t = this.prepareOptions(t, {precision: s, format: "%n%u", delimiter: ""}), e = this.toNumber(a, t), e = t.format.replace("%u", n).replace("%n", e)
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
    var a;
    return n = this.prepareOptions(n), n.count = e.toString(), pluralizer = this.pluralizer(this.currentLocale()), key = pluralizer(Math.abs(e)), keys = "object" == typeof key && key instanceof Array ? key : [key], a = this.findAndTranslateValidNode(keys, s), null == a && (a = this.missingTranslation(t, keys[0])), this.interpolate(a, n)
}, I18n.missingTranslation = function () {
    for (var e = '[missing "' + this.currentLocale(), t = arguments.length, n = 0; t > n; n++)e += "." + arguments[n];
    return e += '" translation]'
}, I18n.currentLocale = function () {
    return I18n.locale || I18n.defaultLocale
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, MessageFormat = {locale: {}}, MessageFormat.locale.cs = function (e) {
    return 1 == e ? "one" : 2 == e || 3 == e || 4 == e ? "few" : "other"
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
}({"topic.read_more_MF": function (e) {
    var t = "";
    if (!e)throw new Error("MessageFormat: No data passed to function.");
    var n = "UNREAD", s = e[n], r = 0, a = {0: function () {
        var e = "";
        return e
    }, one: function () {
        var e = "";
        return e += "Je tu <a href='/unread'>1 nepřečtené</a> "
    }, few: function () {
        var e = "";
        return e += "Jsou tu <a href='/unread'>" + function () {
            var e = s - r;
            if (isNaN(e))throw new Error("MessageFormat: `" + n + "` isnt a number.");
            return e
        }() + " nepřečtená</a> "
    }, other: function () {
        var e = "";
        return e += "Je tu <a href='/unread'>" + function () {
            var e = s - r;
            if (isNaN(e))throw new Error("MessageFormat: `" + n + "` isnt a number.");
            return e
        }() + " nepřečtených</a> "
    }};
    if (t += a[s + ""] ? a[s + ""](e) : (a[MessageFormat.locale.cs(s - r)] || a.other)(e), t += " ", !e)throw new Error("MessageFormat: No data passed to function.");
    var n = "NEW", s = e[n], r = 0, a = {0: function () {
        var e = "";
        return e
    }, one: function (e) {
        var t = "";
        if (!e)throw new Error("MessageFormat: No data passed to function.");
        var n = "BOTH", s = e[n], r = {"true": function () {
            var e = "";
            return e += "a "
        }, "false": function () {
            var e = "";
            return e += "Je tu "
        }, other: function () {
            var e = "";
            return e
        }};
        return t += (r[s] || r.other)(e), t += " <a href='/new'>1 nové</a> téma"
    }, few: function (e) {
        var t = "";
        if (!e)throw new Error("MessageFormat: No data passed to function.");
        var a = "BOTH", i = e[a], o = {"true": function () {
            var e = "";
            return e += "a "
        }, "false": function () {
            var e = "";
            return e += "Jsou tu "
        }, other: function () {
            var e = "";
            return e
        }};
        return t += (o[i] || o.other)(e), t += " <a href='/new'>" + function () {
            var e = s - r;
            if (isNaN(e))throw new Error("MessageFormat: `" + n + "` isnt a number.");
            return e
        }() + " nová</a> témata"
    }, other: function (e) {
        var t = "";
        if (!e)throw new Error("MessageFormat: No data passed to function.");
        var a = "BOTH", i = e[a], o = {"true": function () {
            var e = "";
            return e += "a "
        }, "false": function () {
            var e = "";
            return e += "Je tu "
        }, other: function () {
            var e = "";
            return e
        }};
        return t += (o[i] || o.other)(e), t += " <a href='/new'>" + function () {
            var e = s - r;
            if (isNaN(e))throw new Error("MessageFormat: `" + n + "` isnt a number.");
            return e
        }() + " nových</a> témat"
    }};
    if (t += a[s + ""] ? a[s + ""](e) : (a[MessageFormat.locale.cs(s - r)] || a.other)(e), t += ", nebo ", !e)throw new Error("MessageFormat: No data passed to function.");
    var n = "CATEGORY", s = e[n], r = 0, a = {"true": function (e) {
        var t = "";
        if (t += "si projděte ostatní témata v kategorii ", !e)throw new Error("MessageFormat: No data passed to function.");
        return t += e.catLink
    }, "false": function (e) {
        var t = "";
        if (!e)throw new Error("MessageFormat: No data passed to function.");
        return t += e.latestLink
    }, other: function () {
        var e = "";
        return e
    }};
    return t += (a[s] || a.other)(e), t += " "
}}), I18n.translations = {cs: {js: {dates: {tiny: {half_a_minute: "< 1m", less_than_x_seconds: {one: "< 1s", few: "< %{count}s", other: "< %{count}s"}, x_seconds: {one: "1s", few: "%{count}s", other: "%{count}s"}, less_than_x_minutes: {one: "< 1m", few: "< %{count}m", other: "< %{count}m"}, x_minutes: {one: "1m", few: "%{count}m", other: "%{count}m"}, about_x_hours: {one: "1h", few: "%{count}h", other: "%{count}h"}, x_days: {one: "1d", few: "%{count}d", other: "%{count}d"}, about_x_months: {one: "1měs", few: "%{count}měs", other: "%{count}měs"}, x_months: {one: "1měs", few: "%{count}měs", other: "%{count}měs"}, about_x_years: {one: "1r", few: "%{count}r", other: "%{count}let"}, over_x_years: {one: "> 1r", few: "> %{count}r", other: "> %{count}let"}, almost_x_years: {one: "1r", few: "%{count}r", other: "%{count}let"}}, medium: {x_minutes: {one: "1 minuta", few: "%{count} minuty", other: "%{count} minut"}, x_hours: {one: "1 hodina", few: "%{count} hodiny", other: "%{count} hodin"}, x_days: {one: "1 den", few: "%{count} dny", other: "%{count} dní"}}, medium_with_ago: {x_minutes: {one: "před 1 minutou", few: "před %{count} minutami", other: "před %{count} minutami"}, x_hours: {one: "před 1 hodinou", few: "před %{count} hodinami", other: "před %{count} hodinami"}, x_days: {one: "před 1 dnem", few: "před %{count} dny", other: "před %{count} dny"}}}, share: {topic: "sdílet odkaz na toto téma", post: "sdílet odkaz na tento příspěvek", close: "zavřít", twitter: "sdílet odkaz na Twitteru", facebook: "sdílet odkaz na Facebooku", "google+": "sdílet odkaz na Google+", email: "odeslat odkaz emailem"}, edit: "upravit název a kategorii příspěvku", not_implemented: "Tato fičura ještě není implementovaná", no_value: "Ne", yes_value: "Ano", of_value: "z", generic_error: "Bohužel nastala chyba.", log_in: "Přihlásit se", age: "Věk", last_post: "Poslední příspěvek", admin_title: "Administrátor", flags_title: "Nahlášení", show_more: "zobrazit více", links: "Odkazy", faq: "FAQ", you: "Vy", or: "nebo", now: "právě teď", read_more: "číst dále", in_n_seconds: {one: "za 1 sekundu", few: "za {{count}} sekundy", other: "za {{count}} sekund"}, in_n_minutes: {one: "za 1 minutu", few: "za {{count}} minuty", other: "za {{count}} minut"}, in_n_hours: {one: "za 1 hodinu", few: "za {{count}} hodiny", other: "za {{count}} hodin"}, in_n_days: {one: "za 1 den", few: "za {{count}} dny", other: "za {{count}} dní"}, suggested_topics: {title: "Doporučená témata"}, bookmarks: {not_logged_in: "Pro přidání záložky se musíte přihlásit.", created: "Záložka byla přidána.", not_bookmarked: "Tento příspěvek jste již četli. Klikněte pro přidání záložky.", last_read: "Tohle je poslední již přečtený příspěvek."}, new_topics_inserted: "{{count}} nových témat.", show_new_topics: "Klikněte pro zobrazení.", preview: "náhled", cancel: "zrušit", save: "Uložit změny", saving: "Ukládám...", saved: "Uloženo!", choose_topic: {none_found: "Žádná témata nenalezena.", title: {search: "Hledat téma podle názvu, URL nebo ID:", placeholder: "sem napište název tématu"}}, user_action: {user_posted_topic: "<a href='{{userUrl}}'>{{user}}</a> zaslal <a href='{{topicUrl}}'>téma</a>", you_posted_topic: "<a href='{{userUrl}}'>Vy</a> jste zaslal <a href='{{topicUrl}}'>téma</a>", user_replied_to_post: "<a href='{{userUrl}}'>{{user}}</a> odpověděl na příspěvek <a href='{{postUrl}}'>{{post_number}}</a>", you_replied_to_post: "<a href='{{userUrl}}'>Vy</a> jste odpověděl na příspěvek <a href='{{postUrl}}'>{{post_number}}</a>", user_replied_to_topic: "<a href='{{userUrl}}'>{{user}}</a> přispěl do <a href='{{topicUrl}}'>tématu</a>", you_replied_to_topic: "<a href='{{userUrl}}'>Vy</a> jste přispěl do <a href='{{topicUrl}}'>tématu</a>", user_mentioned_user: "<a href='{{user1Url}}'>{{user}}</a> zmínil uživatele <a href='{{user2Url}}'>{{another_user}}</a>", user_mentioned_you: "<a href='{{user1Url}}'>{{user}}</a> zmínil <a href='{{user2Url}}'>vás</a>", you_mentioned_user: "<a href='{{user1Url}}'>Vy</a> jste znínil uživatele <a href='{{user2Url}}'>{{user}}</a>", posted_by_user: "Odesláno uživatel <a href='{{userUrl}}'>{{user}}</a>", posted_by_you: "Odesláno <a href='{{userUrl}}'>vámi</a>", sent_by_user: "Posláno uživatelem <a href='{{userUrl}}'>{{user}}</a>", sent_by_you: "Posláno <a href='{{userUrl}}'>vámi</a>"}, user_action_groups: {1: "Rozdaných 'líbí se'", 2: "Obdržených 'líbí se'", 3: "Záložky", 4: "Témata", 5: "Odpovědi", 6: "Odezvy ostatních", 7: "Zmíňky", 9: "Citace", 10: "Oblíbené", 11: "Editace", 12: "Odeslané zprávy", 13: "Přijaté zprávy"}, user: {profile: "Profil", title: "Uživatel", mute: "Ignorovat", edit: "Upravit nastavení", download_archive: "stáhnout archiv mých příspěvků", private_message: "Soukromá zpráva", private_messages: "Zprávy", activity_stream: "Aktivita", preferences: "Nastavení", bio: "O mně", invited_by: "Poznánka od", trust_level: "Věrohodnost", external_links_in_new_tab: "Otevírat všechny externí odkazy do nové záložky", enable_quoting: "Povolit odpověď s citací z označeného textu", moderator: "{{user}} je moderátor", admin: "{{user}} je administrátor", change_password: {action: "změnit", success: "(email odeslán)", in_progress: "(odesílám)", error: "(chyba)"}, change_username: {action: "změnit uživatelské jméno", title: "Změnit uživatelské jméno", confirm: "Změna uživatelského jména může mít vážné následky. Opravdu to chcete udělat?", taken: "Toto uživatelské jméno je již zabrané.", error: "Nastala chyba při změně uživatelského jména.", invalid: "Uživatelské jméno je neplatné. Musí obsahovat pouze písmena a číslice."}, change_email: {action: "změnit emailovou adresu", title: "Změnit emailovou adresu", taken: "Tato emailová adresa není k dispozici.", error: "Nastala chyba při změně emailové adresy. Není tato adresa již používaná?", success: "Na zadanou adresu jsme zaslali email. Následujte, prosím, instrukce v tomto emailu."}, email: {title: "Emailová adresa", instructions: "Vaše emailová adresa nikdy nebude veřejně zobrazena.", ok: "To vypadá dobře. Zašleme vám email s potvrzením.", invalid: "Prosím zadejte platnou emailovou adresu.", authenticated: "Vaše emailová adresa byla autorizována přes službu {{provider}}.", frequency: "Budeme vás informovat emailem pouze pokud jste se na našem webu dlouho neukázali a pokud jste obsah, o kterém vás chceme informovat, doposud neviděli."}, name: {title: "Jméno", instructions: "Delší verze vašeho jména. Nemusí být unikátní.", too_short: "Vaše jméno je příliš krátké.", ok: "Vaše jméno vypadá dobře"}, username: {title: "Uživatelské jméno", instructions: "Musí být unikátní a bez mezer. Ostatní vás mohou zmínit jako @username.", short_instructions: "Ostatní vás mohou zmínit jako @{{username}}.", available: "Toto uživatelské jméno je volné.", global_match: "Emailová adresa odpovídá registrovaného uživatelskému jménu.", global_mismatch: "již zaregistrováno. Co třeba {{suggestion}}?", not_available: "Není k dispozici. Co třeba {{suggestion}}?", too_short: "Vaše uživatelské jméno je příliš krátké.", too_long: "Vaše uživatelské jméno je příliš dlouhé.", checking: "Zjišťuji, zda je uživatelské jméno volné...", enter_email: "Uživatelské jméno nalezeno. Zadejte odpovídající emailovou adresu."}, password_confirmation: {title: "Heslo znovu"}, last_posted: "Poslední příspěvek", last_emailed: "Naposledy zaslán email", last_seen: "Naposledy viděn", created: "Účet vytvořen", log_out: "Odhlásit", website: "Web", email_settings: "Emailová adresa", email_digests: {title: "Chci dostávat emailem souhrn novinek", daily: "denně", weekly: "týdně", bi_weekly: "jednou za 14 dní"}, email_direct: "Chci dostat email když někdo bude mluvit přímo se mnou", email_private_messages: "Chci dostat email když mi někdo zašle soukromou zprávu", other_settings: "Ostatní", new_topic_duration: {label: "Považovat témata za nová, pokud", not_viewed: "dosud jsem je neviděl", last_here: "byly zaslány od mé poslední návštěvy", after_n_days: {one: "byly zaslány v posledním dni", few: "byly zaslány v posledních {{count}} dnech", other: "byly zaslány v posledních {{count}} dnech"}, after_n_weeks: {one: "byly zaslány v posledním týdnu", few: "byly zaslány v posledních {{count}} týdnech", other: "byly zaslány v posledních {{count}} týdnech"}}, auto_track_topics: "Automaticky sledovat témata, která navštívím", auto_track_options: {never: "nikdy", always: "vždy", after_n_seconds: {one: "po 1 vteřině", few: "po {{count}} vteřinách", other: "po {{count}} vteřinách"}, after_n_minutes: {one: "po 1 minutě", few: "po {{count}} minutách", other: "po {{count}} minutách"}}, invited: {title: "Pozvánky", user: "Pozvaný uživatel", none: "{{username}} nepozval na tento web žádné uživatele.", redeemed: "Uplatněné pozvánky", redeemed_at: "Uplatněno", pending: "Nevyřízené pozvánky", topics_entered: "Zobrazeno témat", posts_read_count: "Přečteno příspěvků", rescind: "Odstranit pozvánku", rescinded: "Pozvánka odstraněna", time_read: "Čas čtení", days_visited: "Přítomen dnů", account_age_days: "Stáří účtu ve dnech"}, password: {title: "Heslo", too_short: "Vaše heslo je příliš krátké.", ok: "Vaše heslo je v pořádku."}, ip_address: {title: "Poslední IP adresa"}, avatar: {title: "Avatar", instructions: "Používáme službu <a href='https://gravatar.com' target='_blank'>Gravatar</a> pro zobrazení avataru podle vaší emailové adresy"}, filters: {all: "Vše"}, stream: {posted_by: "Zaslal", sent_by: "Odeslal", private_message: "soukromá zpráva", the_topic: "téma"}}, loading: "Načítám...", close: "Zavřít", learn_more: "více informací...", year: "rok", year_desc: "témata za posledních 365 dní", month: "měsíc", month_desc: "témata za posledních 30 dní", week: "týden", week_desc: "témata za posledních 7 dní", first_post: "První příspěvek", mute: "Ignorovat", unmute: "Zrušit ignorování", best_of: {title: "Nejlepší příspěvky", enabled_description: 'Právě máte zobrazeny "nejlepší příspěvky" tohoto tématu.', description: "V tomto tématu je <b>{{count}}</b> příspěvků. A to už je hodně! Nechcete ušetřit čas při čtení tím, že zobrazíte pouze příspěvky, které mají nejvíce interakcí a odpovědí?", enable: 'Přepnout na "nejlepší příspěvky"', disable: "Přepnout na normální zobrazení"}, private_message_info: {title: "Soukromé konverzace", invite: "pozvat účastníka"}, email: "Emailová adresa", username: "Uživatelské jméno", last_seen: "Naposledy viděn", created: "Účet vytvořen", trust_level: "Věrohodnost", create_account: {title: "Vytvořit účet", action: "Vytvořit!", invite: "Nemáte ještě účet?", failed: "Něco se nepovedlo, možná je tato e-mailová adresa již použita. Zkuste použít formulář pro obnovení hesla."}, forgot_password: {title: "Zapomenuté heslo", action: "Zapomněl jsem své heslo", invite: "Vložte svoje uživatelské jméno nebo e-mailovou adresu a my vám zašleme postup pro obnovení hesla.", reset: "Obnovit heslo", complete: "Měli byste obdržet email s instrukcemi jak obnovit vaše heslo."}, login: {title: "Přihlásit se", username: "Login", password: "Heslo", email_placeholder: "emailová adresa nebo uživatelské jméno", error: "Neznámá chyba", reset_password: "Resetovat heslo", logging_in: "Přihlašuji...", or: "Nebo", authenticating: "Autorizuji...", awaiting_confirmation: "Váš účet nyní čeká na aktivaci, použijte odkaz pro zapomené heslo, jestli chcete, abychom vám zaslali další aktivační email.", awaiting_approval: "Váš účet zatím nebyl schválen moderátorem. Až se tak stane, budeme vás informovat emailem.", not_activated: "Ještě se nemůžete přihlásit. Zaslali jsme vám aktivační email v <b>{{sentTo}}</b>. Prosím následujte instrukce v tomto emailu, abychom mohli váš účet aktivovat.", resend_activation_email: "Klikněte sem pro zaslání aktivačního emailu.", sent_activation_email_again: "Zaslali jsme vám další aktivační email na <b>{{currentEmail}}</b>. Může trvat několik minut, než vám dorazí. Zkontrolujte také vaši složku s nevyžádanou pošlou.", google: {title: "přes Google", message: "Autorizuji přes Google (ujistěte se, že nemáte zablokovaná popup okna)"}, twitter: {title: "přes Twitter", message: "Autorizuji přes Twitter (ujistěte se, že nemáte zablokovaná popup okna)"}, facebook: {title: "přes Facebook", message: "Autorizuji přes Facebook (ujistěte se, že nemáte zablokovaná popup okna)"}, cas: {title: "Přihlásit přes CAS", message: "Autorizuji přes CAS (ujistěte se, že nemáte zablokovaná popup okna)"}, yahoo: {title: "přes Yahoo", message: "Autorizuji přes Yahoo (ujistěte se, že nemáte zablokovaná popup okna)"}, github: {title: "přes GitHub", message: "Autorizuji přes GitHub (ujistěte se, že nemáte zablokovaná popup okna)"}, persona: {title: "přes Persona", message: "Autorizuji přes Mozilla Persona (ujistěte se, že nemáte zablokovaná popup okna)"}}, composer: {posting_not_on_topic: 'Rozepsali jste odpověď na téma "{{title}}", ale nyní máte otevřené jiné téma.', saving_draft_tip: "ukládám", saved_draft_tip: "uloženo", saved_local_draft_tip: "uloženo lokálně", similar_topics: "Podobná témata", drafts_offline: "koncepty offline", min_length: {need_more_for_title: "ještě {{n}} znaků nadpisu tématu", need_more_for_reply: "ještě {{n}} znaků textu odpovědi"}, error: {title_missing: "Název musí být vyplněn.", title_too_short: "Název musí být alespoň {{min}} znaků dlouhý.", title_too_long: "Název musí být dlouhý maximálně {{min}} znaků.", post_missing: "Příspěvek nesmí být prázdný.", post_length: "Příspěvek musí být alespoň {{min}} znaků dlouhý.", category_missing: "Musíte vybrat kategorii."}, save_edit: "Uložit změnu", reply_original: "Odpovědět na původní téma", reply_here: "Odpovědět sem", reply: "Odpovědět", cancel: "Zrušit", create_topic: "Vytvořit téma", create_pm: "Vytvořit soukromou zprávu", users_placeholder: "Přidat uživatele", title_placeholder: "Sem napište název. O čem je tato diskuze v jedné krátké větě", reply_placeholder: "Sem napište svou odpověď. Pro formátování použijte Markdown nebo BBCode. Můžete sem přetáhnout nebo vložit obrázek a bude vložen do příspěvku.", view_new_post: "Zobrazit váš nový příspěvek.", saving: "Ukládám...", saved: "Uloženo!", saved_draft: "Máte rozepsaný příspěvek. Klikněte sem pro pokračování v úpravách.", uploading: "Nahrávám...", show_preview: "zobrazit náhled &raquo;", hide_preview: "&laquo; skrýt náhled", quote_post_title: "Citovat celý příspěvek", bold_title: "Tučně", bold_text: "tučný text", italic_title: "Kurzíva", italic_text: "text kurzívou", link_title: "Odkazy", link_description: "sem vložte popis odkazu", link_dialog_title: "Vložit odkaz", link_optional_text: "volitelný popis", quote_title: "Bloková citace", quote_text: "Bloková citace", code_title: "Ukázka kódu", code_text: "sem vložte kód", image_title: "Obrázek", image_description: "sem vložek popis obrázku", image_dialog_title: "Vložit obrázek", image_optional_text: "volitelný popis", image_hosting_hint: "Potřebujete <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>hosting obrázků zdarma?</a>", olist_title: "Číslovaný seznam", ulist_title: "Odrážkový seznam", list_item: "Položka seznam", heading_title: "Nadpis", heading_text: "Nadpis", hr_title: "Horizontální oddělovač", undo_title: "Zpět", redo_title: "Opakovat", help: "Nápověda pro Markdown", toggler: "zobrazit nebo skrýt editor příspěvku", admin_options_title: "Volitelné administrační nastavení tématu", auto_close_label: "Automaticky zavřít téma za:", auto_close_units: "dní"}, notifications: {title: "oznámení o zmínkách pomocí @name, odpovědi na vaše příspěvky a témata, soukromé zprávy, atd.", none: "V tuto chvíli nemáte žádná oznámení.", more: "zobrazit starší oznámení", mentioned: "<span title='mentioned' class='icon'>@</span> {{username}} {{link}}", quoted: "<i title='quoted' class='icon icon-quote-right'></i> {{username}} {{link}}", replied: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", posted: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", edited: "<i title='edited' class='icon icon-pencil'></i> {{username}} {{link}}", liked: "<i title='liked' class='icon icon-heart'></i> {{username}} {{link}}", private_message: "<i class='icon icon-envelope-alt' title='soukromá zpráva'></i> {{username}} vám zaslal soukromou zprávu: {{link}}", invited_to_private_message: "{{username}} vás pozval do soukromé konverzace: {{link}}", invitee_accepted: "<i title='přijetí pozvánky' class='icon icon-signin'></i> {{username}} přijal vaši pozvánku", moved_post: "<i title='přesunutý příspěvek' class='icon icon-arrow-right'></i> {{username}} přesunul příspěvek do {{link}}", total_flagged: "celkem nahlášeno příspěvků"}, image_selector: {title: "Vložit obrázek", from_my_computer: "Z mého zařízení", from_the_web: "Z webu", add_image: "Přidat obrázek", remote_title: "obrázek ze vzdáleného úložistě", remote_tip: "zadejte adresu obrázku ve formátu http://example.com/image.jpg", local_title: "obrázek z lokálního úložiště", local_tip: "klikněte sem pro výběr obrázku z vašeho zařízení", upload: "Nahrát", uploading_image: "Nahrávám obrázek"}, search: {title: "hledání témat, příspěvků, uživatelů a kategorií", placeholder: "sem zadejte hledaný výraz", no_results: "Nenalezeny žádné výsledky.", searching: "Hledám ...", prefer: {user: "při hledání budou preferovány výsledky od @{{username}}", category: "při hledání budou preferovány výsledky z kategorie {{category}}"}}, site_map: "jít na jiný seznam témat nebo kategorii", go_back: "jít zpět", current_user: "jít na vaši uživatelskou stránku", favorite: {title: "Oblíbené", help: {star: "přidat toto téma do oblíbených", unstar: "odebrat toto téma z oblíbených"}}, topics: {none: {favorited: "Zatím nemáte žádná oblíbená témata. Pro přidání tématu do oblíbených, klikněte na hvězdičku vedle názvu tématu.", unread: "Nemáte žádná nepřečtená témata.", "new": "Nemáte žádná nová témata ke čtení.", read: "Zatím jste nečetli žádná témata.", posted: "Zatím jste nepřispěli do žádného tématu.", latest: "Nejsou tu žádná témata z poslední doby. To je docela smutné.", hot: "Nejsou tu žádná populární témata.", category: "V kategorii {{category}} nejsou žádná témata."}, bottom: {latest: "Nejsou tu žádná další témata z poslední doby k přečtení.", hot: "Nejsou tu žádná další populární témata k přečtení.", posted: "Nejsou tu žádná další zaslaná témata k přečtení.", read: "Nejsou tu žádná další přečtená témata.", "new": "Nejsou tu žádná další nová témata k přečtení.", unread: "Nejsou tu žádná další nepřečtená témata.", favorited: "Nejsou tu žádná další oblíbená témata k přečtení.", category: "V kategorii {{category}} nejsou žádná další témata."}}, rank_details: {toggle: "zobrazit/skrýt detaily bodování", show: "zobrazit detaily bodování tématu", title: "Detaily bodování tématu"}, topic: {create_in: "Nové téma v kategorii {{categoryName}}", create: "Nové téma", create_long: "Vytvořit nové téma", private_message: "Vytvořit soukromou konverzaci", list: "Témata", "new": "nové téma", title: "Téma", loading_more: "Nahrávám více témat...", loading: "Nahrávám téma...", invalid_access: {title: "Téma je soukromé", description: "Bohužel nemáte přístup k tomuto tématu."}, server_error: {title: "Téma se nepodařilo načíst", description: "Bohužel není možné načíst toto téma, může to být způsobeno problémem s vaším připojením. Prosím, zkuste stránku načíst znovu. Pokud bude problém přetrvávat, dejte nám vědět."}, not_found: {title: "Téma nenalezeno", description: "Bohužel se nám nepovedlo najít toto téma. Nebylo odstraněno moderátorem?"}, unread_posts: "máte {{unread}} nepřečtených příspěvků v tomto tématu", new_posts: "je zde {{new_posts}} nových příspěvků od doby, kdy jste toto téma naposledy četli", likes: {one: "je zde 1x 'líbí' v tomto tématu", few: "je zde {{count}}x 'líbí' v tomto tématu", other: "je zde {{count}}x 'líbí' v tomto tématu"}, back_to_list: "Zpátky na seznam témat", options: "Možnosti", show_links: "zobrazit odkazy v tomto tématu", toggle_information: "zobrazit/skrýt detaily tématu", read_more_in_category: "Chcete si přečíst další informace? Projděte si témata v {{catLink}} nebo {{latestLink}}.", read_more: "Chcete si přečíst další informace? {{catLink}} nebo {{latestLink}}.", browse_all_categories: "Procházet všechny kategorie", view_latest_topics: "zobrazit populární témata", suggest_create_topic: "Co takhle založit nové téma?", read_position_reset: "Vaše pozice čtení byla zresetována.", jump_reply_up: "přejít na předchozí odpověď", jump_reply_down: "přejít na následující odpověď", deleted: "Téma bylo smazáno", auto_close_notice: "Toto téma se automaticky zavře %{timeLeft}.", auto_close_title: "Nastavení automatického zavírání", auto_close_save: "Uložit", auto_close_cancel: "Zrušit", auto_close_remove: "Nezavírat téma automaticky", progress: {title: "pozice v tématu", jump_top: "přejít na první příspěvek", jump_bottom: "přejít na poslední příspěvek", total: "celkem příspěvků", current: "aktuální příspěvek"}, notifications: {title: "", reasons: {"3_2": "Budete dostávat oznámení, protože hlídáte toto téma.", "3_1": "Budete dostávat oznámení, protože jste autorem totoho tématu.", 3: "Budete dostávat oznámení, protože hlídáte toto téma.", "2_4": "Budete dostávat oznámení, protože jste zaslal odpověď do tohoto tématu.", "2_2": "Budete dostávat oznámení, protože sledujete toto téma.", 2: 'Budete dostávat oznámení, protože <a href="/users/{{username}}/preferences">jste četli toto téma</a>.', 1: "Dostanete oznámení, jestliže vás někdo zmíní pomocí @name nebo odpoví na váš příspěvek.", "1_2": "Dostanete oznámení, jestliže vás někdo zmíní pomocí @name nebo odpoví na váš příspěvek.", 0: "Ignorujete všechna oznámení z tohoto tématu.", "0_2": "Ignorujete všechna oznámení z tohoto tématu."}, watching: {title: "Hlídání", description: "stejné jako 'Sledování' a navíc dostanete upozornění o všech nových příspěvcích."}, tracking: {title: "Sledování", description: "dostanete oznámení o nepřečtených příspěvcích, zmínkách přes @name a odpovědích na váš příspěvek."}, regular: {title: "Normální", description: "dostanete oznámení, jestliže vás někdo zmíní pomocí @name nebo odpoví na váš příspěvek."}, muted: {title: "Ztišení", description: "nebudete vůbec dostávat oznámení o tomto tématu a nebude se zobrazovat v seznamu nepřečtených témat."}}, actions: {"delete": "Odstranit téma", open: "Otevřít téma", close: "Zavřít téma", auto_close: "Automaticky zavřít", unpin: "Odstranit připevnění", pin: "Připevnit téma", unarchive: "Navrátit z archivu", archive: "Archivovat téma", invisible: "Zneviditelnit", visible: "Zviditelnit", reset_read: "Resetovat data o přečtení", multi_select: "Zapnout/vypnout multi-výběr", convert_to_topic: "Převést na běžné téma"}, reply: {title: "Odpovědět", help: "začněte psát odpověď na toto téma"}, clear_pin: {title: "Odstranit připevnění", help: "Odebere připevnění tohoto tématu, takže se již nebude zobrazovat na vrcholu seznamu témat"}, share: {title: "Sdílet", help: "sdílet odkaz na toto téma"}, inviting: "Odesílám pozvánku...", invite_private: {title: "Pozvat do soukromé konverzace", email_or_username: "Email nebo uživatelské jméno pozvaného", email_or_username_placeholder: "emailová adresa nebo uživatelské jméno", action: "Pozvat", success: "Děkujeme! Pozvali jste daného uživatele, aby se účastnil této soukromé konverzace.", error: "Bohužel nastala chyba při odesílání pozvánky."}, invite_reply: {title: "Pozvat přátele k odpovědi", action: "Odeslat pozvánku", help: "odeslat pozvánku přátelům, aby mohli na toto téma odpovědět jedním kliknutím", email: "Odešleme vašemu příteli krátký email s odkazem na možnost přímo odpovědět na toto téma.", email_placeholder: "emailová adresa", success: "Díky! Odeslali jsme pozvánku na <b>{{email}}</b>. Dáme vám vědět, až bude pozvánka vyzvednuta. Na záložce pozvánek na vaší uživatelské stránce můžete sledovat koho jste pozvali.", error: "Bohužel se nepodařilo pozvat tuto osobu. Není již registrovaným uživatelem?"}, login_reply: "Přihlašte se, chcete-li odpovědět", filters: {user: "{{n_posts}} {{by_n_users}}.", n_posts: {one: "Je zobrazen pouze 1 příspěvek", few: "Jsou zobrazeny pouze {{count}} příspěvky", other: "Je zobrazeno pouze {{count}} příspěvků"}, by_n_users: {one: "od 1 vybraného uživatele", few: "od {{count}} vybraného uživatele", other: "od {{count}} vybraných uživatelů"}, best_of: "{{n_best_posts}} {{of_n_posts}}.", n_best_posts: {one: "Je zobrazen 1 nejlepší příspěvek", few: "Jsou zobrazeny {{count}} nejlepší příspěvky", other: "Je zobrazeno {{count}} nejlepších příspěvků"}, of_n_posts: {one: "z celkem 1 příspěvku v tématu", few: "z celkem {{count}} příspěvků v tématu", other: "z celkem {{count}} příspěvků v tématu"}, cancel: "Zobrazí znovu všechny příspěvky v tomto tématu."}, split_topic: {title: "Rozdělit téma", action: "rozdělit téma", topic_name: "Název nového tématu:", error: "Bohužel nastala chyba při rozdělování tématu.", instructions: {one: "Chystáte se vytvořit nové téma a naplnit ho příspěvkem, který jste označili.", few: "Chystate se vytvořit noté téma a naplnit ho <b>{{count}}</b> příspěvky, které jste označili.", other: "Chystate se vytvořit noté téma a naplnit ho <b>{{count}}</b> příspěvky, které jste označili."}}, merge_topic: {title: "Sloučit téma", action: "sloučit téma", error: "Bohužel nastala chyba při slučování tématu.", instructions: {one: "Prosím, vyberte téma, do kterého chcete příspěvek přesunout.", few: "Prosím, vyberte téma, do kterého chcete tyto <b>{{count}}</b> příspěvky přesunout.", other: "Prosím, vyberte téma, do kterého chcete těchto <b>{{count}}</b> příspěvků přesunout."}}, multi_select: {select: "označit", selected: "označeno ({{count}})", "delete": "odstranit označené", cancel: "zrušit označování", description: {one: "Máte označen <b>1</b> příspěvek.", few: "Máte označeny <b>{{count}}</b> příspěvky.", other: "Máte označeno <b>{{count}}</b> příspěvků."}}}, post: {reply: "Odpovídáte na {{link}} od {{replyAvatar}} {{username}}", reply_topic: "Odpověď na {{link}}", quote_reply: "odpověď s citací", edit: "Editujete {{link}} od uživatele {{replyAvatar}} {{username}}", post_number: "příspěvek č. {{number}}", in_reply_to: "v odpovědi na", reply_as_new_topic: "Odpovědět jako nové téma", continue_discussion: "Pokračující diskuze z {{postLink}}:", follow_quote: "přejít na citovaný příspěvek", deleted_by_author: "(příspěvek odstraněn autorem)", expand_collapse: "rozbalit/sbalit", has_replies: {one: "Odpověď", few: "Odpovědi", other: "Odpovědi"}, errors: {create: "Bohužel nastala chyba při vytváření příspěvku. Prosím zkuste to znovu.", edit: "Bohužel nastala chyba při editaci příspěvku. Prosím zkuste to znovu.", upload: "Bohužel nastala chyba při nahrávání příspěvku. Prosím zkuste to znovu.", upload_too_large: "Soubor, který se snažíte nahrát je bohužel příliš velký (maximální velikost je {{max_size_kb}}kb). Prosím zmenšete ho zkuste to znovu.", upload_too_many_images: "Bohužel, najednou smíte nahrát pouze jeden obrázek.", only_images_are_supported: "Bohužel, smíte nahrávat pouze obrázky."}, abandon: "Opravdu chcete opustit váš příspěvek?", archetypes: {save: "Uložit nastavení"}, controls: {reply: "otevře okno pro sepsání odpovědi na tento příspěvek", like: "to se mi líbí", edit: "upravit příspěvek", flag: "nahlásit příspěvek moderátorovi", "delete": "smazat příspěvek", undelete: "obnovit příspěvek", share: "sdílet odkaz na tento příspěvek", bookmark: "přidat záložku na tento příspěvek na vaši uživatelskou stránku", more: "Více"}, actions: {flag: "Nahlásit", clear_flags: {one: "Odebrat nahlášení", few: "Odebrat nahlášení", other: "Odebrat nahlášení"}, it_too: {off_topic: "Také nahlásit", spam: "Také nahlásit", inappropriate: "Také nahlásit", custom_flag: "Také nahlásit", bookmark: "Také přidat do záložek", like: "To se mi také líbí", vote: "Hlasovat také"}, undo: {off_topic: "Zrušit nahlášení", spam: "Zrušit nahlášení", inappropriate: "Zrušit nahlášení", bookmark: "Odebrat ze záložek", like: "Už se mi to nelíbí", vote: "Zrušit hlas"}, people: {off_topic: "{{icons}} označili tento příspěvek jako off-topic", spam: "{{icons}} označili tento příspěvek jako spam", inappropriate: "{{icons}} označili tento příspěvek jako nevhodný", notify_moderators: "{{icons}} nahlásili tento příspěvek", notify_moderators_with_url: "{{icons}} <a href='{{postUrl}}'>nahlásili tento příspěvek</a>", notify_user: "{{icons}} zahájili soukromou konverzaci", notify_user_with_url: "{{icons}} zahájijli a <a href='{{postUrl}}'>soukromou konverzaci</a>", bookmark: "{{icons}} si přidali příspěvek do záložek", like: "{{icons}} se líbí tento příspěvek", vote: "{{icons}} hlasovali pro tento příspěvek"}, by_you: {off_topic: "Označili jste tento příspěvek jako off-topic", spam: "Označili jste tento příspěvek jako spam", inappropriate: "Označili jste tento příspěvek jako nevhodný", notify_moderators: "Nahlásili jste tento příspěvek", notify_user: "Zahájili jste soukromou konverzaci s tímto uživatelem", bookmark: "Přidali jste si tento příspěvek do záložek", like: "Toto se vám líbí", vote: "Hlasovali jste pro tento příspěvek"}, by_you_and_others: {off_topic: {one: "Vy a 1 další člověk jste označili tento příspěvek jako off-topic", few: "Vy a {{count}} další lidé jste označili tento příspěvek jako off-topic", other: "Vy a {{count}} dalších lidí jste označili tento příspěvek jako off-topic"}, spam: {one: "Vy a 1 další člověk jste označili tento příspěvek jako spam", few: "Vy a {{count}} další lidé jste označili tento příspěvek jako spam", other: "Vy a {{count}} dalších lidí jste označili tento příspěvek jako spam"}, inappropriate: {one: "Vy a 1 další člověk jste označili tento příspěvek jako nevhodný", few: "Vy a {{count}} další lidé jste označili tento příspěvek jako nevhodný", other: "Vy a {{count}} dalších lidí jste označili tento příspěvek jako nevhodný"}, notify_moderators: {one: "Vy a 1 další člověk jste nahlásili tento příspěvek", few: "Vy a {{count}} další lidé jste nahlásili tento příspěvek", other: "Vy a {{count}} dalších lidí jste nahlásili tento příspěvek"}, notify_user: {one: "Vy a 1 další člověk jste zahájili soukromou konverzaci s tímto uživatelem", few: "Vy a {{count}} další lidé jste zahájili soukromou konverzaci s tímto uživatelem", other: "Vy a {{count}} dalších lidí jste zahájili soukromou konverzaci s tímto uživatelem"}, bookmark: {one: "Vy a 1 další člověk jste si přidali tento příspěvek do záložek", few: "Vy a {{count}} další lidé jste si přidali tento příspěvek do záložek", other: "Vy a {{count}} dalších lidí si přidali tento příspěvek do záložek"}, like: {one: "Vám a 1 dalšímu člověku se tento příspěvek líbí", few: "Vám a {{count}} dalším lidem se tento příspěvek líbí", other: "Vám a {{count}} dalším lidem se tento příspěvek líbí"}, vote: {one: "Vy a 1 další člověk jste hlasovali pro tento příspěvek", few: "Vy a {{count}} další lidé jste hlasovali pro tento příspěvek", other: "Vy a {{count}} dalších lidí jste hlasovali pro tento příspěvek"}}, by_others: {off_topic: {one: "1 člověk označil tento příspěvek jako off-topic", few: "{{count}} lidé označili tento příspěvek jako off-topic", other: "{{count}} lidí označilo tento příspěvek jako off-topic"}, spam: {one: "1 člověk označil tento příspěvek jako spam", few: "{{count}} lidé označili tento příspěvek jako spam", other: "{{count}} lidí označilo tento příspěvek jako spam"}, inappropriate: {one: "1 člověk označil tento příspěvek jako nevhodný", few: "{{count}} lidé označili tento příspěvek jako nevhodný", other: "{{count}} lidí označilo tento příspěvek jako nevhodný"}, notify_moderators: {one: "1 člověk nahlásil tento příspěvek", few: "{{count}} lidé nahlásili tento příspěvek", other: "{{count}} lidí nahlásilo tento příspěvek"}, notify_user: {one: "1 člověk zahájil soukromou konverzaci s tímto uživatelem", few: "{{count}} lidé zahájili soukromou konverzaci s tímto uživatelem", other: "{{count}} lidí zahájilo soukromou konverzaci s tímto uživatelem"}, bookmark: {one: "1 člověk si přidal tento příspěvek do záložek", few: "{{count}} lidé si přidali tento příspěvek do záložek", other: "{{count}} lidí si přidalo tento příspěvek do záložek"}, like: {one: "1 člověku se tento příspěvek líbí", few: "{{count}} lidem se tento příspěvek líbí", other: "{{count}} lidem se tento příspěvek líbí"}, vote: {one: "1 člověk hlasoval pro tento příspěvek", few: "{{count}} lidé hlasovali pro tento příspěvek", other: "{{count}} lidí hlasovalo pro tento příspěvek"}}}, edits: {one: "1 úprava", few: "{{count}} úpravy", other: "{{count}} úprav", zero: "žádné úpravy"}, "delete": {confirm: {one: "Opravdu chcete odstranit tento příspěvek?", few: "Opravdu chcete odstranit všechny tyto příspěvky?", other: "Opravdu chcete odstranit všechny tyto příspěvky?"}}}, category: {none: "(bez kategorie)", edit: "upravit", edit_long: "Upravit kategorii", edit_uncategorized: "Upravit nekategorizované", view: "Zobrazit témata v kategorii", general: "Obecné", settings: "Nastavení", "delete": "Smazat kategorii", create: "Nová kategorie", save: "Uložit kategorii", creation_error: "Během vytváření nové kategorie nastala chyba.", save_error: "Během ukládání kategorie nastala chyba.", more_posts: "zobrazit všechny {{posts}}...", name: "Název kategorie", description: "Popis", topic: "téma kategorie", badge_colors: "Barvy štítku", background_color: "Barva pozadí", foreground_color: "Barva textu", name_placeholder: "Měl by být krátký a výstižný.", color_placeholder: "Jakákoliv webová barva", delete_confirm: "Opravdu chcete odstranit tuto kategorii?", delete_error: "Nastala chyba při odstraňování kategorie.", list: "Seznam kategorií", no_description: "K této kategorii zatím není žádný popis.", change_in_category_topic: "navštivte téma kategorie pro editaci jejího popisu", hotness: "Popularita", already_used: "Tato barva je již použita jinou kategorií", is_secure: "Zabezpečená kategorie?", add_group: "Přidat skupinu", security: "Bezpečnost", allowed_groups: "Povolené skupiny:", auto_close_label: "Automaticky zavírat témata po:"}, flagging: {title: "Proč chcete nahlásit tento příspěvek?", action: "Nahlásit příspěvek", take_action: "Zakročit", notify_action: "Oznámit", cant: "Bohužel nyní nemůžete tento příspěvek nahlásit.", custom_placeholder_notify_user: "Proč chcete s tímto uživatele mluvit přímo a soukromě? Buďte konstruktivní, konkrétní a hlavně vstřícní.", custom_placeholder_notify_moderators: "Proč příspěvek vyžaduje pozornost moderátora? Dejte nám vědět, co konkrétně vás znepokojuje, a poskytněte relevantní odkazy, je-li to možné.", custom_message: {at_least: "zadejte alespoň {{n}} znaků", more: "ještě {{n}}...", left: "{{n}} zbývá"}}, topic_summary: {title: "Souhrn tématu", links_shown: "zobrazit všech {{totalLinks}} odkazů...", clicks: "počet kliknutí", topic_link: "odkaz na téma"}, topic_statuses: {locked: {help: "toto téma je uzavřené; další odpovědi nebudou přijímány"}, pinned: {help: "toto téma je připevněné; bude se zobrazovat na vrcholu seznamu ve své kategorii"}, archived: {help: "toto téma je archivováno; je zmraženo a nelze ho již měnit"}, invisible: {help: "toto téma je neviditelné; nebude se zobrazovat v seznamu témat a lze ho navštívit pouze přes přímý odkaz"}}, posts: "Příspěvky", posts_long: "{{number}} příspěvků v tomto tématu", original_post: "Původní příspěvek", views: "Zobrazení", replies: "Odpovědi", views_long: "toto téma bylo zobrazeno {{number}}krát", activity: "Aktivita", likes: "Líbí se", top_contributors: "Účastníci", category_title: "Kategorie", history: "Historie", changed_by: "od uživatele {{author}}", categories_list: "Seznam kategorií", filters: {latest: {title: "Aktuální", help: "nejaktuálnější témata"}, hot: {title: "Populární", help: "populární témata z poslední doby"}, favorited: {title: "Oblíbená", help: "témata, která jste označili jako oblíbená"}, read: {title: "Přečtená", help: "témata, která jste si přečetli"}, categories: {title: "Kategorie", title_in: "Kategorie - {{categoryName}}", help: "všechny témata seskupená podle kategorie"}, unread: {title: {zero: "Nepřečtená", one: "Nepřečtená (1)", few: "Nepřečtená ({{count}})", other: "Nepřečtená ({{count}})"}, help: "sledovaná témata s nepřečtenými příspěvky"}, "new": {title: {zero: "Nová", one: "Nová (1)", few: "Nová ({{count}})", other: "Nová ({{count}})"}, help: "nová témata od vaší poslední návštěvy a nové příspěvky v tématech, která sledujete"}, posted: {title: "Mé příspěvky", help: "témata, do kterých jste přispěli"}, category: {title: {zero: "{{categoryName}}", one: "{{categoryName}} (1)", few: "{{categoryName}} ({{count}})", other: "{{categoryName}} ({{count}})"}, help: "populární témata v kategorii {{categoryName}}"}}, browser_update: 'Bohužel, <a href="http://www.discourse.org/faq/#browser">váš prohlížeč je příliš starý, aby na něm Discourse mohl fungovat</a>. Prosím <a href="http://browsehappy.com">aktualizujte svůj prohlížeč</a>.', type_to_filter: "zadejte text pro filtrování...", admin: {title: "Discourse Administrace", moderator: "Moderátor", dashboard: {title: "Administrátorský rozcestník", version: "Verze Discourse", up_to_date: "Používáte nejnovější verzi Discourse.", critical_available: "Je k dispozici důležitá aktualizace.", updates_available: "Jsou k dispozici aktualizace.", please_upgrade: "Prosím aktualizujte!", installed_version: "Nainstalováno", latest_version: "Poslední verze", problems_found: "Byly nalezeny problémy s vaší instalací systému Discourse:", last_checked: "Naposledy zkontrolováno", refresh_problems: "Obnovit", no_problems: "Nenalezeny žádné problémy.", moderators: "Moderátoři:", admins: "Administrátoři:", blocked: "Blokováno:", private_messages_short: "SZ", private_messages_title: "Soukromé zprávy", reports: {today: "Dnes", yesterday: "Včera", last_7_days: "Posledních 7 dní", last_30_days: "Posledních 30 dní", all_time: "Za celou dobu", "7_days_ago": "Před 7 dny", "30_days_ago": "Před 30 dny", all: "Všechny", view_table: "Zobrazit jako tabulku", view_chart: "Zobrazit jako sloupcový graf"}}, commits: {latest_changes: "Poslední změny: prosím aktualizujte často!", by: "od"}, flags: {title: "Nahlášení", old: "Staré", active: "Aktivní", clear: "Vynulovat nahlášení", clear_title: "zrušit všechna nahlášení na tomto příspěvku (zviditelní příspěvek, byl-li skrytý)", "delete": "Odstranit příspěvek", delete_title: "odstranit příspěvek (smaže celé téma, je-li to první příspěvek v tématu)", flagged_by: "Nahlásil", error: "Něco se pokazilo", view_message: "zobrazit zprávu", no_results: "Nejsou zde žádná nahlášení."}, groups: {title: "Skupiny", edit: "Editovat Skupiny", selector_placeholder: "přidat uživatele", name_placeholder: "Název skupiny, bez mezer, stejná pravidla jako pro uživatelská jména"}, api: {title: "API", long_title: "API Informace", key: "Klíč", generate: "Vygenerovat API klíč", regenerate: "Znovu-vygenerovat API klíč", info_html: "Váš API klíč umožní vytvářet a aktualizovat témata pomocí JSONových volání.", note_html: "Uchovejte tento klíč <strong>v bezpečí</strong>, každý, kdo má tento klíč, může libovolně vytvářet příspěvky na fóru i za ostatní uživatele."}, customize: {title: "Přizpůsobení", long_title: "Přizpůsobení webu", header: "Hlavička", css: "Stylesheet", override_default: "Přetížit výchozí?", enabled: "Zapnutý?", preview: "náhled", undo_preview: "zrušit náhled", save: "Uložit", "new": "Nový", new_style: "Nový styl", "delete": "Smazat", delete_confirm: "Smazat toto přizpůsobení?", about: "Přizpůsobení webu vám umožní si nastavit vlastní CSS stylesheet a vlastní nadpisy na webu. Vyberte si z nabídky nebo vložte vlastní přizpůsobení a můžete začít editovat."}, email: {title: "Email", settings: "Nastavení", logs: "Záznamy", sent_at: "Odesláno", email_type: "Typ emailu", to_address: "Komu", test_email_address: "testovací emailová adresa", send_test: "odeslat testovací email", sent_test: "odesláno!", delivery_method: "Způsob doručení", preview_digest: "Náhled souhrnu", preview_digest_desc: "Toto je nástroj pro zobrazení náhledu, jak bude vypadat obsah emailu se souhrnem, který se zasílá uživatelům.", refresh: "Obnovit", format: "Formát", html: "html", text: "text", last_seen_user: "Uživatel byl naposled přítomen:", reply_key: "Klíč pro odpověď"}, impersonate: {title: "Vydávat se za uživatele", username_or_email: "Uživatelské jméno nebo emailová adresa", help: "Použijte tento nástroj k přihlášení za jiného uživatele pro ladící a vývojové potřeby.", not_found: "Tento uživatel nebyl nalezen.", invalid: "Bohužel za tohoto uživatele se nemůžete vydávat."}, users: {title: "Uživatelé", create: "Přidat administrátora", last_emailed: "Email naposledy zaslán", not_found: "Bohužel uživatel s tímto jménem není v našem systému.", "new": "Nový", active: "Aktivní", pending: "Čeká na schválení", approved: "Schválen?", approved_selected: {one: "schválit uživatele", few: "schválit uživatele ({{count}})", other: "schválit uživatele ({{count}})"}, titles: {active: "Aktivní uživatelé", "new": "Noví uživatelé", pending: "Uživatelé čekající na schválení", newuser: "Uživatelé s věrohodností 0 (Nový uživatel)", basic: "Uživatelé s věrohodností 1 (Základní uživatel)", regular: "Uživatelé s věrohodností 2 (Pravidelný uživatel)", leader: "Uživatelé s věrohodností 3 (Vedoucí)", elder: "Uživatelé s věrohodností 4 (Starší)", admins: "Admininstrátoři", moderators: "Moderátoři", blocked: "Blokovaní uživatelé"}}, user: {ban_failed: "Nastala chyba při zakazování uživatele {{error}}", unban_failed: "Nastala chyba při povolování uživatele {{error}}", ban_duration: "Jak dlouho má zákaz platit? (dny)", delete_all_posts: "Smazat všechny příspěvky", ban: "Zakázat", unban: "Povolit", banned: "Zakázán?", moderator: "Moderátor?", admin: "Administrátor?", blocked: "Zablokovaný?", show_admin_profile: "Administrace", refresh_browsers: "Vynutit obnovení prohlížeče", show_public_profile: "Zobrazit veřejný profil", impersonate: "Vydávat se za uživatele", revoke_admin: "Odebrat administrátorská práva", grant_admin: "Udělit administrátorská práva", revoke_moderation: "Odebrat moderátorská práva", grant_moderation: "Udělit moderátorská práva", unblock: "Odblokovat", block: "Zablokovat", reputation: "Reputace", permissions: "Povolení", activity: "Aktivita", like_count: "Obdržel 'líbí'", private_topics_count: "Počet soukromách témat", posts_read_count: "Přečteno příspěvků", post_count: "Vytvořeno příspěvků", topics_entered: "Zobrazil témat", flags_given_count: "Uděleno nahlášení", flags_received_count: "Přijato nahlášení", approve: "Schválit", approved_by: "schválil", approve_success: "Uživatel bys schválen a byl mu zaslán aktivační email s instrukcemi.", approve_bulk_success: "Povedlo se! Všichni uživatelé byli schváleni a byly jim rozeslány notifikace.", time_read: "Čas čtení", "delete": "Smazat uživatele", delete_forbidden: "Uživatele nelze odstranit, protože má na fóru zveřejněné příspěvky. Nejprve smažte všechny jeho příspěvky.", delete_confirm: "Jste si jistí, že chce permanentně smazat tohoto uživatele z fóra? Tato akce je nevratná!", deleted: "Uživatel byl smazán.", delete_failed: "Nastala chyba při odstraňování uživatele. Ujistěte se, že jsou všechny příspěvky tohoto uživatele smazané, než budete uživatele mazat.", send_activation_email: "Odeslat aktivační email", activation_email_sent: "Aktivační email byl odeslán.", send_activation_email_failed: "Nastal problém při odesílání aktivačního emailu.", activate: "Aktivovat účet", activate_failed: "Nasstal problém při aktivování tohoto uživatele.", deactivate_account: "Deaktivovat účet", deactivate_failed: "Nastal problém při deaktivování tohoto uživatele.", unblock_failed: "Nastal problém při odblokování uživatele.", block_failed: "Nastal problém při blokování uživatele.", deactivate_explanation: "Deaktivovaný uživatel musí znovu validovat svoji emailovou adresu než se bude moci znovu přihlásit.", banned_explanation: "Zakázaný uživatel se nemůže přihlásit.", block_explanation: "Zablokovaný uživatel nemůže přispívat nebo vytvářet nová témata."}, site_content: {none: "Zvolte typ obsahu a můžete začít editovat.", title: "Obsah webu", edit: "Editovat obsah webu"}, site_settings: {show_overriden: "Zobrazit pouze změněná nastavení", title: "Nastavení webu", reset: "vrátit do původního nastavení", none: "žádné"}}}}}, I18n.locale = "cs", function (e) {
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
        i(this, e)
    }

    function a(e) {
        var t = this._data = {}, n = e.years || e.year || e.y || 0, s = e.months || e.month || e.M || 0, r = e.weeks || e.week || e.w || 0, a = e.days || e.day || e.d || 0, i = e.hours || e.hour || e.h || 0, u = e.minutes || e.minute || e.m || 0, l = e.seconds || e.second || e.s || 0, c = e.milliseconds || e.millisecond || e.ms || 0;
        this._milliseconds = c + 1e3 * l + 6e4 * u + 36e5 * i, this._days = a + 7 * r, this._months = s + 12 * n, t.milliseconds = c % 1e3, l += o(c / 1e3), t.seconds = l % 60, u += o(l / 60), t.minutes = u % 60, i += o(u / 60), t.hours = i % 24, a += o(i / 24), a += 7 * r, t.days = a % 30, s += o(a / 30), t.months = s % 12, n += o(s / 12), t.years = n
    }

    function i(e, t) {
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
        var r, a, i, o = t._milliseconds, u = t._days, l = t._months;
        o && e._d.setTime(+e._d + o * n), (u || l) && (r = e.minute(), a = e.hour()), u && e.date(e.date() + u * n), l && (i = e.date(), e.date(1).month(e.month() + l * n).date(Math.min(i, e.daysInMonth()))), o && !s && R.updateOffset(e), (u || l) && (e.minute(r), e.hour(a))
    }

    function c(e) {
        return"[object Array]" === Object.prototype.toString.call(e)
    }

    function h(e, t) {
        var n, s = Math.min(e.length, t.length), r = Math.abs(e.length - t.length), a = 0;
        for (n = 0; s > n; n++)~~e[n] !== ~~t[n] && a++;
        return a + r
    }

    function p(e) {
        return e ? rt[e] || e.toLowerCase().replace(/(.)s$/, "$1") : e
    }

    function f(e, t) {
        return t.abbr = e, O[e] || (O[e] = new s), O[e].set(t), O[e]
    }

    function d(e) {
        return e ? (!O[e] && U && require("./lang/" + e), O[e]) : R.fn._lang
    }

    function m(e) {
        return e.match(/\[.*\]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }

    function g(e) {
        var t, n, s = e.match(V);
        for (t = 0, n = s.length; n > t; t++)s[t] = ut[s[t]] ? ut[s[t]] : m(s[t]);
        return function (r) {
            var a = "";
            for (t = 0; n > t; t++)a += s[t]instanceof Function ? s[t].call(r, e) : s[t];
            return a
        }
    }

    function b(e, t) {
        function n(t) {
            return e.lang().longDateFormat(t) || t
        }

        for (var s = 5; s-- && F.test(t);)t = t.replace(F, n);
        return at[t] || (at[t] = g(t)), at[t](e)
    }

    function v(e, t) {
        switch (e) {
            case"DDDD":
                return q;
            case"YYYY":
                return $;
            case"YYYYY":
                return W;
            case"S":
            case"SS":
            case"SSS":
            case"DDD":
                return G;
            case"MMM":
            case"MMMM":
            case"dd":
            case"ddd":
            case"dddd":
                return Q;
            case"a":
            case"A":
                return d(t._l)._meridiemParse;
            case"X":
                return X;
            case"Z":
            case"ZZ":
                return K;
            case"T":
                return Y;
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

    function x(e, t, n) {
        var s, r = n._a;
        switch (e) {
            case"M":
            case"MM":
                r[1] = null == t ? 0 : ~~t - 1;
                break;
            case"MMM":
            case"MMMM":
                s = d(n._l).monthsParse(t), null != s ? r[1] = s : n._isValid = !1;
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
                n._isPm = d(n._l).isPM(t);
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

    function _(e) {
        var t, n, s = [];
        if (!e._d) {
            for (t = 0; 7 > t; t++)e._a[t] = s[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            s[3] += ~~((e._tzm || 0) / 60), s[4] += ~~((e._tzm || 0) % 60), n = new Date(0), e._useUTC ? (n.setUTCFullYear(s[0], s[1], s[2]), n.setUTCHours(s[3], s[4], s[5], s[6])) : (n.setFullYear(s[0], s[1], s[2]), n.setHours(s[3], s[4], s[5], s[6])), e._d = n
        }
    }

    function w(e) {
        var t, n, s = e._f.match(V), r = e._i;
        for (e._a = [], t = 0; s.length > t; t++)n = (v(s[t], e).exec(r) || [])[0], n && (r = r.slice(r.indexOf(n) + n.length)), ut[s[t]] && x(s[t], n, e);
        r && (e._il = r), e._isPm && 12 > e._a[3] && (e._a[3] += 12), e._isPm === !1 && 12 === e._a[3] && (e._a[3] = 0), _(e)
    }

    function E(e) {
        var t, n, s, a, o, u = 99;
        for (a = 0; e._f.length > a; a++)t = i({}, e), t._f = e._f[a], w(t), n = new r(t), o = h(t._a, n.toArray()), n._il && (o += n._il.length), u > o && (u = o, s = n);
        i(e, s)
    }

    function T(e) {
        var t, n = e._i, s = Z.exec(n);
        if (s) {
            for (e._f = "YYYY-MM-DD" + (s[2] || " "), t = 0; 4 > t; t++)if (et[t][1].exec(n)) {
                e._f += et[t][0];
                break
            }
            K.exec(n) && (e._f += " Z"), w(e)
        } else e._d = new Date(n)
    }

    function C(t) {
        var n = t._i, s = z.exec(n);
        n === e ? t._d = new Date : s ? t._d = new Date(+s[1]) : "string" == typeof n ? T(t) : c(n) ? (t._a = n.slice(0), _(t)) : t._d = n instanceof Date ? new Date(+n) : new Date(n)
    }

    function D(e, t, n, s, r) {
        return r.relativeTime(t || 1, !!n, e, s)
    }

    function k(e, t, n) {
        var s = L(Math.abs(e) / 1e3), r = L(s / 60), a = L(r / 60), i = L(a / 24), o = L(i / 365), u = 45 > s && ["s", s] || 1 === r && ["m"] || 45 > r && ["mm", r] || 1 === a && ["h"] || 22 > a && ["hh", a] || 1 === i && ["d"] || 25 >= i && ["dd", i] || 45 >= i && ["M"] || 345 > i && ["MM", L(i / 30)] || 1 === o && ["y"] || ["yy", o];
        return u[2] = t, u[3] = e > 0, u[4] = n, D.apply({}, u)
    }

    function I(e, t, n) {
        var s, r = n - t, a = n - e.day();
        return a > r && (a -= 7), r - 7 > a && (a += 7), s = R(e).add("d", a), {week: Math.ceil(s.dayOfYear() / 7), year: s.year()}
    }

    function S(e) {
        var t = e._i, n = e._f;
        return null === t || "" === t ? null : ("string" == typeof t && (e._i = t = d().preparse(t)), R.isMoment(t) ? (e = i({}, t), e._d = new Date(+t._d)) : n ? c(n) ? E(e) : w(e) : C(e), new r(e))
    }

    function N(e, t) {
        R.fn[e] = R.fn[e + "s"] = function (e) {
            var n = this._isUTC ? "UTC" : "";
            return null != e ? (this._d["set" + n + t](e), R.updateOffset(this), this) : this._d["get" + n + t]()
        }
    }

    function A(e) {
        R.duration.fn[e] = function () {
            return this._data[e]
        }
    }

    function P(e, t) {
        R.duration.fn["as" + e] = function () {
            return+this / t
        }
    }

    for (var R, j, M = "2.0.0", L = Math.round, O = {}, U = "undefined" != typeof module && module.exports, z = /^\/?Date\((\-?\d+)/i, H = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, V = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, F = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, B = /\d\d?/, G = /\d{1,3}/, q = /\d{3}/, $ = /\d{1,4}/, W = /[+\-]?\d{1,6}/, Q = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, K = /Z|[\+\-]\d\d:?\d\d/i, Y = /T/i, X = /[\+\-]?\d+(\.\d{1,3})?/, Z = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, J = "YYYY-MM-DDTHH:mm:ssZ", et = [
        ["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
        ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
        ["HH:mm", /(T| )\d\d:\d\d/],
        ["HH", /(T| )\d\d/]
    ], tt = /([\+\-]|\d\d)/gi, nt = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), st = {Milliseconds: 1, Seconds: 1e3, Minutes: 6e4, Hours: 36e5, Days: 864e5, Months: 2592e6, Years: 31536e6}, rt = {ms: "millisecond", s: "second", m: "minute", h: "hour", d: "day", w: "week", M: "month", y: "year"}, at = {}, it = "DDD w W M D d".split(" "), ot = "M D H h m s w W".split(" "), ut = {M: function () {
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
    }}; it.length;)j = it.pop(), ut[j + "o"] = n(ut[j], j);
    for (; ot.length;)j = ot.pop(), ut[j + j] = t(ut[j], 2);
    for (ut.DDDD = t(ut.DDD, 3), s.prototype = {set: function (e) {
        var t, n;
        for (n in e)t = e[n], "function" == typeof t ? this[n] = t : this["_" + n] = t
    }, _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), months: function (e) {
        return this._months[e.month()]
    }, _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), monthsShort: function (e) {
        return this._monthsShort[e.month()]
    }, monthsParse: function (e) {
        var t, n, s;
        for (this._monthsParse || (this._monthsParse = []), t = 0; 12 > t; t++)if (this._monthsParse[t] || (n = R([2e3, t]), s = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[t] = new RegExp(s.replace(".", ""), "i")), this._monthsParse[t].test(e))return t
    }, _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdays: function (e) {
        return this._weekdays[e.day()]
    }, _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysShort: function (e) {
        return this._weekdaysShort[e.day()]
    }, _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), weekdaysMin: function (e) {
        return this._weekdaysMin[e.day()]
    }, weekdaysParse: function (e) {
        var t, n, s;
        for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++)if (this._weekdaysParse[t] || (n = R([2e3, 1]).day(t), s = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[t] = new RegExp(s.replace(".", ""), "i")), this._weekdaysParse[t].test(e))return t
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
        return I(e, this._week.dow, this._week.doy).week
    }, _week: {dow: 0, doy: 6}}, R = function (e, t, n) {
        return S({_i: e, _f: t, _l: n, _isUTC: !1})
    }, R.utc = function (e, t, n) {
        return S({_useUTC: !0, _isUTC: !0, _l: n, _i: e, _f: t})
    }, R.unix = function (e) {
        return R(1e3 * e)
    }, R.duration = function (e, t) {
        var n, s, r = R.isDuration(e), i = "number" == typeof e, o = r ? e._data : i ? {} : e, u = H.exec(e);
        return i ? t ? o[t] = e : o.milliseconds = e : u && (n = "-" === u[1] ? -1 : 1, o = {y: 0, d: ~~u[2] * n, h: ~~u[3] * n, m: ~~u[4] * n, s: ~~u[5] * n, ms: ~~u[6] * n}), s = new a(o), r && e.hasOwnProperty("_lang") && (s._lang = e._lang), s
    }, R.version = M, R.defaultFormat = J, R.updateOffset = function () {
    }, R.lang = function (e, t) {
        return e ? (t ? f(e, t) : O[e] || d(e), R.duration.fn._lang = R.fn._lang = d(e), void 0) : R.fn._lang._abbr
    }, R.langData = function (e) {
        return e && e._lang && e._lang._abbr && (e = e._lang._abbr), d(e)
    }, R.isMoment = function (e) {
        return e instanceof r
    }, R.isDuration = function (e) {
        return e instanceof a
    }, R.fn = r.prototype = {clone: function () {
        return R(this)
    }, valueOf: function () {
        return+this._d + 6e4 * (this._offset || 0)
    }, unix: function () {
        return Math.floor(+this / 1e3)
    }, toString: function () {
        return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }, toDate: function () {
        return this._offset ? new Date(+this) : this._d
    }, toISOString: function () {
        return b(R(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }, toArray: function () {
        var e = this;
        return[e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds()]
    }, isValid: function () {
        return null == this._isValid && (this._isValid = this._a ? !h(this._a, (this._isUTC ? R.utc(this._a) : R(this._a)).toArray()) : !isNaN(this._d.getTime())), !!this._isValid
    }, utc: function () {
        return this.zone(0)
    }, local: function () {
        return this.zone(0), this._isUTC = !1, this
    }, format: function (e) {
        var t = b(this, e || R.defaultFormat);
        return this.lang().postformat(t)
    }, add: function (e, t) {
        var n;
        return n = "string" == typeof e ? R.duration(+t, e) : R.duration(e, t), l(this, n, 1), this
    }, subtract: function (e, t) {
        var n;
        return n = "string" == typeof e ? R.duration(+t, e) : R.duration(e, t), l(this, n, -1), this
    }, diff: function (e, t, n) {
        var s, r, a = this._isUTC ? R(e).zone(this._offset || 0) : R(e).local(), i = 6e4 * (this.zone() - a.zone());
        return t = p(t), "year" === t || "month" === t ? (s = 432e5 * (this.daysInMonth() + a.daysInMonth()), r = 12 * (this.year() - a.year()) + (this.month() - a.month()), r += (this - R(this).startOf("month") - (a - R(a).startOf("month"))) / s, "year" === t && (r /= 12)) : (s = this - a - i, r = "second" === t ? s / 1e3 : "minute" === t ? s / 6e4 : "hour" === t ? s / 36e5 : "day" === t ? s / 864e5 : "week" === t ? s / 6048e5 : s), n ? r : o(r)
    }, from: function (e, t) {
        return R.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t)
    }, fromNow: function (e) {
        return this.from(R(), e)
    }, calendar: function () {
        var e = this.diff(R().startOf("day"), "days", !0), t = -6 > e ? "sameElse" : -1 > e ? "lastWeek" : 0 > e ? "lastDay" : 1 > e ? "sameDay" : 2 > e ? "nextDay" : 7 > e ? "nextWeek" : "sameElse";
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
        return null != e ? "string" == typeof e && (e = this.lang().monthsParse(e), "number" != typeof e) ? this : (this._d["set" + t + "Month"](e), R.updateOffset(this), this) : this._d["get" + t + "Month"]()
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
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) > +R(e).startOf(t)
    }, isBefore: function (e, t) {
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) < +R(e).startOf(t)
    }, isSame: function (e, t) {
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) === +R(e).startOf(t)
    }, min: function (e) {
        return e = R.apply(null, arguments), this > e ? this : e
    }, max: function (e) {
        return e = R.apply(null, arguments), e > this ? this : e
    }, zone: function (e) {
        var t = this._offset || 0;
        return null == e ? this._isUTC ? t : this._d.getTimezoneOffset() : ("string" == typeof e && (e = y(e)), 16 > Math.abs(e) && (e = 60 * e), this._offset = e, this._isUTC = !0, t !== e && l(this, R.duration(t - e, "m"), 1, !0), this)
    }, zoneAbbr: function () {
        return this._isUTC ? "UTC" : ""
    }, zoneName: function () {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }, daysInMonth: function () {
        return R.utc([this.year(), this.month() + 1, 0]).date()
    }, dayOfYear: function (e) {
        var t = L((R(this).startOf("day") - R(this).startOf("year")) / 864e5) + 1;
        return null == e ? t : this.add("d", e - t)
    }, weekYear: function (e) {
        var t = I(this, this.lang()._week.dow, this.lang()._week.doy).year;
        return null == e ? t : this.add("y", e - t)
    }, isoWeekYear: function (e) {
        var t = I(this, 1, 4).year;
        return null == e ? t : this.add("y", e - t)
    }, week: function (e) {
        var t = this.lang().week(this);
        return null == e ? t : this.add("d", 7 * (e - t))
    }, isoWeek: function (e) {
        var t = I(this, 1, 4).week;
        return null == e ? t : this.add("d", 7 * (e - t))
    }, weekday: function (e) {
        var t = (this._d.getDay() + 7 - this.lang()._week.dow) % 7;
        return null == e ? t : this.add("d", e - t)
    }, isoWeekday: function (e) {
        var t = (this._d.getDay() + 6) % 7;
        return null == e ? t : this.add("d", e - t)
    }, lang: function (t) {
        return t === e ? this._lang : (this._lang = d(t), this)
    }}, j = 0; nt.length > j; j++)N(nt[j].toLowerCase().replace(/s$/, ""), nt[j]);
    N("year", "FullYear"), R.fn.days = R.fn.day, R.fn.months = R.fn.month, R.fn.weeks = R.fn.week, R.fn.isoWeeks = R.fn.isoWeek, R.fn.toJSON = R.fn.toISOString, R.duration.fn = a.prototype = {weeks: function () {
        return o(this.days() / 7)
    }, valueOf: function () {
        return this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * ~~(this._months / 12)
    }, humanize: function (e) {
        var t = +this, n = k(t, !e, this.lang());
        return e && (n = this.lang().pastFuture(t, n)), this.lang().postformat(n)
    }, add: function (e, t) {
        var n = R.duration(e, t);
        return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, this
    }, subtract: function (e, t) {
        var n = R.duration(e, t);
        return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, this
    }, get: function (e) {
        return e = p(e), this[e.toLowerCase() + "s"]()
    }, as: function (e) {
        return e = p(e), this["as" + e.charAt(0).toUpperCase() + e.slice(1) + "s"]()
    }, lang: R.fn.lang};
    for (j in st)st.hasOwnProperty(j) && (P(j, st[j]), A(j.toLowerCase()));
    P("Weeks", 6048e5), R.duration.fn.asMonths = function () {
        return(+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, R.lang("en", {ordinal: function (e) {
        var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
        return e + n
    }}), U && (module.exports = R), "undefined" == typeof ender && (this.moment = R), "function" == typeof define && define.amd && define("moment", [], function () {
        return R
    })
}.call(this), moment.fn.shortDateNoYear = function () {
    return this.format("D MMM")
}, moment.fn.shortDate = function () {
    return this.format("D MMM, YYYY")
}, moment.fn.longDate = function () {
    return this.format("MMMM D, YYYY h:mma")
}, moment.fn.relativeAge = function (e) {
    return Discourse.Formatter.relativeAge(this.toDate(), e)
}, I18n.pluralizationRules.cs = function (e) {
    return 0 == e ? ["zero", "none", "other"] : 1 == e ? "one" : e >= 2 && 4 >= e ? "few" : "other"
};