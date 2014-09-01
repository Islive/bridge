define(['../core/transport/main', './identity', '../core/subscribe'], function (transport, identity, subscribe) {
  var visitorIdentity = null,
      listening = false;

  /**
   * Set the identity cache, and set up event listener to maintain visitor entity.
   *
   * @param {{}} identityCache
   */
  function setIdentityCache(identityCache) {
    if (!listening) {
      subscribe.to(identityCache).on('updated', 'credits', function (updated) {
        visitorIdentity.credits = updated.credits;
      });

      listening = true;
    }

    visitorIdentity = identityCache;
  }

  return {

    /**
     * Get the user's identity. Contains user information such as credit count.
     *
     * @param {Function} callback
     * @param {Boolean}  force     force update (don't use cached identity)
     * @returns {*}
     */
    getIdentity: function (callback, force) {
      if (visitorIdentity) {
        return callback(null, visitorIdentity);
      }

      identity.getIdentity('visitor', function (error, userIdentity) {
        if (error) {
          return callback(error);
        }

        if (typeof userIdentity.visitor === 'object') {
          setIdentityCache(userIdentity.visitor);

          return callback(null, visitorIdentity);
        }

        // Okay so, our record didn't get populated. Force update.
        identity.getIdentity('visitor', function (error, userIdentity) {
          if (error) {
            return callback(error);
          }

          setIdentityCache(userIdentity.visitor);

          callback(null, visitorIdentity);
        }, true);

      }, force);
    },

    /**
     * Check if the current client has an identity.
     *
     * @param {Function} callback The method called after checking the identity
     */
    hasIdentity: function (callback) {
      identity.hasIdentity('visitor', function (error, userIdentity) {
        if (error) {
          return callback(error);
        }

        callback(null, !!userIdentity);
      });
    },

    /**
     * Get the amount of credits the authenticated visitor has.
     *
     * @param {Function} callback The method called after getting the credits
     */
    getCredits: function (callback) {
      this.getIdentity(function (error, identity) {
        if (error) {
          return callback(error);
        }

        callback(null, identity.credits);
      });
    },

    /**
     * Login a visitor.
     *
     * @param {String}   username
     * @param {String}   password
     * @param {Function} callback
     */
    login: function (username, password, callback) {
      identity.login('visitor', username, password, function (error, response) {
        if (error) {
          return callback(error);
        }

        setIdentityCache(response.visitor);

        callback(null, response);
      });
    },

    /**
     * Check if the visitor has a username.
     *
     * @param {Function} callback The method called after checking if visitor has a username
     */
    hasUsername: function (callback) {
      this.getIdentity(function (error, identity) {
        if (error) {
          return callback(error);
        }

        callback(null, !!identity.username);
      });
    },

    /**
     * Get the user ID of a authenticated visitor
     *
     * @param {Function} callback The method called after checking if visitor has a username
     */
    getUserId: function (callback) {
      this.getIdentity(function (error, identity) {
        if (error) {
          return callback(error);
        }

        callback(null, identity.id);
      });
    },

    /**
     * Register a new user
     *
     * @param {{}}        params    Object of params: username, password, email[, wallet][, p][, pi]
     * @param {Function}  callback
     */
    register: function (params, callback) {
      transport.connection.post('/visitor/register', params, function (response) {
        if (response.error) {
          return callback(response);
        }

        return callback(null, response);
      });
    },

    /**
     * Login by hash.
     *
     * @param {String}   email
     * @param {String}   hash
     * @param {Function} callback
     */
    loginByHash : function(email, hash, callback) {
      identity.loginByHash('visitor', email, hash, function (error, response) {
        if (error) {
          return callback(error);
        }

        setIdentityCache(response.visitor);

        callback(null, response);
      });
    },

    /**
     * Set the username of a visitor
     *
     * @param {String}   username
     * @param {Function} callback The method called after checking if visitor has a username
     */
    setUsername: function (username, callback) {
      transport.connection.put('/visitor/username', {username: username}, function (response) {
        if (response.error) {
          return callback(response);
        }

        if (!visitorIdentity) {
          return callback({error: 'no_identity'});
        }

        identity.getIdentity('visitor', function (error, userIdentity) {
          if (error) {
            return callback(error);
          }

          userIdentity.username = username;
          visitorIdentity.username = username;
          callback(null, username);
        });
      });
    }
  };
});
