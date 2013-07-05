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
    var s = e.getDay(), r = e.getDate(), a = e.getFullYear(), i = e.getMonth() + 1, o = e.getHours(), u = o, l = o > 11 ? 1 : 0, c = e.getSeconds(), h = e.getMinutes(), p = e.getTimezoneOffset(), d = Math.floor(Math.abs(p / 60)), f = Math.abs(p) - 60 * d, m = (p > 0 ? "-" : "+") + (2 > d.toString().length ? "0" + d : d) + (2 > f.toString().length ? "0" + f : f);
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
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, MessageFormat = {locale: {}}, MessageFormat.locale.de = function (e) {
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
}({"topic.read_more_MF": function (e) {
    var t = "";
    if (t += "Du ", !e)throw new Error("MessageFormat: No data passed to function.");
    var n = "UNREAD", s = e[n], r = 0, a = {0: function () {
        var e = "";
        return e
    }, one: function () {
        var e = "";
        return e += "hast <a href='/unread'>eine ungelesene</a> "
    }, other: function () {
        var e = "";
        return e += "hast <a href='/unread'>" + function () {
            var e = s - r;
            if (isNaN(e))throw new Error("MessageFormat: `" + n + "` isnt a number.");
            return e
        }() + " ungelesene</a> "
    }};
    if (t += a[s + ""] ? a[s + ""](e) : (a[MessageFormat.locale.de(s - r)] || a.other)(e), t += " ", !e)throw new Error("MessageFormat: No data passed to function.");
    var n = "NEW", s = e[n], r = 0, a = {0: function () {
        var e = "";
        return e
    }, one: function (e) {
        var t = "";
        if (!e)throw new Error("MessageFormat: No data passed to function.");
        var n = "BOTH", s = e[n], r = {"true": function () {
            var e = "";
            return e += "und "
        }, "false": function () {
            var e = "";
            return e += "ist "
        }, other: function () {
            var e = "";
            return e
        }};
        return t += (r[s] || r.other)(e), t += " <a href='/new'>ein neues</a> Thema"
    }, other: function (e) {
        var t = "";
        if (!e)throw new Error("MessageFormat: No data passed to function.");
        var a = "BOTH", i = e[a], o = {"true": function () {
            var e = "";
            return e += "und "
        }, "false": function () {
            var e = "";
            return e += "sind "
        }, other: function () {
            var e = "";
            return e
        }};
        return t += (o[i] || o.other)(e), t += " <a href='/new'>" + function () {
            var e = s - r;
            if (isNaN(e))throw new Error("MessageFormat: `" + n + "` isnt a number.");
            return e
        }() + " neue</a> Themen"
    }};
    if (t += a[s + ""] ? a[s + ""](e) : (a[MessageFormat.locale.de(s - r)] || a.other)(e), t += " übrig, oder ", !e)throw new Error("MessageFormat: No data passed to function.");
    var n = "CATEGORY", s = e[n], r = 0, a = {"true": function (e) {
        var t = "";
        if (t += "entdecke andere Themen in ", !e)throw new Error("MessageFormat: No data passed to function.");
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
}}), I18n.translations = {de: {js: {dates: {short_date_no_year: "D MMM", short_date: "D. MMM YYYY", long_date: "D. MMMM YYYY, H:mm", tiny: {half_a_minute: "< 1Min", less_than_x_seconds: {one: "< 1s", other: "< %{count}s"}, x_seconds: {one: "1s", other: "%{count}s"}, less_than_x_minutes: {one: "< 1Min", other: "< %{count}Min"}, x_minutes: {one: "1Min", other: "%{count}Min"}, about_x_hours: {one: "1Std", other: "%{count}Std"}, x_days: {one: "1T", other: "%{count}T"}, about_x_months: {one: "1Mon", other: "%{count}Mon"}, x_months: {one: "1Mon", other: "%{count}Mon"}, about_x_years: {one: "1J", other: "%{count}J"}, over_x_years: {one: "> 1J", other: "> %{count}J"}, almost_x_years: {one: "1J", other: "%{count}J"}}, medium: {x_minutes: {one: "1 Minute", other: "%{count} Minuten"}, x_hours: {one: "1 Stunde", other: "%{count} Stunden"}, x_days: {one: "1 Tag", other: "%{count} Tage"}}, medium_with_ago: {x_minutes: {one: "vor einer Minute", other: "vor %{count} Minuten"}, x_hours: {one: "vor eienr Stunde", other: "vor %{count} Stunden"}, x_days: {one: "vor einem Tag", other: "vor %{count} Tagen"}}}, share: {topic: "Teile einen Link zu diesem Thema", post: "Teile einen Link zu diesem Beitrag", close: "Schließen", twitter: "Teile diesen Link auf Twitter", facebook: "Teile diesen Link auf Facebook", "google+": "Teile diesen Link auf Google+", email: "Link per Mail versenden"}, edit: "editiere den Titel und die Kategorie dieses Themas", not_implemented: "Entschuldigung, diese Funktion wurde noch nicht implementiert.", no_value: "Nein", yes_value: "Ja", of_value: "von", generic_error: "Entschuldigung, ein Fehler ist aufgetreten.", log_in: "Anmelden", age: "Alter", last_post: "Letzter Beitrag", admin_title: "Administration", flags_title: "Meldungen", show_more: "zeige mehr", links: "Links", faq: "FAQ", you: "Du", or: "oder", now: "gerade eben", read_more: "weiterlesen", in_n_seconds: {one: "in einer Sekunde", other: "in {{count}} Sekunden"}, in_n_minutes: {one: "in einer Minute", other: "in {{count}} Minuten"}, in_n_hours: {one: "in einer Stunde", other: "in {{count}} Stunden"}, in_n_days: {one: "in einem Tag", other: "in {{count}} Tagen"}, suggested_topics: {title: "Vorgeschlagene Themen"}, bookmarks: {not_logged_in: "Entschuldige, man muss angemeldet sein, um Lesezeichen zu setzen.", created: "Ein Lesezeichen zu diesem Beitrag wurde gesetzt.", not_bookmarked: "Du hast diesen Beitrag gelesen; klicke, um ein Lesezeichen zu setzen.", last_read: "Dies ist der letzte Beitrag, den Du gelesen hast."}, new_topics_inserted: "{{count}} neue Themen.", show_new_topics: "Hier klicken zum Anzeigen.", preview: "Vorschau", cancel: "Abbrechen", save: "Änderungen speichern", saving: "Wird gespeichert...", saved: "Gespeichert!", choose_topic: {none_found: "Keine Themen gefunden.", title: {search: "Suche Thema anhand Name, URL oder ID:", placeholder: "Titel des Themas hier hinschreiben"}}, user_action: {user_posted_topic: "<a href='{{userUrl}}'>{{user}}</a> hast auf <a href='{{topicUrl}}'>das Thema</a> geantwortet", you_posted_topic: "<a href='{{userUrl}}'>Du</a> hast auf <a href='{{topicUrl}}'>das Thema</a> geantwortet", user_replied_to_post: "<a href='{{userUrl}}'>{{user}}</a> hat auf <a href='{{postUrl}}'>{{post_number}}</a> geantwortet", you_replied_to_post: "<a href='{{userUrl}}'>Du</a> hast auf <a href='{{postUrl}}'>{{post_number}}</a> geantwortet", user_replied_to_topic: "<a href='{{userUrl}}'>{{user}}</a> hat auf <a href='{{topicUrl}}'>das Thema</a> geantwortet", you_replied_to_topic: "<a href='{{userUrl}}'>Du</a> hast auf <a href='{{topicUrl}}'>das Thema</a> geantwortet", user_mentioned_user: "<a href='{{user1Url}}'>{{user}}</a> hat <a href='{{user2Url}}'>{{another_user}}</a> erwähnt", user_mentioned_you: "<a href='{{user1Url}}'>{{user}}</a> hat <a href='{{user2Url}}'>dich</a> erwähnt", you_mentioned_user: "<a href='{{user1Url}}'>Du</a> hat <a href='{{user2Url}}'>{{user}}</a> erwähnt", posted_by_user: "Geschrieben von <a href='{{userUrl}}'>{{user}}</a>", posted_by_you: "Geschrieben von <a href='{{userUrl}}'>dir</a>", sent_by_user: "Gesendet von <a href='{{userUrl}}'>{{user}}</a>", sent_by_you: "Gesendet von <a href='{{userUrl}}'>dir</a>"}, user_action_groups: {1: "„Gefällt mir“ erhalten", 2: "„Gefällt mir“ gegeben", 3: "Lesezeichen", 4: "Themen", 5: "Rückmeldungen", 6: "Antworten", 7: "Erwähnungen", 9: "Zitate", 10: "Favoriten", 11: "Bearbeitungen", 12: "Gesendet", 13: "Eingänge"}, user: {profile: "Profil", title: "Benutzer", mute: "Ignorieren", edit: "Einstellungen ändern", download_archive: "Archiv meiner Beiträge herunterladen", private_message: "Private Nachricht", private_messages: "Nachrichten", activity_stream: "Aktivität", preferences: "Einstellungen", bio: "Über mich", invited_by: "Eingeladen von", trust_level: "Stufe", dynamic_favicon: "Zeige eingehende Nachrichten im Favicon", external_links_in_new_tab: "Öffne alle externen Links in neuen Tabs", enable_quoting: "Markierten Text bei Antwort zitieren", moderator: "{{user}} ist Moderator", admin: "{{user}} ist Admin", change_password: {action: "ändern", success: "(Mail gesendet)", in_progress: "(sende Mail)", error: "(Fehler)"}, change_username: {action: "ändern", title: "Benutzername ändern", confirm: "Den Benutzernamen zu ändern kann Konsequenzen nach sich ziehen. Bist Du sicher, dass du fortfahren willst?", taken: "Entschuldige, der Benutzername ist schon vergeben.", error: "Beim Ändern des Benutzernamens ist ein Fehler aufgetreten.", invalid: "Dieser Benutzername ist ungültig, sie dürfen nur aus Zahlen und Buchstaben bestehen."}, change_email: {action: "ändern", title: "Mailadresse ändern", taken: "Entschuldige, diese Mailadresse ist nicht verfügbar.", error: "Beim ändern der Mailadresse ist ein Fehler aufgetreten. Möglicherweise wird diese Adresse schon benutzt.", success: "Eine Bestätigungsmail wurde an diese Adresse verschickt. Bitte folge den darin enthaltenen Anweisungen."}, email: {title: "Mail", instructions: "Deine Mailadresse wird niemals öffentlich angezeigt.", ok: "In Ordnung. Wir schicken eine Mail zur Bestätigung.", invalid: "Bitte gib eine gültige Mailadresse ein.", authenticated: "Dein Mailadresse wurde von {{provider}} authentisiert.", frequency: "Wir mailen nur, falls Du längere Zeit nicht hier gewesen bist und wir etwas Neues für Dich haben."}, name: {title: "Realname", instructions: "Dieser Name muss nicht eindeutig sein, wird nur auf deiner Profilseite angezeigt und ermöglicht alternative @Namens-Erwähnungen.", too_short: "Name zu kurz.", ok: "Der Name ist in Ordnung."}, username: {title: "Benutzername", instructions: "Muss eindeutig sein, keine Leerzeichen. Andere können Dich mit @{{username}} erwähnen.", short_instructions: "Andere können Dich mit @{{username}} erwähnen.", available: "Dein Benutzername ist verfügbar.", global_match: "Die Mailadresse passt zum registrierten Benutzernamen.", global_mismatch: "Schon registriert. Wie wäre es mit {{suggestion}}?", not_available: "Nicht verfügbar. Wie wäre es mit {{suggestion}}?", too_short: "Der Benutzername ist zu kurz.", too_long: "Der Benutzername ist zu lang.", checking: "Prüfe Verfügbarkeit des Benutzernamens...", enter_email: "Benutzername gefunden. Gib die zugehörige Mailadresse ein."}, password_confirmation: {title: "Passwort wiederholen"}, last_posted: "Letzter Beitrag", last_emailed: "Letzte Mail", last_seen: "Zuletzt gesehen", created: "Mitglied seit", log_out: "Abmelden", website: "Webseite", email_settings: "Mail", email_digests: {title: "Schicke eine Mail mit Neuigkeiten, wenn ich die Seite länger nicht besuche", daily: "täglich", weekly: "wöchentlich", bi_weekly: "all zwei Wochen"}, email_direct: "Schicke eine Mail, wenn jemand mich zitiert, auf meine Beiträge antwortet oder meinen @Namen erwähnt.", email_private_messages: "Schicke eine Mail, wenn jemand mir eine private Nachricht sendet.", other_settings: "Sonstiges", new_topic_duration: {label: "Betrachte Themen als neu, wenn", not_viewed: "ich sie noch nicht gelesen habe", last_here: "sie seit meiner letzten Anmeldung erstellt wurden", after_n_days: {one: "sie gestern erstellt wurden", other: "sie in den letzten {{count}} Tagen erstellt wurden"}, after_n_weeks: {one: "sie letzte Woche erstellt wurden", other: "they die letzten {{count}} Wochen erstellt wurden"}}, auto_track_topics: "Automatisch Themen folgen, die ich erstellt habe", auto_track_options: {never: "niemals", always: "immer", after_n_seconds: {one: "nach 1 Sekunde", other: "nach {{count}} Sekunden"}, after_n_minutes: {one: "nach 1 Minute", other: "nach {{count}} Minuten"}}, invited: {title: "Einladungen", user: "Eingeladene Benutzer", none: "{{username}} hat keine Nutzer eingeladen.", redeemed: "Angenommene Einladungen", redeemed_at: "Angenommen vor", pending: "Offene Einladungen", topics_entered: "Beigesteuerte Themen", posts_read_count: "Gelesene Beiträge", rescind: "Einladung zurücknehmen", rescinded: "Einladung zurückgenommen", time_read: "Lesezeit", days_visited: "Tage der Anwesenheit", account_age_days: "Alter des Nutzerkontos in Tagen"}, password: {title: "Passwort", too_short: "Dein Passwort ist zu kurz.", ok: "Dein Passwort ist in Ordnung."}, ip_address: {title: "Letzte IP-Adresse"}, avatar: {title: "Avatar", instructions: "Wir nutzen <a href='https://gravatar.com' target='_blank'>Gravatar</a> zur Darstellung von Avataren basierend auf deiner Mailadresse:"}, filters: {all: "Alle"}, stream: {posted_by: "Gepostet von", sent_by: "Gesendet von", private_message: "Private Nachricht", the_topic: "Das Thema"}}, loading: "Lädt...", close: "Schließen", learn_more: "Erfahre mehr...", year: "Jahr(e)", year_desc: "Beigesteuerte Themen der letzten 365 Tage", month: "Monat(e)", month_desc: "Beigesteuerte Themen der letzten 30 Tage", week: "Woche(n)", week_desc: "Beigesteuerte Themen der letzten 7 Tage", first_post: "Erster Beitrag", mute: "Ignorieren", unmute: "Wieder beachten", best_of: {title: "Top Beiträge", enabled_description: "Du siehst gerade die Top Beiträge dieses Themas.", description: "Es gibt <b>{{count}}</b> Beiträge zu diesem Thema. Das sind eine Menge! Möchtest Du Zeit sparen und nur die Beiträge mit den meisten Antworten und Nutzerreaktionen betrachten?", enable: "Nur die Top Beiträge anzeigen", disable: "Alle Beiträge anzeigen"}, private_message_info: {title: "Privates Gespräch", invite: "Andere einladen..."}, email: "Mail", username: "Benutzername", last_seen: "Zuletzt gesehen", created: "Erstellt", trust_level: "Stufe", create_account: {title: "Konto erstellen", action: "Jetzt erstellen!", invite: "Hast Du schon ein Benutzerkonto?", failed: 'Etwas ist schief gelaufen, vielleicht gibt es die Mailadresse schon. Versuche den "Passwort vergessen"-Link.'}, forgot_password: {title: "Passwort vergessen", action: "Ich habe mein Passwort vergessen", invite: "Gib deinen Nutzernamen ein und wir schicken Dir eine Mail zum Zurücksetzen des Passworts.", reset: "Passwort zurücksetzen", complete: "Du solltest bald eine Mail mit Instruktionen zum Zurücksetzen des Passworts erhalten."}, login: {title: "Anmelden", username: "Login", password: "Passwort", email_placeholder: "Mailadresse oder Benutzername", error: "Unbekannter Fehler", reset_password: "Passwort zurücksetzen", logging_in: "Anmeldung läuft...", or: "oder", authenticating: "Authentisiere...", awaiting_confirmation: 'Dein Konto ist noch nicht aktiviert. Benutze den "Passwort vergesse"-Link um eine neue Aktivierungsmail zu erhalten.', awaiting_approval: "Dein Konto wurde noch nicht von einem Moderator bewilligt. Du bekommst eine Mail, sobald das geschehen ist.", not_activated: "Du kannst Dich noch nicht anmelden. Wir haben Dir kürzlich eine Aktivierungsmail an <b>{{sentTo}}</b> geschickt. Bitte folge den Anweisungen darin, um dein Konto zu aktivieren.", resend_activation_email: "Klick hier, um ein neue Aktivierungsmail zu erhalten.", sent_activation_email_again: "Wir haben noch eine Aktivierungsmail an <b>{{currentEmail}}</b> verschickt. Es kann einige Minuten dauern, bis sie ankommt. Im Zweifel schaue auch im Spam-Ordner nach.", google: {title: "Mit Google", message: "Authentisierung via Google (stelle sicher, dass der Popup-Blocker deaktiviert ist)"}, twitter: {title: "Mit Twitter", message: "Authentisierung via Twitter (stelle sicher, dass der Popup-Blocker deaktiviert ist)"}, facebook: {title: "Mit Facebook", message: "Authentisierung via Facebook (stelle sicher, dass der Popup-Blocker deaktiviert ist)"}, cas: {title: "Mit CAS", message: "Authentisierung via CAS (stelle sicher, dass der Popup-Blocker deaktiviert ist)"}, yahoo: {title: "Mit Yahoo", message: "Authentisierung via Yahoo (stelle sicher, dass der Popup-Blocker deaktiviert ist)"}, github: {title: "Mit GitHub", message: "Authentisierung via GitHub (stelle sicher, dass der Popup-Blocker deaktiviert ist)"}, persona: {title: "Mit Persona", message: "Authentisierung via Mozilla Persona (stelle sicher, dass der Popup-Blocker deaktiviert ist)"}}, composer: {posting_not_on_topic: 'Du antwortest auf das Thema "{{title}}", betrachtest gerade aber ein anderes Thema.', saving_draft_tip: "speichert", saved_draft_tip: "gespeichert", saved_local_draft_tip: "lokal gespeichert", similar_topics: "Dein Thema ähnelt...", drafts_offline: "Entwürfe offline", min_length: {need_more_for_title: "{{n}} fehlen im Titel noch", need_more_for_reply: "{{n}} fehlen in der Antwort noch"}, error: {title_missing: "Der Title fehlt.", title_too_short: "Title muss mindestens {{min}} Zeichen lang sein.", title_too_long: "Title weniger als {{max}} Zeichen lang sein.", post_missing: "Der Beitrag fehlt.", post_length: "Der Beitrag muss mindestens {{min}} Zeichen lang sein.", category_missing: "Du musst eine Kategorie auswählen."}, save_edit: "Änderungen speichern", reply_original: "Auf das Originalthema antworten", reply_here: "Hier antworten", reply: "Antworten", cancel: "Abbrechen", create_topic: "Thema erstellen", create_pm: "Private Nachricht erstellen", users_placeholder: "Nutzer hinzufügen", title_placeholder: "Gib hier den Titel ein. In einem Satz: Worum geht es?", reply_placeholder: "Gib hier deine Antwort ein. Benutze Markdown oder BBCode zur Textformatierung. Um ein Bild einzufügen ziehe es hierhin oder füge es per Tastenkombination ein.", view_new_post: "Betrachte deinen neuen Beitrag.", saving: "Speichert...", saved: "Gespeichert!", saved_draft: "Du hast angefangen, einen Beitrag zu schreiben. Klick irgendwo, um fortzufahren.", uploading: "Hochladen...", show_preview: "Vorschau einblenden &raquo;", hide_preview: "&laquo; Vorschau ausblenden", quote_post_title: "Beitrag zitieren", bold_title: "Fett", bold_text: "fetter Text", italic_title: "Kursiv", italic_text: "kursiver Text", link_title: "Link", link_description: "Gib hier eine Beschreibung zum Link ein", link_dialog_title: "Link einfügen", link_optional_text: "optionaler Titel", quote_title: "Zitat", quote_text: "Zitat", code_title: "Code", code_text: "Gib hier den Code ein", image_title: "Bild", image_description: "Gib hier eine Bildbeschreibung ein", image_dialog_title: "Bild einfügen", image_optional_text: "optionaler Titel", image_hosting_hint: "Benötigst Du <a href='http://www.google.com/search?q=kostenlos+bilder+hosten' target='_blank'>kostenlosen Dienst für Bilder?</a>", olist_title: "Nummerierte Liste", ulist_title: "Aufzählung", list_item: "Listeneintrag", heading_title: "Überschrift", heading_text: "Überschrift", hr_title: "Horizontale Linie", undo_title: "Rückgängig machen", redo_title: "Wiederherstellen", help: "Hilfe zu Markdown", toggler: "Verstecke oder Zeige den Editor", admin_options_title: "Optionale Admin Einstellungen für das Thema", auto_close_label: "Schlisse das Thema automatisch nach:", auto_close_units: "Tage"}, notifications: {title: "Benachrichtigung über @Name-Erwähnungen, Antworten auf deine Themen und Beiträge, Private Nachrichten, etc.", none: "Du hast aktuell keine Benachrichtiungen.", more: "Zeige frühere Benachrichtigungen", mentioned: "<span title='mentioned' class='icon'>@</span> {{username}} {{link}}", quoted: "<i title='quoted' class='icon icon-quote-right'></i> {{username}} {{link}}", replied: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", posted: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", edited: "<i title='edited' class='icon icon-pencil'></i> {{username}} {{link}}", liked: "<i title='liked' class='icon icon-heart'></i> {{username}} {{link}}", private_message: "<i class='icon icon-envelope-alt' title='private message'></i> {{username}} hat Dir eine private Nachricht geschickt: {{link}}", invited_to_private_message: "<i class='icon icon-envelope-alt' title='private message'></i> {{username}} hat sich zu einem privaten Gespräch eingeladen: {{link}}", invitee_accepted: "<i title='accepted your invitation' class='icon icon-signin'></i> {{username}} hat deine Einladung akzeptiert", moved_post: "<i title='moved post' class='icon icon-arrow-right'></i> {{username}} hat einen Beitrag nach {{link}} verschoben", total_flagged: "total markierte Einträge"}, image_selector: {title: "Bild einfügen", from_my_computer: "von meinem Gerät", from_the_web: "aus dem Web", add_image: "Bild hinzufügen", remote_title: "Entferntes Bild", remote_tip: "Gib die Adresse eines Bildes wie folgt ein: http://example.com/image.jpg", local_title: "Lokales Bild", local_tip: "Klicke hier, um ein Bild von deinem Gerät zu wählen.", upload: "Hochladen", uploading_image: "Bild wird hochgeladen"}, search: {title: "Such nach Themen, Beiträgen, Nutzern oder Kategorien", placeholder: "Gib hier deine Suchbegriffe ein", no_results: "Nichts gefunden.", searching: "Suche ...", prefer: {user: "Die Suche bevorzugt Resultate von @{{username}}", category: "Die Suche bevorzugt Resultate in der Kategorie {{category}}"}}, site_map: "Gehe zu einer anderen Themenübersicht oder Kategorie", go_back: "Zurück", current_user: "Gehe zu deinem Nutzerprofil", favorite: {title: "Favoriten", help: {star: "Füge dieses Thema deinen Favoriten hinzu", unstar: "Entferne dieses Thema aus deinen Favoriten"}}, topics: {none: {favorited: "Du hast noch keine Themen favorisierst. Um ein Thema zu favorisieren, klicke auf den Stern neben dem Titel.", unread: "Du hast alle Themen gelesen.", "new": "Es gibt für dich keine neuen Themen.", read: "Du hast bislang keine Themen gelesen.", posted: "Du hast bislang keine Beiträge erstellt.", latest: "Es gibt keine Themen. Wie traurig.", hot: "Es gibt keine beliebten Themen.", category: "Es gibt keine Themen der Kategorie {{category}}."}, bottom: {latest: "Das waren die aktuellen Themen.", hot: "Das waren alle beliebten Themen.", posted: "Das waren alle Themen.", read: "Das waren alle gelesenen Themen.", "new": "Das waren alle neuen Themen.", unread: "Das waren alle ungelesen Themen.", favorited: "Das waren alle favorisierten Themen.", category: "Das waren alle Themen der Kategorie {{category}}."}}, rank_details: {toggle: "Themadetails", show: "zeige Themadetails", title: "Themadetails"}, topic: {create_in: "Neues Thema in {{categoryName}}", create: "Neues Thema", create_long: "Neues Thema beginnen", private_message: "Beginne ein privates Gespräch", list: "Themen", "new": "Neues Thema", title: "Thema", loading_more: "Lade weitere Themen...", loading: "Lade Thema...", invalid_access: {title: "Privates Thema", description: "Entschuldige, du hast keinen Zugriff auf dieses Thema."}, server_error: {title: "Thema konnte nicht geladen werden", description: "Entschuldige, wir konnten das Thema nicht laden, wahrscheinlich aufgrund eines Verbindungsproblems. Bitte versuche es noch mal. Wenn das Problem bestehen bleibt, lass es uns wissen."}, not_found: {title: "Thema nicht gefunden", description: "Entschuldige, wir konnten das Thema nicht finden. Möglicherweise wurde es von einem Moderator entfernt."}, unread_posts: "Du hast {{unread}} ungelesene Beiträge zu diesem Thema", new_posts: "Es gibt {{new_posts}} neue Beiträge zu diesem Thema seit Du es das letzte mal gelesen hast", likes: {one: "Es gibt ein „Gefällt mir“ in diesem Thema", other: "Es gibt {{count}} „Gefällt mir“ in diesem Thema"}, back_to_list: "Zurück zur Themenübersicht", options: "Themenoptionen", show_links: "Zeige Links in diesem Thema", toggle_information: "Themendetails ein-/ausblenden", read_more_in_category: "Möchtest Du mehr lesen? Finde andere Themen in {{catLink}} oder {{latestLink}}.", read_more: "Möchtest Du mehr lesen? {{catLink}} oder {{latestLink}}.", browse_all_categories: "Zeige alle Kategorien", view_latest_topics: "zeige aktuelle Themen", suggest_create_topic: "Fang ein neues Thema an!", read_position_reset: "Deine Leseposition wurde zurückgesetzt.", jump_reply_up: "Springe zur vorigen Antwort", jump_reply_down: "Springe zur folgenden Antwort", deleted: "Das Thema wurde gelöscht", auto_close_notice: "Dieses Thema wird in %{timeLeft} automatisch geschlossen.", auto_close_title: "Automatisches Schliessen", auto_close_save: "Speichern", auto_close_cancel: "Abbrechen", auto_close_remove: "Dieses Thema nicht automatisch schließen", progress: {title: "Themenfortschritt", jump_top: "Springe zum ersten Beitrag", jump_bottom: "Springe zum letzten Beitrag", total: "Anzahl der Beiträge", current: "Aktueller Beitrag"}, notifications: {title: "", reasons: {"3_2": "Du wirst Benachrichtigungen erhalten, da Du dieses Thema beobachtest.", "3_1": "Du wirst Benachrichtigungen erhalten, da Du dieses Thema erstellt hast.", 3: "Du wirst Benachrichtigungen erhalten, da Du dieses Thema beobachtest.", "2_4": "Du wirst Benachrichtigungen erhalten, da Du auf dieses Thema geantwortet hast.", "2_2": "Du wirst Benachrichtigungen erhalten, da Du dieses Thema verfolgst.", 2: 'Du wirst Benachrichtigungen erhalten, da Du <a href="/users/{{username}}/preferences">dieses Thema beobachtest</a>.', 1: "Du wirst nur benachrichtigt, wenn jemand deinen @Namen erwähnt oder auf einen deiner Beiträge antwortet.", "1_2": "Du wirst nur benachrichtigt, wenn jemand deinen @Namen erwähnt oder auf einen deiner Beiträge antwortet.", 0: "Du ignorierst alle Benachrichtigungen dieses Themas.", "0_2": "Du ignorierst alle Benachrichtigungen dieses Themas."}, watching: {title: "Beobachten", description: "Wie 'Verfolgen', zuzüglich Benachrichtigungen über neue Beiträge."}, tracking: {title: "Verfolgen", description: "Du wirst über ungelesene Beiträge, Erwähnungen deines @Namens oder Antworten auf deine Beiträge benachrichtigt."}, regular: {title: "Normal", description: "Du wirst nur dann benachrichtigt, wenn jemand deinen @Namen erwähnt oder auf deine Beiträge antwortet."}, muted: {title: "Ignorieren", description: "Du erhältst keine Benachrichtigungen im Zusammenhang mit diesem Thema und es wird nicht in deiner Liste ungelesener Themen auftauchen."}}, actions: {"delete": "Thema löschen", open: "Thema öffnen", close: "Thema schließen", auto_close: "Automatisch schließen", unpin: "Pin entfernen", pin: "Pin setzen", unarchive: "Aus dem Archiv holen", archive: "Thema archivieren", invisible: "Unsichtbar machen", visible: "Sichtbar machen", reset_read: "Ungelesen machen", multi_select: "Mehrfachauswahl umschalten", convert_to_topic: "Zu normalem Thema machen"}, reply: {title: "Antworten", help: "Eine Antwort zu diesem Thema abgeben"}, clear_pin: {title: "Pin entfernen", help: "Den Pin dieses Themas entfernen, so dass es nicht länger am Anfang der Themenliste steht."}, share: {title: "Teilen", help: "Teile einen Link zu diesem Thema"}, inviting: "Einladung verschicken...", invite_private: {title: "Zu privatem Gespräch einladen", email_or_username: "Einzuladender Nutzer", email_or_username_placeholder: "Mailadresse oder Benutzername", action: "Einladen", success: "Danke! Wir haben den Benutzer eingeladen, an diesem privaten Gespräch teilzunehmen.", error: "Entschuldige, es gab einen Fehler beim Einladen des Benutzers."}, invite_reply: {title: "Freunde zum Gespräch einladen", action: "Einladung senden", help: "Sendet Freunden eine Einladung, so dass mit einem Klick auf dieses Thema antworten können.", email: "Wir schicken deiner Freundin / deinem Freund eine kurze Mail, die es mit einem Klick erlaubt, auf dieses Thema zu antworten.", email_placeholder: "Mailadresse", success: "Danke! Wir haben deine Einladung an <b>{{email}}</b> verschickt. Wir lassen Dich wissen, sobald die Einladung eingelöst wird. In deinem Nutzerprofil kannst Du alle deine Einladungen überwachen.", error: "Entschuldige, wir konnten diese Person nicht einladen. Vielleicht ist sie schon ein Nutzer?"}, login_reply: "Anmelden, um zu antworten", filters: {user: "Du betrachtest nur {{n_posts}} {{by_n_users}}.", n_posts: {one: "einen Beitrag", other: "{{count}} Beiträge"}, by_n_users: {one: "von einem Benutzer", other: "von {{count}} Benutzern"}, best_of: "Du betrachtest {{n_best_posts}} {{of_n_posts}}.", n_best_posts: {one: "den besten Beitrag", other: "{{count}} besten Beiträge"}, of_n_posts: {one: "von einem Thema", other: "von {{count}} Themen"}, cancel: "Zeige wieder alle Beiträge zu diesem Thema."}, split_topic: {title: "Ausgewählte Beiträge verschieben", action: "Thema aufteilen", topic_name: "Neues Thema:", error: "Entschuldige, es gab einen Fehler beim Verschieben der Beiträge.", instructions: {one: "Du bist dabei, ein neues Thema zu erstellen und den ausgewählten Beitrag dorthin zu verschieben.", other: "Du bist dabei, ein neues Thema zu erstellen und die <b>{{count}}</b> ausgewählten Beiträge dorthin zu verschieben."}}, merge_topic: {title: "Themes zusammenführen", action: 'Themes zusammenführen"', error: "Beim Zusammenführen der Themen ist ein Fehler passiert.", instructions: {one: "Bitte wähle das Thema in welches du den Beitrag verschieben möchtest.", other: "Bitte wähle das Thema in welches du die <b>{{count}}</b> Beiträge verschieben möchtest."}}, multi_select: {select: "Ausgewählt", selected: "Ausgewählt ({{count}})", "delete": "Auswahl löschen", cancel: "Auswahl aufheben", description: {one: "Du hast <b>1</b> Beitrag ausgewählt.", other: "Du hast <b>{{count}}</b> Beiträge ausgewählt."}}}, post: {reply: "Auf {{link}} von {{replyAvatar}} {{username}} antworten", reply_topic: "Auf {{link}} antworten", quote_reply: "Antwort zitieren", edit: "Editing {{link}} von {{replyAvatar}} {{username}}", post_number: "Beitrag {{number}}", in_reply_to: "Antwort auf", reply_as_new_topic: "Mit Themenwechsel antworten", continue_discussion: "Fortsetzung des Gesprächs {{postLink}}:", follow_quote: "Springe zu zitiertem Beitrag", deleted_by_author: "(Beitrag vom Autor entfernt)", expand_collapse: "mehr/weniger", has_replies: {one: "Antwort", other: "Antworten"}, errors: {create: "Entschuldige, es gab einen Fehler beim Anlegen des Beitrags. Bitte versuche es noch einmal.", edit: "Entschuldige, es gab einen Fehler beim Bearbeiten des Beitrags. Bitte versuche es noch einmal.", upload: "Entschuldige, es gab einen Fehler beim Hochladen der Datei. Bitte versuche es noch einmal.", upload_too_large: "Entschuldige, die Datei die du hochladen wolltest ist zu groß (Maximalgröße {{max_size_kb}}kb), bitte reduziere die Dateigröße und versuche es nochmal.", upload_too_many_images: "Entschuldige, du kannst nur ein Bild gleichzeitig hochladen.", only_images_are_supported: "Entschuldige, du kannst nur Bilder hochladen."}, abandon: "Willst Du diesen Beitrag wirklich verwerfen?", archetypes: {save: "Speicheroptionen"}, controls: {reply: "Fange eine Antwort auf diesen Beitrag an", like: "Dieser Beitrag gefällt mir", edit: "Diesen Beitrag bearbeiten", flag: "Diesen Beitrag den Moderatoren melden", "delete": "Diesen Beitrag löschen", undelete: "Diesen Beitrag wiederherstellen", share: "Link zu diesem Beitrag teilen", bookmark: "Lesezeichen zu diesem Beitrag auf meiner Nutzerseite setzen", more: "Mehr"}, actions: {flag: "Melden", clear_flags: {one: "Meldung annullieren", other: "Meldungen annullieren"}, it_too: {off_topic: "Melde es auch", spam: "Melde es auch", inappropriate: "Melde es auch", custom_flag: "Melde es auch", bookmark: "Lesezeichen auch setzen", like: "Gefällt mir auch", vote: "Stimme auch dafür"}, undo: {off_topic: "Meldung widerrufen", spam: 'Meldung widerrufen"', inappropriate: "Meldung widerrufen", bookmark: "Lesezeichen entfernen", like: "Gefällt mir nicht mehr", vote: "Stimme wiederrufen"}, people: {off_topic: "{{icons}} haben es als am Thema vorbei gemeldet", spam: "{{icons}} haben es als Werbung gemeldet", inappropriate: "{{icons}} haben es als Unangemessen gemeldet", notify_moderators: "{{icons}} haben es den Moderatoren gemeldet", notify_moderators_with_url: "{{icons}} <a href='{{postUrl}}'>haben es den Moderatoren gemeldet</a>", notify_user: "{{icons}} haben eine private Nachricht gesendet", notify_user_with_url: "{{icons}} haben eine  <a href='{{postUrl}}'>private Nachricht</a> gesendet", bookmark: "{{icons}} haben dies als Lesezeichen", like: "{{icons}} gefällt dies", vote: "{{icons}} haben dafür gestimmt"}, by_you: {off_topic: "Du hast das als am Thema vorbei gemeldet", spam: "Du hast das als Werbung gemeldet", inappropriate: "Du hast das als Unangemessen gemeldet", notify_moderators: "Du hast dies den Moderatoren gemeldet", notify_user: "Du hast diesem Benutzer eine private Nachricht gesendet", bookmark: "Du hast bei diesem Beitrag ein Lesezeichen gesetzt", like: "Gefällt dir", vote: "Du hast dafür gestimmt"}, by_you_and_others: {off_topic: {one: "Du und eine weitere Person haben das als am Thema vorbei gemeldet", other: 'Du und {{count}} weitere Personen haben das als am Thema vorbei gemeldet"'}, spam: {one: "Du und eine weitere Person haben das als Werbung gemeldet", other: "Du und {{count}} weitere Personen haben das als Werbung gemeldet"}, inappropriate: {one: "Du und eine weitere Person haben das als Unangemessen gemeldet", other: "Du und {{count}} weitere Personen haben das als Unangemessen gemeldet"}, notify_moderators: {one: "Du und eine weitere Person haben dies den Moderatoren gemeldet", other: "Du und {{count}} weitere Personen haben dies den Moderatoren gemeldet"}, notify_user: {one: "Du und eine weitere Person haben diesem Benutzer eine private Nachricht gesendet", other: "Du und {{count}} weitere Personen haben diesem Benutzer eine private Nachricht gesendet"}, bookmark: {one: "Du und eine weitere Person haben bei diesen Beitrag ein Lesezeichen gesetzt", other: "Du und {{count}} weitere Personen haben bei diesen Beitrag ein Lesezeichen gesetzt"}, like: {one: "Dir und einer weitere Person gefällt dieser Beitrag", other: "Dir und {{count}} weitere Personen haben gefällt dieser Beitrag"}, vote: {one: "Du und eine weitere Person haben für diesen Beitrag gestimmt", other: "Du und {{count}} weitere Personen haben für diesen Beitrag gestimmt"}}, by_others: {off_topic: {one: "Eine Person hat das als am Thema vorbei gemeldet", other: "{{count}} Personen haben das als am Thema vorbei gemeldet"}, spam: {one: "Eine Person hat das als Werbung gemeldet", other: "{{count}} Personen haben das als Werbung gemeldet"}, inappropriate: {one: "Eine Person hat das als Unangemessen gemeldet", other: "{{count}} Personen haben das als Unangemessen gemeldet"}, notify_moderators: {one: "Eine Person hat dies den Moderatoren gemeldet", other: "{{count}} Personen haben dies den Moderatoren gemeldet"}, notify_user: {one: "Eine Person hat diesem Benutzer eine private Nachricht gesendet", other: "{{count}} Personen haben diesem Benutzer eine private Nachricht gesendet"}, bookmark: {one: "Eine Person hat bei diesen Beitrag ein Lesezeichen gesetzt", other: "{{count}} Personen haben bei diesen Beitrag ein Lesezeichen gesetzt"}, like: {one: "Einer Person gefällt dies", other: "{{count}} Personen gefällt dies"}, vote: {one: "Eine Person hat für den Beitrag gestimmt", other: "{{count}} Personen haben für den Beitrag gestimmt"}}}, edits: {one: "1 Bearbeitung", other: "{{count}} Bearbeitungen", zero: "Keine Bearbeitungen"}, "delete": {confirm: {one: "Bist Du sicher, dass Du diesen Beitrag löschen willst?", other: "Bist Du sicher, dass Du all diesen Beiträge löschen willst?"}}}, category: {none: "(keine Kategorie)", edit: "Bearbeiten", edit_long: "Kategorie bearbeiten", edit_uncategorized: "Unkategorisierte bearbeiten", view: "Zeige Themen dieser Kategorie", general: "Generell", settings: "Einstellungen", "delete": "Kategorie löschen", create: "Neue Kategorie", save: "Kategorie speichern", creation_error: "Beim Erzeugen der Kategorie ist ein Fehler aufgetreten.", save_error: "Beim Speichern der Kategorie ist ein Fehler aufgetreten.", more_posts: "Zeige alle {{posts}}...", name: "Name der Kategorie", description: "Beschreibung", topic: "Kategorie des Themas", badge_colors: "Plakettenfarben", background_color: "Hintergrundfarbe", foreground_color: "Vordergrundfarbe", name_placeholder: "Sollte kurz und knapp sein.", color_placeholder: "Irgendeine Webfarbe", delete_confirm: "Bist Du sicher, dass Du diese Kategorie löschen willst?", delete_error: "Beim Löschen der Kategorie ist ein Fehler aufgetreten.", list: "Kategorien auflisten", no_description: "Es gibt keine Beschreibung zu dieser Kategorie.", change_in_category_topic: "Besuche die Themen dieser Kategorie um einen Eindruck für eine gute Beschreibung zu gewinnen.", hotness: "Beliebtheit", already_used: "Diese Farbe wird bereits für eine andere Kategorie verwendet", is_secure: "Sichere Kategorie?", add_group: "Gruppe hinzufügen", security: "Sicherheit", allowed_groups: "Erlaubte Gruppen:", auto_close_label: "Thema automatisch schließen nach:"}, flagging: {title: "Aus welchem Grund meldest Du diesen Beitrag?", action: "Beitrag melden", take_action: "Reagieren", notify_action: "Melden", cant: "Entschuldige, Du kannst diesen Beitrag augenblicklich nicht melden.", custom_placeholder_notify_user: "Weshalb erfordert der Beitrag, dass du den Benutzer direkt und privat kontaktieren möchtest? Sei spezifisch, konstruktiv und immer freundlich.", custom_placeholder_notify_moderators: "Warum soll ein Moderator sich diesen Beitrag ansehen? Bitte lass uns wissen, was genau Dich beunruhigt, und wenn möglich dafür relevante Links.", custom_message: {at_least: "Gib mindestens {{n}} Zeichen ein", more: "{{n}} weitere...", left: "{{n}} übrig"}}, topic_summary: {title: "Zusammenfassung des Themas", links_shown: "Zeige alle {{totalLinks}} Links...", clicks: "Klicks", topic_link: "Themen Links"}, topic_statuses: {locked: {help: "Dieses Thema ist geschlossen; Antworten werde nicht länger angenommen"}, pinned: {help: "Dieses Thema ist angepinnt; es wird immer am Anfang seiner Kategorie auftauchen"}, archived: {help: "Dieses Thema ist archiviert; es ist eingefroren und kann nicht mehr geändert werden"}, invisible: {help: "Dieses Thema ist unsichtbar; es wird in keiner Themenliste angezeigt und kann nur über den Link betrachtet werden"}}, posts: "Beiträge", posts_long: "{{number}} Beiträge zu diesem Thema", original_post: "Originaler Beitrag", views: "Aufrufe", replies: "Antworten", views_long: "Dieses Thema wurde {{number}} aufgerufen", activity: "Aktivität", likes: "Gefällt mir", top_contributors: "Teilnehmer", category_title: "Kategorie", history: "Verlauf", changed_by: "durch {{author}}", categories_list: "Liste der Kategorien", filters: {latest: {title: "Aktuell", help: "Die zuletzt geänderten Themen"}, hot: {title: "Beliebt", help: "Auswahl der beliebten Themen"}, favorited: {title: "Favorisiert", help: "Themen, die Du als Favoriten markiert hast"}, read: {title: "Gelesen", help: "Themen, die Du gelesen hast"}, categories: {title: "Kategorien", title_in: "Kategorie - {{categoryName}}", help: "Alle Themen, gruppiert nach Kategorie"}, unread: {title: {zero: "Ungelesen", one: "Ungelesen (1)", other: "Ungelesen ({{count}})"}, help: "Verfolgte Themen mit ungelesenen Beiträgen"}, "new": {title: {zero: "Neu", one: "Neu (1)", other: "Neu ({{count}})"}, help: "Neue Themen seit deinem letzten Besuch"}, posted: {title: "Deine Beiträge", help: "Themen zu denen Du beigetragen hast"}, category: {title: {zero: "{{categoryName}}", one: "{{categoryName}} (1)", other: "{{categoryName}} ({{count}})"}, help: "Aktuelle Themen in der Kategorie {{categoryName}}"}}, browser_update: '<a href="http://www.discourse.org/faq/#browser">Dein Webbrowser ist leider zu alt um dieses Forum zu besuchen</a>. Bitte <a href="http://browsehappy.com">installiere einen neueren Browser</a>.', type_to_filter: "Tippe etwas ein, um zu filtern...", admin: {title: "Discourse Administrator", moderator: "Moderator", dashboard: {title: "Übersicht", version: "Version", up_to_date: "Discourse ist aktuell.", critical_available: "Ein kritisches Update ist verfügbar.", updates_available: "Updates sind verfügbar.", please_upgrade: "Bitte updaten!", installed_version: "Installiert", latest_version: "Jüngste", problems_found: "Es gibt Probleme mit deiner Discourse-Installation:", last_checked: "Zuletzt geprüft", refresh_problems: "Neu Laden", no_problems: "Keine Probleme gefunden.", moderators: "Moderatoren:", admins: "Administratoren:", blocked: "Gesperrt:", private_messages_short: "PNs", private_messages_title: "Private Nachrichten", reports: {today: "Heute", yesterday: "Gestern", last_7_days: "Die letzten 7 Tage", last_30_days: "Die letzten 30 Tage", all_time: "Bis heute", "7_days_ago": "Vor 7 Tagen", "30_days_ago": "Vor 30 Tagen", all: "Alle", view_table: "Als Tabelle anzeigen", view_chart: "Als Balkendiagramm anzeigen"}}, commits: {latest_changes: "Letzte Änderungen: bitte häufig updaten!", by: "durch"}, flags: {title: "Meldungen", old: "Alt", active: "Aktiv", clear: "Meldungen annullieren", clear_title: "Verwerfe alle Meldungen über diesen Beitrag (blendet verstecke Beiträge ein)", "delete": "Beitrag löschen", delete_title: "Beitrag löschen (löscht Thema, wenn es der erste Beitrag ist)", flagged_by: "Gemeldet von", error: "Etwas ist schief gelaufen", view_message: "Nachricht zeigen", no_results: "Es gibt keine Meldungen."}, groups: {title: "Gruppen", edit: "Gruppen bearbeiten", selector_placeholder: "Benutzer hinzufügen", name_placeholder: "Gruppenname, keine Leerzeichen, gleiche Regel wie beim Benutzernamen"}, api: {title: "API", long_title: "API Information", key: "Schlüssel", generate: "API Schlüssel generieren", regenerate: "API Schlüssel neu generieren", info_html: "Dein API Schlüssel erlaubt Dir das Erstellen und Bearbeiten von Themen via JSON aufrufen.", note_html: "Behalte deinen <strong>Schlüssel</strong> geheim, jeder Benutzer mit diesem Schlüssel kann beliebige Beiträge unter jedem Benutzer im Forum erstellen."}, customize: {title: "Personalisieren", long_title: "Seite personalisieren", header: "Header", css: "Stylesheet", override_default: "Standard überschreiben?", enabled: "Aktiviert?", preview: "Vorschau", undo_preview: "Vorschau rückgängig machen", save: "Speichern", "new": "Neu", new_style: "Neuer Stil", "delete": "Löschen", delete_confirm: "Diese Anpassung löschen?", about: "Seite personalisieren erlaubt dir das Anpassen der Stilvorlagen und des Kopfbereich der Seite. Wähle oder füge eine Anpassung hinzu um mit dem Editieren zu beginnen."}, email: {title: "Mailprotokoll", settings: "Einstellungen", logs: "Protokolle", sent_at: "Gesendet am", email_type: "Mailtyp", to_address: "Empfänger", test_email_address: "Mailadresse zum Testen", send_test: "Testmail senden", sent_test: "Gesendet!", delivery_method: "Versandmethode", preview_digest: "Vorschau der Übersicht", refresh: "Aktualisieren", format: "Format", html: "html", text: "text", last_seen_user: "Letzer Benutzer:"}, impersonate: {title: "Aus Nutzersicht betrachten", username_or_email: "Benutzername oder Mailadresse des Nutzers", help: "Benutze dieses Werkzeug, um zur Fehlersuche in die Rolle eines Nutzers zu schlüpfen.", not_found: "Der Nutzer wurde nicht gefunden.", invalid: "Entschuldige, du kannst nicht in die Rolle dieses Nutzers schlüpfen."}, users: {title: "Benutzer", create: "Administrator hinzufügen", last_emailed: "Letzte Mail", not_found: "Entschuldige, dieser Benutzername existiert im System nicht.", "new": "Neu", active: "Aktiv", pending: "Unerledigt", approved: "Zugelassen?", approved_selected: {one: "Benutzer zulassen", other: "Benutzer zulassen ({{count}})"}, titles: {active: "Aktive Benutzer", "new": "Neue Benutzer", pending: "Nicht freigeschaltete Benutzer", newuser: "Benutzer mit Vertrauensstufe 0 (Frischling)'", basic: "Benutzer mit Vertrauensstufe 1 (Anfänger)", regular: "Benutzer mit Vertrauensstufe 2 (Stammnutzer)", leader: "Benutzer mit Vertrauensstufe 3 (Anführer)", elder: "Benutzer mit Vertrauensstufe 4 (Ältester)", admins: "Admin Benutzer", moderators: "Moderatoren", blocked: "Gesperrte Benutzer"}}, user: {ban_failed: "Beim Sperren dieses Benutzers ist etwas schief gegangen {{error}}", unban_failed: "Beim Entsperren dieses Benutzers ist etwas schief gegangen {{error}}", ban_duration: "Wie lange soll dieser Benutzer gesperrt werden? (Tage)", delete_all_posts: "Lösche alle Beiträge", ban: "Sperren", unban: "Entsperren", banned: "Gesperrt?", moderator: "Moderator?", admin: "Administrator?", blocked: "Gesperrt?", show_admin_profile: "Administration", refresh_browsers: "Erzwinge Browser-Refresh", show_public_profile: "Zeige öffentliches Profil", impersonate: "Nutzersicht", revoke_admin: "Administrationsrechte entziehen", grant_admin: "Administrationsrechte vergeben", revoke_moderation: "Moderationsrechte entziehen", grant_moderation: "Moderationsrechte vergeben", unblock: "Entsperren", block: "Sperren", reputation: "Reputation", permissions: "Rechte", activity: "Aktivität", like_count: "Erhaltene „Gefällt mir“", private_topics_count: "Zahl privater Themen", posts_read_count: "Gelesene Beiträge", post_count: "Erstelle Beiträge", topics_entered: "Beigesteuerte Themen", flags_given_count: "Gemachte Meldungen", flags_received_count: "Erhaltene Meldungen", approve: "Genehmigen", approved_by: "genehmigt von", approve_success: "Benutser freigeschalten und Mail mit den Anweisungen zur Aktivierung gesendet.", approve_bulk_success: "Erfolg! Alle ausgewählten Benutzer wurden freigeschalten und benachrichtigt.", time_read: "Lesezeit", "delete": "Benutzer löschen", delete_forbidden: "Der Benutzer kann nicht gelöscht werden, da er noch Beiträge hat. Lösche zuerst seine Beträge.", delete_confirm: "Bist du SICHER das du diesen Benutzer permanent von der Seite entfernen möchtest? Diese Aktion kann nicht rückgängig gemacht werden!", deleted: "Der Benutzer wurde gelöscht.", delete_failed: "Beim Löschen des Benutzers ist ein Fehler aufgetreten. Stelle sicher, dass dieser Benutzer keine Beiträge mehr hat.", send_activation_email: "Aktivierungsmail senden", activation_email_sent: "Die Aktivierungsmail wurde versendet.", send_activation_email_failed: "Beim Sender der Mail ist ein Fehler aufgetreten.", activate: "Benutzer aktivieren", activate_failed: "Beim Aktivieren des Benutzers ist ein Fehler aufgetreten.", deactivate_account: "Benutzer deaktivieren", deactivate_failed: "Beim Deaktivieren des Benutzers ist ein Fehler aufgetreten.", unblock_failed: "Beim Entsperren des Benutzers ist ein Fehler aufgetreten.", block_failed: "Beim Sperren des Benutzers ist ein Fehler aufgetreten.", block_explanation: "Ein gesperrter Benutzer kann keine Themen erstellen oder Beiträge veröffentlichen."}, site_content: {none: "Wähle einen Inhaltstyp um mit dem Bearbeiten zu beginnen.", title: "Inhalt", edit: "Seiteninhalt bearbeiten"}, site_settings: {show_overriden: "Zeige nur geänderte Einstellungen", title: "Einstellungen", reset: "Zurücksetzen"}}}}}, I18n.locale = "de", function (e) {
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
        o && e._d.setTime(+e._d + o * n), (u || l) && (r = e.minute(), a = e.hour()), u && e.date(e.date() + u * n), l && (i = e.date(), e.date(1).month(e.month() + l * n).date(Math.min(i, e.daysInMonth()))), o && !s && P.updateOffset(e), (u || l) && (e.minute(r), e.hour(a))
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

    function d(e, t) {
        return t.abbr = e, O[e] || (O[e] = new s), O[e].set(t), O[e]
    }

    function f(e) {
        return e ? (!O[e] && z && require("./lang/" + e), O[e]) : P.fn._lang
    }

    function m(e) {
        return e.match(/\[.*\]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }

    function g(e) {
        var t, n, s = e.match(H);
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
                return W;
            case"YYYYY":
                return $;
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
                return Y;
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
                return V;
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

    function x(e) {
        var t, n, s = [];
        if (!e._d) {
            for (t = 0; 7 > t; t++)e._a[t] = s[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            s[3] += ~~((e._tzm || 0) / 60), s[4] += ~~((e._tzm || 0) % 60), n = new Date(0), e._useUTC ? (n.setUTCFullYear(s[0], s[1], s[2]), n.setUTCHours(s[3], s[4], s[5], s[6])) : (n.setFullYear(s[0], s[1], s[2]), n.setHours(s[3], s[4], s[5], s[6])), e._d = n
        }
    }

    function w(e) {
        var t, n, s = e._f.match(H), r = e._i;
        for (e._a = [], t = 0; s.length > t; t++)n = (v(s[t], e).exec(r) || [])[0], n && (r = r.slice(r.indexOf(n) + n.length)), ut[s[t]] && _(s[t], n, e);
        r && (e._il = r), e._isPm && 12 > e._a[3] && (e._a[3] += 12), e._isPm === !1 && 12 === e._a[3] && (e._a[3] = 0), x(e)
    }

    function T(e) {
        var t, n, s, a, o, u = 99;
        for (a = 0; e._f.length > a; a++)t = i({}, e), t._f = e._f[a], w(t), n = new r(t), o = h(t._a, n.toArray()), n._il && (o += n._il.length), u > o && (u = o, s = n);
        i(e, s)
    }

    function E(e) {
        var t, n = e._i, s = X.exec(n);
        if (s) {
            for (e._f = "YYYY-MM-DD" + (s[2] || " "), t = 0; 4 > t; t++)if (et[t][1].exec(n)) {
                e._f += et[t][0];
                break
            }
            K.exec(n) && (e._f += " Z"), w(e)
        } else e._d = new Date(n)
    }

    function D(t) {
        var n = t._i, s = U.exec(n);
        n === e ? t._d = new Date : s ? t._d = new Date(+s[1]) : "string" == typeof n ? E(t) : c(n) ? (t._a = n.slice(0), x(t)) : t._d = n instanceof Date ? new Date(+n) : new Date(n)
    }

    function C(e, t, n, s, r) {
        return r.relativeTime(t || 1, !!n, e, s)
    }

    function k(e, t, n) {
        var s = L(Math.abs(e) / 1e3), r = L(s / 60), a = L(r / 60), i = L(a / 24), o = L(i / 365), u = 45 > s && ["s", s] || 1 === r && ["m"] || 45 > r && ["mm", r] || 1 === a && ["h"] || 22 > a && ["hh", a] || 1 === i && ["d"] || 25 >= i && ["dd", i] || 45 >= i && ["M"] || 345 > i && ["MM", L(i / 30)] || 1 === o && ["y"] || ["yy", o];
        return u[2] = t, u[3] = e > 0, u[4] = n, C.apply({}, u)
    }

    function S(e, t, n) {
        var s, r = n - t, a = n - e.day();
        return a > r && (a -= 7), r - 7 > a && (a += 7), s = P(e).add("d", a), {week: Math.ceil(s.dayOfYear() / 7), year: s.year()}
    }

    function I(e) {
        var t = e._i, n = e._f;
        return null === t || "" === t ? null : ("string" == typeof t && (e._i = t = f().preparse(t)), P.isMoment(t) ? (e = i({}, t), e._d = new Date(+t._d)) : n ? c(n) ? T(e) : w(e) : D(e), new r(e))
    }

    function A(e, t) {
        P.fn[e] = P.fn[e + "s"] = function (e) {
            var n = this._isUTC ? "UTC" : "";
            return null != e ? (this._d["set" + n + t](e), P.updateOffset(this), this) : this._d["get" + n + t]()
        }
    }

    function N(e) {
        P.duration.fn[e] = function () {
            return this._data[e]
        }
    }

    function M(e, t) {
        P.duration.fn["as" + e] = function () {
            return+this / t
        }
    }

    for (var P, R, j = "2.0.0", L = Math.round, O = {}, z = "undefined" != typeof module && module.exports, U = /^\/?Date\((\-?\d+)/i, B = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, H = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, F = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, V = /\d\d?/, G = /\d{1,3}/, q = /\d{3}/, W = /\d{1,4}/, $ = /[+\-]?\d{1,6}/, Y = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, K = /Z|[\+\-]\d\d:?\d\d/i, Q = /T/i, Z = /[\+\-]?\d+(\.\d{1,3})?/, X = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, J = "YYYY-MM-DDTHH:mm:ssZ", et = [
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
    }}; it.length;)R = it.pop(), ut[R + "o"] = n(ut[R], R);
    for (; ot.length;)R = ot.pop(), ut[R + R] = t(ut[R], 2);
    for (ut.DDDD = t(ut.DDD, 3), s.prototype = {set: function (e) {
        var t, n;
        for (n in e)t = e[n], "function" == typeof t ? this[n] = t : this["_" + n] = t
    }, _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), months: function (e) {
        return this._months[e.month()]
    }, _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), monthsShort: function (e) {
        return this._monthsShort[e.month()]
    }, monthsParse: function (e) {
        var t, n, s;
        for (this._monthsParse || (this._monthsParse = []), t = 0; 12 > t; t++)if (this._monthsParse[t] || (n = P([2e3, t]), s = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[t] = new RegExp(s.replace(".", ""), "i")), this._monthsParse[t].test(e))return t
    }, _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdays: function (e) {
        return this._weekdays[e.day()]
    }, _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysShort: function (e) {
        return this._weekdaysShort[e.day()]
    }, _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), weekdaysMin: function (e) {
        return this._weekdaysMin[e.day()]
    }, weekdaysParse: function (e) {
        var t, n, s;
        for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++)if (this._weekdaysParse[t] || (n = P([2e3, 1]).day(t), s = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[t] = new RegExp(s.replace(".", ""), "i")), this._weekdaysParse[t].test(e))return t
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
    }, _week: {dow: 0, doy: 6}}, P = function (e, t, n) {
        return I({_i: e, _f: t, _l: n, _isUTC: !1})
    }, P.utc = function (e, t, n) {
        return I({_useUTC: !0, _isUTC: !0, _l: n, _i: e, _f: t})
    }, P.unix = function (e) {
        return P(1e3 * e)
    }, P.duration = function (e, t) {
        var n, s, r = P.isDuration(e), i = "number" == typeof e, o = r ? e._data : i ? {} : e, u = B.exec(e);
        return i ? t ? o[t] = e : o.milliseconds = e : u && (n = "-" === u[1] ? -1 : 1, o = {y: 0, d: ~~u[2] * n, h: ~~u[3] * n, m: ~~u[4] * n, s: ~~u[5] * n, ms: ~~u[6] * n}), s = new a(o), r && e.hasOwnProperty("_lang") && (s._lang = e._lang), s
    }, P.version = j, P.defaultFormat = J, P.updateOffset = function () {
    }, P.lang = function (e, t) {
        return e ? (t ? d(e, t) : O[e] || f(e), P.duration.fn._lang = P.fn._lang = f(e), void 0) : P.fn._lang._abbr
    }, P.langData = function (e) {
        return e && e._lang && e._lang._abbr && (e = e._lang._abbr), f(e)
    }, P.isMoment = function (e) {
        return e instanceof r
    }, P.isDuration = function (e) {
        return e instanceof a
    }, P.fn = r.prototype = {clone: function () {
        return P(this)
    }, valueOf: function () {
        return+this._d + 6e4 * (this._offset || 0)
    }, unix: function () {
        return Math.floor(+this / 1e3)
    }, toString: function () {
        return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }, toDate: function () {
        return this._offset ? new Date(+this) : this._d
    }, toISOString: function () {
        return b(P(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }, toArray: function () {
        var e = this;
        return[e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds()]
    }, isValid: function () {
        return null == this._isValid && (this._isValid = this._a ? !h(this._a, (this._isUTC ? P.utc(this._a) : P(this._a)).toArray()) : !isNaN(this._d.getTime())), !!this._isValid
    }, utc: function () {
        return this.zone(0)
    }, local: function () {
        return this.zone(0), this._isUTC = !1, this
    }, format: function (e) {
        var t = b(this, e || P.defaultFormat);
        return this.lang().postformat(t)
    }, add: function (e, t) {
        var n;
        return n = "string" == typeof e ? P.duration(+t, e) : P.duration(e, t), l(this, n, 1), this
    }, subtract: function (e, t) {
        var n;
        return n = "string" == typeof e ? P.duration(+t, e) : P.duration(e, t), l(this, n, -1), this
    }, diff: function (e, t, n) {
        var s, r, a = this._isUTC ? P(e).zone(this._offset || 0) : P(e).local(), i = 6e4 * (this.zone() - a.zone());
        return t = p(t), "year" === t || "month" === t ? (s = 432e5 * (this.daysInMonth() + a.daysInMonth()), r = 12 * (this.year() - a.year()) + (this.month() - a.month()), r += (this - P(this).startOf("month") - (a - P(a).startOf("month"))) / s, "year" === t && (r /= 12)) : (s = this - a - i, r = "second" === t ? s / 1e3 : "minute" === t ? s / 6e4 : "hour" === t ? s / 36e5 : "day" === t ? s / 864e5 : "week" === t ? s / 6048e5 : s), n ? r : o(r)
    }, from: function (e, t) {
        return P.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t)
    }, fromNow: function (e) {
        return this.from(P(), e)
    }, calendar: function () {
        var e = this.diff(P().startOf("day"), "days", !0), t = -6 > e ? "sameElse" : -1 > e ? "lastWeek" : 0 > e ? "lastDay" : 1 > e ? "sameDay" : 2 > e ? "nextDay" : 7 > e ? "nextWeek" : "sameElse";
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
        return null != e ? "string" == typeof e && (e = this.lang().monthsParse(e), "number" != typeof e) ? this : (this._d["set" + t + "Month"](e), P.updateOffset(this), this) : this._d["get" + t + "Month"]()
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
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) > +P(e).startOf(t)
    }, isBefore: function (e, t) {
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) < +P(e).startOf(t)
    }, isSame: function (e, t) {
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) === +P(e).startOf(t)
    }, min: function (e) {
        return e = P.apply(null, arguments), this > e ? this : e
    }, max: function (e) {
        return e = P.apply(null, arguments), e > this ? this : e
    }, zone: function (e) {
        var t = this._offset || 0;
        return null == e ? this._isUTC ? t : this._d.getTimezoneOffset() : ("string" == typeof e && (e = y(e)), 16 > Math.abs(e) && (e = 60 * e), this._offset = e, this._isUTC = !0, t !== e && l(this, P.duration(t - e, "m"), 1, !0), this)
    }, zoneAbbr: function () {
        return this._isUTC ? "UTC" : ""
    }, zoneName: function () {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }, daysInMonth: function () {
        return P.utc([this.year(), this.month() + 1, 0]).date()
    }, dayOfYear: function (e) {
        var t = L((P(this).startOf("day") - P(this).startOf("year")) / 864e5) + 1;
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
    }}, R = 0; nt.length > R; R++)A(nt[R].toLowerCase().replace(/s$/, ""), nt[R]);
    A("year", "FullYear"), P.fn.days = P.fn.day, P.fn.months = P.fn.month, P.fn.weeks = P.fn.week, P.fn.isoWeeks = P.fn.isoWeek, P.fn.toJSON = P.fn.toISOString, P.duration.fn = a.prototype = {weeks: function () {
        return o(this.days() / 7)
    }, valueOf: function () {
        return this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * ~~(this._months / 12)
    }, humanize: function (e) {
        var t = +this, n = k(t, !e, this.lang());
        return e && (n = this.lang().pastFuture(t, n)), this.lang().postformat(n)
    }, add: function (e, t) {
        var n = P.duration(e, t);
        return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, this
    }, subtract: function (e, t) {
        var n = P.duration(e, t);
        return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, this
    }, get: function (e) {
        return e = p(e), this[e.toLowerCase() + "s"]()
    }, as: function (e) {
        return e = p(e), this["as" + e.charAt(0).toUpperCase() + e.slice(1) + "s"]()
    }, lang: P.fn.lang};
    for (R in st)st.hasOwnProperty(R) && (M(R, st[R]), N(R.toLowerCase()));
    M("Weeks", 6048e5), P.duration.fn.asMonths = function () {
        return(+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, P.lang("en", {ordinal: function (e) {
        var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
        return e + n
    }}), z && (module.exports = P), "undefined" == typeof ender && (this.moment = P), "function" == typeof define && define.amd && define("moment", [], function () {
        return P
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