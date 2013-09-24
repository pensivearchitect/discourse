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
    var s = e.getDay(), r = e.getDate(), a = e.getFullYear(), i = e.getMonth() + 1, o = e.getHours(), u = o, l = o > 11 ? 1 : 0, c = e.getSeconds(), h = e.getMinutes(), d = e.getTimezoneOffset(), p = Math.floor(Math.abs(d / 60)), f = Math.abs(d) - 60 * p, m = (d > 0 ? "-" : "+") + (2 > p.toString().length ? "0" + p : p) + (2 > f.toString().length ? "0" + f : f);
    u > 12 ? u -= 12 : 0 === u && (u = 12);
    var g = function (e) {
        var t = "0" + e.toString();
        return t.substr(t.length - 2)
    }, v = t;
    return v = v.replace("%a", n.abbr_day_names[s]), v = v.replace("%A", n.day_names[s]), v = v.replace("%b", n.abbr_month_names[i]), v = v.replace("%B", n.month_names[i]), v = v.replace("%d", g(r)), v = v.replace("%e", r), v = v.replace("%-d", r), v = v.replace("%H", g(o)), v = v.replace("%-H", o), v = v.replace("%I", g(u)), v = v.replace("%-I", u), v = v.replace("%m", g(i)), v = v.replace("%-m", i), v = v.replace("%M", g(h)), v = v.replace("%-M", h), v = v.replace("%p", n.meridian[l]), v = v.replace("%S", g(c)), v = v.replace("%-S", c), v = v.replace("%w", s), v = v.replace("%y", g(a)), v = v.replace("%-y", g(a).replace(/^0+/, "")), v = v.replace("%Y", a), v = v.replace("%z", m)
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
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, MessageFormat = {locale: {}}, MessageFormat.locale.zh_CN = function () {
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
}({}), I18n.translations = {zh_CN: {js: {dates: {short_date_no_year: "D MMM", short_date: "D MMM, YYYY", long_date: "MMMM D, YYYY h:mma", tiny: {half_a_minute: "刚刚", less_than_x_seconds: {one: "< 1秒", other: "< %{count}秒"}, x_seconds: {one: "1秒", other: "%{count}秒"}, less_than_x_minutes: {one: "< 1分钟", other: "< %{count}分钟"}, x_minutes: {one: "1分钟", other: "%{count}分钟"}, about_x_hours: {one: "1小时", other: "%{count}小时"}, x_days: {one: "1天", other: "%{count}天"}, about_x_months: {one: "1个月", other: "%{count}个月"}, x_months: {one: "1个月", other: "%{count}个月"}, about_x_years: {one: "1年", other: "%{count}年"}, over_x_years: {one: "> 1年", other: "> %{count}年"}, almost_x_years: {one: "1年", other: "%{count}年"}}, medium: {x_minutes: {one: "1分钟", other: "%{count}分钟"}, x_hours: {one: "1小时", other: "%{count}小时"}, x_days: {one: "1天", other: "%{count}天"}}, medium_with_ago: {x_minutes: {one: "1分钟前", other: "%{count}分钟前"}, x_hours: {one: "1小时之前", other: "%{count}小时之前"}, x_days: {one: "1天前", other: "%{count}天前"}}}, share: {topic: "分享一个到本主题的链接", post: "分享一个到本帖的链接", close: "关闭", twitter: "分享这个链接到 Twitter", facebook: "分享这个链接到 Facebook", "google+": "分享这个链接到 Google+", email: "用电子邮件发送这个链接"}, edit: "编辑本主题的标题和分类", not_implemented: "非常抱歉，此功能暂时尚未实现！", no_value: "否", yes_value: "是", of_value: "之于", generic_error: "抱歉，发生了一个错误。", log_in: "登录", age: "寿命", last_post: "最后一帖", admin_title: "管理员", flags_title: "投诉", show_more: "显示更多", links: "链接", faq: "常见问答（FAQ）", you: "你", or: "或", now: "刚刚", read_more: "阅读更多", in_n_seconds: {one: "一秒内", other: "{{count}}秒内"}, in_n_minutes: {one: "一分钟内", other: "{{count}}分钟内"}, in_n_hours: {one: "一小时内", other: "{{count}}小时内"}, in_n_days: {one: "一天内", other: "{{count}}天内"}, suggested_topics: {title: "推荐主题"}, bookmarks: {not_logged_in: "抱歉，要给帖子加书签，你必须先登录。", created: "你给此帖的书签已加上。", not_bookmarked: "你已经阅读过此帖，点此给它加上书签。", last_read: "这是你阅读过的最后一帖。"}, new_topics_inserted: "{{count}} 个新主题。", show_new_topics: "点此显示。", preview: "预览", cancel: "取消", save: "保存修改", saving: "保存中……", saved: "已保存！", choose_topic: {none_found: "没有找到主题", title: {search: "通过名称、url或者id，搜索主题：", placeholder: "在此输入主题标题"}}, user_action: {user_posted_topic: "<a href='{{userUrl}}'>{{user}}</a> 发起 <a href='{{topicUrl}}'>本主题</a>", you_posted_topic: "<a href='{{userUrl}}'>你</a> 发起 <a href='{{topicUrl}}'>本主题</a>", user_replied_to_post: "<a href='{{userUrl}}'>{{user}}</a> 回复 <a href='{{postUrl}}'>{{post_number}}</a>", you_replied_to_post: "<a href='{{userUrl}}'>你</a> 回复 <a href='{{postUrl}}'>{{post_number}}</a>", user_replied_to_topic: "<a href='{{userUrl}}'>{{user}}</a> 回复 <a href='{{topicUrl}}'>本主题</a>", you_replied_to_topic: "<a href='{{userUrl}}'>你</a> 回复 <a href='{{topicUrl}}'>本主题</a>", user_mentioned_user: "<a href='{{user1Url}}'>{{user}}</a> 提到 <a href='{{user2Url}}'>{{another_user}}</a>", user_mentioned_you: "<a href='{{user1Url}}'>{{user}}</a> 提到 <a href='{{user2Url}}'>你</a>", you_mentioned_user: "<a href='{{user1Url}}'>你</a> 提到 <a href='{{user2Url}}'>{{user}}</a>", posted_by_user: "发起人 <a href='{{userUrl}}'>{{user}}</a>", posted_by_you: "发起人 <a href='{{userUrl}}'>你</a>", sent_by_user: "发送人 <a href='{{userUrl}}'>{{user}}</a>", sent_by_you: "发送人 <a href='{{userUrl}}'>你</a>"}, user_action_groups: {1: "给出的赞", 2: "收到的赞", 3: "书签", 4: "主题", 5: "回复", 6: "回应", 7: "提到", 9: "引用", 10: "喜爱", 11: "编辑", 12: "发送条目", 13: "收件箱"}, user: {profile: "介绍信息", title: "用户", mute: "防打扰", edit: "修改参数", download_archive: "下载我的帖子的存档", private_message: "私信", private_messages: "消息", activity_stream: "活动", preferences: "设置", bio: "关于我", invited_by: "邀请者为", trust_level: "用户级别", external_links_in_new_tab: "始终在新的标签页打开外部链接", enable_quoting: "在高亮选择文字时启用引用回复", moderator: "{{user}} 是版主", admin: "{{user}} 是管理员", change_password: {action: "修改", success: "（电子邮件已发送）", in_progress: "（正在发送电子邮件）", error: "（错误）"}, change_username: {action: "修改", title: "修改用户名", confirm: "修改你的用户名可能会导致一些相关后果，你真的确定要这么做么？", taken: "抱歉此用户名已经有人使用了。", error: "在修改你的用户名时发生了错误。", invalid: "此用户名不合法，用户名只能包含字母和数字"}, change_email: {action: "修改", title: "修改电子邮箱", taken: "抱歉此电子邮箱不可用。", error: "抱歉在修改你的电子邮箱时发生了错误，可能此邮箱已经被使用了？", success: "我们发送了一封确认信到此邮箱地址，请按照邮箱内指示完成确认。"}, email: {title: "电子邮箱", instructions: "你的电子邮箱绝不会公开给他人。", ok: "不错哦，我们会发送电子邮件让你确认。", invalid: "请填写正确的电子邮箱地址。", authenticated: "你的电子邮箱已经被 {{provider}} 确认有效。", frequency: "只有当你最近一段时间没有访问时，我们才会把你未读过的内容发送到你的电子邮箱。"}, name: {title: "名字", instructions: "你的名字，不要求独一无二（可以与他人的名字重复）。用于在@name匹配你时参考，只在你的用户页面显示。", too_short: "你设置的名字太短了。", ok: "你的名字符合要求。"}, username: {title: "用户名", instructions: "必须是独一无二的，中间不能有空格。其他人可以使用 @{{username}} 来提及你。", short_instructions: "其他人可以用 @{{username}} 来提及你。", available: "你的用户名可用。", global_match: "电子邮箱与注册用户名相匹配。", global_mismatch: "已被人注册。试试 {{suggestion}} ？", not_available: "不可用。试试 {{suggestion}} ？", too_short: "你设置的用户名太短了。", too_long: "你设置的用户名太长了。", checking: "查看用户名是否可用……", enter_email: "找到用户名，请输入对应电子邮箱。"}, password_confirmation: {title: "请再次输入密码"}, last_posted: "最后一帖", last_emailed: "最后一次邮寄", last_seen: "最后一次见到", created: "创建时间", log_out: "登出", website: "网站", email_settings: "电子邮箱", email_digests: {title: "当我不访问此站时，向我的邮箱发送最新摘要", daily: "每天", weekly: "每周", bi_weekly: "每两周"}, email_direct: "当有人引用你、回复你或提及你 @username 时发送一封邮件给你", email_private_messages: "当有人给你发私信时发送一封邮件给你", other_settings: "其它", new_topic_duration: {label: "认为主题是新主题，当", not_viewed: "我还没有浏览它们", last_here: "它们是在我最近一次访问这里之后发表的", after_n_days: {one: "它们是昨天发表的", other: "它们是之前 {{count}} 天发表的"}, after_n_weeks: {one: "它们是上周发表的", other: "它们是之前 {{count}} 周发表的"}}, auto_track_topics: "自动追踪我进入的主题", auto_track_options: {never: "从不", always: "始终", after_n_seconds: {one: "1 秒之后", other: "{{count}} 秒之后"}, after_n_minutes: {one: "1 分钟之后", other: "{{count}} 分钟之后"}}, invited: {title: "邀请", user: "邀请用户", none: "{{username}} 尚未邀请任何用户到本站。", redeemed: "确认邀请", redeemed_at: "确认时间", pending: "待定邀请", topics_entered: "已进入的主题", posts_read_count: "已阅的帖子", rescind: "删除邀请", rescinded: "邀请已删除", time_read: "阅读时间", days_visited: "访问天数", account_age_days: "帐号存在天数"}, password: {title: "密码", too_short: "你设置的密码太短了。", ok: "你设置的密码符合要求。"}, ip_address: {title: "最后使用的IP地址"}, avatar: {title: "头像", instructions: "我们目前使用 <a href='https://gravatar.com' target='_blank'>Gravatar</a> 来基于你的邮箱生成头像"}, filters: {all: "全部"}, stream: {posted_by: "发帖人", sent_by: "发送时间", private_message: "私信", the_topic: "本主题"}}, loading: "载入中……", close: "关闭", learn_more: "了解更多……", year: "年", year_desc: "365天以前发表的主题", month: "月", month_desc: "30天以前发表的主题", week: "周", week_desc: "7天以前发表的主题", first_post: "第一帖", mute: "防打扰", unmute: "解除防打扰", best_of: {title: "优秀", enabled_description: "你现在正在浏览本主题的“优秀”视图。", description: "此主题中有 <b>{{count}}</b> 个帖子，是不是有点多哦！你愿意切换到只显示最多交互和回复的帖子视图么？", enable: "切换到“优秀”视图", disable: "取消“优秀”"}, private_message_info: {title: "私下交流", invite: "邀请其他人……"}, email: "电子邮箱", username: "用户名", last_seen: "最后一次见到", created: "创建时间", trust_level: "用户级别", create_account: {title: "创建帐号", action: "现在就创建一个！", invite: "还没有帐号吗？", failed: "出问题了，有可能这个电子邮箱已经被注册了。试试忘记密码链接"}, forgot_password: {title: "忘记密码", action: "我忘记了我的密码", invite: "输入你的用户名和电子邮箱地址，我们会发送密码重置邮件给你。", reset: "重置密码", complete: "你很快会收到一封电子邮件，告诉你如何重置密码。"}, login: {title: "登录", username: "登录", password: "密码", email_placeholder: "电子邮箱地址或用户名", error: "未知错误", reset_password: "重置密码", logging_in: "登录中……", or: "或", authenticating: "验证中……", awaiting_confirmation: "你的帐号尚未激活，点击忘记密码链接来重新发送激活邮件。", awaiting_approval: "你的帐号尚未被论坛版主批准。一旦你的帐号获得批准，你会收到一封电子邮件。", not_activated: "你还不能登录。我们之前在<b>{{sentTo}}</b>发送了一封激活邮件给你。请按照邮件中的介绍来激活你的帐号。", resend_activation_email: "点击此处来重新发送激活邮件。", sent_activation_email_again: "我们在<b>{{currentEmail}}</b>又发送了一封激活邮件给你，邮件送达可能需要几分钟，有的电子邮箱服务商可能会认为此邮件为垃圾邮件，请检查一下你邮箱的垃圾邮件文件夹。", google: {title: "使用谷歌帐号登录", message: "使用谷歌（Google）帐号验证登录（请确保没有禁止浏览器弹出对话框）"}, twitter: {title: "使用推特帐号登录", message: "使用推特（Twitter）帐号验证登录（请确保没有禁止浏览器弹出对话框）"}, facebook: {title: "使用脸书帐号登录", message: "使用脸书（Facebook）帐号验证登录（请确保没有禁止浏览器弹出对话框）"}, yahoo: {title: "使用雅虎帐号登录", message: "使用雅虎（Yahoo）帐号验证登录（请确保没有禁止浏览器弹出对话框）"}, github: {title: "使用 GitHub 帐号登录", message: "使用 GitHub 帐号验证登录（请确保没有禁止浏览器弹出对话框）"}, persona: {title: "使用 Persona 帐号登录", message: "使用 Mozilla Persona 帐号验证登录（请确保没有禁止浏览器弹出对话框）"}}, composer: {posting_not_on_topic: '你正在回复主题 "{{title}}"，但是当前你正在浏览的是另外一个主题。', saving_draft_tip: "保存中", saved_draft_tip: "已保存", saved_local_draft_tip: "已本地保存", similar_topics: "你的主题与此有些类似...", drafts_offline: "离线草稿", min_length: {need_more_for_title: "请给标题再输入至少 {{n}} 个字符", need_more_for_reply: "请给正文内容再输入至少 {{n}} 个字符"}, save_edit: "保存编辑", reply_original: "回复原始帖", reply_here: "在此回复", reply: "回复", cancel: "取消", create_topic: "创建主题", create_pm: "创建私信", users_placeholder: "添加一个用户", title_placeholder: "在此输入你的标题，简明扼要的用一句话说明讨论的内容。", reply_placeholder: "在此输入你的内容。你可以使用 Markdown（参考 http://wowubuntu.com/markdown/） 或 BBCode（参考 http://www.bbcode.org/reference.php） 来格式化内容。拖拽或粘贴一幅图片到这儿即可将它上传。", view_new_post: "浏览你的新帖子。", saving: "保存中……", saved: "已保存！", saved_draft: "你有一个帖子草稿尚发表。在框中任意处点击即可接着编辑。", uploading: "上传中……", show_preview: "显示预览 &raquo;", hide_preview: "&laquo; 隐藏预览", quote_post_title: "引用整个帖子", bold_title: "加粗", bold_text: "加粗文字", italic_title: "斜体", italic_text: "斜体文字", link_title: "链接", link_description: "在此输入链接描述", link_dialog_title: "插入链接", link_optional_text: "可选标题", quote_title: "引用", quote_text: "引用", code_title: "代码", code_text: "在此输入代码", image_title: "图片", image_description: "在此输入图片描述", image_dialog_title: "插入图片", image_optional_text: "可选标题", image_hosting_hint: "需要 <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>免费图片存储？</a>", olist_title: "数字列表", ulist_title: "符号列表", list_item: "列表条目", heading_title: "标题", heading_text: "标题头", hr_title: "分割线", undo_title: "撤销", redo_title: "重做", help: "Markdown 编辑帮助", toggler: "隐藏或显示编辑面板", admin_options_title: "本主题可选设置", auto_close_label: "自动关闭主题，过：", auto_close_units: "天"}, notifications: {title: "使用 @name 提及到你，回复你的帖子和主题，私信等等的通知消息", none: "你当前没有任何通知。", more: "浏览以前的通知", mentioned: "<span title='mentioned' class='icon'>@</span> {{username}} {{link}}", quoted: "<i title='quoted' class='icon icon-quote-right'></i> {{username}} {{link}}", replied: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", posted: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", edited: "<i title='edited' class='icon icon-pencil'></i> {{username}} {{link}}", liked: "<i title='liked' class='icon icon-heart'></i> {{username}} {{link}}", private_message: "<i class='icon icon-envelope-alt' title='私信'></i> {{username}} 发送给你一条私信：{{link}}", invited_to_private_message: "{{username}} 邀请你进行私下交流：{{link}}", invitee_accepted: "<i title='已接受你的邀请' class='icon icon-signin'></i> {{username}} 已接受你的邀请", moved_post: "<i title='移动帖子' class='icon icon-arrow-right'></i> {{username}} 已将帖子移动到 {{link}}", total_flagged: "被投诉帖子的总数"}, image_selector: {title: "插入图片", from_my_computer: "来自我的设备", from_the_web: "来自网络", add_image: "添加图片", remote_title: "网络图片", remote_tip: "输入图片网络，格式为：http://example.com/image.jpg", local_title: "本地图片", local_tip: "点击从你的设备中选择一张图片。", upload: "上传", uploading_image: "上传图片中"}, search: {title: "搜索主题、帖子、用户或分类", placeholder: "在此输入你的搜索条件", no_results: "没有找到结果。", searching: "搜索中……"}, site_map: "去另一个主题列表或分类", go_back: "返回", current_user: "去你的用户页面", favorite: {title: "收藏", help: {star: "将此主题加入你的收藏列表", unstar: "将此主题从你的收藏列表中移除"}}, topics: {none: {favorited: "你尚未收藏任何主题。要收藏一个主题，点击标题旁的星星图标。", unread: "你没有未阅主题。", "new": "你没有新主题可读。", read: "你尚未阅读任何主题。", posted: "你尚未在任何主题中发帖。", latest: "伤心啊，没有主题。", hot: "没有热门主题。", category: "没有 {{category}} 分类的主题。"}, bottom: {latest: "没有更多主题可看了。", hot: "没有更多热门主题可看了。", posted: "没有更多已发布主题可看了。", read: "没有更多已阅主题可看了。", "new": "没有更多新主题可看了。", unread: "没有更多未阅主题可看了。", favorited: "没有更多收藏主题可看了。", category: "没有更多 {{category}} 分类的主题了。"}}, rank_details: {toggle: "切换主题排名详细", show: "显示主题排名详细信息", title: "主题排名详细"}, topic: {create_in: "创建一个 {{categoryName}} 分类的主题", create: "创建主题", create_long: "创建一个新主题", private_message: "开启一段私下交流", list: "主题", "new": "新主题", title: "主题", loading_more: "载入更多主题中……", loading: "载入主题中……", invalid_access: {title: "这是私密主题", description: "抱歉，你没有访问此主题的权限！"}, server_error: {title: "载入主题失败", description: "抱歉，无法载入此主题。有可能是网络连接问题导致的，请重试。如果问题始终存在，请告诉我们。"}, not_found: {title: "未找到主题", description: "抱歉，无法找到此主题。有可能它被论坛版主删掉了？"}, unread_posts: "此主题中你有 {{unread}} 个帖子未阅", new_posts: "从你最近一次阅读此主题后，又有 {{new_posts}} 个新帖子发表", likes: {one: "此主题得到了一个赞", other: "此主题得到了 {{count}} 个赞"}, back_to_list: "返回主题列表", options: "主题选项", show_links: "显示此主题中的链接", toggle_information: "切换主题详细", read_more_in_category: "想阅读更多内容？浏览 {{catLink}} 或 {{latestLink}} 里的其它主题。", read_more: "想阅读更多内容？{{catLink}} 或 {{latestLink}}。", browse_all_categories: "浏览所有分类", view_latest_topics: "浏览热门主题", suggest_create_topic: "这就创建一个主题吧！", read_position_reset: "你的阅读位置已经被重置。", jump_reply_up: "跳转至更早的回复", jump_reply_down: "跳转至更晚的回复", deleted: "此主题已被删除", auto_close_notice: "本主题将在%{timeLeft}后自动关闭", auto_close_title: "自动关闭设置", auto_close_save: "保存", auto_close_cancel: "取消", auto_close_remove: "不自动关闭该主题", progress: {title: "主题进度", jump_top: "跳转到第一帖", jump_bottom: "跳转到最后一帖", total: "全部帖子", current: "当前帖"}, notifications: {title: "", reasons: {"3_2": "因为你在关注此主题，所以你将收到相关通知。", "3_1": "因为你创建了此主题，所以你将收到相关通知。", 3: "因为你在关注此主题，所以你将收到相关通知。", "2_4": "因为你在此主题内发表了回复，所以你将收到相关通知。", "2_2": "因为你在追踪此主题，所以你将收到相关通知。", 2: '因为你<a href="/users/{{username}}/preferences">阅读了此主题</a>，所以你将收到相关通知。', 1: "因为有人 @name 提及了你或回复了你的帖子，所以你将收到相关通知。", "1_2": "仅当有人 @name 提及了你或回复了你的帖子，你才会收到相关通知。", 0: "你将忽略关于此主题的所有通知。", "0_2": "你将忽略关于此主题的所有通知。"}, watching: {title: "关注", description: "与追踪一样，额外的是一旦有新帖子发表，你都会收到通知。"}, tracking: {title: "追踪", description: "关于你的未阅帖子、@name 提及与对你的帖子的回复，你都会收到通知。"}, regular: {title: "常规", description: "只有当有人 @name 提及你或者回复你的帖子时，你才会收到通知。"}, muted: {title: "防打扰", description: "你不会收到关于此主题的任何通知，也不会在你的未阅选项卡中显示。"}}, actions: {"delete": "删除主题", open: "打开主题", close: "关闭主题", auto_close: "自动关闭", unpin: "解除主题置顶", pin: "置顶主题", unarchive: "解除主题存档", archive: "存档主题", invisible: "使不可见", visible: "使可见", reset_read: "重置阅读数据", multi_select: "选择将被合并/拆分的帖子", convert_to_topic: "转换到常规主题"}, reply: {title: "回复", help: "开始给本主题撰写回复"}, clear_pin: {title: "清除置顶", help: "将本主题的置顶状态清除，这样它将不再始终显示在主题列表顶部"}, share: {title: "分享", help: "分享一个到本帖的链接"}, inviting: "邀请中……", invite_private: {title: "邀请进行私下交流", email_or_username: "受邀人的电子邮箱或用户名", email_or_username_placeholder: "电子邮箱地址或用户名", action: "邀请", success: "谢谢！我们已经邀请该用户参与此私下交流。", error: "抱歉，在邀请该用户时发生了错误。"}, invite_reply: {title: "邀请朋友来回复", action: "邮件邀请", help: "向你的朋友发送邀请，他们只需要一个点击就能回复这个主题", email: "我们会给你的朋友发送一封邮件，他们只需要点击其中的一个链接就可以回复这个主题了。", email_placeholder: "电子邮箱地址", success: "谢谢！我们已发送一个邀请邮件到<b>{{email}}</b>。当他们确认的时候我们会通知你。你也可以在你的用户页面的邀请选项卡下查看邀请状态。", error: "抱歉，我们不能邀请此人，可能他/她已经是本站用户了？"}, login_reply: "登录来回复", filters: {user: "你在浏览 {{n_posts}} {{by_n_users}}.", n_posts: {one: "一个帖子", other: "{{count}} 帖子"}, by_n_users: {one: "一个指定用户", other: "{{count}} 个用户中的"}, best_of: "你在浏览 {{n_best_posts}} {{of_n_posts}}.", n_best_posts: {one: "一个优秀帖子", other: "{{count}} 优秀帖子"}, of_n_posts: {one: "一个帖子中的", other: "{{count}} 个帖子中的"}, cancel: "再次显示本主题下的所有帖子。"}, split_topic: {title: "拆分主题", action: "拆分主题", topic_name: "新主题名：", error: "拆分主题时发生错误。", instructions: {one: "你想如何移动该帖？", other: "你想如何移动你所选择的这{{count}}篇帖子？"}}, merge_topic: {title: "合并主题", action: "合并主题", error: "合并主题时发生错误。", instructions: {one: "请选择你想将那篇帖子移至其下的主题。", other: "请选择你想将那{{count}}篇帖子移至其下的主题。"}}, multi_select: {select: "选择", selected: "已选择（{{count}}）", "delete": "删除所选", cancel: "取消选择", description: {one: "你已选择了<b>一个</b>帖子。", other: "你已选择了<b>{{count}}</b>个帖子。"}}}, post: {reply: "回复 {{replyAvatar}} {{username}} 发表的 {{link}}", reply_topic: "回复 {{link}}", quote_reply: "引用回复", edit: "编辑 {{link}}", post_number: "帖子 {{number}}", in_reply_to: "回复给", reply_as_new_topic: "回复为新主题", continue_discussion: "从 {{postLink}} 继续讨论：", follow_quote: "跳转至所引用的帖子", deleted_by_author: "（作者删除了帖子）", expand_collapse: "展开/收缩", has_replies: {one: "回复", other: "回复"}, errors: {create: "抱歉，在创建你的帖子时发生了错误。请重试。", edit: "抱歉，在编辑你的帖子时发生了错误。请重试。", upload: "抱歉，在上传文件时发生了错误。请重试。", upload_too_large: "抱歉，你上传的文件太大了（最大不能超过 {{max_size_kb}}kb），请调整文件大小后重新上传。", too_many_uploads: "抱歉, 你只能一次上传一张图片。"}, abandon: "你确定要丢弃你的帖子吗？", archetypes: {save: "保存选项"}, controls: {reply: "开始给本帖撰写回复", like: "赞本帖", edit: "编辑本帖", flag: "投诉本帖以提醒论坛版主", "delete": "删除本帖", undelete: "恢复本帖", share: "分享一个到本帖的链接", more: "更多"}, actions: {flag: "投诉", clear_flags: {one: "清除投诉", other: "清除投诉"}, it_too: {off_topic: "也投诉", spam: "也投诉", inappropriate: "也投诉", custom_flag: "也投诉", bookmark: "也做书签", like: "也赞它", vote: "也对它投票"}, undo: {off_topic: "撤销投诉", spam: "撤销投诉", inappropriate: "撤销投诉", bookmark: "撤销书签", like: "撤销赞", vote: "撤销投票"}, people: {off_topic: "{{icons}} 投诉它偏离主题", spam: "{{icons}} 投诉它为垃圾信息", inappropriate: "{{icons}} 投诉它为不当内容", notify_moderators: "{{icons}} 向版主投诉它", notify_moderators_with_url: "{{icons}} <a href='{{postUrl}}'>通知了版主</a>", notify_user: "{{icons}} 发起了一个私下交流", notify_user_with_url: "{{icons}} 发送了一条<a href='{{postUrl}}'>私有消息</a>", bookmark: "{{icons}} 对它做了书签", like: "{{icons}} 赞了它", vote: "{{icons}} 对它投票"}, by_you: {off_topic: "你投诉它偏离主题", spam: "你投诉它为垃圾信息", inappropriate: "你投诉它为不当内容", notify_moderators: "你向版主投诉了它", notify_user: "你对该用户发起了一个私下交流", bookmark: "你对该帖做了书签", like: "你赞了它", vote: "你对该帖投了票"}, by_you_and_others: {off_topic: {one: "你和另一个用户投诉它偏离主题", other: "你和其他 {{count}} 个用户投诉它偏离主题"}, spam: {one: "你和另一个用户投诉它为垃圾信息", other: "你和其他 {{count}} 个用户投诉它为垃圾信息"}, inappropriate: {one: "你和另一个用户投诉它为不当内容", other: "你和其他 {{count}} 个用户投诉它为不当内容"}, notify_moderators: {one: "你和另一个用户向版主投诉了它", other: "你和其他 {{count}} 个用户向版主投诉了它"}, notify_user: {one: "你和另一个用户对该用户发起了一个私下交流", other: "你和其他 {{count}} 个用户对该用户发起了一个私下交流"}, bookmark: {one: "你和另一个用户对该帖做了书签", other: "你和其他 {{count}} 个用户对该帖做了书签"}, like: {one: "你和另一个用户赞了它", other: "你和其他 {{count}} 个用户赞了它"}, vote: {one: "你和另一个用户对该帖投了票", other: "你和其他 {{count}} 个用户对该帖投了票"}}, by_others: {off_topic: {one: "一个用户投诉它偏离主题", other: "{{count}} 个用户投诉它偏离主题"}, spam: {one: "一个用户投诉它为垃圾信息", other: "{{count}} 个用户投诉它为垃圾信息"}, inappropriate: {one: "一个用户投诉它为不当内容", other: "{{count}} 个用户投诉它为不当内容"}, notify_moderators: {one: "一个用户向版主投诉了它", other: "{{count}} 个用户向版主投诉了它"}, notify_user: {one: "一个用户对该用户发起了一个私下交流", other: "{{count}} 个用户对该用户发起了一个私下交流"}, bookmark: {one: "一个用户对该帖做了书签", other: "{{count}} 个用户对该帖做了书签"}, like: {one: "一个用户赞了它", other: "{{count}} 个用户赞了它"}, vote: {one: "一个用户对该帖投了票", other: "{{count}} 个用户对该帖投了票"}}}, edits: {one: "一次编辑", other: "{{count}}次编辑", zero: "未编辑"}, "delete": {confirm: {one: "你确定要删除此帖吗？", other: "你确定要删除这些帖子吗？"}}}, category: {none: "（未分类）", edit: "编辑", edit_long: "编辑分类", edit_uncategorized: "编辑未分类的", view: "浏览分类下的主题", general: "通常", settings: "设置", "delete": "删除分类", create: "创建分类", save: "保存分类", creation_error: "创建此分类时发生了错误。", save_error: "在保存此分类时发生了错误。", more_posts: "浏览全部 {{posts}} ……", name: "分类名称", description: "描述", topic: "分类主题", badge_colors: "徽章颜色", background_color: "背景色", foreground_color: "前景色", name_placeholder: "应该简明扼要。", color_placeholder: "任何网络色彩", delete_confirm: "你确定要删除此分类吗？", delete_error: "在删除此分类时发生了错误。", list: "列出分类", no_description: "本分类没有描述信息。", change_in_category_topic: "访问分类主题来编辑描述信息", hotness: "热度", already_used: "此色彩已经被另一个分类使用", is_secure: "安全类型？", add_group: "添加分组", security: "安全", allowed_groups: "授权的分组：", auto_close_label: "自动关闭主题，过："}, flagging: {title: "为何要给投诉本帖？", action: "投诉帖子", notify_action: "通知", cant: "抱歉，当前你不能投诉本帖。", custom_placeholder_notify_user: "为何你要私下联系该用户？", custom_placeholder_notify_moderators: "为何本帖需要论坛版主的关注？为何本帖需要论坛版主的关注？", custom_message: {at_least: "输入至少 {{n}} 个字符", more: "还差 {{n}} 个……", left: "还剩下 {{n}}"}}, topic_summary: {title: "主题概要", links_shown: "显示所有 {{totalLinks}} 个链接……", clicks: "点击", topic_link: "主题链接"}, topic_statuses: {locked: {help: "本主题已关闭，不再接受新的回复"}, pinned: {help: "本主题已置顶，它将始终显示在它所属分类的顶部"}, archived: {help: "本主题已归档，即已经冻结，无法修改"}, invisible: {help: "本主题不可见，它将不被显示在主题列表中，只能通过一个直接链接来访问"}}, posts: "帖子", posts_long: "本主题有 {{number}} 个帖子", original_post: "原始帖", views: "浏览", replies: "回复", views_long: "本主题已经被浏览过 {{number}} 次", activity: "活动", likes: "赞", top_contributors: "参与者", category_title: "分类", history: "历史", changed_by: "由 {{author}}", categories_list: "分类列表", filters: {latest: {title: "最新", help: "最新发布的帖子"}, hot: {title: "热门", help: "最近最受欢迎的主题"}, favorited: {title: "收藏", help: "你收藏的主题"}, read: {title: "已阅", help: "你已经阅读过的主题"}, categories: {title: "分类", title_in: "分类 - {{categoryName}}", help: "归属于不同分类的所有主题"}, unread: {title: {zero: "未阅", one: "1个未阅主题", other: "{{count}}个未阅主题"}, help: "追踪的主题中有未阅帖子的主题"}, "new": {title: {zero: "新主题", one: "新主题（1）", other: "新主题（{{count}}）"}, help: "你最近一次访问后的新主题，以及你追踪的主题中有新帖子的主题"}, posted: {title: "我的帖子", help: "你发表过帖子的主题"}, category: {title: {zero: "{{categoryName}}", one: "{{categoryName}}（1）", other: "{{categoryName}}（{{count}}）"}, help: "在 {{categoryName}} 分类中热门的主题"}}, browser_update: '抱歉, <a href="http://www.iteriter.com/faq/#browser">你的浏览器版本太低，推荐使用Chrome</a>. 请 <a href="http://www.google.com/chrome/">升级你的浏览器</a>。', type_to_filter: "输入过滤条件……", admin: {title: "论道 管理", moderator: "版主", dashboard: {title: "管理面板", version: "安装的版本", up_to_date: "你正在运行最新的论坛版本。", critical_available: "有一个关键更新可用。", updates_available: "目前有可用更新。", please_upgrade: "请升级！", installed_version: "已安装", latest_version: "最新版本", problems_found: "你安装的论坛目前有以下问题：", last_checked: "上次检查", refresh_problems: "刷新", no_problems: "找不到问题.", moderators: "版主：", admins: "管理员：", blocked: "被封禁:", private_messages_short: "私信", private_messages_title: "私密信息", reports: {today: "今天", yesterday: "昨天", last_7_days: "7 天以内", last_30_days: "30 天以内", all_time: "所有时间内", "7_days_ago": "7 天之前", "30_days_ago": "30 天之前", all: "全部", view_table: "以表格展示", view_chart: "以柱状图展示"}}, commits: {latest_changes: "最后的改动: 请经常升级！", by: "来自"}, flags: {title: "投诉", old: "过去的", active: "活跃的", clear: "清除投诉", clear_title: "撤销本帖的所有投诉（已隐藏的帖子将会被取消隐藏）", "delete": "删除帖子", delete_title: "删除帖子（如果它是主题第一帖，那么将删除主题）", flagged_by: "投诉者为", error: "出错了", view_message: "查看消息", no_results: "没有投诉"}, groups: {title: "群组", edit: "编辑群组", selector_placeholder: "添加用户", name_placeholder: "组名，不能含有空格，与用户名规则一致"}, api: {title: "应用开发接口（API）", long_title: "API信息", key: "密钥", generate: "生成API密钥", regenerate: "重新生成API密钥", info_html: "API密钥可以用来通过JSON调用创建和更新主题。", note_html: "请<strong>安全的</strong>保管好本密钥，任何拥有该密钥的用户可以使用它以论坛任何用户的名义来发帖。"}, customize: {title: "定制", long_title: "站点定制", header: "头部", css: "层叠样式表（CSS）", override_default: "覆盖缺省值？", enabled: "启用？", preview: "预览", undo_preview: "撤销预览", save: "保存", "new": "新建", new_style: "新样式", "delete": "删除", delete_confirm: "删除本定制内容？", about: "站点定制允许你修改样式表和站点头部。选择或者添加一个来开始编辑。"}, email: {title: "电子邮件", settings: "设置", logs: "日志", sent_at: "发送时间", email_type: "邮件类型", to_address: "目的地址", test_email_address: "测试电子邮件地址", send_test: "发送测试电子邮件", sent_test: "已发送！", delivery_method: "发送方式", preview_digest: "预览", refresh: "刷新", format: "格式", html: "html", text: "text", last_seen_user: "用户最后登录时间:"}, impersonate: {title: "假冒用户", username_or_email: "用户名或用户电子邮件", help: "使用此工具来假冒一个用户帐号以方便调试。", not_found: "无法找到该用户。", invalid: "抱歉，你不能假冒该用户。"}, users: {title: "用户", create: "添加管理员用户", last_emailed: "最后一次邮寄", not_found: "抱歉，在我们的系统中此用户名不存在。", "new": "新建", active: "活跃", pending: "待定", approved: "已批准？", approved_selected: {one: "批准用户", other: "批准用户（{{count}}）"}, titles: {active: "活动用户", "new": "新用户", pending: "等待审核用户", newuser: "信用等级为0的用户（新用户）", basic: "信用等级为1的用户（基本用户）", regular: "信用等级为2的用户（常访问用户）", leader: "信用等级为3的用户（高级用户）", elder: "信用等级为4的用户（骨灰用户）", admins: "管理员", moderators: "版主"}}, user: {ban_failed: "禁止此用户时发生了错误 {{error}}", unban_failed: "解禁此用户时发生了错误 {{error}}", ban_duration: "你计划禁止该用户多久？（天）", delete_all_posts: "删除所有帖子", ban: "禁止", unban: "解禁", banned: "已禁止？", moderator: "版主？", admin: "管理员？", show_admin_profile: "管理员", refresh_browsers: "强制浏览器刷新", show_public_profile: "显示公开介绍", impersonate: "假冒用户", revoke_admin: "吊销管理员资格", grant_admin: "赋予管理员资格", revoke_moderation: "吊销论坛版主资格", grant_moderation: "赋予论坛版主资格", reputation: "声誉", permissions: "权限", activity: "活动", like_count: "收到的赞", private_topics_count: "私有主题数量", posts_read_count: "已阅帖子数量", post_count: "创建的帖子数量", topics_entered: "进入的主题数量", flags_given_count: "所做投诉数量", flags_received_count: "收到投诉数量", approve: "批准", approved_by: "批准人", time_read: "阅读次数", "delete": "删除用户", delete_forbidden: "此用户还无法删除，因为他/她还有帖子。请先删除该用户的所有帖子。", delete_confirm: "你 确定 你要永久的从本站删除此用户？该操作无法撤销！", deleted: "该用户已被删除。", delete_failed: "在删除用户时发生了错误。请确保删除该用户前删除了该用户的所有帖子。", send_activation_email: "发送激活邮件", activation_email_sent: "激活邮件已发送。", send_activation_email_failed: "在发送激活邮件时发生了错误。", activate: "激活帐号", activate_failed: "在激活用户帐号时发生了错误。", deactivate_account: "停用帐号", deactivate_failed: "在停用用户帐号时发生了错误。", unblock_failed: "在解除用户帐号封禁时发生了错误。", block_failed: "在封禁用户帐号时发生了错误。", block_explanation: "被封禁的用户不能发表主题或者评论。"}, site_content: {none: "选择内容类型以开始编辑。", title: "内容", edit: "编辑站点内容"}, site_settings: {show_overriden: "只显示被覆盖了缺省值的", title: "设置", reset: "重置为缺省值"}}}}}, I18n.locale = "zh_CN", function (e) {
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

    function v(e, t) {
        function n(t) {
            return e.lang().longDateFormat(t) || t
        }

        for (var s = 5; s-- && Y.test(t);)t = t.replace(Y, n);
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
        var t, n, s = e._f.match(H), r = e._i;
        for (e._a = [], t = 0; s.length > t; t++)n = (b(s[t], e).exec(r) || [])[0], n && (r = r.slice(r.indexOf(n) + n.length)), ut[s[t]] && y(s[t], n, e);
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

    for (var z, P, L = "2.0.0", j = Math.round, O = {}, R = "undefined" != typeof module && module.exports, U = /^\/?Date\((\-?\d+)/i, F = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, H = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, Y = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, V = /\d\d?/, B = /\d{1,3}/, G = /\d{3}/, q = /\d{1,4}/, W = /[+\-]?\d{1,6}/, $ = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, K = /Z|[\+\-]\d\d:?\d\d/i, Z = /T/i, Q = /[\+\-]?\d+(\.\d{1,3})?/, J = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, X = "YYYY-MM-DDTHH:mm:ssZ", et = [
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
        return v(z(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
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
        var t = v(this, e || z.defaultFormat);
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
        return null == e ? this._isUTC ? t : this._d.getTimezoneOffset() : ("string" == typeof e && (e = _(e)), 16 > Math.abs(e) && (e = 60 * e), this._offset = e, this._isUTC = !0, t !== e && l(this, z.duration(t - e, "m"), 1, !0), this)
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