define(['./json'], function (JSON) {
  return {
    write  : function (name, value, days, path, secure) {
      var expires = '',
          valueToUse = '',
          secureFlag = '',
          date;

      path = path || "/";

      if (days) {
        (date = new Date()).setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }

      if (typeof value === "object") {
        valueToUse = JSON.stringify({v: value});
      } else {
        valueToUse = encodeURIComponent(value);
      }
      if (secure) {
        secureFlag = "; secure";
      }

      document.cookie = name + "=" + valueToUse + expires + "; path=" + path + secureFlag;
    },
    read : function (key) {
      var r = new RegExp('(^|;)\\s*'+key+'=(.*?)\\s?(;|$)').exec(document.cookie), value;

      if (!r) {
        return null;
      }

      value = r[2]; //2nd capture group.

      if (value[0] === '{' && value[value.length-1] === '}') {
        value = JSON.parse(value);
        value = typeof value.v !== 'undefined' ? value.v : value;
      }

      return typeof value === 'object' ? value : decodeURIComponent(value);
    },
    destroy: function (name) {
      this.write(name, "", -1);
    }
  };
});
