import { UnsuccessfulRequestError } from './request.error.js';

describe('UnsuccessfulRequestError', () => {
  it('preserves the API error body while exposing documented fields', () => {
    const body = {
      status: 403,
      type: 'errors/insufficient_privileges',
      detail: 'blocked',
    };

    const error = new UnsuccessfulRequestError(body);

    expect(error.body).toBe(body);
    expect(error.body.status).toBe(403);
    expect(error.body.type).toBe('errors/insufficient_privileges');
    expect(error.body.detail).toBe('blocked');
  });
});
