define([], function () {

  /**
   * Build an escaped queryString from an object.
   *
   * @param {{}} data
   * @returns {string}
   */
  function buildQueryString(data) {
    var queryString = ""
      , key;

    for (key in data) {

      if (!data.hasOwnProperty(key)) {
        continue;
      }

      if (queryString.length > 0) {
        queryString += "&";
      }

      queryString += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }

    return queryString;
  }

  /**
   * Send a request to the backend.
   *
   * @param {string} url
   * @param {{}|function} data
   * @param {Function} callback
   * @param {string} method
   * @returns {*}
   */
  function request(url, data, callback, method) {

    // Default to get
    method = method || 'get';

    // Remove trailing slashes and spaces
    url = url.replace(/^\/?(.+)\/*\s*$/, '$1');

    // Allow data argument to be optional
    if (typeof data === 'function') {
      callback = data;
      data = {};
    }

    // Assign some private variables
    var xhr
      , queryString;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else { // Old browsers
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function() {
      if (4 !== xhr.readyState) {
        return;
      }

      if (200 !== xhr.status) {
        throw new Error('Request failed with status code ' + xhr.status);
      }

      var body = null;
      try {
        body = JSON.parse(xhr.responseText);
      } catch(error) { }

      callback(body);
    };

    if (['post', 'put', 'delete', 'get'].indexOf(method.toLowerCase()) > -1) {
      method = method.toUpperCase();
    } else {
      method = 'GET';
    }

    if (typeof data === 'object') {
      queryString = buildQueryString(data);

      if (queryString.length > 0) {
        url += '?' + buildQueryString(data);
      }
    }

    xhr.open(method, url, true);
    xhr.send();

    return this;
  }

  /**
   * The actual methods available for use.
   *
   * @type {{get: Function, post: Function, put: Function, delete: Function}}
   */
  return {

    /**
     * Convenience method for "get" requests.
     *
     * @param {string} url
     * @param {{}|Function} data
     * @param {Function} callback
     * @returns {*}
     */
    get: function(url, data, callback) {
      return request(url, data, callback, 'get');
    },

    /**
     * Convenience method for "post" requests.
     *
     * @param {string} url
     * @param {{}|Function} data
     * @param {Function} callback
     * @returns {*}
     */
    post: function(url, data, callback) {
      return request(url, data, callback, 'post');
    },

    /**
     * Convenience method for "put" requests.
     *
     * @param {string} url
     * @param {{}|Function} data
     * @param {Function} callback
     * @returns {*}
     */
    put: function(url, data, callback) {
      return request(url, data, callback, 'put');
    },

    /**
     * Convenience method for "delete" requests.
     *
     * @param {string} url
     * @param {{}|Function} data
     * @param {Function} callback
     * @returns {*}
     */
    'delete': function(url, data, callback) {
      return request(url, data, callback, 'delete');
    }
  };
});
