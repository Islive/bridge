Docs for `user/message`
=======

[&laquo; Back to user module overview](/api/user/index.md)

---------

**Note!** The methods in this module require an active user identity.

create
------
Start a new thread and send a message in it.

### Parameters

| Parameter | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| to        | String   | The name of the recipient                              |
| subject   | String   | The subject of the new thread                          |
| message   | String   | The first message of the thread                        |
| callback  | Function | The callback that will be called when creation is done |

### Example
```js
define(['islive.io!user/message'], function(message) {
  var to = 'recipientUsername'
    , subject = 'Hello!'
    , body = 'How are you doing today?';

  message.create(to, subject, body, function(result) {
    if (result.error) {
      // Sending message failed.
    }
  });
});
```

------

getThread
---------
Get a thread and the messages in it.

### Parameters

| Parameter | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| threadId  | String   | The ID of the thread                                   |
| callback  | Function | The callback that will be called when fetching is done |

### Example
```js
define(['islive.io!user/message'], function(message) {

  message.getThread('53b2b258472c37b6250585e5', function(result) {
    if (result.error) {
      // Error while fetching thread
    }

    var thread = result;
  });
});
```

-----

reply
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
define(['islive.io!user/message'], function(message) {

  var body = 'I am fine thanks. You?';

  message.reply('53b2b258472c37b6250585e5', body, function(result) {
    if (result.error) {
      // Error while sending reply
    }

    var replied = result;
  });
});
```

------

getParticipant
--------------
Get the name of the participant from a message object.
This method figures out what the username of the person being talked to is.

### Parameters

| Parameter | Type          | Description                                |
| --------- | ------------- | ------------------------------------------ |
| message   | Object        | The object for the message.                |
| callback  | Function      | The callback that will be called when done |


------

inbox
-----

Get the messages from the inbox.
This method returns a flattened set of messages to simplify rendering.

**Parameters**

**callback**:  *Function*,  


