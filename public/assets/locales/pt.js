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
}, I18n.t = I18n.translate, I18n.l = I18n.localize, I18n.p = I18n.pluralize, MessageFormat = {locale: {}}, MessageFormat.locale.pt = function (e) {
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
}({}), I18n.translations = {pt: {js: {share: {topic: "partilhe um link para este tópico", post: "partilhe um link para esta mensagem"}, edit: "edite o título ou a categoria deste tópico", not_implemented: "Essa característica ainda não foi implementada, desculpe!", no_value: "Não", yes_value: "Sim", of_value: "de", generic_error: "Pedimos desculpa, ocorreu um erro.", log_in: "Log In", age: "Idade", last_post: "Último post", admin_title: "Admin", flags_title: "Flags", show_more: "mostrar mais", links: "Links", faq: "FAQ", you: "Você", ok: "ok", suggested_topics: {title: "Tópicos Sugeridos"}, bookmarks: {not_logged_in: "Desculpe, tem de estar ligado para fazer o bookmark destas mensagens.", created: "Você fez o bookmark desta mensagem.", not_bookmarked: "Você leu esta mensagem; clique para fazer o bookmark dela.", last_read: "Esta é a última mensagem que você leu."}, new_topics_inserted: "{{count}} novos tópicos.", show_new_topics: "Clque para mostrar.", preview: "prever", cancel: "cancelar", save: "Guardar Alterações", saving: "Guardando...", saved: "Guardado!", user_action_descriptions: {6: "Respostas"}, user: {profile: "Perfil", title: "Utilizador", mute: "Silenciar", edit: "Editar Preferências", download_archive: "fazer o download do arquivo das minhas mensagens", private_message: "Mensagem Privada", private_messages: "Mensagens", activity_stream: "Actividade", preferences: "Preferências", bio: "Sobre mim", change_password: "alterar", invited_by: "Convidado Por", trust_level: "Nível de Confiança", change_username: {action: "alterar", title: "Alterar Nome de Utilizador", confirm: "Poderá haver consequências ao alterar o nome de utilizador. Tens a certeza que o queres fazer?", taken: "Desculpa, esse nome de utilizador já está a ser usado", error: "Houve um erro ao alterar o teu nome de utilizador", invalid: "Esse nome de utilizador é inválido. Tem que conter apenas números e letras"}, change_email: {action: "alterar", title: "Alterar Email", taken: "Desculpa, esse email não é válido", error: "Houve um erro ao alterar o email. Talvez já esteja a ser utilizado?", success: "Enviamos um email para esse endereço. Por favor segue as instruções de confirmação"}, email: {title: "Email", instructions: "O teu email nunca vai ser visível publicamente", ok: "Parace estár bem. Vamos enviar-te um email para confirmar", invalid: "Por favor introduz um endereço de email válido", authenticated: "O teu email foi autenticado por {{provider}}.", frequency: "Vamos apenas enviar-te emails quando não te virmos à algum tempo e tu não tiveres visto as coisas que te temos enviado"}, name: {title: "Nome", instructions: "O teu nome completo; não precisa de ser único.", too_short: "O teu nome é demasiado curto", ok: "O teu nome parece estar bem"}, username: {title: "Nome de Utilizador", instructions: "As pessoas podem mencionar-te como @{{username}}.", available: "O teu nome de utilizador está disponível.", global_match: "O email corresponde ao nome de utilizador registado.", global_mismatch: "Já está registado. Tenta {{suggestion}}?", not_available: "Não está disponível. Tenta {{suggestion}}?", too_short: "O teu nome de utilizador é demasiado curto.", too_long: "O teu nome de utilizador é demasiado comprido.", checking: "A verificar disponibilidade do nome de utilizador...", enter_email: "Nome de utilizador encontrado. Intruduz o email referente."}, last_posted: "Último Post", last_emailed: "Último Email", last_seen: "Última vez visto", created: "Criado a", log_out: "Log Out", website: "Web Site", email_settings: "Email", email_digests: {title: "Quando não visito o site, enviar-me um email com um resumo do que é novo", daily: "diariamente", weekly: "semanalmente", bi_weekly: "duas em duas semanas"}, email_direct: "Receber um email quando alguém te cita, responde aos teus posts, ou menciona o teu @nome_de_utilizador", email_private_messages: "Recebe um email quando alguém te envia uma mensagem privada", other_settings: "Outros", new_topic_duration: {label: "Considerar tópicos como novos quando", not_viewed: "Não os vi ainda", last_here: "foram postados desde a última vez que estive lá", after_n_days: {one: "foram postados no último dia", other: "foram postados nos últimos {{count}} dias"}, after_n_weeks: {one: "foram postados na última semana", other: "foram postados nas últimas {{count}} semanas"}}, auto_track_topics: "Automaticamente vigiar os tópicos em que eu entro", auto_track_options: {never: "nunca", always: "sempre", after_n_seconds: {one: "passado 1 segundo", other: "passado {{count}} segundos"}, after_n_minutes: {one: "passado 1 minuto", other: "passado {{count}} minutos"}}, invited: {title: "Convites", user: "Utilizadores convidados", none: "{{username}} ainda não convidou ninguém para o site.", redeemed: "Convites usados", redeemed_at: "Usado em", pending: "Convites Pendentes", topics_entered: "Tópicos em que entrou", posts_read_count: "Posts Vistos", rescind: "Remover Convite", rescinded: "Convite Removido", time_read: "Tempo de Leitura", days_visited: "Dias Visitados", account_age_days: "Idade da conta em dias"}, password: {title: "Password", too_short: "A tua password é demasiado curta.", ok: "A tua password parece estár ok."}, ip_address: {title: "Último endereço IP"}, avatar: {title: "Avatar", instructions: "Nós utilizamos <a href='https://gravatar.com' target='_blank'>Gravatar</a> para os avatares baseados no teu email"}, filters: {all: "Todos"}, stream: {posted_by: "Postado por", sent_by: "Enviado por", private_message: "mansagem privada", the_topic: "o tópico"}}, loading: "A Carregar...", close: "Fechar", learn_more: "sabe mais...", year: "ano", year_desc: "tópicos postados nos últimos 365 dias", month: "mês", month_desc: "tópicos postados nos últimos 30 dias", week: "semana", week_desc: "tópicos postados nos últimos 7 dias", first_post: "Primeiro post", mute: "Silenciar", unmute: "Reativar", best_of: {title: "Melhor De", description: "Há <b>{{count}}</b> posts neste tópico. Isso é muito! Gostarias de poupar tempo alterando a vista para mostrar apenas os posts com mais interações e respostas?", button: 'Alterar para a vista "Melhor De"'}, private_message_info: {title: "Conversas Privadas", invite: "Convidar Outros..."}, email: "Email", username: "Username", last_seen: "Visto pela última vez", created: "Criado", trust_level: "Nível de confiança", create_account: {title: "Criar Conta", action: "Criar uma agora!", invite: "Ainda sem conta?", failed: "Alguma coisa correu mal, talvez este email já esteja registado, tenta o link para password esquecida."}, forgot_password: {title: "Esqueci a Password", action: "Esqueci-me da minha password", invite: "Insere o teu nome de utilizador ou endereço de email, e nós enviamos-te um email para repor a password.", reset: "Repor Password", complete: "Deverás receber um email com instruções de como repor a tua password em breve."}, login: {title: "Log In", username: "Login", password: "Password", email_placeholder: "endereço de email ou nome de utilizador", error: "Erro desconhecido", reset_password: "Repor Password", logging_in: "A fazer Log In...", or: "Ou", authenticating: "A auntenticar...", awaiting_confirmation: "A tua conta está à espera de ativação, utiliza o link 'esqueci a password' para pedir um novo link para ativar o email", awaiting_approval: "A tua conta ainda não foi aprovada por um moderador. Vais recever um email quando estiver aprovada.", google: {title: "Log In com Google", message: "A autenticar com Google (garante que os bloqueadores de pop-ups não está ativos)"}, twitter: {title: "Log In com Twitter", message: "A autenticar com Twitter (garante que os bloqueadores de pop-ups não está ativos)"}, facebook: {title: "Log In com Facebook", message: "A autenticar com Facebook (garante que os bloqueadores de pop-ups não está ativos)"}, yahoo: {title: "Log In com Yahoo", message: "A autenticar com Yahoo (garante que os bloqueadores de pop-ups não está ativos)"}}, composer: {saving_draft_tip: "a guardar", saved_draft_tip: "guardado", saved_local_draft_tip: "guardado localmente", min_length: {at_least: "insere pelo menos {{n}} caracteres", more: "{{n}} to go..."}, save_edit: "Guardar Edição", reply: "Responder", create_topic: "Criar um Tópico", create_pm: "Criar uma Mensagem Privada", users_placeholder: "Adicionar um utilizador", title_placeholder: "Escreve o teu título aqui. O que é esta discução sobre numa pequena frase?", reply_placeholder: "Escreve a tua resposta aqui. Utiliza Markdown ou BBCode para formatar. Arrasta ou cola aqui uma imagem para a enviar.", view_new_post: "Ver os teus novos posts.", saving: "A guardar...", saved: "Guardado!", saved_draft: "Tens um rascunho de um post em progresso. Clica em qualquer sitio nesta caixa para continuar a edição.", uploading: "A enviar...", show_preview: "mostrar pré-visualização &raquo;", hide_preview: "&laquo; esconder pré-visualização"}, notifications: {title: "notificações de mencionamento de @nome, respostas aos teus posts e tópicos, mensagens privadas, etc", none: "Não tens notifcações neste momento..", more: "ver notificações antigas", mentioned: "<span title='mentioned' class='icon'>@</span> {{username}} {{link}}", quoted: "<i title='quoted' class='icon icon-quote-right'></i> {{username}} {{link}}", replied: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", posted: "<i title='replied' class='icon icon-reply'></i> {{username}} {{link}}", edited: "<i title='edited' class='icon icon-pencil'></i> {{username}} {{link}}", liked: "<i title='liked' class='icon icon-heart'></i> {{username}} {{link}}", private_message: "<i class='icon icon-envelope-alt' title='private message'></i> {{username}} enviou-te uma mensagem privada: {{link}}", invited_to_private_message: "{{username}} convidou-te para uma conversa privada: {{link}}", invitee_accepted: "<i title='accepted your invitation' class='icon icon-signin'></i> {{username}} aceitou o teu convite", moved_post: "<i title='moved post' class='icon icon-arrow-right'></i> {{username}} moveu o post para {{link}}"}, image_selector: {from_my_computer: "Do meu dispositivo", from_the_web: "Da internet", add_image: "Adicionar Imagem", remote_tip: "insere o endereço de uma imagem no formato http://example.com/image.jpg", local_tip: "clica para selecionar uma imagem no teu dispositivo.", upload: "Enviar", uploading_image: "A enviar imagem"}, search: {title: "procurar por tópicos, posts, utilizadores, ou categorias", placeholder: "escreve aqui o teu termo de buscar", no_results: "Não foi encontrado nenhum resultado.", searching: "A procurar ..."}, site_map: "ir para outra lista de tópicos ou categorias", go_back: "voltar atrás", current_user: "ir para a tua página de utilizador", favorite: {title: "Favorito", help: "adicionar este tópico à tua lista de favoritos"}, topics: {no_favorited: "Ainda não marcaste nenhum tópico como favorito. Para marcar um tópico como favorito, clica na estrela à beira do título.", no_unread: "Não tens tópicos ainda não lidos para ler.", no_new: "Não tens novos tópicos para ler.", no_read: "Ainda não leste nenhum tópico.", no_posted: "Ainda não postaste em nenhum tópico.", no_latest: "Não há tópicos populares. Isso é triste.", footer: 'Não há mais tópicos neste categoria. <a href="/categories">Procurar todas as categorias</a> ou <a href="/">ver tópicos populares</a>'}, topic: {create_in: "Criar Tópico sobre {{categoryName}}", create: "Criar Tópico", create_long: "Criar um novo Tópico", private_message: "Começar uma nova conversa privada", list: "Tópicos", "new": "novo tópico", title: "Tópico", loading_more: "A carregar mais tópicos...", loading: "A carregar tópico...", missing: "Tópico não encontrado", not_found: {title: "Tópico não encontrado", description: "Desculpa, não podemos encontrar esse tópico. Talvez tenha sido apagado?"}, unread_posts: "tens {{unread}} posts antigos não lidos neste tópico", new_posts: "há {{new_posts}} novos posts neste tópico desde a última vez que o leste", likes: "há {{likes}} gostos neste tópico", back_to_list: "Voltar à lista dos Tópicos", options: "Opções do Tópico", show_links: "mostrar links dentro deste post", toggle_information: "alternar detalhes do tópico", read_more_in_category: "Queres ler mais? Procura outros tópicos em {{catLink}} ou {{latestLink}}.", read_more: "Queres ler mais? {{catLink}} ou {{latestLink}}.", browse_all_categories: "Procurar todas as categorias", view_latest_topics: "ver tópicos populares", progress: {title: "progresso do tópico", jump_top: "saltar para o primeiro post", jump_bottom: "saltar para o último post", total: "total de posts", current: "post atual"}, notifications: {title: "", reasons: {"3_2": "Irás receber notificações porque estás a observar este tópico.", "3_1": "Irás receber notificações porque criaste este tópico.", "2_4": "Irás receber notificações porque postaste uma resposta neste tópico.", "2_2": "Irás receber notificações porque estás a monitorizar este tópico.", 2: 'Irás receber notificações porque tu <a href="/users/{{username}}/preferences">leste este tópico</a>.', 1: "Irás ser notificado apenas se alguém menciona o teu @nome ou te responde ao teu post.", "1_2": "Irás ser notificado apenas se alguém menciona o teu @nome ou te responde ao teu post.", 0: "Estás a ignorar todas as notificações para este tópico.", "0_2": "Estás a ignorar todas as notificações para este tópico."}, watching: {title: "Observar", description: "o mesmo que monitorizar, mas ainda serás notificado de todos os novos posts."}, tracking: {title: "Monitorizar", description: "serás notificado de posts não lidos, mencionamentos de @nome, e respostas aos teus posts."}, regular: {title: "Regular", description: "irás ser notificado apenas se alguém menciona o teu @nome ou responde ao teu post."}, muted: {title: "Silenciar", description: "não serás notificado relativamente a nada deste tópico, e não aparecerá na tua tab de não lidos."}}, actions: {"delete": "Apagar Tópico", open: "Abrir Tópico", close: "Fechar Tópico", unpin: "Desafixar Tópico", pin: "Afixar Tópico", unarchive: "Desarquivar Tópico", archive: "Arquivar Tópico", invisible: "Tornar Invisível", visible: "Tornar Visível", reset_read: "Repor Data de Leitura", multi_select: "Alternar Multi-Seleção", convert_to_topic: "Converter a Tópico Regular"}, reply: {title: "Responder", help: "começa a compor uma resposta a este tópico"}, share: {title: "Partilhar", help: "partilhar um link para este tópico"}, inviting: "A convidar...", invite_private: {title: "Convidar para Conersa Privada", email_or_username: "Email ou Nome de Utilizador do Convidado", email_or_username_placeholder: "endereço de email ou username", action: "Convite", success: "Obrigado! Convidamos esse utilizador para participar nesta conversa privada.", error: "Desculpa, houve um erro ao convidar esse utilizador."}, invite_reply: {title: "Convidar um amigo para Responder", help: "envia convites aos teus amigos para que eles possam responder a este tópico com um simples clique.", email: "Enviaremos ao teu amigo um pequeno email para que ele possa responder a este tópico apenas com um clique.", email_placeholder: "endereço de email", success: "Obrigado! Enviamos um convite para <b>{{email}}</b>. Irás saber quando eles utilizarem o convite. Podes dirigir-te à tab de Convites na tua página de tulizador para saberes quem já convidaste.", error: "Desculpa não podíamos convidar essa pessoa. Talvez já seja um utilizador?"}, login_reply: "Log In para responder", filters: {user: "Estás a ver apenas os posts de um utilizador especifico.", best_of: "Estás a ver apenas os posts em 'Melhor De'.", cancel: "Mostrar todos os posts neste tópico outra vez."}, move_selected: {title: "Mover Posts Selectionados", topic_name: "Nome para o Novo Tópico:", error: "Desculpa, houve um erro ao tentar mover esses posts..", instructions: {one: "Estás prestes a criar um novo tópico e preenchê-lo com o post que selecionaste.", other: "Estás prestes a criar um novo tópico e preenchê-lo com os <b>{{count}}</b> posts que selecionaste."}}, multi_select: {select: "selecionar", selected: "({{count}}) selecionados", "delete": "apagar selecionados", cancel: "cancelar seleção", move: "mover selecionados", description: {one: "Selectionaste <b>1</b> post.", other: "Selecionaste <b>{{count}}</b> posts."}}}, post: {reply: "Em resposta a {{link}} por {{replyAvatar}} {{username}}", reply_topic: "Responder a {{link}}", edit: "Editar {{link}}", in_reply_to: "Em resposta a", reply_as_new_topic: "Responder como um novo Tópico", continue_discussion: "Continuar a discussão desde {{postLink}}:", follow_quote: "ir para o post citado", deleted_by_author: "(post removido pelo autor)", has_replies: {one: "Resposta", other: "Respostas"}, errors: {create: "Desculpa, houve um erro ao criar o teu post. Por favor tenta outra vez.", edit: "Desculpa, houve um erro ao editar o teu post. Por favor tenta outra vez.", upload: "Desculpa, houve um erro ao enviar esse ficheiro. Por favor tenta otura vez."}, abandon: "De certeza que queres abandonar o teu post?", archetypes: {save: "Guardar as Opções"}, controls: {reply: "começa a compor uma resposta a este tópico", like: "gostar deste tópico", edit: "editar este tópico", flag: "denuncia este tópico com uma flag para avisar os moderadores", "delete": "apagar este post", undelete: "desapagar este post", share: "partilhar um link para este post", bookmark: "marcar este post na tua página de utilizador", more: "Mais"}, actions: {flag: "Flag", clear_flags: {one: "Apagar flag", other: "Apagar flags"}, it_too: "{{alsoName}} também", undo: "Desfazer {{alsoName}}", by_you_and_others: {zero: "Tu {{long_form}}", one: "Tu e outra pessoa {{long_form}}", other: "Tu e outras {{count}} pessoas {{long_form}}"}, by_others: {one: "1 pessoa {{long_form}}", other: "{{count}} pessoas {{long_form}}"}}, edits: {one: "1 edição", other: "{{count}} edições", zero: "sem edições"}, "delete": {confirm: {one: "Tens a certeza que queres apagar este post?", other: "Tens a certeza que queres apagar todos esses posts?"}}}, category: {none: "(sem categoria)", edit: "editar", view: "Visualizar Tópicos na Categoria", "delete": "Apagar Categoria", create: "Criar Categoria", more_posts: "visualizar todos os {{posts}}...", name: "Nome da Categoria", description: "Descrição", topic: "tópico da categoria", color: "Cor", name_placeholder: "Deve ser curto e sucinto.", color_placeholder: "Qualquer cor web", delete_confirm: "Tens a certeza que queres apagar esta categoria?", list: "Lista de Categorias"}, flagging: {title: "Porque estás a pôr uma flag neste post?", action: "Flag Post", cant: "Desculpa, não podes por uma flag neste momento.", custom_placeholder: "Porquê a necessidade deste post ter atenção da moderação? Faz-nos saber especificamente quais as tuas preocupações, e fornece links relevantes se possível.", custom_message: {at_least: "insere pelo menos {{n}} caracteres", more: "{{n}} em falta...", left: "{{n}} restantes"}}, topic_summary: {title: "Sumário do Tópico", links_shown: "mostrar todos os {{totalLinks}} links..."}, topic_statuses: {locked: {help: "este tópico está fechado; não serão aceites mais respostas"}, pinned: {help: "este tópico está fixado; irá ser mostrado no topo da sua categoria"}, archived: {help: "este tópico está arquivado; está congelado e não pode ser alterado"}, invisible: {help: "este tópico está invisível; não aparecerá na listagem dos tópicos, e pode apenas ser acedido por link direto"}}, posts: "Posts", posts_long: "{{number}} posts neste tópico", original_post: "Post Original", views: "Visualizações", replies: "Respostas", views_long: "este tópico foi visto {{number}} vezes", activity: "Atividade", likes: "Gostos", top_contributors: "Participantes", category_title: "Categoria", categories_list: "Lista de Categorias", filters: {latest: {title: "Populares", help: "os tópicos recentes mais populares"}, favorited: {title: "Favoritos", help: "tópicos que marcaste como favorito"}, read: {title: "Lido", help: "tópicos que tu leste"}, categories: {title: "Categorias", title_in: "Categoria - {{categoryName}}", help: "todos os tópicos agrupados por categoria"}, unread: {title: {zero: "Não lido", one: "Não lido (1)", other: "Não lidos ({{count}})"}, help: "tópicos monitorizados com posts não lidos"}, "new": {title: {zero: "Novo", one: "Novo (1)", other: "Novos ({{count}})"}, help: "novos tópicos desde a tua última visita, e tópicos monitorizados com posts novos"}, posted: {title: "Meus posts", help: "tópicos em que postastes em"}, category: {title: {zero: "{{categoryName}}", one: "{{categoryName}} (1)", other: "{{categoryName}} ({{count}})"}, help: "tópicos populares na categoria {{categoryName}}"}}, type_to_filter: "escreve para filtrar...", admin: {title: "Discourse Admin", dashboard: "Painel Administrativo", flags: {title: "Flags", old: "Antigo", active: "Ativo", clear: "Apagar Flags", clear_title: "descartar todas a flags neste post (vai passar posts escondidos a visíveis)", "delete": "Apagar Post", delete_title: "apagar post (se for o primeiro post, apagar tópico)", flagged_by: "Flagged por"}, customize: {title: "Personalizar", header: "Cabeçalho", css: "Stylesheet", override_default: "Sobrepor padrão?", enabled: "Habilitado?", preview: "pré-visualização", undo_preview: "desfazer pré-visualização", save: "Guardar", "delete": "Apagar", delete_confirm: "Apagar esta personalização?"}, email: {title: "Email", sent_at: "Enviado a", email_type: "Tipo de Email", to_address: "Para (endereço)", test_email_address: "endereço de email para testar", send_test: "enviar email de teste", sent_test: "enviado!"}, impersonate: {title: "Personificar Utilizador", username_or_email: "Nome do Utilizador ou Email do Utilizador", help: "Utiliza este ferramenta para personificar uma conta de utilizador para efeitos de depuração.", not_found: "Esse utilizador não consegue ser encotrado.", invalid: "Desculpa, não podes personificar esse utilizador."}, users: {title: "Utilizadores", create: "Adicionar Utilizador Admin", last_emailed: "Último email enviado", not_found: "Desculpa, esse nome de utilizador não existe no nosso sistema.", "new": "Novo", active: "Ativo", pending: "Pendente", approved: "Aprovado?", approved_selected: {one: "aprovar utilizador", other: "aprovar utilizadores ({{count}})"}}, user: {ban_failed: "Algo correu mal ao banir este utilizador {{error}}", unban_failed: "Algo não correu bem ao desbanir este utilizador {{error}}", ban_duration: "Por quanto tempo gostarias de banir a pessoa? (dias)", delete_all_posts: "Apagar todos os posts", ban: "Banir", unban: "Desbanir", banned: "Banido?", moderator: "Moderador?", admin: "Admin?", show_admin_profile: "Admin", refresh_browsers: "Forçar atualização da página no browser", show_public_profile: "Mostrar Perfil Público", impersonate: "Personificar", revoke_admin: "Revogar Admin", grant_admin: "Conceder Admin", revoke_moderation: "Revogar Moderação", grant_moderation: "Conceder Moderação", reputation: "Reputação", permissions: "Permissões", activity: "Atividade", like_count: "Gostos recebidos", private_topics_count: "Contagem de tópicos privados", posts_read_count: "Posts lidos", post_count: "Posts criados", topics_entered: "Tópicos que entrou", flags_given_count: "Flags dadas", flags_received_count: "Flags recebidas", approve: "Aprovar", approved_by: "aprovado por", time_read: "Tempo de leitura"}, site_settings: {show_overriden: "Apenas mostrar valores alterados", title: "Configurações do Site", reset: "repor valores padrão"}}}}}, I18n.locale = "pt", function (e) {
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

    function p(e) {
        return e ? rt[e] || e.toLowerCase().replace(/(.)s$/, "$1") : e
    }

    function d(e, t) {
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

        for (var s = 5; s-- && V.test(t);)t = t.replace(V, n);
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

    for (var z, P, L = "2.0.0", j = Math.round, O = {}, R = "undefined" != typeof module && module.exports, U = /^\/?Date\((\-?\d+)/i, F = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, H = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, V = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, B = /\d\d?/, Y = /\d{1,3}/, G = /\d{3}/, q = /\d{1,4}/, W = /[+\-]?\d{1,6}/, $ = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, K = /Z|[\+\-]\d\d:?\d\d/i, Q = /T/i, Z = /[\+\-]?\d+(\.\d{1,3})?/, J = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, X = "YYYY-MM-DDTHH:mm:ssZ", et = [
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
        return e ? (t ? d(e, t) : O[e] || f(e), z.duration.fn._lang = z.fn._lang = f(e), void 0) : z.fn._lang._abbr
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
        return t = p(t), "year" === t || "month" === t ? (s = 432e5 * (this.daysInMonth() + a.daysInMonth()), r = 12 * (this.year() - a.year()) + (this.month() - a.month()), r += (this - z(this).startOf("month") - (a - z(a).startOf("month"))) / s, "year" === t && (r /= 12)) : (s = this - a - i, r = "second" === t ? s / 1e3 : "minute" === t ? s / 6e4 : "hour" === t ? s / 36e5 : "day" === t ? s / 864e5 : "week" === t ? s / 6048e5 : s), n ? r : o(r)
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
        return e = p(e), this[e.toLowerCase() + "s"]()
    }, as: function (e) {
        return e = p(e), this["as" + e.charAt(0).toUpperCase() + e.slice(1) + "s"]()
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