import { GetProfileInput, RequestOptions, UnipileClient, untypedYetValidator, Response, PostInvitationInput } from '../index.js';

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

  async sendInvitation(input: PostInvitationInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['users', 'invite'],
      method: 'POST',
      body: input,
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }
}
