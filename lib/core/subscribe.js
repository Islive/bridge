define(['./transport/main', './utilities/object'], function(transport, object) {

  /**
   * Holds all the callbacks.
   * @type {{}}
   */
  var subscribeCallbacks = {};

  /**
   * Create a new listener instance, that awaits instructions from the caller.
   *
   * @param {{}|string}  model
   * @param {int|string} id
   *
   * @constructor
   */
  function Listener(model, id) {
    this.model = model;
    this.id    = id;

    // ensure object for model.
    if (typeof subscribeCallbacks[model] === 'undefined') {
      subscribeCallbacks[model] = {};
    }
  }

  /**
   * Returns an onEvent callback.
   *
   * @param   {string}   model
   * @returns {Function}
   */
  function onEventFactory(model) {
    return function (event) {
      var callbacks = subscribeCallbacks[model][event.verb]
        , i = 0
        , onProperties;

      if (!callbacks) {
        return; // No listeners for this verb.
      }

      for (i; i < callbacks.length; i++) {

        // If id doesn't match, continue.
        if (callbacks[i].id && callbacks[i].id !== event.id) {
          continue;
        }

        onProperties = callbacks[i].onProperties;

        // If whenChanged was supplied, check if we have matches.
        if (onProperties && !object.propertyExists(onProperties, event.data)) {
          continue;
        }

        callbacks[i].callback(event.data);
      }
    }
  }

  /**
   * Listener prototype.
   */
  Listener.prototype = {

    /**
     * Attach an event listener.
     *
     * @param {string}   verb
     * @param {array|function}    [onProperties], callback
     * @param {Function} callback
     */
    on: function (verb, onProperties, callback) {
      var model     = this.model
        , callbacks = subscribeCallbacks[model];

      if (typeof onProperties === 'function') {
        callback    = onProperties;
        onProperties = null;
      }

      // If there aren't any verbs yet, it means we're not listening for events yet.
      if (object.empty(callbacks)) {

        // attach listener for model.
        transport.connection.on(model, onEventFactory(model));
      }

      // Ensure an array to hold the callbacks.
      if (typeof callbacks[verb] === 'undefined') {
        callbacks[verb] = [];
      }

      // Push callback to stack
      callbacks[verb].push({
        id          : this.id,
        callback    : callback,
        onProperties: onProperties
      });
    }
  };

  // Return public methods.
  return {
    /**
     * Create a new listener for a model.
     *
     * @param {{}|string}  model
     * @param {int|string} id
     */
    to: function (model, id) {

      // For objects, we can perform more magic.
      if (typeof model === 'object') {
        model = model._modelName;
        id    = model.id;
      }

      // Create a new listener that can be activated by the user.
      return new Listener(model, id);
    }
  };
});
