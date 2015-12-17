export class ClientChannel {}
export class Message {}
export class Notification {}
export class Command {}
export class Session {}

interface IReceiverCallback<T> {
  (response: T): void;
}

interface ICallback<T> {
  (error: Error, response: T): void;
}

export class MessagingHubClient {

  private uri: string;
  private messageReceivers:  { [type: string]: IReceiverCallback<Message> };
  private notificationReceivers: { [event: string]: IReceiverCallback<Notification> };

  private clientChannel: ClientChannel;

  constructor(uri: string) {
    this.uri = uri;
  }

  connect(user: string, password: string, callback: ICallback<Session>): void {
    // TODO: implement MessagingHubClient.connect
  }

  sendMessage(message: Message, callback: ICallback<Error>) {
    // TODO: implement MessagingHubClient.sendMessage
  }
  sendNotification(notification: Notification, callback: ICallback<Error>) {
    // TODO: implement MessagingHubClient.sendNotification
  }
  sendCommand(command: Command, callback: ICallback<Error>) {
    // TODO: implement MessagingHubClient.sendCommand
  }

  onMessageReceived(type: string, receiver: IReceiverCallback<Message>) {
    this.messageReceivers[type] = receiver;
  }
  onNotificationReceived(event: string, receiver: IReceiverCallback<Notification>) {
    this.notificationReceivers[event] = receiver;
  }
}
