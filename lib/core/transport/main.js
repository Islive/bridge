define(['./websocket'], function(socket) {

  var transport = {
    connection: socket.getConnection()
  };

  transport.connection.on('connect', function() {
    // Get the real socket.
    transport.connection = socket.getConnection();
  });

  return transport;
});
