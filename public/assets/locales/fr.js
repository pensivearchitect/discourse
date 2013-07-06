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
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, MessageFormat = {locale: {}}, MessageFormat.locale.fr = function (e) {
    return e >= 0 && 2 > e ? "one" : "other"
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
}({}), I18n.translations = {fr: {js: {dates: {tiny: {half_a_minute: "< 1m", less_than_x_seconds: {one: "< 1s", other: "< %{count}s"}, x_seconds: {one: "1s", other: "%{count}s"}, less_than_x_minutes: {one: "< 1m", other: "< %{count}m"}, x_minutes: {one: "1m", other: "%{count}m"}, about_x_hours: {one: "1h", other: "%{count}h"}, x_days: {one: "1d", other: "%{count}d"}, about_x_months: {one: "1mois", other: "%{count}mois"}, x_months: {one: "1mois", other: "%{count}mois"}, about_x_years: {one: "1an", other: "%{count}an"}, over_x_years: {one: "> 1an", other: "> %{count}an"}, almost_x_years: {one: "1an", other: "%{count}an"}}, medium: {x_minutes: {one: "1 min", other: "%{count} mins"}, x_hours: {one: "1 hour", other: "%{count} heures"}, x_days: {one: "1 day", other: "%{count} jours"}}, medium_with_ago: {x_minutes: {one: "Iy a 1 min", other: "Il y a %{count} minutes"}, x_hours: {one: "Il y a 1 heure", other: "Il y a %{count} heures"}, x_days: {one: "Il y a 1 jour", other: "Il y a %{count} jours"}}}, share: {topic: "partager un lien vers cette discussion", post: "partager un lien vers ce message", close: "fermer", twitter: "partager ce lien sur Twitter", facebook: "partager ce lien sur Facebook", "google+": "partager ce lien sur Google+", email: "envoyer ce lien par email"}, edit: "éditer le titre et la catégorie de cette discussion", not_implemented: "Cette fonctionnalité n'a pas encore été implémentée, désolé.", no_value: "Non", yes_value: "Oui", of_value: "de", generic_error: "Désolé, une erreur est survenue.", log_in: "Connexion", age: "Âge", last_post: "dernier message", admin_title: "Admin", flags_title: "Signalements", show_more: "afficher plus", links: "Liens", faq: "FAQ", you: "vous", or: "ou", now: "à l'instant", read_more: "lire la suite", in_n_seconds: {one: "dans 1 seconde", other: "dans {{count}} secondes"}, in_n_minutes: {one: "dans 1 minute", other: "dans {{count}} minutes"}, in_n_hours: {one: "dans 1 heure", other: "dans {{count}} heures"}, in_n_days: {one: "dans 1 jour", other: "dans {{count}} jours"}, suggested_topics: {title: "discussions proposées"}, bookmarks: {not_logged_in: "Désolé vous devez être connecté pour placer ce message dans vos signets.", created: "Vous avez placé ce message dans vos signets.", not_bookmarked: "Vous avez lu ce message; Cliquez pour le placer dans vos signets.", last_read: "Voici le dernier message que vous avez lu."}, new_topics_inserted: "{{count}} nouvelles discussions.", show_new_topics: "Cliquez pour afficher.", preview: "prévisualiser", cancel: "annuler", save: "Sauvegarder les changements", saving: "Sauvegarde en cours...", saved: "Sauvegardé !", choose_topic: {none_found: "Aucune discussion trouvée.", title: {search: "Rechechez une discussion par son nom, url ou id :", placeholder: "renseignez ici le titre de la discussion"}}, user_action: {user_posted_topic: "<a href='{{userUrl}}'>{{user}}</a> à démarré <a href='{{topicUrl}}'>la discussion</a>", you_posted_topic: "<a href='{{userUrl}}'>Vous</a> avez démarré <a href='{{topicUrl}}'>la discussion</a>", user_replied_to_post: "<a href='{{userUrl}}'>{{user}}</a> à répondu à <a href='{{postUrl}}'>{{post_number}}</a>", you_replied_to_post: "<a href='{{userUrl}}'>Vous</a> avez répondu à <a href='{{postUrl}}'>{{post_number}}</a>", user_replied_to_topic: "<a href='{{userUrl}}'>{{user}}</a> à participé à <a href='{{topicUrl}}'>la discussion</a>", you_replied_to_topic: "<a href='{{userUrl}}'>Vous</a> avez participé à <a href='{{topicUrl}}'>la discussion</a>", user_mentioned_user: "<a href='{{user1Url}}'>{{user}}</a> à mentionné <a href='{{user2Url}}'>{{another_user}}</a>", user_mentioned_you: "<a href='{{user2Url}}'>Vous</a> avez été mentionné par <a href='{{user1Url}}'>{{user}}</a>", you_mentioned_user: "<a href='{{user1Url}}'>Vous</a> avez mentionné <a href='{{user2Url}}'>{{user}}</a>", posted_by_user: "Rédigé par <a href='{{userUrl}}'>{{user}}</a>", posted_by_you: "Rédigé par <a href='{{userUrl}}'>vous</a>", sent_by_user: "Envoyé par <a href='{{userUrl}}'>{{user}}</a>", sent_by_you: "Envoyé par <a href='{{userUrl}}'>vous</a>"}, user_action_groups: {1: "J'aime donnés", 2: "J'aime reçus", 3: "Signets", 4: "Discussions", 5: "Réponses données", 6: "Réponses reçues", 7: "Mentions", 9: "Citations", 10: "Favoris", 11: "Editions", 12: "Eléments envoyés", 13: "Eléments reçus"}, user: {profile: "profil", title: "Utilisateur", mute: "couper", edit: "Éditer les préférences", download_archive: "télécharger l'archive de mes messages", dynamic_favicon: "Afficher les notifications de messages entrants sur le favicon", private_message: "Message privé", private_messages: "Messages", activity_stream: "Activité", preferences: "Préférences", bio: "À propos de moi", invited_by: "Invité par", trust_level: "Niveau de confiance", external_links_in_new_tab: "Ouvrir tous les liens externes dans un nouvel onglet", enable_quoting: "Activer la citation automatique du texte surligné", moderator: "{{user}} est un modérateur", admin: "{{user}} est un administrateur", change_password: {action: "modifier", success: "(email envoyé)", in_progress: "(email en cours d'envoi)", error: "(erreur)"}, change_username: {action: "changer", title: "Changer le pseudo", confirm: "Changer de pseudo peut avoir des conséquences. Êtes-vous absolument sûr de le vouloir ?", taken: "Désolé, ce pseudo est déjà pris", error: "Il y a eu une erreur en changeant votre pseudo.", invalid: "Ce pseudo est invalide. Il ne doit être composé que de lettres et de chiffres."}, change_email: {action: "changer", title: "Changer d'email", taken: "Désolé, cette adresse email est indisponible.", error: "Il y a eu une erreur lors du changement d'email. Cette adresse est peut-être déjà utilisée ?", success: "Nous vous avons envoyé un mail à cette adresse. Merci de suivre les instructions."}, email: {title: "Email", instructions: "Votre adresse email ne sera jamais comuniquée.", ok: "Ça à l'air bien ! On vous envoie un mail pour confirmer.", invalid: "Merci d'entrer une adresse email valide", authenticated: "Votre adresse email a été authentifiée par {{provider}}.", frequency: "Nous vous envoyons des mails contenant uniquement des informations que vous n'avez pas déjà vues lors d'une précédente connexion."}, name: {title: "Nom", instructions: "Votre nom complet (pas nécessairement unique).", too_short: "Votre nom est trop court.", ok: "Votre nom à l'air sympa !."}, username: {title: "Pseudo", instructions: "Doit être unique et ne pas contenir d'espace. Les gens pourrons vous mentionner avec @pseudo.", short_instructions: "Les gens peuvent vous mentionner avec @{{username}}.", available: "Votre pseudo est disponible.", global_match: "L'adresse email correspond au pseudo enregistré.", global_mismatch: "Déjà enregistré. Essayez {{suggestion}} ?", not_available: "Pas disponible. Essayez {{suggestion}} ?", too_short: "Votre pseudo est trop court.", too_long: "Votre pseudo est trop long.", checking: "Vérification de la disponibilité de votre pseudo...", enter_email: "Pseudo trouvé. Entrez l'adresse email correspondante."}, password_confirmation: {title: "Confirmation"}, last_posted: "Dernier message", last_emailed: "Dernier mail", last_seen: "Dernier vu", created: "Créé à", log_out: "Déconnexion", website: "site internet", email_settings: "Email", email_digests: {title: "Quand je ne visite pas ce site, m'envoyer un résumé par mail des nouveautés", daily: "quotidiennes", weekly: "hebdomadaires", bi_weekly: "bi-mensuelles"}, email_direct: "Recevoir un mail quand quelqu'un vous cite, répond à votre message ou mentionne votre @pseudo", email_private_messages: "Recevoir un mail quand quelqu'un vous envoie un message privé", other_settings: "Autre", new_topic_duration: {label: "Considérer une discussion comme nouvelle quand", not_viewed: "Je ne les ai pas encore vues", last_here: "elles ont été publiées depuis ma dernière visite", after_n_days: {one: "elles ont été publiées hier", other: "elles ont été publiées lors des {{count}} derniers jours"}, after_n_weeks: {one: "elles ont été publiées la semaine dernière", other: "elles ont été publiées lors des {{count}} dernières semaines"}}, auto_track_topics: "Suivre automatiquement les discussions que j'ai postées", auto_track_options: {never: "jamais", always: "toujours", after_n_seconds: {one: "dans une seconde", other: "dans {{count}} secondes"}, after_n_minutes: {one: "dans une minute", other: "dans {{count}} minutes"}}, invited: {title: "Invités", user: "Utilisateurs invités", none: "{{username}} n'a invité personne sur le site.", redeemed: "Invités", redeemed_at: "Invités", pending: "Invités en attente", topics_entered: "discussions postées", posts_read_count: "Messages lus", rescind: "Supprimer l'invitation", rescinded: "Invité supprimé", time_read: "Temps de lecture", days_visited: "nombre de jours de visite", account_age_days: "Âge du compte en jours"}, password: {title: "Mot de passe", too_short: "Votre mot de passe est trop court", ok: "Votre mot de passe est correct"}, ip_address: {title: "Dernières adresses IP"}, avatar: {title: "Avatar", instructions: "Nous utilisons <a href='https://gravatar.com' target='_blank'>Gravatar</a> pour associer votre avatar avec votre adresse email."}, filters: {all: "Tout"}, stream: {posted_by: "Rédigé par", sent_by: "Envoyé par", private_message: "message privé", the_topic: "La discussion"}}, loading: "Chargement...", close: "Fermeture", learn_more: "en savoir plus...", year: "an", year_desc: "discussions postées dans les 365 derniers jours", month: "mois", month_desc: "discussions postées dans les 30 derniers jours", week: "semaine", week_desc: "discussions postées dans les 7 derniers jours", first_post: "premier message", mute: "Désactiver", unmute: "activer", best_of: {title: "les plus populaires", description: "Il y a <b>{{count}}</b> messages dans cette discussion. C'est beaucoup ! Voulez-vous gagner du temps en basculant sur la liste des messages possédant le plus d'interactions et de réponses ?", enabled_description: "vous êtes actuellement en train de consulter seulement les messages les plus populaires de cette discussion.", enable: "ne voir que les plus populaires", disable: "Ré-afficher tous les messages"}, private_message_info: {title: "discussion privée", invite: "Inviter d'autres utilisateurs..."}, email: "Email", username: "Pseudo", last_seen: "Dernière vue", created: "Créé", trust_level: "Niveau de confiance", create_account: {title: "Créer un compte", action: "Créer !", invite: "Vous n'avez pas encore de compte ?", failed: "Quelque chose s'est mal passé, peut-être que cette adresse email est déjà enregistrée, essayez le lien Mot de passe oublié."}, forgot_password: {title: "Mot de passe oublié ?", action: "J'ai oublié mon mot de passe", invite: "Entrez votre pseudo ou votre adresse email, et vous recevrez un nouveau mot de passe par mail", reset: "Réinitialiser votre mot de passe", complete: "Vous allez recevoir un mail contenant les instructions pour réinitialiser votre mot de passe."}, login: {title: "Connexion", username: "Pseudo", password: "Mot de passe", email_placeholder: "adresse email ou pseudo", error: "Erreur inconnue", reset_password: "Réinitialiser le mot de passe", logging_in: "Connexion en cours...", or: "ou", authenticating: "Authentification...", awaiting_confirmation: "Votre compte est en attente d'activation, utilisez le lien mot de passe oublié pour demander un nouveau mail d'activation.", awaiting_approval: "Votre compte n'a pas encore été approuvé par un modérateur. Vous recevrez une confirmation par mail lors de l'activation.", not_activated: "Vous ne pouvez pas vous encore vous connecter. Nous vous avons envoyé un email d'activation à <b>{{sentTo}}</b>. Merci de suivre les instructions afin d'activer votre compte.", resend_activation_email: "Cliquez ici pour réenvoyer l'email d'activation.", sent_activation_email_again: "Nous venous de vous envoyer un nouvel email d'activation à <b>{{currentEmail}}</b>. Il peut prendre quelques minutes à arriver; n'oubliez pas de vérifier votre répertoire spam.", google: {title: "via Google", message: "Authentification via Google (assurez-vous que les popups ne soient pas bloquées)"}, twitter: {title: "via Twitter", message: "Authentification via Twitter (assurez-vous que les popups ne soient pas bloquées)"}, facebook: {title: "via Facebook", message: "Authentification via Facebook (assurez-vous que les popups ne soient pas bloquées)"}, cas: {title: "via CAS", message: "Authentification via CAS (assurez-vous que les popups ne soient pas bloquées)"}, yahoo: {title: "via Yahoo", message: "Authentification via Yahoo (assurez-vous que les popups ne soient pas bloquées)"}, github: {title: "via GitHub", message: "Authentification via GitHub (assurez-vous que les popups ne soient pas bloquées)"}, persona: {title: "via Persona", message: "Authentification via Mozilla Persona (assurez-vous que les popups ne soient pas bloquées)"}}, composer: {posting_not_on_topic: 'Vous répondez à la discussion "{{title}}", mais vous êtes actuellement en train de consulter une autre discussion.', saving_draft_tip: "sauvegarde...", saved_draft_tip: "sauvegardé", saved_local_draft_tip: "sauvegardé en local", similar_topics: "Votre message est trop similaire à...", drafts_offline: "sauvegardé hors ligne", min_length: {need_more_for_title: "{{n}} caractères restant pour le titre", need_more_for_reply: "{{n}} caractères restant pour le message"}, error: {title_missing: "Le titre est obligatoire.", title_too_short: "Le titre doit avoir au moins {{min}} caractères.", title_too_long: "Le titre ne doit pas dépasser les {{max}} caractères.", post_missing: "Le message ne peut être vide.", post_length: "Le mesasge doit avoir au moins {{min}} caractères.", category_missing: "Vous devez choisir une catégorie."}, save_edit: "Sauvegarder la modification", reply_original: "Répondre à la discussion initiale", reply_here: "Répondre ici", reply: "Répondre", cancel: "annuler", create_topic: "Créer une discussion", create_pm: "Créer un message privé.", quote_post_title: "Citer le message en entier", bold_title: "Gras", bold_text: "texte en gras", italic_title: "Italique", italic_text: "texte en italique", link_title: "Lien", link_description: "renseignez ici la description du lien", link_dialog_title: "Insérez le lien", link_optional_text: "titre optionnel", quote_title: "Citation", quote_text: "Citation", code_title: "Bout de code", code_text: "renseignez ici votre code", image_title: "Image", image_description: "renseignez ici la description de l'image", image_dialog_title: "Insérez l'image", image_optional_text: "titre optionnel", image_hosting_hint: "Besoin <a href='https://www.google.fr/search?q=hébergement+d'image+gratuit' target='_blank'>d'un hébergeur d'image gratuit ?</a>", olist_title: "Liste numérotée", ulist_title: "Liste à puces", list_item: "Elément", heading_title: "Titre", heading_text: "Titre", hr_title: "Barre horizontale", undo_title: "Annuler", redo_title: "Refaire", help: "Aide Markdown", toggler: "Afficher ou cacher le composer", admin_options_title: "Paramètres optionels pour cette discussion", auto_close_label: "Fermer automatiquement cette discussion après :", auto_close_units: "jours", users_placeholder: "Ajouter un utilisateur", title_placeholder: "Choisissez un titre ici. Sur quoi porte cette discussion en quelques mots ?", reply_placeholder: "Saisissez votre réponse ici. Utilisez le Markdown ou le BBCode pour le formatage. Vous pouvez déposer ou coller une image ici.", view_new_post: "Voir votre nouveau message.", saving: "Sauvegarde...", saved: "Sauvegardé !", saved_draft: "Vous avez un brouillon en attente. Cliquez n'importe où pour en reprendre l'édition", uploading: "Envoi en cours...", show_preview: "afficher la prévisualisation &raquo;", hide_preview: "&laquo; cacher la prévisualisation"}, notifications: {title: "Notification des mentions de votre @pseudo, réponses à vos discussions ou messages, etc.", none: "Vous n'avez aucune notification pour le moment", more: "voir les anciennes notifications", mentioned: "<span title='mentionné' class='icon'>@</span> {{username}} {{link}}", quoted: "<i title='cité' class='icon icon-quote-right'></i> {{username}} {{link}}", replied: "<i title='avec réponse' class='icon icon-reply'></i> {{username}} {{link}}", posted: "<i title='avec réponse' class='icon icon-reply'></i> {{username}} {{link}}", edited: "<i title='édité' class='icon icon-pencil'></i> {{username}} {{link}}", liked: "<i title='apprécié' class='icon icon-heart'></i> {{username}} {{link}}", private_message: "<i class='icon icon-envelope-altk' title='messag²e privé'></i> {{username}} vous a envoyé un message: {{link}}", invited_to_private_message: "{{username}} vous a invité à une discussion privée: {{link}}", invitee_accepted: "<i title='a accepté votre invitation' class='icon icon-signin'></i> {{username}} a accepté votre invitation", moved_post: "<i title='moved post' class='icon icon-arrow-right'></i> {{username}} a déplacé le message vers {{link}}", total_flagged: "Nombre total de messages signalés"}, image_selector: {title: "Insérer une image", from_my_computer: "Local", from_the_web: "Depuis internet", add_image: "Ajouter une image", remote_title: "Image distante", remote_tip: "saisissez l'url de l'image", local_title: "Image locale", local_tip: "Cliquez pour sélectionner une image depuis votre ordinateur.", upload: "Envoyer", uploading_image: "Image en cours d'envoi"}, search: {title: "Rechercher les discussions, messages, utilisateurs ou catégories", placeholder: "saisir votre requête ici", no_results: "Aucun résultat.", searching: "Recherche en cours ...", prefer: {user: "La recherche priorisera les résultats de @{{username}}", category: "La recherche priorisera les résultats de la catégorie : {{category}}"}}, site_map: "voir une autre liste des discussions ou une catégorie", go_back: "retour", current_user: "voir la page de l'utilisateur", favorite: {title: "Favoris", help: {star: "ajouter cette discussion à vos favoris", unstar: "enlever cette discussion de vos favoris"}}, topics: {none: {favorited: "Vous n'avez aucune discussion favorite pour le moment. Pour ajouter une discussion aux favoris, cliquez sur l'étoile suivant le titre", unread: "Vous avez des discussions non lues.", "new": "Vous n'avez aucune discussion non lue.", read: "Vous n'avez lu aucune discussion pour le moment.", posted: "Vous n'avez écrit aucun message pour le moment.", latest: "Il n'y a aucune discussion pour le moment. C'est triste...", hot: "Il n'y a aucune discussion populaire pour le moment.", category: "Il n'y a aucune discussion sur {{category}}."}, bottom: {latest: "Il n'y a plus de discussion à lire.", hot: "Il n'y a plus de discussion populaire à lire.", posted: "Il n'y a plus de discussion à lire.", read: "Il n'y a plus de discussion à lire.", "new": "Il n'y a plus de discussion à lire.", unread: "Il n'y a plus de discussion à lire.", favorited: "Il n'y a plus de discussion favorites à lire.", category: "Il n'y a plus de discussion sur {{category}} à lire."}}, rank_details: {toggle: "afficher/cacher le détail du classement des discussions", show: "afficher le détail du classement des discussions", title: "Détail du classement des discussions"}, topic: {create_in: "Créer une discussion dans la catégorie {{categoryName}}", create: "Créer une discussion", create_long: "Créer une nouvelle discussion", private_message: "Commencer une discussion privée", list: "Liste des discussions", "new": "nouvelle discussion", title: "discussions", loading_more: "Afficher plus de discussions...", loading: "Chargement des discussions en cours...", invalid_access: {title: "discussion privée", description: "Désolé, vous n'avez pas accès à cette discussion !"}, server_error: {title: "discussion impossible à charger", description: "Désolé, nous n'avons pu charger cette discussion, probablement du à un problème de connexion. Merci de réessayer à nouveau. Si le problème persiste, merci de nous le faire savoir."}, not_found: {title: "discussion non trouvée", description: "Désolé, nous n'avons pas trouvé cette discussion. Peut-être a t-elle été détruite ?"}, unread_posts: "vous avez {{unread}} messages non lus dans cette discussion", new_posts: "il y a {{new_posts}} nouveaux messages dans cette discussion depuis la dernière fois", likes: {one: "1 personne à aimé cette discussion", other: "{{count}} personnes ont aimés cette discussion"}, back_to_list: "Retour à la liste des discussions", options: "options de la discussion", show_links: "afficher les liens de cette discussion", toggle_information: "afficher les détails de la discussion", read_more_in_category: "Vous voulez en lire plus ? Afficher d'autres discussions dans {{catLink}} ou {{latestLink}}.", read_more: "Vous voulez en lire plus? {{catLink}} or {{latestLink}}.", browse_all_categories: "Voir toutes les catégories", view_latest_topics: "voir la liste des discussions populaires", suggest_create_topic: "Pourquoi ne pas créer une nouvelle discussion ?", read_position_reset: "Votre position de lecture à été remise à zéro.", jump_reply_up: "aller à des réponses précédentes", jump_reply_down: "allez à des réponses ultérieures", deleted: "cette discussion à été supprimée", auto_close_notice: "Cette discussion sera automatiquement fermée %{timeLeft}.", auto_close_title: "Paramètres de fermeture automatique", auto_close_save: "Sauvegarder", auto_close_cancel: "Annuler", auto_close_remove: "Ne pas fermer automatiquement cette discussion", progress: {title: "progession dans la discussion", jump_top: "aller au premier message", jump_bottom: "aller au dernier message", total: "total messages", current: "message courant"}, notifications: {title: "", reasons: {"3_2": "Vous recevrez des notifications car vous suivez attentivement cette discussion.", "3_1": "Vous recevrez des notifications car vous avez créé cette discussion.", 3: "Vous recevrez des notifications car vous suivez cette discussion.", "2_4": "Vous recevrez des notifications car vous avez posté une réponse dans cette discussion.", "2_2": "Vous recevrez des notifications car vous suivez cette discussion.", 2: 'Vous recevrez des notifications car vous <a href="/users/{{username}}/preferences">lu cette discussion</a>.', 1: "Vous serez notifié seulement si un utilisateur mentionne votre @pseudo ou réponds à vos messages.", "1_2": "Vous serez notifié seulement si un utilisateur mentionne votre @pseudo ou réponds à vos messages.", 0: "Vous ignorez toutes les notifications de cette discussion.", "0_2": "Vous ignorez toutes les notifications de cette discussion."}, watching: {title: "Suivre attentivement", description: "pareil que le suivi simple, plus une notification systématique pour chaque nouveau message."}, tracking: {title: "Suivi simple", description: "vous serez notifié des messages non lus, des mentions de votre @pseudo et des réponses à vos messages."}, regular: {title: "Normal", description: "vous recevrez des notifications seuelement si un utilisateur mentionne votre @pseudo ou répond à un de vos messages"}, muted: {title: "Silencieux", description: "vous ne recevrez aucune notification de cette discussion et elle n'apparaitra pas dans l'onglet des discussions non lues"}}, actions: {"delete": "Supprimer la discussion", open: "Ouvrir la discussion", close: "Fermer la discussion", auto_close: "Fermeture automatique", unpin: "Dé-épingler la discussion", pin: "Épingler la discussion", unarchive: "Dé-archiver la discussion", archive: "Archiver la discussion", invisible: "Rendre invisible", visible: "Rendre visible", reset_read: "Réinitialiser les lectures", multi_select: "Basculer sur la multi-sélection", convert_to_topic: "Convertir en discussion normale"}, reply: {title: "Répondre", help: "commencez à répondre à cette discussion"}, clear_pin: {title: "Désépingler", help: "Désépingler cette discussion afin qu'elle n'apparaisse plus en tête des discussions"}, share: {title: "Partager", help: "partager un lien vers cette discussion"}, inviting: "Inviter...", invite_private: {title: "Inviter dans la discussion privée", email_or_username: "Adresse email ou @pseudo de l'invité", email_or_username_placeholder: "Adresse email ou @pseudo", action: "Inviter", success: "Merci ! Vous avez invité cet utilisateur à participer à la discussion privée.", error: "Désolé, il y a eu une erreur lors de l'invitation de cet utilisateur"}, invite_reply: {title: "Inviter des amis à répondre", action: "Envoyer l'invitation", help: "envoyer des invitations à des amis pour qu'ils puissent participer à cette discussion en un simple clic", email: "Nous allons envoyer un mail à votre ami pour lui permettre de participer à cette conversation.", email_placeholder: "adresse email", success: "Merci ! Nous avons envoyé un mail à <b>{{email}}</b>. Suivez vos invitations dans l'onglet prévu à cet effet sur votre page utilisateur.", error: "Désolé nous ne pouvons pas inviter cette personne."}, login_reply: "Connectez-vous pour répondre", filters: {user: "Vous voyez seulement {{n_posts}} {{by_n_users}}.", n_posts: {one: "1 message", other: "{{count}} messages"}, by_n_users: {one: "de l'utilisateur", other: "rédigés par {{count}} utilisateurs"}, best_of: "Vous voyez seulement {{n_best_posts}} {{of_n_posts}} de cette discussion.", n_best_posts: {one: "le message", other: "les {{count}} messages"}, of_n_posts: {one: "le plus populaire", other: "les plus populaires"}, cancel: "Ré-afficher l'ensemble des messages de cette discussion."}, split_topic: {title: "Scinder la discussion", action: "scinder la discussion", topic_name: "Nom de la nouvelle discussion :", error: "Il y a eu une erreur lors du scindage de la discussion.", instructions: {one: "Vous êtes sur le point de créer une nouvelle discussion avec le message que vous avez sélectionné.", other: "Vous êtes sur le point de créer une nouvelle discussion avec les <b>{{count}}</b> messages que vous avez sélectionné."}}, merge_topic: {title: "Fusionner la discussion", action: "fusionner la discussion", error: "Il y a eu une erreur lors de la fusion.", instructions: {one: "Merci de sélectionner la discussion dans laquelle vous souhaitez déplacer le message que vous avez sélectionné.", other: "Merci de sélectionner la discussion dans laquelle vous souhaitez déplacer les <b>{{count}}</b> messages que vous avez sélectionné."}}, multi_select: {select: "sélectioner", selected: "({{count}}) sélectionés", "delete": "supprimer la sélection", cancel: "annuler la sélection", description: {one: "vous avez sélectionné <b>1</b> message.", other: "Vous avez sélectionné <b>{{count}}</b> messages."}}}, post: {reply: "Répondre à {{link}} par {{replyAvatar}} {{username}}", reply_topic: "Répondre à {{link}}", quote_reply: "Citer", edit: "Éditer {{link}} par {{replyAvatar}} {{username}}", post_number: "message {{number}}", in_reply_to: "Réponse courte", reply_as_new_topic: "Répondre dans une nouvelle conversation", continue_discussion: "Continuer la discussion suivante {{postLink}}:", follow_quote: "Voir le message cité", deleted_by_author: "(message supprimé par son auteur)", expand_collapse: "étendre/réduire", has_replies: {one: "Réponse", other: "Réponses"}, errors: {create: "Désolé, il y a eu une erreur lors de la publication de votre message. Merci de réessayer.", edit: "Désolé, il y a eu une erreur lors de l'édition de votre message. Merci de réessayer.", upload: "Désolé, il y a eu une erreur lors de l'envoi du fichier. Merci de réessayer.", upload_too_large: "Désolé, le fichier que vous êtes en train d'envoyer est trop grand (maximum {{max_size_kb}}Kb). Merci de le redimensionner et de réessayer.", too_many_uploads: "Désolé, vous ne pouvez envoyer qu'un seul fichier à la fois.", upload_not_authorized: "Désole, le fichier que vous êtes en train d'uploader n'est pas autorisé (extensions autorisées : {{authorized_extensions}}).", upload_not_allowed_for_new_user: "Désolé, les nouveaux utilisateurs ne peuvent pas uploader d'images."}, abandon: "Voulez-vous vraiment abandonner ce message ?", archetypes: {save: "Sauvegarder les options"}, controls: {reply: "Rédiger une réponse à ce message", like: "J'aime ce message", edit: "Éditer ce message", flag: "Signaler ce message à la modération", "delete": "Supprimer ce message", undelete: "Annuler la suppression de ce message", share: "Partager un lien vers ce message", more: "Plus"}, actions: {flag: "Signaler", clear_flags: {one: "Annuler le signalement", other: "Annuler les signalements"}, it_too: {off_topic: "Le signaler également", spam: "Le signaler également", inappropriate: "Le signaler également", custom_flag: "Le signaler également", bookmark: "L'ajouter également en favoris", like: "L'aimer également", vote: "Votez pour lui également"}, undo: {off_topic: "Annuler le signalement", spam: "Annuler le signalement", inappropriate: "Annuler le signalement", bookmark: "L'enlever des favoris", like: "Annuler j'aime", vote: "Retirer votre vote"}, people: {off_topic: "{{icons}} l'ont signalé comme étant hors-sujet", spam: "{{icons}} l'ont signalé comme étant du spam", inappropriate: "{{icons}} l'ont signalé comme inaproprié", notify_moderators: "{{icons}} l'ont signalé pour modération", notify_moderators_with_url: "{{icons}} <a href='{{postUrl}}'>l'ont signalé pour modération</a>", notify_user: "{{icons}} ont démarré une conversation privée", notify_user_with_url: "{{icons}} ont démarré une <a href='{{postUrl}}'>conversation privée</a>", bookmark: "{{icons}} l'ont ajouté à leurs favoris", like: "{{icons}} l'ont aimé", vote: "{{icons}} ont voté pour"}, by_you: {off_topic: "Vous l'avez signalé comme étant hors-sujet", spam: "Vous l'avez signalé comme étant du spam", inappropriate: "Vous l'avez signalé comme inaproprié", notify_moderators: "Vous l'avez signalé pour modération", notify_user: "Vous avez démarré une conversation privée avec cet utilisateur", bookmark: "Vous l'avez ajouté à vos favoris", like: "Vous l'avez aimé", vote: "Vous avez voté pour"}, by_you_and_others: {off_topic: {one: "Vous et 1 autre personne l'avez signalé comme étant hors-sujet", other: "Vous et {{count}} autres personnes l'avez signalé comme étant hors-sujet"}, spam: {one: "Vous et 1 autre personne l'avez signalé comme étant du spam", other: "Vous et {{count}} autres personnes l'avez signalé comme étant du spam"}, inappropriate: {one: "Vous et 1 autre personne l'avez signalé comme inaproprié", other: "Vous et {{count}} autres personnes l'avez signalé comme inaproprié"}, notify_moderators: {one: "Vous et 1 autre personne l'avez signalé pour modération", other: "Vous et {{count}} autres personnes l'avez signalé pour modération"}, notify_user: {one: "Vous et 1 autre personne avez démarré une conversation privée avec cet utilisateur", other: "Vous et {{count}} autres personnes avez démarré une conversation privée avec cet utilisateur"}, bookmark: {one: "Vous et 1 autre personne l'avez ajouté à vos favoris", other: "Vous et {{count}} autres personnes l'avez ajouté à vos favoris"}, like: {one: "Vous et 1 autre personne l'avez aimé", other: "Vous et {{count}} autres personnes l'avez aimé"}, vote: {one: "Vous et 1 autre personne avez voté pour", other: "Vous et {{count}} autres personnes avez voté pour"}}, by_others: {off_topic: {one: "1 personne l'a signalé comme étant hors-sujet", other: "{{count}} personnes l'ont signalé comme étant hors-sujet"}, spam: {one: "1 personne l'a signalé comme étant du spam", other: "{{count}} personnes l'ont signalé comme étant du spam"}, inappropriate: {one: "1 personne l'a signalé comme inaproprié", other: "{{count}} personnes l'ont signalé comme inaproprié"}, notify_moderators: {one: "1 personne l'a signalé pour modération", other: "{{count}} personnes l'ont signalé pour modération"}, notify_user: {one: "1 personne a démarré une conversation privée avec cet utilisateur", other: "{{count}} personnes ont démarré une conversation privée avec cet utilisateur"}, bookmark: {one: "1 personne l'a ajouté à vos favoris", other: "{{count}} personnes l'ont ajouté à vos favoris"}, like: {one: "1 personne l'a aimé", other: "{{count}} personnes l'ont aimé"}, vote: {one: "1 personne a voté pour", other: "{{count}} personnes ont voté pour"}}}, edits: {one: "une édition", other: "{{count}} éditions", zero: "pas d'édition"}, "delete": {confirm: {one: "Êtes-vous sûr de vouloir supprimer ce message ?", other: "Êtes-vous sûr de vouloir supprimer tous ces messages ?"}}}, category: {none: "(pas de catégorie)", edit: "éditer", edit_long: "Editer la catégorie", edit_uncategorized: "Editer les non catégoriser", view: "Voir les discussions dans cette catégorie", general: "Général", settings: "Paramètres", "delete": "Supprimer la catégorie", create: "Créer la catégorie", save: "Enregistrer la catégorie", creation_error: "Il y a eu une erreur lors de la création de la catégorie.", save_error: "Il y a eu une erreur lors de la sauvegarde de la catégorie.", more_posts: "voir tous les {{posts}}...", name: "Nom de la catégorie", description: "Description", topic: "Catégorie de la discussion", badge_colors: "Couleurs du badge", background_color: "Couleur du fond", foreground_color: "Couleur du texte", name_placeholder: "Devrait être concis.", color_placeholder: "N'importe quelle couleur", delete_confirm: "Voulez-vous vraiment supprimer cette catégorie ?", delete_error: "Il y a eu une erreur lors de la suppression.", list: "Liste des categories", no_description: "Il n'y a pas de description pour cette catégorie.", change_in_category_topic: "visitez les discussions de cette catégorie pour en éditer la description", hotness: "Buzz", already_used: "Cette couleur est déjà utilisée par une autre catégorie", is_secure: "Catégorie sécurisée ?", add_group: "Ajouter un groupe", security: "Sécurité", allowed_groups: "Groupes permis :", auto_close_label: "Fermer automatiquement après :"}, flagging: {title: "Pourquoi voulez-vous signaler ce message ?", action: "Signaler ce message", notify_action: "Notifier", cant: "Désolé, vous ne pouvez pas signaler ce message pour le moment", custom_placeholder_notify_user: "Pour quelles raisons contactez-vous cet utilisateur par messagerie privée ?", custom_placeholder_notify_moderators: "Pourquoi ce message requiert-il l'attention des modérateur ? Dites-nous ce qui vous dérange spécifiquement, et fournissez des liens pertinents si possible.", custom_message: {at_least: "saisissez au moins {{n}} caractères", more: "{{n}} restants...", left: "{{n}} restants"}}, topic_summary: {title: "Résumé de la discussion", links_shown: "montrer les {{totalLinks}} liens...", clicks: "clics", topic_link: "lien de la discussion"}, topic_statuses: {locked: {help: "cette discussion est close, elle n'accepte plus de nouvelles réponses"}, pinned: {help: "cette discussion est épinglée, elle s'affichera en haut de sa catégorie"}, archived: {help: "cette discussion est archivée, elle est gelée et ne peut être modifiée"}, invisible: {help: "cette discussion est invisible, elle ne sera pas affichée dans la liste des discussions et est seulement accessible via un lien direct"}}, posts: "Messages", posts_long: "{{number}} messages dans cette discussion", original_post: "Message original", views: "Vues", replies: "Réponses", views_long: "cette discussion a été vue {{number}} fois", activity: "Activité", likes: "J'aime", top_contributors: "Participants", category_title: "Catégorie", history: "Historique", changed_by: "par {{author}}", categories_list: "Liste des catégories", filters: {latest: {title: "Récentes", help: "discussions récentes"}, hot: {title: "Populaires", help: "discussions populaires"}, favorited: {title: "Favoris", help: "discussions que vous avez ajoutées à vos favoris"}, read: {title: "Lues", help: "discussions que vous avez lues"}, categories: {title: "Catégories", title_in: "Catégorie - {{categoryName}}", help: "toutes les discussions regroupées par categorie"}, unread: {title: {zero: "Non lue (0)", one: "Non lue (1)", other: "Non lues ({{count}})"}, help: "discussions suivies contenant des réponses non lues"}, "new": {title: {zero: "Nouvelle (0)", one: "Nouvelle (1)", other: "Nouvelles ({{count}})"}, help: "nouvelles discussions depuis votre dernière visite"}, posted: {title: "Mes messages", help: "discussions auxquelles vous avez participé"}, category: {title: {zero: "{{categoryName}} (0)", one: "{{categoryName}} (1)", other: "{{categoryName}} ({{count}})"}, help: "discussions populaires dans la catégorie {{categoryName}}"}}, browser_update: 'Malheureusement, <a href="http://www.discourse.org/faq/#browser">votre navigateur est trop vieux pour afficher ce forum Discourse</a>. Merci <a href="%{url}">de mettre à jour votre navigateur</a>.', type_to_filter: "Commencez à taper pour filter...", admin: {title: "Administation Discourse", moderator: "Modérateur", dashboard: {title: "Panel d'administration", version: "Version de Discourse", up_to_date: "Vous utilisez la dernière version de Discourse.", critical_available: "Une mise à jour critique est disponible.", updates_available: "Des mises à jour sont disponibles.", please_upgrade: "Veuillez mettre à jour !", installed_version: "Version installée", latest_version: "Dernière version", problems_found: "Quelques problèmes ont été trouvés dans votre installation de Discourse :", last_checked: "Dernière vérification", refresh_problems: "Rafraîchir", no_problems: "Aucun problème n'à été trouvé.", moderators: "Modérateurs :", admins: "Administateurs :", blocked: "Bloqués:", private_messages_short: "MPs", private_messages_title: "Messages Privés", reports: {today: "Aujourd'hui", yesterday: "hier", last_7_days: "les 7 derniers jours", last_30_days: "les 30 derniers jours", all_time: "depuis toujours", "7_days_ago": "il y a 7 jours", "30_days_ago": "il y a 30 jours", all: "tous", view_table: "Tableau", view_chart: "Graphique à barre"}}, commits: {latest_changes: "derniers changements: merci de mettre à jour régulièrement !", by: "par"}, flags: {title: "Signalements", old: "Vieux", active: "Actifs", clear: "Vider les signalements", clear_title: "Rejeter tous les signalements sur ce message (va réafficher les messages cachés)", "delete": "Supprimer le message", delete_title: "supprimer le message (va supprimer la discussion si c'est le premier message)", flagged_by: "Signalé par", error: "Quelque chose s'est mal passé", view_message: "Voir le message", no_results: "Il n'y a aucun signalements."}, groups: {title: "Groupes", edit: "Editer les groupes", selector_placeholder: "ajouter des utilisateurs", name_placeholder: "Nom du groupe, sans espace, mêmes règles que pour les noms d'utilisateurs", about: "Modifier votre adhésion et les noms ici", can_not_edit_automatic: "L'adhésion au groupe est défini automatiquement, les administrateurs assignent des rôles et niveaux de confiance"}, api: {title: "API", long_title: "Informations sur l'API", key: "Clé", generate: "Générer une clé pour l'API", regenerate: "Regénérer une clé pour l'API", info_html: "Cette clé vous permettra de créer et mettre à jour des discussions à l'aide d'appels JSON.", note_html: "Gardez cette clé <strong>secrète</strong> ! Tous les personnes qui la possède peuvent créer des messages sur ce forum au nom de n'import quel utilisateur."}, customize: {title: "Personnaliser", long_title: "Personnalisation du site", header: "En-tête", css: "Feuille de style", override_default: "Outrepasser les réglages par défaut ?", enabled: "Activé ?", preview: "prévisualiser", undo_preview: "annuler la prévisualisation", save: "Sauvegarder", "new": "Nouveau", new_style: "Nouveau style", "delete": "Supprimer", delete_confirm: "Supprimer cette personnalisation", about: "Vous pouvez modifier les feuillets de styles et en-têtes de votre site. Choisissez ou ajouter un style pour commencer l'édition."}, email: {settings: "Paramètres", logs: "Logs", title: "Historique des mails", sent_at: "Envoyer à", email_type: "Type d'email", to_address: "À l'adresse", test_email_address: "Adresse mail à tester", send_test: "Envoyer le mail de test", sent_test: "Envoyé !", delivery_method: "Moyen d'envoi", preview_digest: "Prévisualisation de l'email", preview_digest_desc: "Ceci est un outil pour prévisualiser le contenu de l'email généré envoyé depuis votre forum.", refresh: "Rafraîchir", format: "Format", html: "html", text: "texte", last_seen_user: "Dernière utilisateur vu: :", reply_key: "Répondre"}, impersonate: {title: "Se faire passer pour un utilisateur", username_or_email: "Pseudo ou adresse mail de l'utilisateur", help: "Utiliser cet outil pour usurper l'identité d'un utilisateur (développeur).", not_found: "Cet utilisateur n'a pas été trouvé.", invalid: "Désolé, vous ne pouvez pas vous faire passer pour cet utilisateur."}, users: {title: "Utilisateurs", create: "Ajouter un administateur", last_emailed: "Derniers contacts", not_found: "Désolé cet utilisateur n'existe pas dans notre système.", "new": "Nouveau", active: "Actif", pending: "En attente", approved: "Approuvé ?", approved_selected: {one: "Approuver l'utilisateur", other: "Approuver les {{count}} utilisateurs"}, titles: {active: "Utilisateurs actifs", "new": "Nouveaux utilisateurs", pending: "Utilisateur en attente", newuser: "Utilisateurs de niveau 0 (Nouveaux utilisateurs)", basic: "Utilisateurs de niveau 1 (Utilisateurs basiques)", regular: "Utilisateurs de niveau 2 (Utilisateurs réguliers)", leader: "Utilisateurs de niveau 3 (Utilisateurs expérimentés)", elder: "Utilisateurs de niveau 4 (Utilisateurs avancés)", admins: "Administrateurs", moderators: "Modérateurs"}}, user: {ban_failed: "Il y a eu un problème pendant le bannissement de cet utilisateur {{error}}", unban_failed: "Il y a eu un problème pendant le débannissement de cet utilisateur {{error}}", ban_duration: "Pour combien de temps voulez-vous bannir cet utilisateur ? (jours)", delete_all_posts: "Supprimer tous les messages", ban: "Bannir", unban: "Débannir", banned: "Banni ?", moderator: "Modérateur ?", admin: "Admin ?", show_admin_profile: "Admin", edit_title: "Editer le titre", save_title: "Sauvegarder le titre", refresh_browsers: "Forcer le rafraîchissement du navigateur", show_public_profile: "Montrer un profil public", impersonate: "Imiter", revoke_admin: "Révoquer les droits d'admin", grant_admin: "Accorder les droits d'admin", revoke_moderation: "Révoquer les droits de modération", grant_moderation: "Accorder les droits de modération", reputation: "Réputation", permissions: "permissions", activity: "activité", like_count: "J'aime reçus", private_topics_count: "compte des discussions privées", posts_read_count: "messages lus", post_count: "messages postés", topics_entered: "discussions avec participation", flags_given_count: "flags donnés", flags_received_count: "flags reçus", approve: "Approuver", approved_by: "approuvé par", time_read: "Temps de lecture", "delete": "Supprimer cet utilisateur", delete_forbidden: "Cet utilisateur ne peut pas être supprimé car il y a des messages. Veuillez supprimmez tous ses messages.", delete_confirm: "Êtes-vous vraiment sûr de vouloir supprimmer définitivement cet utilisateur de votre site ? Cette action est permanente !", deleted: "L'utilisateur a été supprimmé.", delete_failed: "Il y a eu une erreur lors de la suppression de l'utilisateur. Veuillez vous assurez que tous ses messages sont bien supprimmés.", send_activation_email: "Envoyer le mail d'activation", activation_email_sent: "Un email d'activation a été envoyé.", send_activation_email_failed: "Il y a eu un problème lors de l'envoie du mail d'activation.", activate: "Activer le compte", activate_failed: "Il y a eu un problème lors de l'activation du compte.", deactivate_account: "Désactive le compte", deactivate_failed: "Il y a eu un problème lors de la désactivation du compte.", unblock_failed: "Problème rencontré lors du déblocage de l'utilisateur", block_failed: "Problème rencontré lors du blocage de l'utilisateur", deactivate_explanation: "Un compte désactivé doit être revalidé par email", banned_explanation: "Un utilisateur banni ne peut se connecter", block_explanation: "Un utilisateur bloqué ne peut poster ou créer de discussions.", blocked: "Bloqué ?", block: "Bloqué"}, site_content: {none: "Choisissez un type de contenu afin de commencer l'édition.", title: "Contenu du site", edit: "Modifier le contenu du site"}, site_settings: {show_overriden: "Ne montrer que ce qui a été changé", title: "Paramètres du site", reset: "rétablir par défaut", none: "rien"}}}}}, I18n.locale = "fr", function (e) {
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
        return t.abbr = e, j[e] || (j[e] = new s), j[e].set(t), j[e]
    }

    function f(e) {
        return e ? (!j[e] && O && require("./lang/" + e), j[e]) : P.fn._lang
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
                return Y;
            case"YYYY":
                return q;
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

    function E(t) {
        var n = t._i, s = U.exec(n);
        n === e ? t._d = new Date : s ? t._d = new Date(+s[1]) : "string" == typeof n ? D(t) : c(n) ? (t._a = n.slice(0), x(t)) : t._d = n instanceof Date ? new Date(+n) : new Date(n)
    }

    function k(e, t, n, s, r) {
        return r.relativeTime(t || 1, !!n, e, s)
    }

    function C(e, t, n) {
        var s = z(Math.abs(e) / 1e3), r = z(s / 60), a = z(r / 60), i = z(a / 24), o = z(i / 365), u = 45 > s && ["s", s] || 1 === r && ["m"] || 45 > r && ["mm", r] || 1 === a && ["h"] || 22 > a && ["hh", a] || 1 === i && ["d"] || 25 >= i && ["dd", i] || 45 >= i && ["M"] || 345 > i && ["MM", z(i / 30)] || 1 === o && ["y"] || ["yy", o];
        return u[2] = t, u[3] = e > 0, u[4] = n, k.apply({}, u)
    }

    function S(e, t, n) {
        var s, r = n - t, a = n - e.day();
        return a > r && (a -= 7), r - 7 > a && (a += 7), s = P(e).add("d", a), {week: Math.ceil(s.dayOfYear() / 7), year: s.year()}
    }

    function I(e) {
        var t = e._i, n = e._f;
        return null === t || "" === t ? null : ("string" == typeof t && (e._i = t = f().preparse(t)), P.isMoment(t) ? (e = i({}, t), e._d = new Date(+t._d)) : n ? c(n) ? T(e) : w(e) : E(e), new r(e))
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

    for (var P, L, R = "2.0.0", z = Math.round, j = {}, O = "undefined" != typeof module && module.exports, U = /^\/?Date\((\-?\d+)/i, F = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, H = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, B = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, V = /\d\d?/, G = /\d{1,3}/, Y = /\d{3}/, q = /\d{1,4}/, W = /[+\-]?\d{1,6}/, $ = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, K = /Z|[\+\-]\d\d:?\d\d/i, Q = /T/i, Z = /[\+\-]?\d+(\.\d{1,3})?/, X = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, J = "YYYY-MM-DDTHH:mm:ssZ", et = [
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
    }, P.version = R, P.defaultFormat = J, P.updateOffset = function () {
    }, P.lang = function (e, t) {
        return e ? (t ? d(e, t) : j[e] || f(e), P.duration.fn._lang = P.fn._lang = f(e), void 0) : P.fn._lang._abbr
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
        var t = z((P(this).startOf("day") - P(this).startOf("year")) / 864e5) + 1;
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