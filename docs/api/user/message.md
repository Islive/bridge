Docs for `user/message`
=======

[&laquo; Back to user module overview](/api/user/index.md)

---------

**Note!** The methods in this module require an active user identity.

create <small>- Added at v0.0.1</small>
------

Start a new thread and send a message in it.
Arguments can be supplied individually in specified order, or as an object with parameter names as key.

### Parameters

| Parameter | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| to        | String   | The name of the recipient                              |
| subject   | String   | The subject of the new thread                          |
| message   | String   | The first message of the thread                        |
| callback  | Function | The callback that will be called when creation is done |

### Example
```js
define(['bridge!user/message'], function(message) {

  var to = 'recipientUsername'
    , subject = 'Hello!'
    , body = 'How are you doing today?';

  message.create(to, subject, body, function(error, result) {
    if (error) {
      // Sending message failed.
    }

    var out = result;
  });
});
```

-----

getThread <small>- Added at v0.0.1</small>
-----
Get a thread and the messages in it.

### Parameters

| Parameter | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| threadId  | String   | The ID of the thread                                   |
| callback  | Function | The callback that will be called when fetching is done |

### Example
```js
define(['bridge!user/message'], function(message) {

  message.getThread('53b2b258472c37b6250585e5', function(error, result) {
    if (error) {
      // Error while fetching thread
    }

    var thread = result;
  });
});
```

-----

reply <small>- Added at v0.0.1</small>
-----
Reply on an existing thread.

### Parameters

| Parameter | Type          | Description                                            |
| --------- | ------------- | ------------------------------------------------------ |
| thread    | String        | The ID of the thread                                   |
| message   | String        | The message to add to the thread                       |
| callback  | Function      | The callback that will be called when done             |

### Example
```js
define(['bridge!user/message'], function(message) {

  var body = 'I am fine thanks. You?';

  message.reply('53b2b258472c37b6250585e5', body, function(error, result) {
    if (error) {
      // Error while sending reply
    }

    var replied = result;
  });
});
```

-----

getParticipant <small>- Added at v0.0.1</small>
-----
Get the name of the participant from a message object.
This method figures out what the username of the person being talked to is.

### Parameters

| Parameter | Type          | Description                                |
| --------- | ------------- | ------------------------------------------ |
| message   | Object        | The object for the message.                |
| callback  | Function      | The callback that will be called when done |

### Example
```js
define(['bridge!user/message'], function(message) {

  // Inbox gotten from message.inbox();
  var messageObject = inbox[0];

  message.getParticipant(messageObject, function(error, result) {
    if (error) {
      // Error while fetching name
    }

    var participant = result;
  });
});
```

-----

markRead <small>- Added at v0.0.1</small>
-----
Mark a specific message as read.

### Parameters

| Parameter | Type          | Description                                |
| --------- | ------------- | -------------------------------------------|
| message   | String        | The ID of the message                      |
| callback  | Function      | The callback that will be called when done |

### Example
```js
define(['bridge!user/message'], function(message) {

  // inbox[0].id is the id of the first message
  message.markRead(inbox[0].id, function(error) {
    if (error) {
      // Error while marking message as read
    }
  });
});
```

-----

markAllRead <small>- Added at v0.0.1</small>
-----
Mark all messages within a thread as read.

### Parameters

| Parameter | Type          | Description                                |
| --------- | ------------- | -------------------------------------------|
| thread    | String        | The ID of the thread                       |
| callback  | Function      | The callback that will be called when done |

### Example
```js
define(['bridge!user/message'], function(message) {

  // inbox[0].id is the id of the first message
  message.markAllRead(inbox[0].id, function(error) {
    if (error) {
      // Error while marking all messages as read
    }
  });
});
```

-----

inbox <small>- Added at v0.0.1</small>
-----

Get the messages from the inbox.
This method returns a flattened set of messages to simplify rendering.

### Parameters

| Parameter | Type          | Description                                |
| --------- | ------------- | ------------------------------------------ |
| callback  | Function      | The callback that will be called when done |

### Example
```js
define(['bridge!user/message'], function(message) {

  message.inbox(function(error, result) {
    if (error) {
      // Fetching inbox failed.
    }

    // Returns this format:
    // [
    //   {
    //     id: "53b69e2d187c317122e0ddc8",
    //     created: "2014-07-04T12:29:33.710Z",
    //     updated: "2014-07-04T12:29:33.710Z",
    //     to: "anne80",
    //     subject: "Some subject",
    //     thread: "53b69e2d187c317122e0ddc7",
    //     body: "Some message",
    //     read: false,
    //     direction: "out"
    //   }
    // ]
  });
});
```
