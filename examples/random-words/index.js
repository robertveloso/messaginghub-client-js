/* eslint-disable no-console */
'use strict';

let Lime = require('lime-js');
let WebSocketTransport = require('lime-transport-websocket');
let MessagingHubClient = require('messaginghub-client');
let request = require('request-promise');

const URI = (process.env.NODE_ENV === 'production') ? 'ws://msging.net:8081' : 'ws://hmg.msging.net:8081';

const IDENTIFIER = 'randomwords';
const ACCESS_KEY = 'STlpSk1Zdnd1RVBRbENVMGY4d3U=';

const API_ENDPOINT = 'http://randomword.setgetgo.com/get.php';

// instantiate and setup client
let client = new MessagingHubClient(URI, new WebSocketTransport());

client.addMessageReceiver(null, (m) => {
    if (m.type !== 'text/plain') return;

    console.info(`<< ${m.from}: ${m.content}`);

    // consumed notification
    client.sendNotification({
        id: m.id,
        to: m.from,
        event: Lime.NotificationEvent.CONSUMED
    });

    // 50% chance of denying the request
    if (Math.random() < 0.5) {
        console.info(`!> No, ${m.from}!`);
        return;
    }

    // answer with a random word
    request
        .get(API_ENDPOINT)
        .then((res) => {
            let message = {
                id: Lime.Guid(),
                type: 'text/plain',
                content: res,
                to: m.from
            };
            console.info(`>> ${message.to}: ${message.content}`);
            client.sendMessage(message);
        })
        .catch((err) => console.error(err));
});

// connect client
client.connectWithKey(IDENTIFIER, ACCESS_KEY)
    .then(() => console.log('Listening...'))
    .catch((err) => console.error(err));
