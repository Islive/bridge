Docs for `core/subscribe`
=======

[&laquo; Back to user module overview](/api/core/index.md)

---------

to <small>- Added at v0.0.1</small>
------

Create a new listener for a model or model instance.

### Parameters

| Parameter | Type           | Description                                  |
| --------- | -------------- | -------------------------------------------- |
| to        | string/object  | The (row) object or model name to listen for |
| id        | string/integer | The id of a specific row to listen for       |

### Returns
A new `Listener` instance with the method `.on(verb[, onProperties], callback)`.
Use this method to specify which verbs you want to listen for.

### Examples
The following is a list of examples that best explain the possibilities this module offers:

------

#### All model updates
This example shows how you can listen to all updates for a model:

```javascript
define(['bridge!core/subscribe'], function(subscribe) {
  subscribe.to('visitor').on('updated', function(updated) {
    // Argument `updated` now holds the changed properties.
  });
});
```

------

#### Specific id
It's possible to listen for changes on a specific id only:

```javascript
define(['bridge!core/subscribe'], function(subscribe) {
  subscribe.to('visitor', 123).on('updated', function(updated) {
    // Argument `updated` now holds the changed properties for the visitor with id 123
  });
});
```

------

#### Model instance
You can also subscribe to a model instance. Example using authenticated user's identity:

```javascript
define(['bridge!core/subscribe', 'bridge!user/visitor'], function(subscribe, visitor) {
  visitor.getIdentity(function(error, identity) {
    subscribe.to(identity).on('updated', function(updated) {
      // Argument `updated` now holds the changed properties for the visitor instance.
    });
  });
});
```

------

#### Check for properties
It's also possible to only listen to changes in a specific model, when certain properties changed:

```javascript
define(['bridge!core/subscribe'], function(subscribe) {
  subscribe.to('visitor').on('updated', 'credits', function(updated) {
    // This will only be called when the `credits` property was changed.
  });
});
```

Or with an array, where if any of the properties has changed, your callback will be called:

```javascript
define(['bridge!core/subscribe'], function(subscribe) {
  subscribe.to('visitor').on('updated', ['username', 'email', 'credits'], function(updated) {
    // This will only be called when the `username`, `credits` or `email` property was changed.
  });
});
```

------

#### All together
And this is what it looks like when you use, well, everything:

```javascript
define(['bridge!core/subscribe', 'bridge!user/visitor'], function(subscribe, visitor) {
  visitor.getIdentity(function(error, identity) {
    subscribe.to(identity).on('updated', 'credits', function(updated) {
      // Our visitor his/her credit count has changed.
    });
  });
});
```

------
