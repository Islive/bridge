requirejs.config({
  "paths" : {
    "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
  },
  packages: [
    {
      name    : 'bridge',
      location: 'vendor/bridge'
    }
  ]
});

define(['jquery', 'bridge!performer/find'], function ($, find) {
  find.byUsername('kinkydenise', function(error, performer) {
    if (error) {
      return console.error('Could not find performer :(');
    }

    $('#username').text(performer.username);
    $('#age').text(performer.age);
    $('#hairColor').text(performer.hairColor);
  });
});
