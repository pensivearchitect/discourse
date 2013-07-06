(function () {
    window.jQuery, Discourse.AdminCustomizeController = Discourse.Controller.extend({})
})(this), function () {
    window.jQuery, Discourse.AdminCustomizeController = Ember.ArrayController.extend({newCustomization: function () {
        var e = Discourse.SiteCustomization.create({name: Em.String.i18n("admin.customize.new_style")});
        this.pushObject(e), this.set("selectedItem", e)
    }, selectStyle: function (e) {
        this.set("selectedItem", e)
    }, save: function () {
        this.get("selectedItem").save()
    }, destroy: function () {
        var e = this;
        return bootbox.confirm(Em.String.i18n("admin.customize.delete_confirm"), Em.String.i18n("no_value"), Em.String.i18n("yes_value"), function (s) {
            var t;
            return s ? (t = e.get("selectedItem"), t.destroy(), e.set("selectedItem", null), e.removeObject(t)) : void 0
        })
    }})
}(this), function () {
    window.jQuery, Discourse.AdminDashboardController = Ember.Controller.extend({loading: !0, versionCheck: null, problemsCheckMinutes: 1, foundProblems: function () {
        return Discourse.User.current("admin") && this.get("problems") && this.get("problems").length > 0
    }.property("problems"), thereWereProblems: function () {
        return Discourse.User.current("admin") ? this.get("foundProblems") ? (this.set("hadProblems", !0), !0) : this.get("hadProblems") || !1 : !1
    }.property("foundProblems"), loadProblems: function () {
        this.set("loadingProblems", !0), this.set("problemsFetchedAt", new Date);
        var e = this;
        Discourse.AdminDashboard.fetchProblems().then(function (s) {
            e.set("problems", s.problems), e.set("loadingProblems", !1), e.problemsCheckInterval = s.problems && s.problems.length > 0 ? 1 : 10
        })
    }, problemsTimestamp: function () {
        return moment(this.get("problemsFetchedAt")).format("LLL")
    }.property("problemsFetchedAt")})
}(this), function () {
    window.jQuery, Discourse.AdminEmailIndexController = Discourse.Controller.extend(Discourse.Presence, {sendTestEmailDisabled: Em.computed.empty("testEmailAddress"), testEmailAddressChanged: function () {
        this.set("sentTestEmail", !1)
    }.observes("testEmailAddress"), sendTestEmail: function () {
        this.set("sentTestEmail", !1);
        var e = this;
        Discourse.ajax("/admin/email/test", {type: "POST", data: {email_address: this.get("testEmailAddress")}}).then(function () {
            e.set("sentTestEmail", !0)
        })
    }})
}(this), function () {
    window.jQuery, Discourse.AdminEmailPreviewDigestController = Discourse.ObjectController.extend(Discourse.Presence, {refresh: function () {
        var e = this.get("model"), s = this;
        s.set("loading", !0), Discourse.EmailPreview.findDigest(this.get("lastSeen")).then(function (t) {
            e.setProperties(t.getProperties("html_content", "text_content")), s.set("loading", !1)
        })
    }})
}(this), function () {
    window.jQuery, Discourse.AdminFlagsController = Ember.ArrayController.extend({disagreeFlags: function (e) {
        var s = this;
        e.disagreeFlags().then(function () {
            s.removeObject(e)
        }, function () {
            bootbox.alert(Em.String.i18n("admin.flags.error"))
        })
    }, agreeFlags: function (e) {
        var s = this;
        e.agreeFlags().then(function () {
            s.removeObject(e)
        }, function () {
            bootbox.alert(Em.String.i18n("admin.flags.error"))
        })
    }, deferFlags: function (e) {
        var s = this;
        e.deferFlags().then(function () {
            s.removeObject(e)
        }, function () {
            bootbox.alert(Em.String.i18n("admin.flags.error"))
        })
    }, deletePost: function (e) {
        var s = this;
        e.deletePost().then(function () {
            s.removeObject(e)
        }, function () {
            bootbox.alert(Em.String.i18n("admin.flags.error"))
        })
    }, adminOldFlagsView: Em.computed.equal("query", "old"), adminActiveFlagsView: Em.computed.equal("query", "active")})
}(this), function () {
    window.jQuery, Discourse.AdminGithubCommitsController = Ember.ArrayController.extend({goToGithub: function () {
        window.open("https://github.com/discourse/discourse")
    }})
}(this), function () {
    window.jQuery, Discourse.AdminGroupsController = Ember.Controller.extend({itemController: "adminGroup", edit: function (e) {
        this.get("model").select(e), e.load()
    }, refreshAutoGroups: function () {
        var e = this;
        this.set("refreshingAutoGroups", !0), Discourse.ajax("/admin/groups/refresh_automatic_groups", {type: "POST"}).then(function () {
            e.set("model", Discourse.Group.findAll()), e.set("refreshingAutoGroups", !1)
        })
    }, newGroup: function () {
        var e = Discourse.Group.create();
        e.set("loaded", !0);
        var s = this.get("model");
        s.addObject(e), s.select(e)
    }, save: function (e) {
        e.get("id") ? e.save() : e.create()
    }, destroy: function (e) {
        var s = this.get("model");
        e.get("id") && e.destroy().then(function () {
            s.removeObject(e)
        })
    }})
}(this), function () {
    window.jQuery, Discourse.AdminReportsController = Ember.ObjectController.extend({viewMode: "table", viewingTable: Em.computed.equal("viewMode", "table"), viewingBarChart: Em.computed.equal("viewMode", "barChart"), viewAsTable: function () {
        this.set("viewMode", "table")
    }, viewAsBarChart: function () {
        this.set("viewMode", "barChart")
    }})
}(this), function () {
    window.jQuery, Discourse.AdminSiteContentEditController = Discourse.Controller.extend({saveDisabled: function () {
        return this.get("saving") ? !0 : !this.get("content.allow_blank") && this.blank("content.content") ? !0 : !1
    }.property("saving", "content.content"), saveChanges: function () {
        var e = this;
        e.setProperties({saving: !0, saved: !1}), this.get("content").save().then(function () {
            e.setProperties({saving: !1, saved: !0})
        })
    }})
}(this), function () {
    window.jQuery, Discourse.AdminSiteSettingsController = Ember.ArrayController.extend(Discourse.Presence, {filter: null, onlyOverridden: !1, filteredContent: function () {
        if (!this.present("content"))return null;
        var e;
        this.get("filter") && (e = this.get("filter").toLowerCase());
        var s = this;
        return this.get("content").filter(function (t) {
            return s.get("onlyOverridden") && !t.get("overridden") ? !1 : e ? t.get("setting").toLowerCase().indexOf(e) > -1 ? !0 : t.get("description").toLowerCase().indexOf(e) > -1 ? !0 : t.get("value").toLowerCase().indexOf(e) > -1 ? !0 : !1 : !0
        })
    }.property("filter", "content.@each", "onlyOverridden"), resetDefault: function (e) {
        e.set("value", e.get("default")), e.save()
    }, save: function (e) {
        e.save()
    }, cancel: function (e) {
        e.resetValue()
    }})
}(this), function () {
    window.jQuery, Discourse.AdminUserController = Discourse.ObjectController.extend({editingTitle: !1, toggleTitleEdit: function () {
        this.set("editingTitle", !this.editingTitle)
    }, saveTitle: function () {
        Discourse.ajax("/users/" + this.get("username").toLowerCase(), {data: {title: this.get("title")}, type: "PUT"}).then(null, function (e) {
            bootbox.alert(Em.String.i18n("generic_error_with_reason", {error: "http: " + e.status + " - " + e.body}))
        }), this.toggleTitleEdit()
    }})
}(this), function () {
    window.jQuery, Discourse.AdminUsersListController = Ember.ArrayController.extend(Discourse.Presence, {username: null, query: null, selectAll: !1, content: null, loading: !1, selectAllChanged: function () {
        var e = this;
        _.each(this.get("content"), function (s) {
            s.set("selected", e.get("selectAll"))
        })
    }.observes("selectAll"), filterUsers: Discourse.debounce(function () {
        this.refreshUsers()
    }, 250).observes("username"), orderChanged: function () {
        this.refreshUsers()
    }.observes("query"), title: function () {
        return Em.String.i18n("admin.users.titles." + this.get("query"))
    }.property("query"), showApproval: function () {
        return Discourse.SiteSettings.must_approve_users ? "new" === this.get("query") ? !0 : "pending" === this.get("query") ? !0 : void 0 : !1
    }.property("query"), selectedCount: function () {
        return this.blank("content") ? 0 : this.get("content").filterProperty("selected").length
    }.property("content.@each.selected"), hasSelection: function () {
        return this.get("selectedCount") > 0
    }.property("selectedCount"), refreshUsers: function () {
        var e = this;
        e.set("loading", !0), Discourse.AdminUser.findAll(this.get("query"), this.get("username")).then(function (s) {
            e.set("content", s), e.set("loading", !1)
        })
    }, show: function (e) {
        return this.get("query") === e ? (this.refreshUsers(), void 0) : (this.set("query", e), void 0)
    }, approveUsers: function () {
        Discourse.AdminUser.bulkApprove(this.get("content").filterProperty("selected")), this.refreshUsers()
    }})
}(this), function () {
    window.jQuery, Handlebars.registerHelper("valueAtTrustLevel", function (e, s) {
        var t = Ember.Handlebars.get(this, e);
        if (t) {
            var a = t.find(function (e) {
                return parseInt(e.x, 10) === parseInt(s, 10)
            });
            return a ? a.y : 0
        }
    })
}(this), function () {
    window.jQuery, Discourse.AdminApi = Discourse.Model.extend({VALID_KEY_LENGTH: 64, keyExists: function () {
        var e = this.get("key") || "";
        return e && e.length === this.VALID_KEY_LENGTH
    }.property("key"), generateKey: function () {
        var e = this;
        Discourse.ajax("/admin/api/generate_key", {type: "POST"}).then(function (s) {
            e.set("key", s.key)
        })
    }, regenerateKey: function () {
        alert(Em.String.i18n("not_implemented"))
    }}), Discourse.AdminApi.reopenClass({find: function () {
        var e = Discourse.AdminApi.create();
        return Discourse.ajax("/admin/api").then(function (s) {
            e.setProperties(s)
        }), e
    }})
}(this), function () {
    window.jQuery, Discourse.AdminDashboard = Discourse.Model.extend({}), Discourse.AdminDashboard.reopenClass({find: function () {
        return Discourse.ajax("/admin/dashboard").then(function (e) {
            var s = Discourse.AdminDashboard.create(e);
            return s.set("loaded", !0), s
        })
    }, fetchProblems: function () {
        return Discourse.ajax("/admin/dashboard/problems", {type: "GET", dataType: "json"}).then(function (e) {
            var s = Discourse.AdminDashboard.create(e);
            return s.set("loaded", !0), s
        })
    }})
}(this), function () {
    window.jQuery, Discourse.AdminUser = Discourse.User.extend({deleteAllPosts: function () {
        var e = this;
        this.set("can_delete_all_posts", !1), Discourse.ajax("/admin/users/" + this.get("id") + "/delete_all_posts", {type: "PUT"}).then(function () {
            e.set("post_count", 0)
        })
    }, revokeAdmin: function () {
        return this.set("admin", !1), this.set("can_grant_admin", !0), this.set("can_revoke_admin", !1), Discourse.ajax("/admin/users/" + this.get("id") + "/revoke_admin", {type: "PUT"})
    }, grantAdmin: function () {
        this.set("admin", !0), this.set("can_grant_admin", !1), this.set("can_revoke_admin", !0), Discourse.ajax("/admin/users/" + this.get("id") + "/grant_admin", {type: "PUT"})
    }, revokeModeration: function () {
        return this.set("moderator", !1), this.set("can_grant_moderation", !0), this.set("can_revoke_moderation", !1), Discourse.ajax("/admin/users/" + this.get("id") + "/revoke_moderation", {type: "PUT"})
    }, grantModeration: function () {
        this.set("moderator", !0), this.set("can_grant_moderation", !1), this.set("can_revoke_moderation", !0), Discourse.ajax("/admin/users/" + this.get("id") + "/grant_moderation", {type: "PUT"})
    }, refreshBrowsers: function () {
        Discourse.ajax("/admin/users/" + this.get("id") + "/refresh_browsers", {type: "POST"}), bootbox.alert("Message sent to all clients!")
    }, approve: function () {
        this.set("can_approve", !1), this.set("approved", !0), this.set("approved_by", Discourse.User.current()), Discourse.ajax("/admin/users/" + this.get("id") + "/approve", {type: "PUT"})
    }, username_lower: function () {
        return this.get("username").toLowerCase()
    }.property("username"), trustLevel: function () {
        var e = Discourse.Site.instance();
        return e.get("trust_levels").findProperty("id", this.get("trust_level"))
    }.property("trust_level"), setOriginalTrustLevel: function () {
        this.set("originalTrustLevel", this.get("trust_level"))
    }, trustLevels: function () {
        var e = Discourse.Site.instance();
        return e.get("trust_levels")
    }.property("trust_level"), dirty: function () {
        return this.get("originalTrustLevel") !== parseInt(this.get("trustLevel.id"), 10)
    }.property("originalTrustLevel", "trustLevel.id"), saveTrustLevel: function () {
        Discourse.ajax("/admin/users/" + this.id + "/trust_level", {type: "PUT", data: {level: this.get("trustLevel.id")}}).then(function () {
            window.location.reload()
        }, function (e) {
            var s = Em.String.i18n("admin.user.trust_level_change_failed", {error: "http: " + e.status + " - " + e.body});
            bootbox.alert(s)
        })
    }, restoreTrustLevel: function () {
        this.set("trustLevel.id", this.get("originalTrustLevel"))
    }, isBanned: function () {
        return this.get("is_banned") === !0
    }.property("is_banned"), canBan: function () {
        return!this.get("admin") && !this.get("moderator")
    }.property("admin", "moderator"), banDuration: function () {
        var e = moment(this.banned_at), s = moment(this.banned_till);
        return e.format("L") + " - " + s.format("L")
    }.property("banned_till", "banned_at"), ban: function () {
        var e = parseInt(window.prompt(Em.String.i18n("admin.user.ban_duration")), 10);
        e > 0 && Discourse.ajax("/admin/users/" + this.id + "/ban", {type: "PUT", data: {duration: e}}).then(function () {
            window.location.reload()
        }, function (e) {
            var s = Em.String.i18n("admin.user.ban_failed", {error: "http: " + e.status + " - " + e.body});
            bootbox.alert(s)
        })
    }, unban: function () {
        Discourse.ajax("/admin/users/" + this.id + "/unban", {type: "PUT"}).then(function () {
            window.location.reload()
        }, function (e) {
            var s = Em.String.i18n("admin.user.unban_failed", {error: "http: " + e.status + " - " + e.body});
            bootbox.alert(s)
        })
    }, impersonate: function () {
        Discourse.ajax("/admin/impersonate", {type: "POST", data: {username_or_email: this.get("username")}}).then(function () {
            document.location = "/"
        }, function (e) {
            404 === e.status ? bootbox.alert(Em.String.i18n("admin.impersonate.not_found")) : bootbox.alert(Em.String.i18n("admin.impersonate.invalid"))
        })
    }, activate: function () {
        Discourse.ajax("/admin/users/" + this.id + "/activate", {type: "PUT"}).then(function () {
            window.location.reload()
        }, function (e) {
            var s = Em.String.i18n("admin.user.activate_failed", {error: "http: " + e.status + " - " + e.body});
            bootbox.alert(s)
        })
    }, deactivate: function () {
        Discourse.ajax("/admin/users/" + this.id + "/deactivate", {type: "PUT"}).then(function () {
            window.location.reload()
        }, function (e) {
            var s = Em.String.i18n("admin.user.deactivate_failed", {error: "http: " + e.status + " - " + e.body});
            bootbox.alert(s)
        })
    }, unblock: function () {
        Discourse.ajax("/admin/users/" + this.id + "/unblock", {type: "PUT"}).then(function () {
            window.location.reload()
        }, function (e) {
            var s = Em.String.i18n("admin.user.unblock_failed", {error: "http: " + e.status + " - " + e.body});
            bootbox.alert(s)
        })
    }, block: function () {
        Discourse.ajax("/admin/users/" + this.id + "/block", {type: "PUT"}).then(function () {
            window.location.reload()
        }, function (e) {
            var s = Em.String.i18n("admin.user.block_failed", {error: "http: " + e.status + " - " + e.body});
            bootbox.alert(s)
        })
    }, sendActivationEmail: function () {
        Discourse.ajax("/users/" + this.get("username") + "/send_activation_email", {type: "POST"}).then(function () {
            bootbox.alert(Em.String.i18n("admin.user.activation_email_sent"))
        }, function (e) {
            var s = Em.String.i18n("admin.user.send_activation_email_failed", {error: "http: " + e.status + " - " + e.body});
            bootbox.alert(s)
        })
    }, deleteForbidden: function () {
        return this.get("post_count") > 0
    }.property("post_count"), deleteButtonTitle: function () {
        return this.get("deleteForbidden") ? Em.String.i18n("admin.user.delete_forbidden") : null
    }.property("deleteForbidden"), destroy: function () {
        var e = this;
        bootbox.confirm(Em.String.i18n("admin.user.delete_confirm"), Em.String.i18n("no_value"), Em.String.i18n("yes_value"), function (s) {
            s && Discourse.ajax("/admin/users/" + e.get("id") + ".json", {type: "DELETE"}).then(function (s) {
                s.deleted ? bootbox.alert(Em.String.i18n("admin.user.deleted"), function () {
                    document.location = "/admin/users/list/active"
                }) : (bootbox.alert(Em.String.i18n("admin.user.delete_failed")), s.user && e.mergeAttributes(s.user))
            }, function () {
                Discourse.AdminUser.find(e.get("username")).then(function (s) {
                    e.mergeAttributes(s)
                }), bootbox.alert(Em.String.i18n("admin.user.delete_failed"))
            })
        })
    }, loadDetails: function () {
        var e = this;
        e.get("loadedDetails") || Discourse.AdminUser.find(e.get("username_lower")).then(function (s) {
            e.setProperties(s), e.set("loadedDetails", !0)
        })
    }}), Discourse.AdminUser.reopenClass({bulkApprove: function (e) {
        return _.each(e, function (e) {
            return e.set("approved", !0), e.set("can_approve", !1), e.set("selected", !1)
        }), bootbox.alert(Em.String.i18n("admin.user.approve_bulk_success")), Discourse.ajax("/admin/users/approve-bulk", {type: "PUT", data: {users: e.map(function (e) {
            return e.id
        })}})
    }, find: function (e) {
        return Discourse.ajax("/admin/users/" + e).then(function (e) {
            return e.loadedDetails = !0, Discourse.AdminUser.create(e)
        })
    }, findAll: function (e, s) {
        return Discourse.ajax("/admin/users/list/" + e + ".json", {data: {filter: s}}).then(function (e) {
            return e.map(function (e) {
                return Discourse.AdminUser.create(e)
            })
        })
    }})
}(this), function () {
    window.jQuery, Discourse.EmailLog = Discourse.Model.extend({}), Discourse.EmailLog.reopenClass({create: function (e) {
        return e.user && (e.user = Discourse.AdminUser.create(e.user)), this._super(e)
    }, findAll: function (e) {
        var s = Em.A();
        return Discourse.ajax("/admin/email/logs.json", {data: {filter: e}}).then(function (e) {
            _.each(e, function (e) {
                s.pushObject(Discourse.EmailLog.create(e))
            })
        }), s
    }})
}(this), function () {
    var e = window.jQuery;
    Discourse.EmailPreview = Discourse.Model.extend({}), Discourse.EmailPreview.reopenClass({findDigest: function (s) {
        return e.ajax("/admin/email/preview-digest.json", {data: {last_seen_at: s}}).then(function (e) {
            return Discourse.EmailPreview.create(e)
        })
    }})
}(this), function () {
    window.jQuery, Discourse.EmailSettings = Discourse.Model.extend({}), Discourse.EmailSettings.reopenClass({find: function () {
        return Discourse.ajax("/admin/email.json").then(function (e) {
            return Discourse.EmailSettings.create(e)
        })
    }})
}(this), function () {
    window.jQuery, Discourse.FlaggedPost = Discourse.Post.extend({summary: function () {
        return _(this.post_actions).groupBy(function (e) {
            return e.post_action_type_id
        }).map(function (e, s) {
            return Em.String.i18n("admin.flags.summary.action_type_" + s, {count: e.length})
        }).join(",")
    }.property(), flaggers: function () {
        var e, s = this;
        return e = [], _.each(this.post_actions, function (t) {
            var a = s.userLookup[t.user_id], n = Em.String.i18n("admin.flags.summary.action_type_" + t.post_action_type_id, {count: 1});
            e.push({user: a, flagType: n, flaggedAt: t.created_at})
        }), e
    }.property(), messages: function () {
        var e, s = this;
        return e = [], _.each(this.post_actions, function (t) {
            t.message && e.push({user: s.userLookup[t.user_id], message: t.message, permalink: t.permalink})
        }), e
    }.property(), lastFlagged: function () {
        return this.post_actions[0].created_at
    }.property(), user: function () {
        return this.userLookup[this.user_id]
    }.property(), topicHidden: function () {
        return!this.get("topic_visible")
    }.property("topic_hidden"), deletePost: function () {
        return"1" === this.get("post_number") ? Discourse.ajax("/t/" + this.topic_id, {type: "DELETE", cache: !1}) : Discourse.ajax("/posts/" + this.id, {type: "DELETE", cache: !1})
    }, disagreeFlags: function () {
        return Discourse.ajax("/admin/flags/disagree/" + this.id, {type: "POST", cache: !1})
    }, deferFlags: function () {
        return Discourse.ajax("/admin/flags/defer/" + this.id, {type: "POST", cache: !1})
    }, agreeFlags: function () {
        return Discourse.ajax("/admin/flags/agree/" + this.id, {type: "POST", cache: !1})
    }, postHidden: function () {
        return this.get("hidden")
    }.property(), extraClasses: function () {
        var e = [];
        return this.get("hidden") && e.push("hidden-post"), this.get("deleted") && e.push("deleted"), e.join(" ")
    }.property(), deleted: function () {
        return this.get("deleted_at") || this.get("topic_deleted_at")
    }.property()}), Discourse.FlaggedPost.reopenClass({findAll: function (e) {
        var s = Em.A();
        return s.set("loading", !0), Discourse.ajax("/admin/flags/" + e + ".json").then(function (e) {
            var t = {};
            _.each(e.users, function (e) {
                t[e.id] = Discourse.AdminUser.create(e)
            }), _.each(e.posts, function (e) {
                var a = Discourse.FlaggedPost.create(e);
                a.userLookup = t, s.pushObject(a)
            }), s.set("loading", !1)
        }), s
    }})
}(this), function () {
    window.jQuery, Discourse.GithubCommit = Discourse.Model.extend({gravatarUrl: function () {
        return this.get("author") && this.get("author.gravatar_id") ? "https://www.gravatar.com/avatar/" + this.get("author.gravatar_id") + ".png?s=38&r=pg&d=identicon" : "https://www.gravatar.com/avatar/b30fff48d257cdd17c4437afac19fd30.png?s=38&r=pg&d=identicon"
    }.property("commit"), commitUrl: function () {
        return"https://github.com/discourse/discourse/commit/" + this.get("sha")
    }.property("sha"), timeAgo: function () {
        return moment(this.get("commit.committer.date")).relativeAge({format: "medium", leaveAgo: !0})
    }.property("commit.committer.date")}), Discourse.GithubCommit.reopenClass({findAll: function () {
        var e = Em.A();
        return Discourse.ajax("https://api.github.com/repos/discourse/discourse/commits?callback=callback", {dataType: "jsonp", type: "get", data: {per_page: 40}}).then(function (s) {
            _.each(s.data, function (s) {
                e.pushObject(Discourse.GithubCommit.create(s))
            })
        }), e
    }})
}(this), function () {
    var e = window.jQuery;
    Discourse.Group = Discourse.Model.extend({loaded: !1, userCountDisplay: function () {
        var e = this.get("user_count");
        return e > 0 ? e : void 0
    }.property("user_count"), load: function () {
        var e = this.get("id");
        if (e && !this.get("loaded")) {
            var s = this;
            Discourse.ajax("/admin/groups/" + this.get("id") + "/users").then(function (e) {
                var t = Em.A();
                _.each(e, function (e) {
                    t.addObject(Discourse.User.create(e))
                }), s.set("users", t), s.set("loaded", !0)
            })
        }
    }, usernames: function () {
        var e = this.get("users"), s = "";
        return e && (s = _.map(e,function (e) {
            return e.get("username")
        }).join(",")), s
    }.property("users"), destroy: function () {
        var e = this;
        return e.set("disableSave", !0), Discourse.ajax("/admin/groups/" + this.get("id"), {type: "DELETE"}).then(function () {
            e.set("disableSave", !1)
        })
    }, create: function () {
        var e = this;
        return e.set("disableSave", !0), Discourse.ajax("/admin/groups", {type: "POST", data: {group: {name: this.get("name"), usernames: this.get("usernames")}}}).then(function (s) {
            e.set("disableSave", !1), e.set("id", s.id)
        })
    }, save: function () {
        var s = this;
        return s.set("disableSave", !0), Discourse.ajax("/admin/groups/" + this.get("id"), {type: "PUT", data: {group: {name: this.get("name"), usernames: this.get("usernames")}}, complete: function () {
            s.set("disableSave", !1)
        }}).then(null, function (s) {
            var t = e.parseJSON(s.responseText).errors;
            bootbox.alert(t)
        })
    }}), Discourse.Group.reopenClass({findAll: function () {
        var e = Discourse.SelectableArray.create();
        return Discourse.ajax("/admin/groups.json").then(function (s) {
            _.each(s, function (s) {
                e.addObject(Discourse.Group.create(s))
            })
        }), e
    }, find: function () {
        var e = new Em.Deferred;
        return setTimeout(function () {
            e.resolve(Discourse.Group.create({id: 1, name: "all mods", members: ["A", "b", "c"]}))
        }, 1e3), e
    }})
}(this), function () {
    window.jQuery, Discourse.Report = Discourse.Model.extend({reportUrl: function () {
        return"/admin/reports/" + this.get("type")
    }.property("type"), valueAt: function (e) {
        if (this.data) {
            var s = moment().subtract("days", e).format("YYYY-MM-DD"), t = this.data.find(function (e) {
                return e.x === s
            });
            if (t)return t.y
        }
        return 0
    }, sumDays: function (e, s) {
        if (this.data) {
            var t, a = moment().subtract("days", s).startOf("day"), n = moment().subtract("days", e).startOf("day"), h = 0;
            return _.each(this.data, function (e) {
                t = moment(e.x), t >= a && n >= t && (h += e.y)
            }), h
        }
    }, todayCount: function () {
        return this.valueAt(0)
    }.property("data"), yesterdayCount: function () {
        return this.valueAt(1)
    }.property("data"), lastSevenDaysCount: function () {
        return this.sumDays(1, 7)
    }.property("data"), lastThirtyDaysCount: function () {
        return this.sumDays(1, 30)
    }.property("data"), sevenDaysAgoCount: function () {
        return this.valueAt(7)
    }.property("data"), thirtyDaysAgoCount: function () {
        return this.valueAt(30)
    }.property("data"), yesterdayTrend: function () {
        var e = this.valueAt(1), s = this.valueAt(2);
        return e > s ? "trending-up" : s > e ? "trending-down" : "no-change"
    }.property("data"), sevenDayTrend: function () {
        var e = this.sumDays(1, 7), s = this.sumDays(8, 14);
        return e > s ? "trending-up" : s > e ? "trending-down" : "no-change"
    }.property("data"), thirtyDayTrend: function () {
        if (this.get("prev30Days")) {
            var e = this.sumDays(1, 30);
            if (e > this.get("prev30Days"))return"trending-up";
            if (this.get("prev30Days") > e)return"trending-down"
        }
        return"no-change"
    }.property("data", "prev30Days"), icon: function () {
        switch (this.get("type")) {
            case"flags":
                return"icon-flag";
            case"likes":
                return"icon-heart";
            default:
                return null
        }
    }.property("type"), percentChangeString: function (e, s) {
        var t = 100 * ((e - s) / s);
        return isNaN(t) || !isFinite(t) ? null : t > 0 ? "+" + t.toFixed(0) + "%" : t.toFixed(0) + "%"
    }, changeTitle: function (e, s, t) {
        var a = "", n = this.percentChangeString(e, s);
        return n && (a += n + " change. "), a += "Was " + s + " " + t + "."
    }, yesterdayCountTitle: function () {
        return this.changeTitle(this.valueAt(1), this.valueAt(2), "two days ago")
    }.property("data"), sevenDayCountTitle: function () {
        return this.changeTitle(this.sumDays(1, 7), this.sumDays(8, 14), "two weeks ago")
    }.property("data"), thirtyDayCountTitle: function () {
        return this.changeTitle(this.sumDays(1, 30), this.get("prev30Days"), "in the previous 30 day period")
    }.property("data")}), Discourse.Report.reopenClass({find: function (e) {
        var s = Discourse.Report.create({type: e});
        return Discourse.ajax("/admin/reports/" + e).then(function (e) {
            var t = 0;
            e.report.data.forEach(function (e) {
                e.y > t && (t = e.y)
            }), t > 0 && e.report.data.forEach(function (e) {
                e.percentage = Math.round(100 * (e.y / t))
            }), s.mergeAttributes(e.report), s.set("loaded", !0)
        }), s
    }})
}(this), function () {
    window.jQuery, Discourse.SiteContent = Discourse.Model.extend({markdown: Ember.computed.equal("format", "markdown"), plainText: Ember.computed.equal("format", "plain"), html: Ember.computed.equal("format", "html"), css: Ember.computed.equal("format", "css"), save: function () {
        return Discourse.ajax("/admin/site_contents/" + this.get("content_type"), {type: "PUT", data: {content: this.get("content")}})
    }}), Discourse.SiteContent.reopenClass({find: function (e) {
        return Discourse.ajax("/admin/site_contents/" + e).then(function (e) {
            return Discourse.SiteContent.create(e.site_content)
        })
    }})
}(this), function () {
    window.jQuery, Discourse.SiteContentType = Discourse.Model.extend({}), Discourse.SiteContentType.reopenClass({findAll: function () {
        var e = Em.A();
        return Discourse.ajax("/admin/site_content_types").then(function (s) {
            s.forEach(function (s) {
                e.pushObject(Discourse.SiteContentType.create(s))
            })
        }), e
    }})
}(this), function () {
    window.jQuery, Discourse.SiteCustomization = Discourse.Model.extend({trackedProperties: ["enabled", "name", "stylesheet", "header", "override_default_style"], init: function () {
        this._super(), this.startTrackingChanges()
    }, description: function () {
        return"" + this.name + (this.enabled ? " (*)" : "")
    }.property("selected", "name"), changed: function () {
        var e = this;
        if (!this.originals)return!1;
        var s = _.some(this.trackedProperties, function (s) {
            return e.originals[s] !== e.get(s)
        });
        return s && this.set("savingStatus", ""), s
    }.property("override_default_style", "enabled", "name", "stylesheet", "header", "originals"), startTrackingChanges: function () {
        var e = this, s = {};
        _.each(this.trackedProperties, function (t) {
            return s[t] = e.get(t), !0
        }), this.set("originals", s)
    }, previewUrl: function () {
        return"/?preview-style=" + this.get("key")
    }.property("key"), disableSave: function () {
        return!this.get("changed") || this.get("saving")
    }.property("changed"), save: function () {
        this.set("savingStatus", Em.String.i18n("saving")), this.set("saving", !0);
        var e = {name: this.name, enabled: this.enabled, stylesheet: this.stylesheet, header: this.header, override_default_style: this.override_default_style}, s = this;
        return Discourse.ajax("/admin/site_customizations" + (this.id ? "/" + this.id : ""), {data: {site_customization: e}, type: this.id ? "PUT" : "POST"}).then(function (e) {
            s.id || (s.set("id", e.id), s.set("key", e.key)), s.set("savingStatus", Em.String.i18n("saved")), s.set("saving", !1), s.startTrackingChanges()
        })
    }, destroy: function () {
        return this.id ? Discourse.ajax("/admin/site_customizations/" + this.id, {type: "DELETE"}) : void 0
    }});
    var e = Ember.ArrayProxy.extend({selectedItemChanged: function () {
        var e = this.get("selectedItem");
        _.each(this.get("content"), function (s) {
            return s.set("selected", e === s)
        })
    }.observes("selectedItem")});
    Discourse.SiteCustomization.reopenClass({findAll: function () {
        var s = e.create({content: [], loading: !0});
        return Discourse.ajax("/admin/site_customizations").then(function (e) {
            e && _.each(e.site_customizations, function (e) {
                s.pushObject(Discourse.SiteCustomization.create(e.site_customizations))
            }), s.set("loading", !1)
        }), s
    }})
}(this), function () {
    window.jQuery, Discourse.SiteSetting = Discourse.Model.extend({enabled: function (e, s) {
        return 1 === arguments.length ? this.blank("value") ? !1 : "true" === this.get("value") : (this.set("value", s ? "true" : "false"), this.save(), void 0)
    }.property("value"), dirty: function () {
        return this.get("originalValue") !== this.get("value")
    }.property("originalValue", "value"), overridden: function () {
        var e = this.get("value"), s = this.get("default");
        return null === e && (e = ""), null === s && (s = ""), e.toString() !== s.toString()
    }.property("value"), resetValue: function () {
        this.set("value", this.get("originalValue"))
    }, save: function () {
        var e = this;
        return Discourse.ajax("/admin/site_settings/" + this.get("setting"), {data: {value: this.get("value")}, type: "PUT"}).then(function () {
            e.set("originalValue", e.get("value"))
        })
    }, validValues: function () {
        var e;
        return e = Em.A(), _.each(this.get("valid_values"), function (s) {
            s.length > 0 && e.addObject({name: s, value: s})
        }), e
    }.property("valid_values"), allowsNone: function () {
        return _.indexOf(this.get("valid_values"), "") >= 0 ? "admin.site_settings.none" : void 0
    }.property("valid_values")}), Discourse.SiteSetting.reopenClass({findAll: function () {
        var e = Em.A();
        return Discourse.ajax("/admin/site_settings").then(function (s) {
            _.each(s.site_settings, function (s) {
                s.originalValue = s.value, e.pushObject(Discourse.SiteSetting.create(s))
            }), e.set("diags", s.diags)
        }), e
    }, update: function (e, s) {
        return Discourse.ajax("/admin/site_settings/" + e, {type: "PUT", data: {value: s}})
    }})
}(this), function () {
    window.jQuery, Discourse.VersionCheck = Discourse.Model.extend({upToDate: function () {
        return 0 === this.get("missing_versions_count") || null === this.get("missing_versions_count")
    }.property("missing_versions_count"), behindByOneVersion: function () {
        return 1 === this.get("missing_versions_count")
    }.property("missing_versions_count"), gitLink: function () {
        return"https://github.com/discourse/discourse/tree/" + this.get("installed_sha")
    }.property("installed_sha"), shortSha: function () {
        return this.get("installed_sha").substr(0, 10)
    }.property("installed_sha")}), Discourse.VersionCheck.reopenClass({find: function () {
        return Discourse.ajax("/admin/version_check").then(function (e) {
            return Discourse.VersionCheck.create(e)
        })
    }})
}(this), function () {
    window.jQuery, Discourse.AdminApiRoute = Discourse.Route.extend({model: function () {
        return Discourse.AdminApi.find()
    }})
}(this), function () {
    window.jQuery, Discourse.AdminCustomizeRoute = Discourse.Route.extend({model: function () {
        return Discourse.SiteCustomization.findAll()
    }})
}(this), function () {
    window.jQuery, Discourse.AdminDashboardRoute = Discourse.Route.extend({setupController: function (e) {
        this.fetchDashboardData(e), this.fetchGithubCommits(e)
    }, fetchDashboardData: function (e) {
        (!e.get("dashboardFetchedAt") || moment().subtract("hour", 1).toDate() > e.get("dashboardFetchedAt")) && (e.set("dashboardFetchedAt", new Date), Discourse.AdminDashboard.find().then(function (s) {
            Discourse.SiteSettings.version_checks && e.set("versionCheck", Discourse.VersionCheck.create(s.version_check)), _.each(s.reports, function (s) {
                e.set(s.type, Discourse.Report.create(s))
            }), e.set("admins", s.admins), e.set("moderators", s.moderators), e.set("blocked", s.blocked), e.set("top_referrers", s.top_referrers), e.set("top_traffic_sources", s.top_traffic_sources), e.set("top_referred_topics", s.top_referred_topics), e.set("loading", !1)
        })), (!e.get("problemsFetchedAt") || moment().subtract("minute", e.problemsCheckMinutes).toDate() > e.get("problemsFetchedAt")) && (e.set("problemsFetchedAt", new Date), e.loadProblems())
    }, fetchGithubCommits: function (e) {
        (!e.get("commitsCheckedAt") || moment().subtract("hour", 1).toDate() > e.get("commitsCheckedAt")) && (e.set("commitsCheckedAt", new Date), e.set("githubCommits", Discourse.GithubCommit.findAll()))
    }})
}(this), function () {
    window.jQuery, Discourse.AdminEmailIndexRoute = Discourse.Route.extend({setupController: function (e) {
        Discourse.EmailSettings.find().then(function (s) {
            e.set("model", s)
        })
    }, renderTemplate: function () {
        this.render("admin/templates/email_index", {into: "adminEmail"})
    }})
}(this), function () {
    window.jQuery, Discourse.AdminEmailLogsRoute = Discourse.Route.extend({model: function () {
        return Discourse.EmailLog.findAll()
    }, renderTemplate: function () {
        this.render("admin/templates/email_logs", {into: "adminEmail"})
    }})
}(this), function () {
    window.jQuery;
    var e = function () {
        return moment().subtract("days", 7).format("YYYY-MM-DD")
    };
    Discourse.AdminEmailPreviewDigestRoute = Discourse.Route.extend(Discourse.ModelReady, {model: function () {
        return Discourse.EmailPreview.findDigest(e())
    }, modelReady: function (s) {
        s.setProperties({lastSeen: e(), showHtml: !0})
    }})
}(this), function () {
    window.jQuery, Discourse.AdminFlagsActiveRoute = Discourse.Route.extend({model: function () {
        return Discourse.FlaggedPost.findAll("active")
    }, setupController: function (e, s) {
        var t = this.controllerFor("adminFlags");
        t.set("content", s), t.set("query", "active")
    }})
}(this), function () {
    window.jQuery, Discourse.AdminFlagsOldRoute = Discourse.Route.extend({model: function () {
        return Discourse.FlaggedPost.findAll("old")
    }, setupController: function (e, s) {
        var t = this.controllerFor("adminFlags");
        t.set("content", s), t.set("query", "old")
    }})
}(this), function () {
    window.jQuery, Discourse.AdminGroupsRoute = Discourse.Route.extend({model: function () {
        return Discourse.Group.findAll()
    }})
}(this), function () {
    window.jQuery, Discourse.AdminReportsRoute = Discourse.Route.extend({model: function (e) {
        return Discourse.Report.find(e.type)
    }})
}(this), function () {
    window.jQuery, Discourse.AdminRoute = Discourse.Route.extend({renderTemplate: function () {
        this.render("admin/templates/admin")
    }})
}(this), function () {
    window.jQuery, Discourse.Route.buildRoutes(function () {
        this.resource("admin", {path: "/admin"}, function () {
            this.route("dashboard", {path: "/"}), this.route("site_settings", {path: "/site_settings"}), this.resource("adminSiteContents", {path: "/site_contents"}, function () {
                this.resource("adminSiteContentEdit", {path: "/:content_type"})
            }), this.resource("adminEmail", {path: "/email"}, function () {
                this.route("logs", {path: "/logs"}), this.route("previewDigest", {path: "/preview-digest"})
            }), this.route("customize", {path: "/customize"}), this.route("api", {path: "/api"}), this.resource("adminReports", {path: "/reports/:type"}), this.resource("adminFlags", {path: "/flags"}, function () {
                this.route("active", {path: "/active"}), this.route("old", {path: "/old"})
            }), this.route("groups", {path: "/groups"}), this.resource("adminUsers", {path: "/users"}, function () {
                this.resource("adminUser", {path: "/:username"}), this.resource("adminUsersList", {path: "/list"}, function () {
                    this.route("active", {path: "/active"}), this.route("new", {path: "/new"}), this.route("pending", {path: "/pending"}), this.route("admins", {path: "/admins"}), this.route("moderators", {path: "/moderators"}), this.route("blocked", {path: "/blocked"}), this.route("newuser", {path: "/newuser"}), this.route("basic", {path: "/basic"}), this.route("regular", {path: "/regular"}), this.route("leaders", {path: "/leaders"}), this.route("elders", {path: "/elders"})
                })
            })
        })
    })
}(this), function () {
    window.jQuery, Discourse.AdminSiteContentEditRoute = Discourse.Route.extend({serialize: function (e) {
        return{content_type: e.get("content_type")}
    }, model: function (e) {
        return{content_type: e.content_type}
    }, renderTemplate: function () {
        this.render("admin/templates/site_content_edit", {into: "admin/templates/site_contents"})
    }, exit: function () {
        this._super(), this.render("admin/templates/site_contents_empty", {into: "admin/templates/site_contents"})
    }, setupController: function (e, s) {
        e.set("loaded", !1), e.setProperties({model: s, saving: !1, saved: !1}), Discourse.SiteContent.find(Em.get(s, "content_type")).then(function (s) {
            e.set("content", s), e.set("loaded", !0)
        })
    }})
}(this), function () {
    window.jQuery, Discourse.AdminSiteContentsRoute = Discourse.Route.extend({model: function () {
        return Discourse.SiteContentType.findAll()
    }, renderTemplate: function (e, s) {
        e.set("model", s), this.render("admin/templates/site_contents", {into: "admin/templates/admin"}), this.render("admin/templates/site_contents_empty", {into: "admin/templates/site_contents"})
    }})
}(this), function () {
    window.jQuery, Discourse.AdminSiteSettingsRoute = Discourse.Route.extend({model: function () {
        return Discourse.SiteSetting.findAll()
    }})
}(this), function () {
    window.jQuery, Discourse.AdminUserRoute = Discourse.Route.extend(Discourse.ModelReady, {serialize: function (e) {
        return{username: Em.get(e, "username").toLowerCase()}
    }, model: function (e) {
        return Discourse.AdminUser.find(Em.get(e, "username").toLowerCase())
    }, setupController: function (e, s) {
        e.set("model", s), s.setOriginalTrustLevel()
    }, renderTemplate: function () {
        this.render({into: "admin/templates/admin"})
    }, modelReady: function (e, s) {
        s.loadDetails(), e.set("model", s)
    }})
}(this), function () {
    window.jQuery, Discourse.AdminUsersListRoute = Discourse.Route.extend({renderTemplate: function () {
        this.render("admin/templates/users_list", {into: "admin/templates/admin"})
    }}), Discourse.AdminUsersListActiveRoute = Discourse.Route.extend({setupController: function () {
        return this.controllerFor("adminUsersList").show("active")
    }}), Discourse.AdminUsersListNewRoute = Discourse.Route.extend({setupController: function () {
        return this.controllerFor("adminUsersList").show("new")
    }}), Discourse.AdminUsersListPendingRoute = Discourse.Route.extend({setupController: function () {
        return this.controllerFor("adminUsersList").show("pending")
    }}), Discourse.AdminUsersListAdminsRoute = Discourse.Route.extend({setupController: function () {
        return this.controllerFor("adminUsersList").show("admins")
    }}), Discourse.AdminUsersListModeratorsRoute = Discourse.Route.extend({setupController: function () {
        return this.controllerFor("adminUsersList").show("moderators")
    }}), Discourse.AdminUsersListBlockedRoute = Discourse.Route.extend({setupController: function () {
        return this.controllerFor("adminUsersList").show("blocked")
    }})
}(this), function () {
    window.jQuery, Discourse.AdminUsersListNewuserRoute = Discourse.Route.extend({setupController: function () {
        return this.controllerFor("adminUsersList").show("newuser")
    }}), Discourse.AdminUsersListBasicRoute = Discourse.Route.extend({setupController: function () {
        return this.controllerFor("adminUsersList").show("basic")
    }}), Discourse.AdminUsersListRegularRoute = Discourse.Route.extend({setupController: function () {
        return this.controllerFor("adminUsersList").show("regular")
    }}), Discourse.AdminUsersListLeadersRoute = Discourse.Route.extend({setupController: function () {
        return this.controllerFor("adminUsersList").show("leader")
    }}), Discourse.AdminUsersListEldersRoute = Discourse.Route.extend({setupController: function () {
        return this.controllerFor("adminUsersList").show("elder")
    }})
}(this), Ember.TEMPLATES["admin/templates/admin"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(_((a = t.i18n, a ? a.call(e, "admin.dashboard.title", r) : D.call(e, "i18n", "admin.dashboard.title", r))))
    }

    function r(e, s) {
        var a, n, h, r, o, l = "";
        return s.buffer.push("\n          <li>"), h = {}, r = {}, o = {hash: {}, inverse: I.noop, fn: I.program(4, i, s), contexts: [e], types: ["STRING"], hashContexts: r, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "admin.site_settings", o) : D.call(e, "linkTo", "admin.site_settings", o), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</li>\n          <li>"), h = {}, r = {}, o = {hash: {}, inverse: I.noop, fn: I.program(6, u, s), contexts: [e], types: ["STRING"], hashContexts: r, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "adminSiteContents", o) : D.call(e, "linkTo", "adminSiteContents", o), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</li>\n        "), l
    }

    function i(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(_((a = t.i18n, a ? a.call(e, "admin.site_settings.title", r) : D.call(e, "i18n", "admin.site_settings.title", r))))
    }

    function u(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(_((a = t.i18n, a ? a.call(e, "admin.site_content.title", r) : D.call(e, "i18n", "admin.site_content.title", r))))
    }

    function o(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(_((a = t.i18n, a ? a.call(e, "admin.users.title", r) : D.call(e, "i18n", "admin.users.title", r))))
    }

    function l(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(_((a = t.i18n, a ? a.call(e, "admin.groups.title", r) : D.call(e, "i18n", "admin.groups.title", r))))
    }

    function c(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(_((a = t.i18n, a ? a.call(e, "admin.email.title", r) : D.call(e, "i18n", "admin.email.title", r))))
    }

    function p(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(_((a = t.i18n, a ? a.call(e, "admin.flags.title", r) : D.call(e, "i18n", "admin.flags.title", r))))
    }

    function f(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push("\n          <li>"), h = {}, r = {}, i = {hash: {}, inverse: I.noop, fn: I.program(17, d, s), contexts: [e], types: ["STRING"], hashContexts: r, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "admin.customize", i) : D.call(e, "linkTo", "admin.customize", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</li>\n          <li>"), h = {}, r = {}, i = {hash: {}, inverse: I.noop, fn: I.program(19, b, s), contexts: [e], types: ["STRING"], hashContexts: r, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "admin.api", i) : D.call(e, "linkTo", "admin.api", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</li>\n        "), u
    }

    function d(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(_((a = t.i18n, a ? a.call(e, "admin.customize.title", r) : D.call(e, "i18n", "admin.customize.title", r))))
    }

    function b(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(_((a = t.i18n, a ? a.call(e, "admin.api.title", r) : D.call(e, "i18n", "admin.api.title", r))))
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var m, y, x, v, g, T = "", D = t.helperMissing, _ = this.escapeExpression, I = this;
    return n.buffer.push('<div class="container">\n  <div class="row">\n    <div class="full-width">\n\n      <ul class="nav nav-pills">\n        <li>'), x = {}, v = {}, g = {hash: {}, inverse: I.noop, fn: I.program(1, h, n), contexts: [s], types: ["STRING"], hashContexts: v, hashTypes: x, data: n}, m = t.linkTo, y = m ? m.call(s, "admin.dashboard", g) : D.call(s, "linkTo", "admin.dashboard", g), (y || 0 === y) && n.buffer.push(y), n.buffer.push("</li>\n        "), x = {}, v = {}, y = t["if"].call(s, "currentUser.admin", {hash: {}, inverse: I.noop, fn: I.program(3, r, n), contexts: [s], types: ["ID"], hashContexts: v, hashTypes: x, data: n}), (y || 0 === y) && n.buffer.push(y), n.buffer.push("\n        <li>"), x = {}, v = {}, g = {hash: {}, inverse: I.noop, fn: I.program(8, o, n), contexts: [s], types: ["STRING"], hashContexts: v, hashTypes: x, data: n}, m = t.linkTo, y = m ? m.call(s, "adminUsersList.active", g) : D.call(s, "linkTo", "adminUsersList.active", g), (y || 0 === y) && n.buffer.push(y), n.buffer.push("</li>\n        <li>"), x = {}, v = {}, g = {hash: {}, inverse: I.noop, fn: I.program(10, l, n), contexts: [s], types: ["STRING"], hashContexts: v, hashTypes: x, data: n}, m = t.linkTo, y = m ? m.call(s, "admin.groups", g) : D.call(s, "linkTo", "admin.groups", g), (y || 0 === y) && n.buffer.push(y), n.buffer.push("</li>\n        <li>"), x = {}, v = {}, g = {hash: {}, inverse: I.noop, fn: I.program(12, c, n), contexts: [s], types: ["STRING"], hashContexts: v, hashTypes: x, data: n}, m = t.linkTo, y = m ? m.call(s, "adminEmail", g) : D.call(s, "linkTo", "adminEmail", g), (y || 0 === y) && n.buffer.push(y), n.buffer.push("</li>\n        <li>"), x = {}, v = {}, g = {hash: {}, inverse: I.noop, fn: I.program(14, p, n), contexts: [s], types: ["STRING"], hashContexts: v, hashTypes: x, data: n}, m = t.linkTo, y = m ? m.call(s, "adminFlags.active", g) : D.call(s, "linkTo", "adminFlags.active", g), (y || 0 === y) && n.buffer.push(y), n.buffer.push("</li>\n        "), x = {}, v = {}, y = t["if"].call(s, "currentUser.admin", {hash: {}, inverse: I.noop, fn: I.program(16, f, n), contexts: [s], types: ["ID"], hashContexts: v, hashTypes: x, data: n}), (y || 0 === y) && n.buffer.push(y), n.buffer.push("\n      </ul>\n\n      <div class='boxed white admin-content'>\n        <div class='admin-contents'>\n          "), x = {}, v = {}, n.buffer.push(_(t._triageMustache.call(s, "outlet", {hash: {}, contexts: [s], types: ["ID"], hashContexts: v, hashTypes: x, data: n}))), n.buffer.push("\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n"), T
}), Ember.TEMPLATES["admin/templates/api"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push("\n  <strong>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(d((a = t.i18n, a ? a.call(e, "admin.api.key", i) : f.call(e, "i18n", "admin.api.key", i)))), s.buffer.push(":</strong> "), h = {}, r = {}, s.buffer.push(d(t._triageMustache.call(e, "key", {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push("\n  <button class='btn' "), r = {target: e}, h = {target: "STRING"}, s.buffer.push(d(t.action.call(e, "regenerateKey", {hash: {target: "model"}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push(">\n    "), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(d((a = t.i18n, a ? a.call(e, "admin.api.regenerate", i) : f.call(e, "i18n", "admin.api.regenerate", i)))), s.buffer.push("\n  </button>\n  <p>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, a = t.i18n, n = a ? a.call(e, "admin.api.note_html", i) : f.call(e, "i18n", "admin.api.note_html", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</p>\n"), u
    }

    function r(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push("\n  <p>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, a = t.i18n, n = a ? a.call(e, "admin.api.info_html", i) : f.call(e, "i18n", "admin.api.info_html", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</p>\n  <button class='btn' "), r = {target: e}, h = {target: "STRING"}, s.buffer.push(d(t.action.call(e, "generateKey", {hash: {target: "model"}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push(">\n    "), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(d((a = t.i18n, a ? a.call(e, "admin.api.generate", i) : f.call(e, "i18n", "admin.api.generate", i)))), s.buffer.push("\n  </button>\n"), u
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var i, u, o, l, c, p = "", f = t.helperMissing, d = this.escapeExpression, b = this;
    return n.buffer.push("<h3>"), o = {}, l = {}, c = {hash: {}, contexts: [s], types: ["ID"], hashContexts: l, hashTypes: o, data: n}, n.buffer.push(d((i = t.i18n, i ? i.call(s, "admin.api.long_title", c) : f.call(s, "i18n", "admin.api.long_title", c)))), n.buffer.push("</h3>\n"), o = {}, l = {}, u = t["if"].call(s, "keyExists", {hash: {}, inverse: b.program(3, r, n), fn: b.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: l, hashTypes: o, data: n}), (u || 0 === u) && n.buffer.push(u), n.buffer.push("\n"), p
}), Ember.TEMPLATES["admin/templates/commits"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push('\n      <li>\n        <div class="left">\n          <img '), h = {src: e}, r = {src: "STRING"}, s.buffer.push(p(t.bindAttr.call(e, {hash: {src: "gravatarUrl"}, contexts: [], types: [], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push('>\n        </div>\n        <div class="right">\n          <span class="commit-message"><a '), h = {href: e}, r = {href: "STRING"}, s.buffer.push(p(t.bindAttr.call(e, {hash: {href: "commitUrl"}, contexts: [], types: [], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push(' target="_blank">'), r = {}, h = {}, s.buffer.push(p(t._triageMustache.call(e, "commit.message", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push('</a></span><br/>\n          <span class="commit-meta">'), r = {}, h = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}, s.buffer.push(p((a = t.i18n, a ? a.call(e, "admin.commits.by", i) : f.call(e, "i18n", "admin.commits.by", i)))), s.buffer.push(' <span class="committer-name">'), r = {}, h = {}, s.buffer.push(p(t._triageMustache.call(e, "commit.author.name", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push('</span> - <span class="commit-time">'), h = {unescaped: e}, r = {unescaped: "STRING"}, n = t._triageMustache.call(e, "timeAgo", {hash: {unescaped: "true"}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</span></span>\n        </div>\n      </li>\n    "), u
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var r, i, u, o, l, c = "", p = this.escapeExpression, f = t.helperMissing, d = this;
    return n.buffer.push('<div class="commits-widget">\n  <div class="header" '), u = {}, o = {}, n.buffer.push(p(t.action.call(s, "goToGithub", {hash: {}, contexts: [s], types: ["STRING"], hashContexts: o, hashTypes: u, data: n}))), n.buffer.push('>\n    <h1>\n      <i class="icon icon-github"></i>\n      '), u = {}, o = {}, l = {hash: {}, contexts: [s], types: ["ID"], hashContexts: o, hashTypes: u, data: n}, n.buffer.push(p((r = t.i18n, r ? r.call(s, "admin.commits.latest_changes", l) : f.call(s, "i18n", "admin.commits.latest_changes", l)))), n.buffer.push('\n    </h1>\n  </div>\n  <ul class="commits-list">\n    '), u = {}, o = {}, i = t.each.call(s, "controller", {hash: {}, inverse: d.noop, fn: d.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: o, hashTypes: u, data: n}), (i || 0 === i) && n.buffer.push(i), n.buffer.push("\n  </ul>\n</div>\n"), c
}), Ember.TEMPLATES["admin/templates/customize"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h = "";
        return s.buffer.push("\n    <li><a "), a = {}, n = {}, s.buffer.push(x(t.action.call(e, "selectStyle", "", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push(" "), n = {"class": e}, a = {"class": "STRING"}, s.buffer.push(x(t.bindAttr.call(e, {hash: {"class": "this.selected:active"}, contexts: [], types: [], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push(">"), a = {}, n = {}, s.buffer.push(x(t._triageMustache.call(e, "description", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("</a></li>\n    "), h
    }

    function r(e, s) {
        var a, n, h, r, u, o = "";
        return s.buffer.push("\n<div class='current-style'>\n  <div class='admin-controls'>\n    <ul class=\"nav nav-pills\">\n      <li "), h = {"class": e}, r = {"class": "STRING"}, s.buffer.push(x(t.bindAttr.call(e, {hash: {"class": "view.stylesheetActive:active"}, contexts: [], types: [], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push(">\n        <a "), h = {href: e, target: e}, r = {href: "STRING", target: "STRING"}, s.buffer.push(x(t.action.call(e, "selectStylesheet", {hash: {href: "true", target: "view"}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push(">"), r = {}, h = {}, u = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "admin.customize.css", u) : v.call(e, "i18n", "admin.customize.css", u)))), s.buffer.push("</a>\n      </li>\n      <li "), h = {"class": e}, r = {"class": "STRING"}, s.buffer.push(x(t.bindAttr.call(e, {hash: {"class": "view.headerActive:active"}, contexts: [], types: [], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push(">\n        <a "), h = {href: e, target: e}, r = {href: "STRING", target: "STRING"}, s.buffer.push(x(t.action.call(e, "selectHeader", {hash: {href: "true", target: "view"}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push(">"), r = {}, h = {}, u = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "admin.customize.header", u) : v.call(e, "i18n", "admin.customize.header", u)))), s.buffer.push("</a>\n      </li>\n    </ul>\n  </div>\n\n  "), r = {}, h = {}, n = t["with"].call(e, "selectedItem", {hash: {}, inverse: g.noop, fn: g.program(4, i, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n  <br>\n  <div class='status-actions'>\n    <span>"), r = {}, h = {}, u = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "admin.customize.override_default", u) : v.call(e, "i18n", "admin.customize.override_default", u)))), s.buffer.push(" "), h = {checkedBinding: e}, r = {checkedBinding: "STRING"}, s.buffer.push(x(t.view.call(e, "Ember.Checkbox", {hash: {checkedBinding: "selectedItem.override_default_style"}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push("</span>\n    <span>"), r = {}, h = {}, u = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "admin.customize.enabled", u) : v.call(e, "i18n", "admin.customize.enabled", u)))), s.buffer.push("  "), h = {checkedBinding: e}, r = {checkedBinding: "STRING"}, s.buffer.push(x(t.view.call(e, "Ember.Checkbox", {hash: {checkedBinding: "selectedItem.enabled"}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push("</span>\n    "), r = {}, h = {}, n = t.unless.call(e, "selectedItem.changed", {hash: {}, inverse: g.noop, fn: g.program(9, l, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n  </div>\n\n  <div class='buttons'>\n    <button "), r = {}, h = {}, s.buffer.push(x(t.action.call(e, "save", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push(" "), h = {disabled: e}, r = {disabled: "STRING"}, s.buffer.push(x(t.bindAttr.call(e, {hash: {disabled: "selectedItem.disableSave"}, contexts: [], types: [], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push(" class='btn'>"), r = {}, h = {}, u = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "admin.customize.save", u) : v.call(e, "i18n", "admin.customize.save", u)))), s.buffer.push("</button>\n    <span class='saving'>"), r = {}, h = {}, s.buffer.push(x(t._triageMustache.call(e, "selectedItem.savingStatus", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push("</span>\n    <a "), r = {}, h = {}, s.buffer.push(x(t.action.call(e, "destroy", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push(" class='delete-link'>"), r = {}, h = {}, u = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "admin.customize.delete", u) : v.call(e, "i18n", "admin.customize.delete", u)))), s.buffer.push("</a>\n  </div>\n\n</div>\n"), o
    }

    function i(e, s) {
        var a, n, h, r, i, l = "";
        return s.buffer.push("\n    "), h = {"class": e, value: e}, r = {"class": "STRING", value: "ID"}, i = {hash: {"class": "style-name", value: "name"}, contexts: [], types: [], hashContexts: h, hashTypes: r, data: s}, s.buffer.push(x((a = t.textField, a ? a.call(e, i) : v.call(e, "textField", i)))), s.buffer.push("\n    "), r = {}, h = {}, n = t["if"].call(e, "view.headerActive", {hash: {}, inverse: g.noop, fn: g.program(5, u, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n    "), r = {}, h = {}, n = t["if"].call(e, "view.stylesheetActive", {hash: {}, inverse: g.noop, fn: g.program(7, o, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n  "), l
    }

    function u(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n      "), n = {content: e, mode: e}, h = {content: "ID", mode: "STRING"}, r = {hash: {content: "header", mode: "html"}, contexts: [], types: [], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(x((a = t.aceEditor, a ? a.call(e, r) : v.call(e, "aceEditor", r)))), s.buffer.push("\n    "), i
    }

    function o(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n      "), n = {content: e, mode: e}, h = {content: "ID", mode: "STRING"}, r = {hash: {content: "stylesheet", mode: "scss"}, contexts: [], types: [], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(x((a = t.aceEditor, a ? a.call(e, r) : v.call(e, "aceEditor", r)))), s.buffer.push("\n    "), i
    }

    function l(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n    <a class='preview-link' "), n = {href: e}, h = {href: "STRING"}, s.buffer.push(x(t.bindAttr.call(e, {hash: {href: "selectedItem.previewUrl"}, contexts: [], types: [], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(" target='_blank'>"), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "admin.customize.preview", r) : v.call(e, "i18n", "admin.customize.preview", r)))), s.buffer.push("</a>\n    |\n    <a href=\"/?preview-style=\" target='_blank'>"), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "admin.customize.undo_preview", r) : v.call(e, "i18n", "admin.customize.undo_preview", r)))), s.buffer.push("</a><br>\n    "), i
    }

    function c(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push('\n  <p class="about">'), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "admin.customize.about", r) : v.call(e, "i18n", "admin.customize.about", r)))), s.buffer.push("</p>\n"), i
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var p, f, d, b, m, y = "", x = this.escapeExpression, v = t.helperMissing, g = this;
    return n.buffer.push("\n<div class='content-list span6'>\n  <h3>"), d = {}, b = {}, m = {hash: {}, contexts: [s], types: ["ID"], hashContexts: b, hashTypes: d, data: n}, n.buffer.push(x((p = t.i18n, p ? p.call(s, "admin.customize.long_title", m) : v.call(s, "i18n", "admin.customize.long_title", m)))), n.buffer.push("</h3>\n  <ul>\n    "), d = {}, b = {}, f = t.each.call(s, "model", {hash: {}, inverse: g.noop, fn: g.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: b, hashTypes: d, data: n}), (f || 0 === f) && n.buffer.push(f), n.buffer.push("\n  </ul>\n  <button "), d = {}, b = {}, n.buffer.push(x(t.action.call(s, "newCustomization", {hash: {}, contexts: [s], types: ["ID"], hashContexts: b, hashTypes: d, data: n}))), n.buffer.push(" class='btn'>"), d = {}, b = {}, m = {hash: {}, contexts: [s], types: ["ID"], hashContexts: b, hashTypes: d, data: n}, n.buffer.push(x((p = t.i18n, p ? p.call(s, "admin.customize.new", m) : v.call(s, "i18n", "admin.customize.new", m)))), n.buffer.push("</button>\n</div>\n\n\n"), d = {}, b = {}, f = t["if"].call(s, "selectedItem", {hash: {}, inverse: g.program(11, c, n), fn: g.program(3, r, n), contexts: [s], types: ["ID"], hashContexts: b, hashTypes: d, data: n}), (f || 0 === f) && n.buffer.push(f), n.buffer.push("\n<div class='clearfix'></div>\n\n"), y
}), Ember.TEMPLATES["admin/templates/dashboard"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, i, u, o = "";
        return s.buffer.push('\n    <div class="dashboard-stats detected-problems">\n      <div class="look-here"><i class="icon icon-warning-sign"></i></div>\n      <div class="problem-messages">\n        <p '), h = {"class": e}, i = {"class": "STRING"}, s.buffer.push(U(t.bindAttr.call(e, {hash: {"class": "loadingProblems:invisible"}, contexts: [], types: [], hashContexts: h, hashTypes: i, data: s}))), s.buffer.push(">\n          "), i = {}, h = {}, u = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: i, data: s}, s.buffer.push(U((a = t.i18n, a ? a.call(e, "admin.dashboard.problems_found", u) : P.call(e, "i18n", "admin.dashboard.problems_found", u)))), s.buffer.push("\n          <ul "), h = {"class": e}, i = {"class": "STRING"}, s.buffer.push(U(t.bindAttr.call(e, {hash: {"class": "loadingProblems:invisible"}, contexts: [], types: [], hashContexts: h, hashTypes: i, data: s}))), s.buffer.push(">\n            "), i = {}, h = {}, n = t.each.call(e, "problem", "in", "problems", {hash: {}, inverse: z.noop, fn: z.program(2, r, s), contexts: [e, e, e], types: ["ID", "ID", "ID"], hashContexts: h, hashTypes: i, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push('\n          </ul>\n        </p>\n        <p class="actions">\n          <small>'), i = {}, h = {}, u = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: i, data: s}, s.buffer.push(U((a = t.i18n, a ? a.call(e, "admin.dashboard.last_checked", u) : P.call(e, "i18n", "admin.dashboard.last_checked", u)))), s.buffer.push(": "), i = {}, h = {}, s.buffer.push(U(t._triageMustache.call(e, "problemsTimestamp", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: i, data: s}))), s.buffer.push("</small>\n          <button "), i = {}, h = {}, s.buffer.push(U(t.action.call(e, "loadProblems", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: i, data: s}))), s.buffer.push(' class="btn btn-small"><i class="icon icon-refresh"></i>'), i = {}, h = {}, u = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: i, data: s}, s.buffer.push(U((a = t.i18n, a ? a.call(e, "admin.dashboard.refresh_problems", u) : P.call(e, "i18n", "admin.dashboard.refresh_problems", u)))), s.buffer.push('</button>\n        </p>\n      </div>\n      <div class="clearfix"></div>\n    </div>\n  '), o
    }

    function r(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n              <li>"), n = {unescaped: e}, h = {unescaped: "STRING"}, a = t._triageMustache.call(e, "problem", {hash: {unescaped: "true"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("</li>\n            "), r
    }

    function i(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n    "), n = {}, h = {}, a = t["if"].call(e, "thereWereProblems", {hash: {}, inverse: z.noop, fn: z.program(5, u, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n  "), r
    }

    function u(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push('\n      <div class="dashboard-stats detected-problems">\n        <div class="look-here">&nbsp;</div>\n        <div class="problem-messages">\n          <p>\n            '), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.i18n, a ? a.call(e, "admin.dashboard.no_problems", r) : P.call(e, "i18n", "admin.dashboard.no_problems", r)))), s.buffer.push("\n            <button "), n = {}, h = {}, s.buffer.push(U(t.action.call(e, "loadProblems", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push(' class="btn btn-small"><i class="icon icon-refresh"></i>'), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.i18n, a ? a.call(e, "admin.dashboard.refresh_problems", r) : P.call(e, "i18n", "admin.dashboard.refresh_problems", r)))), s.buffer.push('</button>\n          </p>\n        </div>\n        <div class="clearfix"></div>\n      </div>\n    '), i
    }

    function o(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push("\n    <div "), h = {"class": e}, r = {"class": "STRING"}, s.buffer.push(U(t.bindAttr.call(e, {hash: {"class": ":dashboard-stats :version-check versionCheck.critical_updates:critical:normal"}, contexts: [], types: [], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push('>\n      <table class="table table-condensed table-hover">\n        <thead>\n          <tr>\n            <th>&nbsp;</th>\n            <th>'), r = {}, h = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}, s.buffer.push(U((a = t.i18n, a ? a.call(e, "admin.dashboard.installed_version", i) : P.call(e, "i18n", "admin.dashboard.installed_version", i)))), s.buffer.push("</th>\n            <th>"), r = {}, h = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}, s.buffer.push(U((a = t.i18n, a ? a.call(e, "admin.dashboard.latest_version", i) : P.call(e, "i18n", "admin.dashboard.latest_version", i)))), s.buffer.push("</th>\n            <th>&nbsp;</th>\n            <th>&nbsp;</th>\n          </tr>\n        </thead>\n        "), r = {}, h = {}, n = t.unless.call(e, "loading", {hash: {}, inverse: z.noop, fn: z.program(8, l, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n      </table>\n    </div>\n  "), u
    }

    function l(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push('\n          <tbody>\n            <td class="title">'), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(U((a = t.i18n, a ? a.call(e, "admin.dashboard.version", i) : P.call(e, "i18n", "admin.dashboard.version", i)))), s.buffer.push('</td>\n            <td class="version-number"><a '), r = {href: e}, h = {href: "STRING"}, s.buffer.push(U(t.bindAttr.call(e, {hash: {href: "versionCheck.gitLink"}, contexts: [], types: [], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push(' target="_blank">'), h = {}, r = {}, s.buffer.push(U(t._triageMustache.call(e, "versionCheck.installed_version", {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push('</a></td>\n            <td class="version-number">'), h = {}, r = {}, s.buffer.push(U(t._triageMustache.call(e, "versionCheck.latest_version", {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push('</td>\n            <td class="face">\n              '), h = {}, r = {}, n = t["if"].call(e, "versionCheck.upToDate", {hash: {}, inverse: z.program(11, p, s), fn: z.program(9, c, s), contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push('\n            </td>\n            <td class="version-notes">\n              '), h = {}, r = {}, n = t["if"].call(e, "versionCheck.upToDate", {hash: {}, inverse: z.program(18, m, s), fn: z.program(16, b, s), contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n            </td>\n          </tbody>\n        "), u
    }

    function c(e, s) {
        s.buffer.push("\n                <span class='icon update-to-date'>☻</span>\n              ")
    }

    function p(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n                <span "), n = {"class": e}, h = {"class": "STRING"}, s.buffer.push(U(t.bindAttr.call(e, {hash: {"class": ":icon versionCheck.critical_updates:critical-updates-available:updates-available"}, contexts: [], types: [], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n                  "), h = {}, n = {}, a = t["if"].call(e, "versionCheck.behindByOneVersion", {hash: {}, inverse: z.program(14, d, s), fn: z.program(12, f, s), contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n                </span>\n              "), r
    }

    function f(e, s) {
        s.buffer.push("\n                    ☺\n                  ")
    }

    function d(e, s) {
        s.buffer.push("\n                    ☹\n                  ")
    }

    function b(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n                "), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.i18n, a ? a.call(e, "admin.dashboard.up_to_date", r) : P.call(e, "i18n", "admin.dashboard.up_to_date", r)))), s.buffer.push("\n              "), i
    }

    function m(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push('\n                <span class="critical-note">'), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.i18n, a ? a.call(e, "admin.dashboard.critical_available", r) : P.call(e, "i18n", "admin.dashboard.critical_available", r)))), s.buffer.push('</span>\n                <span class="normal-note">'), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.i18n, a ? a.call(e, "admin.dashboard.updates_available", r) : P.call(e, "i18n", "admin.dashboard.updates_available", r)))), s.buffer.push("</span>\n                "), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.i18n, a ? a.call(e, "admin.dashboard.please_upgrade", r) : P.call(e, "i18n", "admin.dashboard.please_upgrade", r)))), s.buffer.push("\n              "), i
    }

    function y(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        "), n = {tagName: e}, h = {tagName: "STRING"}, r = {hash: {tagName: "tbody"}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin/templates/reports/trust_levels_report", "users_by_trust_level", r) : P.call(e, "render", "admin/templates/reports/trust_levels_report", "users_by_trust_level", r)))), s.buffer.push("\n      "), i
    }

    function x(e, s) {
        var a, n;
        a = {}, n = {}, s.buffer.push(U(t._triageMustache.call(e, "admins", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s})))
    }

    function v(e, s) {
        var a, n;
        a = {}, n = {}, s.buffer.push(U(t._triageMustache.call(e, "moderators", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s})))
    }

    function g(e, s) {
        var a, n;
        a = {}, n = {}, s.buffer.push(U(t._triageMustache.call(e, "blocked", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s})))
    }

    function T(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin_report_counts", "signups", r) : P.call(e, "render", "admin_report_counts", "signups", r)))), s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin_report_counts", "topics", r) : P.call(e, "render", "admin_report_counts", "topics", r)))), s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin_report_counts", "posts", r) : P.call(e, "render", "admin_report_counts", "posts", r)))), s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin_report_counts", "likes", r) : P.call(e, "render", "admin_report_counts", "likes", r)))), s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin_report_counts", "flags", r) : P.call(e, "render", "admin_report_counts", "flags", r)))), s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin_report_counts", "bookmarks", r) : P.call(e, "render", "admin_report_counts", "bookmarks", r)))), s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin_report_counts", "favorites", r) : P.call(e, "render", "admin_report_counts", "favorites", r)))), s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin_report_counts", "emails", r) : P.call(e, "render", "admin_report_counts", "emails", r)))), s.buffer.push("\n      "), i
    }

    function D(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin_report_counts", "user_to_user_private_messages", r) : P.call(e, "render", "admin_report_counts", "user_to_user_private_messages", r)))), s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin_report_counts", "system_private_messages", r) : P.call(e, "render", "admin_report_counts", "system_private_messages", r)))), s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin_report_counts", "notify_moderators_private_messages", r) : P.call(e, "render", "admin_report_counts", "notify_moderators_private_messages", r)))), s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin_report_counts", "notify_user_private_messages", r) : P.call(e, "render", "admin_report_counts", "notify_user_private_messages", r)))), s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin_report_counts", "moderator_warning_private_messages", r) : P.call(e, "render", "admin_report_counts", "moderator_warning_private_messages", r)))), s.buffer.push("\n      "), i
    }

    function _(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        "), n = {tagName: e}, h = {tagName: "STRING"}, r = {hash: {tagName: "tbody"}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(U((a = t.render, a ? a.call(e, "admin/templates/reports/per_day_counts_report", "visits", r) : P.call(e, "render", "admin/templates/reports/per_day_counts_report", "visits", r)))), s.buffer.push("\n      "), i
    }

    function I(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n        "), n = {}, h = {}, a = t.each.call(e, "data", "in", "top_referred_topics.data", {hash: {}, inverse: z.noop, fn: z.program(35, C, s), contexts: [e, e, e], types: ["ID", "ID", "ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n      "), r
    }

    function C(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push('\n          <tbody>\n            <tr>\n              <td class="title"><a href="/t/'), n = {}, h = {}, s.buffer.push(U(t.unbound.call(e, "data.topic_slug", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push("/"), n = {}, h = {}, s.buffer.push(U(t.unbound.call(e, "data.topic_id", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push('">'), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(U((a = t.shorten, a ? a.call(e, "data.topic_title", r) : P.call(e, "shorten", "data.topic_title", r)))), s.buffer.push('</a></td>\n              <td class="value">'), n = {}, h = {}, s.buffer.push(U(t._triageMustache.call(e, "data.num_clicks", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push("</td>\n            </tr>\n          </tbody>\n        "), i
    }

    function w(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n        "), n = {}, h = {}, a = t.each.call(e, "top_traffic_sources.data", {hash: {}, inverse: z.noop, fn: z.program(38, S, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n      "), r
    }

    function S(e, s) {
        var a, n, h = "";
        return s.buffer.push('\n          <tbody>\n            <tr>\n              <td class="title">'), a = {}, n = {}, s.buffer.push(U(t._triageMustache.call(e, "domain", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push('</td>\n              <td class="value">'), a = {}, n = {}, s.buffer.push(U(t._triageMustache.call(e, "num_clicks", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push('</td>\n              <td class="value">'), a = {}, n = {}, s.buffer.push(U(t._triageMustache.call(e, "num_topics", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push('</td>\n              <td class="value">'), a = {}, n = {}, s.buffer.push(U(t._triageMustache.call(e, "num_users", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("</td>\n            </tr>\n          </tbody>\n        "), h
    }

    function E(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n        "), n = {}, h = {}, a = t.each.call(e, "top_referrers.data", {hash: {}, inverse: z.noop, fn: z.program(41, A, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n      "), r
    }

    function A(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push('\n          <tbody>\n            <tr>\n              <td class="title">'), h = {}, r = {}, i = {hash: {}, inverse: z.noop, fn: z.program(42, k, s), contexts: [e, e], types: ["STRING", "ID"], hashContexts: r, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "adminUser", "", i) : P.call(e, "linkTo", "adminUser", "", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push('</td>\n              <td class="value">'), h = {}, r = {}, s.buffer.push(U(t._triageMustache.call(e, "num_clicks", {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push('</td>\n              <td class="value">'), h = {}, r = {}, s.buffer.push(U(t._triageMustache.call(e, "num_topics", {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push("</td>\n            </tr>\n          </tbody>\n        "), u
    }

    function k(e, s) {
        var a, n;
        a = {}, n = {}, s.buffer.push(U(t.unbound.call(e, "username", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s})))
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var R, N, G, M, j, L = "", U = this.escapeExpression, P = t.helperMissing, z = this;
    return n.buffer.push('<div class="dashboard-left">\n  '), G = {}, M = {}, R = t["if"].call(s, "foundProblems", {hash: {}, inverse: z.program(4, i, n), fn: z.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}), (R || 0 === R) && n.buffer.push(R), n.buffer.push("\n\n  "), G = {}, M = {}, R = t["if"].call(s, "Discourse.SiteSettings.version_checks", {hash: {}, inverse: z.noop, fn: z.program(7, o, n), contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}), (R || 0 === R) && n.buffer.push(R), n.buffer.push('\n\n  <div class="dashboard-stats trust-levels">\n    <table class="table table-condensed table-hover">\n      <thead>\n        <tr>\n          <th>&nbsp;</th>\n          <th>0</th>\n          <th>1</th>\n          <th>2</th>\n          <th>3</th>\n          <th>4</th>\n        </tr>\n      </thead>\n      '), G = {}, M = {}, R = t.unless.call(s, "loading", {hash: {}, inverse: z.noop, fn: z.program(20, y, n), contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}), (R || 0 === R) && n.buffer.push(R), n.buffer.push('\n    </table>\n  </div>\n\n  <div class="dashboard-stats totals">\n    <span class="title"><i class=\'icon icon-trophy\'></i> '), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.admins", j) : P.call(s, "i18n", "admin.dashboard.admins", j)))), n.buffer.push('</span>\n    <span class="value">'), G = {}, M = {}, j = {hash: {}, inverse: z.noop, fn: z.program(22, x, n), contexts: [s], types: ["STRING"], hashContexts: M, hashTypes: G, data: n}, R = t.linkTo, N = R ? R.call(s, "adminUsersList.admins", j) : P.call(s, "linkTo", "adminUsersList.admins", j), (N || 0 === N) && n.buffer.push(N), n.buffer.push("</span>\n    <span class=\"title\"><i class='icon icon-magic'></i> "), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.moderators", j) : P.call(s, "i18n", "admin.dashboard.moderators", j)))), n.buffer.push('</span>\n    <span class="value">'), G = {}, M = {}, j = {hash: {}, inverse: z.noop, fn: z.program(24, v, n), contexts: [s], types: ["STRING"], hashContexts: M, hashTypes: G, data: n}, R = t.linkTo, N = R ? R.call(s, "adminUsersList.moderators", j) : P.call(s, "linkTo", "adminUsersList.moderators", j), (N || 0 === N) && n.buffer.push(N), n.buffer.push("</span>\n    <span class=\"title\"><i class='icon icon-ban-circle'></i> "), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.blocked", j) : P.call(s, "i18n", "admin.dashboard.blocked", j)))), n.buffer.push('</span>\n    <span class="value">'), G = {}, M = {}, j = {hash: {}, inverse: z.noop, fn: z.program(26, g, n), contexts: [s], types: ["STRING"], hashContexts: M, hashTypes: G, data: n}, R = t.linkTo, N = R ? R.call(s, "adminUsersList.blocked", j) : P.call(s, "linkTo", "adminUsersList.blocked", j), (N || 0 === N) && n.buffer.push(N), n.buffer.push('</span>\n  </div>\n\n  <div class="dashboard-stats">\n    <table class="table table-condensed table-hover">\n      <thead>\n        <tr>\n          <th>&nbsp;</th>\n          <th>'), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.today", j) : P.call(s, "i18n", "admin.dashboard.reports.today", j)))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.yesterday", j) : P.call(s, "i18n", "admin.dashboard.reports.yesterday", j)))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.last_7_days", j) : P.call(s, "i18n", "admin.dashboard.reports.last_7_days", j)))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.last_30_days", j) : P.call(s, "i18n", "admin.dashboard.reports.last_30_days", j)))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.all", j) : P.call(s, "i18n", "admin.dashboard.reports.all", j)))), n.buffer.push("</th>\n        </tr>\n      </thead>\n      "), G = {}, M = {}, N = t.unless.call(s, "loading", {hash: {}, inverse: z.noop, fn: z.program(28, T, n), contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}), (N || 0 === N) && n.buffer.push(N), n.buffer.push('\n    </table>\n  </div>\n\n  <div class="dashboard-stats">\n    <table class="table table-condensed table-hover">\n      <thead>\n        <tr>\n          <th class="title" title="'), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.private_messages_title", j) : P.call(s, "i18n", "admin.dashboard.private_messages_title", j)))), n.buffer.push('"><i class="icon icon-envelope-alt"></i> '), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.private_messages_short", j) : P.call(s, "i18n", "admin.dashboard.private_messages_short", j)))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.today", j) : P.call(s, "i18n", "admin.dashboard.reports.today", j)))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.yesterday", j) : P.call(s, "i18n", "admin.dashboard.reports.yesterday", j)))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.last_7_days", j) : P.call(s, "i18n", "admin.dashboard.reports.last_7_days", j)))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.last_30_days", j) : P.call(s, "i18n", "admin.dashboard.reports.last_30_days", j)))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.all", j) : P.call(s, "i18n", "admin.dashboard.reports.all", j)))), n.buffer.push("</th>\n        </tr>\n      </thead>\n      "), G = {}, M = {}, N = t.unless.call(s, "loading", {hash: {}, inverse: z.noop, fn: z.program(30, D, n), contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}), (N || 0 === N) && n.buffer.push(N), n.buffer.push('\n    </table>\n  </div>\n\n  <div class="dashboard-stats">\n    <table class="table table-condensed table-hover">\n      <thead>\n        <tr>\n          <th>&nbsp;</th>\n          <th>'), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.today", j) : P.call(s, "i18n", "admin.dashboard.reports.today", j)))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.yesterday", j) : P.call(s, "i18n", "admin.dashboard.reports.yesterday", j)))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.7_days_ago", j) : P.call(s, "i18n", "admin.dashboard.reports.7_days_ago", j)))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.30_days_ago", j) : P.call(s, "i18n", "admin.dashboard.reports.30_days_ago", j)))), n.buffer.push("</th>\n        </tr>\n      </thead>\n      "), G = {}, M = {}, N = t.unless.call(s, "loading", {hash: {}, inverse: z.noop, fn: z.program(32, _, n), contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}), (N || 0 === N) && n.buffer.push(N), n.buffer.push('\n    </table>\n  </div>\n</div>\n\n<div class="dashboard-right">\n  '), G = {}, M = {}, j = {hash: {}, contexts: [s, s], types: ["STRING", "ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.render, R ? R.call(s, "admin/templates/commits", "githubCommits", j) : P.call(s, "render", "admin/templates/commits", "githubCommits", j)))), n.buffer.push('\n\n  <div class="dashboard-stats">\n    <table class="table table-condensed table-hover">\n      <thead>\n        <tr>\n          <th class="title">'), G = {}, M = {}, n.buffer.push(U(t._triageMustache.call(s, "top_referred_topics.title", {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}))), n.buffer.push(" ("), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.last_30_days", j) : P.call(s, "i18n", "admin.dashboard.reports.last_30_days", j)))), n.buffer.push(")</th>\n          <th>"), G = {}, M = {}, n.buffer.push(U(t._triageMustache.call(s, "top_referred_topics.ytitles.num_clicks", {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}))), n.buffer.push("</th>\n        </tr>\n      </thead>\n      "), G = {}, M = {}, N = t.unless.call(s, "loading", {hash: {}, inverse: z.noop, fn: z.program(34, I, n), contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}), (N || 0 === N) && n.buffer.push(N), n.buffer.push('\n    </table>\n  </div>\n\n  <div class="dashboard-stats">\n    <table class="table table-condensed table-hover">\n      <thead>\n        <tr>\n          <th class="title">'), G = {}, M = {}, n.buffer.push(U(t._triageMustache.call(s, "top_traffic_sources.title", {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}))), n.buffer.push(" ("), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.last_30_days", j) : P.call(s, "i18n", "admin.dashboard.reports.last_30_days", j)))), n.buffer.push(")</th>\n          <th>"), G = {}, M = {}, n.buffer.push(U(t._triageMustache.call(s, "top_traffic_sources.ytitles.num_clicks", {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, n.buffer.push(U(t._triageMustache.call(s, "top_traffic_sources.ytitles.num_topics", {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, n.buffer.push(U(t._triageMustache.call(s, "top_traffic_sources.ytitles.num_users", {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}))), n.buffer.push("</th>\n        </tr>\n      </thead>\n      "), G = {}, M = {}, N = t.unless.call(s, "loading", {hash: {}, inverse: z.noop, fn: z.program(37, w, n), contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}), (N || 0 === N) && n.buffer.push(N), n.buffer.push('\n    </table>\n  </div>\n\n  <div class="dashboard-stats">\n    <table class="table table-condensed table-hover">\n      <thead>\n        <tr>\n          <th class="title">'), G = {}, M = {}, n.buffer.push(U(t._triageMustache.call(s, "top_referrers.title", {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}))), n.buffer.push(" ("), G = {}, M = {}, j = {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}, n.buffer.push(U((R = t.i18n, R ? R.call(s, "admin.dashboard.reports.last_30_days", j) : P.call(s, "i18n", "admin.dashboard.reports.last_30_days", j)))), n.buffer.push(")</th>\n          <th>"), G = {}, M = {}, n.buffer.push(U(t._triageMustache.call(s, "top_referrers.ytitles.num_clicks", {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}))), n.buffer.push("</th>\n          <th>"), G = {}, M = {}, n.buffer.push(U(t._triageMustache.call(s, "top_referrers.ytitles.num_topics", {hash: {}, contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}))), n.buffer.push("</th>\n        </tr>\n      </thead>\n      "), G = {}, M = {}, N = t.unless.call(s, "loading", {hash: {}, inverse: z.noop, fn: z.program(40, E, n), contexts: [s], types: ["ID"], hashContexts: M, hashTypes: G, data: n}), (N || 0 === N) && n.buffer.push(N), n.buffer.push("\n    </table>\n  </div>\n</div>\n<div class='clearfix'></div>\n"), L
}), Ember.TEMPLATES["admin/templates/email"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(b((a = t.i18n, a ? a.call(e, "admin.email.settings", r) : d.call(e, "i18n", "admin.email.settings", r))))
    }

    function r(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(b((a = t.i18n, a ? a.call(e, "admin.email.logs", r) : d.call(e, "i18n", "admin.email.logs", r))))
    }

    function i(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(b((a = t.i18n, a ? a.call(e, "admin.email.preview_digest", r) : d.call(e, "i18n", "admin.email.preview_digest", r))))
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var u, o, l, c, p, f = "", d = t.helperMissing, b = this.escapeExpression, m = this;
    return n.buffer.push("<div class='admin-controls'>\n  <div class='span15'>\n    <ul class=\"nav nav-pills\">\n      <li>"), l = {}, c = {}, p = {hash: {}, inverse: m.noop, fn: m.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: c, hashTypes: l, data: n}, u = t.linkTo, o = u ? u.call(s, "adminEmail.index", p) : d.call(s, "linkTo", "adminEmail.index", p), (o || 0 === o) && n.buffer.push(o), n.buffer.push("</li>\n      <li>"), l = {}, c = {}, p = {hash: {}, inverse: m.noop, fn: m.program(3, r, n), contexts: [s], types: ["ID"], hashContexts: c, hashTypes: l, data: n}, u = t.linkTo, o = u ? u.call(s, "adminEmail.logs", p) : d.call(s, "linkTo", "adminEmail.logs", p), (o || 0 === o) && n.buffer.push(o), n.buffer.push("</li>\n      <li>"), l = {}, c = {}, p = {hash: {}, inverse: m.noop, fn: m.program(5, i, n), contexts: [s], types: ["ID"], hashContexts: c, hashTypes: l, data: n}, u = t.linkTo, o = u ? u.call(s, "adminEmail.previewDigest", p) : d.call(s, "linkTo", "adminEmail.previewDigest", p), (o || 0 === o) && n.buffer.push(o), n.buffer.push("</li>\n    </ul>\n  </div>\n</div>\n\n"), l = {}, c = {}, n.buffer.push(b(t._triageMustache.call(s, "outlet", {hash: {}, contexts: [s], types: ["ID"], hashContexts: c, hashTypes: l, data: n}))), n.buffer.push("\n"), f
}), Ember.TEMPLATES["admin/templates/email_index"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h = "";
        return s.buffer.push("\n    <tr>\n      <th style='width: 25%'>"), a = {}, n = {}, s.buffer.push(f(t._triageMustache.call(e, "name", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("</th>\n      <td>"), a = {}, n = {}, s.buffer.push(f(t._triageMustache.call(e, "value", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("</td>\n    </tr>\n  "), h
    }

    function r(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("<span class='result-message'>"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(f((a = t.i18n, a ? a.call(e, "admin.email.sent_test", r) : d.call(e, "i18n", "admin.email.sent_test", r)))), s.buffer.push("</span>"), i
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var i, u, o, l, c, p = "", f = this.escapeExpression, d = t.helperMissing, b = this;
    return n.buffer.push('<table class="table">\n  <tr>\n    <th>'), o = {}, l = {}, c = {hash: {}, contexts: [s], types: ["ID"], hashContexts: l, hashTypes: o, data: n}, n.buffer.push(f((i = t.i18n, i ? i.call(s, "admin.email.delivery_method", c) : d.call(s, "i18n", "admin.email.delivery_method", c)))), n.buffer.push("</th>\n    <td>"), o = {}, l = {}, n.buffer.push(f(t._triageMustache.call(s, "model.delivery_method", {hash: {}, contexts: [s], types: ["ID"], hashContexts: l, hashTypes: o, data: n}))), n.buffer.push("</td>\n  </tr>\n\n  "), o = {}, l = {}, u = t.each.call(s, "model.settings", {hash: {}, inverse: b.noop, fn: b.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: l, hashTypes: o, data: n}), (u || 0 === u) && n.buffer.push(u), n.buffer.push("\n</table>\n\n<div class='admin-controls'>\n  <div class='span5 controls'>\n    "), l = {value: s, placeholderKey: s}, o = {value: "ID", placeholderKey: "STRING"}, c = {hash: {value: "testEmailAddress", placeholderKey: "admin.email.test_email_address"}, contexts: [], types: [], hashContexts: l, hashTypes: o, data: n}, n.buffer.push(f((i = t.textField, i ? i.call(s, c) : d.call(s, "textField", c)))), n.buffer.push("\n  </div>\n  <div class='span10 controls'>\n    <button class='btn' "), o = {}, l = {}, n.buffer.push(f(t.action.call(s, "sendTestEmail", {hash: {}, contexts: [s], types: ["ID"], hashContexts: l, hashTypes: o, data: n}))), n.buffer.push(" "), l = {disabled: s}, o = {disabled: "STRING"}, n.buffer.push(f(t.bindAttr.call(s, {hash: {disabled: "sendTestEmailDisabled"}, contexts: [], types: [], hashContexts: l, hashTypes: o, data: n}))), n.buffer.push(">"), o = {}, l = {}, c = {hash: {}, contexts: [s], types: ["ID"], hashContexts: l, hashTypes: o, data: n}, n.buffer.push(f((i = t.i18n, i ? i.call(s, "admin.email.send_test", c) : d.call(s, "i18n", "admin.email.send_test", c)))), n.buffer.push("</button>\n    "), o = {}, l = {}, u = t["if"].call(s, "sentTestEmail", {hash: {}, inverse: b.noop, fn: b.program(3, r, n), contexts: [s], types: ["ID"], hashContexts: l, hashTypes: o, data: n}), (u || 0 === u) && n.buffer.push(u), n.buffer.push("\n  </div>\n</div>\n"), p
}), Ember.TEMPLATES["admin/templates/email_logs"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, i, u = "";
        return s.buffer.push("\n    "), n = {hash: {}, inverse: g.noop, fn: g.program(2, r, s), contexts: [], types: [], hashContexts: i, hashTypes: h, data: s}, (a = t.group) ? a = a.call(e, n) : (a = e.group, a = typeof a === T ? a.apply(e) : a), h = {}, i = {}, t.group || (a = D.call(e, a, n)), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n  "), u
    }

    function r(e, s) {
        var a, n, h, r, u, o = "";
        return s.buffer.push("\n      "), h = {contentBinding: e, tagName: e, itemTagName: e}, r = {contentBinding: "STRING", tagName: "STRING", itemTagName: "STRING"}, u = {hash: {contentBinding: "model", tagName: "tbody", itemTagName: "tr"}, inverse: g.noop, fn: g.program(3, i, s), contexts: [], types: [], hashContexts: h, hashTypes: r, data: s}, a = t.collection, n = a ? a.call(e, u) : x.call(e, "collection", u), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n    "), o
    }

    function i(e, s) {
        var a, n, h, r, i, o = "";
        return s.buffer.push("\n          <td>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(v((a = t.date, a ? a.call(e, "created_at", i) : x.call(e, "date", "created_at", i)))), s.buffer.push("</td>\n          <td>\n            "), h = {}, r = {}, n = t["if"].call(e, "user", {hash: {}, inverse: g.program(9, c, s), fn: g.program(4, u, s), contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n          </td>\n          <td><a href='mailto:"), h = {}, r = {}, s.buffer.push(v(t.unbound.call(e, "to_address", {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push("'>"), h = {}, r = {}, s.buffer.push(v(t._triageMustache.call(e, "to_address", {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push("</a></td>\n          <td>"), h = {}, r = {}, s.buffer.push(v(t._triageMustache.call(e, "email_type", {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push("</td>\n          <td>"), h = {}, r = {}, s.buffer.push(v(t._triageMustache.call(e, "reply_key", {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push("</td>\n      "), o
    }

    function u(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push("\n              "), h = {}, r = {}, i = {hash: {}, inverse: g.noop, fn: g.program(5, o, s), contexts: [e, e], types: ["STRING", "ID"], hashContexts: r, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "adminUser", "user", i) : x.call(e, "linkTo", "adminUser", "user", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n              "), h = {}, r = {}, i = {hash: {}, inverse: g.noop, fn: g.program(7, l, s), contexts: [e, e], types: ["STRING", "ID"], hashContexts: r, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "adminUser", "user", i) : x.call(e, "linkTo", "adminUser", "user", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n            "), u
    }

    function o(e, s) {
        var a, n, h, r;
        n = {imageSize: e}, h = {imageSize: "STRING"}, r = {hash: {imageSize: "tiny"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(v((a = t.avatar, a ? a.call(e, "user", r) : x.call(e, "avatar", "user", r))))
    }

    function l(e, s) {
        var a, n;
        a = {}, n = {}, s.buffer.push(v(t._triageMustache.call(e, "user.username", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s})))
    }

    function c(e, s) {
        s.buffer.push("\n              &mdash;\n            ")
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var p, f, d, b, m, y = "", x = t.helperMissing, v = this.escapeExpression, g = this, T = "function", D = t.blockHelperMissing;
    return n.buffer.push("<table class='table'>\n  <tr>\n    <th>"), d = {}, b = {}, m = {hash: {}, contexts: [s], types: ["ID"], hashContexts: b, hashTypes: d, data: n}, n.buffer.push(v((p = t.i18n, p ? p.call(s, "admin.email.sent_at", m) : x.call(s, "i18n", "admin.email.sent_at", m)))), n.buffer.push("</th>\n    <th>"), d = {}, b = {}, m = {hash: {}, contexts: [s], types: ["ID"], hashContexts: b, hashTypes: d, data: n}, n.buffer.push(v((p = t.i18n, p ? p.call(s, "user.title", m) : x.call(s, "i18n", "user.title", m)))), n.buffer.push("</th>\n    <th>"), d = {}, b = {}, m = {hash: {}, contexts: [s], types: ["ID"], hashContexts: b, hashTypes: d, data: n}, n.buffer.push(v((p = t.i18n, p ? p.call(s, "admin.email.to_address", m) : x.call(s, "i18n", "admin.email.to_address", m)))), n.buffer.push("</th>\n    <th>"), d = {}, b = {}, m = {hash: {}, contexts: [s], types: ["ID"], hashContexts: b, hashTypes: d, data: n}, n.buffer.push(v((p = t.i18n, p ? p.call(s, "admin.email.email_type", m) : x.call(s, "i18n", "admin.email.email_type", m)))), n.buffer.push("</th>\n    <th>"), d = {}, b = {}, m = {hash: {}, contexts: [s], types: ["ID"], hashContexts: b, hashTypes: d, data: n}, n.buffer.push(v((p = t.i18n, p ? p.call(s, "admin.email.reply_key", m) : x.call(s, "i18n", "admin.email.reply_key", m)))), n.buffer.push("</th>\n  </tr>\n\n  "), d = {}, b = {}, f = t["if"].call(s, "model.length", {hash: {}, inverse: g.noop, fn: g.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: b, hashTypes: d, data: n}), (f || 0 === f) && n.buffer.push(f), n.buffer.push("\n\n</table>\n"), y
}), Ember.TEMPLATES["admin/templates/email_preview_digest"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n      <span>"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "admin.email.html", r) : y.call(e, "i18n", "admin.email.html", r)))), s.buffer.push("</span> | <a href='#' "), n = {}, h = {}, s.buffer.push(x(t.action.call(e, "toggleProperty", "showHtml", {hash: {}, contexts: [e, e], types: ["ID", "STRING"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push(">"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "admin.email.text", r) : y.call(e, "i18n", "admin.email.text", r)))), s.buffer.push("</a>\n    "), i
    }

    function r(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n      <a href='#' "), n = {}, h = {}, s.buffer.push(x(t.action.call(e, "toggleProperty", "showHtml", {hash: {}, contexts: [e, e], types: ["ID", "STRING"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push(">"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "admin.email.html", r) : y.call(e, "i18n", "admin.email.html", r)))), s.buffer.push("</a> | <span>"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "admin.email.text", r) : y.call(e, "i18n", "admin.email.text", r)))), s.buffer.push("</span>\n    "), i
    }

    function i(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n  <div class='admin-loading'>"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(x((a = t.i18n, a ? a.call(e, "loading", r) : y.call(e, "i18n", "loading", r)))), s.buffer.push("</div>\n"), i
    }

    function u(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n  "), n = {}, h = {}, a = t["if"].call(e, "showHtml", {hash: {}, inverse: v.program(10, l, s), fn: v.program(8, o, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n"), r
    }

    function o(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n    "), n = {unescaped: e}, h = {unescaped: "STRING"}, a = t._triageMustache.call(e, "html_content", {hash: {unescaped: "true"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n  "), r
    }

    function l(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n    <pre>"), n = {unescaped: e}, h = {unescaped: "STRING"}, a = t._triageMustache.call(e, "text_content", {hash: {unescaped: "true"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("</pre>\n  "), r
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var c, p, f, d, b, m = "", y = t.helperMissing, x = this.escapeExpression, v = this;
    return n.buffer.push("<p>"), f = {}, d = {}, b = {hash: {}, contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}, n.buffer.push(x((c = t.i18n, c ? c.call(s, "admin.email.preview_digest_desc", b) : y.call(s, "i18n", "admin.email.preview_digest_desc", b)))), n.buffer.push("</p>\n\n<div class='admin-controls'>\n  <div class='span7 controls'>\n    <label for='last-seen'>"), f = {}, d = {}, b = {hash: {}, contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}, n.buffer.push(x((c = t.i18n, c ? c.call(s, "admin.email.last_seen_user", b) : y.call(s, "i18n", "admin.email.last_seen_user", b)))), n.buffer.push("</label>\n    "), d = {type: s, value: s, id: s}, f = {type: "STRING", value: "ID", id: "STRING"}, b = {hash: {type: "date", value: "lastSeen", id: "last-seen"}, contexts: [], types: [], hashContexts: d, hashTypes: f, data: n}, n.buffer.push(x((c = t.input, c ? c.call(s, b) : y.call(s, "input", b)))), n.buffer.push("\n  </div>\n  <div class='span5'>\n    <button class='btn' "), f = {}, d = {}, n.buffer.push(x(t.action.call(s, "refresh", {hash: {}, contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}))), n.buffer.push(">"), f = {}, d = {}, b = {hash: {}, contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}, n.buffer.push(x((c = t.i18n, c ? c.call(s, "admin.email.refresh", b) : y.call(s, "i18n", "admin.email.refresh", b)))), n.buffer.push('</button>\n  </div>\n  <div class="span7 toggle">\n    <label>'), f = {}, d = {}, b = {hash: {}, contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}, n.buffer.push(x((c = t.i18n, c ? c.call(s, "admin.email.format", b) : y.call(s, "i18n", "admin.email.format", b)))), n.buffer.push("</label>\n    "), f = {}, d = {}, p = t["if"].call(s, "showHtml", {hash: {}, inverse: v.program(3, r, n), fn: v.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}), (p || 0 === p) && n.buffer.push(p), n.buffer.push("\n  </div>\n</div>\n\n"), f = {}, d = {}, p = t["if"].call(s, "loading", {hash: {}, inverse: v.program(7, u, n), fn: v.program(5, i, n), contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}), (p || 0 === p) && n.buffer.push(p), n.buffer.push("\n\n\n"), m
}), Ember.TEMPLATES["admin/templates/flags"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.active", r) : E.call(e, "i18n", "admin.flags.active", r))))
    }

    function r(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.old", r) : E.call(e, "i18n", "admin.flags.old", r))))
    }

    function i(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n  <div class='admin-loading'>"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "loading", r) : E.call(e, "i18n", "loading", r)))), s.buffer.push("</div>\n"), i
    }

    function u(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n  "), n = {}, h = {}, a = t["if"].call(e, "model.length", {hash: {}, inverse: k.program(26, T, s), fn: k.program(8, o, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n"), r
    }

    function o(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push("\n    <table class='admin-flags'>\n      <thead>\n        <tr>\n          <th class='user'></th>\n          <th class='excerpt'></th>\n          <th class='flaggers'>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.flagged_by", i) : E.call(e, "i18n", "admin.flags.flagged_by", i)))), s.buffer.push("</th>\n          <th class='last-flagged'></th>\n          <th class='action'></th>\n        </tr>\n      </thead>\n      <tbody>\n        "), h = {}, r = {}, n = t.each.call(e, "flag", "in", "content", {hash: {}, inverse: k.noop, fn: k.program(9, l, s), contexts: [e, e, e], types: ["ID", "ID", "ID"], hashContexts: r, hashTypes: h, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n\n      </tbody>\n    </table>\n  "), u
    }

    function l(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n        <tr "), n = {"class": e}, h = {"class": "STRING"}, s.buffer.push(A(t.bindAttr.call(e, {hash: {"class": "flag.extraClasses"}, contexts: [], types: [], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n\n          <td class='user'>"), h = {}, n = {}, a = t["if"].call(e, "flag.user", {hash: {}, inverse: k.noop, fn: k.program(10, c, s), contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("</td>\n\n          <td class='excerpt'>"), h = {}, n = {}, a = t["if"].call(e, "flag.topicHidden", {hash: {}, inverse: k.noop, fn: k.program(13, f, s), contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("<h3><a href='"), h = {}, n = {}, s.buffer.push(A(t.unbound.call(e, "flag.url", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push("'>"), h = {}, n = {}, s.buffer.push(A(t._triageMustache.call(e, "flag.title", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push("</a></h3><br>"), n = {unescaped: e}, h = {unescaped: "STRING"}, a = t._triageMustache.call(e, "flag.excerpt", {hash: {unescaped: "true"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n          </td>\n\n          <td class='flaggers'>\n            <table>\n              "), h = {}, n = {}, a = t.each.call(e, "flag.flaggers", {hash: {}, inverse: k.noop, fn: k.program(15, d, s), contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n            </table>\n          </td>\n\n        </tr>\n\n          "), h = {}, n = {}, a = t.each.call(e, "flag.messages", {hash: {}, inverse: k.noop, fn: k.program(18, m, s), contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push('\n\n        <tr>\n            <td colspan="4" class="action">\n            '), h = {}, n = {}, a = t["if"].call(e, "adminActiveFlagsView", {hash: {}, inverse: k.noop, fn: k.program(21, x, s), contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n            </td>\n        </tr>\n\n        "), r
    }

    function c(e, s) {
        var a, n, h, r, i;
        h = {}, r = {}, i = {hash: {}, inverse: k.noop, fn: k.program(11, p, s), contexts: [e, e], types: ["STRING", "ID"], hashContexts: r, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "adminUser", "flag.user", i) : E.call(e, "linkTo", "adminUser", "flag.user", i), n || 0 === n ? s.buffer.push(n) : s.buffer.push("")
    }

    function p(e, s) {
        var a, n, h, r;
        n = {imageSize: e}, h = {imageSize: "STRING"}, r = {hash: {imageSize: "small"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(A((a = t.avatar, a ? a.call(e, "flag.user", r) : E.call(e, "avatar", "flag.user", r))))
    }

    function f(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("<i title='"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "topic_statuses.invisible.help", r) : E.call(e, "i18n", "topic_statuses.invisible.help", r)))), s.buffer.push("' class='icon icon-eye-close'></i> "), i
    }

    function d(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push("\n              <tr>\n                <td>\n                  "), h = {}, r = {}, i = {hash: {}, inverse: k.noop, fn: k.program(16, b, s), contexts: [e, e], types: ["STRING", "ID"], hashContexts: r, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "adminUser", "user", i) : E.call(e, "linkTo", "adminUser", "user", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n                </td>\n                <td>\n                  "), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(A((a = t.date, a ? a.call(e, "flaggedAt", i) : E.call(e, "date", "flaggedAt", i)))), s.buffer.push("\n                </td>\n                <td>\n                  "), h = {}, r = {}, s.buffer.push(A(t._triageMustache.call(e, "flagType", {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push("\n                </td>\n              </tr>\n              "), u
    }

    function b(e, s) {
        var a, n, h, r, i = "";
        return n = {imageSize: e}, h = {imageSize: "STRING"}, r = {hash: {imageSize: "small"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(A((a = t.avatar, a ? a.call(e, "user", r) : E.call(e, "avatar", "user", r)))), s.buffer.push(" "), i
    }

    function m(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push("\n            <tr>\n              <td></td>\n              <td class='message'>\n                <div>"), h = {}, r = {}, i = {hash: {}, inverse: k.noop, fn: k.program(19, y, s), contexts: [e, e], types: ["STRING", "ID"], hashContexts: r, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "adminUser", "user", i) : E.call(e, "linkTo", "adminUser", "user", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push(" "), h = {}, r = {}, s.buffer.push(A(t._triageMustache.call(e, "message", {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push(' <a href="'), h = {}, r = {}, s.buffer.push(A(t.unbound.call(e, "permalink", {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push('"><button class=\'btn\'><i class="icon-reply"></i> '), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.view_message", i) : E.call(e, "i18n", "admin.flags.view_message", i)))), s.buffer.push("</button></a></div>\n              </td>\n              <td></td>\n              <td></td>\n            </tr>\n          "), u
    }

    function y(e, s) {
        var a, n, h, r;
        n = {imageSize: e}, h = {imageSize: "STRING"}, r = {hash: {imageSize: "small"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(A((a = t.avatar, a ? a.call(e, "user", r) : E.call(e, "avatar", "user", r))))
    }

    function x(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n              "), n = {}, h = {}, a = t["if"].call(e, "flag.postHidden", {hash: {}, inverse: k.program(24, g, s), fn: k.program(22, v, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n              <button title='"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.delete_post_title", r) : E.call(e, "i18n", "admin.flags.delete_post_title", r)))), s.buffer.push("' class='btn' "), n = {}, h = {}, s.buffer.push(A(t.action.call(e, "deletePost", "flag", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push('><i class="icon-trash"></i> '), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.delete_post", r) : E.call(e, "i18n", "admin.flags.delete_post", r)))), s.buffer.push("</button>\n            "), i
    }

    function v(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n                <button title='"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.disagree_unhide_title", r) : E.call(e, "i18n", "admin.flags.disagree_unhide_title", r)))), s.buffer.push("' class='btn' "), n = {}, h = {}, s.buffer.push(A(t.action.call(e, "disagreeFlags", "flag", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push('><i class="icon-thumbs-down"></i>  '), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.disagree_unhide", r) : E.call(e, "i18n", "admin.flags.disagree_unhide", r)))), s.buffer.push("</button>\n                <button title='"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.defer_title", r) : E.call(e, "i18n", "admin.flags.defer_title", r)))), s.buffer.push("' class='btn' "), n = {}, h = {}, s.buffer.push(A(t.action.call(e, "deferFlags", "flag", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push('><i class="icon-external-link"></i> '), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.defer", r) : E.call(e, "i18n", "admin.flags.defer", r)))), s.buffer.push("</button>\n              "), i
    }

    function g(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n                <button title='"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.agree_hide_title", r) : E.call(e, "i18n", "admin.flags.agree_hide_title", r)))), s.buffer.push("' class='btn' "), n = {}, h = {}, s.buffer.push(A(t.action.call(e, "agreeFlags", "flag", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push('><i class="icon-thumbs-up"></i> '), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.agree_hide", r) : E.call(e, "i18n", "admin.flags.agree_hide", r)))), s.buffer.push("</button>\n                <button title='"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.disagree_title", r) : E.call(e, "i18n", "admin.flags.disagree_title", r)))), s.buffer.push("' class='btn' "), n = {}, h = {}, s.buffer.push(A(t.action.call(e, "disagreeFlags", "flag", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push('><i class="icon-thumbs-down"></i> '), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.disagree", r) : E.call(e, "i18n", "admin.flags.disagree", r)))), s.buffer.push("</button>\n              "), i
    }

    function T(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n    <p>"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(A((a = t.i18n, a ? a.call(e, "admin.flags.no_results", r) : E.call(e, "i18n", "admin.flags.no_results", r)))), s.buffer.push("</p>\n  "), i
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var D, _, I, C, w, S = "", E = t.helperMissing, A = this.escapeExpression, k = this;
    return n.buffer.push("<div class='admin-controls'>\n  <div class='span15'>\n    <ul class=\"nav nav-pills\">\n      <li>"), I = {}, C = {}, w = {hash: {}, inverse: k.noop, fn: k.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: C, hashTypes: I, data: n}, D = t.linkTo, _ = D ? D.call(s, "adminFlags.active", w) : E.call(s, "linkTo", "adminFlags.active", w), (_ || 0 === _) && n.buffer.push(_), n.buffer.push("</li>\n      <li>"), I = {}, C = {}, w = {hash: {}, inverse: k.noop, fn: k.program(3, r, n), contexts: [s], types: ["ID"], hashContexts: C, hashTypes: I, data: n}, D = t.linkTo, _ = D ? D.call(s, "adminFlags.old", w) : E.call(s, "linkTo", "adminFlags.old", w), (_ || 0 === _) && n.buffer.push(_), n.buffer.push("</li>\n    </ul>\n  </div>\n</div>\n\n"), I = {}, C = {}, _ = t["if"].call(s, "model.loading", {hash: {}, inverse: k.program(7, u, n), fn: k.program(5, i, n), contexts: [s], types: ["ID"], hashContexts: C, hashTypes: I, data: n}), (_ || 0 === _) && n.buffer.push(_), n.buffer.push("\n"), S
}), Ember.TEMPLATES["admin/templates/groups"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h = "";
        return s.buffer.push('\n        <li>\n        <a href="#" '), a = {}, n = {}, s.buffer.push(D(t.action.call(e, "edit", "group", {hash: {}, contexts: [e, e], types: ["STRING", "ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push(" "), n = {"class": e}, a = {"class": "STRING"}, s.buffer.push(D(t.bindAttr.call(e, {hash: {"class": "group.active"}, contexts: [], types: [], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push(">"), a = {}, n = {}, s.buffer.push(D(t._triageMustache.call(e, "group.name", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push(' <span class="count">'), a = {}, n = {}, s.buffer.push(D(t._triageMustache.call(e, "group.userCountDisplay", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("</span></a>\n        </li>\n      "), h
    }

    function r(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n      "), n = {}, h = {}, a = t["if"].call(e, "model.active.loaded", {hash: {}, inverse: I.program(15, d, s), fn: I.program(4, i, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n    "), r
    }

    function i(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n        "), n = {}, h = {}, a = t["with"].call(e, "model.active", {hash: {}, inverse: I.noop, fn: I.program(5, u, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n      "), r
    }

    function u(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push("\n          "), h = {}, r = {}, a = t["if"].call(e, "automatic", {hash: {}, inverse: I.program(8, l, s), fn: I.program(6, o, s), contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n\n          "), r = {usernames: e, id: e, placeholderKey: e, tabindex: e, disabledBinding: e}, h = {usernames: "ID", id: "STRING", placeholderKey: "STRING", tabindex: "STRING", disabledBinding: "STRING"}, i = {hash: {usernames: "usernames", id: "group-users", placeholderKey: "admin.groups.selector_placeholder", tabindex: "1", disabledBinding: "automatic"}, contexts: [], types: [], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(D((a = t.userSelector, a ? a.call(e, i) : _.call(e, "userSelector", i)))), s.buffer.push("\n          <div class='controls'>\n            "), h = {}, r = {}, n = t.unless.call(e, "automatic", {hash: {}, inverse: I.program(13, f, s), fn: I.program(10, c, s), contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n          </div>\n        "), u
    }

    function o(e, s) {
        var a, n, h = "";
        return s.buffer.push("\n            <h3>"), a = {}, n = {}, s.buffer.push(D(t._triageMustache.call(e, "name", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("</h3>\n          "), h
    }

    function l(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n            "), n = {value: e, placeholderKey: e}, h = {value: "ID", placeholderKey: "STRING"}, r = {hash: {value: "name", placeholderKey: "admin.groups.name_placeholder"}, contexts: [], types: [], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(D((a = t.textField, a ? a.call(e, r) : _.call(e, "textField", r)))), s.buffer.push("\n          "), i
    }

    function c(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push("\n              <button "), h = {}, r = {}, s.buffer.push(D(t.action.call(e, "save", "", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push(" "), r = {disabled: e}, h = {disabled: "STRING"}, s.buffer.push(D(t.bindAttr.call(e, {hash: {disabled: "disableSave"}, contexts: [], types: [], hashContexts: r, hashTypes: h, data: s}))), s.buffer.push(" class='btn'>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(D((a = t.i18n, a ? a.call(e, "admin.customize.save", i) : _.call(e, "i18n", "admin.customize.save", i)))), s.buffer.push("</button>\n              "), h = {}, r = {}, n = t["if"].call(e, "id", {hash: {}, inverse: I.noop, fn: I.program(11, p, s), contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n            "), u
    }

    function p(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n                <a "), n = {}, h = {}, s.buffer.push(D(t.action.call(e, "destroy", "", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push(" class='delete-link'>"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(D((a = t.i18n, a ? a.call(e, "admin.customize.delete", r) : _.call(e, "i18n", "admin.customize.delete", r)))), s.buffer.push("</a>\n              "), i
    }

    function f(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n              "), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(D((a = t.i18n, a ? a.call(e, "admin.groups.can_not_edit_automatic", r) : _.call(e, "i18n", "admin.groups.can_not_edit_automatic", r)))), s.buffer.push("\n            "), i
    }

    function d(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        <div class='spinner'>"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(D((a = t.i18n, a ? a.call(e, "loading", r) : _.call(e, "i18n", "loading", r)))), s.buffer.push("</div>\n      "), i
    }

    function b(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n      "), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(D((a = t.i18n, a ? a.call(e, "admin.groups.about", r) : _.call(e, "i18n", "admin.groups.about", r)))), s.buffer.push("\n    "), i
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var m, y, x, v, g, T = "", D = this.escapeExpression, _ = t.helperMissing, I = this;
    return n.buffer.push("<div class='row groups'>\n  <div class='content-list span6'>\n    <h3>"), x = {}, v = {}, g = {hash: {}, contexts: [s], types: ["ID"], hashContexts: v, hashTypes: x, data: n}, n.buffer.push(D((m = t.i18n, m ? m.call(s, "admin.groups.edit", g) : _.call(s, "i18n", "admin.groups.edit", g)))), n.buffer.push("</h3>\n    <ul>\n      "), x = {}, v = {}, y = t.each.call(s, "group", "in", "model", {hash: {}, inverse: I.noop, fn: I.program(1, h, n), contexts: [s, s, s], types: ["ID", "ID", "ID"], hashContexts: v, hashTypes: x, data: n}), (y || 0 === y) && n.buffer.push(y), n.buffer.push("\n    </ul>\n    <div class='controls'>\n      <button class='btn' "), v = {disabled: s}, x = {disabled: "STRING"}, n.buffer.push(D(t.bindAttr.call(s, {hash: {disabled: "refreshingAutoGroups"}, contexts: [], types: [], hashContexts: v, hashTypes: x, data: n}))), n.buffer.push(" "), x = {}, v = {}, n.buffer.push(D(t.action.call(s, "refreshAutoGroups", {hash: {}, contexts: [s], types: ["STRING"], hashContexts: v, hashTypes: x, data: n}))), n.buffer.push(">Refresh</button>\n      <button class='btn' "), x = {}, v = {}, n.buffer.push(D(t.action.call(s, "newGroup", {hash: {}, contexts: [s], types: ["ID"], hashContexts: v, hashTypes: x, data: n}))), n.buffer.push(">New</button>\n    </div>\n  </div>\n\n  <div class='content-editor'>\n    "), x = {}, v = {}, y = t["if"].call(s, "model.active", {hash: {}, inverse: I.program(17, b, n), fn: I.program(3, r, n), contexts: [s], types: ["ID"], hashContexts: v, hashTypes: x, data: n}), (y || 0 === y) && n.buffer.push(y), n.buffer.push("\n  </div>\n</div>\n"), T
}), Ember.TEMPLATES["admin/templates/reports"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, i, u, o = "";
        return s.buffer.push("\n  <h3>"), h = {}, i = {}, s.buffer.push(d(t._triageMustache.call(e, "title", {hash: {}, contexts: [e], types: ["ID"], hashContexts: i, hashTypes: h, data: s}))), s.buffer.push("</h3>\n\n  <button class='btn'\n          "), h = {}, i = {}, s.buffer.push(d(t.action.call(e, "viewAsTable", {hash: {}, contexts: [e], types: ["ID"], hashContexts: i, hashTypes: h, data: s}))), s.buffer.push("\n          "), i = {disabled: e}, h = {disabled: "STRING"}, s.buffer.push(d(t.bindAttr.call(e, {hash: {disabled: "viewingTable"}, contexts: [], types: [], hashContexts: i, hashTypes: h, data: s}))), s.buffer.push(">"), h = {}, i = {}, u = {hash: {}, contexts: [e], types: ["ID"], hashContexts: i, hashTypes: h, data: s}, s.buffer.push(d((a = t.i18n, a ? a.call(e, "admin.dashboard.reports.view_table", u) : m.call(e, "i18n", "admin.dashboard.reports.view_table", u)))), s.buffer.push("</button>\n\n  <button class='btn'\n          "), h = {}, i = {}, s.buffer.push(d(t.action.call(e, "viewAsBarChart", {hash: {}, contexts: [e], types: ["ID"], hashContexts: i, hashTypes: h, data: s}))), s.buffer.push("\n          "), i = {disabled: e}, h = {disabled: "STRING"}, s.buffer.push(d(t.bindAttr.call(e, {hash: {disabled: "viewingBarChart"}, contexts: [], types: [], hashContexts: i, hashTypes: h, data: s}))), s.buffer.push(">"), h = {}, i = {}, u = {hash: {}, contexts: [e], types: ["ID"], hashContexts: i, hashTypes: h, data: s}, s.buffer.push(d((a = t.i18n, a ? a.call(e, "admin.dashboard.reports.view_chart", u) : m.call(e, "i18n", "admin.dashboard.reports.view_chart", u)))), s.buffer.push("</button>\n\n  <table class='table report'>\n    <tr>\n      <th>"), h = {}, i = {}, s.buffer.push(d(t._triageMustache.call(e, "xaxis", {hash: {}, contexts: [e], types: ["ID"], hashContexts: i, hashTypes: h, data: s}))), s.buffer.push("</th>\n      <th>"), h = {}, i = {}, s.buffer.push(d(t._triageMustache.call(e, "yaxis", {hash: {}, contexts: [e], types: ["ID"], hashContexts: i, hashTypes: h, data: s}))), s.buffer.push("</th>\n    </tr>\n\n    "), h = {}, i = {}, n = t.each.call(e, "row", "in", "data", {hash: {}, inverse: b.noop, fn: b.program(2, r, s), contexts: [e, e, e], types: ["ID", "ID", "ID"], hashContexts: i, hashTypes: h, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n  </table>\n\n"), o
    }

    function r(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n      <tr>\n        <td>"), n = {}, h = {}, s.buffer.push(d(t._triageMustache.call(e, "row.x", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push("</td>\n        <td>\n          "), n = {}, h = {}, a = t["if"].call(e, "viewingTable", {hash: {}, inverse: b.noop, fn: b.program(3, i, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n          "), n = {}, h = {}, a = t["if"].call(e, "viewingBarChart", {hash: {}, inverse: b.noop, fn: b.program(5, u, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n        </td>\n      </tr>\n    "), r
    }

    function i(e, s) {
        var a, n, h = "";
        return s.buffer.push("\n            "), a = {}, n = {}, s.buffer.push(d(t._triageMustache.call(e, "row.y", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("\n          "), h
    }

    function u(e, s) {
        var a, n, h = "";
        return s.buffer.push("\n            <div class='bar-container'>\n              <div class='bar' style=\"width: "), a = {}, n = {}, s.buffer.push(d(t.unbound.call(e, "row.percentage", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push('%">'), a = {}, n = {}, s.buffer.push(d(t._triageMustache.call(e, "row.y", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("</div>\n            </div>\n          "), h
    }

    function o(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n  "), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(d((a = t.i18n, a ? a.call(e, "loading", r) : m.call(e, "i18n", "loading", r)))), s.buffer.push("\n"), i
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var l, c, p, f = "", d = this.escapeExpression, b = this, m = t.helperMissing;
    return c = {}, p = {}, l = t["if"].call(s, "loaded", {hash: {}, inverse: b.program(7, o, n), fn: b.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: p, hashTypes: c, data: n}), (l || 0 === l) && n.buffer.push(l), n.buffer.push("\n"), f
}), Ember.TEMPLATES["admin/templates/reports/per_day_counts_report"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var h, r, i = "", u = this.escapeExpression;
    return n.buffer.push('<tr>\n  <td class="title"><a '), h = {href: s}, r = {href: "STRING"}, n.buffer.push(u(t.bindAttr.call(s, {hash: {href: "reportUrl"}, contexts: [], types: [], hashContexts: h, hashTypes: r, data: n}))), n.buffer.push(">"), r = {}, h = {}, n.buffer.push(u(t._triageMustache.call(s, "title", {hash: {}, contexts: [s], types: ["ID"], hashContexts: h, hashTypes: r, data: n}))), n.buffer.push('</a></td>\n  <td class="value">'), r = {}, h = {}, n.buffer.push(u(t._triageMustache.call(s, "todayCount", {hash: {}, contexts: [s], types: ["ID"], hashContexts: h, hashTypes: r, data: n}))), n.buffer.push('</td>\n  <td class="value">'), r = {}, h = {}, n.buffer.push(u(t._triageMustache.call(s, "yesterdayCount", {hash: {}, contexts: [s], types: ["ID"], hashContexts: h, hashTypes: r, data: n}))), n.buffer.push('</td>\n  <td class="value">'), r = {}, h = {}, n.buffer.push(u(t._triageMustache.call(s, "sevenDaysAgoCount", {hash: {}, contexts: [s], types: ["ID"], hashContexts: h, hashTypes: r, data: n}))), n.buffer.push('</td>\n  <td class="value">'), r = {}, h = {}, n.buffer.push(u(t._triageMustache.call(s, "thirtyDaysAgoCount", {hash: {}, contexts: [s], types: ["ID"], hashContexts: h, hashTypes: r, data: n}))), n.buffer.push("</td>\n</tr>\n"), i
}), Ember.TEMPLATES["admin/templates/reports/summed_counts_report"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h = "";
        return s.buffer.push("\n      <i "), a = {"class": e}, n = {"class": "STRING"}, s.buffer.push(l(t.bindAttr.call(e, {hash: {"class": ":icon icon"}, contexts: [], types: [], hashContexts: a, hashTypes: n, data: s}))), s.buffer.push("></i>\n    "), h
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var r, i, u, o = "", l = this.escapeExpression, c = this;
    return n.buffer.push('<tr>\n  <td class="title">\n    '), i = {}, u = {}, r = t["if"].call(s, "icon", {hash: {}, inverse: c.noop, fn: c.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: u, hashTypes: i, data: n}), (r || 0 === r) && n.buffer.push(r), n.buffer.push("\n    <a "), u = {href: s}, i = {href: "STRING"}, n.buffer.push(l(t.bindAttr.call(s, {hash: {href: "reportUrl"}, contexts: [], types: [], hashContexts: u, hashTypes: i, data: n}))), n.buffer.push(">"), i = {}, u = {}, n.buffer.push(l(t._triageMustache.call(s, "title", {hash: {}, contexts: [s], types: ["ID"], hashContexts: u, hashTypes: i, data: n}))), n.buffer.push('</a>\n  </td>\n  <td class="value">'), i = {}, u = {}, n.buffer.push(l(t._triageMustache.call(s, "todayCount", {hash: {}, contexts: [s], types: ["ID"], hashContexts: u, hashTypes: i, data: n}))), n.buffer.push("</td>\n  <td "), u = {"class": s}, i = {"class": "STRING"}, n.buffer.push(l(t.bindAttr.call(s, {hash: {"class": ":value yesterdayTrend"}, contexts: [], types: [], hashContexts: u, hashTypes: i, data: n}))), n.buffer.push(" "), u = {title: s}, i = {title: "STRING"}, n.buffer.push(l(t.bindAttr.call(s, {hash: {title: "yesterdayCountTitle"}, contexts: [], types: [], hashContexts: u, hashTypes: i, data: n}))), n.buffer.push(">"), i = {}, u = {}, n.buffer.push(l(t._triageMustache.call(s, "yesterdayCount", {hash: {}, contexts: [s], types: ["ID"], hashContexts: u, hashTypes: i, data: n}))), n.buffer.push(' <i class="icon up icon-caret-up"></i><i class="icon down icon-caret-down"></i></td>\n  <td '), u = {"class": s}, i = {"class": "STRING"}, n.buffer.push(l(t.bindAttr.call(s, {hash: {"class": ":value sevenDayTrend"}, contexts: [], types: [], hashContexts: u, hashTypes: i, data: n}))), n.buffer.push(" "), u = {title: s}, i = {title: "STRING"}, n.buffer.push(l(t.bindAttr.call(s, {hash: {title: "sevenDayCountTitle"}, contexts: [], types: [], hashContexts: u, hashTypes: i, data: n}))), n.buffer.push(">"), i = {}, u = {}, n.buffer.push(l(t._triageMustache.call(s, "lastSevenDaysCount", {hash: {}, contexts: [s], types: ["ID"], hashContexts: u, hashTypes: i, data: n}))), n.buffer.push(' <i class="icon up icon-caret-up"></i><i class="icon down icon-caret-down"></i></td>\n  <td '), u = {"class": s}, i = {"class": "STRING"}, n.buffer.push(l(t.bindAttr.call(s, {hash: {"class": ":value thirtyDayTrend"}, contexts: [], types: [], hashContexts: u, hashTypes: i, data: n}))), n.buffer.push(" "), u = {title: s}, i = {title: "STRING"}, n.buffer.push(l(t.bindAttr.call(s, {hash: {title: "thirtyDayCountTitle"}, contexts: [], types: [], hashContexts: u, hashTypes: i, data: n}))), n.buffer.push(">"), i = {}, u = {}, n.buffer.push(l(t._triageMustache.call(s, "lastThirtyDaysCount", {hash: {}, contexts: [s], types: ["ID"], hashContexts: u, hashTypes: i, data: n}))), n.buffer.push(' <i class="icon up icon-caret-up"></i><i class="icon down icon-caret-down"></i></td>\n  <td class="value">'), i = {}, u = {}, n.buffer.push(l(t._triageMustache.call(s, "total", {hash: {}, contexts: [s], types: ["ID"], hashContexts: u, hashTypes: i, data: n}))), n.buffer.push("</td>\n</tr>\n"), o
}), Ember.TEMPLATES["admin/templates/reports/trust_levels_report"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["ID", "INTEGER"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(y((a = t.valueAtTrustLevel, a ? a.call(e, "data", 0, r) : m.call(e, "valueAtTrustLevel", "data", 0, r))))
    }

    function r(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["ID", "INTEGER"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(y((a = t.valueAtTrustLevel, a ? a.call(e, "data", 1, r) : m.call(e, "valueAtTrustLevel", "data", 1, r))))
    }

    function i(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["ID", "INTEGER"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(y((a = t.valueAtTrustLevel, a ? a.call(e, "data", 2, r) : m.call(e, "valueAtTrustLevel", "data", 2, r))))
    }

    function u(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["ID", "INTEGER"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(y((a = t.valueAtTrustLevel, a ? a.call(e, "data", 3, r) : m.call(e, "valueAtTrustLevel", "data", 3, r))))
    }

    function o(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e, e], types: ["ID", "INTEGER"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(y((a = t.valueAtTrustLevel, a ? a.call(e, "data", 4, r) : m.call(e, "valueAtTrustLevel", "data", 4, r))))
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var l, c, p, f, d, b = "", m = t.helperMissing, y = this.escapeExpression, x = this;
    return n.buffer.push('<tr>\n  <td class="title">'), p = {}, f = {}, n.buffer.push(y(t._triageMustache.call(s, "title", {hash: {}, contexts: [s], types: ["ID"], hashContexts: f, hashTypes: p, data: n}))), n.buffer.push('</td>\n  <td class="value">'), p = {}, f = {}, d = {hash: {}, inverse: x.noop, fn: x.program(1, h, n), contexts: [s], types: ["STRING"], hashContexts: f, hashTypes: p, data: n}, l = t.linkTo, c = l ? l.call(s, "adminUsersList.newuser", d) : m.call(s, "linkTo", "adminUsersList.newuser", d), (c || 0 === c) && n.buffer.push(c), n.buffer.push('</td>\n  <td class="value">'), p = {}, f = {}, d = {hash: {}, inverse: x.noop, fn: x.program(3, r, n), contexts: [s], types: ["STRING"], hashContexts: f, hashTypes: p, data: n}, l = t.linkTo, c = l ? l.call(s, "adminUsersList.basic", d) : m.call(s, "linkTo", "adminUsersList.basic", d), (c || 0 === c) && n.buffer.push(c), n.buffer.push('</td>\n  <td class="value">'), p = {}, f = {}, d = {hash: {}, inverse: x.noop, fn: x.program(5, i, n), contexts: [s], types: ["STRING"], hashContexts: f, hashTypes: p, data: n}, l = t.linkTo, c = l ? l.call(s, "adminUsersList.regular", d) : m.call(s, "linkTo", "adminUsersList.regular", d), (c || 0 === c) && n.buffer.push(c), n.buffer.push('</td>\n  <td class="value">'), p = {}, f = {}, d = {hash: {}, inverse: x.noop, fn: x.program(7, u, n), contexts: [s], types: ["STRING"], hashContexts: f, hashTypes: p, data: n}, l = t.linkTo, c = l ? l.call(s, "adminUsersList.leaders", d) : m.call(s, "linkTo", "adminUsersList.leaders", d), (c || 0 === c) && n.buffer.push(c), n.buffer.push('</td>\n  <td class="value">'), p = {}, f = {}, d = {hash: {}, inverse: x.noop, fn: x.program(9, o, n), contexts: [s], types: ["STRING"], hashContexts: f, hashTypes: p, data: n}, l = t.linkTo, c = l ? l.call(s, "adminUsersList.elders", d) : m.call(s, "linkTo", "adminUsersList.elders", d), (c || 0 === c) && n.buffer.push(c), n.buffer.push("</td>\n</tr>\n"), b
}), Ember.TEMPLATES["admin/templates/site_content_edit"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n    "), n = {value: e}, h = {value: "ID"}, r = {hash: {value: "model.content"}, contexts: [], types: [], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(y((a = t.pagedown, a ? a.call(e, r) : m.call(e, "pagedown", r)))), s.buffer.push("\n  "), i
    }

    function r(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n    "), n = {value: e, "class": e}, h = {value: "ID", "class": "STRING"}, r = {hash: {value: "model.content", "class": "plain"}, contexts: [], types: [], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(y((a = t.textarea, a ? a.call(e, r) : m.call(e, "textarea", r)))), s.buffer.push("\n  "), i
    }

    function i(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n    "), n = {content: e, mode: e}, h = {content: "ID", mode: "STRING"}, r = {hash: {content: "model.content", mode: "html"}, contexts: [], types: [], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(y((a = t.aceEditor, a ? a.call(e, r) : m.call(e, "aceEditor", r)))), s.buffer.push("\n  "), i
    }

    function u(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n    "), n = {content: e, mode: e}, h = {content: "ID", mode: "STRING"}, r = {hash: {content: "model.content", mode: "css"}, contexts: [], types: [], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(y((a = t.aceEditor, a ? a.call(e, r) : m.call(e, "aceEditor", r)))), s.buffer.push("\n  "), i
    }

    function o(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(y((a = t.i18n, a ? a.call(e, "saving", r) : m.call(e, "i18n", "saving", r)))), s.buffer.push("\n      "), i
    }

    function l(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(y((a = t.i18n, a ? a.call(e, "save", r) : m.call(e, "i18n", "save", r)))), s.buffer.push("\n      "), i
    }

    function c(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(y((a = t.i18n, a ? a.call(e, "saved", r) : m.call(e, "i18n", "saved", r))))
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var p, f, d, b = "", m = t.helperMissing, y = this.escapeExpression, x = this;
    return n.buffer.push("\n  <h3>"), f = {}, d = {}, n.buffer.push(y(t._triageMustache.call(s, "model.title", {hash: {}, contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}))), n.buffer.push("</h3>\n  <p class='description'>"), f = {}, d = {}, n.buffer.push(y(t._triageMustache.call(s, "model.description", {hash: {}, contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}))), n.buffer.push("</p>\n\n  "), f = {}, d = {}, p = t["if"].call(s, "model.markdown", {hash: {}, inverse: x.noop, fn: x.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}), (p || 0 === p) && n.buffer.push(p), n.buffer.push("\n\n  "), f = {}, d = {}, p = t["if"].call(s, "model.plainText", {hash: {}, inverse: x.noop, fn: x.program(3, r, n), contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}), (p || 0 === p) && n.buffer.push(p), n.buffer.push("\n\n  "), f = {}, d = {}, p = t["if"].call(s, "model.html", {hash: {}, inverse: x.noop, fn: x.program(5, i, n), contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}), (p || 0 === p) && n.buffer.push(p), n.buffer.push("\n\n  "), f = {}, d = {}, p = t["if"].call(s, "model.css", {hash: {}, inverse: x.noop, fn: x.program(7, u, n), contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}), (p || 0 === p) && n.buffer.push(p), n.buffer.push("\n\n\n\n  <div class='controls'>\n    <button class='btn' "), f = {}, d = {}, n.buffer.push(y(t.action.call(s, "saveChanges", {hash: {}, contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}))), n.buffer.push(" "), d = {disabled: s}, f = {disabled: "STRING"}, n.buffer.push(y(t.bindAttr.call(s, {hash: {disabled: "saveDisabled"}, contexts: [], types: [], hashContexts: d, hashTypes: f, data: n}))), n.buffer.push(">\n      "), f = {}, d = {}, p = t["if"].call(s, "saving", {hash: {}, inverse: x.program(11, l, n), fn: x.program(9, o, n), contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}), (p || 0 === p) && n.buffer.push(p), n.buffer.push("\n    </button>\n    "), f = {}, d = {}, p = t["if"].call(s, "saved", {hash: {}, inverse: x.noop, fn: x.program(13, c, n), contexts: [s], types: ["ID"], hashContexts: d, hashTypes: f, data: n}), (p || 0 === p) && n.buffer.push(p), n.buffer.push("\n  </div>\n"), b
}), Ember.TEMPLATES["admin/templates/site_contents"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, i, u, o = "";
        return s.buffer.push("\n        <li>\n          "), h = {}, i = {}, u = {hash: {}, inverse: d.noop, fn: d.program(2, r, s), contexts: [e, e], types: ["STRING", "ID"], hashContexts: i, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "adminSiteContentEdit", "type", u) : b.call(e, "linkTo", "adminSiteContentEdit", "type", u), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n        </li>\n      "), o
    }

    function r(e, s) {
        var a, n;
        a = {}, n = {}, s.buffer.push(f(t._triageMustache.call(e, "type.title", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s})))
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var i, u, o, l, c, p = "", f = this.escapeExpression, d = this, b = t.helperMissing;
    return n.buffer.push("<div class='row'>\n  <div class='content-list span6'>\n    <h3>"), o = {}, l = {}, c = {hash: {}, contexts: [s], types: ["ID"], hashContexts: l, hashTypes: o, data: n}, n.buffer.push(f((i = t.i18n, i ? i.call(s, "admin.site_content.edit", c) : b.call(s, "i18n", "admin.site_content.edit", c)))), n.buffer.push("</h3>\n    <ul>\n      "), o = {}, l = {}, u = t.each.call(s, "type", "in", "content", {hash: {}, inverse: d.noop, fn: d.program(1, h, n), contexts: [s, s, s], types: ["ID", "ID", "ID"], hashContexts: l, hashTypes: o, data: n}), (u || 0 === u) && n.buffer.push(u), n.buffer.push("\n    </ul>\n  </div>\n\n  <div class='content-editor'>\n    "), o = {}, l = {}, n.buffer.push(f(t._triageMustache.call(s, "outlet", {hash: {}, contexts: [s], types: ["ID"], hashContexts: l, hashTypes: o, data: n}))), n.buffer.push("\n  </div>\n</div>\n"), p
}), Ember.TEMPLATES["admin/templates/site_contents_empty"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var h, r, i, u, o = "", l = t.helperMissing, c = this.escapeExpression;
    return n.buffer.push("<p>"), r = {}, i = {}, u = {hash: {}, contexts: [s], types: ["ID"], hashContexts: i, hashTypes: r, data: n}, n.buffer.push(c((h = t.i18n, h ? h.call(s, "admin.site_content.none", u) : l.call(s, "i18n", "admin.site_content.none", u)))), n.buffer.push("</p>\n"), o
}), Ember.TEMPLATES["admin/templates/site_settings"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var h, r, i, u, o = "", l = t.helperMissing, c = this.escapeExpression;
    return n.buffer.push("<div class='admin-controls'>\n  <div class='search controls'>\n  <label>\n    "), r = {type: s, checked: s}, i = {type: "STRING", checked: "ID"}, u = {hash: {type: "checkbox", checked: "onlyOverridden"}, contexts: [], types: [], hashContexts: r, hashTypes: i, data: n}, n.buffer.push(c((h = t.input, h ? h.call(s, u) : l.call(s, "input", u)))), n.buffer.push("\n    "), i = {}, r = {}, u = {hash: {}, contexts: [s], types: ["ID"], hashContexts: r, hashTypes: i, data: n}, n.buffer.push(c((h = t.i18n, h ? h.call(s, "admin.site_settings.show_overriden", u) : l.call(s, "i18n", "admin.site_settings.show_overriden", u)))), n.buffer.push("\n  </label>\n  </div>\n  <div class='search controls'>\n    "), r = {value: s, placeHolderKey: s}, i = {value: "ID", placeHolderKey: "STRING"}, u = {hash: {value: "filter", placeHolderKey: "type_to_filter"}, contexts: [], types: [], hashContexts: r, hashTypes: i, data: n}, n.buffer.push(c((h = t.textField, h ? h.call(s, u) : l.call(s, "textField", u)))), n.buffer.push("\n  </div>\n\n</div>\n\n"), r = {contentBinding: s, classNames: s, itemViewClass: s}, i = {contentBinding: "STRING", classNames: "STRING", itemViewClass: "STRING"}, u = {hash: {contentBinding: "filteredContent", classNames: "form-horizontal settings", itemViewClass: "Discourse.SiteSettingView"}, contexts: [], types: [], hashContexts: r, hashTypes: i, data: n}, n.buffer.push(c((h = t.collection, h ? h.call(s, u) : l.call(s, "collection", u)))), n.buffer.push("\n\n<!-- will remove as soon as I figure out what is going on -->\n<p><small>Diagnostics: last_message_processed "), i = {}, r = {}, n.buffer.push(c(t._triageMustache.call(s, "diags.last_message_processed", {hash: {}, contexts: [s], types: ["ID"], hashContexts: r, hashTypes: i, data: n}))), n.buffer.push("</small></p>\n"), o
}), Ember.TEMPLATES["admin/templates/site_settings/setting_bool"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h = "";
        return s.buffer.push("\n  <div class='span4 offset1'>\n    <h3>"), a = {}, n = {}, s.buffer.push(l(t.unbound.call(e, "setting", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push('</h3>\n  </div>\n  <div class="span11">\n    '), n = {checkedBinding: e, value: e}, a = {checkedBinding: "STRING", value: "STRING"}, s.buffer.push(l(t.view.call(e, "Ember.Checkbox", {hash: {checkedBinding: "enabled", value: "true"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("\n    "), a = {}, n = {}, s.buffer.push(l(t.unbound.call(e, "description", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("\n  </div>\n"), h
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var r, i, u, o = "", l = this.escapeExpression, c = this;
    return i = {}, u = {}, r = t["with"].call(s, "view.content", {hash: {}, inverse: c.noop, fn: c.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: u, hashTypes: i, data: n}), (r || 0 === r) && n.buffer.push(r), n.buffer.push("\n"), o
}), Ember.TEMPLATES["admin/templates/site_settings/setting_enum"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, u, o, l = "";
        return s.buffer.push("\n  <div class='span4 offset1'>\n     <h3>"), h = {}, u = {}, s.buffer.push(f(t.unbound.call(e, "setting", {hash: {}, contexts: [e], types: ["ID"], hashContexts: u, hashTypes: h, data: s}))), s.buffer.push('</h3>\n  </div>\n  <div class="span11">\n    '), u = {valueAttribute: e, content: e, value: e, none: e}, h = {valueAttribute: "STRING", content: "ID", value: "ID", none: "ID"}, o = {hash: {valueAttribute: "value", content: "validValues", value: "value", none: "allowsNone"}, contexts: [], types: [], hashContexts: u, hashTypes: h, data: s}, s.buffer.push(f((a = t.combobox, a ? a.call(e, o) : d.call(e, "combobox", o)))), s.buffer.push("\n    <div class='desc'>"), h = {}, u = {}, s.buffer.push(f(t.unbound.call(e, "description", {hash: {}, contexts: [e], types: ["ID"], hashContexts: u, hashTypes: h, data: s}))), s.buffer.push("</div>\n  </div>\n  "), h = {}, u = {}, n = t["if"].call(e, "dirty", {hash: {}, inverse: b.program(4, i, s), fn: b.program(2, r, s), contexts: [e], types: ["ID"], hashContexts: u, hashTypes: h, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n"), l
    }

    function r(e, s) {
        var a, n, h = "";
        return s.buffer.push("\n    <div class='span3'>\n      <button class='btn ok' "), a = {}, n = {}, s.buffer.push(f(t.action.call(e, "save", "", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("><i class='icon-ok'></i></button>\n      <button class='btn cancel' "), a = {}, n = {}, s.buffer.push(f(t.action.call(e, "cancel", "", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("><i class='icon-remove'></i></button>\n    </div>\n  "), h
    }

    function i(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n    "), n = {}, h = {}, a = t["if"].call(e, "overridden", {hash: {}, inverse: b.noop, fn: b.program(5, u, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n  "), r
    }

    function u(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n      <button class='btn' href='#' "), n = {}, h = {}, s.buffer.push(f(t.action.call(e, "resetDefault", "", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push(">"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(f((a = t.i18n, a ? a.call(e, "admin.site_settings.reset", r) : d.call(e, "i18n", "admin.site_settings.reset", r)))), s.buffer.push("</button>\n    "), i
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var o, l, c, p = "", f = this.escapeExpression, d = t.helperMissing, b = this;
    return l = {}, c = {}, o = t["with"].call(s, "view.content", {hash: {}, inverse: b.noop, fn: b.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: c, hashTypes: l, data: n}), (o || 0 === o) && n.buffer.push(o), n.buffer.push("\n"), p
}), Ember.TEMPLATES["admin/templates/site_settings/setting_string"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, u, o, l = "";
        return s.buffer.push("\n  <div class='span4 offset1'>\n     <h3>"), h = {}, u = {}, s.buffer.push(f(t.unbound.call(e, "setting", {hash: {}, contexts: [e], types: ["ID"], hashContexts: u, hashTypes: h, data: s}))), s.buffer.push('</h3>\n  </div>\n  <div class="span11">\n    '), u = {value: e, classNames: e}, h = {value: "ID", classNames: "STRING"}, o = {hash: {value: "value", classNames: "input-xxlarge"}, contexts: [], types: [], hashContexts: u, hashTypes: h, data: s}, s.buffer.push(f((a = t.textField, a ? a.call(e, o) : d.call(e, "textField", o)))), s.buffer.push("\n    <div class='desc'>"), h = {}, u = {}, s.buffer.push(f(t.unbound.call(e, "description", {hash: {}, contexts: [e], types: ["ID"], hashContexts: u, hashTypes: h, data: s}))), s.buffer.push("</div>\n  </div>\n  "), h = {}, u = {}, n = t["if"].call(e, "dirty", {hash: {}, inverse: b.program(4, i, s), fn: b.program(2, r, s), contexts: [e], types: ["ID"], hashContexts: u, hashTypes: h, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n"), l
    }

    function r(e, s) {
        var a, n, h = "";
        return s.buffer.push("\n    <div class='span3'>\n      <button class='btn ok' "), a = {}, n = {}, s.buffer.push(f(t.action.call(e, "save", "", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("><i class='icon-ok'></i></button>\n      <button class='btn cancel' "), a = {}, n = {}, s.buffer.push(f(t.action.call(e, "cancel", "", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("><i class='icon-remove'></i></button>\n    </div>\n  "), h
    }

    function i(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n    "), n = {}, h = {}, a = t["if"].call(e, "overridden", {hash: {}, inverse: b.noop, fn: b.program(5, u, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n  "), r
    }

    function u(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n      <button class='btn' href='#' "), n = {}, h = {}, s.buffer.push(f(t.action.call(e, "resetDefault", "", {hash: {}, contexts: [e, e], types: ["ID", "ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push(">"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(f((a = t.i18n, a ? a.call(e, "admin.site_settings.reset", r) : d.call(e, "i18n", "admin.site_settings.reset", r)))), s.buffer.push("</button>\n    "), i
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var o, l, c, p = "", f = this.escapeExpression, d = t.helperMissing, b = this;
    return l = {}, c = {}, o = t["with"].call(s, "view.content", {hash: {}, inverse: b.noop, fn: b.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: c, hashTypes: l, data: n}), (o || 0 === o) && n.buffer.push(o), n.buffer.push("\n"), p
}), Ember.TEMPLATES["admin/templates/user"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        <i class='icon icon-user'></i>\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.show_public_profile", r) : H.call(e, "i18n", "admin.user.show_public_profile", r)))), s.buffer.push("\n      "), i
    }

    function r(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n          <button class='btn' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "impersonate", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n            <i class='icon icon-screenshot'></i>\n            "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.impersonate", r) : H.call(e, "i18n", "admin.user.impersonate", r)))), s.buffer.push("\n          </button>\n      "), i
    }

    function i(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        "), n = {value: e, autofocus: e}, h = {value: "ID", autofocus: "STRING"}, r = {hash: {value: "title", autofocus: "autofocus"}, contexts: [], types: [], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.textField, a ? a.call(e, r) : H.call(e, "textField", r)))), s.buffer.push("\n      "), i
    }

    function u(e, s) {
        var a, n, h = "";
        return s.buffer.push("\n        <span "), a = {}, n = {}, s.buffer.push(Q(t.action.call(e, "toggleTitleEdit", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push(">"), a = {}, n = {}, s.buffer.push(Q(t._triageMustache.call(e, "title", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s}))), s.buffer.push("&nbsp;</span>\n      "), h
    }

    function o(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        <button class='btn' "), n = {}, h = {}, s.buffer.push(Q(t.action.call(e, "saveTitle", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push(">"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.save_title", r) : H.call(e, "i18n", "admin.user.save_title", r)))), s.buffer.push('</button>\n        <a href="#" '), n = {}, h = {}, s.buffer.push(Q(t.action.call(e, "toggleTitleEdit", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push(">Cancel</a>\n      "), i
    }

    function l(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        <button class='btn' "), n = {}, h = {}, s.buffer.push(Q(t.action.call(e, "toggleTitleEdit", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push(">"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.edit_title", r) : H.call(e, "i18n", "admin.user.edit_title", r)))), s.buffer.push("</button>\n      "), i
    }

    function c(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n      <button class='btn' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "refreshBrowsers", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n        "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.refresh_browsers", r) : H.call(e, "i18n", "admin.user.refresh_browsers", r)))), s.buffer.push("\n      </button>\n      "), i
    }

    function p(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push("\n        "), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.approved_by", i) : H.call(e, "i18n", "admin.user.approved_by", i)))), s.buffer.push("\n\n        "), h = {}, r = {}, i = {hash: {}, inverse: B.noop, fn: B.program(16, f, s), contexts: [e, e], types: ["STRING", "ID"], hashContexts: r, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "adminUser", "approved_by", i) : H.call(e, "linkTo", "adminUser", "approved_by", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n        "), h = {}, r = {}, i = {hash: {}, inverse: B.noop, fn: B.program(18, d, s), contexts: [e, e], types: ["STRING", "ID"], hashContexts: r, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "adminUser", "approved_by", i) : H.call(e, "linkTo", "adminUser", "approved_by", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n      "), u
    }

    function f(e, s) {
        var a, n, h, r;
        n = {imageSize: e}, h = {imageSize: "STRING"}, r = {hash: {imageSize: "small"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.avatar, a ? a.call(e, "approved_by", r) : H.call(e, "avatar", "approved_by", r))))
    }

    function d(e, s) {
        var a, n;
        a = {}, n = {}, s.buffer.push(Q(t._triageMustache.call(e, "approved_by.username", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s})))
    }

    function b(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "no_value", r) : H.call(e, "i18n", "no_value", r)))), s.buffer.push("\n      "), i
    }

    function m(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.approve_success", r) : H.call(e, "i18n", "admin.user.approve_success", r)))), s.buffer.push("\n      "), i
    }

    function y(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n        "), n = {}, h = {}, a = t["if"].call(e, "can_approve", {hash: {}, inverse: B.noop, fn: B.program(25, x, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n      "), r
    }

    function x(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n          <button class='btn' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "approve", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n            <i class='icon icon-ok'></i>\n            "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.approve", r) : H.call(e, "i18n", "admin.user.approve", r)))), s.buffer.push("\n          </button>\n        "), i
    }

    function v(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        "), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "yes_value", r) : H.call(e, "i18n", "yes_value", r)))), s.buffer.push("\n      "), i
    }

    function g(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n        "), n = {}, h = {}, a = t["if"].call(e, "can_deactivate", {hash: {}, inverse: B.noop, fn: B.program(30, T, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n      "), r
    }

    function T(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n          <button class='btn' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "deactivate", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">"), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.deactivate_account", r) : H.call(e, "i18n", "admin.user.deactivate_account", r)))), s.buffer.push("</button>\n          "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.deactivate_explanation", r) : H.call(e, "i18n", "admin.user.deactivate_explanation", r)))), s.buffer.push("\n        "), i
    }

    function D(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n        "), n = {}, h = {}, a = t["if"].call(e, "can_send_activation_email", {hash: {}, inverse: B.noop, fn: B.program(33, _, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n        "), n = {}, h = {}, a = t["if"].call(e, "can_activate", {hash: {}, inverse: B.noop, fn: B.program(35, I, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n      "), r
    }

    function _(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n          <button class='btn' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "sendActivationEmail", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n            <i class='icon icon-envelope-alt'></i>\n            "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.send_activation_email", r) : H.call(e, "i18n", "admin.user.send_activation_email", r)))), s.buffer.push("\n          </button>\n        "), i
    }

    function I(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n          <button class='btn' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "activate", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n            <i class='icon icon-ok'></i>\n            "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.activate", r) : H.call(e, "i18n", "admin.user.activate", r)))), s.buffer.push("\n          </button>\n        "), i
    }

    function C(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        <button class='btn' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "revokeAdmin", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n          <i class='icon icon-trophy'></i>\n          "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.revoke_admin", r) : H.call(e, "i18n", "admin.user.revoke_admin", r)))), s.buffer.push("\n        </button>\n      "), i
    }

    function w(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        <button class='btn' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "grantAdmin", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n          <i class='icon icon-trophy'></i>\n          "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.grant_admin", r) : H.call(e, "i18n", "admin.user.grant_admin", r)))), s.buffer.push("\n        </button>\n      "), i
    }

    function S(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        <button class='btn' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "revokeModeration", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n          <i class='icon icon-magic'></i>\n          "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.revoke_moderation", r) : H.call(e, "i18n", "admin.user.revoke_moderation", r)))), s.buffer.push("\n        </button>\n      "), i
    }

    function E(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        <button class='btn' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "grantModeration", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n          <i class='icon icon-magic'></i>\n          "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.grant_moderation", r) : H.call(e, "i18n", "admin.user.grant_moderation", r)))), s.buffer.push("\n        </button>\n      "), i
    }

    function A(e, s) {
        var a, n, h = "";
        return s.buffer.push("\n      <div>\n      <button class='btn ok' "), a = {target: e}, n = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "saveTrustLevel", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: a, hashTypes: n, data: s}))), s.buffer.push("><i class='icon-ok'></i></button>\n      <button class='btn cancel' "), a = {target: e}, n = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "restoreTrustLevel", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: a, hashTypes: n, data: s}))), s.buffer.push("><i class='icon-remove'></i></button>\n      </div>\n    "), h
    }

    function k(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n      <button class='btn btn-danger' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "unban", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n        <i class='icon icon-ban-circle'></i>\n        "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.unban", r) : H.call(e, "i18n", "admin.user.unban", r)))), s.buffer.push("\n      </button>\n      "), h = {}, n = {}, s.buffer.push(Q(t._triageMustache.call(e, "banDuration", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push("\n      "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.banned_explanation", r) : H.call(e, "i18n", "admin.user.banned_explanation", r)))), s.buffer.push("\n    "), i
    }

    function R(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n      "), n = {}, h = {}, a = t["if"].call(e, "canBan", {hash: {}, inverse: B.noop, fn: B.program(50, N, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n    "), r
    }

    function N(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        <button class='btn btn-danger' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "ban", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n          <i class='icon icon-ban-circle'></i>\n          "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.ban", r) : H.call(e, "i18n", "admin.user.ban", r)))), s.buffer.push("\n        </button>\n        "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.banned_explanation", r) : H.call(e, "i18n", "admin.user.banned_explanation", r)))), s.buffer.push("\n      "), i
    }

    function G(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        <button class='btn' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "unblock", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n          <i class='icon icon-thumbs-up'></i>\n          "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.unblock", r) : H.call(e, "i18n", "admin.user.unblock", r)))), s.buffer.push("\n        </button>\n        "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.block_explanation", r) : H.call(e, "i18n", "admin.user.block_explanation", r)))), s.buffer.push("\n      "), i
    }

    function M(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n        <button class='btn btn-danger' "), n = {target: e}, h = {target: "STRING"}, s.buffer.push(Q(t.action.call(e, "deleteAllPosts", {hash: {target: "content"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}))), s.buffer.push(">\n          <i class='icon icon-trash'></i>\n          "), h = {}, n = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(Q((a = t.i18n, a ? a.call(e, "admin.user.delete_all_posts", r) : H.call(e, "i18n", "admin.user.delete_all_posts", r)))), s.buffer.push("\n        </button>\n      "), i
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var j, L, U, P, z, F = "", H = t.helperMissing, Q = this.escapeExpression, B = this;
    return n.buffer.push("<section class='details'>\n\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "user.username.title", z) : H.call(s, "i18n", "user.username.title", z)))), n.buffer.push("</div>\n    <div class='value'>"), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "username", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</div>\n    <div class='controls'>\n      "), P = {"class": s}, U = {"class": "STRING"}, z = {hash: {"class": "btn"}, inverse: B.noop, fn: B.program(1, h, n), contexts: [s, s], types: ["STRING", "ID"], hashContexts: P, hashTypes: U, data: n}, j = t.linkTo, L = j ? j.call(s, "user.activity", "content", z) : H.call(s, "linkTo", "user.activity", "content", z), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n      "), U = {}, P = {}, L = t["if"].call(s, "can_impersonate", {hash: {}, inverse: B.noop, fn: B.program(3, r, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n    </div>\n  </div>\n\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "user.email.title", z) : H.call(s, "i18n", "user.email.title", z)))), n.buffer.push("</div>\n    <div class='value'><a href=\"mailto:"), U = {}, P = {}, n.buffer.push(Q(t.unbound.call(s, "email", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push('">'), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "email", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</a></div>\n  </div>\n\n  <div class='display-row' style='height: 50px'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "user.avatar.title", z) : H.call(s, "i18n", "user.avatar.title", z)))), n.buffer.push("</div>\n    <div class='value'>"), P = {imageSize: s}, U = {imageSize: "STRING"}, z = {hash: {imageSize: "large"}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.avatar, j ? j.call(s, "content", z) : H.call(s, "avatar", "content", z)))), n.buffer.push("</div>\n  </div>\n\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "user.title.title", z) : H.call(s, "i18n", "user.title.title", z)))), n.buffer.push("</div>\n    <div class='value'>\n      "), U = {}, P = {}, L = t["if"].call(s, "editingTitle", {hash: {}, inverse: B.program(7, u, n), fn: B.program(5, i, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n    </div>\n    <div class='controls'>\n      "), U = {}, P = {}, L = t["if"].call(s, "editingTitle", {hash: {}, inverse: B.program(11, l, n), fn: B.program(9, o, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n    </div>\n  </div>\n\n  <div class='display-row' style='height: 50px'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "user.ip_address.title", z) : H.call(s, "i18n", "user.ip_address.title", z)))), n.buffer.push("</div>\n    <div class='value'>"), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "ip_address", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</div>\n    <div class='controls'>\n      "), U = {}, P = {}, L = t["if"].call(s, "currentUser.admin", {hash: {}, inverse: B.noop, fn: B.program(13, c, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n    </div>\n  </div>\n\n</section>\n\n\n<section class='details'>\n  <h1>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.permissions", z) : H.call(s, "i18n", "admin.user.permissions", z)))), n.buffer.push("</h1>\n\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.users.approved", z) : H.call(s, "i18n", "admin.users.approved", z)))), n.buffer.push("</div>\n    <div class='value'>\n      "), U = {}, P = {}, L = t["if"].call(s, "approved", {hash: {}, inverse: B.program(20, b, n), fn: B.program(15, p, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n\n    </div>\n    <div class='controls'>\n      "), U = {}, P = {}, L = t["if"].call(s, "approved", {hash: {}, inverse: B.program(24, y, n), fn: B.program(22, m, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n    </div>\n  </div>\n\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.users.active", z) : H.call(s, "i18n", "admin.users.active", z)))), n.buffer.push("</div>\n    <div class='value'>\n      "), U = {}, P = {}, L = t["if"].call(s, "active", {hash: {}, inverse: B.program(20, b, n), fn: B.program(27, v, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n    </div>\n    <div class='controls'>\n      "), U = {}, P = {}, L = t["if"].call(s, "active", {hash: {}, inverse: B.program(32, D, n), fn: B.program(29, g, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n    </div>\n  </div>\n\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.admin", z) : H.call(s, "i18n", "admin.user.admin", z)))), n.buffer.push("</div>\n    <div class='value'>"), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "admin", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</div>\n    <div class='controls'>\n      "), U = {}, P = {}, L = t["if"].call(s, "can_revoke_admin", {hash: {}, inverse: B.noop, fn: B.program(37, C, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n      "), U = {}, P = {}, L = t["if"].call(s, "can_grant_admin", {hash: {}, inverse: B.noop, fn: B.program(39, w, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n    </div>\n\n  </div>\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.moderator", z) : H.call(s, "i18n", "admin.user.moderator", z)))), n.buffer.push("</div>\n    <div class='value'>"), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "moderator", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</div>\n    <div class='controls'>\n      "), U = {}, P = {}, L = t["if"].call(s, "can_revoke_moderation", {hash: {}, inverse: B.noop, fn: B.program(41, S, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n      "), U = {}, P = {}, L = t["if"].call(s, "can_grant_moderation", {hash: {}, inverse: B.noop, fn: B.program(43, E, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n    </div>\n\n  </div>\n\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "trust_level", z) : H.call(s, "i18n", "trust_level", z)))), n.buffer.push('</div>\n    <div class="value">\n      '), P = {content: s, value: s}, U = {content: "ID", value: "ID"}, z = {hash: {content: "trustLevels", value: "trustLevel.id"}, contexts: [], types: [], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.combobox, j ? j.call(s, z) : H.call(s, "combobox", z)))), n.buffer.push('\n    </div>\n    <div class="controls">\n    '), U = {}, P = {}, L = t["if"].call(s, "dirty", {hash: {}, inverse: B.noop, fn: B.program(45, A, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n    </div>\n  </div>\n\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.banned", z) : H.call(s, "i18n", "admin.user.banned", z)))), n.buffer.push("</div>\n    <div class='value'>"), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "isBanned", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</div>\n    <div class='controls'>\n    "), U = {}, P = {}, L = t["if"].call(s, "isBanned", {hash: {}, inverse: B.program(49, R, n), fn: B.program(47, k, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n    </div>\n  </div>\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.blocked", z) : H.call(s, "i18n", "admin.user.blocked", z)))), n.buffer.push("</div>\n    <div class='value'>"), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "blocked", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</div>\n    <div class='controls'>\n      "), U = {}, P = {}, L = t["if"].call(s, "blocked", {hash: {}, inverse: B.noop, fn: B.program(52, G, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n    </div>\n  </div>\n</section>\n\n<section class='details'>\n  <h1>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.activity", z) : H.call(s, "i18n", "admin.user.activity", z)))), n.buffer.push("</h1>\n\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "created", z) : H.call(s, "i18n", "created", z)))), n.buffer.push("</div>\n    <div class='value'>"), P = {unescaped: s}, U = {unescaped: "STRING"}, L = t._triageMustache.call(s, "created_at_age", {hash: {unescaped: "true"}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("</div>\n  </div>\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.users.last_emailed", z) : H.call(s, "i18n", "admin.users.last_emailed", z)))), n.buffer.push("</div>\n    <div class='value'>"), P = {unescaped: s}, U = {unescaped: "STRING"}, L = t._triageMustache.call(s, "last_emailed_age", {hash: {unescaped: "true"}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("</div>\n  </div>\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "last_seen", z) : H.call(s, "i18n", "last_seen", z)))), n.buffer.push("</div>\n    <div class='value'>"), P = {unescaped: s}, U = {unescaped: "STRING"}, L = t._triageMustache.call(s, "last_seen_age", {hash: {unescaped: "true"}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("</div>\n  </div>\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.like_count", z) : H.call(s, "i18n", "admin.user.like_count", z)))), n.buffer.push("</div>\n    <div class='value'>"), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "like_count", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</div>\n  </div>\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.topics_entered", z) : H.call(s, "i18n", "admin.user.topics_entered", z)))), n.buffer.push("</div>\n    <div class='value'>"), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "topics_entered", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</div>\n  </div>\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.post_count", z) : H.call(s, "i18n", "admin.user.post_count", z)))), n.buffer.push("</div>\n    <div class='value'>"), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "post_count", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</div>\n    <div class='controls'>\n      "), U = {}, P = {}, L = t["if"].call(s, "can_delete_all_posts", {hash: {}, inverse: B.noop, fn: B.program(54, M, n), contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("\n    </div>\n  </div>\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.posts_read_count", z) : H.call(s, "i18n", "admin.user.posts_read_count", z)))), n.buffer.push("</div>\n    <div class='value'>"), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "posts_read_count", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</div>\n  </div>\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.flags_given_count", z) : H.call(s, "i18n", "admin.user.flags_given_count", z)))), n.buffer.push("</div>\n    <div class='value'>"), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "flags_given_count", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</div>\n  </div>\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.flags_received_count", z) : H.call(s, "i18n", "admin.user.flags_received_count", z)))), n.buffer.push("</div>\n    <div class='value'>"), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "flags_received_count", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</div>\n  </div>\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.private_topics_count", z) : H.call(s, "i18n", "admin.user.private_topics_count", z)))), n.buffer.push("</div>\n    <div class='value'>"), U = {}, P = {}, n.buffer.push(Q(t._triageMustache.call(s, "private_topics_count", {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push("</div>\n  </div>\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.time_read", z) : H.call(s, "i18n", "admin.user.time_read", z)))), n.buffer.push("</div>\n    <div class='value'>"), P = {unescaped: s}, U = {unescaped: "STRING"}, L = t._triageMustache.call(s, "time_read", {hash: {unescaped: "true"}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push("</div>\n  </div>\n  <div class='display-row'>\n    <div class='field'>"), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "user.invited.days_visited", z) : H.call(s, "i18n", "user.invited.days_visited", z)))), n.buffer.push("</div>\n    <div class='value'>"), P = {unescaped: s}, U = {unescaped: "STRING"}, L = t._triageMustache.call(s, "days_visited", {hash: {unescaped: "true"}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}), (L || 0 === L) && n.buffer.push(L), n.buffer.push('</div>\n  </div>\n</section>\n\n<section>\n  <hr/>\n  <button class="btn btn-danger pull-right" '), P = {target: s}, U = {target: "STRING"}, n.buffer.push(Q(t.action.call(s, "destroy", {hash: {target: "content"}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push(" "), P = {disabled: s}, U = {disabled: "STRING"}, n.buffer.push(Q(t.bindAttr.call(s, {hash: {disabled: "deleteForbidden"}, contexts: [], types: [], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push(" "), P = {title: s}, U = {title: "STRING"}, n.buffer.push(Q(t.bindAttr.call(s, {hash: {title: "deleteButtonTitle"}, contexts: [], types: [], hashContexts: P, hashTypes: U, data: n}))), n.buffer.push('>\n    <i class="icon icon-trash"></i>\n    '), U = {}, P = {}, z = {hash: {}, contexts: [s], types: ["ID"], hashContexts: P, hashTypes: U, data: n}, n.buffer.push(Q((j = t.i18n, j ? j.call(s, "admin.user.delete", z) : H.call(s, "i18n", "admin.user.delete", z)))), n.buffer.push('\n  </button>\n</section>\n<div class="clearfix"></div>\n'), F
}), Ember.TEMPLATES["admin/templates/users_list"] = Ember.Handlebars.template(function (e, s, t, a, n) {
    function h(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "admin.users.active", r) : N.call(e, "i18n", "admin.users.active", r))))
    }

    function r(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "admin.users.new", r) : N.call(e, "i18n", "admin.users.new", r))))
    }

    function i(e, s) {
        var a, n, h, r, i, o = "";
        return s.buffer.push("\n        <li>"), h = {}, r = {}, i = {hash: {}, inverse: M.noop, fn: M.program(6, u, s), contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, a = t.linkTo, n = a ? a.call(e, "adminUsersList.pending", i) : N.call(e, "linkTo", "adminUsersList.pending", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</li>\n      "), o
    }

    function u(e, s) {
        var a, n, h, r;
        n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "admin.users.pending", r) : N.call(e, "i18n", "admin.users.pending", r))))
    }

    function o(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n  <div id='selected-controls'>\n    <button "), n = {}, h = {}, s.buffer.push(G(t.action.call(e, "approveUsers", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}))), s.buffer.push(" class='btn'>"), h = {countBinding: e}, n = {countBinding: "STRING"}, r = {hash: {countBinding: "selectedCount"}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(G((a = t.countI18n, a ? a.call(e, "admin.users.approved_selected", r) : N.call(e, "countI18n", "admin.users.approved_selected", r)))), s.buffer.push("</button>\n  </div>\n"), i
    }

    function l(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n  <div class='admin-loading'>"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "loading", r) : N.call(e, "i18n", "loading", r)))), s.buffer.push("</div>\n"), i
    }

    function c(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n  "), n = {}, h = {}, a = t["if"].call(e, "model.length", {hash: {}, inverse: M.program(35, C, s), fn: M.program(13, p, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n"), r
    }

    function p(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push("\n    <table class='table'>\n      <tr>\n        "), h = {}, r = {}, a = t["if"].call(e, "showApproval", {hash: {}, inverse: M.noop, fn: M.program(14, f, s), contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n        <th>&nbsp;</th>\n        <th>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "username", i) : N.call(e, "i18n", "username", i)))), s.buffer.push("</th>\n        <th>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "email", i) : N.call(e, "i18n", "email", i)))), s.buffer.push("</th>\n        <th>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "admin.users.last_emailed", i) : N.call(e, "i18n", "admin.users.last_emailed", i)))), s.buffer.push("</th>\n        <th>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "last_seen", i) : N.call(e, "i18n", "last_seen", i)))), s.buffer.push("</th>\n        <th>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "admin.user.topics_entered", i) : N.call(e, "i18n", "admin.user.topics_entered", i)))), s.buffer.push("</th>\n        <th>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "admin.user.posts_read_count", i) : N.call(e, "i18n", "admin.user.posts_read_count", i)))), s.buffer.push("</th>\n        <th>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "admin.user.time_read", i) : N.call(e, "i18n", "admin.user.time_read", i)))), s.buffer.push("</th>\n        <th>"), h = {}, r = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "created", i) : N.call(e, "i18n", "created", i)))), s.buffer.push("</th>\n        "), h = {}, r = {}, n = t["if"].call(e, "showApproval", {hash: {}, inverse: M.noop, fn: M.program(16, d, s), contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n        <th>&nbsp;</th>\n\n      </tr>\n\n      "), h = {}, r = {}, n = t.each.call(e, "model", {hash: {}, inverse: M.noop, fn: M.program(18, b, s), contexts: [e], types: ["ID"], hashContexts: r, hashTypes: h, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n\n    </table>\n  "), u
    }

    function f(e, s) {
        var a, n, h = "";
        return s.buffer.push("\n          <th>"), a = {checkedBinding: e}, n = {checkedBinding: "STRING"}, s.buffer.push(G(t.view.call(e, "Ember.Checkbox", {hash: {checkedBinding: "selectAll"}, contexts: [e], types: ["ID"], hashContexts: a, hashTypes: n, data: s}))), s.buffer.push("</th>\n        "), h
    }

    function d(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n          <th>"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "admin.users.approved", r) : N.call(e, "i18n", "admin.users.approved", r)))), s.buffer.push("</th>\n        "), i
    }

    function b(e, s) {
        var a, n, h, r, i, u = "";
        return s.buffer.push("\n        <tr "), h = {"class": e}, r = {"class": "STRING"}, s.buffer.push(G(t.bindAttr.call(e, {hash: {"class": "selected"}, contexts: [], types: [], hashContexts: h, hashTypes: r, data: s}))), s.buffer.push(">\n          "), r = {}, h = {}, a = t["if"].call(e, "showApproval", {hash: {}, inverse: M.noop, fn: M.program(19, m, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n          <td>"), r = {}, h = {}, i = {hash: {}, inverse: M.noop, fn: M.program(22, x, s), contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: r, data: s}, a = t.linkTo, n = a ? a.call(e, "adminUser", "", i) : N.call(e, "linkTo", "adminUser", "", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</td>\n          <td>"), r = {}, h = {}, i = {hash: {}, inverse: M.noop, fn: M.program(24, v, s), contexts: [e, e], types: ["STRING", "ID"], hashContexts: h, hashTypes: r, data: s}, a = t.linkTo, n = a ? a.call(e, "adminUser", "", i) : N.call(e, "linkTo", "adminUser", "", i), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</td>\n          <td>"), r = {}, h = {}, i = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}, s.buffer.push(G((a = t.shorten, a ? a.call(e, "email", i) : N.call(e, "shorten", "email", i)))), s.buffer.push("</td>\n          <td>"), r = {}, h = {}, n = t.unbound.call(e, "last_emailed_age", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</td>\n          <td>"), r = {}, h = {}, n = t.unbound.call(e, "last_seen_age", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</td>\n          <td>"), r = {}, h = {}, n = t.unbound.call(e, "topics_entered", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</td>\n          <td>"), r = {}, h = {}, n = t.unbound.call(e, "posts_read_count", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</td>\n          <td>"), r = {}, h = {}, n = t.unbound.call(e, "time_read", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</td>\n\n          <td>"), r = {}, h = {}, n = t.unbound.call(e, "created_at_age", {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("</td>\n\n          "), r = {}, h = {}, n = t["if"].call(e, "showApproval", {hash: {}, inverse: M.noop, fn: M.program(26, g, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n          <td>\n            "), r = {}, h = {}, n = t["if"].call(e, "admin", {hash: {}, inverse: M.noop, fn: M.program(31, _, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n            "), r = {}, h = {}, n = t["if"].call(e, "moderator", {hash: {}, inverse: M.noop, fn: M.program(33, I, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: r, data: s}), (n || 0 === n) && s.buffer.push(n), s.buffer.push("\n          <td>\n        </tr>\n      "), u
    }

    function m(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n            <td>\n              "), n = {}, h = {}, a = t["if"].call(e, "can_approve", {hash: {}, inverse: M.noop, fn: M.program(20, y, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n            </td>\n          "), r
    }

    function y(e, s) {
        var a, n, h = "";
        return s.buffer.push("\n                "), a = {checkedBinding: e}, n = {checkedBinding: "STRING"}, s.buffer.push(G(t.view.call(e, "Ember.Checkbox", {hash: {checkedBinding: "selected"}, contexts: [e], types: ["ID"], hashContexts: a, hashTypes: n, data: s}))), s.buffer.push("\n              "), h
    }

    function x(e, s) {
        var a, n, h, r;
        n = {imageSize: e}, h = {imageSize: "STRING"}, r = {hash: {imageSize: "small"}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: h, data: s}, s.buffer.push(G((a = t.avatar, a ? a.call(e, "", r) : N.call(e, "avatar", "", r))))
    }

    function v(e, s) {
        var a, n;
        a = {}, n = {}, s.buffer.push(G(t.unbound.call(e, "username", {hash: {}, contexts: [e], types: ["ID"], hashContexts: n, hashTypes: a, data: s})))
    }

    function g(e, s) {
        var a, n, h, r = "";
        return s.buffer.push("\n          <td>\n            "), n = {}, h = {}, a = t["if"].call(e, "approved", {hash: {}, inverse: M.program(29, D, s), fn: M.program(27, T, s), contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}), (a || 0 === a) && s.buffer.push(a), s.buffer.push("\n          </td>\n          "), r
    }

    function T(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n              "), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "yes_value", r) : N.call(e, "i18n", "yes_value", r)))), s.buffer.push("\n            "), i
    }

    function D(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n              "), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "no_value", r) : N.call(e, "i18n", "no_value", r)))), s.buffer.push("\n            "), i
    }

    function _(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push('<i class="icon-trophy" title="'), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "admin.title", r) : N.call(e, "i18n", "admin.title", r)))), s.buffer.push('"></i>'), i
    }

    function I(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push('<i class="icon-magic" title="'), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "admin.moderator", r) : N.call(e, "i18n", "admin.moderator", r)))), s.buffer.push('"></i>'), i
    }

    function C(e, s) {
        var a, n, h, r, i = "";
        return s.buffer.push("\n    <p>"), n = {}, h = {}, r = {hash: {}, contexts: [e], types: ["ID"], hashContexts: h, hashTypes: n, data: s}, s.buffer.push(G((a = t.i18n, a ? a.call(e, "search.no_results", r) : N.call(e, "i18n", "search.no_results", r)))), s.buffer.push("</p>\n  "), i
    }

    this.compilerInfo = [3, ">= 1.0.0-rc.4"], t = t || Ember.Handlebars.helpers, n = n || {};
    var w, S, E, A, k, R = "", N = t.helperMissing, G = this.escapeExpression, M = this;
    return n.buffer.push("<div class='admin-controls'>\n  <div class='span15'>\n    <ul class=\"nav nav-pills\">\n      <li>"), E = {}, A = {}, k = {hash: {}, inverse: M.noop, fn: M.program(1, h, n), contexts: [s], types: ["ID"], hashContexts: A, hashTypes: E, data: n}, w = t.linkTo, S = w ? w.call(s, "adminUsersList.active", k) : N.call(s, "linkTo", "adminUsersList.active", k), (S || 0 === S) && n.buffer.push(S), n.buffer.push("</li>\n      <li>"), E = {}, A = {}, k = {hash: {}, inverse: M.noop, fn: M.program(3, r, n), contexts: [s], types: ["ID"], hashContexts: A, hashTypes: E, data: n}, w = t.linkTo, S = w ? w.call(s, "adminUsersList.new", k) : N.call(s, "linkTo", "adminUsersList.new", k), (S || 0 === S) && n.buffer.push(S), n.buffer.push("</li>\n      "), E = {}, A = {}, S = t["if"].call(s, "Discourse.SiteSettings.must_approve_users", {hash: {}, inverse: M.noop, fn: M.program(5, i, n), contexts: [s], types: ["ID"], hashContexts: A, hashTypes: E, data: n}), (S || 0 === S) && n.buffer.push(S), n.buffer.push("\n    </ul>\n  </div>\n  <div class='span5 username controls'>\n    "), A = {value: s, placeholderKey: s}, E = {value: "ID", placeholderKey: "STRING"}, k = {hash: {value: "username", placeholderKey: "username"}, contexts: [], types: [], hashContexts: A, hashTypes: E, data: n}, n.buffer.push(G((w = t.textField, w ? w.call(s, k) : N.call(s, "textField", k)))), n.buffer.push("\n  </div>\n</div>\n\n"), E = {}, A = {}, S = t["if"].call(s, "hasSelection", {hash: {}, inverse: M.noop, fn: M.program(8, o, n), contexts: [s], types: ["ID"], hashContexts: A, hashTypes: E, data: n}), (S || 0 === S) && n.buffer.push(S), n.buffer.push("\n\n<h2>"), E = {}, A = {}, n.buffer.push(G(t._triageMustache.call(s, "title", {hash: {}, contexts: [s], types: ["ID"], hashContexts: A, hashTypes: E, data: n}))), n.buffer.push("</h2>\n<br/>\n\n"), E = {}, A = {}, S = t["if"].call(s, "loading", {hash: {}, inverse: M.program(12, c, n), fn: M.program(10, l, n), contexts: [s], types: ["ID"], hashContexts: A, hashTypes: E, data: n}), (S || 0 === S) && n.buffer.push(S), n.buffer.push("\n"), R
}), function () {
    window.jQuery, Discourse.AceEditorView = Discourse.View.extend({mode: "css", classNames: ["ace-wrapper"], contentChanged: function () {
        return this.editor && !this.skipContentChangeEvent ? this.editor.getSession().setValue(this.get("content")) : void 0
    }.observes("content"), render: function (e) {
        return e.push("<div class='ace'>"), this.get("content") && e.push(Handlebars.Utils.escapeExpression(this.get("content"))), e.push("</div>")
    }, willDestroyElement: function () {
        this.editor && (this.editor.destroy(), this.editor = null)
    }, didInsertElement: function () {
        var e = this, s = function () {
            e.editor = ace.edit(e.$(".ace")[0]), e.editor.setTheme("ace/theme/chrome"), e.editor.setShowPrintMargin(!1), e.editor.getSession().setMode("ace/mode/" + e.get("mode")), e.editor.on("change", function () {
                e.skipContentChangeEvent = !0, e.set("content", e.editor.getSession().getValue()), e.skipContentChangeEvent = !1
            })
        };
        window.ace ? s() : $LAB.script("/javascripts/ace/ace.js").wait(s)
    }}), Discourse.View.registerHelper("aceEditor", Discourse.AceEditorView)
}(this), function () {
    window.jQuery, Discourse.AdminApiView = Discourse.View.extend({templateName: "admin/templates/api"})
}(this), function () {
    window.jQuery, Discourse.AdminCustomizeView = Discourse.View.extend({templateName: "admin/templates/customize", classNames: ["customize"], init: function () {
        this._super(), this.set("selected", "stylesheet")
    }, headerActive: function () {
        return"header" === this.get("selected")
    }.property("selected"), stylesheetActive: function () {
        return"stylesheet" === this.get("selected")
    }.property("selected"), selectHeader: function () {
        this.set("selected", "header")
    }, selectStylesheet: function () {
        this.set("selected", "stylesheet")
    }, didInsertElement: function () {
        var e = this.get("controller");
        return Mousetrap.bindGlobal(["meta+s", "ctrl+s"], function () {
            return e.save(), !1
        })
    }, willDestroyElement: function () {
        return Mousetrap.unbindGlobal("meta+s", "ctrl+s")
    }})
}(this), function () {
    window.jQuery, Discourse.AdminDashboardView = Discourse.View.extend({templateName: "admin/templates/dashboard"})
}(this), function () {
    window.jQuery, Discourse.AdminReportCountsView = Discourse.View.extend({templateName: "admin/templates/reports/summed_counts_report", tagName: "tbody"})
}(this), function () {
    window.jQuery, Discourse.SiteSettingView = Discourse.View.extend({classNameBindings: [":row", ":setting", "content.overridden"], templateName: function () {
        return"bool" === this.get("content.type") ? "admin/templates/site_settings/setting_bool" : "enum" === this.get("content.type") ? "admin/templates/site_settings/setting_enum" : "admin/templates/site_settings/setting_string"
    }.property("content.type")})
}(this), function () {
    window.jQuery
}(this);