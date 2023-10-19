import { UnipileClient } from '../client.js';
import { RequestOptions, Response } from '../types/index.js';
import { deleteWebhookValidator, getWebhooksValidator, postWebhookValidator } from '../validation.js';

export class WebhookResource {
  constructor(private client: UnipileClient) {}

  async getAll(options?: RequestOptions): Promise<Response.Webhooks> {
    return await this.client.request.send({
      path: ['webhooks'],
      method: 'GET',
      options,
      validator: getWebhooksValidator,
    });
  }

  async create(input: any, options?: RequestOptions): Promise<Response.PostWebhook> {
    return await this.client.request.send({
      path: ['webhooks'],
      method: 'POST',
      body: input,
      options,
      validator: postWebhookValidator,
    });
  }

  async delete(id: string, options?: RequestOptions): Promise<Response.DeleteWebhook> {
    return await this.client.request.send({
      path: ['webhooks', id],
      method: 'DELETE',
      options,
      validator: deleteWebhookValidator,
    });
  }
}
