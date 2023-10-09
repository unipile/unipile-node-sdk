import { InvalidDomainError, InvalidProtocolError, InvalidTokenError } from './errors/index.js';
import { ApiVersion, ClientInstantiationOptions, SupportedProtocols } from './types/index.js';

const DEFAULT_API_VERSION = 'v1';
const DEFAULT_LOG_REQUEST_RESULT = false;
const DEFAULT_LOG_REQUEST_PAYLOAD = false;
const DEFAULT_VALIDATE_REQUEST_PAYLOAD = false;

export class ClientState {
  private _baseUrl: string;
  private _token: string;
  private _protocol: string;
  private _domain: string;

  public readonly apiVersion: ApiVersion;
  public readonly logRequestResult: boolean;
  public readonly logRequestPayload: boolean;
  public readonly validateRequestPayload: boolean;

  constructor(baseUrl: string, token: string, options: ClientInstantiationOptions) {
    this._baseUrl = baseUrl;
    this._token = token;

    const [protocol, domain] = baseUrl.split('://');
    this._protocol = protocol;
    this._domain = domain;
    this.apiVersion = options.apiVersion ?? DEFAULT_API_VERSION;
    this.logRequestResult = options.logRequestResult ?? DEFAULT_LOG_REQUEST_RESULT;
    this.logRequestPayload = options.logRequestPayload ?? DEFAULT_LOG_REQUEST_PAYLOAD;
    this.validateRequestPayload = options.validateRequestPayload ?? DEFAULT_VALIDATE_REQUEST_PAYLOAD;
  }

  get token(): string {
    if (this._token === '') throw new InvalidTokenError();
    return this._token;
  }

  get protocol(): SupportedProtocols {
    if (this._protocol === 'http') return 'http';
    else if (this._protocol === 'https') return 'https';
    else throw new InvalidProtocolError(this._baseUrl);
  }

  get domain(): string {
    if (!this._domain) throw new InvalidDomainError(this._baseUrl);
    return this._domain;
  }
}
