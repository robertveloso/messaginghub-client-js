# messaging-hub-client-js
> Simple [Messaging Hub](http://msging.net/) client for JavaScript

**This is a work in progress**

## Connecting

```javascript
var client = new MessagingHubClient(uri);

client.onMessageReceived('text/json', myJsonListener);
client.onMessageReceived('application/pdf', function(message) {
  // do something
  client.sendMessage({ content: "Thank you for the PDF file!", to: message.from });
});

client.onNotificationReceived('connected', myConnectedNotificationListener);

client.connect(user, password, function(err, session) {
  // send a message to some user
  var msg = {
    type: "text/plain",
    to: "ipsum@dolor.sit",
    content: "Hello, world!"
  };
  client.sendMessage(msg, function(err) {
    // treat possible error
  });
});
```
