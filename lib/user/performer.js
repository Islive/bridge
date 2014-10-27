define(['./identity'], function (identity) {
  var performerIdentity = null;

  return {

    /**
     * Get the user's identity. Contains user information such as credit count.
     *
     * @param {Function} callback
     * @param {Boolean}  force     force update (don't use cached identity)
     * @returns {*}
     */
    getIdentity: function (callback, force) {
      if (performerIdentity) {
        return callback(null, performerIdentity);
      }

      identity.getIdentity('performer', function (error, userIdentity) {
        if (error) {
          return callback(error);
        }

        if (typeof userIdentity.performer === 'object') {
          performerIdentity = userIdentity.performer;

          return callback(null, performerIdentity);
        }

        // Okay so, our record didn't get populated. Force update.
        identity.getIdentity('performer', function (error, userIdentity) {
          if (error) {
            return callback(error);
          }

          performerIdentity = userIdentity.performer;

          callback(null, performerIdentity);
        }, true);

      }, force);
    },

    /**
     * Check if the current client has an identity.
     *
     * @param {Function} callback The method called after checking the identity
     */
    hasIdentity: function(callback) {
      identity.hasIdentity('performer', function(error, userIdentity) {
        if (error) {
          return callback(error);
        }

        callback(null, !!userIdentity);
      });
    },

    /**
     * Login a performer.
     *
     * @param {String}   username
     * @param {String}   password
     * @param {Function} callback
     */
    login: function (username, password, callback) {
      identity.login('performer', username, password, function (error, response) {
        if (error) {
          return callback(error);
        }

        performerIdentity = response.performer;

        callback(null, response);
      });
    },

    /**
     * Login by hash.
     *
     * @param {String}          email       The email address of the performer
     * @param {String}          hash        The login hash
     * @param {String|Function} [username]  The username or the callback
     * @param {Function}        callback    The callback if username was supplied
     */
    loginByHash : function(email, hash, username, callback) {

      if (typeof username === 'function') {
        callback = username;
        username = null;
      }

      identity.loginByHash('performer', email, hash, username, function (error, response) {
        if (error) {
          return callback(error);
        }

        performerIdentity = response.performer;

        callback(null, response);
      });
    },

    /**
     * Get the user ID of a authenticated performer
     *
     * @param {Function} callback The method called after checking if performer has a username
     */
    getUserId: function (callback) {
      this.getIdentity(function (error, identity) {
        if (error) {
          return callback(error);
        }

        callback(null, identity.id);
      });
    }
  };
});
