define(['module', './utilities/extend'], function(module, extend) {
  var config = extend(true, {
    endpoint: 'api.islive.io'
  }, module.config());

  config.endpoint = '//' + config.endpoint.replace(/^([a-z]+:)?\/\//i, '');

  return config;
});
