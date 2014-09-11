define(['./websocket', './ajax'], function (socket, ajax) {

  var transport = {
    adapters  : {
      socket: socket,
      ajax  : ajax
    },
    adapter   : function (adapter) {
      return this.adapters[adapter];
    },
    connection: socket.getConnection()
  };

  transport.connection.on('connect', function () {
    // Get the real socket.
    transport.connection = socket.getConnection();
  });

  return transport;
});
