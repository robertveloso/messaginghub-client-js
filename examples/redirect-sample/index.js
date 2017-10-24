/* eslint-disable no-console */
'use strict';

let Lime = require('lime-js');
let WebSocketTransport = require('lime-transport-websocket');
let MessagingHub = require('messaginghub-client');

// These are the MessagingHub credentials for this bot.
// If you want to create your own bot, see http://blip.ai
const IDENTIFIER = 'automaticbota1';
const ACCESS_KEY = 'cUYxSDNQTnpVckNjTDRzVEg3WWQ=';

// instantiate and setup client
let client = new MessagingHub.ClientBuilder()
    .withIdentifier(IDENTIFIER)
    .withAccessKey(ACCESS_KEY)
    .withTransportFactory(() => new WebSocketTransport())
    .build();

client.addMessageReceiver((m) => m.type === 'application/json', (m) => {
    console.log('Receiver 1 - Handle choices');
    console.log(m);

    if (m.content.attendance === 'automatic') {
        console.log('automatic');
        registerAction({ category: 'Attendance', action: 'automatic' });

        let message = {
            id: Lime.Guid(),
            to: m.from,
            type: 'application/vnd.lime.collection+json',
            content: {
                'itemType': 'application/vnd.lime.document-select+json',
                'items': [
                    {
                        'header': {
                            'type': 'application/vnd.lime.media-link+json',
                            'value': {
                                'title': 'Sobre',
                                'text': 'Saiba mais sobre um bot híbrido (automático + manual)',
                                'type': 'image/jpeg',
                                'uri': 'http://marciananamarketing.com.br/wp-content/uploads/2016/08/banner_img_-4-400x250.jpg'
                            }
                        },
                        'options': [
                            {
                                'label': {
                                    'type': 'application/vnd.lime.web-link+json',
                                    'value': {
                                        'title': 'Empresa',
                                        'uri': 'https://take.net'
                                    }
                                }
                            },
                            {
                                'label': {
                                    'type': 'application/vnd.lime.web-link+json',
                                    'value': {
                                        'title': 'Plataforma usada',
                                        'uri': 'https://blip.ai'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        'header': {
                            'type': 'application/vnd.lime.media-link+json',
                            'value': {
                                'title': 'Serviços',
                                'text': 'Veja meus serviços principais',
                                'type': 'image/jpeg',
                                'uri': 'https://www.ca.com/content/dam/ca/us/images/services-support/services-support-asset-achieve-business-it-goals-ebook.jpg'
                            }
                        },
                        'options': [
                            {
                                'label': {
                                    'type': 'text/plain',
                                    'value': 'Atendimento automático'
                                },
                                'value': {
                                    'type': 'application/json',
                                    'value': {
                                        'attendance': 'automatic'
                                    }
                                }
                            },
                            {
                                'label': {
                                    'type': 'text/plain',
                                    'value': 'Atendimento manual'
                                },
                                'value': {
                                    'type': 'application/json',
                                    'value': {
                                        'attendance': 'manual'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        'header': {
                            'type': 'application/vnd.lime.media-link+json',
                            'value': {
                                'title': 'Voltar',
                                'text': 'Voltar ao menu principal',
                                'type': 'image/jpeg',
                                'uri': 'http://www.agilesolucoes.com.br/files/uploads/images/Imagem-Voltar.png'
                            }
                        },
                        'options': [
                            {
                                'label': {
                                    'type': 'text/plain',
                                    'value': 'Voltar'
                                },
                                'value': {
                                    'type': 'text/plain',
                                    'value': 'Voltar'
                                }
                            }
                        ]
                    }
                ]
            }
        };

        client.sendMessage(message);

    } else {
        console.log('manual');
        registerAction({ category: 'Attendance', action: 'manual' });

        let command = {
            id: Lime.Guid(),
            to: m.from,
            type: 'application/vnd.lime.redirect+json',
            content: {
                address: 'manualbota2@msging.net',
                context: {
                    'type': 'text/plain',
                    'value': 'New manual attendance'
                }
            }
        };

        client.sendCommand(command);
    }

    return true;
});

client.addMessageReceiver(() => true, (m) => {
    console.log('Receiver 2 - Any other thing');
    console.log(`<< ${m.from}: ${m.content}`);

    if (m.type !== 'text/plain') return;

    let message = {
        id: Lime.Guid(),
        to: m.from,
        type: 'application/vnd.lime.select+json',
        content: {
            text: 'Olá ${contact.name} 🙂, eu sou um bot de teste de redirecionamento. \n\n Meu objetivo é mostrar como é possível unir bots de atendimento automático e bots de atendimento manual humanizado. \n\n Escolha sua opção preferida, clicando em um dos botões abaixo 👇.',
            options: [
                {
                    order: 1,
                    text: 'Atendimento automático',
                    type: 'application/json',
                    value: {
                        'attendance': 'automatic'
                    }
                },
                {
                    order: 2,
                    text: 'Atendimento humano',
                    type: 'application/json',
                    value: {
                        'attendance': 'manual'
                    }
                }
            ]
        },
        metadata: {
            '#message.replaceVariables': 'true'
        }
    };

    console.log(`>> ${message.to}: ${message.content}`);

    client.sendMessage(message);
});

// connect to the MessagingHub server
client.connect()
    .then(() => console.log('Listening...'))
    .catch((err) => console.error(err));

// analytics helper functions
function registerAction(resource) {
    return client.sendCommand({
        id: Lime.Guid(),
        method: Lime.CommandMethod.SET,
        type: 'application/vnd.iris.eventTrack+json',
        uri: '/event-track',
        resource: resource
    })
        .catch(e => console.log(e));
}