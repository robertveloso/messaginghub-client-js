'use strict';

import net from 'net';

export default net.createServer((socket) => {
    socket.on('data', (data) => {
        let envelope = JSON.parse(data);
        // envelope.state? ==> is session
        if(envelope.hasOwnProperty('state')) {
            switch(envelope.state) {
            case 'new':
                socket.write(JSON.stringify({
                    id: '0',
                    from: '127.0.0.1:8124',
                    state: 'authenticating'
                }));
                break;
            case 'authenticating':
                socket.write(JSON.stringify({
                    id: '0',
                    from: '127.0.0.1:8124',
                    state: 'established'
                }));
            }
        }
        // envelope.method? ==> is command
        else if(envelope.hasOwnProperty('method')) {
            if(envelope.uri === '/ping') {
                socket.write(JSON.stringify({
                    id: envelope.id,
                    method: 'get',
                    status: 'success'
                }));
            }
        }
        // envelope.content? ==> is message
        else if(envelope.hasOwnProperty('content')) {
            if(envelope.content === 'ping') {
                socket.write(JSON.stringify({
                    type: 'text/plain',
                    content: 'pong'
                }));
            }
        }
        // envelope.event? ==> is notification
        else if(envelope.hasOwnProperty('event')) {
            if(envelope.event === 'ping') {
                socket.write(JSON.stringify({
                    event: 'pong'
                }));
            }
        }
    });
});
