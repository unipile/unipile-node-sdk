import {
  GetAllEmailsInput,
  GetAllFoldersInput,
  MoveEmailInput,
  RequestOptions,
  Response,
  UnipileClient,
  untypedYetValidator,
} from '../index.js';

export class EmailResource {
  constructor(private client: UnipileClient) {}

  async getAll(input: GetAllEmailsInput = {}, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { account_id, role, folder, from, to, any_email, before, after, limit, cursor } = input;

    const parameters: Record<string, string> = {};
    if (account_id) parameters.account_id = account_id;
    if (role) parameters.role = role;
    if (folder) parameters.folder = folder;
    if (from) parameters.from = from;
    if (to) parameters.to = to;
    if (any_email) parameters.any_email = any_email;
    if (before) parameters.before = before;
    if (after) parameters.after = after;
    if (limit) parameters.limit = String(limit);
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['emails'],
      method: 'GET',
      options,
      parameters,
      validator: untypedYetValidator,
    });
  }

  async getOne(email_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['emails', email_id],
      method: 'GET',
      options,
      validator: untypedYetValidator,
    });
  }

  async delete(email_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['emails', email_id],
      method: 'DELETE',
      options,
      validator: untypedYetValidator,
    });
  }

  async move(input: MoveEmailInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { email_id, action, folder } = input;

    const parameters: Record<string, string> = {};
    parameters.action = action;
    if (folder) parameters.folder = folder;

    return await this.client.request.send({
      path: ['emails', email_id],
      method: 'PATCH',
      options,
      validator: untypedYetValidator,
    });
  }

  async getAllFolders(input: GetAllFoldersInput = {}, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { account_id } = input;

    const parameters: Record<string, string> = {};
    if (account_id) parameters.account_id = account_id;

    return await this.client.request.send({
      path: ['folders'],
      method: 'GET',
      options,
      validator: untypedYetValidator,
    });
  }

  async getOneFolder(folder_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['folders', folder_id],
      method: 'GET',
      options,
      validator: untypedYetValidator,
    });
  }

  async send(folder_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['emails'],
      method: 'POST',
      options,
      validator: untypedYetValidator,
    });
  }
}
