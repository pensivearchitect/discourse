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
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, MessageFormat = {locale: {}}, MessageFormat.locale.ru = function (e) {
    return 1 == e % 10 && 11 != e % 100 ? "one" : e % 10 >= 2 && 4 >= e % 10 && (12 > e % 100 || e % 100 > 14) && e == Math.floor(e) ? "few" : 0 === e % 10 || e % 10 >= 5 && 9 >= e % 10 || e % 100 >= 11 && 14 >= e % 100 && e == Math.floor(e) ? "many" : "other"
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
}({}), I18n.translations = {ru: {js: {dates: {tiny: {half_a_minute: "< 1мин", less_than_x_seconds: {one: "< 1сек", other: "< %{count}сек", few: "< %{count}сек", many: "< %{count}сек"}, x_seconds: {one: "1сек", other: "%{count}сек", few: "%{count}сек", many: "%{count}сек"}, less_than_x_minutes: {one: "< 1мин", other: "< %{count}мин", few: "< %{count}мин", many: "< %{count}мин"}, x_minutes: {one: "1м", other: "%{count}мин", few: "%{count}мин", many: "%{count}мин"}, about_x_hours: {one: "1ч", other: "%{count}ч", few: "%{count}ч", many: "%{count}ч"}, x_days: {one: "1д", other: "%{count}д", few: "%{count}д", many: "%{count}д"}, about_x_years: {one: "1г", other: "%{count}лет", few: "%{count}лет", many: "%{count}лет"}, over_x_years: {one: "> 1г", other: "> %{count}лет", few: "> %{count}лет", many: "> %{count}лет"}, almost_x_years: {one: "1г", other: "%{count}лет", few: "%{count}лет", many: "%{count}лет"}}, medium: {x_minutes: {one: "1 минута", other: "%{count} минут", few: "%{count} минуты", many: "%{count} минут"}, x_hours: {one: "1 час", other: "%{count} часов", few: "%{count} часа", many: "%{count} часов"}, x_days: {one: "1 день", other: "%{count} дней", few: "%{count} дня", many: "%{count} дней"}}, medium_with_ago: {x_minutes: {one: "минуту назад", other: "%{count} минут назад", few: "%{count} минуты назад", many: "%{count} минут назад"}, x_hours: {one: "час назад", other: "%{count} часов назад", few: "%{count} часа назад", many: "%{count} часов назад"}, x_days: {one: "день назад", other: "%{count} дней назад", few: "%{count} дня назад", many: "%{count} дней назад"}}}, share: {topic: "поделиться ссылкой на тему", post: "поделиться ссылкой на сообщение", close: "закрыть", twitter: "поделиться ссылкой через Twitter", facebook: "поделиться ссылкой через Facebook", "google+": "поделиться ссылкой через Google+", email: "поделиться ссылкой по email"}, edit: "отредактировать название и категорию темы", not_implemented: "Извините, эта функция еще не реализована!", no_value: "нет", yes_value: "да", of_value: "из", generic_error: "Извините, произошла ошибка.", generic_error_with_reason: "Произошла ошибка: %{error}", log_in: "Войти", age: "Возраст", last_post: "Последнее сообщение", admin_title: "Админка", flags_title: "Жалобы", show_more: "показать еще", links: "Ссылки", faq: "FAQ", privacy_policy: "Политика конфиденциальности", you: "Вы", or: "или", now: "только что", read_more: "читать еще", in_n_seconds: {one: "через 1 секунду", other: "через {{count}} секунд", few: "через {{count}} секунды", many: "через {{count}} секунд"}, in_n_minutes: {one: "через 1 минуту", other: "через {{count}} минут", few: "через {{count}} минуты", many: "через {{count}} минут"}, in_n_hours: {one: "через 1 час", other: "через {{count}} часов", few: "через {{count}} часа", many: "через {{count}} часов"}, in_n_days: {one: "через 1 день", other: "через {{count}} дней", few: "через {{count}} дня", many: "через {{count}} дней"}, suggested_topics: {title: "Похожие темы"}, bookmarks: {not_logged_in: "Пожалуйста, войдите на форум для добавления в закладки.", created: "Вы добавили сообщение в закладки.", not_bookmarked: "Сообщение прочитано. Щелкните, чтобы добавить в закладки.", last_read: "Это последнее прочитанное сообщение; щелкните, чтобы добавить в избранное."}, new_topics_inserted: "новых тем: {{count}}", show_new_topics: "Показать.", preview: "предпросмотр", cancel: "отмена", save: "Сохранить", saving: "Сохранение...", saved: "Сохранено!", choose_topic: {none_found: "Темы не найдены.", title: {search: "Искать тему по названию, ссылке или уникальному номеру:", placeholder: "введите здесь название темы"}}, user_action: {user_posted_topic: "<a href='{{userUrl}}'>{{user}}</a> создал <a href='{{topicUrl}}'>тему</a>", you_posted_topic: "<a href='{{userUrl}}'>Вы</a> создали <a href='{{topicUrl}}'>тему</a>", user_replied_to_post: "<a href='{{userUrl}}'>{{user}}</a> ответил(а) на сообщение <a href='{{postUrl}}'>{{post_number}}</a>", you_replied_to_post: "<a href='{{userUrl}}'>Вы</a> ответили на сообщение <a href='{{postUrl}}'>{{post_number}}</a>", user_replied_to_topic: "<a href='{{userUrl}}'>{{user}}</a> ответил(а) в <a href='{{topicUrl}}'>теме</a>", you_replied_to_topic: "<a href='{{userUrl}}'>Вы</a> ответили в <a href='{{topicUrl}}'>теме</a>", user_mentioned_user: "<a href='{{user1Url}}'>{{user}}</a> упомянул <a href='{{user2Url}}'>{{another_user}}</a>", user_mentioned_you: "<a href='{{user1Url}}'>{{user}}</a> упомянул<a href='{{user2Url}}'>Вас</a>", you_mentioned_user: "<a href='{{user1Url}}'>Вы</a> упомянули<a href='{{user2Url}}'>{{user}}</a>", posted_by_user: "Размещено пользователем <a href='{{userUrl}}'>{{user}}</a>", posted_by_you: "Размещено <a href='{{userUrl}}'>Вами</a>", sent_by_user: "Отправлено пользователем <a href='{{userUrl}}'>{{user}}</a>", sent_by_you: "Отправлено <a href='{{userUrl}}'>Вами</a>"}, user_action_groups: {1: "Отдано симпатий", 2: "Получено симпатий", 3: "Закладки", 4: "Темы", 5: "Ваши ответы", 6: "Ответы вам", 7: "Упоминания", 9: "Цитаты", 10: "Избранное", 11: "Изменения", 12: "Отправленные", 13: "Входящие"}, user: {profile: "Профайл", title: {title: "Заголовок"}, mute: "Отключить", edit: "Настройки", download_archive: "скачать архив ваших сообщений", private_message: "Личное сообщение", private_messages: "Личные сообщения", activity_stream: "Активность", preferences: "Настройки", bio: "Обо мне", invited_by: "Приглашен пользователем", trust_level: "Уровень доверия", notifications: "Уведомления", dynamic_favicon: "Отображать события на favicon", external_links_in_new_tab: "Открывать все внешние ссылки в новой вкладке", enable_quoting: "Позволить отвечать с цитированием выделенного текста", moderator: "{{user}} - модератор", admin: "{{user}} - админ", change_password: {action: "изменить", success: "(письмо отправлено)", in_progress: "(отправка письма)", error: "(ошибка)"}, change_username: {action: "изменить", title: "Изменить имя пользователя", confirm: "Изменение имени пользователя может повлечь за собой определенные последствия. Вы уверены?", taken: "Имя пользователя уже занято.", error: "При изменении имени пользователя произошла ошибка.", invalid: "Имя пользователя должно состоять только из цифр и латинских букв"}, change_email: {action: "изменить", title: "Изменить Email", taken: "Данный адрес электронной почты недоступен.", error: "Произошла ошибка. Возможно, этот адрес электронной почты уже используется?", success: "На указанный адрес электронной почты отправлено письмо с инструкциями."}, email: {title: "Email", instructions: "Ваш адрес электронной почты всегда скрыт.", ok: "Отлично, мы послали вам письмо с инструкциями.", invalid: "Введите действительный адрес электронной почты.", authenticated: "Адрес электронной почты подтвержден {{provider}}.", frequency: "В случае вашего отсутствия на форуме вы будете получать уведомления только о новых сообщениях."}, name: {title: "Имя", instructions: "Ваше полное имя или псевдоним. Необязательно уникальное. Показывается только на вашей странице пользователя.", too_short: "Ваше имя слишком короткое.", ok: "Допустимое имя."}, username: {title: "Имя пользователя", instructions: "Должно быть уникальным и без пробелов. Пользователи могут упоминать вас по @username.", short_instructions: "Пользователи могут упоминать вас по @{{username}}.", available: "Имя пользователя доступно.", global_match: "Адрес электронной почты совпадает с зарегистрированным.", global_mismatch: "Уже занято. Попробуйте {{suggestion}}?", not_available: "Недоступно. Попробуйте {{suggestion}}?", too_short: "Имя пользователя слишком короткое.", too_long: "Имя пользователя слишком длинное.", checking: "Проверяю доступность имени пользователя...", enter_email: "Имя пользователя найдено. Введите адрес электронной почты."}, password_confirmation: {title: "Пароль еще раз"}, last_posted: "Последнее сообщение", last_emailed: "Последнее письмо", last_seen: "Посл. визит", created: "Регистрация", log_out: "Выйти", website: "Веб-сайт", email_settings: "Электронная почта", email_digests: {title: "В случае моего отсутствия на форуме, присылайте мне сводку новостей", daily: "ежедневно", weekly: "еженедельно", bi_weekly: "каждые две недели"}, email_direct: "Получение уведомлений по электронной почте об ответах на ваши сообщения, цитировании вас или упоминании вас по @username", email_private_messages: "Получение уведомлений по электронной почте о личных сообщениях", other_settings: "Прочее", new_topic_duration: {label: "Считать темы новыми, если", not_viewed: "они еще не просмотрены вами", last_here: "они были размещены после вашего последнего посещения", after_n_days: {one: "они были размещены за последние сутки", other: "они были размещены за последние {{count}} дней", few: "были размещены за последние {{count}} дня", many: "они были размещены за последние {{count}} дней"}, after_n_weeks: {one: "они были размещены за последнюю неделю", other: "они были размещены за последние {{count}} недель", few: "они были размещены за последние {{count}} недели", many: "они были размещены за последние {{count}} недель"}}, auto_track_topics: "Автоматически отслеживать темы, которые я просматриваю", auto_track_options: {never: "никогда", always: "всегда", after_n_seconds: {one: "спустя 1 секунду", other: "спустя {{count}} секунд", few: "спустя {{count}} секунды", many: "спустя {{count}} секунд"}, after_n_minutes: {one: "спустя 1 минуту", other: "спустя {{count}} минут", few: "спустя {{count}} минуты", many: "спустя {{count}} минут"}}, invited: {title: "Приглашения", user: "Приглашенный пользователь", none: "{{username}} не пригласил ни одного пользователя на форум.", redeemed: "Принятые приглашения", redeemed_at: "Принято", pending: "Еще не принятые приглашения", topics_entered: "Просмотрено тем", posts_read_count: "Прочитано сообщений", rescind: "Отозвать приглашение", rescinded: "Приглашение отозвано", time_read: "Время чтения", days_visited: "Дней посещения", account_age_days: "Дней с момента регистрации"}, password: {title: "Пароль", too_short: "Пароль слишком короткий.", ok: "Допустимый пароль."}, ip_address: {title: "Последний IP адрес"}, avatar: {title: "Аватар", instructions: "Сервис <a href='https://ru.gravatar.com/' target='_blank'>Gravatar</a> позволяет создать аватар для вашего адреса электронной почты"}, filters: {all: "Всего"}, stream: {posted_by: "Опубликовано", sent_by: "Отправлено", private_message: "личное сообщение", the_topic: "тема"}}, loading: "Загрузка...", close: "Закрыть", learn_more: "подробнее...", year: "год", year_desc: "создано тем за последние 365 дней", month: "месяц", month_desc: "создано тем за последние 30 дней", week: "неделя", week_desc: "создано тем за последние 7 дней", first_post: "Первое сообщение", mute: "Отключить", unmute: "Включить", best_of: {title: "Наиболее популярное", enabled_description: "Вы сейчас просматриваете наиболее популярные сообщения в теме.", description: "В теме <b>{{count}}</b> сообщений. Хотите сэкономить время и просмотреть только те сообщения, которые привлекли к себе больше всего внимания и ответов?", enable: "Просмотреть наиболее популярные сообщения", disable: "Переключиться в режим просмотра всех сообщений"}, private_message_info: {title: "Личное сообщение", invite: "Пригласить других..."}, email: "Email", username: "Имя пользователя", last_seen: "Был", created: "Регистрация", trust_level: "Уровень доверия", create_account: {title: "Создать учетную запись", action: "Зарегистрироваться!", invite: "Ещё не зарегистрированы?", failed: "Произошла ошибка. Возможно, этот Email уже используется. Попробуйте восстановить пароль"}, forgot_password: {title: "Забыли пароль?", action: "Я забыл свой пароль", invite: "Введите ваше имя пользователя или email, и мы отправим вам ссылку на восстановление пароля.", reset: "Сброс пароля", complete: "Если существует аккаунт, совпадающий с именем пользователя или почтовым адресом, то в скором времени вы получите сообщение с инструкциями по сбросу пароля."}, login: {title: "Войти", username: "Имя пользователя", password: "Пароль", email_placeholder: "email или имя пользователя", error: "Непредвиденная ошибка", reset_password: "Сброс пароля", logging_in: "Проверка...", or: "или", authenticating: "Проверка...", awaiting_confirmation: "Ваша учетная запись требует активации. Для того чтобы получить активационное письмо повторно, воспользуйтесь опцией сброса пароля.", awaiting_approval: "Ваша учетная запись еще не одобрена. Вы получите письмо, когда это случится.", not_activated: "Прежде чем вы сможете воспользоваться новой учетной записью, вам необходимо ее активировать. Мы отправили вам на почту <b>{{sentTo}}</b> подробные инструкции, как это cделать.", resend_activation_email: "Щелкните здесь, чтобы мы повторно выслали вам письмо для активации учетной записи.", sent_activation_email_again: "По адресу <b>{{currentEmail}}</b> повторно отправлено письмо с кодом активации. Доставка сообщения может занять несколько минут. Имейте в виду, что иногда по ошибке письмо может попасть в папку Спам.", google: {title: "с помощью Google", message: "Вход с помощью учетной записи Google (всплывающие окна должны быть разрешены)"}, twitter: {title: "с помощью Twitter", message: "Вход с помощью учетной записи Twitter (всплывающие окна должны быть разрешены)"}, facebook: {title: "с помощью Facebook", message: "Вход с помощью учетной записи Facebook (всплывающие окна должны быть разрешены)"}, cas: {title: "Войти с помощью CAS", message: "Вход с помощью учетной записи CAS (всплывающие окна должны быть разрешены)"}, yahoo: {title: "с помощью Yahoo", message: "Вход с помощью учетной записи Yahoo (всплывающие окна должны быть разрешены)"}, github: {title: "с помощью GitHub", message: "Вход с помощью учетной записи GitHub (всплывающие окна должны быть разрешены)"}, persona: {title: "с помощью Persona", message: "Вход с помощью учетной записи Mozilla Persona (всплывающие окна должны быть разрешены)"}}, composer: {posting_not_on_topic: "В какой теме вы хотите ответить?", saving_draft_tip: "сохранение", saved_draft_tip: "сохранено", saved_local_draft_tip: "сохранено локально", similar_topics: "Ваша тема похожа на...", drafts_offline: "Сохраненные черновики", min_length: {need_more_for_title: "для заголовка необходимо еще {{n}} символов", need_more_for_reply: "осталось {{n}} символов"}, error: {title_missing: "Необходим заголовок.", title_too_short: "Заголовок должен содержать минимум {{min}} символов.", title_too_long: "Заголовок может содержать максимум {{max}} символов.", post_missing: "Сообщение не может быть пустым.", post_length: "Сообщение должно содержать минимум {{min}} символов.", category_missing: "Нужно выбрать категорию."}, save_edit: "Сохранить", reply_original: "Ответ в первоначальной теме", reply_here: "Ответить в текущей теме", reply: "Ответить", cancel: "Отменить", create_topic: "Создать тему", create_pm: "Написать личное сообщение", users_placeholder: "Добавить пользователя", title_placeholder: "Напечатайте здесь заголовок. В чём, в двух словах, суть предстоящего обсуждения?", reply_placeholder: "Печатайте здесь. Для форматирования текста используйте Markdown и BBCode. Перетяните или вставьте изображение, чтобы загрузить его на сервер.", view_new_post: "Посмотреть созданное вами сообщение.", saving: "Сохранение...", saved: "Сохранено!", saved_draft: "Вы в данный момент создаете сообщение. Нажмите в любом месте, чтобы вернуться к редактированию.", uploading: "Загрузка...", show_preview: "предпросмотр &raquo;", hide_preview: "&laquo; скрыть предпросмотр", quote_post_title: "Процитировать всё сообщение", bold_title: "Выделение жирным", bold_text: "текст, выделенный жирным", italic_title: "Выделение курсивом", italic_text: "текст, выделенный курсивом", link_title: "Ссылка", link_description: "введите описание ссылки", link_dialog_title: "Вставить ссылку", link_optional_text: "необязательное название", quote_title: "Цитата", quote_text: "Цитата", code_title: "Фрагмент кода", code_text: "вводите код здесь", image_title: "Изображение", image_description: "введите здесь описание изображения", image_dialog_title: "Вставка изображения", image_optional_text: "необязательное название", image_hosting_hint: "Нужен <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>бесплатный хостинг изображений?</a>", olist_title: "Нумерованный список", ulist_title: "Маркированный список", list_item: "Элемент списка", heading_title: "Заголовок", heading_text: "Заголовок", hr_title: "Горизонтальный разделитель", undo_title: "Отменить", redo_title: "Повторить", help: "Справка по Markdown", toggler: "скрыть / показать панель редактирования", admin_options_title: "Дополнительные настройки темы", auto_close_label: "Автоматически закрыть тему после:", auto_close_units: "дней"}, notifications: {title: "уведомления об упоминании @name в сообщениях, ответах на ваши сообщения и темы, личные сообщения и т.д.", none: "На данный момент уведомлений нет.", more: "посмотреть более ранние уведомления", mentioned: "<span title='mentioned' class='icon'>@</span> {{username}} {{link}}", quoted: "<i title='quoted' class='icon icon-quote-right'></i> {{username}} {{link}}", replied: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", posted: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", edited: "<i title='edited' class='icon icon-pencil'></i> {{username}} {{link}}", liked: "<i title='liked' class='icon icon-heart'></i> {{username}} {{link}}", private_message: "<i class='icon icon-envelope-alt' title='private message'></i> {{username}} {{link}}", invited_to_private_message: "<i class='icon icon-envelope-alt' title='private message'></i> {{username}} {{link}}", invitee_accepted: "<i title='принятое приглашение' class='icon icon-signin'></i> {{username}} принял ваше приглашение", moved_post: "<i title='перенесенное сообщение' class='icon icon-arrow-right'></i> {{username}} перенес сообщение в {{link}}", total_flagged: "всего сообщений с жалобами"}, image_selector: {title: "Вставка изображения", from_my_computer: "С устройства", from_the_web: "Из интернета", add_image: "Добавить изображение", remote_title: "изображение из интернета", remote_tip: "введите адрес изображения в формате http://example.com/image.jpg", local_title: "локальное изображение", local_tip: "выбрать изображение с устройства.", upload: "Загрузить", uploading_image: "Загрузка изображения"}, search: {title: "поиск по темам, сообщениям, пользователям или категориям", placeholder: "условия поиска...", no_results: "Ничего не найдено.", searching: "Поиск ...", prefer: {user: "при поиске отдавать предпочтение @{{username}}", category: "при поиске отдавать предпочтение {{category}}"}}, site_map: "перейти к другому списку тем или другой категории", go_back: "вернуться", current_user: "перейти на вашу страницу пользователя", favorite: {title: "Избранные", help: {star: "добавить тему в избранное", unstar: "удалить тему из избранного"}}, topics: {none: {favorited: "Вы еще не добавили ни одной темы в избранное. Чтобы тема попала в избранное, нажмите на звездочку рядом с названием темы.", unread: "Все сообщения прочитаны.", "new": "Все темы прочитаны.", read: "Вы еще не прочитали ни одной темы.", posted: "Вы не принимали участие в обсуждении.", latest: "Новых тем нет.", hot: "Популярных тем нет.", category: "В категории {{category}} отсутствуют темы."}, bottom: {latest: "Больше новых тем нет.", hot: "Больше популярных тем нет.", posted: "Больше нет опубликованных тем.", read: "Больше прочитанных тем нет.", "new": "Больше новых тем нет.", unread: "Больше непрочитанных тем нет.", favorited: "Больше избранных тем нет.", category: "Больше в категории {{category}} нет тем."}}, rank_details: {toggle: "скрыть / показать детальный рейтинг темы", show: "показать детальный рейтинг темы", title: "Детальный рейтинг темы"}, topic: {create_in: "Создать тему", create: "Создать тему", create_long: "Создать новую тему", private_message: "Написать личное сообщение", list: "Темы", "new": "новая тема", title: "Тема", loading_more: "Загружаю темы...", loading: "Загружаю тему...", invalid_access: {title: "Частная тема", description: "К сожалению, у вас нет прав доступа к теме!"}, server_error: {title: "Не удалось загрузить тему", description: "К сожалению, мы не смогли загрузить тему, возможно, из-за проблемы подключения. Попробуйте еще раз. Если проблема повторится, пожалуйста, сообщите нам об этом."}, not_found: {title: "Тема не найдена", description: "К сожалению, запрошенная тема не найдена. Возможно, она была удалена модератором."}, unread_posts: {one: "1 непрочитанное сообщение в данной теме", other: "{{count}} непрочитанных сообщений в данной теме", few: "{{count}} непрочитанных сообщений в данной теме", many: "{{count}} непрочитанных сообщений в данной теме"}, new_posts: {one: "1 новое сообщение в данной теме", other: "{{count}} непрочитанных сообщений в данной теме", few: "{{count}} непрочитанных сообщений в данной теме", many: "{{count}} непрочитанных сообщений в данной теме"}, likes: {one: "эта тема нравится одному участнику", other: "эта тема нравится {{count}} участникам", few: "тема понравилась {{count}} пользователям", many: "тема понравилась {{count}} пользователям"}, back_to_list: "Вернуться к списку тем", options: "Опции темы", show_links: "показать ссылки в теме", toggle_information: "скрыть / показать подробную информацию о теме", read_more_in_category: "Хотите почитать что-нибудь еще? Просмотрите темы в {{catLink}} или {{latestLink}}.", read_more: "Хотите почитать что-нибудь еще? {{catLink}} or {{latestLink}}.", browse_all_categories: "Просмотреть все категории", view_latest_topics: "посмотреть последние темы", suggest_create_topic: "Почему бы вам не создать новую тему?", read_position_reset: "Закладка перемещена.", jump_reply_up: "перейти к более ранним ответам", jump_reply_down: "перейти к более поздним ответам", deleted: "Тема удалена", auto_close_notice: "Тема будет автоматически закрыта через %{timeLeft}.", auto_close_title: "Настройки закрытия темы", auto_close_save: "Сохранить", auto_close_cancel: "Отменить", auto_close_remove: "Не закрывать тему автоматически", progress: {title: "текущее местоположение в теме", jump_top: "перейти к первому сообщению", jump_bottom: "перейти к последнему сообщению", total: "всего сообщений", current: "текущее сообщение"}, notifications: {title: "", reasons: {"3_2": "Вы будете получать уведомления, потому что вы наблюдаете за темой.", "3_1": "Вы будете получать уведомления, потому что вы создали тему.", 3: "Вы будете получать уведомления, потому что вы наблюдаете за темой.", "2_4": "Вы будете получать уведомления, потому что вы ответили в теме.", "2_2": "Вы будете получать уведомления, потому что вы отслеживаете тему.", 2: 'Вы будете получать уведомления, потому что вы <a href="/users/{{username}}/preferences">читали тему</a>.', 1: "Вы получите уведомление, только если кто-нибудь упомянет вас по @name или ответит на ваше сообщение.", "1_2": "Вы получите уведомление, только если кто-нибудь упомянет вас по @name или ответит на ваше сообщение.", 0: "Вы не получаете уведомления по теме.", "0_2": "Вы не получаете уведомления по теме."}, watching: {title: "Наблюдение", description: "то же самое, что и режим отслеживания, но вы дополнительно будете получать уведомления обо всех новых сообщениях."}, tracking: {title: "Отслеживание", description: "вам будет прислано уведомление, если кто-то упомянет вас по @name или ответит на ваше сообщение, а также вы будете видеть количество сообщений, новых и непрочитанных вами."}, regular: {title: "Стандартный", description: "вам будет прислано уведомление, если кто-то упомянет вас по @name или ответит на ваше сообщение."}, muted: {title: "Выключено", description: "тема не показывается на вкладке <b>Непрочитанные</b>, уведомления о новых сообщениях в теме вам не отправляются."}}, actions: {"delete": "Удалить тему", open: "Открыть тему", close: "Закрыть тему", auto_close: "Автоматическое закрытие", unpin: "Отлепить тему", pin: "Прилепить тему", unarchive: "Разархивировать тему", archive: "Архивировать тему", invisible: "Сделать невидимой", visible: "Сделать видимой", reset_read: "Сбросить счетчики", multi_select: "Выбрать для объединения/разделения", convert_to_topic: "Преобразовать в обычную тему"}, reply: {title: "Ответить", help: "ответить в теме"}, clear_pin: {title: "Отлепить", help: "Отлепить тему, чтобы она более не показывалась в самом начале списка тем"}, share: {title: "Поделиться", help: "Поделиться ссылкой на тему"}, inviting: "Высылаю приглашение...", invite_private: {title: "Отправить личное сообщение", email_or_username: "Адрес электронной почты или имя пользователя того, кого вы хотите пригласить", email_or_username_placeholder: "адрес электронной почты или имя пользователя", action: "Пригласить", success: "Личное сообщение было отправлено.", error: "К сожалению, в процессе приглашения пользователя произошла ошибка."}, invite_reply: {title: "Подключить друзей", action: "Выслать приглашение по электронной почте", help: "отправьте приглашения своим друзьям, чтобы они тоже смогли поучаствовать в обсуждении темы", email: "Мы отправим вашему другу краткое письмо, и он сможет ответить одним щелчком мыши.", email_placeholder: "адрес электронной почты", success: "Приглашение отправлено по адресу <b>{{email}}</b>. Мы вышлем вам уведомление, когда вашим приглашением воспользуются. Проверьте вкладку <b>Приглашения</b> на вашей странице пользователя, чтобы видеть, кого вы уже пригласили.", error: "К сожалению, мы не смогли пригласить этого человека. Возможно, он уже пользователь форума?"}, login_reply: "Войдите на форум, чтобы ответить на сообщение", filters: {user: "Отображено только {{n_posts}} от {{by_n_users}}.", n_posts: {one: "1 сообщение", other: "{{count}} сообщений", few: "{{count}} сообщения", many: "{{count}} сообщений"}, by_n_users: {one: "от одного пользователя", other: "от {{count}} пользователей", few: "от {{count}} пользователя", many: "от {{count}} пользователей"}, best_of: "Отображено только {{n_best_posts}} из {{of_n_posts}}.", n_best_posts: {one: "1 лучшее", other: "{{count}} лучших", few: "{{count}} лучших", many: "{{count}} лучших"}, of_n_posts: {one: "из 1 в теме", other: "из {{count}} в теме", few: "из {{count}} в теме", many: "из {{count}} в теме"}, cancel: "Показать все сообщения в этой теме еще раз."}, split_topic: {title: "Разделить тему", action: "разделить", topic_name: "Новый заголовок темы:", error: "В процессе разделения темы произошла ошибка.", instructions: {one: "Создать новую тему, перенеся в нее выбранное сообщение.", other: "Создать новую тему, перенеся в нее  <b>{{count}}</b> выбранных сообщений.", few: "Создать новую тему, перенеся в нее  <b>{{count}}</b> выбранные сообщения.", many: "Создать новую тему, перенеся в нее  <b>{{count}}</b> выбранных сообщений."}}, merge_topic: {title: "Перенести тему", action: "перенести", error: "В процессе объединения темы произошла ошибка.", instructions: {one: "Выберите тему, в которую хотите перенести сообщение.", other: "Выберите тему, в которую хотите перенести <b>{{count}}</b> выбранных сообщений.", few: "Выберите тему, в которую хотите перенести <b>{{count}}</b> выбранные сообщения.", many: "Выберите тему, в которую хотите перенести <b>{{count}}</b> выбранных сообщений."}}, multi_select: {select: "выбрать", selected: "выбрано ({{count}})", "delete": "удалить выбранные", cancel: "отменить выделение", description: {one: "Вы выбрали <b>1</b> сообщение.", other: "Вы выбрали <b>{{count}}</b> сообщений.", few: "Вы выбрали <b>{{count}}</b> сообщения.", many: "Вы выбрали <b>{{count}}</b> сообщений."}}}, post: {reply: "Ответить на {{link}} от {{replyAvatar}} {{username}}", reply_topic: "Ответить на {{link}}", quote_reply: "ответить цитированием", edit: "Изменить {{link}} от {{replyAvatar}} {{username}}", post_number: "сообщение {{number}}", in_reply_to: "в ответе", reply_as_new_topic: "Ответить в новой теме", continue_discussion: "Продолжить обсуждение из {{postLink}}:", follow_quote: "перейти к цитируемому сообщению", deleted_by_author: "(сообщение удалено автором)", expand_collapse: "развернуть/свернуть", has_replies: {one: "ответ", other: "ответов", few: "ответа", many: "ответов"}, errors: {create: "К сожалению, не удалось создать сообщение. Попробуйте еще раз.", edit: "К сожалению, не удалось изменить сообщение. Попробуйте еще раз.", upload: "К сожалению, не удалось загрузить файл. Попробуйте еще раз.", upload_too_large: "Превышен допустимый размер ({{max_size_kb}}kb) файла. Уменьшите размер изображения и повторите попытку.", too_many_uploads: "К сожалению, за один раз можно загрузить только одно изображение."}, abandon: "Удалить сохраненный черновик?", archetypes: {save: "Параметры сохранения"}, controls: {reply: "начать составление ответа на сообщение", like: "мне нравится", edit: "Изменить сообщение", flag: "Личное сообщение автору / пожаловаться на сообщение", "delete": "удалить сообщение", undelete: "отменить удаление", share: "поделиться ссылкой на сообщение", more: "Ещё"}, actions: {flag: "Жалоба", clear_flags: {one: "Очистить уведомление", other: "Очистить жалобы", few: "Очистить жалобы", many: "Очистить жалобы"}, it_too: {off_topic: "Пожаловаться", spam: "Пожаловаться", inappropriate: "Пожаловаться", custom_flag: "Пожаловаться", bookmark: "Добавить в закладки", like: "Мне тоже нравится", vote: "Проголосовать"}, undo: {off_topic: "Отозвать жалобу", spam: "Отозвать жалобу", inappropriate: "Отозвать жалобу", bookmark: "Удалить из закладок", like: "Больше не нравится", vote: "Отозвать голос"}, people: {off_topic: "{{icons}} отметили как оффтопик", spam: "{{icons}} отметили как спам", inappropriate: "{{icons}} отметили как неуместное", notify_moderators: "{{icons}} пожаловались модераторам", notify_moderators_with_url: "{{icons}} <a href='{{postUrl}}'>пожаловались модераторам</a>", notify_user: "{{icons}} отправил(и) личное сообщение", notify_user_with_url: "{{icons}} отправил(и) <a href='{{postUrl}}'>личное сообщение</a>", bookmark: "{{icons}} добавили в закладки", like: "{{icons}} выразили симпатию", vote: "{{icons}} проголосовали за"}, by_you: {off_topic: "Помечена вами как оффтопик", spam: "Помечена вами как спам", inappropriate: "Помечена вами как неуместное", notify_moderators: "Вы отправили жалобу модератору", notify_user: "Вы отправили личное сообщение пользователю", bookmark: "Вы добавили сообщение в закладки", like: "Вам нравится", vote: "Вы проголосовали за данное сообщение"}, by_you_and_others: {off_topic: {one: "Вы и еще 1 человек отметили сообщение как оффтопик", other: "Вы и еще {{count}} человек отметили сообщение как оффтопик", few: "Вы и еще {{count}} человека отметили сообщение как оффтопик", many: "Вы и еще {{count}} человек отметили сообщение как оффтопик"}, spam: {one: "Вы и еще 1 человек отметили сообщение как спам", other: "Вы и еще {{count}} человек отметили сообщение как спам", few: "Вы и еще {{count}} человека отметили сообщение как спам", many: "Вы и еще {{count}} человек отметили сообщение как спам"}, inappropriate: {one: "Вы и еще 1 человек отметили сообщение как неуместное", other: "Вы и еще {{count}} человек отметили сообщение как неуместное", few: "Вы и еще {{count}} человека отметили сообщение как неуместное", many: "Вы и еще {{count}} человек отметили сообщение как неуместное"}, notify_moderators: {one: "Вы и еще 1 человек пожаловались на сообщение", other: "Вы и еще {{count}} человек пожаловались на сообщение", few: "Вы и еще {{count}} человека пожаловались на сообщение", many: "Вы и еще {{count}} человек пожаловались на сообщение"}, notify_user: {one: "Вы и еще 1 человек отправили личное сообщение пользователю", other: "Вы и еще {{count}} человек отправили личное сообщение пользователю", few: "Вы и еще {{count}} человека отправили личное сообщение пользователю", many: "Вы и еще {{count}} человек отправили личное сообщение пользователю"}, bookmark: {one: "Вы и еще 1 человек добавили это сообщение в закладки", other: "Вы и еще {{count}} человек добавили это сообщение в закладки", few: "Вы и еще {{count}} человека добавили это сообщение в закладки", many: "Вы и еще {{count}} человек добавили это сообщение в закладки"}, like: {one: "Вам и еще одному человеку это понравилось", other: "Вам и еще {{count}} другим людям это понравилось", few: "Вам и еще {{count}} людям это понравилось", many: "Вам и еще {{count}} людям это понравилось"}, vote: {one: "Вы и еще 1 человек проголосовали за это сообщение", other: "Вы и еще {{count}} человек проголосовали за это сообщение", few: "Вы и еще {{count}} человека проголосовали за сообщение", many: "Вы и еще {{count}} человек проголосовали за сообщение"}}, by_others: {off_topic: {one: "1 человек отметил это сообщение как оффтопик", other: "{{count}} человек отметили это сообщение как оффтопик", few: "{{count}} человека отметили сообщение как оффтопик", many: "{{count}} человек отметили это сообщение как оффтопик"}, spam: {one: "1 человек отметил это сообщение как спам", other: "{{count}} человек отметили это сообщение как спам", few: "{{count}} человека отметили это сообщение как спам", many: "{{count}} человек отметили это сообщение как спам"}, inappropriate: {one: "1 человек отметил это сообщение как неуместное", other: "{{count}} человек отметили это сообщение как неуместное", few: "{{count}} человека отметили это сообщение как неуместное", many: "{{count}} человек отметили это сообщение как неуместное"}, notify_moderators: {one: "1 человек пожаловался на это сообщение", other: "{{count}} человек пожаловались на это сообщение", few: "{{count}} человека пожаловались на это сообщение", many: "{{count}} человек пожаловались на это сообщение"}, notify_user: {one: "1 человек отправил личное сообщение этому пользователю", other: "{{count}} человек отправили личное сообщение этому пользователю", few: "{{count}} человека отправили личное сообщение этому пользователю", many: "{{count}} человек отправили личное сообщение этому пользователю"}, bookmark: {one: "1 человек добавил это сообщение в закладки", other: "{{count}} человек добавили это сообщение в закладки", few: "{{count}} человека добавили это сообщение в закладки", many: "{{count}} человек добавили это сообщение в закладки"}, like: {one: "1 человеку это понравилось", other: "{{count}} людям это понравилось", few: "{{count}} людям это понравилось", many: "{{count}} людям это понравилось"}, vote: {one: "1 человек проголосовал за это сообщение", other: "{{count}} людей проголосовали за это сообщение", few: "{{count}} человека проголосовали за это сообщение", many: "{{count}} людей проголосовали за это сообщение"}}}, edits: {one: "редактировалось 1 раз", other: "редактировалось {{count}} раз", zero: "не редактировалось", few: "редактировалось {{count}} раза", many: "редактировалось {{count}} раз"}, "delete": {confirm: {one: "Вы уверены, что хотите удалить это сообщение?", other: "Вы уверены, что хотите удалить эти сообщения?", few: "Вы уверены, что хотите удалить сообщения?", many: "Вы уверены, что хотите удалить сообщения?"}}}, category: {none: "(без категории)", edit: "изменить", edit_long: "Изменить категорию", edit_uncategorized: 'Изменить "Без категории"', view: "Просмотр тем по категориям", general: "Общие", settings: "Настройки", "delete": "Удалить категорию", create: "Создать категорию", save: "Сохранить", creation_error: "При создании новой категории возникла ошибка.", save_error: "При сохранении категории возникла ошибка.", more_posts: "просмотреть все {{posts}}...", name: "Название категории", description: "Описание", topic: "тема в категории", badge_colors: "Цвета метки", background_color: "Цвет фона", foreground_color: "Цвет переднего плана", name_placeholder: "Должно быть кратким и емким.", color_placeholder: "Любой цвет из веб-палитры", delete_confirm: "Вы действительно хотите удалить категорию?", delete_error: "При удалении категории произошла ошибка.", list: "Список категорий", no_description: "Для этой категории нет описания, отредактируйте определение темы.", change_in_category_topic: "Изменить описание", hotness: "Популярность", already_used: "Цвет уже используется другой категорией", is_secure: "Обезопасить категорию?", add_group: "Добавить группу", security: "Безопасность", allowed_groups: "Доступные группы:", auto_close_label: "Закрыть тему через:"}, flagging: {title: "Выберите действие над сообщением", action: "Пожаловаться", take_action: "Принять меры", notify_action: "Отправить", cant: "Извините, но вы не можете сейчас послать жалобу.", custom_placeholder_notify_user: "Почему это сообщение побудило вас обратиться к этому пользователю напрямую и в частном порядке? Будьте конкретны, будьте конструктивны и всегда доброжелательны.", custom_placeholder_notify_moderators: "Почему это сообщение побудило вас обратиться с жалобой к модератору? Сообщите нам конкретно, чем вы обеспокоены и предоставьте соответствующие ссылки, где это возможно.", custom_message: {at_least: "введите как минимум {{n}} символов", more: "ещё {{n}} символов...", left: "осталось {{n}} символов"}}, topic_summary: {title: "Сводка по теме", links_shown: "показать все {{totalLinks}} ссылок...", clicks: "переходов", topic_link: "ссылка на тему"}, topic_statuses: {locked: {help: "закрытая тема (в этой теме больше нельзя отвечать)"}, pinned: {help: "прилепленная тема (будет показана в начале списка тем соответствующей категории)"}, archived: {help: "архивная тема (заморожена и не может быть изменена)"}, invisible: {help: "скрытая тема (не показывается в списке тем, доступ к теме осуществляется только по прямой ссылке)"}}, posts: "Посты", posts_long: "{{number}} сообщений в теме", original_post: "Начальное сообщение", views: "Видели", replies: "Ответов", views_long: "тема просмотрена {{number}} раз", activity: "Активность", likes: "Лайки", top_contributors: "Участники", category_title: "Категория", history: "История", changed_by: "автором {{author}}", categories_list: "Список категорий", filters: {latest: {title: "Последние", help: "самые последние темы"}, hot: {title: "Популярные", help: "подборка популярных тем"}, favorited: {title: "Избранное", help: "темы, которые вы добавили в список избранных"}, read: {title: "Прочитанные", help: "темы, которые вас заинтересовали (в обратном хронологическом порядке)"}, categories: {title: "Категории", title_in: "Категория - {{categoryName}}", help: "все темы, сгруппированные по категориям"}, unread: {title: {zero: "Непрочитанные", one: "Непрочитанные (1)", other: "Непрочитанные ({{count}})", few: "Непрочитанные ({{count}})", many: "Непрочитанные ({{count}})"}, help: "отслеживаемые темы с непрочитанными сообщениями"}, "new": {title: {zero: "Новые", one: "Новые (1)", other: "Новые ({{count}})", few: "Новые ({{count}})", many: "Новые ({{count}})"}, help: "новые темы с момента вашего последнего посещения"}, posted: {title: "Мои", help: "темы, в которых вы принимали участие"}, category: {title: {zero: "{{categoryName}}", one: "{{categoryName}} (1)", other: "{{categoryName}} ({{count}})", few: "{{categoryName}} ({{count}})", many: "{{categoryName}} ({{count}})"}, help: "последние темы в категории {{categoryName}}"}}, browser_update: 'К сожалению, <a href="http://www.discourse.org/faq/#browser">ваш браузер слишком устарел</a> для комфортного просмотра нашего форума. Пожалуйста, <a href="http://browsehappy.com">обновите ваш браузер</a>.', type_to_filter: "Введите текст для фильтрации...", admin: {title: "Discourse Admin", moderator: "Модератор", dashboard: {title: "Информационная панель", version: "Версия", up_to_date: "Вы используете самую свежию версию!", critical_available: "Доступно критическое обновление.", updates_available: "Доступны обновления.", please_upgrade: "Пожалуйста, обновитесь!", installed_version: "Установленная версия", latest_version: "Самая последняя", problems_found: "Мы обнаружили некоторые проблемы в вашей установке Discourse:", last_checked: "Последняя проверка", refresh_problems: "Обновить", no_problems: "Проблемы не обнаружены.", moderators: "Модераторы:", admins: "Администраторы:", blocked: "Заблокированы:", private_messages_short: "ЛС", private_messages_title: "Личные сообщения", reports: {today: "Сегодня", yesterday: "Вчера", last_7_days: "Последние 7 дней", last_30_days: "Последние 30 дней", all_time: "За все время", "7_days_ago": "7 дней назад", "30_days_ago": "30 дней назад", all: "Все", view_table: "Просмотр в виде таблицы", view_chart: "Просмотр в графическом виде"}}, commits: {latest_changes: "Обновления в репозитории Github", by: "от"}, flags: {title: "Жалобы", old: "Старые", active: "Активные", agree_hide: "Согласиться (скрыть сообщение + послать ЛС)", agree_hide_title: "Скрыть сообщение и автоматически отправить пользователю личное сообщение с просьбой исправить свое сообщение", defer: "Отложить", defer_title: "Не предпринимать никаких действий, отложить жалобу для дальнейшего рассмотрения", delete_post: "Удалить сообщение", delete_post_title: "Удалить сообщение (или тему, если оно идет первым в теме)", disagree_unhide: "Отменить (открыть сообщение)", disagree_unhide_title: "Удалить все жалобы с сообщения и сделать его видимым", disagree: "Отказаться", disagree_title: "Удалить все жалобы с данного сообщения", flagged_by: "Отмечено", error: "что-то пошло не так", view_message: "Ответить", no_results: "Жалоб нет.", summary: {action_type_3: {one: "оффтопик", other: "оффтопик x{{count}}", few: "оффтопик x{{count}}", many: "оффтопик x{{count}}"}, action_type_4: {one: "неуместно", other: "неуместное x{{count}}", few: "неуместное x{{count}}", many: "неуместное x{{count}}"}, action_type_6: {one: "спам", other: "СПАМ x{{count}}", few: "СПАМ x{{count}}", many: "СПАМ x{{count}}"}, action_type_7: {one: "Обычное", other: "обычное x{{count}}", few: "обычное x{{count}}", many: "обычное x{{count}}"}, action_type_8: {one: "спам", other: "СПАМ x{{count}}", few: "СПАМ x{{count}}", many: "СПАМ x{{count}}"}}}, groups: {title: "Группы", edit: "Изменить группы", selector_placeholder: "добавить пользователей", name_placeholder: "Название группы, без пробелов, по тем же правилам, что и имя пользователя.", about: "Здесь можно редактировать группы и имена групп", can_not_edit_automatic: "Принадлежность пользователя к системным группам определяется автоматически, однако вы можете самостоятельно переназначить группу пользователя и уровень доверия"}, api: {title: "API", long_title: "Информация об API", key: "Ключ", generate: "Сгенерировать ключ API", regenerate: "Сгенерировать ключ API заново", info_html: "Ваш API ключ позволит вам создавать и обновлять темы, используя JSON calls.", note_html: "Никому <strong>не сообщайте</strong> эти ключи, Тот, у кого они есть, сможет создавать сообщения, выдавая себя за любого пользователя форума."}, customize: {title: "Оформление", long_title: "Стили и заголовки", header: "Заголовок", css: "Таблица стилей", override_default: "Не использовать стандартную таблицу стилей", enabled: "Разрешить?", preview: "как будет", undo_preview: "как было", save: "Сохранить", "new": "Новое", new_style: "Новый стиль", "delete": "Удалить", delete_confirm: "Удалить настройки?", about: "Настройка сайта позволяет изменять таблицы стилей и заголовки. Выберите или добавьте что-нибудь для начала редактирования."}, email: {title: "Email", settings: "Настройки", logs: "Логи", sent_at: "Отправлено", email_type: "Вид сообщения", to_address: "Адрес", test_email_address: "Электронный адрес для проверки", send_test: "отправить тестовое письмо", sent_test: "отправлено!", delivery_method: "Метод отправки", preview_digest: "Обзор сводки", preview_digest_desc: "Инструмент для просмотра содержимого сводки, отсылаемой форумом по электронной почте пользователям.", refresh: "Обновить", format: "Формат", html: "html", text: "текст", last_seen_user: "Последнее посещение:", reply_key: "Ключ ответа"}, impersonate: {title: "Представиться как пользователь", username_or_email: "Имя пользователя или Email", help: "Здесь вы можете представится системе как пользователь форума, для отладки.", not_found: "Пользователь не найден.", invalid: "Извините, но вы не можете представиться этим пользователем."}, users: {title: "Пользователи", create: "Добавить администратора", last_emailed: "Последнее письмо", not_found: "К сожалению, этот пользователь не зарегистрирован.", "new": "Новые", active: "Активные", pending: "Ожидает одобрения", approved: "Подтвердить?", approved_selected: {one: "одобрить пользователя", other: "одобрить пользователей ({{count}})", few: "одобрить пользователей ({{count}})", many: "одобрить пользователей ({{count}})"}, titles: {active: "Активные пользователи", "new": "Новые пользователи", pending: "Пользователи, ожидающие одобрения", newuser: "Пользователи с уровнем доверия 0 (Новые пользователи)", basic: "Пользователи с уровнем доверия 1 (Базовые пользователи)", regular: "Пользователи с уровнем доверия 2 (Постоянные пользователи)", leader: "Пользователи с уровнем доверия 3 (Лидеры)", elder: "Пользователи с уровнем доверия 4 (Опытные пользователи)", admins: "Администраторы", moderators: "Модераторы", blocked: "Заблокированные пользователи"}}, user: {ban_failed: "Ошибка при наложении бана {{error}}", unban_failed: "Ошибка при снятии бана {{error}}", ban_duration: "Насколько вы хотите забанить пользователя? (в днях)", delete_all_posts: "Удалить все сообщения", ban: "Забанить", unban: "Разбанить", banned: "Забанен?", moderator: "Модератор?", admin: "Администратор?", blocked: "Заблокирован?", show_admin_profile: "Администратор", edit_title: "Редактировать заголовок", save_title: "Сохранить заголовок", refresh_browsers: "Выполнить перезагрузку браузера", show_public_profile: "Показать публичный профайл", impersonate: "Представиться как пользователь", revoke_admin: "Лишить прав Администратора", grant_admin: "Выдать права Администратора", revoke_moderation: "Лишить прав Модератора", grant_moderation: "Выдать права Модератора", unblock: "Разблокировать", block: "Заблокировать", reputation: "Репутация", permissions: "Права", activity: "Активность", like_count: "Получено симпатий", private_topics_count: "Частные темы", posts_read_count: "Прочитано сообщений", post_count: "Создано сообщений", topics_entered: "Просмотрено тем", flags_given_count: "Отправлено жалоб", flags_received_count: "Получено жалоб", approve: "Одобрить", approved_by: "Одобрено", approve_success: "Пользователь одобрен, на его электронную почту послано письмо с инструкцией\nпо активации.\n", approve_bulk_success: "Успех! Все выбранные пользователи одобрены\nи уведомлены.\n", time_read: "Время чтения", "delete": "Удалить пользователя", delete_forbidden: "Нельзя удалить этого пользователя, потому что у него есть сообщения. Вначале удалите все его сообщения.", delete_confirm: "Вы действительно хотите удалить этого пользователя? Удаление нельзя отменить!", deleted: "Пользователь удален.", delete_failed: "При удалении пользователя возникла ошибка. Для удаления пользователя необходимо сначала удалить все его сообщения.", send_activation_email: "Послать активационное письмо", activation_email_sent: "Активационное письмо отправлено.", send_activation_email_failed: "Во время отправки активационного письма произошла ошибка.", activate: "Активировать", activate_failed: "Во время активации пользователя произошла ошибка.", deactivate_account: "Деактивировать", deactivate_failed: "Во время деактивации пользователя произошла ошибка.", unblock_failed: "Не удалось разблокировать пользователя.", block_failed: "Не удалось заблокировать пользователя.", deactivate_explanation: "Потребовать повторного подтверждения email.", banned_explanation: "Забаненный пользователь не может войти.", block_explanation: "Заблокированный не может отвечать и создавать новые темы."}, site_content: {none: "Выберите тип контента, чтобы начать редактирование.", title: "Контент сайта", edit: "Изменить контент сайта"}, site_settings: {show_overriden: "Показывать только переопределенные", title: "Настройки сайта", reset: "вернуть по умолчанию", none: "(нет)"}}}}}, I18n.locale = "ru", function (e) {
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
                return V;
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
                return B;
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

    for (var z, P, L = "2.0.0", j = Math.round, O = {}, R = "undefined" != typeof module && module.exports, U = /^\/?Date\((\-?\d+)/i, F = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, H = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, Y = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, B = /\d\d?/, V = /\d{1,3}/, G = /\d{3}/, q = /\d{1,4}/, W = /[+\-]?\d{1,6}/, $ = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, K = /Z|[\+\-]\d\d:?\d\d/i, Q = /T/i, Z = /[\+\-]?\d+(\.\d{1,3})?/, J = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, X = "YYYY-MM-DDTHH:mm:ssZ", et = [
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
}, I18n.pluralizationRules.ru = function (e) {
    return 0 == e ? ["zero", "none", "other"] : 1 == e % 10 && 11 != e % 100 ? "one" : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? "few" : "many"
};