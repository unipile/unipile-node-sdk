import { ValueErrorIterator } from '@sinclair/typebox/errors';
import { UnipileError } from './unipile.error.js';

export class UnsuccessfulRequestError extends UnipileError {
  constructor(body: unknown) {
    super({ message: unsuccessfulRequestMessage(body), body });
  }
}

function unsuccessfulRequestMessage(body: unknown): string {
  if (body && typeof body === 'object') {
    const record = body as Record<string, unknown>;
    for (const key of ['message', 'detail', 'title', 'type'] as const) {
      const value = record[key];
      if (typeof value === 'string' && value.trim()) return value;
    }
  }
  if (typeof body === 'string' && body.trim()) return body;
  return 'Unsuccessful request';
}

export class InvalidResponseTypeError extends UnipileError {
  constructor(
    errorIterator: ValueErrorIterator,
    public invalid_response: unknown,
    errorSampleLength = 1000,
  ) {
    const body = Array.from(errorIterator);
    const firstError = JSON.stringify(body[0], null, 2);
    super({
      message: `Invalid response type : the response type didn't match the one expected by the SDK.

Make sure the SDK is up to date. If the SDK is up to date and you still get the error, please contact our support.

To ignore this issue and try work with the current response 'as is' :
  - You may use the .invalid_response property of this error 
  - Or disable the optional validation altogether.

The full error list is available on the .body property of this error.
Here is the first error :

${firstError.substring(0, errorSampleLength)}${firstError.length > errorSampleLength ? '\n... (continued in .body)' : ''}`,
      body,
    });
  }
}

export class ValidatorMissingError extends UnipileError {
  constructor() {
    super({
      message: 'Missing validator when performing validation. Please provide a validator or disable validation.',
    });
  }
}

export class InvalidInputTypeError extends UnipileError {
  constructor(errorIterator: ValueErrorIterator, errorSampleLength = 1000) {
    const body = Array.from(errorIterator);
    const firstError = JSON.stringify(body[0], null, 2);
    super({
      message: `Invalid input type : the input type didn't match the one expected by the SDK.
      
The full error list is available on the .body property of this error.
Here is the first error :

${firstError.substring(0, errorSampleLength)}${firstError.length > errorSampleLength ? '\n... (continued in .body)' : ''}`,
      body,
    });
  }
}
