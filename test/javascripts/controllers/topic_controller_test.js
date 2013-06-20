
var topic = Discourse.Topic.create({
  participants: [
    {id: 1234,
     post_count: 4,
     username: "eviltrout"}
  ]
});

var participant = {username: 'eviltrout'};

module("Discourse.TopicController", {
  setup: function() {
    this.topicController = controllerFor('topic', topic);
  }
});

test("loading", function() {
  var topicController = this.topicController;
  ok(!topicController.get('loading'), "by default the controller is not loading");
});


test("cancelFilter", function() {
  var topicController = this.topicController;

  topicController.set('bestOf', true);
  topicController.cancelFilter();
  ok(!topicController.get('bestOf'), "best of is cancelled");

  topicController.toggleParticipant(participant);
  topicController.cancelFilter();
  blank(topicController.get('userFilters'), "cancelling the filters clears the userFilters");
});

test("toggleParticipant", function() {
  var topicController = this.topicController;

  equal(topicController.get('userFilters.length'), 0, "by default no participants are toggled");

  topicController.toggleParticipant(participant);
  ok(topicController.get('userFilters').contains('eviltrout'), 'eviltrout is in the filters');

  topicController.toggleParticipant(participant);
  blank(topicController.get('userFilters'), "toggling the participant again removes them");
});

test("postFilters", function() {

  var topicController = this.topicController;
  deepEqual(topicController.get('postFilters'), {}, "there are no postFilters by default");

  topicController.set('bestOf', true);
  deepEqual(topicController.get('postFilters'), {bestOf: true}, "postFilters contains the bestOf flag");

  topicController.toggleParticipant(participant);
  deepEqual(topicController.get('postFilters'), {
    bestOf: true,
    userFilters: ['eviltrout']
  }, "postFilters contains the participant flag");

});
