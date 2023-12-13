import { SupportedProvider } from '../client.js';

export type GetAccountsInput = {
  limit?: number;
  cursor?: string;
};

/** ConnectAccountInput */
export type ConnectAccountInput = {
  provider: SupportedProvider;
  username?: string;
  password?: string;
  proxy?: ProxyParams;
  access_token?: string;
};

/** ReconnectAccountInput */
export type ReconnectAccountInput = ConnectAccountInput & { account_id: string };

/** PostLinkedinAccountInput */
type ProxyParams = {
  protocol?: 'https' | 'http' | 'socks5';
  port: number;
  host: string;
  username?: string;
  password?: string;
};

type LinkedinBasicAuthentication = {
  username: string;
  password: string;
  proxy?: ProxyParams;
};

type LinkedinCookieAuthentication = {
  access_token: string;
  proxy?: ProxyParams;
};

export type PostLinkedinAccountInput = LinkedinBasicAuthentication | LinkedinCookieAuthentication;

/** PostInstagramAccountInput */
export type PostInstagramAccountInput = {
  username: string;
  password: string;
};

/** PostMessengerAccountInput */
export type PostMessengerAccountInput = {
  username: string;
  password: string;
};

/** PostCodeCheckpointInput */
type ProviderUsingCodeCheckpoint = 'LINKEDIN' | 'INSTAGRAM';

export type PostCodeCheckpointInput = {
  provider: ProviderUsingCodeCheckpoint;
  account_id: string;
  code: string;
};

/** PostHostedAuthLinkInput */

type HostedAuthConnectionLinkInput = {
  type: 'create';
  expiresOn: string;
  api_url: string;
  providers: '*' | Array<SupportedProvider>;
  name?: string;
  success_redirect_url?: string;
  failure_redirect_url?: string;
  notify_url?: string;
};

type HostedAuthReconnectionLinkInput = {
  type: 'reconnect';
  expiresOn: string;
  api_url: string;
  reconnect_account: string;
  name?: string;
  success_redirect_url?: string;
  failure_redirect_url?: string;
  notify_url?: string;
};

export type PostHostedAuthLinkInput = HostedAuthConnectionLinkInput | HostedAuthReconnectionLinkInput;
