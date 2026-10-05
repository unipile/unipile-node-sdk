import { UnsuccessfulRequestError } from './request.error.js';

describe('UnsuccessfulRequestError', () => {
  it('uses body.message when present', () => {
    const body = { status: 400, type: 'errors/invalid_parameters', message: 'Invalid parameters' };
    const error = new UnsuccessfulRequestError(body);

    expect(error.message).toBe('Invalid parameters');
    expect(error.body).toBe(body);
  });

  it('falls back through detail, title, and type', () => {
    expect(new UnsuccessfulRequestError({ detail: 'Detailed failure' }).message).toBe('Detailed failure');
    expect(new UnsuccessfulRequestError({ title: 'Request failed' }).message).toBe('Request failed');
    expect(new UnsuccessfulRequestError({ type: 'errors/unknown' }).message).toBe('errors/unknown');
  });

  it('uses a string body directly', () => {
    expect(new UnsuccessfulRequestError('Gateway unavailable').message).toBe('Gateway unavailable');
  });

  it('uses a stable fallback for bodies without useful text', () => {
    expect(new UnsuccessfulRequestError({ status: 500 }).message).toBe('Unsuccessful request');
    expect(new UnsuccessfulRequestError(null).message).toBe('Unsuccessful request');
  });
});
