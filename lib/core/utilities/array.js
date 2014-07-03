define([], function() {
  return {
    isArray: function(value) {
      if (typeof Array.prototype.isArray === 'function') {
        return Array.prototype.isArray.call(value);
      }

      return Object.prototype.toString.call(value) === '[object Array]';
    },
    argumentsToArray: function(args) {
      return Array.prototype.slice.call(args, 0);
    }
  };
});
