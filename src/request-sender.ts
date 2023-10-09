import { TSchema, Static } from '@sinclair/typebox';
import { TypeCheck } from '@sinclair/typebox/compiler';
import { DefaultHeaders, RequestInput, RequestUrl } from './types/request.js';
import { ValidatorMissingError, UnsuccessfulRequestError, InvalidResponseTypeError } from './errors/index.js';
import { ClientState } from './state.js';
import fetch from 'node-fetch';

export class RequestSender {
  private clientState: ClientState;
  private defaultHeaders: DefaultHeaders;

  constructor(state: ClientState) {
    this.clientState = state;
    this.defaultHeaders = {
      'X-API-KEY': this.clientState.token,
      accept: 'application/json',
    };
  }

  public async send<PayloadType>(input: RequestInput): Promise<PayloadType> {
    const options = input.options ?? {};

    const url = this.buildUrl({
      protocol: this.clientState.protocol,
      domain: this.clientState.domain,
      apiVersion: this.clientState.apiVersion,
      path: input.path,
      parameters: input.parameters ?? {},
    });

    const response = await fetch(url, {
      method: input.method,
      headers: Object.assign({}, this.defaultHeaders, input.headers ?? {}),
      body: input.body ? JSON.stringify(input.body) : undefined,
    });

    if (options.logRequestResult ?? this.clientState.logRequestResult)
      console.log(`RequestSender: ${response.status}, ${response.statusText} - ${input.method} ${url}`);

    const bodyType = response.headers.get('content-type');
    let body;
    if (bodyType === 'application/json; charset=utf-8') body = await response.json();
    else body = await response.blob();

    if (options.logRequestPayload ?? this.clientState.logRequestPayload) console.log(body);

    const successfulRequest = response.status >= 200 && response.status < 300;
    const validationActivated = options.validateRequestPayload ?? this.clientState.validateRequestPayload;
    if (successfulRequest && validationActivated) {
      if (input.validator === undefined) throw new ValidatorMissingError();
      return this.validate(body, input.validator) as PayloadType;
    } else if (successfulRequest && !validationActivated) {
      return body as PayloadType;
    } else {
      throw new UnsuccessfulRequestError(body);
    }
  }

  private buildUrl(UrlObject: RequestUrl): string {
    const { protocol, domain, apiVersion, path, parameters } = UrlObject;

    const formattedApiVersion = '/' + apiVersion;

    const formattedPath = path.map((subFolder) => '/' + subFolder).join('');

    let formattedParameters: string;
    if (Object.keys(parameters).length === 0) formattedParameters = '';
    else {
      const parametersEntries = Object.entries(parameters);
      const formattedEntries = parametersEntries.map(([key, value]) => `${key}=${value}`);
      formattedParameters = '?' + formattedEntries.join('&');
    }

    const url = protocol + '://' + domain + '/api' + formattedApiVersion + formattedPath + formattedParameters;

    return url;
  }

  private validate<T extends TSchema>(value: unknown, validator: TypeCheck<T>): Static<T> {
    if (!validator.Check(value)) throw new InvalidResponseTypeError(validator.Errors(value));

    return value;
  }
}
