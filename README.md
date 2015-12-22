**This is a work in progress**

Simple Messaging Hub client for JavaScript

[![bitHound Overall Score](https://www.bithound.io/github/takenet/messaginghub-client-js/badges/score.svg)](https://www.bithound.io/github/takenet/messaginghub-client-js)
[![npm version](https://img.shields.io/npm/v/messaginghub-client.svg?style=flat-square)](https://www.npmjs.com/package/messaginhub-client)
[![npm downloads](https://img.shields.io/npm/dm/messaginghub-client.svg?style=flat-square)](https://www.npmjs.com/package/messaginghub-client) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square)](https://gitter.im/takenet/messaginghub-client-js)
[![Travis branch](https://img.shields.io/travis/rust-lang/rust/master.svg?style=flat-square)](https://travis-ci.org/takenet/messaginghub-client-js)
[![huBoard](https://img.shields.io/badge/board-tasks-green.svg?style=flat-square)](https://huboard.com/takenet/messaginghub-client-js/#/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

See more about Messaging Hub [here](http://msging.net/)

# How to use

**First instance ...**

```javascript
var client = new MessagingHubClient();
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
