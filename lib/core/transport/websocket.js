/**
 * Websocket component used throughout the core of islive.io.
 *
 * @module core
 * @submodule transport
 * @class websocket
 * @beta
 *
 */
define(['./sails.io', '../config'], function(io, config) {

  io.sails.url = config.endpoint;

  return {

    /**
     * Get the connected socket used for transport.
     *
     * @method getSocket
     * @returns {io.socket}
     */
    getConnection: function() {
      return io.socket;
    }
  };
});
