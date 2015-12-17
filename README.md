# messaging-hub-client-js

> Simple [Messaging Hub](http://msging.net/) client for JavaScript

**This is a work in progress**

## Connecting

```javascript
var client = new MessagingHubClient(uri);

client.onMessageReceived('text/json', myJsonListener);
client.onMessageReceived('application/pdf', function(message) {
  // do something
  client.sendMessage("Thank you for the PDF file!", message.from);
});

client.onNotificationReceived(myNotificationListener);

client.connect(user, password, function(session, err) {
  // send a message to some user
  client.sendMessage("Hello, world", "ipsum@dolor.sit", function(err) {
    // treat possible error
  });
});
```
