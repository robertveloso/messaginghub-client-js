import net = require('net');
import Lime = require('lime-js');

export class TcpTransport implements Lime.Transport {
    private traceEnabled: boolean;
    socket: net.Socket;

    constructor(traceEnabled: boolean) {
        this.traceEnabled = traceEnabled;
        this.socket = new net.Socket();

        this.socket.on('close', this.onClose);
        this.socket.on('data', (e) => {
            if (this.traceEnabled) {
                console.debug(`TcpTransport RECEIVE: ${e.data}`);
            }
            this.onEnvelope(<Lime.Envelope>JSON.parse(e.data));
        });
    }

    send(envelope: Lime.Envelope) {
        const envelopeString = JSON.stringify(envelope);
        this.socket.write(envelopeString);
        if (this.traceEnabled) {
            console.debug(`TcpTransport SEND: ${envelopeString}`);
        }
    }

    onEnvelope(envelope: Lime.Envelope) {}

    open(uri: string) {
        this.encryption = Lime.SessionEncryption.none;
        this.compression = Lime.SessionCompression.none;
        this.socket.connect(uri, this.onOpen);
    }

    close() {
        this.socket.end();
    }

    getSupportedCompression(): string[] {
        throw new Error("Compression change is not supported");
    }
    setCompression(compression: string) {}
    compression: string;

    getSupportedEncryption(): string[] {
        throw new Error("Encryption change is not supported");
    }
    setEncryption(encryption: string) {}
    encryption: string;

    onOpen(): void {}
    onClose(): void {}
    onError(error: Error) {}
}
