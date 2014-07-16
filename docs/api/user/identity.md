Docs for `user/identity`
=======

[&laquo; Back to user module overview](/api/user/index.md)

---------

login <small>- Added at v0.0.1</small>
------

Login a user.

### Parameters

| Parameter | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| role      | String   | The role authenticating for                |
| username  | String   | The username / email                       |
| password  | String   | The password                               |
| callback  | Function | The callback that will be called when done |

### Example

```javascript
define(['bridge!user/identity'], function(identity) {

  var username = 'Bob'
    , password = 'keeshond';

  identity.login('visitor', username, password, function(error, result) {
    if (error) {
      // Authentication error
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
define(['bridge!user/identity'], function(identity) {

  identity.hasIdentity(function(result) {
    if (result) {
      // User is logged in, and thus has an identity.
    }
  });
});
```

------

logout <small>- Added at v0.0.1</small>
------

Destroy the client's identity.

### Parameters

| Parameter | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| callback  | Function | The callback that will be called when done |

### Example

```javascript
define(['bridge!user/identity'], function(identity) {

  identity.logout(function(result) {
    // Logged out.
  });
});
```

------

getUsername <small>- Added at v0.0.1</small>
------

Get the username from a user ID.

### Parameters

| Parameter | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| userId    | String   | The user ID                                |
| callback  | Function | The callback that will be called when done |

### Example

```javascript
define(['bridge!user/identity'], function(identity) {

  identity.getUsername('53b69e2d187c317122e0ddc7', function(error, result) {
    if (error) {
      // Error while fetching the username
    }

    var username = result;
  });
});
```

------

getUserId <small>- Added at v0.0.1</small>
------

Get the user ID from a authenticated user.

### Parameters

| Parameter | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| callback  | Function | The callback that will be called when done |

### Example

```javascript
define(['bridge!user/identity'], function(identity) {

  identity.getUserId(function(error, result) {
    if (error) {
      // Error while fetching the userId
    }

    var userId = result;
  });
});
```

------

getIdentity <small>- Added at v0.0.1</small>
------

Get the user's identity. Contains user information such as credit count.

### Parameters

| Parameter | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| role      | String   | The role [visitor, performer]              |
| callback  | Function | The callback that will be called when done |
| force     | Boolean  | force update (don't use cached identity)   |

### Example

```javascript
define(['bridge!user/identity'], function(identity) {

  identity.getIdentity(function(error, result) {
    if (error) {
      // Error while fetching the identity
    }

    var userIndentity = result;
  });
});
```

