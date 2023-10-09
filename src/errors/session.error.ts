import { UnipileError } from './unipile.error.js';

export class InvalidBaseUrlError extends UnipileError {
  constructor(baseUrl: string) {
    super({
      message: `The baseUrl provided at Unipile’s client instantiation is invalid : ${baseUrl}`,
    });
  }
}

export class InvalidProtocolError extends InvalidBaseUrlError {
  constructor(baseUrl: string) {
    super(baseUrl);
  }
}

export class InvalidDomainError extends InvalidBaseUrlError {
  constructor(baseUrl: string) {
    super(baseUrl);
  }
}
export class InvalidTokenError extends UnipileError {
  constructor() {
    super({
      message: `The token provided on client instanciation is invalid.`,
    });
  }
}
