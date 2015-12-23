import {Lime} from 'lime-js';

export default class MessagingHubClient {

    get uri() { return this._uri; }

    // MessagingHubClient :: String -> Transport? -> MessagingHubClient
    constructor(uri, transport = new Lime.WebSocketTransport(true)) {
        this._uri = uri;
        this._transport = transport;
        this._clientChannel = new Lime.ClientChannel(this._transport);

        this.messageReceivers = {};
        this.notificationReceivers = {};
        this.commandReceivers = {};

        this._clientChannel.onMessage = (m) => (this.messageReceivers[m.type] || []).map((f) => f(m));
        this._clientChannel.onNotification = (n) => (this.notificationReceivers[n.event] || []).map((f) => f(n));
        this._clientChannel.onCommand = (c) => (this.commandReceivers[c.id] || ((x) => x))(c);
    }

    // connect :: String -> String -> (Error -> Session -> ()) -> ()
    connect(user, password, callback) {
        this._transport.onOpen = () => {
            let authentication = new Lime.GuestAuthentication();
            Lime.ClientChannelExtensions.establishSession(this._clientChannel, 'none', 'none', user, authentication, '', callback);
        };
        this._transport.open(this.uri);
    }

    // sendMessage :: Message -> ()
    sendMessage(message) {
        this._clientChannel.sendMessage(message);
    }

    // sendNotification :: Notification -> ()
    sendNotification(notification) {
        this._clientChannel.sendNotification(notification);
    }

    // sendCommand :: Command -> (Command -> ()) -> ()
    sendCommand(command, callback) {
        if(callback) {
            this.commandReceivers[command.id] = (c) => {
                callback(c);
                delete this.commandReceivers[command.id];
            };
        }
        this._clientChannel.sendCommand(command);
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
