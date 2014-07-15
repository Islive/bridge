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
| username  | String   | The username                               |
| password  | String   | The password                               |
| callback  | Function | The callback that will be called when done |

### Example

```javascript
define(['bridge!user/identity'], function(identity) {
  identity.login('visitor', 'username@example.com', 'securePassword', function(error, result) {
    if (error) {
      // Authentication error
    }

    // Result is identity.
    console.log(result.username);
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
  identity.getUsername('53b69e2d187c317122e0ddc7', function(result) {
    if (result.error) {
      // Getting the username failed.
    }

    // result is the username
  });
});
```
