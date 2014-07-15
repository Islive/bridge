define(['../core/transport/main'], function(transport) {
  var identity = null;

  return {
    /**
     * Login a user.
     *
     * @param {String}   role       Role to login for
     * @param {String}   username   username to login with
     * @param {String}   password   password to login with
     * @param {Function} callback   callback to call after authenticating
     */
    login: function(role, username, password, callback) {
      transport.connection.post('/user/login', {username: username, password: password, role: role}, function(result) {
        if (!result.error) {
          identity = result;

          return callback(null, result);
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
      transport.connection.get('/user/username/' + userId, function(response) {
        if (response.error) {
          return callback(response);
        }

        callback(null, response.username);
      });
    },

    /**
     * @param {Function} callback
     */
    getUserId: function(callback) {
      this.getIdentity(function(error, identity) {
        if (error) {
          return callback(error);
        }

        callback(null, identity.id);
      });
    },

    /**
     * Get the user's identity. Contains user information such as credit count.
     *
     * @param {String}    role
     * @param {Function}  callback
     * @param {Boolean}   force     force update (don't use cached identity)
     *
     * @returns {*}
     */
    getIdentity: function(role, callback, force) {
      var requestUri = '/user/identity';

      if (typeof role === 'function') {
        callback = role;
        role = null;
      } else {
        requestUri += '/' + role;
      }

      if (identity && !force) {
        return callback(null, identity);
      }

      transport.connection.get(requestUri, function(result) {
        if (result.error) {
          return callback(result);
        }

        identity = result;

        return callback(null, identity);
      });
    }
  };
});
