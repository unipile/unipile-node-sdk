export type GetAccountsInput = {
  limit?: number;
  cursor?: string;
};

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

/** PostCodeCheckpointInput */
type ProviderUsingCodeCheckpoint = 'LINKEDIN'; // union

export type PostCodeCheckpointInput = {
  provider: ProviderUsingCodeCheckpoint;
  account_id: string;
  code: string;
};

/** PostHostedAuthLinkInput */
type ProviderUsingHostedAuth = 'LINKEDIN' | 'WHATSAPP';

export type PostHostedAuthLinkInput = {
  providers: '*' | Array<ProviderUsingHostedAuth>;
  expiresOn: string;
};
