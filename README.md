# MessageHub SDK for Javascript

Simple [Messaging Hub](http://msging.net/) client.

All you need is:

**Prepare**

```javascript
var MessagingHubClient = require('messaginghub-client');
var client = new MessagingHubClient();
```

**For connect**

```javascript
client.connect(user, pass)
  .then(function(hubRegisters) {
      /*register what you want to lister?*/
  })
  .catch(function(error) {
      /*Samething is wrong :(*/
  })
```

**For Listener**

```javascript
var myListenerForJson = {
        accept: 'json',
        onReceive: function(message) {
          /*Do samething :)*/
        }
    }
}

// on client ´connect´ callback ...
hubRegisters.addReceiver(myListenerForJson);
```

**For Send**

```javascript
var mySenderForJson = {
        accept: 'json',
        send: function(message, to) {
          /*Send samething :)*/
        }
        // ... see in docs others options
    }
}

// on client ´connect´ callback ...
hubRegisters.addSender(mySenderForJson);
```
