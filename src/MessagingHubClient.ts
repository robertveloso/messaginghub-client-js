class MessagingHubClient {
  private _uri : string;
  get URI(): string {
      return this._uri;
  }
  constructor (uri : string) {
    this._uri = uri;
  }
  connect() : any {
    undefined;
  }
}
