import { RequestSender } from './request-sender.js';
import { AccountResource } from './resources/account.resource.js';
import { EmailResource } from './resources/email.resource.js';
import { MessagingResource } from './resources/messaging.resource.js';
import { UsersResource } from './resources/users.resource.js';
import { ClientState } from './state.js';
import { ClientInstantiationOptions } from './types/client.js';

export class UnipileClient {
  private state: ClientState;
  public request: RequestSender;

  //resources
  public account = new AccountResource(this);
  public messaging = new MessagingResource(this);
  public users = new UsersResource(this);
  public email = new EmailResource(this);

  constructor(baseUrl: string, token: string, options?: ClientInstantiationOptions) {
    this.state = new ClientState(baseUrl, token, options ?? {});
    this.request = new RequestSender(this.state);
  }
}
