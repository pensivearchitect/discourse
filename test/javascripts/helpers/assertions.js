// Test helpers
var resolvingPromise = Ember.Deferred.promise(function (p) {
  p.resolve();
})

function exists(selector) {
  return !!count(selector);
}

function count(selector) {
  return find(selector).length;
}

function present(obj, text) {
  ok(!Ember.isEmpty(obj), text);
}

function blank(obj, text) {
  ok(Ember.isEmpty(obj), text);
}