PreloadStore={data:{},store:function(e,t){this.data[e]=t},getAndRemove:function(e,t){var n=this;return Ember.Deferred.promise(function(s){if(n.data[e])s.resolve(n.data[e]),delete n.data[e];else if(t){var r=t();r.then?r.then(function(e){return s.resolve(e)},function(e){return s.reject(e)}):s.resolve(r)}else s.resolve(null)})},get:function(e){return this.data[e]},remove:function(e){this.data[e]&&delete this.data[e]}};