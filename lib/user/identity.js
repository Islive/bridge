define(['../core/transport/main'], function(transport) {
  var identity = null;

  // @todo make this only work on debug mode
  transport.connection.get('/firehose', function() {
    transport.connection.on('firehose', function(data) {
      console.log(data);
    })
  });

  return {
    /**
     *
     * @param {String}   username
     * @param {String}   password
     * @param {Function} callback
     */
    login: function(username, password, callback) {

      transport.connection.post('/user/login', {username: username, password: password}, function(result) {
        if (!result.error) {
          identity = result;
        }

        callback(result);
      });
    },

    /**
     * Check if the current client has an identity.
     *
     * @param {Function} callback
     */
    hasIdentity: function(callback) {
      this.getIdentity(function(identity) {
        callback(!!identity);
      });
    },

    /**
     * Destroy the identity.
     *
     * @param {Function} callback
     */
    logout : function(callback) {
      transport.connection.get('/user/logout', callback);
    },

    /**
     * Get the username from a user ID.
     *
     * @param {String}   userId
     * @param {Function} callback
     */
    getUsername : function(userId, callback) {
      transport.connection.get('/user/username/' + userId, callback);
    },

    /**
     * Get the user's identity. Contains user information such as credit count.
     *
     * @param {Function} callback
     * @returns {*}
     */
    getIdentity: function(callback) {
      if (identity) {
        return callback(identity);
      }

      transport.connection.get('/user/identity', function(result) {
        if (result.success) {
          identity = result.data;

          return callback(identity)
        }


        return callback(false);
      });
    }
  };
});
