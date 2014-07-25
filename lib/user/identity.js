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
     * @param {String}   role
     * @param {Function} callback The method called after getting checking the identity
     */
    hasIdentity: function(role, callback) {
      this.getIdentity(role, function(error, identity) {
        var hasIdentity;

        if (!error) {
          hasIdentity = identity && identity[role];

          return callback(null, hasIdentity);
        }

        if (error.error === 'no_identity') {
          return callback(null, false);
        }

        callback(error);
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
     * @param {String}   userId
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

        return callback(null, response);
      });
    }
  };
});
