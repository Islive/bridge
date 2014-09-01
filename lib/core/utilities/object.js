define([], function () {

  var objectTypes = {}, objectUtils;

  (function populateObjectTypes() {
    var types = "Boolean Number String Function Array Date RegExp Object Error".split(" ")
      , i = 0;

    for (; i < types.length; i++) {
      objectTypes['[object ' + types[i] + ']'] = types[i].toLowerCase();
    }
  })();

  objectUtils = {
    empty : function(object) {
      return objectUtils.keys(object).length === 0;
    },

    keys : function(object) {
      var keys = []
        , i;

      for (i in object) {
        keys.push(i);
      };

      return keys;
    },

    isPlainObject: function (value) {
      if (objectUtils.type(value) !== "object" || value.nodeType || jQuery.isWindow(value)) {
        return false;
      }

      return (!value.constructor && !Object.hasOwnProperty.call(value.constructor.prototype, "isPrototypeOf"));
    },

    type: function (value) {
      if (value == null) {
        return value + "";
      }

      // Support: Android < 4.0, iOS < 6 (functionish RegExp)
      return typeof value === "object" || typeof value === "function" ?
        objectTypes[ Object.prototype.toString.call(value) ] || "object" :
        typeof value;
    },

    /**
     * Function that checks if any of the properties defined in needle are available on haystack.
     *
     * @param   {Array|string} needle
     * @param   {{}}           haystack
     * @returns {boolean}
     */
    propertyExists : function (needle, haystack) {
      if (typeof needle === 'string') {
        return typeof haystack[needle] !== 'undefined';
      }

      for (var i = 0; i < needle.length; i++) {
        if (typeof haystack[needle[i]] !== 'undefined') {
          return true;
        }
      }

      return false;
    },

    verifyProperties : function(properties, supplied) {
      var i = 0
        , verifiedProperties = {};

      if (objectUtils.type(supplied) === 'array') {
        if (supplied.length < properties.length) {
          return false;
        }

        for ( ; i < supplied.length; i++) {
          verifiedProperties[properties[i]] = supplied[i];
        }
      } else if (typeof supplied === 'object' && typeof supplied[properties[0]] !== 'undefined') {
        for ( ; i < properties.length; i++) {
          if (typeof supplied[properties[i]] === 'undefined') {
            return false;
          }

          verifiedProperties[properties[i]] = supplied[properties[i]];
        }
      }

      return verifiedProperties;
    }
  };

  return objectUtils;
});
