'use strict';

import net from 'net';
import {Lime} from 'lime-js';

var logger = console.debug || console.log; // eslint-disable-line no-console

export default class TcpTransport {

    constructor(traceEnabled) {
        this._traceEnabled = traceEnabled;
        this._socket = new net.Socket();
        this._socket.on('close', this.onClose);
        this._socket.on('data', (e) => {
            if (this._traceEnabled) {
                logger('TcpTransport RECEIVE: ' + e);
            }
            this.onEnvelope(JSON.parse(e));
        });
    }

    send(envelope) {
        var envelopeString = JSON.stringify(envelope);
        this._socket.write(envelopeString);
        if (this._traceEnabled) {
            logger('TcpTransport SEND: ' + envelopeString);
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
