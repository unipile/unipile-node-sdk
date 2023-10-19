import QRCode from 'qrcode';
import {
  GetAccountsInput,
  Output,
  PostCodeCheckpointInput,
  PostHostedAuthLinkInput,
  PostLinkedinAccountInput,
  RequestOptions,
  Response,
} from '../types/index.js';
import { UnipileClient } from '../client.js';
import { untypedYetValidator, postWhatsappAccountValidator } from '../validation.js';

export class AccountResource {
  constructor(private client: UnipileClient) {}

  async getAll(input: GetAccountsInput = {}, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { limit, cursor } = input;

    const parameters: Record<string, string> = {};
    if (limit) parameters.limit = String(limit);
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['accounts'],
      method: 'GET',
      options,
      parameters,
      validator: untypedYetValidator,
    });
  }

  async getOne(accountId: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts', accountId],
      method: 'GET',
      options,
      validator: untypedYetValidator,
    });
  }

  async connectWhatsapp(options?: RequestOptions): Promise<Output.PostWhatsappAccount> {
    const response = await this.client.request.send<Response.PostWhatsappAccount>({
      path: ['accounts'],
      method: 'POST',
      body: {
        provider: 'WHATSAPP',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: postWhatsappAccountValidator,
    });

    return {
      qrCodeString: await QRCode.toString(response.checkpoint.qrcode),
      code: response.checkpoint.qrcode,
    };
  }

  async connectLinkedin(input: PostLinkedinAccountInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: {
        provider: 'LINKEDIN',
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async solveCodeCheckpoint(input: PostCodeCheckpointInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts', 'checkpoint'],
      method: 'POST',
      body: input,
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async delete(id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts', id],
      method: 'DELETE',
      options,
      validator: untypedYetValidator,
    });
  }

  async createHostedAuthLink(input: PostHostedAuthLinkInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['hosted', 'accounts', 'auth_link'],
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
