import Lime from 'lime-js';
import base64 from 'base64-js';

const identity = (x) => x;

export default class MessagingHubClient {

    get uri() { return this._uri; }

    // MessagingHubClient :: String -> Transport? -> MessagingHubClient
    constructor(uri, transport) {
        this._uri = uri;
        this._transport = transport;
        this._clientChannel = new Lime.ClientChannel(this._transport);

        this.messageReceivers = {};
        this.notificationReceivers = {};
        this.commandReceivers = {};

        this._clientChannel.onMessage = (m) => (this.messageReceivers[m.type] || []).map((f) => f(m));
        this._clientChannel.onNotification = (n) => (this.notificationReceivers[n.event] || []).map((f) => f(n));
        this._clientChannel.onCommand = (c) => (this.commandReceivers[c.id] || identity)(c);
    }

    // connect :: String -> String -> Promise Session
    connect(user, password) {
        return this._transport
            .open(this.uri)
            .then(() => {
                let authentication;
                if(password) {
                    authentication = new Lime.PlainAuthentication();
                    authentication.password = base64.fromByteArray(password);
                } else {
                    authentication = new Lime.GuestAuthentication();
                }
                return this._clientChannel.establishSession(Lime.SessionEncryption.NONE, Lime.SessionCompression.NONE, user, authentication, '');
            });
    }

    // close :: Promise ()
    close() {
        return this._transport.close();
    }

    // sendMessage :: Message -> ()
    sendMessage(message) {
        this._clientChannel.sendMessage(message);
    }

    // sendNotification :: Notification -> ()
    sendNotification(notification) {
        this._clientChannel.sendNotification(notification);
    }

    // sendCommand :: Command -> Promise Command
    sendCommand(command) {
        this._clientChannel.sendCommand(command);
        return new Promise((resolve) => {
            this.commandReceivers[command.id] = (c) => {
                resolve(c);
                delete this.commandReceivers[command.id];
            };
        });
    }

    // addMessageReceiver :: String -> (Message -> ()) -> Function
    addMessageReceiver(type, receiver) {
        this.messageReceivers[type] = this.messageReceivers[type] || [];
        this.messageReceivers[type].push(receiver);
        return () => this.messageReceivers[type] = this.messageReceivers[type].filter((r) => r !== receiver);
    }

    // addNotificationReceiver :: String -> (Notification -> ()) -> Function
    addNotificationReceiver(event, receiver) {
        this.notificationReceivers[event] = this.notificationReceivers[event] || [];
        this.notificationReceivers[event].push(receiver);
        return () => this.notificationReceivers[event] = this.notificationReceivers[event].filter((r) => r !== receiver);
    }
}
