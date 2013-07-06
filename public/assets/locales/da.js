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
    for (var i = 0; n = a[i]; i++) {
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
    var a;
    n = this.prepareOptions(n), n.count = e.toString();
    var i = this.pluralizer(this.currentLocale()), o = i(Math.abs(e)), u = "object" == typeof o && o instanceof Array ? o : [o];
    return a = this.findAndTranslateValidNode(u, s), null == a && (a = this.missingTranslation(t, u[0])), this.interpolate(a, n)
}, I18n.missingTranslation = function () {
    for (var e = '[missing "' + this.currentLocale(), t = arguments.length, n = 0; t > n; n++)e += "." + arguments[n];
    return e += '" translation]'
}, I18n.currentLocale = function () {
    return I18n.locale || I18n.defaultLocale
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, MessageFormat = {locale: {}}, MessageFormat.locale.da = function (e) {
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
}({}), I18n.translations = {da: {js: {share: {topic: "del et link til dette emne", post: "del et link til dette indlæg", close: "luk"}, edit: "rediger titel og kategori for dette emne", not_implemented: "Beklager, denne feature er ikke blevet implementeret endnu.", no_value: "Nej", yes_value: "Ja", of_value: "af", generic_error: "Beklager, der opstod en fejl.", log_in: "Log ind", age: "Alder", last_post: "Sidste indlæg", admin_title: "Admin", flags_title: "Flag", show_more: "vis mere", links: "Links", faq: "FAQ", you: "Dig", ok: "ok", or: "eller", now: "lige nu", suggested_topics: {title: "Foreslåede emner"}, bookmarks: {not_logged_in: "Beklager, du skal være logget ind for at kunne bogmærke indlæg.", created: "Du har bogmærket dette indlæg.", not_bookmarked: "Du har læst dette indlæg; klik for at bogmærke det.", last_read: "Dette er det sidste indlæg, du har læst."}, new_topics_inserted: "{{count}} nye emner.", show_new_topics: "Klik for at se.", preview: "forhåndsvising", cancel: "annulér", save: "Gem ændringer", saving: "Gemmer…", saved: "Gemt!", user_action_descriptions: {6: "Svar"}, user: {profile: "Profil", title: "Bruger", mute: "Mute", edit: "Redigér indstillinger", download_archive: "download arkiv med alle mine indlæg", private_message: "Private beskeder", private_messages: "Beskeder", activity_stream: "Aktivitet", preferences: "Indstillinger", bio: "Om mig", change_password: "skift", invited_by: "Inviteret af", trust_level: "Tillidsniveau", external_links_in_new_tab: "Åbn alle eksterne links i en ny fane", enable_quoting: "Tillad citerings-svar for markeret tekst", change_username: {action: "skift", title: "Skift brugernavn", confirm: "Der kan være konsekvenser ved at skifte brugernavn. Er du sikker på at du vil skifte?", taken: "Beklager, det brugernavn er optaget.", error: "Der skete en fejl i forbindelse med skift af dit brugernavn.", invalid: "Det brugernavn er ugyldigt. Det må kun bestå af bogstaver og tal"}, change_email: {action: "skift", title: "Skift e-mail-adresse", taken: "Beklager, den e-mail-adresse er optaget af en anden bruger.", error: "Der opstod en fejl i forbindelse med skift af din e-mail-adresse. Måske er adressen allerede i brug?", success: "Vi har sendt en e-mail til din nye adresse. Klik på linket i mail’en for at aktivere din nye e-mail-adresse."}, email: {title: "E-mail", instructions: "Din e-mail-adresse vil aldrig blive vist offentligt.", ok: "Det ser fint ud. Vi e-mail’er dig for at bekræfte.", invalid: "Skriv venligst en gyldig e-mail-adresse.", authenticated: "Din e-mail er bekræftet af {{provider}}.", frequency: "Vi sender dig kun e-mail, hvis du ikke har været på siden for nylig, og du ikke allerede har set de ting vi ville e-mail’e dig om.."}, name: {title: "Navn", instructions: "En længere udgave af dit navn; behøver ikke at være unikt. Bruges som alternativ @navn match og vises kun på din profilside.", too_short: "Dit navn er for kort.", ok: "Dit navn ser fint ud."}, username: {title: "Brugernavn", instructions: "Skal være unikt og uden mellemrum. Andre brugere kan referere til dig som @brugernavn.", short_instructions: "Andre brugere kan referere til dig som @{{username}}.", available: "Brugernavnet er tilgængeligt.", global_match: "E-mail-adressen matcher det registrerede brugernavn.", global_mismatch: "Allerede registreret. Prøv {{suggestion}}?", not_available: "Ikke ledigt. Prøv {{suggestion}}?", too_short: "Dit brugernavn er for kort.", too_long: "Dit brugernavn er for langt.", checking: "Checker om brugernavnet er ledigt…", enter_email: "Brugernavn fundet. Skriv den tilhørende e-mail-adresse."}, password_confirmation: {title: "Kodeord igen"}, last_posted: "Sidste indlæg", last_emailed: "Sidste e-mail", last_seen: "Sidst set", created: "Oprettet", log_out: "Log ud", website: "Website", email_settings: "E-mail", email_digests: {title: "Når jeg ikke besøger sitet, send mig et e-mail-sammendrag af ny aktivitet", daily: "dagligt", weekly: "ugenligt", bi_weekly: "hver anden uge"}, email_direct: "Modtag e-mail, når nogen citerer dig, svarer på dine indlæg eller nævner dit @brugernavn", email_private_messages: "Modtag e-mail, når nogen sender dig en privat besked", other_settings: "Andre", new_topic_duration: {label: "Betragt emner som nye når", not_viewed: "Jeg ikke har set dem endnu", last_here: "de er blevet oprettet efter jeg var her sidst", after_n_days: {one: "de er blevet oprettet inden for det sidste døgn", other: "de er blevet oprettet inden for de sidste {{count}} døgn"}, after_n_weeks: {one: "de er blevet oprettet inden for den sidste uge", other: "de er blevet oprettet inden for de sidste {{count}} uger"}}, auto_track_topics: "Følg automatisk emner jeg åbner", auto_track_options: {never: "aldrig", always: "altid", after_n_seconds: {one: "efter et sekund", other: "efter {{count}} sekunder"}, after_n_minutes: {one: "efter et minut", other: "efter {{count}} minutter"}}, invited: {title: "Invitationer", user: "Inviteret bruger", none: "{{username}} har ikke inviteret nogen brugere til dette site.", redeemed: "Brugte invitationer", redeemed_at: "Invitation brugt", pending: "Udestående invitationer", topics_entered: "Emner åbnet", posts_read_count: "Indlæg læst", rescind: "Fjern invitation", rescinded: "Invitation fjernet", time_read: "Læse tid", days_visited: "Besøgsdage", account_age_days: "Kontoens alder i dage"}, password: {title: "Kodeord", too_short: "Dit kodeord er for kort.", ok: "Dit kodeord ser fint ud."}, ip_address: {title: "Sidste IP-adresse"}, avatar: {title: "Brugerbillede", instructions: "Vi bruger <a href='https://gravatar.com' target='_blank'>Gravatar</a> for brugerbilleder baseret på e-mail-adresse"}, filters: {all: "Alle"}, stream: {posted_by: "Skrevet af", sent_by: "Sendt af", private_message: "privat besked", the_topic: "emnet"}}, loading: "Indlæser…", close: "Luk", learn_more: "Læs mere…", year: "år", year_desc: "emner oprettet inden for de sidste 365 dage", month: "måned", month_desc: "emner oprettet inden for de sidste 30 dage", week: "uge", week_desc: "emner oprettet inden for de sidste 7 dage", first_post: "Første indlæg", mute: "Mute", unmute: "Unmute", best_of: {title: "Topindlæg", description: "Der er <b>{{count}}</b> indlæg i dette emne. Det er mange! Vil du gerne spare lidt tid, ved kun at se de indlæg der har flest interaktioner og svar?", button: "Vis kun “Topindlæg”"}, private_message_info: {title: "Privat samtale", invite: "Invitér andre…"}, email: "E-mail", username: "Brugernavn", last_seen: "Sidst set", created: "Oprettet", trust_level: "Tillidsniveau", create_account: {title: "Opret konto", action: "Lav konto nu!", invite: "Har du ikke en konto endnu?", failed: "Noget gik galt. Måske er e-mail-adressen allerede registreret – prøv “Glemt kodeord”-linket"}, forgot_password: {title: "Glemt kodeord", action: "Jeg har glemt mit kodeord", invite: "Skriv brugernavn eller e-mail-adresse, så sender vi dig en mail så du kan nulstille dit kodeord.", reset: "Nulstil kodeord", complete: "Du burde snart få en e-mail med en forklaring på hvordan du kan nulstille dit kodeord."}, login: {title: "Log ind", username: "Brugernavn", password: "Kodeord", email_placeholder: "e-mail-adresse eller brugernavn", error: "Ukendt fejl", reset_password: "Nulstil kodeord", logging_in: "Logger ind…", or: "Eller", authenticating: "Logger ind…", awaiting_confirmation: "Din konto mangler at blive aktiveret. Brug “Glemt kodeord” linket for at få en ny aktiverings-mail.", awaiting_approval: "Din konto er ikke blevet godkendt af en moderator endnu. Du får en e-mail når den bliver godkendt.", not_activated: "Du kan ikke logge ind endnu. Vi har tidligere sendt en aktiverings-e-mail til dig på <b>{{sentTo}}</b>. Følg venligst instruktionerne i den e-mail for at aktivere din konto.", resend_activation_email: "Klik her for at sende aktiverings-e-mail’en igen.", sent_activation_email_again: "Vi har sendt endnu en aktiverings-e-mail til dig på <b>{{currentEmail}}</b>. Det kan tage nogen få minutter før den når frem; check også din spam-mappe.", google: {title: "med Google", message: "Logger ind med Google (check at pop-op-blokering ikke er aktiv)"}, twitter: {title: "med Twitter", message: "Logger ind med Twitter (check at pop-op-blokering ikke er aktiv)"}, facebook: {title: "med Facebook", message: "Logger ind med Facebook (check at pop-op-blokering ikke er aktiv)"}, yahoo: {title: "med Yahoo", message: "Logger ind med Yahoo (check at pop-op-blokering ikke er aktiv)"}, github: {title: "med GitHub", message: "Logger ind med GitHub (check at pop-op-blokering ikke er aktiv)"}, persona: {title: "med Persona", message: "Logger ind med Mozilla Persona (check at pop-op-blokering ikke er aktiv)"}}, composer: {posting_not_on_topic: 'Du svarer nu på emnet "{{title}}", men du ser i øjeblikket på et andet emne.', saving_draft_tip: "gemmer", saved_draft_tip: "gemt", saved_local_draft_tip: "gemt lokalt", similar_topics: "Dit emne minder om…", drafts_offline: "kladder offline", min_length: {need_more_for_title: "{{n}} tegn mangler for titlen", need_more_for_reply: "{{n}} tegn mangler for svaret"}, save_edit: "Gem ændringer", reply_original: "Svar til det oprindelige emne", reply_here: "Svar her", reply: "Svar", cancel: "Annulér", create_topic: "Opret emne", create_pm: "Opret privat besked", users_placeholder: "Tilføj bruger", title_placeholder: "Skriv din titel her. Hvad handler diskussionen om i en kort sætning?", reply_placeholder: "Skriv dit svar her. Brug Markdown eller BBCode til at formatere. Træk et billede ind for at uploade det.", view_new_post: "Se dit nye indlæg.", saving: "Gemmer…", saved: "Gemt!", saved_draft: "Du har en kladde i gang. Klik hvorsomhelst i denne kasse for at forsætte med redigering af den.", uploading: "Uploader…", show_preview: "forhåndsvisning &raquo;", hide_preview: "&laquo; skjul forhåndsvisning", bold_title: "Fed", bold_text: "fed skrift", italic_title: "Kursiv", italic_text: "kursiv skrift", link_title: "Link", link_description: "skriv beskrivelse af linket her", link_dialog_title: "Indsæt link", link_optional_text: "evt. titel", quote_title: "Citatblok", quote_text: "Citatblok", code_title: "Programkode", code_text: "skriv programkode her", image_title: "Billede", image_description: "skriv billedets beskrivelse her", image_dialog_title: "Indsæt billede", image_optional_text: "evt. titel", image_hosting_hint: "Brug for <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>gratis billed hosting?</a>", olist_title: "Numereret liste", ulist_title: "Punktopstilling", list_item: "Listepunkt", heading_title: "Overskrift", heading_text: "Overskrift", hr_title: "Vandret streg", undo_title: "Fortryd", redo_title: "Gentag", help: "Markdown redigeringshjælp"}, notifications: {title: "notifikation ved @navns nævnelse, svar til dine indlæg og emner, private beskeder, mv.", none: "Du har ikke nogen notifikationer lige nu.", more: "se ændre notifikationer", mentioned: "<span title='mentioned' class='icon'>@</span> {{username}} {{link}}", quoted: "<i title='quoted' class='icon icon-quote-right'></i> {{username}} {{link}}", replied: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", posted: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", edited: "<i title='edited' class='icon icon-pencil'></i> {{username}} {{link}}", liked: "<i title='liked' class='icon icon-heart'></i> {{username}} {{link}}", private_message: "<i class='icon icon-lock' title='private message'></i> {{username}} har sendt dig en privat besked: {{link}}", invited_to_private_message: "{{username}} har inviteret dig til en privat samtale: {{link}}", invitee_accepted: "<i title='accepted your invitation' class='icon icon-signin'></i> {{username}} har accepteret din invitation", moved_post: "<i title='moved post' class='icon icon-arrow-right'></i> {{username}} flyttede indlæg til {{link}}"}, image_selector: {title: "Indsæt billede", from_my_computer: "Fra min computer", from_the_web: "Fra nettet", add_image: "Indsæt billede", remote_tip: "skriv adressen på et billede i formen http://example.com/billede.jpg", local_tip: "klik for at vælge et billede fra din computer.", upload: "Upload", uploading_image: "Uploader billede"}, search: {title: "søg efter emner, indlæg, brugere eller kategorier", placeholder: "skriv søgeord her", no_results: "Ingen resultater fundet.", searching: "Søger…"}, site_map: "gå til en anden emneoversigt eller kategori", go_back: "gå tilbage", current_user: "gå til brugerside", favorite: {title: "Favorit", help: "tilføj dette emne til din favorit-liste"}, topics: {none: {favorited: "Du har ikke nogen favorit-emner endnu. For at gøre et emne til favorit, tryk på stjernen ved siden af emnets titel.", unread: "Du har ingen ulæste emner.", "new": "Du har ingen nye emner.", read: "Du har ikke læst nogen emner endnu.", posted: "Du har ikke skrevet nogen indlæg endnu.", latest: "Der er ikke nogen populære emner. Det er sørgeligt.", category: "Der er ingen emner i kategorien {{category}}."}, bottom: {latest: "Der er ikke flere populære emner.", posted: "Der er ikke flere emner.", read: "Der er ikke flere læste emner.", "new": "Der er ikke flere nye emner.", unread: "Der er ikke flere ulæste emner.", favorited: "Der er ikke flere favorit-emner.", category: "Der er ikke flere emner i kategorien {{category}}."}}, topic: {create_in: "Opret emne i kategorien {{categoryName}}", create: "Opret emne", create_long: "Opret et nyt emne i debatten", private_message: "Start en privat samtale", list: "Emner", "new": "nye emner", title: "Emne", loading_more: "Indlæser flere emner…", loading: "Indlæser emne…", invalid_access: {title: "Emnet er privat", description: "Beklager, du har ikke adgang til dette emne!"}, server_error: {title: "Emnet kunne ikke indlæses", description: "Beklager, vi kunne ikke indlæse det emne, muligvis grundet et problem med netværksforbindelsen. Prøv venligst igen. Hvis problemet fortæstter, så skriv venligst til os."}, not_found: {title: "Emnet findes ikke", description: "Beklager, vi kunne ikke finde det emne i databasen. Måske er det blevet fjernet af moderator?"}, unread_posts: "der er {{unread}} indlæg du ikke har læst i dette emne", new_posts: "der er kommet {{new_posts}} nye indlæg i dette emne siden du læste det sidst", likes: {one: "der er en “Synes godt om” i dette emne", other: "der er {{count}} “Synes godt om” i dette emne"}, back_to_list: "Tilbage til emneoversigt", options: "Emneindstillinger", show_links: "vis links i dette emne", toggle_information: "vis detaljer om emnet", read_more_in_category: "Mere læsestof? Se andre emner i {{catLink}} eller {{latestLink}}.", read_more: "Mere læsestof? {{catLink}} else {{latestLink}}.", browse_all_categories: "Vis alle kategorier", view_latest_topics: "vis populære emner", suggest_create_topic: "Hvorfor ikke oprette et emne?", read_position_reset: "Din læseposition er blevet nulstillet.", jump_reply_up: "hop til tidligere svar", jump_reply_down: "hop til senere svar", progress: {title: "emnestatus", jump_top: "hop til første indlæg", jump_bottom: "hop til sidste indlæg", total: "antal indlæg", current: "nuværende indlæg"}, notifications: {title: "", reasons: {"3_2": "Du får notifikationer fordi du overvåger dette emne.", "3_1": "Du får notifikationer fordi du oprettede dette emne.", 3: "Du får notifikationer fordi du overvåger dette emne.", "2_4": "Du får notifikationer fordi du har besvaret dette emne.", "2_2": "Du får notifikationer fordi du følger dette emne.", 2: 'Du får notifikationer fordi du <a href="/users/{{username}}/preferences">har læst dette emne</a>.', 1: "Du får kun notifikationer hvis nogen nævner dit @navn eller svarer på dit indlæg.", "1_2": "Du får kun notifikationer hvis nogen nævner dit @navn eller svarer på dit indlæg.", 0: "Du får ingen notifikationer for dette emne.", "0_2": "Du får ingen notifikationer for dette emne."}, watching: {title: "Overvåger", description: "samme som Følger, plus at du får besked om alle nye indlæg."}, tracking: {title: "Følger", description: "du får besked om ulæste indlæg, @navns nævnelse og svar til dine indlæg."}, regular: {title: "Standard", description: "du får kun besked hvis nogen nævner dit @navn eller svarer på dit indlæg."}, muted: {title: "Stille!", description: "du får ikke besked om nogen hændelser i dette emne, og det vil ikke fremgå af din liste over ulæste emner."}}, actions: {"delete": "Slet emne", open: "Åbn emne", close: "Luk emne", unpin: "Un-Pin Topic", pin: "Pin Topic", unarchive: "Unarchive Topic", archive: "Arkivér emne", invisible: "Gør usynlig", visible: "Gør synlig", reset_read: "Glem hvilke emner jeg har læst", multi_select: "Select for Merge/Split", convert_to_topic: "Konvertér til normalt emne"}, reply: {title: "Svar", help: "begynd at skrive et svar til dette emne"}, clear_pin: {title: "Clear pin", help: "Clear the pinned status of this topic so it no longer appears at the top of your topic list"}, share: {title: "Del", help: "del et link til dette emne"}, inviting: "Inviterer…", invite_private: {title: "Invitér til privat samtale", email_or_username: "Inviteret brugers e-mail eller brugernavn", email_or_username_placeholder: "e-mail-adresse eller brugernavn", action: "Invitér", success: "Tak! Vi har inviteret den bruger til at deltage i din private samtale.", error: "Beklager, der skete en fejl, da vi forsøgte at invitere den bruger."}, invite_reply: {title: "Invitér venner til at svare", help: "send invitationer til dine venner, så de kan svare på dette indlæg med et enkelt klik", email: "Vi sender din ven en kort e-mail, som giver dem mulighed for at svare på dette emne med ved at klikke på et link.", email_placeholder: "e-mail-adresse", success: "Tak! Vi har sendt en invitation til <b>{{email}}</b>. Du får besked, når de bruger din invitation. Check invitations-fanen på din brugerside, for at følge med i hvem du har inviteret.", error: "Beklager, vi kunne ikke invitere den person. Måske er de allerede brugere?"}, login_reply: "Log ind for at svare", filters: {user: "Du ser kun endlæg fra specifikke brugere.", best_of: "Du ser kun “Topindlæg”.", cancel: "Se alle indlæg i emnet."}, move_selected: {title: "Flyt valgte indlæg", topic_name: "Ny emnetitel:", error: "Sorry, there was an error moving those posts.", instructions: {one: "Du laver nu et nyt emne med det valgte indlæg.", other: "Du laver nu et nyt emne med de <b>{{count}}</b> valgte indlæg."}}, multi_select: {select: "vælg", selected: "valgt ({{count}})", "delete": "slet valgte", cancel: "glem valg", move: "flyt valgte", description: {one: "Du har valgt <b>1</b> indlæg.", other: "Du har valgt <b>{{count}}</b> indlæg."}}}, post: {reply: "Svar til {{link}} af {{replyAvatar}} {{username}}", reply_topic: "Svar til {{link}}", quote_reply: "citér svar", edit: "Redigerer {{link}} af {{replyAvatar}} {{username}}", post_number: "indlæg {{number}}", in_reply_to: "som svar til", reply_as_new_topic: "Svar som nyt emne", continue_discussion: "Fortsætter debatten fra {{postLink}}:", follow_quote: "gå til det citerede indlæg", deleted_by_author: "(indlæg slettet af forfatter)", has_replies: {one: "Svar", other: "Svar"}, errors: {create: "Sorry, there was an error creating your post. Please try again.", edit: "Sorry, there was an error editing your post. Please try again.", upload: "Sorry, there was an error uploading that file. Please try again."}, abandon: "Er du sikker på at du vil droppe dit indlæg?", archetypes: {save: "Gem indstillinger"}, controls: {reply: "begynd at et svar på dette indlæg", like: "synes godt om dette indlæg", edit: "redigér dette indlæg", flag: "gør moderators opmærksomh på dette indlæg", "delete": "slet dette indlæg", undelete: "annulér sletning", share: "del et link til dette indlæg", more: "Mere"}, actions: {flag: "Flag", clear_flags: {one: "Fjern flag", other: "Fjern flags"}, it_too: "{{alsoName}} det også", undo: "Fortryd {{alsoName}}", by_you_and_others: {zero: "Du {{long_form}}", one: "Du og en anden {{long_form}}", other: "Du og {{count}} andre {{long_form}}"}, by_others: {one: "En person {{long_form}}", other: "{{count}} personer {{long_form}}"}}, edits: {one: "en ændring", other: "{{count}} ændringer", zero: "ingen ændringer"}, "delete": {confirm: {one: "Er du sikker på at du vil slette indlægget?", other: "Er du sikker på at du vil slette alle de indlæg?"}}}, category: {none: "(ingen kategori)", edit: "redigér", edit_long: "Redigér kategori", view: "Vis emner i kategori", "delete": "Slet kategori", create: "Ny kategori", creation_error: "There has been an error during the creation of the category.", more_posts: "se alle {{posts}}…", name: "Kategorinavn", description: "Beskrivelse", topic: "kategoriemne", badge_colors: "Mærkefarver", background_color: "Baggrundsfarve", foreground_color: "Tekstfarve", name_placeholder: "Bør være kort og kontant.", color_placeholder: "En web-farve", delete_confirm: "Er du sikker på at du vil slette den kategori?", list: "Kategoriliste", no_description: "Der er ingen beskrivelse for denne kategori.", change_in_category_topic: "besøg kategoriemnet for at redigere beskrivelsen"}, flagging: {title: "Why are you flagging this post?", action: "Flag Post", cant: "Sorry, you can't flag this post at this time.", custom_placeholder: "Why does this post require moderator attention? Let us know specifically what you are concerned about, and provide relevant links where possible.", custom_message: {at_least: "enter at least {{n}} characters", more: "{{n}} to go...", left: "{{n}} remaining"}}, topic_summary: {title: "Topic Summary", links_shown: "show all {{totalLinks}} links..."}, topic_statuses: {locked: {help: "emnet er låst; det modtager ikke flere svar"}, pinned: {help: "this topic is pinned; it will display at the top of its category"}, archived: {help: "emnet er arkiveret; det er frosset og kan ikke ændres"}, invisible: {help: "emnet er usynligt; det vises ikke på lister og kan kun tilgåes med et direkte link"}}, posts: "Indlæg", posts_long: "{{number}} indlæg i dette emne", original_post: "Oprindeligt indlæg", views: "Visninger", replies: "Svar", views_long: "dette emne er blevet vist {{number}} gange", activity: "Aktivitet", likes: "Synes godt om", top_contributors: "Deltagere", category_title: "Kategori", history: "Historik", changed_by: "af {{author}}", categories_list: "Kategorioversigt", filters: {latest: {title: "Populære", help: "de mest populære nyere emner"}, favorited: {title: "Favoritter", help: "emner du har markeret som favoritter"}, read: {title: "Læste", help: "emner du har læst"}, categories: {title: "Kategorier", title_in: "Kategori - {{categoryName}}", help: "alle emner grupperet efter kategori"}, unread: {title: {zero: "Ulæst", one: "Ulæst (1)", other: "Ulæst ({{count}})"}, help: "emner du følger med i med ulæste indlæg"}, "new": {title: {zero: "Nye", one: "Ny (1)", other: "Nye ({{count}})"}, help: "nye emner siden dit sidste besøg, og emner du følger med i med nye indlæg"}, posted: {title: "Mine indlæg", help: "emner du har skrevet indlæg i"}, category: {title: {zero: "{{categoryName}}", one: "{{categoryName}} (1)", other: "{{categoryName}} ({{count}})"}, help: "populære emner i kategorien {{categoryName}}"}}, type_to_filter: "type to filter...", admin: {title: "Discourse Admin", dashboard: {title: "Dashboard", version: "Installed version", up_to_date: "You are running the latest version of Discourse.", critical_available: "A critical update is available.", updates_available: "Updates are available.", please_upgrade: "Please upgrade!", latest_version: "Latest version", total_users: "Total Users", moderator_short: "mod", reports: {today: "Today", yesterday: "Yesterday", last_7_days: "Last 7 Days", last_30_days: "Last 30 Days", all_time: "All Time", "7_days_ago": "7 Days Ago", "30_days_ago": "30 Days Ago"}}, commits: {latest_changes: "Latest changes: please update often!", by: "by"}, flags: {title: "Flags", old: "Old", active: "Active", clear: "Clear Flags", clear_title: "dismiss all flags on this post (will unhide hidden posts)", "delete": "Delete Post", delete_title: "delete post (if its the first post delete topic)", flagged_by: "Flagged by", error: "Something went wrong"}, customize: {title: "Customize", header: "Header", css: "Stylesheet", override_default: "Do not include standard style sheet", enabled: "Enabled?", preview: "preview", undo_preview: "undo preview", save: "Save", "new": "New", new_style: "New Style", "delete": "Delete", delete_confirm: "Delete this customization?"}, email: {title: "Email", sent_at: "Sent At", email_type: "Email Type", to_address: "To Address", test_email_address: "email address to test", send_test: "send test email", sent_test: "sent!"}, impersonate: {title: "Impersonate User", username_or_email: "Username or Email of User", help: "Use this tool to impersonate a user account for debugging purposes.", not_found: "That user can't be found.", invalid: "Sorry, you may not impersonate that user."}, users: {title: "Users", create: "Add Admin User", last_emailed: "Last Emailed", not_found: "Sorry that username doesn't exist in our system.", "new": "New", active: "Active", pending: "Pending", approved: "Approved?", approved_selected: {one: "approve user", other: "approve users ({{count}})"}}, user: {ban_failed: "Something went wrong banning this user {{error}}", unban_failed: "Something went wrong unbanning this user {{error}}", ban_duration: "How long would you like to ban the user for? (days)", delete_all_posts: "Delete all posts", ban: "Ban", unban: "Unban", banned: "Banned?", moderator: "Moderator?", admin: "Admin?", show_admin_profile: "Admin", refresh_browsers: "Force browser refresh", show_public_profile: "Show Public Profile", impersonate: "Impersonate", revoke_admin: "Revoke Admin", grant_admin: "Grant Admin", revoke_moderation: "Revoke Moderation", grant_moderation: "Grant Moderation", reputation: "Reputation", permissions: "Permissions", activity: "Activity", like_count: "Likes Received", private_topics_count: "Private Topics", posts_read_count: "Posts Read", post_count: "Posts Created", topics_entered: "Topics Entered", flags_given_count: "Flags Given", flags_received_count: "Flags Received", approve: "Approve", approved_by: "approved by", time_read: "Read Time"}, site_settings: {show_overriden: "Only show overridden", title: "Settings", reset: "reset to default"}}}}}, I18n.locale = "da", function (e) {
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
        o && e._d.setTime(+e._d + o * n), (u || l) && (r = e.minute(), a = e.hour()), u && e.date(e.date() + u * n), l && (i = e.date(), e.date(1).month(e.month() + l * n).date(Math.min(i, e.daysInMonth()))), o && !s && M.updateOffset(e), (u || l) && (e.minute(r), e.hour(a))
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
        return e ? (!O[e] && U && require("./lang/" + e), O[e]) : M.fn._lang
    }

    function m(e) {
        return e.match(/\[.*\]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }

    function g(e) {
        var t, n, s = e.match(F);
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

        for (var s = 5; s-- && V.test(t);)t = t.replace(V, n);
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
                return K;
            case"a":
            case"A":
                return d(t._l)._meridiemParse;
            case"X":
                return X;
            case"Z":
            case"ZZ":
                return Q;
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
        var t = (Q.exec(e) || [])[0], n = (t + "").match(tt) || ["-", 0, 0], s = +(60 * n[1]) + ~~n[2];
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

    function x(e) {
        var t, n, s = [];
        if (!e._d) {
            for (t = 0; 7 > t; t++)e._a[t] = s[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            s[3] += ~~((e._tzm || 0) / 60), s[4] += ~~((e._tzm || 0) % 60), n = new Date(0), e._useUTC ? (n.setUTCFullYear(s[0], s[1], s[2]), n.setUTCHours(s[3], s[4], s[5], s[6])) : (n.setFullYear(s[0], s[1], s[2]), n.setHours(s[3], s[4], s[5], s[6])), e._d = n
        }
    }

    function w(e) {
        var t, n, s = e._f.match(F), r = e._i;
        for (e._a = [], t = 0; s.length > t; t++)n = (v(s[t], e).exec(r) || [])[0], n && (r = r.slice(r.indexOf(n) + n.length)), ut[s[t]] && _(s[t], n, e);
        r && (e._il = r), e._isPm && 12 > e._a[3] && (e._a[3] += 12), e._isPm === !1 && 12 === e._a[3] && (e._a[3] = 0), x(e)
    }

    function T(e) {
        var t, n, s, a, o, u = 99;
        for (a = 0; e._f.length > a; a++)t = i({}, e), t._f = e._f[a], w(t), n = new r(t), o = h(t._a, n.toArray()), n._il && (o += n._il.length), u > o && (u = o, s = n);
        i(e, s)
    }

    function E(e) {
        var t, n = e._i, s = Z.exec(n);
        if (s) {
            for (e._f = "YYYY-MM-DD" + (s[2] || " "), t = 0; 4 > t; t++)if (et[t][1].exec(n)) {
                e._f += et[t][0];
                break
            }
            Q.exec(n) && (e._f += " Z"), w(e)
        } else e._d = new Date(n)
    }

    function D(t) {
        var n = t._i, s = z.exec(n);
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
        return a > r && (a -= 7), r - 7 > a && (a += 7), s = M(e).add("d", a), {week: Math.ceil(s.dayOfYear() / 7), year: s.year()}
    }

    function I(e) {
        var t = e._i, n = e._f;
        return null === t || "" === t ? null : ("string" == typeof t && (e._i = t = d().preparse(t)), M.isMoment(t) ? (e = i({}, t), e._d = new Date(+t._d)) : n ? c(n) ? T(e) : w(e) : D(e), new r(e))
    }

    function N(e, t) {
        M.fn[e] = M.fn[e + "s"] = function (e) {
            var n = this._isUTC ? "UTC" : "";
            return null != e ? (this._d["set" + n + t](e), M.updateOffset(this), this) : this._d["get" + n + t]()
        }
    }

    function A(e) {
        M.duration.fn[e] = function () {
            return this._data[e]
        }
    }

    function P(e, t) {
        M.duration.fn["as" + e] = function () {
            return+this / t
        }
    }

    for (var M, R, j = "2.0.0", L = Math.round, O = {}, U = "undefined" != typeof module && module.exports, z = /^\/?Date\((\-?\d+)/i, H = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, F = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, V = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, B = /\d\d?/, G = /\d{1,3}/, q = /\d{3}/, $ = /\d{1,4}/, W = /[+\-]?\d{1,6}/, K = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Q = /Z|[\+\-]\d\d:?\d\d/i, Y = /T/i, X = /[\+\-]?\d+(\.\d{1,3})?/, Z = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, J = "YYYY-MM-DDTHH:mm:ssZ", et = [
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
        for (this._monthsParse || (this._monthsParse = []), t = 0; 12 > t; t++)if (this._monthsParse[t] || (n = M([2e3, t]), s = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[t] = new RegExp(s.replace(".", ""), "i")), this._monthsParse[t].test(e))return t
    }, _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdays: function (e) {
        return this._weekdays[e.day()]
    }, _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysShort: function (e) {
        return this._weekdaysShort[e.day()]
    }, _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), weekdaysMin: function (e) {
        return this._weekdaysMin[e.day()]
    }, weekdaysParse: function (e) {
        var t, n, s;
        for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++)if (this._weekdaysParse[t] || (n = M([2e3, 1]).day(t), s = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[t] = new RegExp(s.replace(".", ""), "i")), this._weekdaysParse[t].test(e))return t
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
    }, _week: {dow: 0, doy: 6}}, M = function (e, t, n) {
        return I({_i: e, _f: t, _l: n, _isUTC: !1})
    }, M.utc = function (e, t, n) {
        return I({_useUTC: !0, _isUTC: !0, _l: n, _i: e, _f: t})
    }, M.unix = function (e) {
        return M(1e3 * e)
    }, M.duration = function (e, t) {
        var n, s, r = M.isDuration(e), i = "number" == typeof e, o = r ? e._data : i ? {} : e, u = H.exec(e);
        return i ? t ? o[t] = e : o.milliseconds = e : u && (n = "-" === u[1] ? -1 : 1, o = {y: 0, d: ~~u[2] * n, h: ~~u[3] * n, m: ~~u[4] * n, s: ~~u[5] * n, ms: ~~u[6] * n}), s = new a(o), r && e.hasOwnProperty("_lang") && (s._lang = e._lang), s
    }, M.version = j, M.defaultFormat = J, M.updateOffset = function () {
    }, M.lang = function (e, t) {
        return e ? (t ? f(e, t) : O[e] || d(e), M.duration.fn._lang = M.fn._lang = d(e), void 0) : M.fn._lang._abbr
    }, M.langData = function (e) {
        return e && e._lang && e._lang._abbr && (e = e._lang._abbr), d(e)
    }, M.isMoment = function (e) {
        return e instanceof r
    }, M.isDuration = function (e) {
        return e instanceof a
    }, M.fn = r.prototype = {clone: function () {
        return M(this)
    }, valueOf: function () {
        return+this._d + 6e4 * (this._offset || 0)
    }, unix: function () {
        return Math.floor(+this / 1e3)
    }, toString: function () {
        return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }, toDate: function () {
        return this._offset ? new Date(+this) : this._d
    }, toISOString: function () {
        return b(M(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }, toArray: function () {
        var e = this;
        return[e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds()]
    }, isValid: function () {
        return null == this._isValid && (this._isValid = this._a ? !h(this._a, (this._isUTC ? M.utc(this._a) : M(this._a)).toArray()) : !isNaN(this._d.getTime())), !!this._isValid
    }, utc: function () {
        return this.zone(0)
    }, local: function () {
        return this.zone(0), this._isUTC = !1, this
    }, format: function (e) {
        var t = b(this, e || M.defaultFormat);
        return this.lang().postformat(t)
    }, add: function (e, t) {
        var n;
        return n = "string" == typeof e ? M.duration(+t, e) : M.duration(e, t), l(this, n, 1), this
    }, subtract: function (e, t) {
        var n;
        return n = "string" == typeof e ? M.duration(+t, e) : M.duration(e, t), l(this, n, -1), this
    }, diff: function (e, t, n) {
        var s, r, a = this._isUTC ? M(e).zone(this._offset || 0) : M(e).local(), i = 6e4 * (this.zone() - a.zone());
        return t = p(t), "year" === t || "month" === t ? (s = 432e5 * (this.daysInMonth() + a.daysInMonth()), r = 12 * (this.year() - a.year()) + (this.month() - a.month()), r += (this - M(this).startOf("month") - (a - M(a).startOf("month"))) / s, "year" === t && (r /= 12)) : (s = this - a - i, r = "second" === t ? s / 1e3 : "minute" === t ? s / 6e4 : "hour" === t ? s / 36e5 : "day" === t ? s / 864e5 : "week" === t ? s / 6048e5 : s), n ? r : o(r)
    }, from: function (e, t) {
        return M.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t)
    }, fromNow: function (e) {
        return this.from(M(), e)
    }, calendar: function () {
        var e = this.diff(M().startOf("day"), "days", !0), t = -6 > e ? "sameElse" : -1 > e ? "lastWeek" : 0 > e ? "lastDay" : 1 > e ? "sameDay" : 2 > e ? "nextDay" : 7 > e ? "nextWeek" : "sameElse";
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
        return null != e ? "string" == typeof e && (e = this.lang().monthsParse(e), "number" != typeof e) ? this : (this._d["set" + t + "Month"](e), M.updateOffset(this), this) : this._d["get" + t + "Month"]()
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
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) > +M(e).startOf(t)
    }, isBefore: function (e, t) {
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) < +M(e).startOf(t)
    }, isSame: function (e, t) {
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) === +M(e).startOf(t)
    }, min: function (e) {
        return e = M.apply(null, arguments), this > e ? this : e
    }, max: function (e) {
        return e = M.apply(null, arguments), e > this ? this : e
    }, zone: function (e) {
        var t = this._offset || 0;
        return null == e ? this._isUTC ? t : this._d.getTimezoneOffset() : ("string" == typeof e && (e = y(e)), 16 > Math.abs(e) && (e = 60 * e), this._offset = e, this._isUTC = !0, t !== e && l(this, M.duration(t - e, "m"), 1, !0), this)
    }, zoneAbbr: function () {
        return this._isUTC ? "UTC" : ""
    }, zoneName: function () {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }, daysInMonth: function () {
        return M.utc([this.year(), this.month() + 1, 0]).date()
    }, dayOfYear: function (e) {
        var t = L((M(this).startOf("day") - M(this).startOf("year")) / 864e5) + 1;
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
        return t === e ? this._lang : (this._lang = d(t), this)
    }}, R = 0; nt.length > R; R++)N(nt[R].toLowerCase().replace(/s$/, ""), nt[R]);
    N("year", "FullYear"), M.fn.days = M.fn.day, M.fn.months = M.fn.month, M.fn.weeks = M.fn.week, M.fn.isoWeeks = M.fn.isoWeek, M.fn.toJSON = M.fn.toISOString, M.duration.fn = a.prototype = {weeks: function () {
        return o(this.days() / 7)
    }, valueOf: function () {
        return this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * ~~(this._months / 12)
    }, humanize: function (e) {
        var t = +this, n = k(t, !e, this.lang());
        return e && (n = this.lang().pastFuture(t, n)), this.lang().postformat(n)
    }, add: function (e, t) {
        var n = M.duration(e, t);
        return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, this
    }, subtract: function (e, t) {
        var n = M.duration(e, t);
        return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, this
    }, get: function (e) {
        return e = p(e), this[e.toLowerCase() + "s"]()
    }, as: function (e) {
        return e = p(e), this["as" + e.charAt(0).toUpperCase() + e.slice(1) + "s"]()
    }, lang: M.fn.lang};
    for (R in st)st.hasOwnProperty(R) && (P(R, st[R]), A(R.toLowerCase()));
    P("Weeks", 6048e5), M.duration.fn.asMonths = function () {
        return(+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, M.lang("en", {ordinal: function (e) {
        var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
        return e + n
    }}), U && (module.exports = M), "undefined" == typeof ender && (this.moment = M), "function" == typeof define && define.amd && define("moment", [], function () {
        return M
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