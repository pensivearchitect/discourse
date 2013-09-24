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
        if (I18n.fallbacks)for (var o = this.getFallbacks(a), l = 0; o.length > l && !(i = I18n.lookup(s, this.prepareOptions({locale: o[l]}, t))); o++);
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
    var s = e.getDay(), r = e.getDate(), a = e.getFullYear(), i = e.getMonth() + 1, o = e.getHours(), l = o, u = o > 11 ? 1 : 0, c = e.getSeconds(), h = e.getMinutes(), d = e.getTimezoneOffset(), p = Math.floor(Math.abs(d / 60)), f = Math.abs(d) - 60 * p, m = (d > 0 ? "-" : "+") + (2 > p.toString().length ? "0" + p : p) + (2 > f.toString().length ? "0" + f : f);
    l > 12 ? l -= 12 : 0 === l && (l = 12);
    var g = function (e) {
        var t = "0" + e.toString();
        return t.substr(t.length - 2)
    }, v = t;
    return v = v.replace("%a", n.abbr_day_names[s]), v = v.replace("%A", n.day_names[s]), v = v.replace("%b", n.abbr_month_names[i]), v = v.replace("%B", n.month_names[i]), v = v.replace("%d", g(r)), v = v.replace("%e", r), v = v.replace("%-d", r), v = v.replace("%H", g(o)), v = v.replace("%-H", o), v = v.replace("%I", g(l)), v = v.replace("%-I", l), v = v.replace("%m", g(i)), v = v.replace("%-m", i), v = v.replace("%M", g(h)), v = v.replace("%-M", h), v = v.replace("%p", n.meridian[u]), v = v.replace("%S", g(c)), v = v.replace("%-S", c), v = v.replace("%w", s), v = v.replace("%y", g(a)), v = v.replace("%-y", g(a).replace(/^0+/, "")), v = v.replace("%Y", a), v = v.replace("%z", m)
}, I18n.toNumber = function (e, t) {
    t = this.prepareOptions(t, this.lookup("number.format"), {precision: 3, separator: ".", delimiter: ",", strip_insignificant_zeros: !1});
    var n, s, r = 0 > e, a = Math.abs(e).toFixed(t.precision).toString(), i = a.split("."), o = [];
    for (e = i[0], n = i[1]; e.length > 0;)o.unshift(e.substr(Math.max(0, e.length - 3), 3)), e = e.substr(0, e.length - 3);
    if (s = o.join(t.delimiter), t.precision > 0 && (s += t.separator + i[1]), r && (s = "-" + s), t.strip_insignificant_zeros) {
        var l = {separator: new RegExp(t.separator.replace(/\./, "\\.") + "$"), zeros: /0+$/};
        s = s.replace(l.zeros, "").replace(l.separator, "")
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
    var i = this.pluralizer(this.currentLocale()), o = i(Math.abs(e)), l = "object" == typeof o && o instanceof Array ? o : [o];
    return a = this.findAndTranslateValidNode(l, s), null == a && (a = this.missingTranslation(t, l[0])), this.interpolate(a, n)
}, I18n.missingTranslation = function () {
    for (var e = '[missing "' + this.currentLocale(), t = arguments.length, n = 0; t > n; n++)e += "." + arguments[n];
    return e += '" translation]'
}, I18n.currentLocale = function () {
    return I18n.locale || I18n.defaultLocale
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, MessageFormat = {locale: {}}, MessageFormat.locale.zh_TW = function () {
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
}({}), I18n.translations = {zh_TW: {js: {share: {topic: "分享一個到本主題的鏈接", post: "分享一個到本帖的鏈接", close: "關閉", twitter: "分享這個鏈接到 Twitter", facebook: "分享這個鏈接到 Facebook", "google+": "分享這個鏈接到 Google+", email: "用電子郵件發送這個鏈接"}, edit: "編輯本主題的標題和分類", not_implemented: "非常抱歉，此功能暫時尚未實現！", no_value: "否", yes_value: "是", of_value: "之于", generic_error: "抱歉，發生了一個錯誤。", log_in: "登錄", age: "壽命", last_post: "最後一帖", admin_title: "管理員", flags_title: "投訴", show_more: "顯示更多", links: "鏈接", faq: "常見問答（FAQ）", you: "你", or: "或", now: "剛剛", read_more: "閱讀更多", in_n_seconds: {one: "一秒內", other: "{{count}}秒內"}, in_n_minutes: {one: "一分鍾內", other: "{{count}}分鍾內"}, in_n_hours: {one: "一小時內", other: "{{count}}小時內"}, in_n_days: {one: "一天內", other: "{{count}}天內"}, suggested_topics: {title: "推薦主題"}, bookmarks: {not_logged_in: "抱歉，要給帖子加書簽，你必須先登錄。", created: "你給此帖的書簽已加上。", not_bookmarked: "你已經閱讀過此帖，點此給它加上書簽。", last_read: "這是你閱讀過的最後一帖。"}, new_topics_inserted: "{{count}} 個新主題。", show_new_topics: "點此顯示。", preview: "預覽", cancel: "取消", save: "保存修改", saving: "保存中……", saved: "已保存！", choose_topic: {none_found: "沒有找到主題", title: {search: "通過名稱、url或者id，搜索主題：", placeholder: "在此輸入主題標題"}}, user_action: {user_posted_topic: "<a href='{{userUrl}}'>{{user}}</a> 發起 <a href='{{topicUrl}}'>本主題</a>", you_posted_topic: "<a href='{{userUrl}}'>你</a> 發起 <a href='{{topicUrl}}'>本主題</a>", user_replied_to_post: "<a href='{{userUrl}}'>{{user}}</a> 回複 <a href='{{postUrl}}'>{{post_number}}</a>", you_replied_to_post: "<a href='{{userUrl}}'>你</a> 回複 <a href='{{postUrl}}'>{{post_number}}</a>", user_replied_to_topic: "<a href='{{userUrl}}'>{{user}}</a> 回複 <a href='{{topicUrl}}'>本主題</a>", you_replied_to_topic: "<a href='{{userUrl}}'>你</a> 回複 <a href='{{topicUrl}}'>本主題</a>", user_mentioned_user: "<a href='{{user1Url}}'>{{user}}</a> 提到 <a href='{{user2Url}}'>{{another_user}}</a>", user_mentioned_you: "<a href='{{user1Url}}'>{{user}}</a> 提到 <a href='{{user2Url}}'>你</a>", you_mentioned_user: "<a href='{{user1Url}}'>你</a> 提到 <a href='{{user2Url}}'>{{user}}</a>", posted_by_user: "發起人 <a href='{{userUrl}}'>{{user}}</a>", posted_by_you: "發起人 <a href='{{userUrl}}'>你</a>", sent_by_user: "發送人 <a href='{{userUrl}}'>{{user}}</a>", sent_by_you: "發送人 <a href='{{userUrl}}'>你</a>"}, user_action_groups: {1: "給出的贊", 2: "收到的贊", 3: "書簽", 4: "主題", 5: "回複", 6: "回應", 7: "提到", 9: "引用", 10: "喜愛", 11: "編輯", 12: "發送條目", 13: "收件箱"}, user: {profile: "介紹信息", title: "用戶", mute: "防打擾", edit: "修改參數", download_archive: "下載我的帖子的存檔", private_message: "私信", private_messages: "消息", activity_stream: "活動", preferences: "設置", bio: "關于我", invited_by: "邀請者爲", trust_level: "用戶級別", external_links_in_new_tab: "始終在新的標簽頁打開外部鏈接", enable_quoting: "在高亮選擇文字時啓用引用回複", moderator: "{{user}} 是版主", admin: "{{user}} 是管理員", change_password: {action: "修改", success: "（電子郵件已發送）", in_progress: "（正在發送電子郵件）", error: "（錯誤）"}, change_username: {action: "修改", title: "修改用戶名", confirm: "修改你的用戶名可能會導致一些相關後果，你真的確定要這麽做麽？", taken: "抱歉此用戶名已經有人使用了。", error: "在修改你的用戶名時發生了錯誤。", invalid: "此用戶名不合法，用戶名只能包含字母和數字"}, change_email: {action: "修改", title: "修改電子郵箱", taken: "抱歉此電子郵箱不可用。", error: "抱歉在修改你的電子郵箱時發生了錯誤，可能此郵箱已經被使用了？", success: "我們發送了一封確認信到此郵箱地址，請按照郵箱內指示完成確認。"}, email: {title: "電子郵箱", instructions: "你的電子郵箱絕不會公開給他人。", ok: "不錯哦，我們會發送電子郵件讓你確認。", invalid: "請填寫正確的電子郵箱地址。", authenticated: "你的電子郵箱已經被 {{provider}} 確認有效。", frequency: "只有當你最近一段時間沒有訪問時，我們才會把你未讀過的內容發送到你的電子郵箱。"}, name: {title: "名字", instructions: "你的名字，不要求獨一無二（可以與他人的名字重複）。用于在@name匹配你時參考，只在你的用戶頁面顯示。", too_short: "你設置的名字太短了。", ok: "你的名字符合要求。"}, username: {title: "用戶名", instructions: "必須是獨一無二的，中間不能有空格。其他人可以使用 @{{username}} 來提及你。", short_instructions: "其他人可以用 @{{username}} 來提及你。", available: "你的用戶名可用。", global_match: "電子郵箱與注冊用戶名相匹配。", global_mismatch: "已被人注冊。試試 {{suggestion}} ？", not_available: "不可用。試試 {{suggestion}} ？", too_short: "你設置的用戶名太短了。", too_long: "你設置的用戶名太長了。", checking: "查看用戶名是否可用……", enter_email: "找到用戶名，請輸入對應電子郵箱。"}, password_confirmation: {title: "請再次輸入密碼"}, last_posted: "最後一帖", last_emailed: "最後一次郵寄", last_seen: "最後一次見到", created: "創建時間", log_out: "登出", website: "網站", email_settings: "電子郵箱", email_digests: {title: "當我不訪問此站時，向我的郵箱發送最新摘要", daily: "每天", weekly: "每周", bi_weekly: "每兩周"}, email_direct: "當有人引用你、回複你或提及你 @username 時發送一封郵件給你", email_private_messages: "當有人給你發私信時發送一封郵件給你", other_settings: "其它", new_topic_duration: {label: "認爲主題是新主題，當", not_viewed: "我還沒有浏覽它們", last_here: "它們是在我最近一次訪問這裏之後發表的", after_n_days: {one: "它們是昨天發表的", other: "它們是之前 {{count}} 天發表的"}, after_n_weeks: {one: "它們是上周發表的", other: "它們是之前 {{count}} 周發表的"}}, auto_track_topics: "自動追蹤我進入的主題", auto_track_options: {never: "從不", always: "始終", after_n_seconds: {one: "1 秒之後", other: "{{count}} 秒之後"}, after_n_minutes: {one: "1 分鍾之後", other: "{{count}} 分鍾之後"}}, invited: {title: "邀請", user: "邀請用戶", none: "{{username}} 尚未邀請任何用戶到本站。", redeemed: "確認邀請", redeemed_at: "確認時間", pending: "待定邀請", topics_entered: "已進入的主題", posts_read_count: "已閱的帖子", rescind: "刪除邀請", rescinded: "邀請已刪除", time_read: "閱讀時間", days_visited: "訪問天數", account_age_days: "帳號存在天數"}, password: {title: "密碼", too_short: "你設置的密碼太短了。", ok: "你設置的密碼符合要求。"}, ip_address: {title: "最後使用的IP地址"}, avatar: {title: "頭像", instructions: "我們目前使用 <a href='https://gravatar.com' target='_blank'>Gravatar</a> 來基于你的郵箱生成頭像"}, filters: {all: "全部"}, stream: {posted_by: "發帖人", sent_by: "發送時間", private_message: "私信", the_topic: "本主題"}}, loading: "載入中……", close: "關閉", learn_more: "了解更多……", year: "年", year_desc: "365天以前發表的主題", month: "月", month_desc: "30天以前發表的主題", week: "周", week_desc: "7天以前發表的主題", first_post: "第一帖", mute: "防打擾", unmute: "解除防打擾", best_of: {title: "優秀", enabled_description: "你現在正在浏覽本主題的“優秀”視圖。", description: "此主題中有 <b>{{count}}</b> 個帖子，是不是有點多哦！你願意切換到只顯示最多交互和回複的帖子視圖麽？", enable: "切換到“優秀”視圖", disable: "取消“優秀”"}, private_message_info: {title: "私下交流", invite: "邀請其他人……"}, email: "電子郵箱", username: "用戶名", last_seen: "最後一次見到", created: "創建時間", trust_level: "用戶級別", create_account: {title: "創建帳號", action: "現在就創建一個！", invite: "還沒有帳號嗎？", failed: "出問題了，有可能這個電子郵箱已經被注冊了。試試忘記密碼鏈接"}, forgot_password: {title: "忘記密碼", action: "我忘記了我的密碼", invite: "輸入你的用戶名和電子郵箱地址，我們會發送密碼重置郵件給你。", reset: "重置密碼", complete: "你很快會收到一封電子郵件，告訴你如何重置密碼。"}, login: {title: "登錄", username: "登錄", password: "密碼", email_placeholder: "電子郵箱地址或用戶名", error: "未知錯誤", reset_password: "重置密碼", logging_in: "登錄中……", or: "或", authenticating: "驗證中……", awaiting_confirmation: "你的帳號尚未激活，點擊忘記密碼鏈接來重新發送激活郵件。", awaiting_approval: "你的帳號尚未被論壇版主批准。一旦你的帳號獲得批准，你會收到一封電子郵件。", not_activated: "你還不能登錄。我們之前在<b>{{sentTo}}</b>發送了一封激活郵件給你。請按照郵件中的介紹來激活你的帳號。", resend_activation_email: "點擊此處來重新發送激活郵件。", sent_activation_email_again: "我們在<b>{{currentEmail}}</b>又發送了一封激活郵件給你，郵件送達可能需要幾分鍾，有的電子郵箱服務商可能會認爲此郵件爲垃圾郵件，請檢查一下你郵箱的垃圾郵件文件夾。", google: {title: "使用谷歌帳號登錄", message: "使用谷歌（Google）帳號驗證登錄（請確保沒有禁止浏覽器彈出對話框）"}, twitter: {title: "使用推特帳號登錄", message: "使用推特（Twitter）帳號驗證登錄（請確保沒有禁止浏覽器彈出對話框）"}, facebook: {title: "使用臉書帳號登錄", message: "使用臉書（Facebook）帳號驗證登錄（請確保沒有禁止浏覽器彈出對話框）"}, yahoo: {title: "使用雅虎帳號登錄", message: "使用雅虎（Yahoo）帳號驗證登錄（請確保沒有禁止浏覽器彈出對話框）"}, github: {title: "使用 GitHub 帳號登錄", message: "使用 GitHub 帳號驗證登錄（請確保沒有禁止浏覽器彈出對話框）"}, persona: {title: "使用 Persona 帳號登錄", message: "使用 Mozilla Persona 帳號驗證登錄（請確保沒有禁止浏覽器彈出對話框）"}}, composer: {posting_not_on_topic: '你正在回複主題 "{{title}}"，但是當前你正在浏覽的是另外一個主題。', saving_draft_tip: "保存中", saved_draft_tip: "已保存", saved_local_draft_tip: "已本地保存", similar_topics: "你的主題與此有些類似...", drafts_offline: "離線草稿", min_length: {need_more_for_title: "請給標題再輸入至少 {{n}} 個字符", need_more_for_reply: "請給正文內容再輸入至少 {{n}} 個字符"}, save_edit: "保存編輯", reply_original: "回複原始帖", reply_here: "在此回複", reply: "回複", cancel: "取消", create_topic: "創建主題", create_pm: "創建私信", users_placeholder: "添加一個用戶", title_placeholder: "在此輸入你的標題，簡明扼要的用一句話說明討論的內容。", reply_placeholder: "在此輸入你的內容。你可以使用 Markdown（參考 http://wowubuntu.com/markdown/） 或 BBCode（參考 http://www.bbcode.org/reference.php） 來格式化內容。拖拽或粘貼一幅圖片到這兒即可將它上傳。", view_new_post: "浏覽你的新帖子。", saving: "保存中……", saved: "已保存！", saved_draft: "你有一個帖子草稿尚發表。在框中任意處點擊即可接著編輯。", uploading: "上傳中……", show_preview: "顯示預覽 &raquo;", hide_preview: "&laquo; 隱藏預覽", quote_post_title: "引用整個帖子", bold_title: "加粗", bold_text: "加粗文字", italic_title: "斜體", italic_text: "斜體文字", link_title: "鏈接", link_description: "在此輸入鏈接描述", link_dialog_title: "插入鏈接", link_optional_text: "可選標題", quote_title: "引用", quote_text: "引用", code_title: "代碼", code_text: "在此輸入代碼", image_title: "圖片", image_description: "在此輸入圖片描述", image_dialog_title: "插入圖片", image_optional_text: "可選標題", image_hosting_hint: "需要 <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>免費圖片存儲？</a>", olist_title: "數字列表", ulist_title: "符號列表", list_item: "列表條目", heading_title: "標題", heading_text: "標題頭", hr_title: "分割線", undo_title: "撤銷", redo_title: "重做", help: "Markdown 編輯幫助", toggler: "隱藏或顯示編輯面板", admin_options_title: "本主題可選設置", auto_close_label: "自動關閉主題，過：", auto_close_units: "天"}, notifications: {title: "使用 @name 提及到你，回複你的帖子和主題，私信等等的通知消息", none: "你當前沒有任何通知。", more: "浏覽以前的通知", mentioned: "<span title='mentioned' class='icon'>@</span> {{username}} {{link}}", quoted: "<i title='quoted' class='icon icon-quote-right'></i> {{username}} {{link}}", replied: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", posted: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", edited: "<i title='edited' class='icon icon-pencil'></i> {{username}} {{link}}", liked: "<i title='liked' class='icon icon-heart'></i> {{username}} {{link}}", private_message: "<i class='icon icon-envelope-alt' title='私信'></i> {{username}} 發送給你一條私信：{{link}}", invited_to_private_message: "{{username}} 邀請你進行私下交流：{{link}}", invitee_accepted: "<i title='已接受你的邀請' class='icon icon-signin'></i> {{username}} 已接受你的邀請", moved_post: "<i title='移動帖子' class='icon icon-arrow-right'></i> {{username}} 已將帖子移動到 {{link}}", total_flagged: "被投訴帖子的總數"}, image_selector: {title: "插入圖片", from_my_computer: "來自我的設備", from_the_web: "來自網絡", add_image: "添加圖片", remote_title: "網絡圖片", remote_tip: "輸入圖片網絡，格式爲：http://example.com/image.jpg", local_title: "本地圖片", local_tip: "點擊從你的設備中選擇一張圖片。", upload: "上傳", uploading_image: "上傳圖片中"}, search: {title: "搜索主題、帖子、用戶或分類", placeholder: "在此輸入你的搜索條件", no_results: "沒有找到結果。", searching: "搜索中……"}, site_map: "去另一個主題列表或分類", go_back: "返回", current_user: "去你的用戶頁面", favorite: {title: "收藏", help: {star: "將此主題加入你的收藏列表", unstar: "將此主題從你的收藏列表中移除"}}, topics: {none: {favorited: "你尚未收藏任何主題。要收藏一個主題，點擊標題旁的星星圖標。", unread: "你沒有未閱主題。", "new": "你沒有新主題可讀。", read: "你尚未閱讀任何主題。", posted: "你尚未在任何主題中發帖。", latest: "傷心啊，沒有主題。", hot: "沒有熱門主題。", category: "沒有 {{category}} 分類的主題。"}, bottom: {latest: "沒有更多主題可看了。", hot: "沒有更多熱門主題可看了。", posted: "沒有更多已發布主題可看了。", read: "沒有更多已閱主題可看了。", "new": "沒有更多新主題可看了。", unread: "沒有更多未閱主題可看了。", favorited: "沒有更多收藏主題可看了。", category: "沒有更多 {{category}} 分類的主題了。"}}, rank_details: {toggle: "切換主題排名詳細", show: "顯示主題排名詳細信息", title: "主題排名詳細"}, topic: {create_in: "創建一個 {{categoryName}} 分類的主題", create: "創建主題", create_long: "創建一個新主題", private_message: "開啓一段私下交流", list: "主題", "new": "新主題", title: "主題", loading_more: "載入更多主題中……", loading: "載入主題中……", invalid_access: {title: "這是私密主題", description: "抱歉，你沒有訪問此主題的權限！"}, server_error: {title: "載入主題失敗", description: "抱歉，無法載入此主題。有可能是網絡連接問題導致的，請重試。如果問題始終存在，請告訴我們。"}, not_found: {title: "未找到主題", description: "抱歉，無法找到此主題。有可能它被論壇版主刪掉了？"}, unread_posts: "此主題中你有 {{unread}} 個帖子未閱", new_posts: "從你最近一次閱讀此主題後，又有 {{new_posts}} 個新帖子發表", likes: {one: "此主題得到了一個贊", other: "此主題得到了 {{count}} 個贊"}, back_to_list: "返回主題列表", options: "主題選項", show_links: "顯示此主題中的鏈接", toggle_information: "切換主題詳細", read_more_in_category: "想閱讀更多內容？浏覽 {{catLink}} 或 {{latestLink}} 裏的其它主題。", read_more: "想閱讀更多內容？{{catLink}} 或 {{latestLink}}。", browse_all_categories: "浏覽所有分類", view_latest_topics: "浏覽熱門主題", suggest_create_topic: "這就創建一個主題吧！", read_position_reset: "你的閱讀位置已經被重置。", jump_reply_up: "跳轉至更早的回複", jump_reply_down: "跳轉至更晚的回複", deleted: "此主題已被刪除", auto_close_notice: "本主題將在%{timeLeft}後自動關閉", auto_close_title: "自動關閉設置", auto_close_save: "保存", auto_close_cancel: "取消", auto_close_remove: "不自動關閉該主題", progress: {title: "主題進度", jump_top: "跳轉到第一帖", jump_bottom: "跳轉到最後一帖", total: "全部帖子", current: "當前帖"}, notifications: {title: "", reasons: {"3_2": "因爲你在關注此主題，所以你將收到相關通知。", "3_1": "因爲你創建了此主題，所以你將收到相關通知。", 3: "因爲你在關注此主題，所以你將收到相關通知。", "2_4": "因爲你在此主題內發表了回複，所以你將收到相關通知。", "2_2": "因爲你在追蹤此主題，所以你將收到相關通知。", 2: '因爲你<a href="/users/{{username}}/preferences">閱讀了此主題</a>，所以你將收到相關通知。', 1: "因爲有人 @name 提及了你或回複了你的帖子，所以你將收到相關通知。", "1_2": "僅當有人 @name 提及了你或回複了你的帖子，你才會收到相關通知。", 0: "你將忽略關于此主題的所有通知。", "0_2": "你將忽略關于此主題的所有通知。"}, watching: {title: "關注", description: "與追蹤一樣，額外的是一旦有新帖子發表，你都會收到通知。"}, tracking: {title: "追蹤", description: "關于你的未閱帖子、@name 提及與對你的帖子的回複，你都會收到通知。"}, regular: {title: "常規", description: "只有當有人 @name 提及你或者回複你的帖子時，你才會收到通知。"}, muted: {title: "防打擾", description: "你不會收到關于此主題的任何通知，也不會在你的未閱選項卡中顯示。"}}, actions: {"delete": "刪除主題", open: "打開主題", close: "關閉主題", auto_close: "自動關閉", unpin: "解除主題置頂", pin: "置頂主題", unarchive: "解除主題存檔", archive: "存檔主題", invisible: "使不可見", visible: "使可見", reset_read: "重置閱讀數據", multi_select: "選擇將被合並/拆分的帖子", convert_to_topic: "轉換到常規主題"}, reply: {title: "回複", help: "開始給本主題撰寫回複"}, clear_pin: {title: "清除置頂", help: "將本主題的置頂狀態清除，這樣它將不再始終顯示在主題列表頂部"}, share: {title: "分享", help: "分享一個到本帖的鏈接"}, inviting: "邀請中……", invite_private: {title: "邀請進行私下交流", email_or_username: "受邀人的電子郵箱或用戶名", email_or_username_placeholder: "電子郵箱地址或用戶名", action: "邀請", success: "謝謝！我們已經邀請該用戶參與此私下交流。", error: "抱歉，在邀請該用戶時發生了錯誤。"}, invite_reply: {title: "邀請朋友來回複", action: "郵件邀請", help: "向你的朋友發送邀請，他們只需要一個點擊就能回複這個主題", email: "我們會給你的朋友發送一封郵件，他們只需要點擊其中的一個鏈接就可以回複這個主題了。", email_placeholder: "電子郵箱地址", success: "謝謝！我們已發送一個邀請郵件到<b>{{email}}</b>。當他們確認的時候我們會通知你。你也可以在你的用戶頁面的邀請選項卡下查看邀請狀態。", error: "抱歉，我們不能邀請此人，可能他/她已經是本站用戶了？"}, login_reply: "登錄來回複", filters: {user: "你在浏覽 {{n_posts}} {{by_n_users}}.", n_posts: {one: "一個帖子", other: "{{count}} 帖子"}, by_n_users: {one: "一個指定用戶", other: "{{count}} 個用戶中的"}, best_of: "你在浏覽 {{n_best_posts}} {{of_n_posts}}.", n_best_posts: {one: "一個優秀帖子", other: "{{count}} 優秀帖子"}, of_n_posts: {one: "一個帖子中的", other: "{{count}} 個帖子中的"}, cancel: "再次顯示本主題下的所有帖子。"}, split_topic: {title: "拆分主題", action: "拆分主題", topic_name: "新主題名：", error: "拆分主題時發生錯誤。", instructions: {one: "你想如何移動該帖？", other: "你想如何移動你所選擇的這{{count}}篇帖子？"}}, merge_topic: {title: "合並主題", action: "合並主題", error: "合並主題時發生錯誤。", instructions: {one: "請選擇你想將那篇帖子移至其下的主題。", other: "請選擇你想將那{{count}}篇帖子移至其下的主題。"}}, multi_select: {select: "選擇", selected: "已選擇（{{count}}）", "delete": "刪除所選", cancel: "取消選擇", description: {one: "你已選擇了<b>一個</b>帖子。", other: "你已選擇了<b>{{count}}</b>個帖子。"}}}, post: {reply: "回複 {{replyAvatar}} {{username}} 發表的 {{link}}", reply_topic: "回複 {{link}}", quote_reply: "引用回複", edit: "編輯 {{link}}", post_number: "帖子 {{number}}", in_reply_to: "回複給", reply_as_new_topic: "回複爲新主題", continue_discussion: "從 {{postLink}} 繼續討論：", follow_quote: "跳轉至所引用的帖子", deleted_by_author: "（作者刪除了帖子）", expand_collapse: "展開/收縮", has_replies: {one: "回複", other: "回複"}, errors: {create: "抱歉，在創建你的帖子時發生了錯誤。請重試。", edit: "抱歉，在編輯你的帖子時發生了錯誤。請重試。", upload: "抱歉，在上傳文件時發生了錯誤。請重試。", upload_too_large: "抱歉，你上傳的文件太大了（最大不能超過 {{max_size_kb}}kb），請調整文件大小後重新上傳。", too_many_uploads: "抱歉, 你只能一次上傳一張圖片。"}, abandon: "你確定要丟棄你的帖子嗎？", archetypes: {save: "保存選項"}, controls: {reply: "開始給本帖撰寫回複", like: "贊本帖", edit: "編輯本帖", flag: "投訴本帖以提醒論壇版主", "delete": "刪除本帖", undelete: "恢複本帖", share: "分享一個到本帖的鏈接", more: "更多"}, actions: {flag: "投訴", clear_flags: {one: "清除投訴", other: "清除投訴"}, it_too: {off_topic: "也投訴", spam: "也投訴", inappropriate: "也投訴", custom_flag: "也投訴", bookmark: "也做書簽", like: "也贊它", vote: "也對它投票"}, undo: {off_topic: "撤銷投訴", spam: "撤銷投訴", inappropriate: "撤銷投訴", bookmark: "撤銷書簽", like: "撤銷贊", vote: "撤銷投票"}, people: {off_topic: "{{icons}} 投訴它偏離主題", spam: "{{icons}} 投訴它爲垃圾信息", inappropriate: "{{icons}} 投訴它爲不當內容", notify_moderators: "{{icons}} 向版主投訴它", notify_moderators_with_url: "{{icons}} <a href='{{postUrl}}'>通知了版主</a>", notify_user: "{{icons}} 發起了一個私下交流", notify_user_with_url: "{{icons}} 發送了一條<a href='{{postUrl}}'>私有消息</a>", bookmark: "{{icons}} 對它做了書簽", like: "{{icons}} 贊了它", vote: "{{icons}} 對它投票"}, by_you: {off_topic: "你投訴它偏離主題", spam: "你投訴它爲垃圾信息", inappropriate: "你投訴它爲不當內容", notify_moderators: "你向版主投訴了它", notify_user: "你對該用戶發起了一個私下交流", bookmark: "你對該帖做了書簽", like: "你贊了它", vote: "你對該帖投了票"}, by_you_and_others: {off_topic: {one: "你和另一個用戶投訴它偏離主題", other: "你和其他 {{count}} 個用戶投訴它偏離主題"}, spam: {one: "你和另一個用戶投訴它爲垃圾信息", other: "你和其他 {{count}} 個用戶投訴它爲垃圾信息"}, inappropriate: {one: "你和另一個用戶投訴它爲不當內容", other: "你和其他 {{count}} 個用戶投訴它爲不當內容"}, notify_moderators: {one: "你和另一個用戶向版主投訴了它", other: "你和其他 {{count}} 個用戶向版主投訴了它"}, notify_user: {one: "你和另一個用戶對該用戶發起了一個私下交流", other: "你和其他 {{count}} 個用戶對該用戶發起了一個私下交流"}, bookmark: {one: "你和另一個用戶對該帖做了書簽", other: "你和其他 {{count}} 個用戶對該帖做了書簽"}, like: {one: "你和另一個用戶贊了它", other: "你和其他 {{count}} 個用戶贊了它"}, vote: {one: "你和另一個用戶對該帖投了票", other: "你和其他 {{count}} 個用戶對該帖投了票"}}, by_others: {off_topic: {one: "一個用戶投訴它偏離主題", other: "{{count}} 個用戶投訴它偏離主題"}, spam: {one: "一個用戶投訴它爲垃圾信息", other: "{{count}} 個用戶投訴它爲垃圾信息"}, inappropriate: {one: "一個用戶投訴它爲不當內容", other: "{{count}} 個用戶投訴它爲不當內容"}, notify_moderators: {one: "一個用戶向版主投訴了它", other: "{{count}} 個用戶向版主投訴了它"}, notify_user: {one: "一個用戶對該用戶發起了一個私下交流", other: "{{count}} 個用戶對該用戶發起了一個私下交流"}, bookmark: {one: "一個用戶對該帖做了書簽", other: "{{count}} 個用戶對該帖做了書簽"}, like: {one: "一個用戶贊了它", other: "{{count}} 個用戶贊了它"}, vote: {one: "一個用戶對該帖投了票", other: "{{count}} 個用戶對該帖投了票"}}}, edits: {one: "一次編輯", other: "{{count}}次編輯", zero: "未編輯"}, "delete": {confirm: {one: "你確定要刪除此帖嗎？", other: "你確定要刪除這些帖子嗎？"}}}, category: {none: "（未分類）", edit: "編輯", edit_long: "編輯分類", edit_uncategorized: "編輯未分類的", view: "浏覽分類下的主題", general: "通常", settings: "設置", "delete": "刪除分類", create: "創建分類", save: "保存分類", creation_error: "創建此分類時發生了錯誤。", save_error: "在保存此分類時發生了錯誤。", more_posts: "浏覽全部 {{posts}} ……", name: "分類名稱", description: "描述", topic: "分類主題", badge_colors: "徽章顔色", background_color: "背景色", foreground_color: "前景色", name_placeholder: "應該簡明扼要。", color_placeholder: "任何網絡色彩", delete_confirm: "你確定要刪除此分類嗎？", delete_error: "在刪除此分類時發生了錯誤。", list: "列出分類", no_description: "本分類沒有描述信息。", change_in_category_topic: "訪問分類主題來編輯描述信息", hotness: "熱度", already_used: "此色彩已經被另一個分類使用", is_secure: "安全類型？", add_group: "添加分組", security: "安全", allowed_groups: "授權的分組：", auto_close_label: "自動關閉主題，過："}, flagging: {title: "爲何要給投訴本帖？", action: "投訴帖子", notify_action: "通知", cant: "抱歉，當前你不能投訴本帖。", custom_placeholder_notify_user: "爲何你要私下聯系該用戶？", custom_placeholder_notify_moderators: "爲何本帖需要論壇版主的關注？爲何本帖需要論壇版主的關注？", custom_message: {at_least: "輸入至少 {{n}} 個字符", more: "還差 {{n}} 個……", left: "還剩下 {{n}}"}}, topic_summary: {title: "主題概要", links_shown: "顯示所有 {{totalLinks}} 個鏈接……", clicks: "點擊", topic_link: "主題鏈接"}, topic_statuses: {locked: {help: "本主題已關閉，不再接受新的回複"}, pinned: {help: "本主題已置頂，它將始終顯示在它所屬分類的頂部"}, archived: {help: "本主題已歸檔，即已經凍結，無法修改"}, invisible: {help: "本主題不可見，它將不被顯示在主題列表中，只能通過一個直接鏈接來訪問"}}, posts: "帖子", posts_long: "本主題有 {{number}} 個帖子", original_post: "原始帖", views: "浏覽", replies: "回複", views_long: "本主題已經被浏覽過 {{number}} 次", activity: "活動", likes: "贊", top_contributors: "參與者", category_title: "分類", history: "曆史", changed_by: "由 {{author}}", categories_list: "分類列表", filters: {latest: {title: "最新", help: "最新發布的帖子"}, hot: {title: "熱門", help: "最近最受歡迎的主題"}, favorited: {title: "收藏", help: "你收藏的主題"}, read: {title: "已閱", help: "你已經閱讀過的主題"}, categories: {title: "分類", title_in: "分類 - {{categoryName}}", help: "歸屬于不同分類的所有主題"}, unread: {title: {zero: "未閱", one: "1個未閱主題", other: "{{count}}個未閱主題"}, help: "追蹤的主題中有未閱帖子的主題"}, "new": {title: {zero: "新主題", one: "新主題（1）", other: "新主題（{{count}}）"}, help: "你最近一次訪問後的新主題，以及你追蹤的主題中有新帖子的主題"}, posted: {title: "我的帖子", help: "你發表過帖子的主題"}, category: {title: {zero: "{{categoryName}}", one: "{{categoryName}}（1）", other: "{{categoryName}}（{{count}}）"}, help: "在 {{categoryName}} 分類中熱門的主題"}}, browser_update: '抱歉, <a href="http://www.iteriter.com/faq/#browser">你的浏覽器版本太低，推薦使用Chrome</a>. 請 <a href="http://www.google.com/chrome/">升級你的浏覽器</a>。', type_to_filter: "輸入過濾條件……", admin: {title: "論道 管理", moderator: "版主", dashboard: {title: "管理面板", version: "安裝的版本", up_to_date: "你正在運行最新的論壇版本。", critical_available: "有一個關鍵更新可用。", updates_available: "目前有可用更新。", please_upgrade: "請升級！", installed_version: "已安裝", latest_version: "最新版本", problems_found: "你安裝的論壇目前有以下問題：", last_checked: "上次檢查", refresh_problems: "刷新", no_problems: "找不到問題.", moderators: "版主：", admins: "管理員：", private_messages_short: "私信", private_messages_title: "私密信息", reports: {today: "今天", yesterday: "昨天", last_7_days: "7 天以內", last_30_days: "30 天以內", all_time: "所有時間內", "7_days_ago": "7 天之前", "30_days_ago": "30 天之前", all: "全部", view_table: "以表格展示", view_chart: "以柱狀圖展示"}}, commits: {latest_changes: "最後的改動: 請經常升級！", by: "來自"}, flags: {title: "投訴", old: "過去的", active: "活躍的", clear: "清除投訴", clear_title: "撤銷本帖的所有投訴（已隱藏的帖子將會被取消隱藏）", "delete": "刪除帖子", delete_title: "刪除帖子（如果它是主題第一帖，那麽將刪除主題）", flagged_by: "投訴者爲", error: "出錯了", view_message: "查看消息"}, groups: {title: "群組", edit: "編輯群組", selector_placeholder: "添加用戶", name_placeholder: "組名，不能含有空格，與用戶名規則一致"}, api: {title: "應用開發接口（API）", long_title: "API信息", key: "密鑰", generate: "生成API密鑰", regenerate: "重新生成API密鑰", info_html: "API密鑰可以用來通過JSON調用創建和更新主題。", note_html: "請<strong>安全的</strong>保管好本密鑰，任何擁有該密鑰的用戶可以使用它以論壇任何用戶的名義來發帖。"}, customize: {title: "定制", long_title: "站點定制", header: "頭部", css: "層疊樣式表（CSS）", override_default: "覆蓋缺省值？", enabled: "啓用？", preview: "預覽", undo_preview: "撤銷預覽", save: "保存", "new": "新建", new_style: "新樣式", "delete": "刪除", delete_confirm: "刪除本定制內容？", about: "站點定制允許你修改樣式表和站點頭部。選擇或者添加一個來開始編輯。"}, email: {title: "電子郵件", sent_at: "發送時間", email_type: "郵件類型", to_address: "目的地址", test_email_address: "測試電子郵件地址", send_test: "發送測試電子郵件", sent_test: "已發送！"}, impersonate: {title: "假冒用戶", username_or_email: "用戶名或用戶電子郵件", help: "使用此工具來假冒一個用戶帳號以方便調試。", not_found: "無法找到該用戶。", invalid: "抱歉，你不能假冒該用戶。"}, users: {title: "用戶", create: "添加管理員用戶", last_emailed: "最後一次郵寄", not_found: "抱歉，在我們的系統中此用戶名不存在。", "new": "新建", active: "活躍", pending: "待定", approved: "已批准？", approved_selected: {one: "批准用戶", other: "批准用戶（{{count}}）"}, titles: {active: "活動用戶", "new": "新用戶", pending: "等待審核用戶", newuser: "信用等級爲0的用戶（新用戶）", basic: "信用等級爲1的用戶（基本用戶）", regular: "信用等級爲2的用戶（常訪問用戶）", leader: "信用等級爲3的用戶（高級用戶）", elder: "信用等級爲4的用戶（骨灰用戶）", admins: "管理員", moderators: "版主"}}, user: {ban_failed: "禁止此用戶時發生了錯誤 {{error}}", unban_failed: "解禁此用戶時發生了錯誤 {{error}}", ban_duration: "你計劃禁止該用戶多久？（天）", delete_all_posts: "刪除所有帖子", ban: "禁止", unban: "解禁", banned: "已禁止？", moderator: "版主？", admin: "管理員？", show_admin_profile: "管理員", refresh_browsers: "強制浏覽器刷新", show_public_profile: "顯示公開介紹", impersonate: "假冒用戶", revoke_admin: "吊銷管理員資格", grant_admin: "賦予管理員資格", revoke_moderation: "吊銷論壇版主資格", grant_moderation: "賦予論壇版主資格", reputation: "聲譽", permissions: "權限", activity: "活動", like_count: "收到的贊", private_topics_count: "私有主題數量", posts_read_count: "已閱帖子數量", post_count: "創建的帖子數量", topics_entered: "進入的主題數量", flags_given_count: "所做投訴數量", flags_received_count: "收到投訴數量", approve: "批准", approved_by: "批准人", time_read: "閱讀次數", "delete": "刪除用戶", delete_forbidden: "此用戶還無法刪除，因爲他/她還有帖子。請先刪除該用戶的所有帖子。", delete_confirm: "你 確定 你要永久的從本站刪除此用戶？該操作無法撤銷！", deleted: "該用戶已被刪除。", delete_failed: "在刪除用戶時發生了錯誤。請確保刪除該用戶前刪除了該用戶的所有帖子。", send_activation_email: "發送激活郵件", activation_email_sent: "激活郵件已發送。", send_activation_email_failed: "在發送激活郵件時發生了錯誤。", activate: "激活帳號", activate_failed: "在激活用戶帳號時發生了錯誤。", deactivate_account: "停用帳號", deactivate_failed: "在停用用戶帳號時發生了錯誤。"}, site_content: {none: "選擇內容類型以開始編輯。", title: "內容", edit: "編輯站點內容"}, site_settings: {show_overriden: "只顯示被覆蓋了缺省值的", title: "設置", reset: "重置爲缺省值"}}}}}, I18n.locale = "zh_TW", function (e) {
    function t(e, t) {
        return function (n) {
            return l(e.call(this, n), t)
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
        var t = this._data = {}, n = e.years || e.year || e.y || 0, s = e.months || e.month || e.M || 0, r = e.weeks || e.week || e.w || 0, a = e.days || e.day || e.d || 0, i = e.hours || e.hour || e.h || 0, l = e.minutes || e.minute || e.m || 0, u = e.seconds || e.second || e.s || 0, c = e.milliseconds || e.millisecond || e.ms || 0;
        this._milliseconds = c + 1e3 * u + 6e4 * l + 36e5 * i, this._days = a + 7 * r, this._months = s + 12 * n, t.milliseconds = c % 1e3, u += o(c / 1e3), t.seconds = u % 60, l += o(u / 60), t.minutes = l % 60, i += o(l / 60), t.hours = i % 24, a += o(i / 24), a += 7 * r, t.days = a % 30, s += o(a / 30), t.months = s % 12, n += o(s / 12), t.years = n
    }

    function i(e, t) {
        for (var n in t)t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }

    function o(e) {
        return 0 > e ? Math.ceil(e) : Math.floor(e)
    }

    function l(e, t) {
        for (var n = e + ""; t > n.length;)n = "0" + n;
        return n
    }

    function u(e, t, n, s) {
        var r, a, i, o = t._milliseconds, l = t._days, u = t._months;
        o && e._d.setTime(+e._d + o * n), (l || u) && (r = e.minute(), a = e.hour()), l && e.date(e.date() + l * n), u && (i = e.date(), e.date(1).month(e.month() + u * n).date(Math.min(i, e.daysInMonth()))), o && !s && N.updateOffset(e), (l || u) && (e.minute(r), e.hour(a))
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
        return e ? (!O[e] && R && require("./lang/" + e), O[e]) : N.fn._lang
    }

    function m(e) {
        return e.match(/\[.*\]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }

    function g(e) {
        var t, n, s = e.match(Y);
        for (t = 0, n = s.length; n > t; t++)s[t] = lt[s[t]] ? lt[s[t]] : m(s[t]);
        return function (r) {
            var a = "";
            for (t = 0; n > t; t++)a += s[t]instanceof Function ? s[t].call(r, e) : s[t];
            return a
        }
    }

    function v(e, t) {
        function n(t) {
            return e.lang().longDateFormat(t) || t
        }

        for (var s = 5; s-- && H.test(t);)t = t.replace(H, n);
        return at[t] || (at[t] = g(t)), at[t](e)
    }

    function b(e, t) {
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
                return Q;
            case"Z":
            case"ZZ":
                return K;
            case"T":
                return Z;
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

    function _(e) {
        var t = (K.exec(e) || [])[0], n = (t + "").match(tt) || ["-", 0, 0], s = +(60 * n[1]) + ~~n[2];
        return"+" === n[0] ? -s : s
    }

    function y(e, t, n) {
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
                n._useUTC = !0, n._tzm = _(t)
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
        var t, n, s = e._f.match(Y), r = e._i;
        for (e._a = [], t = 0; s.length > t; t++)n = (b(s[t], e).exec(r) || [])[0], n && (r = r.slice(r.indexOf(n) + n.length)), lt[s[t]] && y(s[t], n, e);
        r && (e._il = r), e._isPm && 12 > e._a[3] && (e._a[3] += 12), e._isPm === !1 && 12 === e._a[3] && (e._a[3] = 0), w(e)
    }

    function k(e) {
        var t, n, s, a, o, l = 99;
        for (a = 0; e._f.length > a; a++)t = i({}, e), t._f = e._f[a], x(t), n = new r(t), o = h(t._a, n.toArray()), n._il && (o += n._il.length), l > o && (l = o, s = n);
        i(e, s)
    }

    function D(e) {
        var t, n = e._i, s = J.exec(n);
        if (s) {
            for (e._f = "YYYY-MM-DD" + (s[2] || " "), t = 0; 4 > t; t++)if (et[t][1].exec(n)) {
                e._f += et[t][0];
                break
            }
            K.exec(n) && (e._f += " Z"), x(e)
        } else e._d = new Date(n)
    }

    function T(t) {
        var n = t._i, s = U.exec(n);
        n === e ? t._d = new Date : s ? t._d = new Date(+s[1]) : "string" == typeof n ? D(t) : c(n) ? (t._a = n.slice(0), w(t)) : t._d = n instanceof Date ? new Date(+n) : new Date(n)
    }

    function E(e, t, n, s, r) {
        return r.relativeTime(t || 1, !!n, e, s)
    }

    function C(e, t, n) {
        var s = j(Math.abs(e) / 1e3), r = j(s / 60), a = j(r / 60), i = j(a / 24), o = j(i / 365), l = 45 > s && ["s", s] || 1 === r && ["m"] || 45 > r && ["mm", r] || 1 === a && ["h"] || 22 > a && ["hh", a] || 1 === i && ["d"] || 25 >= i && ["dd", i] || 45 >= i && ["M"] || 345 > i && ["MM", j(i / 30)] || 1 === o && ["y"] || ["yy", o];
        return l[2] = t, l[3] = e > 0, l[4] = n, E.apply({}, l)
    }

    function S(e, t, n) {
        var s, r = n - t, a = n - e.day();
        return a > r && (a -= 7), r - 7 > a && (a += 7), s = N(e).add("d", a), {week: Math.ceil(s.dayOfYear() / 7), year: s.year()}
    }

    function I(e) {
        var t = e._i, n = e._f;
        return null === t || "" === t ? null : ("string" == typeof t && (e._i = t = f().preparse(t)), N.isMoment(t) ? (e = i({}, t), e._d = new Date(+t._d)) : n ? c(n) ? k(e) : x(e) : T(e), new r(e))
    }

    function M(e, t) {
        N.fn[e] = N.fn[e + "s"] = function (e) {
            var n = this._isUTC ? "UTC" : "";
            return null != e ? (this._d["set" + n + t](e), N.updateOffset(this), this) : this._d["get" + n + t]()
        }
    }

    function A(e) {
        N.duration.fn[e] = function () {
            return this._data[e]
        }
    }

    function z(e, t) {
        N.duration.fn["as" + e] = function () {
            return+this / t
        }
    }

    for (var N, P, L = "2.0.0", j = Math.round, O = {}, R = "undefined" != typeof module && module.exports, U = /^\/?Date\((\-?\d+)/i, F = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, Y = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, H = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, V = /\d\d?/, B = /\d{1,3}/, G = /\d{3}/, q = /\d{1,4}/, W = /[+\-]?\d{1,6}/, $ = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, K = /Z|[\+\-]\d\d:?\d\d/i, Z = /T/i, Q = /[\+\-]?\d+(\.\d{1,3})?/, J = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, X = "YYYY-MM-DDTHH:mm:ssZ", et = [
        ["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
        ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
        ["HH:mm", /(T| )\d\d:\d\d/],
        ["HH", /(T| )\d\d/]
    ], tt = /([\+\-]|\d\d)/gi, nt = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), st = {Milliseconds: 1, Seconds: 1e3, Minutes: 6e4, Hours: 36e5, Days: 864e5, Months: 2592e6, Years: 31536e6}, rt = {ms: "millisecond", s: "second", m: "minute", h: "hour", d: "day", w: "week", M: "month", y: "year"}, at = {}, it = "DDD w W M D d".split(" "), ot = "M D H h m s w W".split(" "), lt = {M: function () {
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
        return l(this.year() % 100, 2)
    }, YYYY: function () {
        return l(this.year(), 4)
    }, YYYYY: function () {
        return l(this.year(), 5)
    }, gg: function () {
        return l(this.weekYear() % 100, 2)
    }, gggg: function () {
        return this.weekYear()
    }, ggggg: function () {
        return l(this.weekYear(), 5)
    }, GG: function () {
        return l(this.isoWeekYear() % 100, 2)
    }, GGGG: function () {
        return this.isoWeekYear()
    }, GGGGG: function () {
        return l(this.isoWeekYear(), 5)
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
        return l(~~(this.milliseconds() / 10), 2)
    }, SSS: function () {
        return l(this.milliseconds(), 3)
    }, Z: function () {
        var e = -this.zone(), t = "+";
        return 0 > e && (e = -e, t = "-"), t + l(~~(e / 60), 2) + ":" + l(~~e % 60, 2)
    }, ZZ: function () {
        var e = -this.zone(), t = "+";
        return 0 > e && (e = -e, t = "-"), t + l(~~(10 * e / 6), 4)
    }, z: function () {
        return this.zoneAbbr()
    }, zz: function () {
        return this.zoneName()
    }, X: function () {
        return this.unix()
    }}; it.length;)P = it.pop(), lt[P + "o"] = n(lt[P], P);
    for (; ot.length;)P = ot.pop(), lt[P + P] = t(lt[P], 2);
    for (lt.DDDD = t(lt.DDD, 3), s.prototype = {set: function (e) {
        var t, n;
        for (n in e)t = e[n], "function" == typeof t ? this[n] = t : this["_" + n] = t
    }, _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), months: function (e) {
        return this._months[e.month()]
    }, _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), monthsShort: function (e) {
        return this._monthsShort[e.month()]
    }, monthsParse: function (e) {
        var t, n, s;
        for (this._monthsParse || (this._monthsParse = []), t = 0; 12 > t; t++)if (this._monthsParse[t] || (n = N([2e3, t]), s = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[t] = new RegExp(s.replace(".", ""), "i")), this._monthsParse[t].test(e))return t
    }, _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdays: function (e) {
        return this._weekdays[e.day()]
    }, _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysShort: function (e) {
        return this._weekdaysShort[e.day()]
    }, _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), weekdaysMin: function (e) {
        return this._weekdaysMin[e.day()]
    }, weekdaysParse: function (e) {
        var t, n, s;
        for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++)if (this._weekdaysParse[t] || (n = N([2e3, 1]).day(t), s = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[t] = new RegExp(s.replace(".", ""), "i")), this._weekdaysParse[t].test(e))return t
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
    }, _week: {dow: 0, doy: 6}}, N = function (e, t, n) {
        return I({_i: e, _f: t, _l: n, _isUTC: !1})
    }, N.utc = function (e, t, n) {
        return I({_useUTC: !0, _isUTC: !0, _l: n, _i: e, _f: t})
    }, N.unix = function (e) {
        return N(1e3 * e)
    }, N.duration = function (e, t) {
        var n, s, r = N.isDuration(e), i = "number" == typeof e, o = r ? e._data : i ? {} : e, l = F.exec(e);
        return i ? t ? o[t] = e : o.milliseconds = e : l && (n = "-" === l[1] ? -1 : 1, o = {y: 0, d: ~~l[2] * n, h: ~~l[3] * n, m: ~~l[4] * n, s: ~~l[5] * n, ms: ~~l[6] * n}), s = new a(o), r && e.hasOwnProperty("_lang") && (s._lang = e._lang), s
    }, N.version = L, N.defaultFormat = X, N.updateOffset = function () {
    }, N.lang = function (e, t) {
        return e ? (t ? p(e, t) : O[e] || f(e), N.duration.fn._lang = N.fn._lang = f(e), void 0) : N.fn._lang._abbr
    }, N.langData = function (e) {
        return e && e._lang && e._lang._abbr && (e = e._lang._abbr), f(e)
    }, N.isMoment = function (e) {
        return e instanceof r
    }, N.isDuration = function (e) {
        return e instanceof a
    }, N.fn = r.prototype = {clone: function () {
        return N(this)
    }, valueOf: function () {
        return+this._d + 6e4 * (this._offset || 0)
    }, unix: function () {
        return Math.floor(+this / 1e3)
    }, toString: function () {
        return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }, toDate: function () {
        return this._offset ? new Date(+this) : this._d
    }, toISOString: function () {
        return v(N(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }, toArray: function () {
        var e = this;
        return[e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds()]
    }, isValid: function () {
        return null == this._isValid && (this._isValid = this._a ? !h(this._a, (this._isUTC ? N.utc(this._a) : N(this._a)).toArray()) : !isNaN(this._d.getTime())), !!this._isValid
    }, utc: function () {
        return this.zone(0)
    }, local: function () {
        return this.zone(0), this._isUTC = !1, this
    }, format: function (e) {
        var t = v(this, e || N.defaultFormat);
        return this.lang().postformat(t)
    }, add: function (e, t) {
        var n;
        return n = "string" == typeof e ? N.duration(+t, e) : N.duration(e, t), u(this, n, 1), this
    }, subtract: function (e, t) {
        var n;
        return n = "string" == typeof e ? N.duration(+t, e) : N.duration(e, t), u(this, n, -1), this
    }, diff: function (e, t, n) {
        var s, r, a = this._isUTC ? N(e).zone(this._offset || 0) : N(e).local(), i = 6e4 * (this.zone() - a.zone());
        return t = d(t), "year" === t || "month" === t ? (s = 432e5 * (this.daysInMonth() + a.daysInMonth()), r = 12 * (this.year() - a.year()) + (this.month() - a.month()), r += (this - N(this).startOf("month") - (a - N(a).startOf("month"))) / s, "year" === t && (r /= 12)) : (s = this - a - i, r = "second" === t ? s / 1e3 : "minute" === t ? s / 6e4 : "hour" === t ? s / 36e5 : "day" === t ? s / 864e5 : "week" === t ? s / 6048e5 : s), n ? r : o(r)
    }, from: function (e, t) {
        return N.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t)
    }, fromNow: function (e) {
        return this.from(N(), e)
    }, calendar: function () {
        var e = this.diff(N().startOf("day"), "days", !0), t = -6 > e ? "sameElse" : -1 > e ? "lastWeek" : 0 > e ? "lastDay" : 1 > e ? "sameDay" : 2 > e ? "nextDay" : 7 > e ? "nextWeek" : "sameElse";
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
        return null != e ? "string" == typeof e && (e = this.lang().monthsParse(e), "number" != typeof e) ? this : (this._d["set" + t + "Month"](e), N.updateOffset(this), this) : this._d["get" + t + "Month"]()
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
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) > +N(e).startOf(t)
    }, isBefore: function (e, t) {
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) < +N(e).startOf(t)
    }, isSame: function (e, t) {
        return t = "undefined" != typeof t ? t : "millisecond", +this.clone().startOf(t) === +N(e).startOf(t)
    }, min: function (e) {
        return e = N.apply(null, arguments), this > e ? this : e
    }, max: function (e) {
        return e = N.apply(null, arguments), e > this ? this : e
    }, zone: function (e) {
        var t = this._offset || 0;
        return null == e ? this._isUTC ? t : this._d.getTimezoneOffset() : ("string" == typeof e && (e = _(e)), 16 > Math.abs(e) && (e = 60 * e), this._offset = e, this._isUTC = !0, t !== e && u(this, N.duration(t - e, "m"), 1, !0), this)
    }, zoneAbbr: function () {
        return this._isUTC ? "UTC" : ""
    }, zoneName: function () {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }, daysInMonth: function () {
        return N.utc([this.year(), this.month() + 1, 0]).date()
    }, dayOfYear: function (e) {
        var t = j((N(this).startOf("day") - N(this).startOf("year")) / 864e5) + 1;
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
    M("year", "FullYear"), N.fn.days = N.fn.day, N.fn.months = N.fn.month, N.fn.weeks = N.fn.week, N.fn.isoWeeks = N.fn.isoWeek, N.fn.toJSON = N.fn.toISOString, N.duration.fn = a.prototype = {weeks: function () {
        return o(this.days() / 7)
    }, valueOf: function () {
        return this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * ~~(this._months / 12)
    }, humanize: function (e) {
        var t = +this, n = C(t, !e, this.lang());
        return e && (n = this.lang().pastFuture(t, n)), this.lang().postformat(n)
    }, add: function (e, t) {
        var n = N.duration(e, t);
        return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, this
    }, subtract: function (e, t) {
        var n = N.duration(e, t);
        return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, this
    }, get: function (e) {
        return e = d(e), this[e.toLowerCase() + "s"]()
    }, as: function (e) {
        return e = d(e), this["as" + e.charAt(0).toUpperCase() + e.slice(1) + "s"]()
    }, lang: N.fn.lang};
    for (P in st)st.hasOwnProperty(P) && (z(P, st[P]), A(P.toLowerCase()));
    z("Weeks", 6048e5), N.duration.fn.asMonths = function () {
        return(+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, N.lang("en", {ordinal: function (e) {
        var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
        return e + n
    }}), R && (module.exports = N), "undefined" == typeof ender && (this.moment = N), "function" == typeof define && define.amd && define("moment", [], function () {
        return N
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