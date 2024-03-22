import { FormData } from 'formdata-node';
import { Blob } from 'node-fetch';
import {
  GetAllEmailsInput,
  GetAllFoldersInput,
  GetEmailAttachmentInput,
  UpdateEmailInput,
  RequestOptions,
  Response,
  SendEmailInput,
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

  async update(input: UpdateEmailInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { email_id, folders } = input;

    const body: Record<string, any> = {};
    body.folders = folders;

    return await this.client.request.send({
      path: ['emails', email_id],
      method: 'PUT',
      body,
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

  async send(input: SendEmailInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { account_id, to, cc, bcc, subject, draft_id, body, attachments } = input;
    const formDataBody = new FormData();

    formDataBody.append('body', body);
    formDataBody.append('account_id', account_id);
    if (draft_id) formDataBody.append('draft_id', draft_id);
    if (subject) formDataBody.append('subject', subject);

    if (attachments !== undefined) {
      for (const [filename, buffer] of attachments) {
        formDataBody.append('attachments', new Blob([buffer]), filename);
      }
    }

    for (const element of to) {
      formDataBody.append('to', JSON.stringify(element));
    }
    if (cc !== undefined) {
      for (const element of cc) formDataBody.append('cc', JSON.stringify(element));
    }
    if (bcc !== undefined) {
      for (const element of bcc) formDataBody.append('bcc', JSON.stringify(element));
    }

    return await this.client.request.send({
      path: ['emails'],
      method: 'POST',
      body: formDataBody,
      headers: {
        // @todo find why adding the "Content-Type: multipart/form-data" header make the request fail
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async getEmailAttachment(input: GetEmailAttachmentInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { email_id, attachment_id } = input;

    return await this.client.request.send({
      path: [email_id, 'attachments', attachment_id],
      method: 'GET',
      options,
      validator: untypedYetValidator,
    });
  }
}
