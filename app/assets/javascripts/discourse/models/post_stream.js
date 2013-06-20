/**
  We use this class to keep on top of streaming and filtering posts within a topic.

  @class PostStream
  @extends Ember.Object
  @namespace Discourse
  @module Discourse
**/
Discourse.PostStream = Em.Object.extend({

  // Whether we have loaded the first post
  firstPostLoaded: false,

  // has any data ever been loaded
  loaded: false,

  // are we current loading
  loading: false,

  posts: [],

  filter: function(opts) {
    opts = opts || {};

    var topic = this.get('topic');

    var postStream = this;
    postStream.set('loading', true);

    // Request a topicView

    return Discourse.PostStream.loadTopicView(topic.get('id'), opts).then(function (topicView) {

      // Update our Topic from the Topic View (it might have changed)
      topic.updateFromView(topicView);

      postStream.set('posts', Em.A());
      if (topicView.post_stream) {
        topicView.post_stream.posts.forEach(function(p) {
          postStream.addPost(Discourse.Post.create(p));
        });
      }

      postStream.setProperties({
        loading: false,
        loaded: true
      });
    });
  },

  addPost: function(post) {
    post.set('topic', this.get('topic'));
    if (post.get('post_number') === 1) { this.set('firstPostLoaded', true); }
    this.get('posts').pushObject(post);
  },

});


Discourse.PostStream.reopenClass({

  loadTopicView: function(topicId, opts) {
    opts = opts || {};

    var url = Discourse.getURL("/t/") + topicId;

    if (opts.nearPost) { url += "/" + opts.nearPost; }

    data = {};
    if (opts.postsAfter) { data.posts_after = opts.postsAfter; }
    if (opts.postsBefore) { data.posts_before = opts.postsBefore; }
    if (opts.trackVisit) { data.track_visit = true; }

    // Respect any user filters we might have
    if (opts.userFilters && opts.userFilters.length > 0) {
      data.username_filters = [];
      opts.userFilters.forEach(function(username) {
        data.username_filters.push(username);
      });
    }

    // Add the best of filter if we have it
    if (opts.bestOf === true) {
      data.best_of = true;
    }

    return Discourse.ajax(url + ".json", {data: data});
  }

});
