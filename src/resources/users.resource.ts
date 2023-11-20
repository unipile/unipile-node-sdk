import { GetProfileInput, RequestOptions, UnipileClient, untypedYetValidator, Response } from '../index.js';

export class UsersResource {
  constructor(private client: UnipileClient) {}

  async getProfile(input: GetProfileInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { identifier, account_id } = input;

    return await this.client.request.send({
      path: ['users', identifier],
      method: 'GET',
      options,
      parameters: { account_id },
      validator: untypedYetValidator,
    });
  }
}
