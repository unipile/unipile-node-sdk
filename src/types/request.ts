import { TSchema } from '@sinclair/typebox';
import { TypeCheck } from '@sinclair/typebox/compiler';
import { ClientOptions, SupportedProtocols } from './client.js';

export type DefaultHeaders = {
  'X-API-KEY': string;
  accept: 'application/json';
  'Content-Type'?: 'application/json' | 'multipart/form-data; boundary=UNIPILE-BOUNDARY';
};

export type RequestHeaders = Omit<DefaultHeaders, 'X-API-KEY' | 'accept'>;

type OverwritableClientOptions = Partial<
  Pick<ClientOptions, 'logRequestResult' | 'logRequestPayload' | 'validateRequestPayload' | 'validateRequestPayloadLevel'>
>;
export type RequestOptions = OverwritableClientOptions & {
  extra_params?: Record<string, string | string[]>;
}; // & {}

export type RequestUrl = {
  protocol: SupportedProtocols;
  domain: string;
  apiVersion: string;
  path: Array<string>;
  parameters: Record<string, string>;
};

export type RequestInput = {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  path: Array<string>;
  validator?: TypeCheck<TSchema>;
  parameters?: Record<string, string>;
  body?: Record<string, any>;
  headers?: RequestHeaders;
  options?: RequestOptions | undefined;
};
