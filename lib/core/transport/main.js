define(['./websocket'], function(socket) {

  var transport = {
    connection: socket.getSocket()
  };

  transport.connection.on('connect', function() {
    // Get the real socket.
    transport.connection = socket.getSocket();
  });

  return transport;
});
