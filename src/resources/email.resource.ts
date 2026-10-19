import {
  GetAllEmailsInput,
  GetAllFoldersInput,
  GetEmailAttachmentByProviderIdInput,
  GetEmailAttachmentInput,
  RequestOptions,
  SendEmailInput,
  UnipileClient,
  untypedYetValidator,
  UpdateEmailByProviderIdInput,
  UpdateEmailInput,
} from '../index.js';
import {
  FolderApiResponse,
  FolderApiResponseValidator,
  FolderListApiResponse,
  FolderListApiResponseValidator,
} from '../mails/folders/folders.types.js';
import { MailDeletedApiResponse, MailDeletedApiResponseValidator } from '../mails/mail.delete.types.js';
import { MailSentApiResponse, MailSentApiResponseValidator } from '../mails/mail.send.types.js';
import { MailApiResponse, MailApiResponseValidator } from '../mails/mail.types.js';
import { MailUpdatedApiResponse, MailUpdatedApiResponseValidator } from '../mails/mail.update.types.js';
import { MailListApiResponse, MailListApiResponseValidator } from '../mails/mails-list.types.js';

/**
 * @note The whole approach of having sub methods on methods is kept as is as to
 *       not break API for existing clients.
 *
 *       BUT IT SHOULD NOT BE USED/REPRODUCED ELSEWHERE :
 *         - It's hard to discover submethods as they are lost in whatever props
 *           exist on js functions.
 *         - The types were just using 'any' as args and the fix is ugly and complex.
 *         - No other resource in the sdk follows this pattern.
 */
type EmailMethodCallableByProviderId<TReturn, TArgs1 extends unknown[], TArgs2 extends unknown[], TArgs3 extends unknown[]> = {
  (...args: [...TArgs1, options?: RequestOptions]): Promise<TReturn>;
  byId(...args: [...TArgs2, options?: RequestOptions]): Promise<TReturn>;
  byProviderId(...args: [...TArgs3, options?: RequestOptions]): Promise<TReturn>;
};

export class EmailResource {
  /**
   * Get one email, either by its ID or by its provider ID.
   * @example email.getOne('email_id')
   * @example email.getOne.byProviderId('email_provider_id', 'account_id')
   */
  public getOne: EmailMethodCallableByProviderId<
    MailApiResponse,
    [email_id: string],
    [email_id: string],
    [email_provider_id: string, account_id: string]
  >;

  /**
   * Delete an email, either by its ID or by its provider ID.
   * @example email.delete('email_id')
   * @example email.delete.byProviderId('email_provider_id', 'account_id')
   */
  public delete: EmailMethodCallableByProviderId<
    MailDeletedApiResponse,
    [email_id: string],
    [email_id: string],
    [email_provider_id: string, account_id: string]
  >;

  /**
   * Update an email, either by its ID or by its provider ID.
   * @example email.update({ email_id: 'email_id', folders: ['folder'] })
   * @example email.update.byProviderId({ email_provider_id: 'email_provider_id', account_id: 'account_id', folders: ['folder'] })
   */
  public update: EmailMethodCallableByProviderId<
    MailUpdatedApiResponse,
    [input: UpdateEmailInput],
    [input: UpdateEmailInput],
    [input: UpdateEmailByProviderIdInput]
  >;

  /**
   * Get one folder, either by its ID or by its provider ID.
   * @example email.getOneFolder('folder_id')
   * @example email.getOneFolder.byProviderId('folder_provider_id', 'account_id')
   */
  public getOneFolder: EmailMethodCallableByProviderId<
    FolderApiResponse,
    [folder_id: string],
    [folder_id: string],
    [folder_provider_id: string, account_id: string]
  >;

  /**
   * Get an attachment, either by the email ID or by the email provider ID.
   * @example email.getEmailAttachment({ email_id: 'email_id', attachment_id: 'attachment_id' })
   * @example email.getEmailAttachment.byProviderId({ email_provider_id: 'email_provider_id', attachment_id: 'attachment_id', account_id: 'account_id' })
   */
  public getEmailAttachment: EmailMethodCallableByProviderId<
    Blob,
    [input: GetEmailAttachmentInput],
    [input: GetEmailAttachmentInput],
    [input: GetEmailAttachmentByProviderIdInput]
  >;

  constructor(private client: UnipileClient) {
    this.getOne = this._getOne.bind(this) as EmailResource['getOne'];
    this.getOne.byId = this._getOne.bind(this);
    this.getOne.byProviderId = this._getOneByProviderId.bind(this);

    this.delete = this._delete.bind(this) as EmailResource['delete'];
    this.delete.byId = this._delete.bind(this);
    this.delete.byProviderId = this._deleteByProviderId.bind(this);

    this.update = this._update.bind(this) as EmailResource['update'];
    this.update.byId = this._update.bind(this);
    this.update.byProviderId = this._updateByProviderId.bind(this);

    this.getOneFolder = this._getOneFolder.bind(this) as EmailResource['getOneFolder'];
    this.getOneFolder.byId = this._getOneFolder.bind(this);
    this.getOneFolder.byProviderId = this._getOneFolderByProviderId.bind(this);

    this.getEmailAttachment = this._getEmailAttachment.bind(this) as EmailResource['getEmailAttachment'];
    this.getEmailAttachment.byId = this._getEmailAttachment.bind(this);
    this.getEmailAttachment.byProviderId = this._getEmailAttachmentByProviderId.bind(this);
  }

  async getAll(input: GetAllEmailsInput = {}, options?: RequestOptions): Promise<MailListApiResponse> {
    const { account_id, role, folder, from, to, any_email, before, after, limit, cursor } = input;

    const parameters: Record<string, string | string[]> = { ...options?.extra_params };
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
      validator: MailListApiResponseValidator,
    });
  }

  private async _getOne(email_id: string, options?: RequestOptions): Promise<MailApiResponse> {
    return await this.client.request.send({
      path: ['emails', email_id],
      method: 'GET',
      options,
      ...(options?.extra_params && { parameters: options.extra_params }),
      validator: MailApiResponseValidator,
    });
  }

  private async _getOneByProviderId(
    email_provider_id: string,
    account_id: string,
    options?: RequestOptions,
  ): Promise<MailApiResponse> {
    return await this.client.request.send({
      path: ['emails', email_provider_id],
      method: 'GET',
      options,
      parameters: { ...options?.extra_params, account_id },
      validator: MailApiResponseValidator,
    });
  }

  private async _delete(email_id: string, options?: RequestOptions): Promise<MailDeletedApiResponse> {
    return await this.client.request.send({
      path: ['emails', email_id],
      method: 'DELETE',
      options,
      ...(options?.extra_params && { parameters: options.extra_params }),
      validator: MailDeletedApiResponseValidator,
    });
  }

  private async _deleteByProviderId(
    email_provider_id: string,
    account_id: string,
    options?: RequestOptions,
  ): Promise<MailDeletedApiResponse> {
    return await this.client.request.send({
      path: ['emails', email_provider_id],
      method: 'DELETE',
      options,
      parameters: { ...options?.extra_params, account_id },
      validator: MailDeletedApiResponseValidator,
    });
  }

  private async _update(input: UpdateEmailInput, options?: RequestOptions): Promise<MailUpdatedApiResponse> {
    const { email_id, folders, unread } = input;

    const body: Record<string, any> = {};
    if (folders) body.folders = folders;
    if (unread !== undefined) body.unread = unread;

    return await this.client.request.send({
      path: ['emails', email_id],
      method: 'PUT',
      body: {
        ...options?.extra_params,
        ...body,
      },
      options,
      validator: MailUpdatedApiResponseValidator,
    });
  }

  private async _updateByProviderId(
    input: UpdateEmailByProviderIdInput,
    options?: RequestOptions,
  ): Promise<MailUpdatedApiResponse> {
    const { email_provider_id, account_id, folders, unread } = input;

    const body: Record<string, any> = {};
    if (folders) body.folders = folders;
    if (unread !== undefined) body.unread = unread;

    return await this.client.request.send({
      path: ['emails', email_provider_id],
      method: 'PUT',
      body: {
        ...options?.extra_params,
        ...body,
      },
      options,
      parameters: { account_id },
      validator: MailUpdatedApiResponseValidator,
    });
  }

  async getAllFolders(input: GetAllFoldersInput = {}, options?: RequestOptions): Promise<FolderListApiResponse> {
    const { account_id } = input;

    const parameters: Record<string, string | string[]> = { ...options?.extra_params };
    if (account_id) parameters.account_id = account_id;

    return await this.client.request.send({
      path: ['folders'],
      method: 'GET',
      options,
      parameters,
      validator: FolderListApiResponseValidator,
    });
  }

  private async _getOneFolder(folder_id: string, options?: RequestOptions): Promise<FolderApiResponse> {
    return await this.client.request.send({
      path: ['folders', folder_id],
      method: 'GET',
      options,
      ...(options?.extra_params && { parameters: options.extra_params }),
      validator: FolderApiResponseValidator,
    });
  }

  private async _getOneFolderByProviderId(
    folder_provider_id: string,
    account_id: string,
    options?: RequestOptions,
  ): Promise<FolderApiResponse> {
    return await this.client.request.send({
      path: ['folders', folder_provider_id],
      method: 'GET',
      options,
      parameters: { ...options?.extra_params, account_id },
      validator: FolderApiResponseValidator,
    });
  }

  async send(input: SendEmailInput, options?: RequestOptions): Promise<MailSentApiResponse> {
    const { account_id, to, cc, bcc, subject, draft_id, body, attachments, from, custom_headers, tracking_options, reply_to } =
      input;
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

    formDataBody.append('to', JSON.stringify(to));
    if (cc !== undefined) {
      formDataBody.append('cc', JSON.stringify(cc));
    }
    if (bcc !== undefined) {
      formDataBody.append('bcc', JSON.stringify(bcc));
    }
    if (from !== undefined) {
      formDataBody.append('from', JSON.stringify(from));
    }

    if (custom_headers !== undefined) {
      formDataBody.append('custom_headers', JSON.stringify(custom_headers));
    }

    if (tracking_options !== undefined) {
      formDataBody.append('tracking_options', JSON.stringify(tracking_options));
    }

    if (reply_to !== undefined) {
      formDataBody.append('reply_to', reply_to);
    }

    if (options?.extra_params) {
      Object.entries(options.extra_params).forEach(([k, v]) => {
        if (!formDataBody.has(k)) {
          for (const item of Array.isArray(v) ? v : [v]) {
            formDataBody.append(k, item);
          }
        }
      });
    }

    return await this.client.request.send({
      path: ['emails'],
      method: 'POST',
      body: formDataBody,
      headers: {},
      options,
      validator: MailSentApiResponseValidator,
    });
  }

  private async _getEmailAttachment(input: GetEmailAttachmentInput, options?: RequestOptions): Promise<Blob> {
    const { email_id, attachment_id } = input;

    return await this.client.request.send({
      path: ['emails', email_id, 'attachments', attachment_id],
      method: 'GET',
      options,
      ...(options?.extra_params && { parameters: options.extra_params }),
      validator: untypedYetValidator,
    });
  }

  private async _getEmailAttachmentByProviderId(
    input: GetEmailAttachmentByProviderIdInput,
    options?: RequestOptions,
  ): Promise<Blob> {
    const { email_provider_id, attachment_id, account_id } = input;

    return await this.client.request.send({
      path: ['emails', email_provider_id, 'attachments', attachment_id],
      method: 'GET',
      options,
      parameters: { ...options?.extra_params, account_id },
      validator: untypedYetValidator,
    });
  }
}
