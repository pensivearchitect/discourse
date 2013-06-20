/**
  A model representing a Topic's details that aren't always present, such as a list of participants.
  When showing topics in lists and such this information should not be required.

  @class TopicDetails
  @extends Discourse.Model
  @namespace Discourse
  @module Discourse
**/
Discourse.TopicDetails = Discourse.Model.extend({
  loaded: false,

  updateFrom: function(details) {

    this.setProperties(details);
    this.set('loaded', true);

    //console.log(details);
    //   if (topic.get('participants')) {
    //     topic.get('participants').clear();
    //   }
    //   if (result.suggested_topics) {
    //     topic.set('suggested_topics', Em.A());
    //   }
    //   topic.mergeAttributes(result, { suggested_topics: Discourse.Topic });
    //   topic.set('allowed_users', Em.A(result.allowed_users));

    //   if (opts.trackVisit && result.draft && result.draft.length > 0) {
    //     Discourse.openComposer({
    //       draft: Discourse.Draft.getLocal(result.draft_key, result.draft),
    //       draftKey: result.draft_key,
    //       draftSequence: result.draft_sequence,
    //       topic: topic,
    //       ignoreIfChanged: true
    //     });
    //   }
  },


  notificationReasonText: function() {
    var locale_string = "topic.notifications.reasons." + this.get('notification_level');
    if (typeof this.get('notifications_reason_id') === 'number') {
      locale_string += "_" + this.get('notifications_reason_id');
    }
    return Em.String.i18n(locale_string, { username: Discourse.User.current('username_lower') });
  }.property('notification_level', 'notifications_reason_id'),


  updateNotifications: function(v) {
    this.set('notification_level', v);
    this.set('notifications_reason_id', null);
    return Discourse.ajax("/t/" + (this.get('topic.id')) + "/notifications", {
      type: 'POST',
      data: { notification_level: v }
    });
  },

});