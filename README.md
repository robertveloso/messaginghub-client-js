# messaging-hub-client-js
> Simple Messaging Hub client for JavaScript

**This is a work in progress**

[![bitHound Overall Score](https://www.bithound.io/github/takenet/messaginghub-client-js/badges/score.svg)](https://www.bithound.io/github/takenet/messaginghub-client-js)
[![npm version](https://img.shields.io/npm/v/messaginghub-client.svg?style=flat-square)](https://www.npmjs.com/package/messaginghub-client)
[![npm downloads](https://img.shields.io/npm/dm/messaginghub-client.svg?style=flat-square)](https://www.npmjs.com/package/messaginghub-client) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square)](https://gitter.im/takenet/messaginghub-client-js)
[![Travis branch](https://img.shields.io/travis/rust-lang/rust/master.svg?style=flat-square)](https://travis-ci.org/takenet/messaginghub-client-js)
[![huBoard](https://img.shields.io/badge/board-tasks-green.svg?style=flat-square)](https://huboard.com/takenet/messaginghub-client-js/#/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![codecov.io](https://codecov.io/github/takenet/messaginghub-client-js/coverage.svg?branch=develop)](https://codecov.io/github/takenet/messaginghub-client-js?branch=develop)

--------

![codecov.io](https://codecov.io/github/takenet/messaginghub-client-js/branch.svg?branch=develop)

See more about Messaging Hub [here](http://messaginghub.io/)

## How to use

    npm i messaginghub-client

### Instantiate the MessagingHub Client

```javascript
var client = new MessagingHubClient();
```

### Add receivers

```javascript
client.addMessageReceiver("application/json", function(message) {
  // do something
});

client.addNotificationReceiver("message_received", function(notification) {
  // show something
});
```

#### Remove receivers

The client.addMessageReceiver and client.addNotificationReceiver methods return each a function which, when called, cancels the receiver subscription:

```javascript
var removeJsonReceiver = client.addMessageReceiver("application/json", handleJson);
// ...
removeJsonReceiver();
```

### Connect

```javascript
client.connect(user, password, onConnect);
```

### Send messages

```javascript
function onConnect(err, session) {
  // send a message to some user
  var msg = { type: "application/json", content: "Hello, world", to: "my@friend.com" };
  client.sendMessage(msg);
}
```
