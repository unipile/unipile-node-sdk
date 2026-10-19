import QRCode from 'qrcode';
import {
  ConnectAccountInput,
  GetAccountsInput,
  Output,
  PostCodeCheckpointInput,
  PostHostedAuthLinkInput,
  ReconnectAccountInput,
  RequestOptions,
  Response,
  UnipileClient,
  PostInstagramAccountInput,
  PostMessengerAccountInput,
  postQrCodeBasedAccountValidator,
  LinkedinBasicAuthenticationInput,
  LinkedinCookieAuthenticationInput,
  InvalidInputTypeError,
  PostTwitterAccountInput,
} from '../index.js';
import { AccountListApiResponse, AccountListResponseValidator } from '../accounts/accounts-list.schema.js';
import { AccountApiResponse, AccountApiResponseValidator } from '../accounts/account.types.js';
import { AccountConnectApiResponse, AccountConnectApiResponseValidator } from '../accounts/accounts-create.types.js';
import {
  AccountReconnectApiResponse,
  AccountReconnectApiResponseValidator,
  AccountSolveCheckpointApiResponse,
  AccountSolveCheckpointApiResponseValidator,
} from '../accounts/accounts-reconnect.types.js';
import { AccountDeletedApiResponse, AccountDeletedApiResponseValidator } from '../accounts/accounts-delete.types.js';
import { HostedAuthLinkResponse, HostedAuthLinkResponseValidator } from '../hosted/hosted-auth-link.types.js';
import { UniqueIdValidator } from '../common/common.types.js';
import { AccountResyncApiResponse, AccountResyncInput, AccountResyncResponseValidator } from '../accounts/accounts-resync.types.js';

export class AccountResource {
  constructor(private client: UnipileClient) {}

  async getAll(input: GetAccountsInput = {}, options?: RequestOptions): Promise<AccountListApiResponse> {
    const { limit, cursor } = input;

    const parameters: Record<string, string | string[]> = { ...options?.extra_params };
    // console.log('getAll', options, parameters);
    if (limit) parameters.limit = String(limit);
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['accounts'],
      method: 'GET',
      options,
      parameters,
      validator: AccountListResponseValidator,
    });
  }

  async getOne(account_id: string, options?: RequestOptions): Promise<AccountApiResponse> {
    return await this.client.request.send({
      path: ['accounts', account_id],
      method: 'GET',
      options,
      ...(options?.extra_params && { parameters: options.extra_params }),
      validator: AccountApiResponseValidator,
    });
  }

  async connect(input: ConnectAccountInput, options?: RequestOptions): Promise<AccountConnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountConnectApiResponseValidator,
    });
  }

  async reconnect(input: ReconnectAccountInput, options?: RequestOptions): Promise<AccountReconnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts', input.account_id],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountReconnectApiResponseValidator,
    });
  }

  async connectWhatsapp(options?: RequestOptions): Promise<Output.PostQrCodeBasedAccount> {
    const response = await this.client.request.send<Response.PostQrCodeBasedAccount>({
      path: ['accounts'],
      method: 'POST',
      body: {
        ...options?.extra_params,
        provider: 'WHATSAPP',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: postQrCodeBasedAccountValidator,
    });

    return {
      qrCodeString: await QRCode.toString(response.checkpoint.qrcode),
      code: response.checkpoint.qrcode,
      account_id: response.account_id,
    };
  }

  async reconnectWhatsapp(account_id: string, options?: RequestOptions): Promise<Output.PostQrCodeBasedAccount> {
    if (!UniqueIdValidator.Check(account_id)) {
      throw new InvalidInputTypeError(UniqueIdValidator.Errors(account_id));
    }
    const response = await this.client.request.send<Response.PostQrCodeBasedAccount>({
      path: ['accounts', account_id],
      method: 'POST',
      body: {
        ...options?.extra_params,
        provider: 'WHATSAPP',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: postQrCodeBasedAccountValidator,
    });

    return {
      qrCodeString: await QRCode.toString(response.checkpoint.qrcode),
      code: response.checkpoint.qrcode,
      account_id: response.account_id,
    };
  }

  async connectTelegram(options?: RequestOptions): Promise<Output.PostQrCodeBasedAccount> {
    const response = await this.client.request.send<Response.PostQrCodeBasedAccount>({
      path: ['accounts'],
      method: 'POST',
      body: {
        ...options?.extra_params,
        provider: 'TELEGRAM',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: postQrCodeBasedAccountValidator,
    });

    return {
      qrCodeString: await QRCode.toString(response.checkpoint.qrcode),
      code: response.checkpoint.qrcode,
      account_id: response.account_id,
    };
  }

  async reconnectTelegram(account_id: string, options?: RequestOptions): Promise<Output.PostQrCodeBasedAccount> {
    if (!UniqueIdValidator.Check(account_id)) {
      throw new InvalidInputTypeError(UniqueIdValidator.Errors(account_id));
    }
    const response = await this.client.request.send<Response.PostQrCodeBasedAccount>({
      path: ['accounts', account_id],
      method: 'POST',
      body: {
        ...options?.extra_params,
        provider: 'TELEGRAM',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: postQrCodeBasedAccountValidator,
    });

    return {
      qrCodeString: await QRCode.toString(response.checkpoint.qrcode),
      code: response.checkpoint.qrcode,
      account_id: response.account_id,
    };
  }

  async connectLinkedin(input: LinkedinBasicAuthenticationInput, options?: RequestOptions): Promise<AccountConnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
        provider: 'LINKEDIN',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountConnectApiResponseValidator,
    });
  }

  async connectLinkedinWithCookie(
    input: LinkedinCookieAuthenticationInput,
    options?: RequestOptions,
  ): Promise<AccountConnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
        provider: 'LINKEDIN',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountConnectApiResponseValidator,
    });
  }

  async reconnectLinkedin(
    input: LinkedinBasicAuthenticationInput & { account_id: string },
    options?: RequestOptions,
  ): Promise<AccountReconnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts', input.account_id],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
        provider: 'LINKEDIN',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountReconnectApiResponseValidator,
    });
  }

  async reconnectLinkedinWithCookie(
    input: LinkedinCookieAuthenticationInput & { account_id: string },
    options?: RequestOptions,
  ): Promise<AccountReconnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts', input.account_id],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
        provider: 'LINKEDIN',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountReconnectApiResponseValidator,
    });
  }

  async connectInstagram(input: PostInstagramAccountInput, options?: RequestOptions): Promise<AccountConnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
        provider: 'INSTAGRAM',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountConnectApiResponseValidator,
    });
  }

  async reconnectInstagram(
    input: PostInstagramAccountInput & { account_id: string },
    options?: RequestOptions,
  ): Promise<AccountReconnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts', input.account_id],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
        provider: 'INSTAGRAM',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountReconnectApiResponseValidator,
    });
  }

  async connectTwitter(input: PostTwitterAccountInput, options?: RequestOptions): Promise<AccountConnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
        provider: 'TWITTER',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountConnectApiResponseValidator,
    });
  }

  async reconnectTwitter(
    input: PostTwitterAccountInput & { account_id: string },
    options?: RequestOptions,
  ): Promise<AccountReconnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts', input.account_id],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
        provider: 'TWITTER',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountReconnectApiResponseValidator,
    });
  }

  async connectMessenger(input: PostMessengerAccountInput, options?: RequestOptions): Promise<AccountConnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
        provider: 'MESSENGER',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountConnectApiResponseValidator,
    });
  }

  async reconnectMessenger(
    input: PostMessengerAccountInput & { account_id: string },
    options?: RequestOptions,
  ): Promise<AccountReconnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts', input.account_id],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
        provider: 'MESSENGER',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountReconnectApiResponseValidator,
    });
  }

  async delete(account_id: string, options?: RequestOptions): Promise<AccountDeletedApiResponse> {
    return await this.client.request.send({
      path: ['accounts', account_id],
      method: 'DELETE',
      options,
      ...(options?.extra_params && { parameters: options.extra_params }),
      validator: AccountDeletedApiResponseValidator,
    });
  }

  async solveCodeCheckpoint(
    input: PostCodeCheckpointInput,
    options?: RequestOptions,
  ): Promise<AccountSolveCheckpointApiResponse> {
    return await this.client.request.send({
      path: ['accounts', 'checkpoint'],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountSolveCheckpointApiResponseValidator,
    });
  }

  async createHostedAuthLink(input: PostHostedAuthLinkInput, options?: RequestOptions): Promise<HostedAuthLinkResponse> {
    return await this.client.request.send({
      path: ['hosted', 'accounts', 'link'],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: HostedAuthLinkResponseValidator,
    });
  }

  async resyncLinkedinAccount(input: AccountResyncInput, options?: RequestOptions): Promise<AccountResyncApiResponse> {
    const { before, after, linkedin_product, account_id } = input;

    if (!UniqueIdValidator.Check(account_id)) {
      throw new InvalidInputTypeError(UniqueIdValidator.Errors(account_id));
    }

    const parameters: Record<string, string | string[]> = { ...options?.extra_params };
    if (linkedin_product) {
      parameters.linkedin_product = linkedin_product;
    }
    if (before) {
      parameters.before = before + '';
    }
    if (after) {
      parameters.after = after + '';
    }

    return await this.client.request.send({
      path: ['accounts', account_id, 'sync'],
      method: 'GET',
      parameters,
      options,
      validator: AccountResyncResponseValidator,
    });
  }
}
