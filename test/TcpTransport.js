"use strict";

import net from 'net';
import Lime from 'lime-js';

export class TcpTransport {

    constructor(traceEnabled) {
        this._traceEnabled = traceEnabled;
        this._socket = new net.Socket();
        this._socket.on('close', this.onClose);
        this._socket.on('data', (e) => {
            if (this._traceEnabled) {
                console.debug("TcpTransport RECEIVE: " + e.data);
            }
            this.onEnvelope(JSON.parse(e.data));
        });
    }

    send (envelope) {
        var envelopeString = JSON.stringify(envelope);
        this._socket.write(envelopeString);
        if (this.traceEnabled) {
            console.debug("TcpTransport SEND: " + envelopeString);
        }
    }

    onEnvelope (envelope) { }

    open (uri) {
        this.encryption = Lime.SessionEncryption.none;
        this.compression = Lime.SessionCompression.none;
        this._socket.connect(uri, this.onOpen);
    }

    close () {
        this._socket.end();
    }

    getSupportedCompression () {
        throw new Error("Compression change is not supported");
    }

    getSupportedEncryption () { }

    setCompression (compression) {
        throw new Error("Encryption change is not supported");
    }

    setEncryption (encryption) { }

    onOpen () { }

    onClose () { }

    onError (error) { }
}
