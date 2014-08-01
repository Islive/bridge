define([
  '../core/transport/main',
  '../core/utilities/object',
  '../core/utilities/array',
  './identity'
], function (transport, object, array, user) {

  return {

    /**
     * Start a new thread and send a message in it.
     * Arguments can be supplied individually in specified order, or as an object with parameter names as key.
     *
     * @param {String}   to       The name of the recipient.
     * @param {String}   subject  The subject of the thread.
     * @param {String}   message  The first message of the thread.
     * @param {Function} callback Function to call after creating the new thread.
     */
    create: function (to, subject, message, callback) {

      var argumentsArray = array.argumentsToArray(arguments)
        , thread
        , properties;

      callback = argumentsArray.pop();

      properties = object.verifyProperties(['to', 'subject', 'message'], argumentsArray);

      if (!properties || typeof callback !== 'function') {
        throw new Error(
            "Required arguments for message.send() are: 'to', 'subject', 'message'; in either that order as arguments or " +
            "supplied as an object as the first argument (with these properties as keys) and the callback as second argument."
        );
      }

      thread = {
        to     : properties.to,
        subject: properties.subject,
        body   : properties.message
      };

      transport.connection.post('/thread', thread, function (response) {
        if (response.error) {
          return callback(response);
        }

        callback(null, response);
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
     * @param {function} callback The function to call with the messages.
     */
    getMessages: function (threadId, callback) {
      transport.connection.get('/message', {thread: threadId}, function (response) {
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
     * @param {Function} callback
     */
    inbox: function (callback) {
      transport.connection.get('/message/inbox', function (response) {
        if (response.error) {
          return callback(response);
        }

        callback(null, response);
      });
    }
  }
});
