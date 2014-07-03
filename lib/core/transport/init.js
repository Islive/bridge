define(['./websocket'], function (socket) {
  return function (callback) {
    socket.init(callback);
  };
});
