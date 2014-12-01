define(['module', './utilities/extend'], function (module, extend) {
  var config = extend(true, {
    endpoint    : 'api.islive.io',
    fallbackPort: 80,
    version     : 1
  }, module.config());

  config.endpoint = '//' + config.endpoint.replace(/^([a-z]+:)?\/\//i, '');

  return config;
});
