/* eslint-disable no-console */
'use strict';

let Lime = require('lime-js');
let WebSocketTransport = require('lime-transport-websocket');
let MessagingHubClient = require('messaginghub-client');
let request = require('request-promise');

// These are the MessagingHub credentials for this bot.
// If you want to create your own bot, see http://omni.messaginghub.io.
const IDENTIFIER = 'randomwords';
const ACCESS_KEY = 'STlpSk1Zdnd1RVBRbENVMGY4d3U=';

const MESSAGINGHUB_ENDPOINT = 'ws://msging.net:8081';

const API_ENDPOINT = 'http://randomword.setgetgo.com/get.php';

// instantiate and setup client
let client = new MessagingHubClient(MESSAGINGHUB_ENDPOINT, new WebSocketTransport());

client.addMessageReceiver(() => true, (m) => {
    if (m.type !== 'text/plain') return;

    console.log(`<< ${m.from}: ${m.content}`);

    // consumed notification
    client.sendNotification({
        id: m.id,
        to: m.from,
        event: Lime.NotificationEvent.CONSUMED
    });

    // 50% chance of denying the request
    if (Math.random() < 0.5) {
        console.log(`!> No, ${m.from}!`);
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
            console.log(`>> ${message.to}: ${message.content}`);
            client.sendMessage(message);
        })
        .catch((err) => console.error(err));
});

// connect to the MessagingHub server
client.connectWithKey(IDENTIFIER, ACCESS_KEY)
    .then(() => console.log('Listening...'))
    .catch((err) => console.error(err));
