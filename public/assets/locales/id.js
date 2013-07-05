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
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, MessageFormat = {locale: {}}, MessageFormat.locale.id = function () {
    return"other"
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
}({}), I18n.translations = {id: {js: {share: {topic: "Bagikan tautan ke topik ini", post: "Bagikan tautan ke muatan ini"}, edit: "sunting judul dan kategori dari topik ini", not_implemented: "Maaf, fitur itu belum diimplementasikan!", no_value: "Tidak", yes_value: "Ya", of_value: "dari", generic_error: "Maaf, kesalahan telah terjadi.", log_in: "Log In", age: "Umur", last_post: "Last post", admin_title: "Admin", flags_title: "Flags", show_more: "tampilkan lebih banyak", links: "Tautan-tautan", faq: "FAQ", you: "Anda", ok: "ok", or: "atau", suggested_topics: {title: "Sarankan topik"}, bookmarks: {not_logged_in: "Sorry you must be logged in to bookmark posts.", created: "You've bookmarked this post.", not_bookmarked: "You've read this post; click to bookmark it.", last_read: "Ini adalah tautan terakhir yang anda telah baca."}, new_topics_inserted: "{{count}} topik baru.", show_new_topics: "Klik untuk melihat.", preview: "pratilik", cancel: "batalkan", save: "Simpan ubahan", saving: "Menyimpan...", saved: "Tersimpan!", user_action_descriptions: {6: "Jawaban-jawaban"}, user: {profile: "Profil", title: "Pengguna", mute: "Diamkan", edit: "Edit Preferensi", download_archive: "unduh arsip muatan saya", private_message: "Pesan Pribadi", private_messages: "Pesan-pesan Pribadi", activity_stream: "Aktifitas", preferences: "Preferensi", bio: "Tentang saya", change_password: "ganti", invited_by: "Diundang Oleh", trust_level: "Level Kepercayaan", change_username: {action: "ganti", title: "Ganti Nama Pengguna", confirm: "Penggantian nama pengguna ada konsekuensinya. Apakah anda yakin ingin mengganti nama pengguna anda?", taken: "Maaf, nama pengguna itu telah diambil.", error: "Ada kesalahan mengganti nama pengguna anda.", invalid: "Nama pengguna itu tidak sah. Nama pengguna itu harus terdiri dari angka dan huruf"}, change_email: {action: "ganti", title: "Ganti Email", taken: "Maaf, email tersebut tidak tersedia.", error: "Ada kesalahan mengganti email anda. Mungkin alamat email tersebut sedang dipakai?", success: "Kami telah mengirim email ke alamat tersebut. Silahkan ikuti petunjuk konfirmasi."}, email: {title: "Email", instructions: "Email anda tidak akan pernah diperlihatkan kepada publik.", ok: "Kelihatannya OK. Kami akan mengirim email kepada anda untuk konfirmasi.", invalid: "Silahkan masukkan alamat email yang sah.", authenticated: "Email anda telah diotentikasi oleh {{provider}}.", frequency: "Kami hanya akan meng-email anda jika kami tidak melihat anda akhir-akhir ini dan anda belum melihat apa yang kami email."}, name: {title: "Nama", instructions: "Nama lengkap anda; tidak harus unik. Digunakan sebagai cara alternatif untuk mencocokkan @nama dan hanya akan ditampilkan di halaman pengguna anda.", too_short: "Nama anda terlalu pendek.", ok: "Nama anda kelihatannya ok."}, username: {title: "Nama Pengguna", instructions: "Orang-orang dapat menyebut anda sebagai @{{username}}.", available: "Nama pengguna anda tersedia.", global_match: "Email cocok dengan nama pengguna yang terregistrasi.", global_mismatch: "Telah diregistrasi. Coba {{suggestion}}?", not_available: "Tidak tersedia. Coba {{suggestion}}?", too_short: "Nama pengguna anda terlalu pendek.", too_long: "Nama pengguna anda terlalu panjang.", checking: "Memeriksa apakah nama pengguna anda tersedia...", enter_email: "Nama pengguna ditemukan. Masukkan email yang cocok."}, last_posted: "Muatan Terakhir", last_emailed: "Terakhir kali diemail", last_seen: "Terakhir kali dilihat", created: "Dibuat", log_out: "Log Out", website: "Situs Web", email_settings: "Email", email_digests: {title: "Kalau saya tidak mengunjungi situs ini, kirimi saya arsip email tentang apa saja yang baru", daily: "harian", weekly: "mingguan", bi_weekly: "dua minggu sekali"}, email_direct: "Receive an email when someone quotes you, replies to your post, or mentions your @username", email_private_messages: "Receive an email when someone sends you a private message", other_settings: "Lain-lain", new_topic_duration: {label: "Consider topics new when", not_viewed: "I haven't viewed them yet", last_here: "they were posted since I was here last", after_n_days: {one: "they were posted in the last day", other: "they were posted in the last {{count}} days"}, after_n_weeks: {one: "they were posted in the last week", other: "they were posted in the last {{count}} week"}}, auto_track_topics: "Automatically track topics I enter", auto_track_options: {never: "never", always: "always", after_n_seconds: {one: "after 1 second", other: "after {{count}} seconds"}, after_n_minutes: {one: "after 1 minute", other: "after {{count}} minutes"}}, invited: {title: "Invites", user: "Invited User", none: "{{username}} hasn't invited any users to the site.", redeemed: "Redeemed Invites", redeemed_at: "Redeemed At", pending: "Pending Invites", topics_entered: "Topics Entered", posts_read_count: "Posts Read", rescind: "Remove Invitation", rescinded: "Invite removed", time_read: "Read Time", days_visited: "Days Visited", account_age_days: "Account age in days"}, password: {title: "Password", too_short: "Your password is too short.", ok: "Your password looks good."}, ip_address: {title: "Last IP Address"}, avatar: {title: "Avatar", instructions: "We use <a href='https://gravatar.com' target='_blank'>Gravatar</a> for avatars based on your email"}, filters: {all: "All"}, stream: {posted_by: "Posted by", sent_by: "Sent by", private_message: "private message", the_topic: "the topic"}}, loading: "Loading...", close: "Close", learn_more: "learn more...", year: "year", year_desc: "topics posted in the last 365 days", month: "month", month_desc: "topics posted in the last 30 days", week: "week", week_desc: "topics posted in the last 7 days", first_post: "First post", mute: "Mute", unmute: "Unmute", best_of: {title: "Best Of", description: "There are <b>{{count}}</b> posts in this topic. That's a lot! Would you like to save time by showing only the best posts?", button: 'Switch to "Best Of" view'}, private_message_info: {title: "Private Message", invite: "Invite Others..."}, email: "Email", username: "Username", last_seen: "Last Seen", created: "Created", trust_level: "Trust Level", create_account: {title: "Create Account", action: "Create one now!", invite: "Don't have an account yet?", failed: "Something went wrong, perhaps this email is already registered, try the forgot password link"}, forgot_password: {title: "Forgot Password", action: "I forgot my password", invite: "Enter your username or email address, and we'll send you a password reset email.", reset: "Reset Password", complete: "You should receive an email with instructions on how to reset your password shortly."}, login: {title: "Log In", username: "Login", password: "Password", email_placeholder: "email address or username", error: "Unknown error", reset_password: "Reset Password", logging_in: "Logging In...", or: "Or", authenticating: "Authenticating...", awaiting_confirmation: "Your account is awaiting activation, use the forgot password link to issue another activation email.", awaiting_approval: "Your account has not been approved by a moderator yet. You will receive an email when it is approved.", not_activated: "You can't log in yet. We previously sent an activation email to you at <b>{{sentTo}}</b>. Please follow the instructions in that email to activate your account.", resend_activation_email: "Click here to send the activation email again.", sent_activation_email_again: "We sent another activation email to you at <b>{{currentEmail}}</b>. It might take a few minutes for it to arrive; be sure to check your spam folder.", google: {title: "with Google", message: "Authenticating with Google (make sure pop up blockers are not enabled)"}, twitter: {title: "with Twitter", message: "Authenticating with Twitter (make sure pop up blockers are not enabled)"}, facebook: {title: "with Facebook", message: "Authenticating with Facebook (make sure pop up blockers are not enabled)"}, yahoo: {title: "with Yahoo", message: "Authenticating with Yahoo (make sure pop up blockers are not enabled)"}, github: {title: "with GitHub", message: "Authenticating with GitHub (make sure pop up blockers are not enabled)"}, persona: {title: "with Persona", message: "Authenticating with Mozilla Persona (make sure pop up blockers are not enabled)"}}, composer: {saving_draft_tip: "saving", saved_draft_tip: "saved", saved_local_draft_tip: "saved locally", min_length: {at_least: "enter at least {{n}} characters", more: "{{n}} to go..."}, save_edit: "Save Edit", reply: "Reply", create_topic: "Create Topic", create_pm: "Create Private Message", users_placeholder: "Add a user", title_placeholder: "Type your title here. What is this discussion about in one brief sentence?", reply_placeholder: "Type your reply here. Use Markdown or BBCode to format. Drag or paste an image here to upload it.", view_new_post: "View your new post.", saving: "Saving...", saved: "Saved!", saved_draft: "You have a post draft in progress. Click anywhere in this box to resume editing.", uploading: "Uploading...", show_preview: "show preview &raquo;", hide_preview: "&laquo; hide preview"}, notifications: {title: "notifications of @name mentions, replies to your posts and topics, private messages, etc", none: "You have no notifications right now.", more: "view older notifications", mentioned: "<span title='mentioned' class='icon'>@</span> {{username}} {{link}}", quoted: "<i title='quoted' class='icon icon-quote-right'></i> {{username}} {{link}}", replied: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", posted: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", edited: "<i title='edited' class='icon icon-pencil'></i> {{username}} {{link}}", liked: "<i title='liked' class='icon icon-heart'></i> {{username}} {{link}}", private_message: "<i class='icon icon-envelope-alt' title='private message'></i> {{username}} {{link}}", invited_to_private_message: "<i class='icon icon-envelope-alt' title='private message'></i> {{username}} {{link}}", invitee_accepted: "<i title='accepted your invitation' class='icon icon-signin'></i> {{username}} accepted your invitation", moved_post: "<i title='moved post' class='icon icon-arrow-right'></i> {{username}} moved post to {{link}}"}, image_selector: {title: "Insert Image", from_my_computer: "From My Device", from_the_web: "From The Web", add_image: "Add Image", remote_tip: "enter address of an image in the form http://example.com/image.jpg", local_tip: "click to select an image from your device.", upload: "Upload", uploading_image: "Uploading image"}, search: {title: "search for topics, posts, users, or categories", placeholder: "type your search terms here", no_results: "No results found.", searching: "Searching ..."}, site_map: "go to another topic list or category", go_back: "go back", current_user: "go to your user page", favorite: {title: "Favorite", help: "add this topic to your favorites list"}, topics: {none: {favorited: "You haven't favorited any topics yet. To favorite a topic, click or tap the star next to the title.", unread: "You have no unread topics to read.", "new": "You have no new topics to read.", read: "You haven't read any topics yet.", posted: "You haven't posted in any topics yet.", latest: "There are no latest topics. That's sad.", category: "There are no {{category}} topics."}, bottom: {latest: "There are no more latest topics to read.", posted: "There are no more posted topics to read.", read: "There are no more read topics to read.", "new": "There are no more new topics to read.", unread: "There are no more unread topics to read.", favorited: "There are no more favorited topics to read.", category: "There are no more {{category}} topics."}}, topic: {create_in: "Create {{categoryName}} Topic", create: "Create Topic", create_long: "Create a new Topic", private_message: "Start a private message", list: "Topics", "new": "new topic", title: "Topic", loading_more: "Loading more Topics...", loading: "Loading topic...", invalid_access: {title: "Topic is private", description: "Sorry, you don't have access to that topic!"}, server_error: {title: "Topic failed to load", description: "Sorry, we couldn't load that topic, possibly due to a connection problem. Please try again. If the problem persists, please let us know."}, not_found: {title: "Topic not found", description: "Sorry, we couldn't find that topic. Perhaps it was removed by a moderator?"}, unread_posts: "you have {{unread}} unread old posts in this topic", new_posts: "there are {{new_posts}} new posts in this topic since you last read it", likes: {one: "there is 1 like in this topic", other: "there are {{count}} likes in this topic"}, back_to_list: "Back to Topic List", options: "Topic Options", show_links: "show links within this topic", toggle_information: "toggle topic details", read_more_in_category: "Want to read more? Browse other topics in {{catLink}} or {{latestLink}}.", read_more: "Want to read more? {{catLink}} or {{latestLink}}.", browse_all_categories: "Browse all categories", view_latest_topics: "view latest topics", suggest_create_topic: "Why not create a topic?", read_position_reset: "Your read position has been reset.", jump_reply_up: "jump to earlier reply", jump_reply_down: "jump to later reply", progress: {title: "topic progress", jump_top: "jump to first post", jump_bottom: "jump to last post", total: "total posts", current: "current post"}, notifications: {title: "", reasons: {"3_2": "You will receive notifications because you are watching this topic.", "3_1": "You will receive notifications because you created this topic.", 3: "You will receive notifications because you are watching this topic.", "2_4": "You will receive notifications because you posted a reply to this topic.", "2_2": "You will receive notifications because you are tracking this topic.", 2: 'You will receive notifications because you <a href="/users/{{username}}/preferences">read this topic</a>.', 1: "You will be notified only if someone mentions your @name or replies to your post.", "1_2": "You will be notified only if someone mentions your @name or replies to your post.", 0: "You are ignoring all notifications on this topic.", "0_2": "You are ignoring all notifications on this topic."}, watching: {title: "Watching", description: "same as Tracking, plus you will be notified of all new posts."}, tracking: {title: "Tracking", description: "you will be notified of unread posts, @name mentions, and replies to your posts."}, regular: {title: "Regular", description: "you will be notified only if someone mentions your @name or replies to your post."}, muted: {title: "Muted", description: "you will not be notified of anything about this topic, and it will not appear on your unread tab."}}, actions: {"delete": "Delete Topic", open: "Open Topic", close: "Close Topic", unpin: "Un-Pin Topic", pin: "Pin Topic", unarchive: "Unarchive Topic", archive: "Archive Topic", invisible: "Make Invisible", visible: "Make Visible", reset_read: "Reset Read Data", multi_select: "Select for Merge/Split", convert_to_topic: "Convert to Regular Topic"}, reply: {title: "Reply", help: "begin composing a reply to this topic"}, share: {title: "Share", help: "share a link to this topic"}, inviting: "Inviting...", invite_private: {title: "Invite to Private Message", email_or_username: "Invitee's Email or Username", email_or_username_placeholder: "email address or username", action: "Invite", success: "Thanks! We've invited that user to participate in this private message.", error: "Sorry there was an error inviting that user."}, invite_reply: {title: "Invite Friends to Reply", action: "Email Invite", help: "send invitations to friends so they can reply to this topic with a single click", email: "We'll send your friend a brief email allowing them to reply to this topic by clicking a link.", email_placeholder: "email address", success: "Thanks! We mailed out an invitation to <b>{{email}}</b>. We'll let you know when they redeem your invitation. Check the invitations tab on your user page to keep track of who you've invited.", error: "Sorry we couldn't invite that person. Perhaps they are already a user?"}, login_reply: "Log In to Reply", filters: {user: "You're viewing only posts by specific user(s).", best_of: "You're viewing only the 'Best Of' posts.", cancel: "Show all posts in this topic again."}, move_selected: {title: "Move Selected Posts", topic_name: "New Topic Name:", error: "Sorry, there was an error moving those posts.", instructions: {one: "You are about to create a new topic and populate it with the post you've selected.", other: "You are about to create a new topic and populate it with the <b>{{count}}</b> posts you've selected."}}, multi_select: {select: "select", selected: "selected ({{count}})", "delete": "delete selected", cancel: "cancel selecting", move: "move selected", description: {one: "You have selected <b>1</b> post.", other: "You have selected <b>{{count}}</b> posts."}}}, post: {reply: "Replying to {{link}} by {{replyAvatar}} {{username}}", reply_topic: "Reply to {{link}}", edit: "Edit {{link}}", in_reply_to: "in reply to", reply_as_new_topic: "Reply as new Topic", continue_discussion: "Continuing the discussion from {{postLink}}:", follow_quote: "go to the quoted post", deleted_by_author: "(post removed by author)", has_replies: {one: "Reply", other: "Replies"}, errors: {create: "Sorry, there was an error creating your post. Please try again.", edit: "Sorry, there was an error editing your post. Please try again.", upload: "Sorry, there was an error uploading that file. Please try again."}, abandon: "Are you sure you want to abandon your post?", archetypes: {save: "Save Options"}, controls: {reply: "begin composing a reply to this post", like: "like this post", edit: "edit this post", flag: "flag this post or send a notification about this post", "delete": "delete this post", undelete: "undelete this post", share: "share a link to this post", bookmark: "bookmark this post to your user page", more: "More"}, actions: {flag: "Flag", clear_flags: {one: "Clear flag", other: "Clear flags"}, it_too: "{{alsoName}} it too", undo: "Undo {{alsoName}}", by_you_and_others: {zero: "You {{long_form}}", one: "You and 1 other person {{long_form}}", other: "You and {{count}} other people {{long_form}}"}, by_others: {one: "1 person {{long_form}}", other: "{{count}} people {{long_form}}"}}, edits: {one: "1 edit", other: "{{count}} edits", zero: "no edits"}, "delete": {confirm: {one: "Are you sure you want to delete that post?", other: "Are you sure you want to delete all those posts?"}}}, category: {none: "(no category)", edit: "edit", edit_long: "Edit Category", view: "View Topics in Category", "delete": "Delete Category", create: "Create Category", more_posts: "view all {{posts}}...", name: "Category Name", description: "Description", topic: "category topic", color: "Color", name_placeholder: "Should be short and succinct.", color_placeholder: "Any web color", delete_confirm: "Are you sure you want to delete that category?", list: "List Categories", no_description: "There is no description for this category, edit the topic definition.", change_in_category_topic: "Edit Description"}, flagging: {title: "Why are you flagging this post?", action: "Flag Post", cant: "Sorry, you can't flag this post at this time.", custom_placeholder: "Why does this post require moderator attention? Let us know specifically what you are concerned about, and provide relevant links where possible.", custom_message: {at_least: "enter at least {{n}} characters", more: "{{n}} to go...", left: "{{n}} remaining"}}, topic_summary: {title: "Topic Summary", links_shown: "show all {{totalLinks}} links..."}, topic_statuses: {locked: {help: "this topic is closed; it no longer accepts new replies"}, pinned: {help: "this topic is pinned; it will display at the top of its category"}, archived: {help: "this topic is archived; it is frozen and cannot be changed"}, invisible: {help: "this topic is invisible; it will not be displayed in topic lists, and can only be accessed via a direct link"}}, posts: "Posts", posts_long: "{{number}} posts in this topic", original_post: "Original Post", views: "Views", replies: "Replies", views_long: "this topic has been viewed {{number}} times", activity: "Activity", likes: "Likes", top_contributors: "Participants", category_title: "Category", history: "History", categories_list: "Categories List", filters: {latest: {title: "Latest", help: "the latest topics"}, favorited: {title: "Favorited", help: "topics you marked as favorites"}, read: {title: "Read", help: "topics you've read, in the order that you last read them"}, categories: {title: "Categories", title_in: "Category - {{categoryName}}", help: "all topics grouped by category"}, unread: {title: {zero: "Unread", one: "Unread (1)", other: "Unread ({{count}})"}, help: "tracked topics with unread posts"}, "new": {title: {zero: "New", one: "New (1)", other: "New ({{count}})"}, help: "new topics since your last visit"}, posted: {title: "My Posts", help: "topics you have posted in"}, category: {title: {zero: "{{categoryName}}", one: "{{categoryName}} (1)", other: "{{categoryName}} ({{count}})"}, help: "latest topics in the {{categoryName}} category"}}, type_to_filter: "type to filter...", admin: {title: "Discourse Admin", dashboard: {title: "Dashboard", version: "Installed version", up_to_date: "You are running the latest version of Discourse.", critical_available: "A critical update is available.", updates_available: "Updates are available.", please_upgrade: "Please upgrade!", latest_version: "Latest version"}, flags: {title: "Flags", old: "Old", active: "Active", clear: "Clear Flags", clear_title: "dismiss all flags on this post (will unhide hidden posts)", "delete": "Delete Post", delete_title: "delete post (if its the first post delete topic)", flagged_by: "Flagged by"}, customize: {title: "Customize", header: "Header", css: "Stylesheet", override_default: "Do not include standard style sheet", enabled: "Enabled?", preview: "preview", undo_preview: "undo preview", save: "Save", "delete": "Delete", delete_confirm: "Delete this customization?"}, email: {title: "Email", sent_at: "Sent At", email_type: "Email Type", to_address: "To Address", test_email_address: "email address to test", send_test: "send test email", sent_test: "sent!"}, impersonate: {title: "Impersonate User", username_or_email: "Username or Email of User", help: "Use this tool to impersonate a user account for debugging purposes.", not_found: "That user can't be found.", invalid: "Sorry, you may not impersonate that user."}, users: {title: "Users", create: "Add Admin User", last_emailed: "Last Emailed", not_found: "Sorry that username doesn't exist in our system.", "new": "New", active: "Active", pending: "Pending", approved: "Approved?", approved_selected: {one: "approve user", other: "approve users ({{count}})"}}, user: {ban_failed: "Something went wrong banning this user {{error}}", unban_failed: "Something went wrong unbanning this user {{error}}", ban_duration: "How long would you like to ban the user for? (days)", delete_all_posts: "Delete all posts", ban: "Ban", unban: "Unban", banned: "Banned?", moderator: "Moderator?", admin: "Admin?", show_admin_profile: "Admin", refresh_browsers: "Force browser refresh", show_public_profile: "Show Public Profile", impersonate: "Impersonate", revoke_admin: "Revoke Admin", grant_admin: "Grant Admin", revoke_moderation: "Revoke Moderation", grant_moderation: "Grant Moderation", reputation: "Reputation", permissions: "Permissions", activity: "Activity", like_count: "Likes Received", private_topics_count: "Private Topics Count", posts_read_count: "Posts Read", post_count: "Posts Created", topics_entered: "Topics Entered", flags_given_count: "Flags Given", flags_received_count: "Flags Received", approve: "Approve", approved_by: "approved by", time_read: "Read Time"}, site_settings: {show_overriden: "Only show overridden", title: "Settings", reset: "reset to default"}}}}}, I18n.locale = "id", function (e) {
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
        return null === t || "" === t ? null : ("string" == typeof t && (e._i = t = f().preparse(t)), P.isMoment(t) ? (e = i({}, t), e._d = new Date(+t._d)) : n ? c(n) ? T(e) : w(e) : D(e), new r(e))
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

    for (var P, L, R = "2.0.0", z = Math.round, O = {}, j = "undefined" != typeof module && module.exports, U = /^\/?Date\((\-?\d+)/i, F = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, H = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, B = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, V = /\d\d?/, Y = /\d{1,3}/, G = /\d{3}/, q = /\d{1,4}/, W = /[+\-]?\d{1,6}/, $ = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, K = /Z|[\+\-]\d\d:?\d\d/i, Q = /T/i, Z = /[\+\-]?\d+(\.\d{1,3})?/, X = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, J = "YYYY-MM-DDTHH:mm:ssZ", et = [
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