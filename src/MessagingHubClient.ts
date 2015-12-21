import Lime = require("lime-js");

interface IReceiverCallback<T> {
    (response: T): void;
}

interface ICallback<T> {
    (error: Error, response: T): void;
}

export default class MessagingHubClient {

    private uri: string;
    private transport: Lime.Transport;
    private clientChannel: Lime.ClientChannel;
    private messageReceivers:  { [type: string]: IReceiverCallback<Lime.Message>[] };
    private notificationReceivers: { [event: string]: IReceiverCallback<Lime.Notification>[] };

    constructor(uri : string = "ws:\/\/msging.net:8081") {
        this.uri = uri;
        this.transport = new Lime.WebSocketTransport(true);
        this.clientChannel = new Lime.ClientChannel(this.transport);
        this.clientChannel.onMessage = (m) => (this.messageReceivers[m.type] || []).map((f) => f(m));
        this.clientChannel.onNotification = (n) => (this.notificationReceivers[n.event] || []).map((f) => f(n));
    }

    connect(user: string, password: string, callback: ICallback<Lime.Session>): void {
        this.transport.onOpen = () => {
            let authentication = new Lime.GuestAuthentication();
            Lime.ClientChannelExtensions.establishSession(this.clientChannel, "none", "none", user, authentication, "", callback);
        };
        this.transport.open(this.uri);
    }

    sendMessage(message: Lime.Message, callback: ICallback<Error>) {
        this.clientChannel.sendMessage(message);
    }
    sendNotification(notification: Lime.Notification, callback: ICallback<Error>) {
        this.clientChannel.sendNotification(notification);
    }
    sendCommand(command: Lime.Command, callback: ICallback<Error>) {
        this.clientChannel.sendCommand(command);
    }

    addMessageReceiver(type: string, receiver: IReceiverCallback<Lime.Message>) {
        this.messageReceivers[type].push(receiver);
        return receiver;
    }
    addNotificationReceiver(event: string, receiver: IReceiverCallback<Lime.Notification>) {
        this.notificationReceivers[event].push(receiver);
        return receiver;
    }

    removeMessageReceiver(type: string, receiver: IReceiverCallback<Lime.Message>) {
        return this.messageReceivers[type] = this.messageReceivers[type].filter((r) => r != receiver);
    }
    removeNotificationReceiver(event: string, receiver: IReceiverCallback<Lime.Notification>) {
        return this.notificationReceivers[event] = this.notificationReceivers[event].filter((r) => r != receiver);
    }
}
