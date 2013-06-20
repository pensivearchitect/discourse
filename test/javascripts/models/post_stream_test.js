module("Discourse.PostStream");

var buildStream = function(id) {
  var topic = Discourse.Topic.create({id: id});
  return topic.get('postStream');
};

test('defaults', function() {
  var stream = buildStream(1234);
  blank(stream.get('posts'), "there are no posts in a stream by default");
  ok(!stream.get('loading'), "it is not loading by default");
  ok(!stream.get('loaded'), "it has never loaded");

  present(stream.get('topic'));
});

test('firstPostLoaded', function() {
  var stream = buildStream(4567);
  ok(!stream.get('firstPostLoaded'), "the first post is not loaded by default");

  stream.addPost(Discourse.Post.create({id: 100, post_number: 10}));
  ok(!stream.get('firstPostLoaded'), "still haven't loaded the first post");

  stream.addPost(Discourse.Post.create({id: 50, post_number: 1}));
  ok(stream.get('firstPostLoaded'), "the first post is loaded");
});