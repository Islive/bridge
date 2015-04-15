requirejs.config({
  "paths" : {
    "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
  },
  packages: [
    {
      name    : 'bridge',
      location: '../'
    }
  ],
  config: {
    'bridge/lib/core/config': {
      'endpoint': '127.0.0.1:8080'
    }
  }
});

define([
  'jquery',
  'bridge!user/visitor',
  'bridge!user/identity'
], function ($, visitor, identity) {

  var user = 'test10';

  var params = {
    username: user,
    password: 'testttt',
    email   : 'vijay+testverification' + user + '@ratus.nl',
    wallet  : 'http://mysecurewallet.vijay/payment/freechat/testwallet/',
    p       : '1123123123',
    pi      : 'typein'
  };

  // visitor.register(params, function (error, user) {
  //   console.log('register: ', error, user);
  // });


  visitor.login('vijay@ratus.nl', 'computer123', function (error, user) {
    console.log('login:', error, user);

    // identity.updatePassword('computer', function (error, result) {
    //   console.log('changePassword:', error, result);
    // });
    // identity.update({notificationEmail: 'vijay@ratus.nl'}, function (error, result) {
    //   console.log('update notificationEmail:', error, result);
    // });
    // identity.verifyNotificationEmail(user, 'dd2369c86e85921b3a8347756e5a8528', function (error, result) {
    //   console.log('verifyNotificationEmail:', error, result);
    // });

    visitor.follow('ada', function (error, result) {
      console.log('follow:', error, result);

      // visitor.subscribeOnlineNotifications(result.id, 'http://google.nl', function (error, subscribeResult) {
      //   console.log('subscribe: ', error, subscribeResult);
      // });

      visitor.unsubscribeOnlineNotifications(result.id, function (error, unsubscribeResult) {
        console.log('unsubscribe: ', error, unsubscribeResult);
      });

      //visitor.unFollow('ada', function (error, result) {
       // console.log('unFollow:', error, result);
        // visitor.isFollowing('ada', function (error, result) {
        //   console.log('isFollowing:', error, result);
        // });

        // visitor.isFollowing('carmen', function (error, result) {
        //   console.log('isFollowingNaaah:', error, result);
        // });

        // visitor.isFollowing('carmeqaewryhaeryhn', function (error, result) {
        //   console.log('isFollowingOhNoes:', error, result);
        // });

        // visitor.following(function (error, result) {
        //   console.log('following:', error, result);
        // });
     // });
    });
  });

});
