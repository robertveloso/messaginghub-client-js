'use strict';

import net from 'net';
import {Lime} from 'lime-js';
import {Sessions, Commands, Messages, Notifications} from './TestEnvelopes';

export default net.createServer((socket) => {

    socket.writeJSON = (json) => socket.write(JSON.stringify(json));

    socket.on('data', (data) => {
        let envelope = JSON.parse(data);

        // Session
        if(Lime.Envelope.isSession(envelope)) {
            switch(envelope.state) {
            case 'new':
                socket.writeJSON(Sessions.authenticating);
                break;
            case 'authenticating':
                socket.writeJSON(Sessions.established);
            }
        }
        // Command
        else if(Lime.Envelope.isCommand(envelope)) {
            switch(envelope.uri) {
            case '/ping':
                socket.writeJSON(Commands.pingResponse(envelope));
                break;
            }
        }
        // Message
        else if(Lime.Envelope.isMessage(envelope)) {
            switch(envelope.content) {
            case 'ping':
                socket.writeJSON(Messages.pong);
                break;
            }
        }
        // Notification
        else if(Lime.Envelope.isNotification(envelope)) {
            switch(envelope.event) {
            case 'ping':
                socket.writeJSON(Notifications.pong);
                break;
            }
        }
    });
});
