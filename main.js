define([], function () {
  var connectionEstablished = false
    , queued = [];

  function processQueue() {
    var i = 0
      , dep;

    for (; i < queued.length; i++) {
      dep = queued[i];

      dep.req(dep.name, dep.onLoad);
    }
  }

  return {
    load: function (name, req, onLoad, config) {

      name = 'islive.io/lib/' + (name.replace(/^islive\.io\//, ''));

      if (connectionEstablished) {
        return req([name], onLoad);
      }

      queued.push({name: [name], onLoad: onLoad, req: req});

      if (null === connectionEstablished) {
        return;
      }

      connectionEstablished = null;

      req(['islive.io/lib/core/init'], function () {
        connectionEstablished = true;

        return processQueue();
      });
    }
  }
});
