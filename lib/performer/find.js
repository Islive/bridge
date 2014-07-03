define(['../core/transport/main'], function(transport) {
  return {
    byUsername: function(username, callback) {
      transport.connection.get('/performer/' + username, function(response) {
        if (response.error) {
          return callback(response.error);
        }

        callback(null, response)
      });
    }
  };
});
