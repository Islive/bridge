define(['module', './utilities/extend'], function(module, extend) {
  return extend(true, {
    endpoint: 'http://api.islive.io'
  }, module.config());
});
