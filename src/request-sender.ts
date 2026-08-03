import { TSchema, Static } from '@sinclair/typebox';
import { TypeCheck } from '@sinclair/typebox/compiler';
import { DefaultHeaders, RequestInput, RequestUrl } from './types/request.js';
import { ValidatorMissingError, UnsuccessfulRequestError, InvalidResponseTypeError } from './errors/index.js';
import { ClientState } from './state.js';
import { ClientOptions } from './types/client.js';

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

    // console.log('url', url, {
    //   protocol: this.clientState.protocol,
    //   domain: this.clientState.domain,
    //   apiVersion: this.clientState.apiVersion,
    //   path: input.path,
    //   parameters: input.parameters ?? {},
    // });
    let parsedBody;
    if (input.body !== undefined && input.headers?.['Content-Type'] === 'application/json')
      parsedBody = JSON.stringify(input.body);
    else parsedBody = input.body || undefined;

    const response = await fetch(url, {
      method: input.method,
      headers: Object.assign({}, this.defaultHeaders, input.headers ?? {}),
      body: parsedBody as any,
    });

    if (options.logRequestResult ?? this.clientState.logRequestResult)
      console.log('RequestSender:', response.status, response.statusText, '-', input.method, url);

    const bodyType = response.headers.get('content-type');
    let body;
    if (bodyType?.includes('application/json')) {
      body = await response.json();
    } else {
      body = await response.blob();
    }

    if (options.logRequestPayload ?? this.clientState.logRequestPayload) {
      console.log(body);
      //   console.log(JSON.stringify({ bodyType, body }, null, 2));
    }

    const successfulRequest = response.status >= 200 && response.status < 300;
    const validationActivated = options.validateRequestPayload ?? this.clientState.validateRequestPayload;
    const validationLevel = options.validateRequestPayloadLevel ?? this.clientState.validateRequestPayloadLevel;
    if (successfulRequest && validationActivated) {
      if (input.validator === undefined) throw new ValidatorMissingError();
      return this.validate(body, input.validator, validationLevel) as PayloadType;
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
      /**
       * @todo Check if we need to something about + signs ?
       *       cf. https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#preserving_plus_signs
       */
      formattedParameters = '?' + new URLSearchParams(parameters).toString();
    }

    const url = protocol + '://' + domain + '/api' + formattedApiVersion + formattedPath + formattedParameters;

    return url;
  }

  private validate<T extends TSchema>(
    value: unknown,
    validator: TypeCheck<T>,
    level: ClientOptions['validateRequestPayloadLevel'],
  ): Static<T> {
    if (!validator.Check(value)) {
      switch (level) {
        case 'warn': {
          const errors = Array.from(validator.Errors(value));
          const firstError = JSON.stringify(errors[0], null, 2);
          const errorSampleLength = 1000;
          console.warn(
            `WARNING : The response didn't fully match the one expected by the SDK.
Make sure the SDK is up to date. If the SDK is up to date and you still get the warning, please contact our support.

Here is the first error :
            
${firstError.substring(0, errorSampleLength)}${firstError.length > errorSampleLength ? '\n... (continued in .body)' : ''}`,
            errors,
          );
          return value;
        }
        case 'error':
          throw new InvalidResponseTypeError(validator.Errors(value), value);
      }
    }

    return value;
  }
}
