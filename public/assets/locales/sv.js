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
    var s = e.getDay(), r = e.getDate(), a = e.getFullYear(), i = e.getMonth() + 1, o = e.getHours(), u = o, l = o > 11 ? 1 : 0, c = e.getSeconds(), h = e.getMinutes(), d = e.getTimezoneOffset(), p = Math.floor(Math.abs(d / 60)), f = Math.abs(d) - 60 * p, m = (d > 0 ? "-" : "+") + (2 > p.toString().length ? "0" + p : p) + (2 > f.toString().length ? "0" + f : f);
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
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, MessageFormat = {locale: {}}, MessageFormat.locale.sv = function (e) {
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
}({}), I18n.translations = {sv: {js: {share: {topic: "dela en länk till denna tråd", post: "dela en länk till denna tråd", close: "stäng", twitter: "dela denna länk via Twitter", facebook: "dela denna länk via Facebook", "google+": "dela denna länk via Google+"}, edit: "ändra titel och kategori för denna tråd", not_implemented: "Den funktionen har inte implementerats än, tyvärr!", no_value: "Nej", yes_value: "Ja", of_value: "av", generic_error: "Tyvärr, ett fel har uppstått.", log_in: "Logga In", age: "Ålder", last_post: "Sista inlägget", admin_title: "Admin", flags_title: "Flaggningar", show_more: "visa mer", links: "Länkar", faq: "FAQ", you: "Du", or: "eller", now: "just nu", suggested_topics: {title: "Föreslagna Trådar"}, bookmarks: {not_logged_in: "Tyvärr måste du vara inloggad för att bokmärka inlägg.", created: "Du har bokmärkt detta inlägg.", not_bookmarked: "Du har läst detta inlägg; klicka för att bokmärka det.", last_read: "Detta är det sista inlägget du läst."}, new_topics_inserted: "{{count}} nya trådar.", show_new_topics: "Klicka för att visa.", preview: "förhandsgranska", cancel: "avbryt", save: "Spara Ändringar", saving: "Sparar...", saved: "Sparat!", user_action_descriptions: {6: "Svar"}, user: {profile: "Profil", title: "Användare", mute: "Dämpa", edit: "Ändra Inställningar", download_archive: "ladda ner ett arkiv med mina inlägg", private_message: "Privata Meddelanden", private_messages: "Meddelanden", activity_stream: "Aktivitet", preferences: "Inställningar", bio: "Om mig", change_password: "byt", invited_by: "Inbjuden Av", trust_level: "Pålitlighetsnivå", external_links_in_new_tab: "Öppna alla externa länkar i en ny flik", enable_quoting: "Aktivera citatsvar för markerad text", change_username: {action: "byt", title: "Byt Användarnamn", confirm: "Det kan finnas konsekvenser till att byta ditt användarnamn. Är du helt säker på att du vill?", taken: "Tyvärr det användarnamn är taget.", error: "Det uppstod ett problem under bytet av ditt användarnamn.", invalid: "Det användarnamnet är ogiltigt. Det får bara innehålla siffror och bokstäver"}, change_email: {action: "byt", title: "Byt E-post", taken: "Tyvärr den adressen är inte tillgänglig.", error: "Det uppstod ett problem under bytet av din e-post. Är kanske adressen redan upptagen?", success: "Vi har skickat ett mail till den adressen. Var god följ bekräftelseinstruktionerna."}, email: {title: "E-post", instructions: "Din e-postadress kommer aldrig att visas för allmänheten.", ok: "Ser bra ut. Vi kommer maila dig för att bekräfta.", invalid: "Vad god ange en giltig e-postadress.", authenticated: "Din e-post har verifierats av {{provider}}.", frequency: "Vi kommer bara maila dig om vi inte har sett dig nyligen och du inte redan sett det vi mailar dig om."}, name: {title: "Namn", instructions: "Den längre versionen av ditt namn; behöver inte vara unikt. Används som ett alternativt @namn och visas bara på din användarsida.", too_short: "Ditt namn är för kort.", ok: "Ditt namn ser bra ut."}, username: {title: "Användarnamn", instructions: "Måste vara unikt, inga mellanrum. Personer kan omnämna dig som @{{username}}.", short_instructions: "Personer kan omnämna dig som @{{username}}.", available: "Ditt användarnamn är tillgängligt.", global_match: "E-posten matchar det registrerade användarnamnet.", global_mismatch: "Redan registrerat. Prova {{suggestion}}?", not_available: "Inte tillgängligt. Prova {{suggestion}}?", too_short: "Ditt användarnamn är för kort.", too_long: "Ditt användarnamn är för långt.", checking: "Kollar användarnamnets tillgänglighet...", enter_email: "Användarnamn hittat. Ange matchande e-post."}, password_confirmation: {title: "Lösenord Igen"}, last_posted: "Senaste Inlägg", last_emailed: "Senast Mailad", last_seen: "Senast Sedd", created: "Skapad Vid", log_out: "Logga Ut", website: "Webbplats", email_settings: "E-post", email_digests: {title: "När jag inte besöker sidan, skicka mig ett sammandrag via mail om vad som är nytt", daily: "dagligen", weekly: "veckovis", bi_weekly: "varannan vecka"}, email_direct: "Ta emot ett mail när någon citerar dig, svarar på dina inlägg, eller nämner ditt @användarnamn", email_private_messages: "Ta emot ett mail när någon skickar dig ett privat meddelande", other_settings: "Övrigt", new_topic_duration: {label: "Betrakta trådar som nya när", not_viewed: "Jag inte har kollat på dem än", last_here: "de postades efter jag var här sist", after_n_days: {one: "de postades det senaste dygnet", other: "de postades inom de senaste {{count}} dagarna"}, after_n_weeks: {one: "de postades den senaste veckan", other: "de postades inom de senaste {{count}} veckorna"}}, auto_track_topics: "Följ automatiskt trådar jag besöker", auto_track_options: {never: "aldrig", always: "alltid", after_n_seconds: {one: "efter 1 sekund", other: "efter {{count}} sekunder"}, after_n_minutes: {one: "efter 1 minut", other: "efter {{count}} minuter"}}, invited: {title: "Inbjudningar", user: "Inbjuden Användare", none: "{{username}} har inte bjudit in några användare till webbplatsen.", redeemed: "Inlösta Inbjudnignar", redeemed_at: "Inlöst Vid", pending: "Avvaktande Inbjudningar", topics_entered: "Trådar Besökta", posts_read_count: "Inlägg Lästa", rescind: "Ta Bort Inbjudan", rescinded: "Inbjudan borttagen", time_read: "Lästid", days_visited: "Dagar Besökta", account_age_days: "Kontoålder i dagar"}, password: {title: "Lösenord", too_short: "Ditt lösenord är för kort.", ok: "Ditt lösenord ser bra ut."}, ip_address: {title: "Senaste IP-adress"}, avatar: {title: "Profilbild", instructions: "Vi använder <a href='https://gravatar.com' target='_blank'>Gravatar</a> för profilbilder baserat på din e-post"}, filters: {all: "Alla"}, stream: {posted_by: "Postat av", sent_by: "Skickat av", private_message: "privat meddelande", the_topic: "tråden"}}, loading: "Laddar...", close: "Stäng", learn_more: "lär dig mer...", year: "år", year_desc: "trådar postade i de senaste 365 dagarna", month: "månad", month_desc: "trådar postade i de senaste 30 dagarna", week: "vecka", week_desc: "trådar postade i de senaste 7 dagarna", first_post: "Första inlägget", mute: "Dämpa", unmute: "Avdämpa", best_of: {title: "Bäst Av", enabled_description: 'Just nu visar du "Bäst Av"-läget för denna tråd.', description: "Det finns <b>{{count}}</b> inlägg i den här tråden. Det är många! Vill du spara tid genom att byta så du bara ser de inlägg med flest interaktioner och svar?", enable: 'Byt till "Bäst Av"-läget', disable: 'Avbryt "Bäst Av"'}, private_message_info: {title: "Privat Konversation", invite: "Bjud In Andra..."}, email: "E-post", username: "Användarnamn", last_seen: "Senast Sedd", created: "Skapad", trust_level: "Pålitlighetsnivå", create_account: {title: "Skapa Konto", action: "Skapa ett nu!", invite: "har du inget konto än?", failed: "Något gick fel, kanske är denna e-post redan registrerad, försök glömt lösenordslänken"}, forgot_password: {title: "Glömt Lösenord", action: "Jag har glömt mitt lösenord", invite: "Skriv in ditt användarnamn eller e-postadress, så vi skickar dig ett mail om lösenordsåterställning.", reset: "Återställ Lösenord", complete: "Du borde få ett mail med instruktioner om hur du återställer ditt lösenord inom kort."}, login: {title: "Logga In", username: "Inloggning", password: "Lösenord", email_placeholder: "e-postadress eller användarnamn", error: "Okänt fel", reset_password: "Återställ Lösenord", logging_in: "Loggar In...", or: "Eller", authenticating: "Autentiserar...", awaiting_confirmation: "Ditt konto väntar på aktivering, använd glömt lösenordslänken för att skicka ett nytt aktiveringsmail.", awaiting_approval: "Ditt konto har inte godkänts av en moderator än. Du kommer att få ett mail när det är godkänt.", not_activated: "Du kan inte logga in än. Vi har tidigare skickat ett aktiveringsmail till dig via <b>{{sentTo}}</b>. Var god följ instruktionerna i det mailet för att aktivera ditt konto.", resend_activation_email: "Klicka här för att skicka aktiveringsmailet igen.", sent_activation_email_again: "Vi har skickat ännu ett aktiveringsmail till dig via <b>{{currentEmail}}</b>. Det kan ta ett par minuter för det att komma fram; var noga med att kolla din skräppost.", google: {title: "med Google", message: "Autentiserar med Google (kolla så att pop up-blockare inte är aktiverade)"}, twitter: {title: "med Twitter", message: "Autentiserar med Twitter (kolla så att pop up-blockare inte är aktiverade)"}, facebook: {title: "med Facebook", message: "Autentiserar med Facebook (kolla så att pop up-blockare inte är aktiverade)"}, yahoo: {title: "med Yahoo", message: "Autentiserar med Yahoo (kolla så att pop up-blockare inte är aktiverade)"}, github: {title: "med GitHub", message: "Autentiserar med GitHub (kolla så att pop up-blockare inte är aktiverade)"}, persona: {title: " med Persona", message: "Autentiserar med Mozilla Persona (kolla så att pop up-blockare inte är aktiverade)"}}, composer: {posting_not_on_topic: 'Du svarar på tråden "{{title}}", men du besöker just nu en annan tråd.', saving_draft_tip: "sparar", saved_draft_tip: "sparat", saved_local_draft_tip: "sparat lokalt", similar_topics: "Din tråd liknar...", drafts_offline: "utkast offline", min_length: {need_more_for_title: "{{n}} tecken kvar för titeln", need_more_for_reply: "{{n}} tecken kvar för svaret"}, save_edit: "Spara Ändring", reply_original: "Svara på Ursprungstråd", reply_here: "Svara Här", reply: "Svara", cancel: "Avbryt", create_topic: "Skapa Tråd", create_pm: "Skapa Privat Meddelande", users_placeholder: "Lägg till en användare", title_placeholder: "Skriv din titel här. Vad handlar denna diskussion om i en kort mening?", reply_placeholder: "Skriv ditt svar här. Använd Markdown eller BBCode för formatering. Dra eller klista in en bild här för att ladda upp den.", view_new_post: "Visa ditt nya inlägg.", saving: "Sparar...", saved: "Sparat!", saved_draft: "Du har ett pågående inläggsutkast. Klicka någonstans i denna ruta för att fortsätta redigera.", uploading: "Laddar upp...", show_preview: "visa förhandsgranskning &raquo;", hide_preview: "&laquo; dölj förhandsgranskning", bold_title: "Fet", bold_text: "fet text", italic_title: "Kursiv", italic_text: "kursiv text", link_title: "Hyperlänk", link_description: "skriv en länkbeskrivning här", link_dialog_title: "Infoga Hyperlänk", link_optional_text: "valfri titel", quote_title: "Citat", quote_text: "Citat", code_title: "Kodexempel", code_text: "skriv din kod här", image_title: "Bild", image_description: "skriv en bildbeskrivning här", image_dialog_title: "Infoga Bild", image_optional_text: "valfri titel", image_hosting_hint: "Behöver du <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>gratis bilduppladdning?</a>", olist_title: "Numrerad Lista", ulist_title: "Punktlista", list_item: "Listobjekt", heading_title: "Rubrik", heading_text: "Rubrik", hr_title: "Horisontell linje", undo_title: "Ångra", redo_title: "Återställ", help: "Markdown Redigeringshjälp"}, notifications: {title: "notifikationer med omnämnanden av @namn, svar på dina inlägg och trådar, privata meddelanden, etc", none: "Du har inte notifikationer just nu.", more: "visa äldre notifikationer", mentioned: "<span title='omnämnd' class='icon'>@</span> {{username}} {{link}}", quoted: "<i title='citerad' class='icon icon-quote-right'></i> {{username}} {{link}}", replied: "<i title='svarad' class='icon icon-reply'></i> {{username}} {{link}}", posted: "<i title='svarad' class='icon icon-reply'></i> {{username}} {{link}}", edited: "<i title='ändrad' class='icon icon-pencil'></i> {{username}} {{link}}", liked: "<i title='gillad' class='icon icon-heart'></i> {{username}} {{link}}", private_message: "<i class='icon icon-envelope-alt' title='privat meddelande'></i> {{username}} skickade dig ett privat meddelande: {{link}}", invited_to_private_message: "{{username}} bjöd in dig till en privat konversation: {{link}}", invitee_accepted: "<i title='accepterade din inbjudan' class='icon icon-signin'></i> {{username}} accepterade din inbjudan", moved_post: "<i title='flyttade inlägg' class='icon icon-arrow-right'></i> {{username}} flyttade inlägg till {{link}}"}, image_selector: {title: "Infoga Bild", from_my_computer: "Från Min Enhet", from_the_web: "Från Internet", add_image: "Lägg Till Bild", remote_tip: "skriv in en adress till en bild i formen http://exempel.se/bild.jpg", local_tip: "klicka för att välja en bild från din enhet.", upload: "Ladda Upp", uploading_image: "Laddar upp bild"}, search: {title: "sök efter trådar, inlägg, användare, eller kategorier", placeholder: "skriv din sökterm här", no_results: "Inga resultat hittades.", searching: "Söker ..."}, site_map: "gå till en annan trådlista eller kategori", go_back: "gå tillbaka", current_user: "gå till din användarsida", favorite: {title: "Favorit", help: {star: "lägg till denna tråd i din favoritlista", unstar: "ta bort denna tråd från din favoritlista"}}, topics: {none: {favorited: "Du har inte favoritmarkerat några trådar än. För att favoritmarkera en tråd, klicka eller tryck på stjärnan brevid titeln.", unread: "Du har inga olästa trådar att läsa.", "new": "Du har inga nya trådar att läsa.", read: "Du har inte läst några trådar än.", posted: "Du har inte postat i några trådar än.", latest: "Det finns inga senaste trådar. Det är lite sorgligt.", hot: "Det finns inga heta trådar.", category: "Det finns inga {{category}}-trådar."}, bottom: {latest: "Det finns inga fler senaste trådar att läsa.", hot: "Det finns inga fler heta trådar att läsa.", posted: "Det finns inga fler postade trådar att läsa", read: "Det finns inga fler lästa trådar att läsa.", "new": "Det finns inga fler nya trådar att läsa.", unread: "Det finns inga fler oläsa trådar att läsa.", favorited: "Det finns inga fler favoritmarkerade trådar att läsa.", category: "Det finns inga fler {{category}}-trådar."}}, rank_details: {toggle: "växla på/av trådranksdetaljer", show: "visa trådranksdetaljer", title: "Trådranksdetaljer"}, topic: {create_in: "Skapa {{categoryName}}-tråd", create: "Skapa Tråd", create_long: "Skapa en nytt Tråd", private_message: "Starta en privat konversation", list: "Trådar", "new": "ny tråd", title: "Tråd", loading_more: "Laddar fler Trådar...", loading: "Laddar tråd...", invalid_access: {title: "Tråden är privat", description: "Tyvärr, du har inte behörighet till den tråden."}, server_error: {title: "Tråden misslyckades med att ladda", description: "Tyvärr, vi kunde inte ladda den tråden, troligen p.g.a. ett anslutningsproblem. Var go försök igen. Om problemet kvarstår, låt oss gärna veta det!"}, not_found: {title: "Tråden hittades inte", description: "Tyvärr, vi kunde inte hitta den tråden. Kanske har den tagits bort av en moderator?"}, unread_posts: "du har {{unread}} gamla olästa inlägg i den här tråden", new_posts: "det finns {{new_posts}} nya inlägg i den här tråden sen du senaste läste det", likes: {one: "det finns 1 gillning i den här tråden", other: "det finns {{count}} gillningar i den här tråden"}, back_to_list: "Tillbaka till Trådlistan", options: "Trådinställningar", show_links: "visa länkar som finns i den här tråden", toggle_information: "slå på/av tråddetaljer", read_more_in_category: "Vill du läsa mer? Bläddra bland andra trådar i {{catLink}} eller {{latestLink}}.", read_more: "Vill du läsa mer? {{catLink}} eller {{latestLink}}.", browse_all_categories: "Bläddra bland alla kategorier", view_latest_topics: "visa senaste trådar", suggest_create_topic: "Varför inte skapa en tråd?", read_position_reset: "Din läsposition har blivit återställd.", jump_reply_up: "hoppa till tidigare svar", jump_reply_down: "hoppa till senare svar", deleted: "Tråden har raderats", progress: {title: "trådplacering", jump_top: "hoppa till första inlägget", jump_bottom: "hoppa till sista inlägget", total: "antal inlägg", current: "nuvarande inlägg"}, notifications: {title: "", reasons: {"3_2": "Du kommer ta emot notifikationer för att du kollar in denna tråd.", "3_1": "Du kommer ta emot notifikationer för att du skapade denna tråd.", 3: "Du kommer ta emot notifikationer för att du kollar in denna tråd.", "2_4": "Du kommer ta emot notifikationer för att du postade ett svar till denna tråd.", "2_2": "Du kommer ta emot notifikationer för att du följer denna tråd.", 2: 'Du kommer ta emot notifikationer för att du <a href="/users/{{username}}/preferences">läser denna tråd</a>.', 1: "Du kommer bara meddelandes om någon nämner ditt @namn eller svara på dina inlägg.", "1_2": "Du kommer bara meddelandes om någon nämner ditt @namn eller svara på dina inlägg.", 0: "Du ignorerar alla notifikationer för denna tråd.", "0_2": "Du ignorerar alla notifikationer för denna tråd."}, watching: {title: "Kollar", description: "samma som Följer, plus att du meddelas om alla nya inlägg."}, tracking: {title: "Följer", description: "du meddelas om omnämnanden av @namn, och svar på dina inlägg, plus att du ser antal olästa och nya inlägg.."}, regular: {title: "Vanlig", description: "du meddelas bara om någon nämner ditt @namn eller svarar på ditt inlägg."}, muted: {title: "Dämpad", description: "du kommer inte meddelas om denna tråd alls, och den kommer inte visas i din flik med olästa."}}, actions: {"delete": "Radera Tråd", open: "Öppna Tråd", close: "Stäng Tråd", unpin: "Avnåla Tråd", pin: "Nåla Tråd", unarchive: "Dearkivera Tråd", archive: "Arkivera Tråd", invisible: "Gör Osynlig", visible: "Gör Synlig", reset_read: "Återställ Läsdata", multi_select: "Växla på/av flervalsfunktion", convert_to_topic: "Konvertera till Vanlig Tråd"}, reply: {title: "Svara", help: "börja komponera ett svar till denna tråd"}, clear_pin: {title: "Rensa nål", help: "Rensa den nålade statusen från denna tråd så den inte längre hamnar i toppen av din trådlista"}, share: {title: "Dela", help: "dela en länk till denna tråd"}, inviting: "Bjuder in...", invite_private: {title: "Bjud in till Privat Konversation", email_or_username: "Den Inbjudnas E-post eller Användarnamn", email_or_username_placeholder: "e-postadress eller användarnamn", action: "Bjud In", success: "Tack! Vi har bjudit in den användaren att delta i denna privata konversation.", error: "Tyvärr det uppstod ett fel under inbjudandet av den användaren."}, invite_reply: {title: "Bjud in Vänner att Svara", help: "skicka inbjudningar till vänner så de kan svara i den här tråden med ett enda klick", email: "Vi skickar din vän ett kort mail så de kan svara i den här tråden genom att klicka på en länk.", email_placeholder: "e-postadress", success: "Tack! Vi har mailat ut ett inbjudan till <b>{{email}}</b>. Vi låter dig veta när de löst in sin inbjudan. Kolla in fliken med Inbjudningar på din användarsida för att hålla koll på vem du har bjudit in.", error: "Tyvärr vi kunde inte bjudan in den personen. Kanske är den redan en användare?"}, login_reply: "Logga In för att Svara", filters: {user: "Du visar bara {{n_posts}} {{by_n_users}}.", n_posts: {one: "1 inlägg", other: "{{count}} inlägg"}, by_n_users: {one: "skapat av 1 specifik användare", other: "skapat av {{count}} specifika användare"}, best_of: "Du visar bara {{n_best_posts}} {{of_n_posts}}.", n_best_posts: {one: "1 bästa inlägg", other: "{{count}} bästa inlägg"}, of_n_posts: {one: "av 1 i tråden", other: "av {{count}} i tråden"}, cancel: "Visa alla inlägg i den här tråden igen."}, move_selected: {title: "Flytta Markerade Inlägg", topic_name: "Nya Trådens Namn:", error: "Tyvärr, det uppstod ett problem under flytten av de inläggen.", instructions: {one: "Du håller på att skapa en ny tråd och fylla den med inlägget som du markerat.", other: "Du håller på att skapa en ny tråd och fylla den med de <b>{{count}}</b> inlägg som du markerat."}}, multi_select: {select: "markera", selected: "markerade ({{count}})", "delete": "radera markerade", cancel: "avbryt markering", move: "flytta markerade", description: {one: "Du har markerat <b>1</b> inlägg.", other: "Du har markerat <b>{{count}}</b> inlägg."}}}, post: {reply: "Svarar på {{link}} av {{replyAvatar}} {{username}}", reply_topic: "Svar på {{link}}", quote_reply: "citatsvar", edit: "Ändra {{link}} av {{replyAvatar}} {{username}}", post_number: "inlägg {{number}}", in_reply_to: "som svar till", reply_as_new_topic: "Svara som ny Tråd", continue_discussion: "Fortsätter diskussionen från {{postLink}}:", follow_quote: "gå till det citerade inlägget", deleted_by_author: "(inlägg borttaget av författaren)", has_replies: {one: "Svara", other: "Svar"}, errors: {create: "Tyvärr, det uppstod ett fel under skapandet av ditt inlägg. Var god försök igen.", edit: "Tyvärr, det uppstod ett fel under ändringen av ditt inlägg. Var god försök igen.", upload: "Tyvärr, det uppstod ett fel under uppladdandet av den filen. Vad god försök igen.", upload_too_large: "Tyvärr, filen som du försöker ladda upp är för stor (maxstorlek är {{max_size_kb}}kb), var god ändra storlek och försök igen.", upload_too_many_images: "Tyvärr, du kan bara ladda upp en bild i taget.", only_images_are_supported: "Tyvärr, du kan bara ladda upp bilder."}, abandon: "Är du säker på att du vill överge ditt inlägg?", archetypes: {save: "Spara Inställningar"}, controls: {reply: "börja komponera ett svar till detta inlägg", like: "gilla detta inlägg", edit: "ändra detta inlägg", flag: "flagga detta inlägg för moderatorsuppmärksamhet", "delete": "radera detta inlägg", undelete: "återställ detta inlägg", share: "dela en länk till detta inlägg", bookmark: "bokmärk detta inlägg till din användarsida", more: "Mer"}, actions: {flag: "Flaga", clear_flags: {one: "Ta bort flagga", other: "Ta bort flaggningar"}, it_too: {off_topic: "Flagga det också", spam: "Flagga det också", inappropriate: "Flagga det också", custom_flag: "Flagga det också", bookmark: "Bokmärk det också", like: "Gilla det också", vote: "Rösta för det också"}, undo: {off_topic: "Ångra flaggning", spam: "Ångra flaggning", inappropriate: "Ångra flaggning", custom_flag: "Ångra flaggning", bookmark: "Ångra bokmärkning", like: "Ångra gillning", vote: "Ångra röstning"}, people: {off_topic: "{{icons}} markerade detta som off-topic", spam: "{{icons}} markerade detta som spam", inappropriate: "{{icons}} markerade detta som olämpligt", custom_flag: "{{icons}} flaggade detta", bookmark: "{{icons}} bokmärkte detta", like: "{{icons}} gillade detta", vote: "{{icons}} röstade för detta"}, by_you: {off_topic: "Du flaggade detta som off-topic", spam: "Du flaggade detta som spam", inappropriate: "Du flaggade detta som olämpligt", custom_flag: "Du flaggade detta för moderation", bookmark: "Du bokmärkte detta inlägg", like: "Du gillade detta", vote: "Du röstade för detta inlägg"}, by_you_and_others: {off_topic: {one: "Du och 1 annan flaggade detta som off-topic", other: "Du och {{count}} andra personer flaggade detta som off-topic"}, spam: {one: "Du och 1 annan flaggade detta som spam", other: "Du och {{count}} andra personer flaggade detta som spam"}, inappropriate: {one: "Du och 1 annan flaggade detta som olämpligt", other: "Du och {{count}} andra personer flaggade detta som olämpligt"}, custom_flag: {one: "Du och 1 annan flaggade detta för moderation", other: "Du och {{count}} andra personer flaggade detta för moderation"}, bookmark: {one: "Du och 1 annan bokmärkte detta inlägg", other: "Du och {{count}} andra personer bokmärkte detta inlägg"}, like: {one: "Du och 1 annan gillade detta", other: "Du och {{count}} andra personer gillade detta"}, vote: {one: "Du och 1 annan röstade för detta inlägg", other: "Du och {{count}} andra personer röstade för detta inlägg"}}, by_others: {off_topic: {one: "1 person flaggade detta som off-topic", other: "{{count}} personer flaggade detta som off-topic"}, spam: {one: "1 person flaggade detta som spam", other: "{{count}} personer flaggade detta som spam"}, inappropriate: {one: "1 person flaggade detta som olämpligt", other: "{{count}} personer flaggade detta som olämpligt"}, custom_flag: {one: "1 person flaggade detta för moderation", other: "{{count}} personer flaggade detta för moderation"}, bookmark: {one: "1 person bokmärkte detta inlägg", other: "{{count}} personer bokmärkte detta inlägg"}, like: {one: "1 person gillade detta", other: "{{count}} personer gillade detta"}, vote: {one: "1 person röstade för detta inlägg", other: "{{count}} personer röstade för detta inlägg"}}}, edits: {one: "1 ändring", other: "{{count}} ändringar", zero: "inga ändringar"}, "delete": {confirm: {one: "Är du säker på att du vill radera detta inlägg?", other: "Är du säker på att du vill radera alla dessa inlägg?"}}}, category: {none: "(ingen kategori)", edit: "ändra", edit_long: "Ändra Kategori", view: "Visa Trådar i Kategori", "delete": "Radera Kategori", create: "Skapa Kategori", creation_error: "Det uppstod ett fel när kategorin skulle skapas.", more_posts: "visa alla {{posts}}...", name: "Kategorinamn", description: "Beskrivning", topic: "Kategoristråd", badge_colors: "Emblemsfärg", background_color: "Bakgrundsfärg", foreground_color: "Förgrundsfärg", name_placeholder: "Ska vara kort och koncist.", color_placeholder: "Någon webbfärg", delete_confirm: "Är du säker på att du vill radera den kategorin?", list: "Lista Kategorier", no_description: "Det finns ingen beskrivning för denna kategori.", change_in_category_topic: "besök kategorins tråd för att ändra beskrivning", hotness: "Hethet"}, flagging: {title: "Varför flaggar du detta inlägg?", action: "Flagga Inlägg", cant: "Tyvärr, du kan inte flagga detta inlägg just nu.", custom_placeholder: "Varför kräver detta inlägg en moderators uppmärksamhet? Låt oss veta specifikt vad du är orolig för, och ta med relevanta länkar om möjligt.", custom_message: {at_least: "skriv åtminstone {{n}} tecken", more: "{{n}} fler...", left: "{{n}} kvar"}}, topic_summary: {title: "Trådsammanfattning", links_shown: "Visa alla {{totalLinks}} länkar..."}, topic_statuses: {locked: {help: "denna tråd är låst; den accepterar inte längre nya svar"}, pinned: {help: "denna tråd är nålad; den kommer att visas högst upp i sin kategori"}, archived: {help: "denna tråd är arkiverad; den är frusen och kan inte ändras"}, invisible: {help: "denna tråd är osynlig; den kommer inte att visas i trådlistor, och kan endast besökas via direktlänkar"}}, posts: "Inlägg", posts_long: "{{number}} inlägg i den här tråden", original_post: "Originalinlägg", views: "Visningar", replies: "Svar", views_long: "denna tråd har visats {{number}} gånger", activity: "Aktivitet", likes: "Gillningar", top_contributors: "Deltagare", category_title: "Kategori", history: "Historik", changed_by: "av {{author}}", categories_list: "Kategorilista", filters: {latest: {title: "Senaste", help: "det populäraste trådarna nyligen"}, hot: {title: "Hett", help: "ett urval av de hetaste trådarna"}, favorited: {title: "Favoriter", help: "trådar du favoritmarkerat"}, read: {title: "Lästa", help: "trådar du har läst, i den ordningen du senast läste dem"}, categories: {title: "Kategorier", title_in: "Kategori - {{categoryName}}", help: "alla trådar grupperade efter kategori"}, unread: {title: {zero: "Olästa", one: "Olästa (1)", other: "Olästa ({{count}})"}, help: "följda trådar med olästa inlägg"}, "new": {title: {zero: "Nya", one: "Nya (1)", other: "Nya ({{count}})"}, help: "nya trådar sen ditt senaste besök"}, posted: {title: "Mina Inlägg", help: "trådar som du har postat i"}, category: {title: {zero: "{{categoryName}}", one: "{{categoryName}} (1)", other: "{{categoryName}} ({{count}})"}, help: "senaste trådarna i {{categoryName}}-kategorin"}}, browser_update: 'Tyvärr, <a href="http://www.discourse.org/faq/#browser">din webbläsare är för gammal för att fungera på detta Discourse-forum</a>. Var god <a href="http://browsehappy.com">uppgradera din webbläsare</a>.', type_to_filter: "skriv för att filtrera...", admin: {title: "Discourse Admin", moderator: "Moderator", dashboard: {title: "Översiktspanel", version: "Version", up_to_date: "Du är aktuell!", critical_available: "En kritisk uppdatering är tillgänglig.", updates_available: "Uppdateringar är tillgängliga.", please_upgrade: "Var god uppgradera!", installed_version: "Installerad", latest_version: "Senaste", problems_found: "Några problem har hittas med din installation av Discourse:", moderators: "Moderatorer:", admins: "Administratörer:"}, reports: {today: "Idag", yesterday: "Igår", last_7_days: "Senaste 7 Dagarna", last_30_days: "Senaste 30 Dagarna", all_time: "Från Början", "7_days_ago": "7 Dagar Sedan", "30_days_ago": "30 Dagar Sedan", all: "Alla", view_table: "Visa som Tabell", view_chart: "Visa som Stapeldiagram"}, commits: {latest_changes: "Senaste ändringarna: snälla uppdatera ofta!", by: "av"}, flags: {title: "Flaggningar", old: "Gamla", active: "Aktiva", clear: "Rensa Flaggningar", clear_title: "rensa alla flaggningar av detta inlägg (kommer visa gömda inlägg)", "delete": "Radera Inlägg", delete_title: "radera inlägg (om det är första inlägget radera tråd)", flagged_by: "Flaggad av", error: "Någonting gick snett"}, api: {title: "API"}, customize: {title: "Anpassa", header: "Sidhuvud", css: "Stilmall", override_default: "Skriv över standard?", enabled: "Aktiverad?", preview: "förhandsgranska", undo_preview: "ångra förhandsgranskning", save: "Spara", "new": "Ny", new_style: "Ny Stil", "delete": "Radera", delete_confirm: "Radera denna anpassning?"}, email: {title: "E-postloggar", sent_at: "Skickat", email_type: "E-posttyp", to_address: "Till adress", test_email_address: "e-postadress att testa", send_test: "skicka testmail", sent_test: "skickat!"}, impersonate: {title: "Imitera Användare", username_or_email: "Användare eller E-post för Användare", help: "Använd detta verktyg för att imitera en användare i felsökningssyfte.", not_found: "Den användaren kan inte hittas.", invalid: "Tyvärr, du kan inte imitera den användaren."}, users: {title: "Användare", create: "Lägg till Administratör", last_emailed: "Senast Mailad", not_found: "Tyvärr den användaren existerar inte i vårt system.", "new": "Ny", active: "Aktiv", pending: "Avvaktande", approved: "Godkänd?", approved_selected: {one: "godkänd användare", other: "godkänd användare ({{count}})"}}, user: {ban_failed: "Någonting gick fel under avstängningen av denna användare {{error}}", unban_failed: "Någonting gick fel under upplåsningen av denna användare {{error}}", ban_duration: "Hur länge vill du stänga av denna användare? (dagar)", delete_all_posts: "Radera alla inlägg", ban: "Stäng av", unban: "Lås upp", banned: "Avstängd?", moderator: "Moderator?", admin: "Administratör?", show_admin_profile: "Administratör", refresh_browsers: "Tvinga webbläsaruppdatering", show_public_profile: "Visa Publik Profil", impersonate: "Imitera", revoke_admin: "Återkalla Administratör", grant_admin: "Bevilja Administratör", revoke_moderation: "Återkalla Moderering", grant_moderation: "Bevilja Moderering", reputation: "Rykte", permissions: "Rättigheter", activity: "Aktivitet", like_count: "Gillningar Mottagna", private_topics_count: "Antal Privata Trådar", posts_read_count: "Inlägg Lästa", post_count: "Inlägg Skapade", topics_entered: "Trådar Besökta", flags_given_count: "Givna Flaggnignar", flags_received_count: "Mottagna Flaggningar", approve: "Godkänn", approved_by: "godkänd av", time_read: "Lästid"}, site_content: {none: "Välj typ av innehåll för att börja ändra.", title: "Sidinnehåll", edit: "Ändra sidinnehåll"}, site_settings: {show_overriden: "Visa bara överskrivna", title: "Webbplatsinställningar", reset: "återställ till standard"}}}}}, I18n.locale = "sv", function (e) {
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
        o && e._d.setTime(+e._d + o * n), (u || l) && (r = e.minute(), a = e.hour()), u && e.date(e.date() + u * n), l && (i = e.date(), e.date(1).month(e.month() + l * n).date(Math.min(i, e.daysInMonth()))), o && !s && z.updateOffset(e), (u || l) && (e.minute(r), e.hour(a))
    }

    function c(e) {
        return"[object Array]" === Object.prototype.toString.call(e)
    }

    function h(e, t) {
        var n, s = Math.min(e.length, t.length), r = Math.abs(e.length - t.length), a = 0;
        for (n = 0; s > n; n++)~~e[n] !== ~~t[n] && a++;
        return a + r
    }

    function d(e) {
        return e ? rt[e] || e.toLowerCase().replace(/(.)s$/, "$1") : e
    }

    function p(e, t) {
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
            var a = "";
            for (t = 0; n > t; t++)a += s[t]instanceof Function ? s[t].call(r, e) : s[t];
            return a
        }
    }

    function b(e, t) {
        function n(t) {
            return e.lang().longDateFormat(t) || t
        }

        for (var s = 5; s-- && Y.test(t);)t = t.replace(Y, n);
        return at[t] || (at[t] = g(t)), at[t](e)
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
                return B;
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

    function k(e) {
        var t, n, s, a, o, u = 99;
        for (a = 0; e._f.length > a; a++)t = i({}, e), t._f = e._f[a], x(t), n = new r(t), o = h(t._a, n.toArray()), n._il && (o += n._il.length), u > o && (u = o, s = n);
        i(e, s)
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
        var s = j(Math.abs(e) / 1e3), r = j(s / 60), a = j(r / 60), i = j(a / 24), o = j(i / 365), u = 45 > s && ["s", s] || 1 === r && ["m"] || 45 > r && ["mm", r] || 1 === a && ["h"] || 22 > a && ["hh", a] || 1 === i && ["d"] || 25 >= i && ["dd", i] || 45 >= i && ["M"] || 345 > i && ["MM", j(i / 30)] || 1 === o && ["y"] || ["yy", o];
        return u[2] = t, u[3] = e > 0, u[4] = n, E.apply({}, u)
    }

    function S(e, t, n) {
        var s, r = n - t, a = n - e.day();
        return a > r && (a -= 7), r - 7 > a && (a += 7), s = z(e).add("d", a), {week: Math.ceil(s.dayOfYear() / 7), year: s.year()}
    }

    function I(e) {
        var t = e._i, n = e._f;
        return null === t || "" === t ? null : ("string" == typeof t && (e._i = t = f().preparse(t)), z.isMoment(t) ? (e = i({}, t), e._d = new Date(+t._d)) : n ? c(n) ? k(e) : x(e) : D(e), new r(e))
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

    for (var z, P, L = "2.0.0", j = Math.round, O = {}, R = "undefined" != typeof module && module.exports, U = /^\/?Date\((\-?\d+)/i, F = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, H = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, Y = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, V = /\d\d?/, B = /\d{1,3}/, G = /\d{3}/, q = /\d{1,4}/, W = /[+\-]?\d{1,6}/, $ = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, K = /Z|[\+\-]\d\d:?\d\d/i, Q = /T/i, Z = /[\+\-]?\d+(\.\d{1,3})?/, J = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, X = "YYYY-MM-DDTHH:mm:ssZ", et = [
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
    }}; it.length;)P = it.pop(), ut[P + "o"] = n(ut[P], P);
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
        var n, s, r = z.isDuration(e), i = "number" == typeof e, o = r ? e._data : i ? {} : e, u = F.exec(e);
        return i ? t ? o[t] = e : o.milliseconds = e : u && (n = "-" === u[1] ? -1 : 1, o = {y: 0, d: ~~u[2] * n, h: ~~u[3] * n, m: ~~u[4] * n, s: ~~u[5] * n, ms: ~~u[6] * n}), s = new a(o), r && e.hasOwnProperty("_lang") && (s._lang = e._lang), s
    }, z.version = L, z.defaultFormat = X, z.updateOffset = function () {
    }, z.lang = function (e, t) {
        return e ? (t ? p(e, t) : O[e] || f(e), z.duration.fn._lang = z.fn._lang = f(e), void 0) : z.fn._lang._abbr
    }, z.langData = function (e) {
        return e && e._lang && e._lang._abbr && (e = e._lang._abbr), f(e)
    }, z.isMoment = function (e) {
        return e instanceof r
    }, z.isDuration = function (e) {
        return e instanceof a
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
        var s, r, a = this._isUTC ? z(e).zone(this._offset || 0) : z(e).local(), i = 6e4 * (this.zone() - a.zone());
        return t = d(t), "year" === t || "month" === t ? (s = 432e5 * (this.daysInMonth() + a.daysInMonth()), r = 12 * (this.year() - a.year()) + (this.month() - a.month()), r += (this - z(this).startOf("month") - (a - z(a).startOf("month"))) / s, "year" === t && (r /= 12)) : (s = this - a - i, r = "second" === t ? s / 1e3 : "minute" === t ? s / 6e4 : "hour" === t ? s / 36e5 : "day" === t ? s / 864e5 : "week" === t ? s / 6048e5 : s), n ? r : o(r)
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
        switch (e = d(e)) {
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
    M("year", "FullYear"), z.fn.days = z.fn.day, z.fn.months = z.fn.month, z.fn.weeks = z.fn.week, z.fn.isoWeeks = z.fn.isoWeek, z.fn.toJSON = z.fn.toISOString, z.duration.fn = a.prototype = {weeks: function () {
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
        return e = d(e), this[e.toLowerCase() + "s"]()
    }, as: function (e) {
        return e = d(e), this["as" + e.charAt(0).toUpperCase() + e.slice(1) + "s"]()
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