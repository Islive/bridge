define(['./config'], function (config) {

  // Set the default config.
  requirejs.config({
    paths: {
      'socket.io' : config.endpoint + '/socket.io/socket.io'
  }
  });
});
