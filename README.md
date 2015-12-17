[![bitHound Overall Score](https://www.bithound.io/github/takenet/messaginghub-client-js/badges/score.svg)](https://www.bithound.io/github/takenet/messaginghub-client-js)    

> Simple [Messaging Hub](http://msging.net/) client for JavaScript

**This is a work in progress**

# How to use?

**First instance ...**

```javascript
var client = new MessagingHubClient(uri);
```

**Register your callbacks ...**

```javascript
client.onMessageReceived("application/json", function(message) {
  // do something
});

client.onNotificationReceived(function(notification) {
  // show something
});
```

**Connect ...**

```javascript
client.connect(user, password, onConnect);
```

**And send message ...**

```javascript
function onConnect(session, err) {
  // send a message to some user
  var msg = { type: "application/json", message: "Hello, world" };
  client.sendMessage(msg, "ipsum@dolor.sit", function(err) {
    // if !err, message sent!
  });
}
```
