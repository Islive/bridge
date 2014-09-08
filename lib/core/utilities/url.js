define([], function() {
  return {
    query : function (key) {
      var r = new RegExp('(\\?|&)'+key+'=(.*?)($|&)').exec(location);

      return typeof r !== 'undefined' && r ? decodeURIComponent(r[2]) : null;
    }
  };
});
