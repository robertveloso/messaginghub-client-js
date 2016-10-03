import Lime from 'lime-js';
import uuid from 'uuid';

/* istanbul ignore next */
export default class Application {
    constructor() {
        // Default values
        this.identifier = uuid.v4();
        this.compression = Lime.SessionCompression.NONE;
        this.encryption = Lime.SessionEncryption.NONE;
        this.instance = 'default';
        this.domain = 'msging.net';
        this.scheme = 'wss';
        this.hostName = 'msging.net';
        this.port = 8081;
        this.presence = {
            status: 'available',
            routingRule: 'identity'
        };
        this.authentication = new Lime.GuestAuthentication();
    }
}
