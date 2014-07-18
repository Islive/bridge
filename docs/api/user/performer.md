Docs for `user/performer`
=======

[&laquo; Back to user module overview](/api/user/index.md)

-----

getIdentity <small>- Added at v0.0.1</small>
-----

Get the user's identity. Contains user information about the performer.

### Parameters

| Parameter | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| callback  | Function | The callback that will be called when creation is done |

### Example
```js
define(['bridge!user/performer'], function(performer) {

  performer.getIdentity(function(error, result) {
    if (error) {
      // Error while fetching user
    }

    var user = result;
  });
});
```

------

hasIdentity <small>- Added at v0.0.1</small>
------

Check if the current client has an identity.

### Parameters

| Parameter | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| callback  | Function | The callback that will be called when done |

### Example

```javascript
define(['bridge!user/performer'], function(performer) {

  performer.hasIdentity(function(error, result) {
    if (error) {
      // Error while fetching the identity
    }

    var userLoggedIn = result;
  });
});
```

-----

login <small>- Added at v0.0.1</small>
-----
Login a performer.

### Parameters

| Parameter | Type          | Description                                |
| --------- | ------------- | -------------------------------------------|
| username  | String        | The username / email                       |
| password  | String        | The password                               |
| callback  | Function      | The callback that will be called when done |

### Example
```js
define(['bridge!user/performer'], function(performer) {

  var username = 'Bob'
    , password = 'keeshond';

  performer.login(username, password, function(error, result) {
    if (error) {
      // Authentication error
    }

    var user = result;
  });
});
```

-----

getUserId <small>- Added at v0.0.1</small>
-----
Get the user id of the authenticated performer.

### Parameters

| Parameter | Type          | Description                                |
| --------- | ------------- | ------------------------------------------ |
| callback  | Function      | The callback that will be called when done |

### Example
```js
define(['bridge!user/performer'], function(performer) {

  performer.getUserId(function(error, result) {
    if (error) {
      // Error while fetching userId
    }

    var userId = result;
  });
});
```