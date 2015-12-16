# MessageHub SDK for Javascript

Simple [Messaging Hub](http://msging.net/) client.

All you need is:

**For connect**

```javascript
var client = new MessageHubClient(/*you can pass uri here*/);
client.connect(user, pass)
  .then(function(receiversRegister) {
      /*register what you want to lister?*/
  })
  .catch(function(error) {
      /*Samething is wrong :(*/
  })
```

**For Listener**

```javascript
var myListenerForJson = function() {
    return  {
        accept: 'json',
        onReceive: function(message) {
          /*Do samething :)*/
        }
    }
}

// on ´connect´ callback ...
receiversRegister.addReceiver(myListenerForJson);
```
