define(['../core/transport/main'], function(transport) {
  var identity = null;

  // @todo make this only work on debug mode
  transport.connection.get('/firehose', function() {
    transport.connection.on('firehose', function(data) {
      console.log(data);
    })
  });

  return {
    login: function(username, password, callback) {

      transport.connection.post('/user/login', {username: username, password: password}, function(result) {
        if (result.success) {
          identity = result.data;
        }

        callback(result);
      });
    },

    hasIdentity: function(callback) {
      this.getIdentity(function(identity) {
        callback(!!identity);
      });
    },

    logout : function(callback) {
      transport.connection.get('/user/logout', callback);
    },

    getUsername : function(userId, callback) {
      transport.connection.get('/user/username/' + userId, function(result) {
        if (result.success) {
          return callback(result.data);
        }

        return callback(null);
      });
    },

    getIdentity: function(callback) {
      if (identity) {
        return callback(identity);
      }

      transport.connection.get('/user/identity', function(result) {
        console.log(result);
        if (result.success) {
          identity = result.data;
          console.log('OK::', result);

          return callback(identity)
        }

        console.log('FAIL::', result);

        return callback(false);
      });
    }
  };
});
