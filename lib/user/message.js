define([
  '../core/transport/main',
  '../core/utilities/object',
  '../core/utilities/array',
  './identity'
], function (transport, object, array, user) {

  function enrichParams (params, callback) {
    user.getPartnerInfo(function (error, info) {
      if (error) {
        return callback(error);
      }

      params.partnerInfo = info;

      return callback(null, params);
    });
  }

  return {

    /**
     * Start a new thread and send a message in it.
     * Arguments can be supplied individually in specified order, or as an object with parameter names as key.
     *
     * @param {String}   to       The name of the recipient.
     * @param {String}   subject  The subject of the thread.
     * @param {String}   body     The first message of the thread.
     * @param {Function} callback Function to call after creating the new thread.
     */
    create: function (to, subject, body, callback) {

      var argumentsArray = array.argumentsToArray(arguments), properties;

      callback = argumentsArray.pop();

      properties = object.verifyProperties(['to', 'subject', 'body'], argumentsArray);

      if (!properties || typeof callback !== 'function') {
        throw new Error(
          "Required arguments for message.send() are: 'to', 'subject', 'body'; in either that order as arguments or " +
          "supplied as an object as the first argument (with these properties as keys) and the callback as second argument."
        );
      }

      enrichParams(properties, function (error, params) {

        if (error) {
          return callback(error);
        }

        transport.connection.post('/thread', params, function (response) {

          if (response.error) {
            return callback(response);
          }

          callback(null, response);
        });
      });
    },

    /**
     * Get the number of unread messages for the authenticated user.
     *
     * @param {Function} callback
     */
    getUnreadCount: function (callback) {
      transport.connection.get('/message/unread', function (response) {
        if (response.error) {
          return callback(response);
        }

        callback(null, response.count);
      });
    },

    /**
     * Get the messages for a specific threadId
     *
     * @param {string}   threadId The ID of the thread
     * @param {string}   [sort]   Order messages
     * @param {function} callback The function to call with the messages.
     */
    getMessages: function (threadId, sort, callback) {
      if (typeof sort === 'function') {
        callback = sort;
        sort = 'createdAt desc';
      }

      transport.connection.get('/message', {thread: threadId, sort: sort}, function (response) {
        if (response.error) {
          return callback(response);
        }

        callback(null, response);
      });
    },

    /**
     * @todo Depends on https://github.com/balderdashy/sails/pull/1971
     * @param {string}   threadId The ID of the thread
     * @param {function} callback The function to call with the thread.
     */
    getThread: function (threadId, callback) {
      transport.connection.get('/thread', {id: threadId}, function (response) {
        if (response.error) {
          return callback(response);
        }

        callback(null, response);
      });
    },

    /**
     * Get the total amount of threads
     *
     * @param {function} callback The function to call with the thread.
     */
    getThreadCount: function (callback) {
      transport.connection.get('/thread/thread-count', function (response) {
        if (response.error) {
          return callback(response);
        }

        callback(null, response);
      });
    },

    /**
     * Reply on an existing thread.
     *
     * @param {String|Object} thread
     * @param {String} message
     * @param {Function} callback
     */
    reply: function (thread, message, callback) {
      if (typeof thread === 'object') {
        thread = thread.id;
      }

      transport.connection.post('/message', {thread: thread, body: message}, function (response) {
        if (response.error) {
          return callback(response);
        }

        callback(null, response);
      });
    },

    /**
     * Get the name of the participant from a message object.
     * This method figures out what the username of the person you're talking to is.
     *
     * @param {Object} message
     * @param {Function} callback
     * @returns {*}
     */
    getParticipant: function (message, callback) {
      if (typeof message !== 'object') {
        return callback(null, null);
      }

      user.getIdentity(function (error, identity) {
        if (error) {
          return callback(error);
        }

        if (typeof message.to === 'object' && typeof message.from === 'object') {
          return callback(null, identity.id === message.to.id ? message.from.username : message.to.username);
        }

        user.getUsername(identity.id === message.to ? message.from : message.to, function (error, username) {
          if (error) {
            return callback(error);
          }

          callback(null, username);
        });
      });
    },

    /**
     * Mark all messages within a thread as read.
     *
     * @param {String}    thread    The ID of the thread
     * @param {Function}  callback  The method to be called after completing the action.
     *
     * @todo Make a policy add "where: to = authenticated user". Now both parties will have their message set to read
     */
    markAllRead: function (thread, callback) {
      var threadId = typeof thread === 'object' ? thread.id : thread;

      transport.connection.put('/thread/mark-read', {thread: threadId}, function (response) {
        if (response.error) {
          return callback(response);
        }

        callback(null, response);
      });
    },

    /**
     * Mark a message as read.
     *
     * @param {String}    message   The ID of the message
     * @param {Function}  callback  The method to be called after completing the action.
     */
    markRead: function (message, callback) {
      if (typeof message === 'object') {
        message = message.id;
      }

      transport.connection.put('/message/mark-read', {id: message}, function (response) {
        if (response.error) {
          return callback(response);
        }

        callback(null, response);
      });
    },

    /**
     * Get the messages from the inbox.
     * This method returns a flattened set of messages to simplify rendering.
     *
     * @param {String}   [page]   Current page with threads, defaults to 1
     * @param {String}   [limit]  Limit the amount of threads, defaults to 30
     * @param {Function} callback
     */
    inbox: function (page, limit, callback) {
      var limits = {};

      if (typeof page === 'function') {
        callback = page;
        page = false;
      }

      if (typeof limit === 'function') {
        callback = limit;
        limit = false;
      }

      if (limit) {
        limits.limit = limit;
      }

      if (page) {
        limits.skip = (page - 1) * limit;
      }

      transport.connection.get('/message/inbox', limits, function (response) {
        if (response.error) {
          return callback(response);
        }

        callback(null, response);
      });
    },

    /**
     * Deletes the thread
     * @param {string}   threadId The ID of the thread
     * @param {function} callback The function to call with the deleted thread.
     */
    deleteThread: function (threadId, callback) {
      transport.connection.delete('/thread', {id: threadId}, function (response) {
        if (response.error) {
          return callback(response);
        }

        callback(null, response);
      });
    }
  }
});
