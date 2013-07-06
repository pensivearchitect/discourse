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
    for (var a = 0; n = i[a]; a++) {
        r = n.replace(this.PLACEHOLDER, "$1"), s = t[r], this.isValidNode(t, r) || (s = "[missing " + n + " value]");
        var o = new RegExp(n.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}"));
        e = e.replace(o, s)
    }
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
    var t = this.pluralizationRules[e];
    return void 0 !== t ? t : this.pluralizationRules.en
}, I18n.findAndTranslateValidNode = function (e, t) {
    for (var n = 0; e.length > n; n++) {
        var s = e[n];
        if (this.isValidNode(t, s))return t[s]
    }
    return null
}, I18n.pluralize = function (e, t, n) {
    var s;
    try {
        s = this.lookup(t, n)
    } catch (r) {
    }
    if (!s)return this.missingTranslation(t);
    var i;
    n = this.prepareOptions(n), n.count = e.toString();
    var a = this.pluralizer(this.currentLocale()), o = a(Math.abs(e)), u = "object" == typeof o && o instanceof Array ? o : [o];
    return i = this.findAndTranslateValidNode(u, s), null == i && (i = this.missingTranslation(t, u[0])), this.interpolate(i, n)
}, I18n.missingTranslation = function () {
    for (var e = '[missing "' + this.currentLocale(), t = arguments.length, n = 0; t > n; n++)e += "." + arguments[n];
    return e += '" translation]'
}, I18n.currentLocale = function () {
    return I18n.locale || I18n.defaultLocale
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, MessageFormat = {locale: {}}, MessageFormat.locale.nl = function (e) {
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
    if (t += "There ", !e)throw new Error("MessageFormat: No data passed to function.");
    var n = "UNREAD", s = e[n], r = 0, i = {0: function () {
        var e = "";
        return e
    }, one: function () {
        var e = "";
        return e += "is <a href='/unread'>1 ongelezen</a> "
    }, other: function () {
        var e = "";
        return e += "zijn <a href='/unread'>" + function () {
            var e = s - r;
            if (isNaN(e))throw new Error("MessageFormat: `" + n + "` isnt a number.");
            return e
        }() + " ongelezen</a> "
    }};
    if (t += i[s + ""] ? i[s + ""](e) : (i[MessageFormat.locale.nl(s - r)] || i.other)(e), t += " ", !e)throw new Error("MessageFormat: No data passed to function.");
    var n = "NEW", s = e[n], r = 0, i = {0: function () {
        var e = "";
        return e
    }, one: function (e) {
        var t = "";
        if (!e)throw new Error("MessageFormat: No data passed to function.");
        var n = "BOTH", s = e[n], r = {"true": function () {
            var e = "";
            return e += "and "
        }, "false": function () {
            var e = "";
            return e += "is "
        }, other: function () {
            var e = "";
            return e
        }};
        return t += (r[s] || r.other)(e), t += " <a href='/new'>1 nieuwe</a> topic"
    }, other: function (e) {
        var t = "";
        if (!e)throw new Error("MessageFormat: No data passed to function.");
        var i = "BOTH", a = e[i], o = {"true": function () {
            var e = "";
            return e += "and "
        }, "false": function () {
            var e = "";
            return e += "zijn "
        }, other: function () {
            var e = "";
            return e
        }};
        return t += (o[a] || o.other)(e), t += " <a href='/new'>" + function () {
            var e = s - r;
            if (isNaN(e))throw new Error("MessageFormat: `" + n + "` isnt a number.");
            return e
        }() + " nieuwe</a> topics"
    }};
    if (t += i[s + ""] ? i[s + ""](e) : (i[MessageFormat.locale.nl(s - r)] || i.other)(e), t += " over, of ", !e)throw new Error("MessageFormat: No data passed to function.");
    var n = "CATEGORY", s = e[n], r = 0, i = {"true": function (e) {
        var t = "";
        if (t += "bekijk andere topics in ", !e)throw new Error("MessageFormat: No data passed to function.");
        return t += e.catLink
    }, "false": function (e) {
        var t = "";
        if (!e)throw new Error("MessageFormat: No data passed to function.");
        return t += e.latestLink
    }, other: function () {
        var e = "";
        return e
    }};
    return t += (i[s] || i.other)(e), t += " "
}}), I18n.translations = {nl: {js: {dates: {short_date_no_year: "D MMM", short_date: "D MMM YYYY", long_date: "D MMMM YYYY H:mm", tiny: {half_a_minute: "< 1m", less_than_x_seconds: {one: "< 1s", other: "< %{count}s"}, x_seconds: {one: "1s", other: "%{count}s"}, less_than_x_minutes: {one: "< 1m", other: "< %{count}m"}, x_minutes: {one: "1m", other: "%{count}m"}, about_x_hours: {one: "1h", other: "%{count}h"}, x_days: {one: "1d", other: "%{count}d"}, about_x_months: {one: "1mnd", other: "%{count}mnd"}, x_months: {one: "mnd", other: "%{count}mon"}, about_x_years: {one: "1j", other: "%{count}j"}, over_x_years: {one: "> 1j", other: "> %{count}j"}, almost_x_years: {one: "1j", other: "%{count}j"}}, medium: {x_minutes: {one: "1 minuut", other: "%{count} minuten"}, x_hours: {one: "1 uur", other: "%{count} uren"}, x_days: {one: "1 dag", other: "%{count} dagen"}}, medium_with_ago: {x_minutes: {one: "1 minuut geleden", other: "%{count} minuten geleden"}, x_hours: {one: "1 uur geleden", other: "%{count} uren geleden"}, x_days: {one: "1 day geleden", other: "%{count} dagen geleden"}}}, share: {topic: "Deel een link naar deze topic", post: "Deel een link naar dit bericht", close: "sluit", twitter: "deel deze link op Twitter", facebook: "deel deze link op Facebook", "google+": "deel deze link op Google+", email: "deel deze link via e-mail"}, edit: "bewerk de titel en categorie van deze topic", not_implemented: "Deze functie is helaas nog niet beschikbaar, sorry!", no_value: "Nee", yes_value: "Ja", of_value: "van", generic_error: "Sorry, er is iets fout gegaan.", log_in: "Log in", age: "Leeftijd", last_post: "Laatste bericht", admin_title: "Beheer", flags_title: "Meldingen", show_more: "meer...", links: "Links", faq: "FAQ", you: "Jij", or: "of", now: "zonet", read_more: "lees verder", in_n_seconds: {one: "over 1 seconde", other: "over {{count}} secondes"}, in_n_minutes: {one: "over 1 minuut", other: "over {{count}} minuten"}, in_n_hours: {one: "over 1 uur", other: "over {{count}} uren"}, in_n_days: {one: "over 1 dag", other: "over {{count}} dagen"}, suggested_topics: {title: "Aanbevolen topics"}, bookmarks: {not_logged_in: "Sorry, maar je moet ingelogd zijn om dit bericht aan je bladwijzers toe te kunnen voegen.", created: "Je hebt dit bericht aan je bladwijzers toegevoegd.", not_bookmarked: "Je hebt dit bericht gelezen; klik om deze aan je bladwijzers toe te voegen.", last_read: "Dit is het laatste bericht dat je gelezen hebt."}, new_topics_inserted: "{{count}} nieuwe topics.", show_new_topics: "Klik om te bekijken.", preview: "voorbeeld", cancel: "Annuleer", save: "Bewaar wijzigingen", saving: "Wordt opgeslagen...", saved: "Opgeslagen!", choose_topic: {none_found: "Geen topics gevonden.", title: {search: "Zoek naar een topic op naam, url of id:", placeholder: "typ hier de titel van de topic"}}, user_action: {user_posted_topic: "<a href='{{userUrl}}'>{{user}}</a> plaatste <a href='{{topicUrl}}'>deze topic</a>", you_posted_topic: "<a href='{{userUrl}}'>Jij</a> plaatste <a href='{{topicUrl}}'>deze topic</a>", user_replied_to_post: "<a href='{{userUrl}}'>{{user}}</a> reageerde op <a href='{{postUrl}}'>{{post_number}}</a>", you_replied_to_post: "<a href='{{userUrl}}'>Jij</a> reageerde op <a href='{{postUrl}}'>{{post_number}}</a>", user_replied_to_topic: "<a href='{{userUrl}}'>{{user}}</a> reageerde op <a href='{{topicUrl}}'>the topic</a>", you_replied_to_topic: "<a href='{{userUrl}}'>Jij</a> reageerde op <a href='{{topicUrl}}'>the topic</a>", user_mentioned_user: "<a href='{{user1Url}}'>{{user}}</a> noemde <a href='{{user2Url}}'>{{another_user}}</a>", user_mentioned_you: "<a href='{{user1Url}}'>{{user}}</a> noemde <a href='{{user2Url}}'>jou</a>", you_mentioned_user: "<a href='{{user1Url}}'>Jij</a> noemde <a href='{{user2Url}}'>{{user}}</a>", posted_by_user: "Geplaatst door <a href='{{userUrl}}'>{{user}}</a>", posted_by_you: "Geplaatst door <a href='{{userUrl}}'>jou</a>", sent_by_user: "Verzonden door <a href='{{userUrl}}'>{{user}}</a>", sent_by_you: "Verzonden door <a href='{{userUrl}}'>jou</a>"}, user_action_groups: {1: "Likes gegeven", 2: "Likes ontvangen", 3: "Bladwijzers", 4: "Topics", 5: "Antwoorden", 6: "Reacties", 7: "Genoemd", 9: "Citaten", 10: "Favorieten", 11: "Wijzigingen", 12: "Verzonden items", 13: "Inbox"}, user: {profile: "Profiel", title: "Lid", mute: "Negeer", edit: "Wijzig voorkeuren", download_archive: "download een archief van mijn berichten", private_message: "Privé-bericht", private_messages: "Berichten", activity_stream: "Activiteit", preferences: "Voorkeuren", bio: "Over mij", invited_by: "Uitgenodigd door", trust_level: "Trustlevel", external_links_in_new_tab: "Open alle externe links in een nieuw tabblad", enable_quoting: "Activeer antwoord-met-citaat voor geselecteerde tekst", moderator: "{{user}} is een moderator", admin: "{{user}} is een admin", change_password: {action: "wijzig", success: "(e-mail verzonden)", in_progress: "(e-mail wordt verzonden)", error: "(fout)"}, change_username: {action: "wijzig", title: "Wijzig gebruikersnaam", confirm: "Het wijzigen van je gebruikersnaam kan consequenties hebben. Weet je zeker dat je dit wil doen?", taken: "Sorry, maar die gebruikersnaam is al in gebruik.", error: "Het veranderen van je gebruikersnaam is mislukt.", invalid: "Die gebruikersnaam is ongeldig. Gebruik alleen nummers en letters."}, change_email: {action: "wijzig", title: "Wijzig e-mail", taken: "Sorry, dat e-mailadres is niet beschikbaar.", error: "Het veranderen van je e-mailadres is mislukt. Wellicht is deze al in gebruik?", success: "We hebben een mail gestuurd naar dat adres. Volg de bevestigingsinstructies in die mail."}, email: {title: "E-mail", instructions: "Je e-mail adres zal nooit publieklijk zichtbaar zijn.", ok: "Prima. We zullen je een e-mail sturen ter bevestiging.", invalid: "Vul een geldig e-mailadres in.", authenticated: "Je e-mailadres is bevestigd door {{provider}}.", frequency: "We zullen je alleen maar mailen als we je een tijd niet gezien hebben, en als je toevallig hetgeen waarover we je mailen nog niet hebt gezien op onze site."}, name: {title: "Naam", instructions: "De langere versie van je naam; die hoeft niet uniek te zijn.", too_short: "Je naam is te kort.", ok: "Wat een mooie naam!"}, username: {title: "Gebruikersnaam", instructions: "Moet uniek zijn, geen spaties. Mensen kunnen naar je verwijzen als @{{username}}", short_instructions: "Mensen kunnen naar je verwijzen als @{{username}}.", available: "Je gebruikersnaam is beschikbaar.", global_match: "Je e-mailadres komt overeen met je geregistreerde gebruikersnaam.", global_mismatch: "Is al geregistreerd. Gebruikersnaam {{suggestion}} proberen?", not_available: "Niet beschikbaar. Gebruikersnaam {{suggestion}} proberen?", too_short: "Je gebruikersnaam is te kort.", too_long: "Je gebruikersnaam is te lang.", checking: "Beschikbaarheid controleren...", enter_email: "Gebruikersnaam gevonden. Vul het gekoppelde e-mailadres in."}, password_confirmation: {title: "Nogmaals het wachtwoord"}, last_posted: "Laatste bericht", last_emailed: "Laatst gemailed", last_seen: "Laatst gezien", created: "Lid sinds", log_out: "Log uit", website: "Website", email_settings: "E-mail", email_digests: {title: "Stuur me een mail met de laatste updates wanneer ik de site niet bezoek.", daily: "dagelijks", weekly: "wekelijks", bi_weekly: "elke twee weken"}, email_direct: "Ontvang een mail wanneer iemand je citeert, reageert op je bericht of je @gebruikersnaam noemt.", email_private_messages: "Ontvang een mail wanneer iemand je een privé-bericht heeft gestuurd.", other_settings: "Overige", new_topic_duration: {label: "Beschouw topics als nieuw wanneer", not_viewed: "ik ze nog heb niet bekeken", last_here: "ze geplaatst waren nadat ik hier voor het laatst was", after_n_days: {one: "ze in de afgelopen dag geplaatst zijn", other: "ze de afgelopen {{count}} dagen geplaatst zijn"}, after_n_weeks: {one: "ze in de afgelopen week geplaatst zijn", other: "ze in de afgelopen {{count}} weken geplaatst zijn"}}, auto_track_topics: "Houd automatisch topics bij die ik bezoek", auto_track_options: {never: "nooit", always: "altijd", after_n_seconds: {one: "na één seconde", other: "na {{count}} seconden"}, after_n_minutes: {one: "na één minuut", other: "na {{count}} minuten"}}, invited: {title: "Uitnodigingen", user: "Uitgenodigd lid", none: "{{username}} heeft nog geen mensen uitgenodigd voor deze site.", redeemed: "Verzilverde uitnodigingen", redeemed_at: "Verzilverd op", pending: "Uitstaande uitnodigingen", topics_entered: "Topics bezocht", posts_read_count: "Berichten gelezen", rescind: "Verwijder uitnodiging", rescinded: "Uitnodiging verwijderd", time_read: "Tijd gelezen", days_visited: "Dagen bezocht", account_age_days: "leeftijd van account in dagen"}, password: {title: "Wachtwoord", too_short: "Je wachtwoord is te kort.", ok: "Je wachtwoord ziet er goed uit."}, ip_address: {title: "Laatste IP-adres"}, avatar: {title: "Profielfoto", instructions: "Wij gebruiken <a href='https://gravatar.com' target='_blank'>Gravatar</a> voor profielfoto's die aan je e-mailadres gekoppeld zijn"}, filters: {all: "Alle"}, stream: {posted_by: "Geplaatst door", sent_by: "Verzonden door", private_message: "privé-bericht", the_topic: "de topic"}}, loading: "Laden...", close: "Sluit", learn_more: "leer meer...", year: "jaar", year_desc: "topics die in de afgelopen 365 dagen gepost zijn", month: "maand", month_desc: "topics die in de afgelopen 30 dagen gepost zijn", week: "week", week_desc: "topics die in de afgelopen 7 dagen gepost zijn", first_post: "Eerste bericht", mute: "Negeer", unmute: "Tonen", best_of: {title: "Best of", enabled_description: "Je kijkt nu naar de 'Best of' van deze topic", description: "Er zijn <b>{{count}}</b> berichten in deze topic. Dat zijn een hoop! Zou je tijd willen besparen door alleen de berichten te zien met de meeste interactie en reacties?", enable: "Schakel naar 'Best of'-weergave", disable: "Schakel naar normale weergave"}, private_message_info: {title: "Privé-bericht", invite: "Nodig anderen uit..."}, email: "E-mail", username: "Gebruikersnaam", last_seen: "Laatst gezien", created: "Gemaakt op", trust_level: "Trustlevel", create_account: {title: "Maak een account", action: "Maak er direct een!", invite: "Heb je nog geen account?", failed: "Er ging iets mis, wellicht is het e-mailadres al geregistreerd. Probeer de 'Wachtwoord vergeten'-link."}, forgot_password: {title: "Wachtwoord vergeten", action: "Ik ben mijn wachtwoord vergeten", invite: "Vul je gebruikersnaam of e-mailadres in en we sturen je een wachtwoord-herstel-mail.", reset: "Herstel wachtwoord", complete: "Je zou binnenkort een mail moeten ontvangen met instructies hoe je je wachtwoord kan herstellen."}, login: {title: "Log in", username: "Gebruikersnaam", password: "Wachtwoord", email_placeholder: "e-mailadres of gebruikersnaam", error: "Er is een onbekende fout opgetreden", reset_password: "Herstel wachtwoord", logging_in: "Inloggen...", or: "Of", authenticating: "Authenticatie...", awaiting_confirmation: "Je account is nog niet geactiveerd. Gebruik de 'Wachtwoord vergeten'-link om een nieuwe activatie-mail te ontvangen.", awaiting_approval: "Je account is nog niet goedgekeurd door een moderator. Je krijgt van ons een mail wanneer dat gebeurd is.", not_activated: "Je kan nog niet inloggen. We hebben je een activatie-mail gestuurd (naar <b>{{currentEmail}}</b>). Het kan een aantal minuten duren voor deze aan komt. Check ook je spamfolder.", resend_activation_email: "Klik hier om de activatiemail opnieuw te ontvangen.", sent_activation_email_again: "We hebben een nieuwe activatiemail gestuurd naar <b>{{currentEmail}}</b>. Het kan een aantal minuten duren voor deze aan komt. Check ook je spamfolder.", google: {title: "met Google", message: "Authenticatie met Google (zorg ervoor dat je popup blocker uit staat)"}, twitter: {title: "met Twitter", message: "Authenticatie met Twitter (zorg ervoor dat je popup blocker uit staat)"}, facebook: {title: "met Facebook", message: "Authenticatie met Facebook (zorg ervoor dat je popup blocker uit staat)"}, cas: {title: "met CAS", message: "Authenticatie met CAS (zorg ervoor dat je popup blocker uit staat)"}, yahoo: {title: "met Yahoo", message: "Authenticatie met Yahoo (zorg ervoor dat je popup blocker uit staat)"}, github: {title: "met Github", message: "Authenticatie met Github (zorg ervoor dat je popup blocker uit staat)"}, persona: {title: "met Persona", message: "Authenticatie met Mozilla Persona (zorg ervoor dat je popup blocker uit staat)"}}, composer: {posting_not_on_topic: "Je schrijft een antwoord in deze topic '{{title}}', maar je kijkt nu naar een ander topic.", saving_draft_tip: "wordt opgeslagen", saved_draft_tip: "opgeslagen", saved_local_draft_tip: "lokaal opgeslagen", similar_topics: "Jouw topic heeft overeenkomsten met...", drafts_offline: "concepten offline", min_length: {need_more_for_title: "Nog {{n}} tekens nodig voor de titel", need_more_for_reply: "Nog {{n}} tekens nodig voor het antwoord"}, error: {title_missing: "Je bent de titel vergeten.", title_too_short: "De titel moet tenminste {{min}} tekens bevatten.", title_too_long: "De titel mag maximaal {{max}} tekens bevatten.", post_missing: "Berichten kunnen niet leeg zijn.", post_length: "Berichten moeten tenminste {{min}} tekens bevatten.", category_missing: "Je hebt nog geen categorie gekozen."}, save_edit: "Bewaar wijzigingen", reply_original: "Reageer op oorspronkelijke topic", reply_here: "Reageer hier", reply: "Reageer", cancel: "Annuleer", create_topic: "Maak topic", create_pm: "Maak privé-bericht", users_placeholder: "Voeg een lid toe", title_placeholder: "Typ hier je title. Beschrijf in één korte zin waar deze discussie over gaat.", reply_placeholder: 'Typ hier. Gebruik Markdown of BBCode voor de tekstopmaak. Sleep of plak een afbeelding hierin om deze te uploaden."', view_new_post: "Bekijk je nieuwe bericht.", saving: "Opslaan...", saved: "Opgeslagen!", saved_draft: "Je hebt nog een conceptbericht open staan. Klik in dit veld om verder te gaan met bewerken.", uploading: "Uploaden...", show_preview: "laat voorbeeld zien &raquo;", hide_preview: "&laquo; verberg voorbeeld", quote_post_title: "Citeer hele bericht", bold_title: "Vet", bold_text: "Vetgedrukte tekst", italic_title: "Cursief", italic_text: "Cursieve tekst", link_title: "Hyperlink", link_description: "geef hier een omschrijving", link_dialog_title: "Voeg hyperlink toe", link_optional_text: "optionele titel", quote_title: "Citaat", quote_text: "Citaat", code_title: "Code voorbeeld", code_text: "hier de code", image_title: "Afbeelding", image_description: "geef een omschrijving voor de afbeelding op", image_dialog_title: "Voeg afbeelding toe", image_optional_text: "optionele titel", image_hosting_hint: "Heb je een <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>een gratis stek voor je afbeelding</a> nodig?", olist_title: "Genummerde lijst", ulist_title: "Lijst met bullets", list_item: "Lijstonderdeel", heading_title: "Kop", heading_text: "Kop", hr_title: "Horizontale lijn", undo_title: "Herstel", redo_title: "Opnieuw", help: "Hulp over Markdown", toggler: "verberg of toon de editor", admin_options_title: "Optionele stafinstellingen voor deze topic", auto_close_label: "Sluit topic automatisch na:", auto_close_units: "dagen"}, notifications: {title: "notificaties van @naam vermeldingen, reacties op je berichten en topics, privé-berichten, etc.", none: "Er zijn nu geen notificaties.", more: "bekijk oudere notificaties", mentioned: "<span title='genoemd' class='icon'>@</span> {{username}} {{link}}", quoted: "<i title='geciteerd' class='icon icon-quote-right'></i> {{username}} {{link}}", replied: "<i title='beantwoord' class='icon icon-reply'></i> {{username}} {{link}}", posted: "<i title='beantwoord' class='icon icon-reply'></i> {{username}} {{link}}", edited: "<i title='gewijzigd' class='icon icon-pencil'></i> {{username}} {{link}}", liked: "<i title='leuk' class='icon icon-heart'></i> {{username}} {{link}}", private_message: "<i class='icon icon-envelope-alt' title='privé-bericht'></i> {{username}} {{link}}", invited_to_private_message: "<i class='icon icon-envelope-alt' title='privé-bericht'></i> {{username}} {{link}}", invitee_accepted: "<i title='heeft je uitnodiging geaccepteerd' class='icon icon-signin'></i> {{username}} heeft je uitnodiging geaccepteerd en heeft zich ingeschreven om deel te nemen.", moved_post: "<i title='bericht verplaatst' class='icon icon-arrow-right'></i> {{username}} verplaatst naar {{link}}", total_flagged: "aantal gemarkeerde berichten"}, image_selector: {title: "Voeg afbeelding toe", from_my_computer: "Vanaf mijn apparaat", from_the_web: "Vanaf het web", add_image: "Voeg afbeelding toe", remote_title: "externe afbeelding", remote_tip: "vul een internetadres in van een afbeelding in deze vorm: http://example.com/image.jpg", local_title: "lokale afbeelding", local_tip: "klik om een afbeelding vanaf je apparaat te selecteren.", upload: "Uploaden", uploading_image: "Afbeelding uploaden"}, search: {title: "zoek naar topics, posts, leden of categoriëen", placeholder: "typ je zoekterm hier", no_results: "Geen resultaten gevonden.", searching: "Zoeken...", prefer: {user: "er wordt voornamelijk gezocht naar berichten van @{{username}}", category: "er wordt voornamelijk gezocht naar berichten in categorie {{category}}"}}, site_map: "ga naar een andere topic-lijst of categorie", go_back: "ga terug", current_user: "ga naar je gebruikerspagina", favorite: {title: "Favoriet", help: {star: "Voeg deze topic toe aan je favorietenlijst", unstar: "Verwijder deze topic uit je favorietenlijst"}}, topics: {none: {favorited: "Je hebt nog geen topics tussen je favorieten staan. Om een topic toe te voegen, klik of druk op de ster naast de topictitel.", unread: "Je hebt geen ongelezen topics.", "new": "Je hebt geen nieuwe topics om te lezen.", read: "Je hebt nog geen topics gelezen.", posted: "Je hebt nog niet in een topic gereageerd.", latest: "Er zijn geen populaire topics. Dat is jammer.", hot: "Er zijn geen polulaire topics.", category: "Er zijn geen topics in {{category}}"}, bottom: {latest: "Er zijn geen recente topics om te lezen.", hot: "Er zijn geen polulaire topics meer om te lezen.", posted: "Er zijn geen geplaatste topics meer om te lezen.", read: "Er zijn geen gelezen topics meer om te lezen.", "new": "Er zijn geen nieuwe topics meer om te lezen.", unread: "Er zijn geen ongelezen topics meer om te lezen.", favorited: "Er zijn geen favoriete topics meer om te lezen.", category: "Er zijn geen topics meer in {{category}} om te lezen"}}, rank_details: {toggle: "schakel details topic rangorde aan/uit", show: "bekijk details topic rangorde", title: "Details topic rangorde"}, topic: {create_in: "Maak een {{categoryName}} topic", create: "Maak topic", create_long: "Maak een nieuw topic", private_message: "Stuur een privé-bericht", list: "Topics", "new": "nieuw topic", title: "Topic", loading_more: "Er worden meer topics geladen...", loading: "Bezig met laden van topic...", invalid_access: {title: "Topic is privé", description: "Sorry, je hebt geen toegang tot deze topic."}, server_error: {title: "Topic laden mislukt", description: "Sorry, we konden deze topic niet laden, waarschijnlijk door een verbindingsprobleem. Probeer het later opnieuw. Als het probleem blijft, laat het ons dan weten."}, not_found: {title: "Topic niet gevonden", description: "Sorry, we konden de opgevraagde topic niet vinden. Wellicht is het verwijderd door een moderator?"}, unread_posts: "je hebt {{unread}} ongelezen posts in deze topic", new_posts: "er zijn {{new_posts}} nieuwe posts in deze topic sinds je dit voor het laatst gelezen hebt", likes: {one: "er is één waardering in deze topic", other: "er zijn {{likes}} waarderingen in deze topic"}, back_to_list: "Terug naar topiclijst", options: "Topic opties", show_links: "laat links binnen deze topic zien", toggle_information: "Zet topic details aan/uit", read_more_in_category: "Wil je meer lezen? Kijk dan voor andere topics in {{catLink}} of {{latestLink}}.", read_more: "Wil je meer lezen? {{catLink}} of {{latestLink}}.", browse_all_categories: "Bekijk alle categorieën", view_latest_topics: "bekijk populaire topics", suggest_create_topic: "Wil je een nieuwe topic schrijven?", read_position_reset: "Je leespositie is gereset.", jump_reply_up: "spring naar een eerdere reactie", jump_reply_down: "spring naar een latere reactie", deleted: "Deze topic is verwijderd", auto_close_notice: "Deze topic wordt automatisch over %{timeLeft} gesloten.", auto_close_title: "Instellingen voor automatisch sluiten", auto_close_save: "Opslaan", auto_close_cancel: "Annuleren", auto_close_remove: "Sluit deze topic niet automatisch", progress: {title: "topic voortgang", jump_top: "spring naar eerste bericht", jump_bottom: "spring naar laatste bericht", total: "totaal aantal berichten", current: "huidige bericht"}, notifications: {title: "", reasons: {"3_2": "Je ontvangt notificaties omdat je deze topic in de gaten houdt.", "3_1": "Je ontvangt notificaties omdat jij deze topic gemaakt hebt.", 3: "Je ontvangt notificaties omdat je deze topic in de gaten houdt.", "2_4": "Je ontvangt notificaties omdat je een reactie aan deze topic hebt geplaatst.", "2_2": "Je ontvangt notificaties omdat je deze topic volgt.", 2: 'Je ontvangt notificaties omdat je <a href="/users/{{username}}/preferences">deze topic hebt gelezen</a>.', 1: "Je krijgt alleen een notificatie als iemand je @naam noemt of reageert op je bericht.", "1_2": "Je krijgt alleen een notificatie als iemand je @naam noemt of reageert op je bericht.", 0: "Je negeert alle notificaties in deze topic.", "0_2": "Je negeert alle notificaties in deze topic."}, watching: {title: "In de gaten houden", description: "zelfde als 'volgen', plus dat je ook een notificatie krijgt van alle nieuwe berichten."}, tracking: {title: "Volgen", description: "je krijgt een notificatie als je @naam genoemd wordt en wanneer er gereageerd wordt op je berichten. Daarnaast zie je een teller met ongelezen en nieuwe berichten."}, regular: {title: "Normaal", description: "Je zal alleen een notificatie krijgen als iemand je @naam vermeldt of een reactie geeft op je berichten."}, muted: {title: "Negeren", description: "je zal geen notificaties krijgen voor deze topic en het zal ook niet verschijnen in je 'ongelezen'-tab."}}, actions: {"delete": "Verwijder topic", open: "Open topic", close: "Sluit topic", auto_close: "Automatisch sluiten", unpin: "Ontpin topic", pin: "Pin topic", unarchive: "De-archiveer topic", archive: "Archiveer topic", invisible: "Maak onzichtbaar", visible: "Maak zichtbaar", reset_read: "Reset leesdata", multi_select: "Selecteer berichten voor samenvoegen/splitsen", convert_to_topic: "Zet om naar normale topic"}, reply: {title: "Reageer", help: "Schrijf een reactie op deze topic"}, clear_pin: {title: "Verwijder pin", help: "Annuleer de gepinde status van deze topic, zodat het niet langer bovenaan je topiclijst verschijnt."}, share: {title: "Deel", help: "Deel een link naar deze topic"}, inviting: "Uitnodigen...", invite_private: {title: "Stuur een privé-bericht", email_or_username: "E-mail of gebruikersnaam van genodigde", email_or_username_placeholder: "e-mailadres of gebruikersnaam", action: "Uitnodigen", success: "Bedankt! We hebben deze persoon dit privé-bericht gestuurd.", error: "Sorry, er is iets misgegaan bij het uitnodigen van deze persoon"}, invite_reply: {title: "Nodig vrienden uit om te reageren", action: "Mail uitnodiging", help: "verstuur uitnodigingen naar vrienden zodat zij met één klik kunnen reageren op deze topic", email: "We zullen je vrienden een korte e-mail sturen waardoor zij op deze topic kunnen reageren door op een link te klikken.", email_placeholder: "e-mailadres", success: 'Bedankt! We hebben een uitnodiging verstuurd naar <b>{{email}}</b>. We laten je direct weten wanneer ze je uitnodiging hebben geaccepteerd. Check de "Uitnodigingen"-tab op je gebruikerspagina om bij te houden wie je hebt uitgenodigd.', error: "Sorry, we kunnen deze persoon niet uitnodigen. Wellicht is deze al een lid op onze site?"}, login_reply: "Log in om te reageren", filters: {user: "Je ziet momenteel alleen {{n_posts}} {{by_n_users}}.", n_posts: {one: "één bericht", other: "{{count}} berichten"}, by_n_users: {one: "van één specifiek lid", other: "van {{count}} specifieke leden"}, best_of: "Je ziet momenteel alleen {{n_best_posts}} {{of_n_posts}}", n_best_posts: {one: "het enige 'Best of' bericht.", other: "de {{count}} 'Best of' berichten"}, of_n_posts: {one: "", other: "van {{count}} in deze topic."}, cancel: "Laat alle posts in deze topic zien."}, split_topic: {title: "Splits topic", action: "splits topic", topic_name: "Naam nieuwe topic:", error: "Er ging iets mis bij het splitsen van die topic.", instructions: {one: "Je staat op het punt een nieuwe topic aan te maken en het te vullen met het bericht dat je geselecteerd hebt.", other: "Je staat op het punt een nieuwe topic aan te maken en het te vullen met de <b>{{count}}</b> berichten die je geselecteerd hebt."}}, merge_topic: {title: "Voeg topic samen", action: "voeg topic samen", error: "There was an error merging that topic.", instructions: {one: "Selecteer de topic waarnaar je het bericht wil verplaatsen.", other: "Selecteer de topic waarnaar je de <b>{{count}}</b> berichten wil verplaatsen."}}, multi_select: {select: "selecteer", selected: "geselecteerd ({{count}})", "delete": "verwijder geselecteerde", cancel: "annuleer selectie", description: {one: "Je hebt <b>één</b> bericht geselecteerd.", other: "Je hebt <b>{{count}}</b> berichten geselecteerd."}}}, post: {reply: "Je reageert nu op {{link}} door {{replyAvatar}} {{username}}", reply_topic: "Reageer op {{link}}", quote_reply: "citeer", edit: "Bewerk {{link}} door {{replyAvatar}} {{username}}", post_number: "bericht {{number}}", in_reply_to: "in reactie op", reply_as_new_topic: "Reageer in een nieuwe topic", continue_discussion: "Voortzetting van de discussie {{postLink}}:", follow_quote: "ga naar het geciteerde bericht", deleted_by_author: "(bericht verwijderd door de schrijver)", expand_collapse: "uit-/invouwen", has_replies: {one: "Reactie", other: "Reacties"}, errors: {create: "Sorry, er is iets misgegaan bij het plaatsen van je bericht. Probeer het nog eens.", edit: "Sorry, er is iets misgegaan bij het bewerken van je bericht. Probeer het nog eens.", upload: "Sorry, er is iets misgegaan bij het uploaden van je bestand. Probeer het nog eens.", upload_too_large: "Sorry, het bestand dat je wil uploaden is te groot (maximum grootte is {{max_size_kb}}kb), verklein het bestand en probeer het opnieuw.", too_many_uploads: "Sorry, je kan maar één afbeelding tegelijk uploaden."}, abandon: "Weet je zeker dat je het schrijven van dit bericht wil afbreken?", archetypes: {save: "Bewaar instellingen"}, controls: {reply: "reageer op dit bericht", like: "vind dit bericht leuk", edit: "bewerk dit bericht", flag: "meld dit bericht of stuur er een notificatie over", "delete": "verwijder dit bericht", undelete: "herstel dit bericht", share: "deel een link naar dit bericht", more: "Meer"}, actions: {flag: "Markeer", clear_flags: {one: "Verwijder markering", other: "Verwijder markeringen"}, it_too: {off_topic: "Markeer het ook", spam: "Markeer het ook", inappropiate: "Markeer het ook", custom_flag: "Markeer het ook", bookmark: "Zet het ook in je favorieten", like: "Vind het ook leuk", vote: "Stem ook"}, undo: {off_topic: "Verwijder markering", spam: "Verwijder markering", inappropiate: "Verwijder markering", bookmark: "Verwijder uit je favorieten", like: "Vind het niet meer leuk", vote: "Stem niet meer"}, people: {off_topic: "{{icons}} markeerden dit als off-topic", spam: "{{icons}} markeerden dit als spam", inappropriate: "{{icons}} markeerden dit als ongepast", notify_moderators: "{{icons}} lichtte moderators in", notify_moderators_with_url: "{{icons}} <a href='{{postUrl}}'>lichtte moderators in</a>", notify_user: "{{icons}} verstuurde een privé-bericht", notify_user_with_url: "{{icons}} verstuurde een <a href='{{postUrl}}'>privé-bericht</a>", bookmark: "{{icons}} voegden dit toe aan hun favorieten", like: "{{icons}} vinden dit leuk", vote: "{{icons}} hebben hier op gestemd"}, by_you: {off_topic: "Jij markeerde dit als off-topic", spam: "Jij markeerde dit als spam", inappropriate: "Jij markeerde dit als ongepast", notify_moderators: "Jij markeerde dit voor moderatie", notify_user: "Jij stuurde een privé-bericht naar deze persoon", bookmark: "Jij voegde dit bericht toe aan je favorieten", like: "Jij vindt dit leuk", vote: "Jij hebt op dit bericht gestemd"}, by_you_and_others: {off_topic: {one: "Jij en iemand anders markeerden dit als off-topic", other: "Jij en {{count}} anderen markeerden dit als off-topic"}, spam: {one: "Jij en iemand anders markeerden dit als spam", other: "Jij en {{count}} anderen markeerden dit als spam"}, inappropriate: {one: "Jij en iemand anders markeerde dit als ongepast", other: "Jij en {{count}} anderen markeerden dit als ongepast"}, notify_moderators: {one: "Jij en iemand anders markeerden dit voor moderatie", other: "Jij en {{count}} anderen markeerden dit voor moderatie"}, notify_user: {one: "Jij en iemand anders stuurden een privé-bericht naar deze persoon", other: "Jij en {{count}} anderen stuurden een privé-bericht naar deze persoon"}, bookmark: {one: "Jij en iemand anders voegden dit bericht toe aan de favorieten", other: "Jij en {{count}} anderen voegden dit bericht toe aan de favorieten"}, like: {one: "Jij en iemand anders vinden dit leuk", other: "Jij en {{count}} anderen vinden dit leuk"}, vote: {one: "Jij en iemand anders hebben op dit bericht gestemd", other: "Jij en {{count}} anderen hebben op dit bericht gestemd"}}, by_others: {off_topic: {one: "Iemand heeft dit bericht gemarkeerd als off-topic", other: "{{count}} Mensen hebben dit bericht gemarkeerd als off-topic"}, spam: {one: "Iemand heeft dit bericht gemarkeerd als spam", other: "{{count}} Mensen hebben dit bericht gemarkeerd als spam"}, inappropriate: {one: "Iemand heeft dit bericht gemarkeerd als ongepast ", other: "{{count}} Mensen hebben dit bericht gemarkeerd als ongepast"}, notify_moderators: {one: "Iemand heeft dit bericht gemarkeerd voor moderatie", other: "{{count}} Mensen hebben dit bericht gemarkeerd voor moderatie"}, notify_user: {one: "Iemand stuurde een privé-bericht naar deze persoon", other: "{{count}} Mensen stuurden een privé-bericht naar deze persoon"}, bookmark: {one: "Iemand heeft dit bericht toegevoegd aan zijn favorieten", other: "{{count}} Mensen hebben dit bericht toegevoegd aan hun favorieten"}, like: {one: "Iemand vindt dit leuk", other: "{{count}} Mensen vinden dit leuk"}, vote: {one: "Iemand heeft op dit bericht gestemd", other: "{{count}} Mensen hebben op dit bericht gestemd"}}}, edits: {one: "één bewerking", other: "{{count}} bewerkingen", zero: "geen bewerkingen"}, "delete": {confirm: {one: "Weet je zeker dat je dit bericht wil verwijderen?", other: "Weet je zeker dat je al deze berichten wil verwijderen?"}}}, category: {none: "(geen categorie)", edit: "bewerk", edit_long: "Bewerk categorie", edit_uncategorized: "Wijzig ongecategoriseerd", view: "Bekijk topics in categorie", general: "Algemeen", settings: "Instellingen", "delete": "Verwijder categorie", create: "Maak categorie", save: "Bewaar categorie", creation_error: "Er ging bij het maken van de categorie iets mis.", save_error: "Er ging iets mis bij het opslaan van de categorie.", more_posts: "bekijk alle {{posts}}...", name: "Naam categorie", description: "Omschrijving", topic: "Onderwerp van de categorie", badge_colors: "badgekleuren", background_color: "achtergrondkleur", foreground_color: "voorgrondkleur", name_placeholder: "Moet kort en duidelijk zijn.", color_placeholder: "Kan elke web-kleur zijn", delete_confirm: "Weet je zeker dat je deze categorie wil verwijderen?", delete_error: "Er ging iets mis bij het verwijderen van deze categorie", list: "Lijst van categorieën", no_description: "Er is geen omschrijving voor deze categorie", change_in_category_topic: "Wijzig omschrijving", hotness: "Populariteit", already_used: "Deze kleur is al in gebruik door een andere categorie", is_secure: "Categorie beveiligen?", add_group: "Voeg groep toe", security: "Beveiliging", allowed_groups: "Toegestane groepen:", auto_close_label: "Sluit topics automatisch na:"}, flagging: {title: "Waarom meld je dit bericht voor moderatie?", action: "Meld bericht", notify_action: "Meld", cant: "Sorry, je kan dit bericht momenteel niet melden.", custom_placeholder_notify_user: "Wat maakt dat je de schrijver persoonlijk iets wil melden? Wees specifiek, constructief en altijd aardig.", custom_placeholder_notify_moderators: "Waarom heeft dit bericht aandacht van een moderator nodig? Laat ons specifiek weten waar je je zorgen om maakt en stuur relevante links mee waar mogelijk.", custom_message: {at_least: "Gebruik ten minste {{n}} tekens", more: "Nog {{n}} te gaan...", left: "Nog {{n}} resterend"}}, topic_summary: {title: "Topic samenvatting", links_shown: "laat alle {{totalLinks}} links zien...", clicks: "clicks", topic_link: "link naar topic"}, topic_statuses: {locked: {help: "deze topic is gesloten; nieuwe reacties worden niet langer geaccepteerd"}, pinned: {help: "deze topic is gepind; het zal bovenaan de lijst van topics in zijn categorie staan."}, archived: {help: "deze topic is gearchiveerd; het is bevroren en kan niet meer veranderd worden"}, invisible: {help: "deze topic is onzichtbaar; het zal niet worden weergegeven in topiclijsten en kan alleen via een directe link bezocht worden"}}, posts: "Berichten", posts_long: "{{number}} berichten in deze topic", original_post: "Originele bericht", views: "Bekeken", replies: "Reacties", views_long: "deze topic is {{number}} keer bekeken", activity: "Activiteit", likes: "Leuk", top_contributors: "Deelnemers", category_title: "Categorie", history: "Geschiedenis", changed_by: "door {{author}}", categories_list: "Categorielijst", filters: {latest: {title: "Recent", help: "de meest recente topics"}, hot: {title: "Populair", help: "een selectie van de meest populaire topics"}, favorited: {title: "Favorieten", help: "topics die je als favoriet hebt ingesteld"}, read: {title: "Gelezen", help: "topics die je hebt gelezen, in de volgorde wanneer je ze voor het laatst gelezen hebt"}, categories: {title: "Categorieën", title_in: "Categorie - {{categoryName}}", help: "alle topics gesorteerd op categorie"}, unread: {title: {zero: "Ongelezen", one: "Ongelezen (1)", other: "Ongelezen ({{count}})"}, help: "gevolgde topics met ongelezen berichten"}, "new": {title: {zero: "Nieuw", one: "Nieuw (1)", other: "Nieuw ({{count}})"}, help: "nieuwe topics sinds je laatse bezoek"}, posted: {title: "Mijn berichten", help: "topics waarin je een bericht hebt geplaatst"}, category: {title: {zero: "{{categoryName}}", one: "{{categoryName}} (1)", other: "{{categoryName}} ({{count}})"}, help: "recente topics in de categorie {{categoryName}}"}}, browser_update: 'Helaas <a href="http://www.discourse.org/faq/#browser">is je browser te oud om te kunnen werken met dit forum</a>. <a href="http://browsehappy.com">Upgrade je browser</a>.', type_to_filter: "typ om te filteren...", admin: {title: "Discourse Beheer", moderator: "Moderator", dashboard: {title: "Dashboard", version: "versie", up_to_date: "Je bent up to date!", critical_available: "Er is een belangrijke update beschikbaar", updates_available: "Er zijn updates beschikbaar", please_upgrade: "Werk de software bij alsjeblieft", installed_version: "Geïnstalleerd", latest_version: "Recent", problems_found: "Er zijn een aantal problemen gevonden met je Discourse installatie:", last_checked: "Laatste check", refresh_problems: "Laad opnieuw", no_problems: "Er zijn geen problemen gevonden", moderators: "Moderators:", admins: "Admins:", blocked: "Geblokkeerd:", private_messages_short: "PBs", private_messages_title: "Privé-berichten", reports: {today: "Vandaag", yesterday: "Gisteren", last_7_days: "Afgelopen 7 dagen", last_30_days: "Afgelopen 30 dagen", all_time: "Sinds het begin", "7_days_ago": "7 Dagen geleden", "30_days_ago": "30 Dagen geleden", all: "Alle", view_table: "Bekijk als tabel", view_chart: "Bekijk als staafdiagram"}}, commits: {latest_changes: "Laatste wijzigingen: update regelmatig!", by: "door"}, flags: {title: "Meldingen", old: "Oud", active: "Actief", clear: "Wis meldingen", clear_title: "verwijder alle meldingen over dit bericht (laat verborgen berichten weer zien)", "delete": "Verwijder bericht", delete_title: "verwijder bericht (als het het eerste bericht is van een topic, verwijdert dit de topic)", flagged_by: "Gemarkeerd door", error: "Er ging iets mis", view_message: "bekijk bericht"}, groups: {title: "Groepen", edit: "Wijzig groepen", selector_placeholder: "voeg leden toe", name_placeholder: "Groepsnaam, geen spaties, zelfde regels als bij een gebruikersnaam"}, api: {title: "API", long_title: "API informatie", key: "Key", generate: "Genereer API Key", regenerate: "Genereer API Key opnieuw", info_html: "Met deze API key kun je met behulp van JSON calls topics maken en bewerken.", note_html: "Houd deze key <strong>geheim</strong>, gebruikers die deze key hebben kunnen zich als elke andere gebruiker voordoen op het forum en topics aanmaken."}, customize: {title: "Aanpassingen", long_title: "Aanpassingen aan de site", header: "Header", css: "Stylesheet", override_default: "Sluit de standaard stylesheet uit", enabled: "Ingeschakeld?", preview: "voorbeeld", undo_preview: "herstel voorbeeld", save: "Opslaan", "new": "Nieuw", new_style: "Nieuwe stijl", "delete": "Verwijder", delete_confirm: "Verwijder deze aanpassing?", about: "Met aanpassingen aan de site kun je stylesheets en headers wijzigen. Kies of voeg een toe om te beginnen."}, email: {title: "E-mail", sent_at: "Verzonden op", email_type: "E-mailtype", to_address: "Ontvangeradres", test_email_address: "e-mailadres om te testen", send_test: "verstuur test e-mail", sent_test: "Verzonden!"}, impersonate: {title: "Log in als gebruiker", username_or_email: "Gebruikersnaam of e-mailadres van gebruiker", help: "Gebruik dit hulpmiddel om in te loggen als een gebruiker voor debug-doeleinden.", not_found: "Die gebruiker kan niet gevonden worden.", invalid: "Sorry, maar als deze gebruiker mag je niet inloggen."}, users: {title: "Leden", create: "Voeg beheerder toe", last_emailed: "Laatste mail verstuurd", not_found: "Sorry, deze gebruikersnaam bestaat niet in ons systeem.", "new": "Nieuw", active: "Actief", pending: "Te beoordelen", approved: "Goedgekeurd?", approved_selected: {one: "accepteer lid", other: "accepteer {{count}} leden"}, titles: {active: "Actieve leden", "new": "Nieuwe leden", pending: "Nog niet geaccepteerde leden", newuser: "Leden met Trust Level 0 (Nieuw lid)", basic: "Leden met Trust Level 1 (Lid)", regular: "Leden met Trust Level 2 (Regulier lid)", leader: "Leden met Trust Level 3 (Leider)", elder: "Leden met Trust Level 4 (Stamoudste)", admins: "Administrators", moderators: "Moderators", blocked: "Geblokkeerde leden"}}, user: {ban_failed: "Er ging iets fout met het blokkeren van deze gebruiker: {{error}}", unban_failed: "Er ging iets fout bij het deblokkeren van deze gebruiker: {{error}}", ban_duration: "Hoe lang wil je deze gebruiker blokkeren? (dagen)", delete_all_posts: "Verwijder alle berichten", ban: "Blokkeer", unban: "Deblokkeer", banned: "Geblokkeerd?", moderator: "Moderator?", admin: "Beheerder?", show_admin_profile: "Beheerder", refresh_browsers: "Forceer browser refresh", show_public_profile: "Bekijk openbaar profiel", impersonate: "Log in als gebruiker", revoke_admin: "Ontneem beheerdersrechten", grant_admin: "Geef Beheerdersrechten", revoke_moderation: "Ontneem modereerrechten", grant_moderation: "Geef modereerrechten", unblock: "Deblokkeer", block: "Blokkeer", reputation: "Reputatie", permissions: "Toestemmingen", activity: "Activiteit", like_count: "Ontvangen 'Vind ik leuk'", private_topics_count: "Aantal privé-topics", posts_read_count: "Berichten gelezen", post_count: "Berichten gemaakt", topics_entered: "Topics binnengegaan", flags_given_count: "Meldingen gedaan", flags_received_count: "Meldigen ontvangen", approve: "Accepteer", approved_by: "Geaccepteerd door", time_read: "Tijd gelezen", "delete": "Verwijder gebruiker", delete_forbidden: "Deze gebruiker kan niet verwijderd worden omdat er berichten zijn. Verwijder eerst alle berichten van deze gebruiker.", delete_confirm: "Weet je zeker dat je deze gebruiker definitief wil verwijderen? Deze handeling is permanant!", deleted: "De gebruiker is verwijderd.", delete_failed: "Er ging iets mis bij het verwijderen van deze gebruiker. Zorg er voor dat alle berichten van deze gebruiker eerst verwijderd zijn.", send_activation_email: "Verstuur activatiemail", activation_email_sent: "Een activatiemail is verstuurd.", send_activation_email_failed: "Er ging iets mis bij het versturen van de activatiemail.", activate: "Activeer account", activate_failed: "Er ging iets mis bij het activeren van deze gebruiker.", deactivate_account: "Deactiveer account", deactivate_failed: "Er ging iets mis bij het deactiveren van deze gebruiker.", unblock_failed: "Er ging iets mis bij het deblokkeren van deze gebruiker.", block_failed: "Er ging iets mis bij het blokkeren van deze gebruiker.", block_explanation: "Een geblokkeerde gebruiker kan geen topics maken of reageren op topics."}, site_content: {none: "Selecteer een tekst om deze te bewerken", title: "Teksten", edit: "Bewerk teksten"}, site_settings: {show_overriden: "Bekijk alleen bewerkte instellingen", title: "Instellingen", reset: "herstel naar standaardinstellingen"}}}}}, I18n.locale = "nl", function (e) {
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
        o && e._d.setTime(+e._d + o * n), (u || l) && (r = e.minute(), i = e.hour()), u && e.date(e.date() + u * n), l && (a = e.date(), e.date(1).month(e.month() + l * n).date(Math.min(a, e.daysInMonth()))), o && !s && P.updateOffset(e), (u || l) && (e.minute(r), e.hour(i))
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
        return t.abbr = e, R[e] || (R[e] = new s), R[e].set(t), R[e]
    }

    function f(e) {
        return e ? (!R[e] && O && require("./lang/" + e), R[e]) : P.fn._lang
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

        for (var s = 5; s-- && B.test(t);)t = t.replace(B, n);
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

    function T(e) {
        var t, n, s, i, o, u = 99;
        for (i = 0; e._f.length > i; i++)t = a({}, e), t._f = e._f[i], x(t), n = new r(t), o = h(t._a, n.toArray()), n._il && (o += n._il.length), u > o && (u = o, s = n);
        a(e, s)
    }

    function k(e) {
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
        n === e ? t._d = new Date : s ? t._d = new Date(+s[1]) : "string" == typeof n ? k(t) : c(n) ? (t._a = n.slice(0), w(t)) : t._d = n instanceof Date ? new Date(+n) : new Date(n)
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
        return i > r && (i -= 7), r - 7 > i && (i += 7), s = P(e).add("d", i), {week: Math.ceil(s.dayOfYear() / 7), year: s.year()}
    }

    function I(e) {
        var t = e._i, n = e._f;
        return null === t || "" === t ? null : ("string" == typeof t && (e._i = t = f().preparse(t)), P.isMoment(t) ? (e = a({}, t), e._d = new Date(+t._d)) : n ? c(n) ? T(e) : x(e) : D(e), new r(e))
    }

    function M(e, t) {
        P.fn[e] = P.fn[e + "s"] = function (e) {
            var n = this._isUTC ? "UTC" : "";
            return null != e ? (this._d["set" + n + t](e), P.updateOffset(this), this) : this._d["get" + n + t]()
        }
    }

    function A(e) {
        P.duration.fn[e] = function () {
            return this._data[e]
        }
    }

    function N(e, t) {
        P.duration.fn["as" + e] = function () {
            return+this / t
        }
    }

    for (var P, z, L = "2.0.0", j = Math.round, R = {}, O = "undefined" != typeof module && module.exports, U = /^\/?Date\((\-?\d+)/i, F = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, H = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, B = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, V = /\d\d?/, Y = /\d{1,3}/, G = /\d{3}/, q = /\d{1,4}/, W = /[+\-]?\d{1,6}/, $ = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, K = /Z|[\+\-]\d\d:?\d\d/i, Q = /T/i, Z = /[\+\-]?\d+(\.\d{1,3})?/, J = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, X = "YYYY-MM-DDTHH:mm:ssZ", et = [
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
    }}; at.length;)z = at.pop(), ut[z + "o"] = n(ut[z], z);
    for (; ot.length;)z = ot.pop(), ut[z + z] = t(ut[z], 2);
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
        var n, s, r = P.isDuration(e), a = "number" == typeof e, o = r ? e._data : a ? {} : e, u = F.exec(e);
        return a ? t ? o[t] = e : o.milliseconds = e : u && (n = "-" === u[1] ? -1 : 1, o = {y: 0, d: ~~u[2] * n, h: ~~u[3] * n, m: ~~u[4] * n, s: ~~u[5] * n, ms: ~~u[6] * n}), s = new i(o), r && e.hasOwnProperty("_lang") && (s._lang = e._lang), s
    }, P.version = L, P.defaultFormat = X, P.updateOffset = function () {
    }, P.lang = function (e, t) {
        return e ? (t ? d(e, t) : R[e] || f(e), P.duration.fn._lang = P.fn._lang = f(e), void 0) : P.fn._lang._abbr
    }, P.langData = function (e) {
        return e && e._lang && e._lang._abbr && (e = e._lang._abbr), f(e)
    }, P.isMoment = function (e) {
        return e instanceof r
    }, P.isDuration = function (e) {
        return e instanceof i
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
        var s, r, i = this._isUTC ? P(e).zone(this._offset || 0) : P(e).local(), a = 6e4 * (this.zone() - i.zone());
        return t = p(t), "year" === t || "month" === t ? (s = 432e5 * (this.daysInMonth() + i.daysInMonth()), r = 12 * (this.year() - i.year()) + (this.month() - i.month()), r += (this - P(this).startOf("month") - (i - P(i).startOf("month"))) / s, "year" === t && (r /= 12)) : (s = this - i - a, r = "second" === t ? s / 1e3 : "minute" === t ? s / 6e4 : "hour" === t ? s / 36e5 : "day" === t ? s / 864e5 : "week" === t ? s / 6048e5 : s), n ? r : o(r)
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
        var t = j((P(this).startOf("day") - P(this).startOf("year")) / 864e5) + 1;
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
    }}, z = 0; nt.length > z; z++)M(nt[z].toLowerCase().replace(/s$/, ""), nt[z]);
    M("year", "FullYear"), P.fn.days = P.fn.day, P.fn.months = P.fn.month, P.fn.weeks = P.fn.week, P.fn.isoWeeks = P.fn.isoWeek, P.fn.toJSON = P.fn.toISOString, P.duration.fn = i.prototype = {weeks: function () {
        return o(this.days() / 7)
    }, valueOf: function () {
        return this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * ~~(this._months / 12)
    }, humanize: function (e) {
        var t = +this, n = C(t, !e, this.lang());
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
    for (z in st)st.hasOwnProperty(z) && (N(z, st[z]), A(z.toLowerCase()));
    N("Weeks", 6048e5), P.duration.fn.asMonths = function () {
        return(+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, P.lang("en", {ordinal: function (e) {
        var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
        return e + n
    }}), O && (module.exports = P), "undefined" == typeof ender && (this.moment = P), "function" == typeof define && define.amd && define("moment", [], function () {
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