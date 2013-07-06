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
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, MessageFormat = {locale: {}}, MessageFormat.locale.it = function (e) {
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
}({}), I18n.translations = {it: {js: {share: {topic: "condividi un link a questo topic", post: "condividi un link a questo post", close: "chiudi", twitter: "condividi link su Twitter", facebook: "condividi link su Facebook", "google+": "condividi link su Google+", email: "invia link via email"}, edit: "modifica titolo e categoria di questo topic", not_implemented: "Spiacenti, questa funzione non è ancora stata implementata!", no_value: "No", yes_value: "Si", of_value: "di", generic_error: "Spiacenti, si è verificato un errore.", log_in: "Log In", age: "Età", last_post: "Ultimo post", admin_title: "Amministrazione", flags_title: "Segnalazioni", show_more: "mostra tutto", links: "Link", faq: "FAQ", you: "Tu", or: "o", now: "adesso", read_more: "continua a leggere", in_n_seconds: {one: "in 1 secondo", other: "in {{count}} secondi"}, in_n_minutes: {one: "in 1 minuto", other: "in {{count}} minuti"}, in_n_hours: {one: "in 1 ora", other: "in {{count}} ore"}, in_n_days: {one: "in 1 giorno", other: "in {{count}} giorni"}, suggested_topics: {title: "Topic suggeriti"}, bookmarks: {not_logged_in: "Spiacenti, devi essere loggato per fare il bookmark del post.", created: "Post salvato nei bookmark.", not_bookmarked: "Hai letto questo post; clicca per salvarlo tra i bookmark.", last_read: "Questo è l'ultimo post che hai letto."}, new_topics_inserted: "{{count}} nuovi topic.", show_new_topics: "Clicca per mostrare.", preview: "anteprima", cancel: "cancella", save: "Salva Modifiche", saving: "Salvataggio...", saved: "Salvato!", choose_topic: {none_found: "Nessun topic trovato.", title: {search: "Cerca un Topic:", placeholder: "scrivi qui il titolo del topic"}}, user_action: {user_posted_topic: "<a href='{{userUrl}}'>{{user}}</a> ha pubblicato <a href='{{topicUrl}}'>il topic</a>", you_posted_topic: "<a href='{{userUrl}}'>Tu</a> hai pubblicato <a href='{{topicUrl}}'>il topic</a>", user_replied_to_post: "<a href='{{userUrl}}'>{{user}}</a> ha risposto a <a href='{{postUrl}}'>{{post_number}}</a>", you_replied_to_post: "<a href='{{userUrl}}'>Tu</a> hai risposto a <a href='{{postUrl}}'>{{post_number}}</a>", user_replied_to_topic: "<a href='{{userUrl}}'>{{user}}</a> ha risposto <a href='{{topicUrl}}'>al topic</a>", you_replied_to_topic: "<a href='{{userUrl}}'>Tu</a> hai risposto <a href='{{topicUrl}}'>al topic</a>", user_mentioned_user: "<a href='{{user1Url}}'>{{user}}</a> ha menzionato <a href='{{user2Url}}'>{{another_user}}</a>", user_mentioned_you: "<a href='{{user1Url}}'>{{user}}</a> ha menzionato <a href='{{user2Url}}'>te</a>", you_mentioned_user: "<a href='{{user1Url}}'>Tu</a> hai menzionato <a href='{{user2Url}}'>{{user}}</a>", posted_by_user: "Pubblicato da <a href='{{userUrl}}'>{{user}}</a>", posted_by_you: "Pubblicato da <a href='{{userUrl}}'>te</a>", sent_by_user: "Inviato da <a href='{{userUrl}}'>{{user}}</a>", sent_by_you: "Inviato da <a href='{{userUrl}}'>te</a>"}, user_action_groups: {1: "Like", 2: "Like ricevuti", 3: "Bookmark", 4: "Topic", 5: "Risposte", 6: "Risposte", 7: "Menzioni", 9: "Citazioni", 10: "Preferiti", 11: "Modifiche", 12: "Oggetti inviati", 13: "Inbox"}, user: {profile: "Profilo", title: "Utente", mute: "Ignora", edit: "Modifica Preferenze", download_archive: "scarica archivio dei miei post", private_message: "Messaggio Privato", private_messages: "Messaggi", activity_stream: "Attività", preferences: "Preferenze", bio: "Su di me", invited_by: "Invitato Da", trust_level: "Trust Level", external_links_in_new_tab: "Apri tutti i link esterni in una nuova tab", enable_quoting: "Abilita risposta con citazione su testo selezionato", moderator: "{{user}} è un moderatore", admin: "{{user}} è un amministratore", change_password: {action: "cambia", success: "(email inviata)", in_progress: "(invio email)", error: "(errore)"}, change_username: {action: "cambia", title: "Cambia Username", confirm: "Possono esserci consequenze modificando il tuo username. Sei veramente sicuro di volerlo fare?", taken: "Spiacenti, questo username è già utilizzato.", error: "Si è verificato un errore modificando il tuo username.", invalid: "Questo username non è valido. Deve contenere solo lettere e numeri."}, change_email: {action: "cambia", title: "Cambia Email", taken: "Spiacenti, questa email non è disponibile.", error: "Si è verificato un errore modificando la tua email. Forse l'indirizzo è già utilizzato?", success: "Abbiamo inviato una email a questo indirizzo. Segui le istruzioni per confermare la modifica."}, email: {title: "Email", instructions: "La tua email non verrà mai mostrata in pubblico.", ok: "Sembra buona. Ti invieremo una email per confermare.", invalid: "Per favore inserisci un indirizzo email valido.", authenticated: "La tua email è stata autenticata da {{provider}}.", frequency: "Ti invieremo una email solo se non ti abbiamo visto di recente e non hai letto ciò che ti abbiamo inviato per email."}, name: {title: "Nome", instructions: "La versione estesa del tuo nome, non deve necessariamente essere unica. Viene usata per agevolare la ricerca tramite menzione @name e mostrata solo nel tuo profilo.", too_short: "Il tuo nome è troppo breve.", ok: "Il tuo nome sembra valido."}, username: {title: "Username", instructions: "Deve essere unico, niente spazi. Gli altri utenti possono menzionarti con @username.", short_instructions: "Gli altri utenti possono menzionarti con @{{username}}.", available: "Il tuo username è disponibile.", global_match: "L'email corrisponde allo username registrato.", global_mismatch: "Già registrato. Prova {{suggestion}}?", not_available: "Non disponibile. Prova {{suggestion}}?", too_short: "Il tuo username è troppo corto.", too_long: "Il tuo username è troppo lungo.", checking: "Controllo disponibilità username...", enter_email: "Username trovato. Inserisci l'email corrispondente"}, password_confirmation: {title: "Conferma Password"}, last_posted: "Ultimo Post", last_emailed: "Ultimo via Email", last_seen: "Ultima Visita", created: "Creato il", log_out: "Log Out", website: "Sito web", email_settings: "Email", email_digests: {title: "Quando non visito il sito, mandami una email riassuntiva degli ultimi aggiornamenti", daily: "quotidiana", weekly: "settimanale", bi_weekly: "ogni due settimane"}, email_direct: "Ricevi un'email quando qualcuno ti cita, risponde ad un tuo post oppure menziona il tuo @username", email_private_messages: "Ricevi un'email quando qualcuno ti invia un messaggio privato", other_settings: "Altro", new_topic_duration: {label: "Considera i topic come nuovi quando", not_viewed: "Non li ho ancora letti", last_here: "sono stati creati dopo la mia ultima visita", after_n_days: {one: "sono stati postati nell'ultimo giorno", other: "sono stati postati negli ultimi {{count}} giorni"}, after_n_weeks: {one: "sono stati postati nell'ultima settimana", other: "sono stati postati nelle ultime {{count}} settimane"}}, auto_track_topics: "Traccia automaticamente i topic in cui entro", auto_track_options: {never: "mai", always: "sempre", after_n_seconds: {one: "dopo 1 secondo", other: "dopo {{count}} secondi"}, after_n_minutes: {one: "dopo 1 minuto", other: "dopo {{count}} minuti"}}, invited: {title: "Inviti", user: "Utenti Invitati", none: "{{username}} non ha invitato alcun utente al sito.", redeemed: "Inviti riscattati", redeemed_at: "Riscattato il", pending: "Inviti in corso", topics_entered: "Topic Visti", posts_read_count: "Post Letti", rescind: "Rimuovi Invito", rescinded: "Invito rimosso", time_read: "Tempo di Lettura", days_visited: "Giornate di visita", account_age_days: "Età account in giorni"}, password: {title: "Password", too_short: "La tua password è troppo corta.", ok: "La tua password sembra ok."}, ip_address: {title: "Ultimo indirizzo IP"}, avatar: {title: "Avatar", instructions: "Usiamo <a href='https://gravatar.com' target='_blank'>Gravatar</a> per gli avatar basandoci sulla tua email"}, filters: {all: "Tutti"}, stream: {posted_by: "Pubblicato da da", sent_by: "Inviato da", private_message: "messaggio privato", the_topic: "il topic"}}, loading: "Caricamento...", close: "Chiudi", learn_more: "di più...", year: "anno", year_desc: "topic postati negli ultimi 365 giorni", month: "month", month_desc: "topic postati negli ultimi 30 giorni", week: "week", week_desc: "topic postati negli ultimi 7 giorni", first_post: "Primo post", mute: "Ignora", unmute: "Annulla ignora", best_of: {title: "Best Of", enabled_description: 'Stai guardando il "Best Of" di questo topic.', description: "Ci sono <b>{{count}}</b> post in questo topic. Sono tanti! Vuoi risparmiare tempo leggendo solo i post con più interazioni e risposte?", enable: 'Passa a "Best Of"', disable: 'Annulla "Best Of"'}, private_message_info: {title: "Conversazione Privata", invite: "Invita altri utenti..."}, email: "Email", username: "Username", last_seen: "Ultima visita", created: "Registrato", trust_level: "Trust Level", create_account: {title: "Crea Account", action: "Creane uno adesso!", invite: "Non hai ancora un account?", failed: "Qualcosa è andato storto, forse questa email è già registrata, prova il link Password Dimenticata"}, forgot_password: {title: "Password Dimenticata", action: "Ho dimenticato la mia password", invite: "Inserisci il tuo username ed il tuo indirizzo email, ti invieremo le istruzioni per resettare la tua password.", reset: "Password Reset", complete: "A breve dovresti ricevere un'email con le istruzioni per resettare la tua password."}, login: {title: "Log In", username: "Login", password: "Password", email_placeholder: "indirizzo email o username", error: "Errore sconosciuto", reset_password: "Resetta Password", logging_in: "Login in corso...", or: "O", authenticating: "Autenticazione in corso...", awaiting_confirmation: "Il tuo account è in attesa di attivazione, usa il link Password Dimenticata per ricevere una nuova mail di attivazione.", awaiting_approval: "Il tuo account non è ancora stato approvato da un moderatore. Riceverai un'email non appena verrà approvato.", not_activated: "Non puoi ancora effettuare il log in. Ti abbiamo mandato un'email con il link di attivazione all'indirizzo <b>{{sentTo}}</b>. Per favore segui le istruzioni in quell'email per attivare il tuo account.", resend_activation_email: "Clicca qui per ricevere nuovamente la mail di attivazione.", sent_activation_email_again: "Ti abbiamo mandato un altro link di attivazione all'indirizzo<b>{{currentEmail}}</b>. Potrebbe volerci qualche minuto prima che arrivi; controlla anche fra lo spam.", google: {title: "con Google", message: "Autenticazione con Google (l'apertura di pop up deve essere permessa dal browser)"}, twitter: {title: "con Twitter", message: "Autenticazione con Twitter (l'apertura di pop up deve essere permessa dal browser)"}, facebook: {title: "con Facebook", message: "Autenticazione con Facebook (l'apertura di pop up deve essere permessa dal browser)"}, yahoo: {title: "con Yahoo", message: "Autenticazione con Yahoo (l'apertura di pop up deve essere permessa dal browser)"}, github: {title: "con GitHub", message: "Autenticazione con GitHub (l'apertura di pop up deve essere permessa dal browser)"}, persona: {title: "con Persona", message: "Autenticazione con Mozilla Persona (l'apertura di pop up deve essere permessa dal browser)"}}, composer: {posting_not_on_topic: 'Stai rispondendo al topic "{{title}}", ma al momento stai visualizzando un topic diverso.', saving_draft_tip: "salvataggio", saved_draft_tip: "salvato", saved_local_draft_tip: "salvato in locale", similar_topics: "Il tuo topic è simile a...", drafts_offline: "bozze offline", min_length: {need_more_for_title: "ancora {{n}} caratteri per il titolo", need_more_for_reply: "ancora {{n}} caratteri per il post"}, save_edit: "Salva Modifica", reply_original: "Rispondi al topic originale", reply_here: "Rispondi Qui", reply: "Rispondi", cancel: "Cancella", create_topic: "Crea Topic", create_pm: "Crea Messaggio Privato", users_placeholder: "Aggiungi Utente", title_placeholder: "Scrivi il titolo qui. Qual è l'argomento di discussione (si breve)?", reply_placeholder: "Scrivi la tua risposta qui. Usa Markdown o BBCode per formattare. Trascina o incolla un'immagine qui per caricarla.", view_new_post: "Guarda il tuo nuovo post.", saving: "Salvataggio...", saved: "Salvato!", saved_draft: "Hai una bozza di un post in corso. Clicca questo box per riprendere la scrittura.", uploading: "Uploading...", show_preview: "mostra anteprima &raquo;", hide_preview: "&laquo; nascondi anteprima", quote_post_title: "Cita l'intero post", bold_title: "Grassetto", bold_text: "testo grassetto", italic_title: "Corsivo", italic_text: "testo in corsivo", link_title: "Hyperlink", link_description: "descrizione del link", link_dialog_title: "Inserisci Link", link_optional_text: "titolo facoltativo", quote_title: "Blockquote", quote_text: "Blockquote", code_title: "Esempio di codice", code_text: "inserisci il codice qui", image_title: "Immagine", image_description: "descrizione dell'immagine", image_dialog_title: "Inserisci Immagine", image_optional_text: "titolo facoltativo", image_hosting_hint: "Hai bisogno di <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>free image hosting?</a>", olist_title: "Lista Numerata", ulist_title: "Lista non Numerata", list_item: "Elemento della lista", heading_title: "Intestazione", heading_text: "Intestazione", hr_title: "Riga Orizzontale", undo_title: "Annulla", redo_title: "Ripeti", help: "Aiuto Markdown", toggler: "nascondi o mostra il pannello di composizione", admin_options_title: "Impostazioni opzionali per lo staff", auto_close_label: "Chiusura automatica topic dopo:", auto_close_units: "giorni"}, notifications: {title: "notifiche di menzioni @name, risposte ai tuoi post e topic, messaggi privati, etc", none: "Non hai notifiche in questo momento.", more: "guarda notifiche più vecchie", mentioned: "<span title='menzionato' class='icon'>@</span> {{username}} {{link}}", quoted: "<i title='citato' class='icon icon-quote-right'></i> {{username}} {{link}}", replied: "<i title='risposto' class='icon icon-reply'></i> {{username}} {{link}}", posted: "<i title='risposto' class='icon icon-reply'></i> {{username}} {{link}}", edited: "<i title='modificato' class='icon icon-pencil'></i> {{username}} {{link}}", liked: "<i title='liked' class='icon icon-heart'></i> {{username}} {{link}}", private_message: "<i class='icon icon-envelope-alt' title='messaggio privato'></i> {{username}} ti ha mandato un messaggio privato: {{link}}", invited_to_private_message: "{{username}} ti ha invitato ad una conversazione privata: {{link}}", invitee_accepted: "<i title='ha accettato il tuo invito' class='icon icon-signin'></i> {{username}} ha accettato il tuo invito", moved_post: "<i title='post spostato' class='icon icon-arrow-right'></i> {{username}} ha spostato il post qui {{link}}", total_flagged: "totale post segnalati"}, image_selector: {title: "Inserisci Immagine", from_my_computer: "Dal mio dispositivo", from_the_web: "Dal Web", add_image: "Aggiungi Immagine", remote_title: "immagine remota", remote_tip: "inserisci l'indirizzo dell'immagine (es. http://example.com/image.jpg)", local_title: "immagine locale", local_tip: "clicca per selezionare un'immagine dal tuo dispositivo.", upload: "Upload", uploading_image: "Carico l'immagine"}, search: {title: "cerca topic, post, utenti o categorie", placeholder: "scrivi i termini di ricerca", no_results: "Nessun risultato.", searching: "Cerco ..."}, site_map: "vai in un'altra lista topic o categoria", go_back: "torna indietro", current_user: "vai alla tua pagina utente", favorite: {title: "Preferito", help: {star: "aggiungi questo topic nella tua lista dei preferiti", unstar: "rimuovi questo topic dalla tua lista dei preferiti"}}, topics: {none: {favorited: "Non hai alcun topic preferito. Per rendere un topic preferito, clicca la stella di fianco al titolo.", unread: "Non hai alcun topic non letto da leggere.", "new": "Non hai nuovi topic da leggere.", read: "Non hai ancora letto alcun topic.", posted: "Non hai ancora postato in nessun topic.", latest: "Non ci sono post popolari. È molto triste.", hot: "Non ci sono topic caldi.", category: "Non ci sono topic nella categoria {{category}}."}, bottom: {latest: "Non ci sono altri topic da leggere.", hot: "Non ci sono altri topic caldi da leggere.", posted: "Non ci sono altri post da leggere.", read: "Non ci sono altri topic da leggere.", "new": "Non ci sono altri nuovi topic da leggere.", unread: "Non ci sono altri topic non letti da leggere.", favorited: "Non ci sono altri topic preferiti da leggere.", category: "Non ci sono altri topic nella categoria {{category}} da leggere."}}, rank_details: {toggle: "attica dettaglio classifica topic", show: "mostra dettaglio classifica topic", title: "Dettaglio Classifica Topic"}, topic: {create_in: "Crea Topic in {{categoryName}}", create: "Crea Topic", create_long: "Crea un nuovo Topic", private_message: "Inizia una conversazione privata", list: "Topic", "new": "nuovo topic", title: "Topic", loading_more: "Carico altri Topic...", loading: "Carico topic...", invalid_access: {title: "Il Topic è privato", description: "Spiacenti, non hai accesso a quel topic!"}, server_error: {title: "Caricamento Topic fallito", description: "Spiacenti, non è stato possibile caricare il topic, probabilmente per un problema di connessione. Per favore prova ancora. Facci sapere se il problema persiste."}, not_found: {title: "Topic non trovato", description: "Spiacenti, il topic non è stato trovato. Forse è stato eliminato da un moderatore?"}, unread_posts: "hai {{unread}} vecchi post non letti in questo topic", new_posts: "ci sono {{new_posts}} nuovi post in questo topic dalla tua ultima visita", likes: {one: "c'è 1 like in questo topic", other: "ci sono {{count}} like in questo topic"}, back_to_list: "Torna all'Elenco dei Topic", options: "Opzioni Topic", show_links: "mostra i link in questo topic", toggle_information: "informazioni sul topic", read_more_in_category: "Vuoi leggere di più? Guarda altri topic nella categoria {{catLink}} o {{latestLink}}.", read_more: "Vuoi leggere di più? {{catLink}} o {{latestLink}}.", browse_all_categories: "Guarda tutte le categorie", view_latest_topics: "guarda gli ultimi topic", suggest_create_topic: "Perché non creare un topic?", read_position_reset: "La tua posizione di lettura è stata reimpostata.", jump_reply_up: "vai alla risposta precedente", jump_reply_down: "vai alla risposta successiva", deleted: "Il Topic è stato eliminato", auto_close_notice: "Questo topic verrà automaticamente chiuso in %{timeLeft}.", auto_close_title: "Impostazioni Auto-Chiusura", auto_close_save: "Salva", auto_close_cancel: "Cancella", auto_close_remove: "Non Auto-Chiudere questo Topic", progress: {title: "topic progress", jump_top: "vai al primo post", jump_bottom: "vai all'ultimo post", total: "totale post", current: "post corrente"}, notifications: {title: "", reasons: {"3_2": "Riceverai notifiche perché sei iscritto a questo topic.", "3_1": "Riceverai notifiche perché hai creato questo topic.", 3: "Riceverai notifiche perché sei iscritto a questo topic.", "2_4": "Riceverai notifiche perché hai risposto a questo topic.", "2_2": "Riceverai notifiche perché stai tracciando questo topic.", 2: 'Riceverai notifiche perché <a href="/users/{{username}}/preferences">hai letto questo topic</a>.', 1: "Verrai notificato solo se qualcuno menziona il tuo @nome o risponde ad un tuo post.", "1_2": "Verrai notificato solo se qualcuno menziona il tuo @nome o risponde ad un tuo post.", 0: "Stai ignorando tutte le notifiche a questo topic.", "0_2": "Stai ignorando tutte le notifiche a questo topic."}, watching: {title: "Iscritto", description: "come il Tracking, ma verrai anche notificato ad ogni nuova risposta."}, tracking: {title: "Tracking", description: "verrai notificato dei post non letti, delle menzioni @nome, risposte ai tuoi post."}, regular: {title: "Normale", description: "verrai notificato solo se qualcuno menziona il tuo @nome o risponde ad un tuo post."}, muted: {title: "Ignora", description: "non riceverai nessuna notifica su questo topic e non apparirà nel tuo tab non letti."}}, actions: {"delete": "Elimina Topic", open: "Apri Topic", close: "Chiudi Topic", auto_close: "Auto Chiusura", unpin: "Un-Pin Topic", pin: "Pin Topic", unarchive: "Togli dall'archivio il Topic", archive: "Archivia Topic", invisible: "Rendi Invisibile", visible: "Rendi Visibile", reset_read: "Reset Read Data", multi_select: "Unisci/Dividi Post", convert_to_topic: "Converti in un Topic Normale"}, reply: {title: "Rispondi", help: "scrivi una risposta a questo topic"}, clear_pin: {title: "Cancella pin", help: "Il topic non sarà più pinnato e non apparirà in cima alla lista dei topic"}, share: {title: "Condividi", help: "condividi questo topic"}, inviting: "Sto invitando...", invite_private: {title: "Invita a Conversazione Privata", email_or_username: "L'Email o l'Username dell'invitato", email_or_username_placeholder: "indirizzo email o username", action: "Invita", success: "Grazie! Abbiamo invitato quell'utente a partecipare in questa conversazione privata.", error: "Spiacenti, si è verificato un errore nell'invitare l'utente."}, invite_reply: {title: "Invita gli amici a partecipare", action: "Invito Email", help: "spedisci un invito agli amici in modo che possano partecipare a questo topic", email: "Manderemo ai tuoi amici una breve mail dove potranno rispondere a questo topic cliccando su un semplice link.", email_placeholder: "indirizzo email", success: "Grazie! Abbiamo mandato un invito a <b>{{email}}</b>. Ti faremo sapere quando accetteranno l'invito. Controlla il tab inviti nella tua pagina utente per tenere traccia di chi hai invitato.", error: "Spiacenti, non abbiamo potuto invitare quella persona. Forse è già un utente iscritto?"}, login_reply: "Log In per Rispondere", filters: {user: "Stai vedendo solo {{n_posts}} {{by_n_users}}.", n_posts: {one: "1 post", other: "{{count}} post"}, by_n_users: {one: "da 1 utente specifico", other: "da {{count}} utenti specifici"}, best_of: "Stai vedendo i {{n_best_posts}} {{of_n_posts}}.", n_best_posts: {one: "1 best post", other: "{{count}} best post"}, of_n_posts: {one: "di 1 nel topic", other: "di {{count}} nel topic"}, cancel: "Mostra nuovamente tutti i post di questo topic."}, split_topic: {title: "Dividi Topic", action: "dividi topic", topic_name: "Nuovo nome topic:", error: "Si è verificato un errore nella divisione del topic", instructions: {one: "Stai per creare un nuovo topic per popolarlo con i post che hai selezionato", other: "Stai per creare un nuovo topic per popolarlo con i <b>{{count}}</b> post che hai selezionato"}}, merge_topic: {title: "Unisci Topic", action: "unisci topic", error: "Si è verificato un errore unendo questo topic.", instructions: {one: "Seleziona il topic in cui desideri spostare questo post.", other: "Seleziona il topic in cui desideri spostare questi <b>{{count}}</b> post."}}, multi_select: {select: "seleziona", selected: "selezionati ({{count}})", "delete": "elimina selezionati", cancel: "annulla selezione", description: {one: "Hai selezionato <b>1</b> post.", other: "Hai selezionato <b>{{count}}</b> post."}}}, post: {reply: "Rispondendo a {{link}} di {{replyAvatar}} {{username}}", reply_topic: "Rispondi a {{link}}", quote_reply: "cita risposta", edit: "Modificando {{link}} di {{replyAvatar}} {{username}}", post_number: "post {{number}}", in_reply_to: "in risposta a", reply_as_new_topic: "Rispondi come Nuovo Topic", continue_discussion: "La discussione continua da {{postLink}}:", follow_quote: "vai al post quotato", deleted_by_author: "(post eliminato dall'autore)", expand_collapse: "espandi/chiudi", has_replies: {one: "Risposta", other: "Risposte"}, errors: {create: "Spiacenti, si è verificato un errore durante la creazione del tuo post. Per favore, prova di nuovo.", edit: "Spiacenti, si è verificato un errore durante la modifica del tuo post. Per favore, prova di nuovo.", upload: "Spiacenti, si è verificato un errore durante il caricamento del file. Per favore, prova di nuovo.", upload_too_large: "Spiacenti, il file che stai cercando di caricare è troppo grande (la dimensione massima è {{max_size_kb}}kb), per favore ridimensionalo e prova di nuovo.", too_many_uploads: "Spiacenti, puoi caricare un'immagine per volta."}, abandon: "Sei sicuro di voler abbandonare il tuo post?", archetypes: {save: "Opzioni di Salvataggio"}, controls: {reply: "inizia a scrivere una risposta a questo post", like: "like", edit: "modifica post", flag: "segnala questo post all'attezione dei moderatori", "delete": "elimina post", undelete: "annulla eliminazione post", share: "condividi questo post", more: "Di più"}, actions: {flag: "Segnala", clear_flags: {one: "Annulla segnalazione", other: "Annulla segnalazioni"}, it_too: {off_topic: "Segnala anche", spam: "Segnala anche", inappropriate: "Segnala anche", custom_flag: "Segnala anche", bookmark: "Anche nei segnalibri", like: "Like anche", vote: "Vota anche"}, undo: {off_topic: "Annulla segnalazione", spam: "Annulla segnalazione", inappropriate: "Annulla segnalazione", bookmark: "Annulla segnalibro", like: "Annulla like", vote: "Annulla voto"}, people: {off_topic: "{{icons}} segnato questo come off-topic", spam: "{{icons}} segnato questo come spam", inappropriate: "{{icons}} segnato questo come inappropriato", notify_moderators: "{{icons}} moderatori notificati", notify_moderators_with_url: "{{icons}} <a href='{{postUrl}}'>moderatori notificati</a>", notify_user: "{{icons}} ha inviato un messaggio privato", notify_user_with_url: "{{icons}} ha inviato un <a href='{{postUrl}}'>messaggio privato</a>", bookmark: "{{icons}} inserito nei segnalibri", like: "{{icons}} piaciuto", vote: "{{icons}} votato"}, by_you: {off_topic: "Hai segnalato questo come off-topic", spam: "Hai segnalato questo come spam", inappropriate: "Hai segnalato questo come inappropriato", notify_moderators: "Hai segnalato questo all'attenzione di moderazione", notify_user: "Hai inviato un messaggio privato a questo utente", bookmark: "Hai inserito questo post nei segnalibri", like: "Hai messo Like", vote: "Hai votato per questo post"}, by_you_and_others: {off_topic: {one: "Tu e un altro lo avete segnalato come off-topic", other: "Tu e altre {{count}} persone lo avete segnalato come off-topic"}, spam: {one: "Tu e un altro lo avete segnalato come spam", other: "Tu e altre {{count}} persone lo avete segnalato come spam"}, inappropriate: {one: "Tu e un altro lo avete segnalato come inappropriato", other: "Tu e altre {{count}} persone lo avete segnalato come inappropriato"}, notify_moderators: {one: "Tu e un altro lo avete segnalato alla moderazione", other: "Tu e altre {{count}} persone lo avete segnalato alla moderazione"}, notify_user: {one: "Tu e un altro avete inviato un messaggio privato a questo utente", other: "Tu e altre {{count}} persone avete inviato un messaggio privato a questo utente"}, bookmark: {one: "Tu e un altro avete messo nei segnalibri questo post", other: "Tu e altre {{count}} persone avete messo nei segnalibri questo post"}, like: {one: "A te e un altro piace questo", other: "A te e ad altre {{count}} persone piace questo"}, vote: {one: "Tu e un altro avete votato per questo post", other: "Tu e altre {{count}} persone avete votato per questo post"}}, by_others: {off_topic: {one: "1 persona lo ha segnalato come off-topic", other: "{{count}} persone hanno segnalato questo come off-topic"}, spam: {one: "1 persona lo ha segnalato come spam", other: "{{count}} persone hanno segnalato questo come spam"}, inappropriate: {one: "1 persona lo ha segnalato come inappropriato", other: "{{count}} persone hanno segnalato questo come inappropriato"}, notify_moderators: {one: "1 persona lo ha segnalato per la moderazione", other: "{{count}} persone hanno segnalato questo per la moderazione"}, notify_user: {one: "1 persona ha inviato un messaggio privato a questo utente", other: "{{count}} persone hanno inviato un messaggio privato a questo utente"}, bookmark: {one: "1 persona ha messo nei segnalibri questo post", other: "{{count}} persone hanno messo nei segnalibri questo post"}, like: {one: "Ad 1 persona è piaciuto questo", other: "A {{count}} persone è piaciuto questo"}, vote: {one: "1 persona ha votato questo post", other: "{{count}} persone hanno votato questo post"}}}, edits: {one: "1 modifica", other: "{{count}} modifiche", zero: "nessuna modifica"}, "delete": {confirm: {one: "Sei sicuro di voler eliminare quel post?", other: "Sei sicuro di voler eliminare tutti quei post?"}}}, category: {none: "(nessuna categoria)", edit: "modifica", edit_long: "Modifica Categoria", edit_uncategorized: "Modifica Non categorizzata", view: "Mostra Topic nella Categoria", general: "Generale", settings: "Impostazioni", "delete": "Elimina Categoria", create: "Crea Categoria", save: "Salva Categoria", creation_error: "Si è verificato un errore durante la creazione della categoria.", save_error: "Si è verificato un errore durante il salvataggio della categoria..", more_posts: "guarda tutti i {{posts}} post...", name: "Nome Categoria", description: "Descrizione", topic: "topic categoria", badge_colors: "colori Badge", background_color: "colore Sfondo", foreground_color: "colore Testo", name_placeholder: "Breve e Succinto.", color_placeholder: "Qualsiasi colore web", delete_confirm: "Sei sicuro di voler eliminare quella categoria?", delete_error: "Si è verificato un errore durante la cancellazione della categoria.", list: "Lista Categorie", no_description: "Nessuna descrizione per questa categoria.", change_in_category_topic: "Modifica Descrizione", hotness: "Hotness", already_used: "Questo colore è già in uso da un'altra categoria", is_secure: "Categoria protetta?", add_group: "Aggiungi Gruppo", security: "Protezione", allowed_groups: "Gruppi Ammessi:", auto_close_label: "Auto-chiusura topic dopo:"}, flagging: {title: "Perché stai segnalando questo post?", action: "Segnala Post", notify_action: "Notifica", cant: "Spiacenti, non puoi segnalare questo post al momento.", custom_placeholder_notify_user: "Perché vuoi contattare privatamente o direttamente questo utente? Si specifico, costruttivo e cortese.", custom_placeholder_notify_moderators: "Perché questo post richiede l'attenzione di un moderatore? Facci sapere nello specifico cosa non va e fornisci opportuni link se possibile.", custom_message: {at_least: "inserisci almeno {{n}} caratteri", more: "ancora {{n}}...", left: "{{n}} rimanenti"}}, topic_summary: {title: "Riepilogo del Topic", links_shown: "mostra tutti i {{totalLinks}} link...", clicks: "click", topic_link: "topic link"}, topic_statuses: {locked: {help: "questo topic è chiuso; non è possibile postare nuove risposte"}, pinned: {help: "questo topic è pinned; sarà mostrato in cima alla lista dei topic"}, archived: {help: "questo topic è archiviato; è congelato e non può essere modificato"}, invisible: {help: "questo topic è invisibile; non sarà mostrato nella lista dei topic, può essere raggiunto solo tramite link diretto"}}, posts: "Post", posts_long: "{{number}} post in questo topic", original_post: "Post Originale", views: "Visite", replies: "Risposte", views_long: "questo topic è stato visto {{number}} volte", activity: "Attività", likes: "Like", top_contributors: "Partecipanti", category_title: "Categoria", history: "Cronologia", changed_by: "di {{author}}", categories_list: "Elenco Categorie", filters: {latest: {title: "Ultimi", help: "topic più recenti"}, hot: {title: "Hot", help: "una selezione dei topic più attivi"}, favorited: {title: "Preferiti", help: "topic preferiti"}, read: {title: "Letti", help: "topic che hai letto"}, categories: {title: "Categorie", title_in: "Categoria - {{categoryName}}", help: "tutti i topic raggruppati per categoria"}, unread: {title: {zero: "Non Letti", one: "Non Letti (1)", other: "Non Letti ({{count}})"}, help: "topic tracciati con post non letti"}, "new": {title: {zero: "Nuovi", one: "Nuovi (1)", other: "Nuovi ({{count}})"}, help: "nuovi topic dall'ultima tua visita"}, posted: {title: "Miei Post", help: "topic in cui hai postato"}, category: {title: {zero: "{{categoryName}}", one: "{{categoryName}} (1)", other: "{{categoryName}} ({{count}})"}, help: "ultimi topic nella categoria {{categoryName}}"}}, browser_update: 'Purtroppo, <a href="http://www.discourse.org/faq/#browser">la versione del browser è data per supportare questo forum Discourse</a>. Per favore <a href="http://browsehappy.com">aggiorna il tuo browser</a>.', type_to_filter: "scrivi per filtrare...", admin: {title: "Amministrazione Discourse", moderator: "Moderatore", dashboard: {title: "Dashboard", version: "Versione", up_to_date: "Sei aggiornato!", critical_available: "Un aggiornamento critico è disponibile.", updates_available: "Aggiornamenti disponibili.", please_upgrade: "Per favore aggiorna!", installed_version: "Installata", latest_version: "Ultima", problems_found: "Sono stati trovati alcuni problemi con la tua installazione di Discourse:", last_checked: "Ultimo controllo", refresh_problems: "Aggiorna", no_problems: "Nessun problema trovato.", moderators: "Moderatori:", admins: "Amministratori:", private_messages_short: "PMs", private_messages_title: "Messaggi Privati", reports: {today: "Oggi", yesterday: "Ieri", last_7_days: "Ultimi 7 Giorni", last_30_days: "Ultimi 30 Giorni", all_time: "Sempre", "7_days_ago": "7 Giorni fa", "30_days_ago": "30 Giorni fa", all: "Tutti", view_table: "Vedi come Tabella", view_chart: "Vedi come Grafico a Barre"}}, commits: {latest_changes: "Ultime modifiche: ricorda di aggiorna spesso!", by: "da"}, flags: {title: "Segnalazioni", old: "Vecchie", active: "Attive", clear: "Annulla Segnala", clear_title: "annulla tutte le segnalazioni su questo post (i post nascosti diventeranno visibili)", "delete": "Cancella Post", delete_title: "cancella post (se è il primo post il topic verrà cancellato)", flagged_by: "Segnalato da", error: "Qualcosa è andato storto", view_message: "Reply"}, groups: {title: "Gruppi", edit: "Modifica Gruppi", selector_placeholder: "aggiungi utenti", name_placeholder: "Nome gruppo, no spazi, come lo username"}, api: {title: "API", long_title: "Informazioni API", key: "Key", generate: "Genera API Key", regenerate: "Rigenera API Key", info_html: "La API Key ti permetterà di creare e aggiornare topic usando chiamate JSON.", note_html: "Conserva <strong>in modo sicuro</strong> questa chiave. Tutti gli utenti con questa chiave possono creare arbitrariamente post."}, customize: {title: "Personalizza", long_title: "Personalizzazioni Sito", header: "Header", css: "Stylesheet", override_default: "Sovrascrivi default?", enabled: "Attivo?", preview: "anteprima", undo_preview: "annulla anteprima", save: "Salva", "new": "Nuovo", new_style: "Nuovo Stile", "delete": "Elimina", delete_confirm: "Elimina questa personalizzazione?", about: "La Personalizzazione del Sito di permette di modificare i fogli di stile e le testate del sito."}, email: {title: "Log Email", sent_at: "Visto il", email_type: "Tipo Email", to_address: "Indirizzo destinatario", test_email_address: "indirizzo email da testare", send_test: "manda email di test", sent_test: "spedita!"}, impersonate: {title: "Impersona Utente", username_or_email: "Username o Email dell'Utente", help: "Usa questo strumento per impersonare un account Utente per ragioni di debug.", not_found: "Quell'utente non può essere trovato.", invalid: "Spiacente, non puoi impersonare quell'utente."}, users: {title: "Utenti", create: "Aggiungi Amministratore", last_emailed: "Ultima Email", not_found: "Spiacenti quell'username non esiste nel sistema.", "new": "Nuovi", active: "Attivi", pending: "In Sospeso", approved: "Approvare?", approved_selected: {one: "approva utente", other: "approva utenti ({{count}})"}, titles: {active: "Utenti Attivi", "new": "Nuovi Utenti", pending: "Utenti in attesa di verifica", newuser: "Utenti Trust Level 0 (New User)", basic: "Utenti Trust Level 1 (Basic User)", regular: "Utenti Trust Level 2 (Regular User)", leader: "Utenti Trust Level 3 (Leader)", elder: "Utenti Trust Level 4 (Elder)", admins: "Amministratori", moderators: "Moderatori"}}, user: {ban_failed: "Qualcosa è andato storto nel bannare questo utente {{error}}", unban_failed: "Qualcosa è andato rimuovendo il ban a questo utente {{error}}", ban_duration: "Per quanto tempo vuoi bannare l'utente? (giorni)", delete_all_posts: "Cancella tutti i post", ban: "Ban", unban: "Rimuovi Ban", banned: "Bannato?", moderator: "Moderatore?", admin: "Amministratore?", show_admin_profile: "Amministratore", refresh_browsers: "Forza refresh del browser", show_public_profile: "Mostra profilo pubblico", impersonate: "Impersona", revoke_admin: "Revoca Amministratore", grant_admin: "Garantisci Amministratore", revoke_moderation: "Revoca Moderatore", grant_moderation: "Garantisci Moderatore", reputation: "Reputazione", permissions: "Permessi", activity: "Attività", like_count: "Like Ricevuti", private_topics_count: "Topic Privati", posts_read_count: "Post Letti", post_count: "Post Creati", topics_entered: "Topic Visitati", flags_given_count: "Segnalazioni Fatte", flags_received_count: "Segnalazioni Ricevute", approve: "Approva", approved_by: "approvato da", time_read: "Tempo di Lettura", "delete": "Cancella Utente", delete_forbidden: "Questo utente non può essere cancellato poiché ci sono altri post. Cancella i suoi post prima di eliminarlo.", delete_confirm: "Sei sicuro di voler cancellare definitivamente questo utente? Questa azione è irreversibile!", deleted: "L'utente è stato cancellato.", delete_failed: "Si sono verificati degli errori nella cancellazione dell'utente. Assicurati che tutti i suoi post sono stati cancellati.", send_activation_email: "Invia Email di Attivazione", activation_email_sent: "Una email di attivazione è stata inviata.", send_activation_email_failed: "Si sono verificati dei problemi durante l'invio dell'email di attivazione.", activate: "Attiva Account", activate_failed: "Si sono verificati dei problemi durante l'attivazione dell'account.", deactivate_account: "Disattiva Account", deactivate_failed: "Si sono verificati dei problemi durante la disattivazione dell'account."}, site_content: {none: "Scegli un tipo di contenuto da modificare.", title: "Contento", edit: "Modifica Contenuto Sito"}, site_settings: {show_overriden: "Mostra solo modificati", title: "Impostazioni Sito", reset: "resetta al default"}}}}}, I18n.locale = "it", function (e) {
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
        return e ? (!O[e] && j && require("./lang/" + e), O[e]) : P.fn._lang
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

        for (var s = 5; s-- && B.test(t);)t = t.replace(B, n);
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

    function D(e) {
        var t, n = e._i, s = X.exec(n);
        if (s) {
            for (e._f = "YYYY-MM-DD" + (s[2] || " "), t = 0; 4 > t; t++)if (et[t][1].exec(n)) {
                e._f += et[t][0];
                break
            }
            K.exec(n) && (e._f += " Z"), w(e)
        } else e._d = new Date(n)
    }

    function k(t) {
        var n = t._i, s = U.exec(n);
        n === e ? t._d = new Date : s ? t._d = new Date(+s[1]) : "string" == typeof n ? D(t) : c(n) ? (t._a = n.slice(0), x(t)) : t._d = n instanceof Date ? new Date(+n) : new Date(n)
    }

    function E(e, t, n, s, r) {
        return r.relativeTime(t || 1, !!n, e, s)
    }

    function C(e, t, n) {
        var s = R(Math.abs(e) / 1e3), r = R(s / 60), a = R(r / 60), i = R(a / 24), o = R(i / 365), u = 45 > s && ["s", s] || 1 === r && ["m"] || 45 > r && ["mm", r] || 1 === a && ["h"] || 22 > a && ["hh", a] || 1 === i && ["d"] || 25 >= i && ["dd", i] || 45 >= i && ["M"] || 345 > i && ["MM", R(i / 30)] || 1 === o && ["y"] || ["yy", o];
        return u[2] = t, u[3] = e > 0, u[4] = n, E.apply({}, u)
    }

    function S(e, t, n) {
        var s, r = n - t, a = n - e.day();
        return a > r && (a -= 7), r - 7 > a && (a += 7), s = P(e).add("d", a), {week: Math.ceil(s.dayOfYear() / 7), year: s.year()}
    }

    function I(e) {
        var t = e._i, n = e._f;
        return null === t || "" === t ? null : ("string" == typeof t && (e._i = t = f().preparse(t)), P.isMoment(t) ? (e = i({}, t), e._d = new Date(+t._d)) : n ? c(n) ? T(e) : w(e) : k(e), new r(e))
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

    for (var P, L, z = "2.0.0", R = Math.round, O = {}, j = "undefined" != typeof module && module.exports, U = /^\/?Date\((\-?\d+)/i, F = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, H = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, B = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, V = /\d\d?/, Y = /\d{1,3}/, G = /\d{3}/, q = /\d{1,4}/, W = /[+\-]?\d{1,6}/, $ = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, K = /Z|[\+\-]\d\d:?\d\d/i, Q = /T/i, Z = /[\+\-]?\d+(\.\d{1,3})?/, X = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, J = "YYYY-MM-DDTHH:mm:ssZ", et = [
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
    }}; it.length;)L = it.pop(), ut[L + "o"] = n(ut[L], L);
    for (; ot.length;)L = ot.pop(), ut[L + L] = t(ut[L], 2);
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
        var n, s, r = P.isDuration(e), i = "number" == typeof e, o = r ? e._data : i ? {} : e, u = F.exec(e);
        return i ? t ? o[t] = e : o.milliseconds = e : u && (n = "-" === u[1] ? -1 : 1, o = {y: 0, d: ~~u[2] * n, h: ~~u[3] * n, m: ~~u[4] * n, s: ~~u[5] * n, ms: ~~u[6] * n}), s = new a(o), r && e.hasOwnProperty("_lang") && (s._lang = e._lang), s
    }, P.version = z, P.defaultFormat = J, P.updateOffset = function () {
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
        var t = R((P(this).startOf("day") - P(this).startOf("year")) / 864e5) + 1;
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
    }}, L = 0; nt.length > L; L++)M(nt[L].toLowerCase().replace(/s$/, ""), nt[L]);
    M("year", "FullYear"), P.fn.days = P.fn.day, P.fn.months = P.fn.month, P.fn.weeks = P.fn.week, P.fn.isoWeeks = P.fn.isoWeek, P.fn.toJSON = P.fn.toISOString, P.duration.fn = a.prototype = {weeks: function () {
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
    for (L in st)st.hasOwnProperty(L) && (N(L, st[L]), A(L.toLowerCase()));
    N("Weeks", 6048e5), P.duration.fn.asMonths = function () {
        return(+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, P.lang("en", {ordinal: function (e) {
        var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
        return e + n
    }}), j && (module.exports = P), "undefined" == typeof ender && (this.moment = P), "function" == typeof define && define.amd && define("moment", [], function () {
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