/* eslint-disable no-console */
'use strict';

let Lime = require('lime-js');
let WebSocketTransport = require('lime-transport-websocket');
let MessagingHub = require('../../dist/messaginghub-client.js');
let request = require('request-promise');

// These are the MessagingHub credentials for this bot.
// If you want to create your own bot, see http://blip.ai
const IDENTIFIER = 'randomwords';
const ACCESS_KEY = 'aklFSmllSER1b25VakRKOXp3eFE=';
const API_ENDPOINT = 'http://randomword.setgetgo.com/get.php';

// instantiate and setup client
let client = new MessagingHub.ClientBuilder()
    .withIdentifier(IDENTIFIER)
    .withAccessKey(ACCESS_KEY)
    .withScheme('ws')
    .build();
    
client.addMessageReceiver(() => true, (m) => {
    if (m.type !== 'text/plain') return;

    console.log(`<< ${m.from}: ${m.content}`);

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
client.connect()
    .then(() => console.log('Listening...'))
    .catch((err) => console.error(err));
