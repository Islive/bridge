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
      transport.connection.post('/user/login', {username: username, password: password, role: role}, function(response) {
        if (response.error) {
          return callback(response);
        }

        callback(null, response);
      });
    },

    /**
     * Check if the current client has an identity.
     *
     * @param {Function} callback The method called after getting the credits
     */
    hasIdentity: function(callback) {
      this.getIdentity(function(identity) {
        callback(!!identity);
      });
    },

    /**
     * Destroy the identity.
     *
     * @param {Function} callback The method called after logging out.
     */
    logout : function(callback) {
      transport.connection.get('/user/logout', callback);
    },

    /**
     * Get the username from a user ID.
     *
     * @param {String}   username
     * @param {Function} callback The method called after getting the credits
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
     * Get the User ID.
     *
     * @param {Function} callback The method called after getting the credits
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
     * @param {Function}  callback  The method called after getting the identity
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

      transport.connection.get(requestUri, function(response) {
        if (response.error) {
          return callback(response);
        }

        return callback(null, result);
      });
    }
  };
});
