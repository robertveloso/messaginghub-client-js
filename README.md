**This is a work in progress**

|||
|-----------------------------------------------------------------------|-----------------|
|[![bitHound Overall Score](https://www.bithound.io/github/takenet/messaginghub-client-js/badges/score.svg)](https://www.bithound.io/github/takenet/messaginghub-client-js) | [![Codeship Status for takenet/messaginghub-client-js](https://codeship.com/projects/1043f7b0-80e0-0133-5021-02612484d25d/status?branch=master)](https://codeship.com/projects/121068)|

> Simple [Messaging Hub](http://msging.net/) client for JavaScript

# How to use

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
  var msg = { type: "application/json", content: "Hello, world", to: "my@friend.com" };
  client.sendMessage(msg, function(err) {
    // if !err, message sent!
  });
}
```
