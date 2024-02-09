export type SupportedProtocols = 'http' | 'https';
export type ApiVersion = 'v1' | 'v2';
export type SupportedProvider = 'LINKEDIN' | 'WHATSAPP' | 'INSTAGRAM' | 'MESSENGER' | 'TELEGRAM' | 'TWITTER';

export type ClientOptions = {
  apiVersion: ApiVersion;
  logRequestResult: boolean;
  logRequestPayload: boolean;
  validateRequestPayload: boolean;
};

export type ClientInstantiationOptions = Partial<ClientOptions>;
