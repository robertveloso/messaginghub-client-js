'use strict';

import {net} from 'net';
import {Lime} from 'lime-js';

console.debug = console.debug || console.log; // eslint-disable-line no-console

export default class TcpTransport {

    constructor(traceEnabled) {
        this._traceEnabled = traceEnabled;
        this._socket = new net.Socket();
        this._socket.on('close', this.onClose);
        this._socket.on('data', (e) => {
            if (this._traceEnabled) {
                console.debug('TcpTransport RECEIVE: ' + e); // eslint-disable-line no-console
            }
            this.onEnvelope(JSON.parse(e));
        });
    }

    send(envelope) {
        var envelopeString = JSON.stringify(envelope);
        this._socket.write(envelopeString);
        if (this._traceEnabled) {
            console.debug('TcpTransport SEND: ' + envelopeString); // eslint-disable-line no-console
        }
    }

    onEnvelope() { }

    open(uri) {
        var host = uri.split(':');
        this.encryption = Lime.SessionEncryption.none;
        this.compression = Lime.SessionCompression.none;
        this._socket.connect(host[1], host[0], this.onOpen);
    }

    close() {
        this._socket.end();
    }

    getSupportedCompression() {
        throw new Error('Compression change is not supported');
    }

    getSupportedEncryption() {
        throw new Error('Encryption change is not supported');
    }

    setCompression() {}

    setEncryption() {}

    onOpen() {}

    onClose() {}

    onError() {}
}
