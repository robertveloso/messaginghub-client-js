'use strict';

import net from 'net';
import Promise from 'bluebird';
import Lime from 'lime-js';
import {Sessions, Commands, Messages, Notifications} from './TestEnvelopes';

export default class TcpLimeServer {

    constructor() {
        this._server = net.createServer(this._onConnection.bind(this));
        this._connections = [];

        this.listen = Promise.promisify(this._server.listen, {context: this._server});
        this.close = Promise.promisify(this._server.close, {context: this._server});
    }

    broadcast(envelope) {
        this._connections = this._connections.filter((socket) => {
            if(!socket.remoteAddress) {
                return false;
            }
            socket.writeJSON(envelope);
            return true;
        });
    }

    _onConnection(socket) {
        socket.writeJSON = (json) => socket.write(JSON.stringify(json));

        this._connections.push(socket);

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
    }
}
