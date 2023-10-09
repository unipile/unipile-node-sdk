import { ValueErrorIterator } from '@sinclair/typebox/errors';
import { UnipileError } from './unipile.error.js';

export class UnsuccessfulRequestError extends UnipileError {
  constructor(body: unknown) {
    super({ message: '', body });
  }
}

export class InvalidResponseTypeError extends UnipileError {
  constructor(errorIterator: ValueErrorIterator) {
    super({
      message: 'The response type is unexpected. You can modify the validator or disable the validation to pass this issue.',
      body: Array.from(errorIterator),
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
