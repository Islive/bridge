define([
  '../core/transport/main',
  '../core/utilities/object',
  '../core/utilities/array',
  './identity'
], function (transport, object, array, user) {

  function ensureIdentity(success, fail) {
    user.getIdentity(function (identity) {
      if (!identity) {
        return fail(new Error('User must be authenticated.'));
      }

      success(identity);
    });
  }

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
    'new': function (to, subject, message, callback) {

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

      ensureIdentity(function (identity) {
        transport.connection.post('/thread', thread, function (thread) {
          console.log(thread);
          callback(null, thread);
        });
      }, callback);
    },

    /**
     *
     * @todo Check if user has access to messages in thread
     * @param threadId
     * @param callback
     */
    getThread: function (threadId, callback) {
      transport.connection.get('/thread', {id: threadId}, function (thread) {
        callback(thread);
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

      ensureIdentity(function () {
        transport.connection.post('/message', {thread: thread, body: message}, function (result) {
          callback(null, result);
        });
      }, callback);
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
        return callback(null);
      }

      ensureIdentity(function (identity) {
        if (typeof message.to === 'object' && typeof message.from === 'object') {
          return callback(identity.id === message.to.id ? message.from.username : message.to.username);
        }

        user.getUsername(identity.id === message.to ? message.from : message.to, callback);
      }, callback);
    },

    markAllRead: function (thread, callback) {
      var threadId = typeof thread === 'object' ? thread.id : thread;

      transport.connection.put('/message/by-thread/' + threadId, {read: true}, function(response) {
        console.log(response);
        if (typeof callback === 'function') {
          callback();
        }
      });
    },

    markRead: function (message, callback) {
      if (typeof message === 'object') {
        message = message.id;
      }

      transport.connection.put('/message/' + message, {read: true}, function (response) {
        console.log(response);
        if (typeof callback === 'function') {
          callback();
        }
      });
    },

    /**
     * Get the messages from the inbox.
     * This method returns a flattened set of
     *
     * @param {Function} callback
     */
    inbox: function (callback) {
      ensureIdentity(function () {
        transport.connection.get('/message/inbox', function (inbox) {
          if (inbox.success) {
            return callback(null, inbox.data);
          }

          callback(inbox.error);
        });
      }, callback);
    }
  }
});
