integration("User");

test("Activity Streams", function() {
  expect(14);

  var streamTest = function(url) {
    visit(url).then(function() {
      ok(exists(".user-heading"), "The heading is rendered");
      ok(exists("#user-activity"), "The activity is rendered");
    });
  };

  streamTest("/users/eviltrout");
  streamTest("/users/eviltrout/activity/topics");
  streamTest("/users/eviltrout/activity/posts");
  streamTest("/users/eviltrout/activity/replies");
  streamTest("/users/eviltrout/activity/likes-given");
  streamTest("/users/eviltrout/activity/likes-received");
  streamTest("/users/eviltrout/activity/edits");

});
