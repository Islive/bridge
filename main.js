define([], function () {
  return {
    load: function (name, req, onLoad, config) {
      name = 'bridge/lib/' + (name.replace(/^bridge\//, ''));

      return req([name], onLoad);
    }
  }
});
