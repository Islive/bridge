define(['module', './utilities/extend'], function(module, extend) {
  return extend(true, {
    endpoint: 'api.islive.io'
  }, module.config());
});
