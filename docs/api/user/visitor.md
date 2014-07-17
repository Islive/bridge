Docs for `user/visitor`
=======

[&laquo; Back to user module overview](/api/user/index.md)

-----

getIdentity <small>- Added at v0.0.1</small>
-----

Get the user's identity. Contains user information such as credit count.

### Parameters

| Parameter | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| callback  | Function | The callback that will be called when creation is done |

### Example
```js
define(['bridge!user/visitor'], function(visitor) {

  visitor.getIdentity(function(error, result) {
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
define(['bridge!user/visitor'], function(visitor) {

  var role = 'performer';

  visitor.hasIdentity(function(error, result) {
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
Login a visitor.

### Parameters

| Parameter | Type          | Description                                            |
| --------- | ------------- | ------------------------------------------------------ |
| username  | String        | The username / email                                   |
| password  | String        | The password                                           |
| callback  | Function      | The callback that will be called when done             |

### Example
```js
define(['bridge!user/visitor'], function(visitor) {

  var username = 'Bob'
    , password = 'keeshond';

  visitor.login(username, password, function(error, result) {
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
Get the user id of the authenticated visitor.

### Parameters

| Parameter | Type          | Description                                            |
| --------- | ------------- | ------------------------------------------------------ |
| callback  | Function      | The callback that will be called when done             |

### Example
```js
define(['bridge!user/visitor'], function(visitor) {

  visitor.getUserId(function(error, result) {
    if (error) {
      // Error while fetching userId
    }

    var userId = result;
  });
});
```

-----

hasUsername <small>- Added at v0.0.1</small>
-----
Check if the visitor has a username.

### Parameters

| Parameter | Type          | Description                                            |
| --------- | ------------- | ------------------------------------------------------ |
| callback  | Function      | The callback that will be called when done             |

### Example
```js
define(['bridge!user/visitor'], function(visitor) {

  visitor.hasUsername(function(error, result) {
    if (error) {
      // Error while fetching username
    }

    var boolean = result;
  });
});
```

-----

setUsername <small>- Added at v0.0.1</small>
-----
Set the username of the authenticated visitor.

### Parameters

| Parameter | Type          | Description                                            |
| --------- | ------------- | ------------------------------------------------------ |
| username  | String        | The username                                           |
| callback  | Function      | The callback that will be called when done             |

### Example
```js
define(['bridge!user/visitor'], function(visitor) {

  var username = 'Bob';

  visitor.setUsername(username, function(error) {
    if (error) {
      // Error while setting username
    }
  });
});
```

-----

getCredits <small>- Added at v0.0.1</small>
-----
Get the amount of credits the authenticated visitor has.

### Parameters

| Parameter | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| callback  | Function | The callback that will be called when fetching is done |

### Example
```js
define(['bridge!user/visitor'], function(visitor) {

  visitor.getCredits(function(error, result) {
    if (error) {
      // Error while fetching credits
    }

    var credits = result;
  });
});
```
