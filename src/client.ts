import { RequestSender } from './request-sender.js';
import { AccountResource } from './resources/account.resource.js';
import { MessagingResource } from './resources/messaging.resource.js';
import { ClientState } from './state.js';
import { ClientInstantiationOptions } from './types/client.js';

export class UnipileClient {
  private state: ClientState;
  public request: RequestSender;

  //resources
  public account = new AccountResource(this);
  public messaging = new MessagingResource(this);

  constructor(baseUrl: string, token: string, options?: ClientInstantiationOptions) {
    this.state = new ClientState(baseUrl, token, options ?? {});
    this.request = new RequestSender(this.state);
  }
}
