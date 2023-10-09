import { Type } from '@sinclair/typebox';
import { uniqueIdSchema, accountSourceProviderSchema } from './utils.schema.js';

const webhookBodyFormatSchema = Type.Union([Type.Literal('json'), Type.Literal('form')]);

const webhookHeaderItemSchema = Type.Object({
  key: Type.String(),
  value: Type.String(),
});

const webhookIconKeySchema = Type.Union([
  Type.Literal('WebhookIcon'),
  Type.Literal('SettingsInputIcon'),
  Type.Literal('LeakAddIcon'),
  Type.Literal('Diversity2Icon'),
  Type.Literal('AutoFixHighIcon'),
  Type.Literal('SignPostIcon'),
  Type.Literal('ShutterSpeedIcon'),
  Type.Literal('SyncAltIcon'),
  Type.Literal('WhatsAppIcon'),
  Type.Literal('LinkedInIcon'),
  Type.Literal('ImportExportIcon'),
  Type.Literal('PodcastsIcon'),
  Type.Literal('CableIcon'),
]);

const webhookButtonSchema = Type.Object({
  icon: webhookIconKeySchema,
  name: Type.String(),
  context: Type.Union([Type.Literal('MESSAGE'), Type.Literal('CHAT')]),
});

const webhookDataKeySchema = Type.Union([
  Type.Literal('account_id'),
  Type.Literal('account_type'),
  Type.Literal('chat_id'),
  Type.Literal('timestamp'),
  Type.Literal('webhook_name'),
  Type.Literal('message_id'),
  Type.Literal('message'),
  Type.Literal('attendee_id'),
  Type.Literal('attendee_name'),
  Type.Literal('attachments'),
]);

const webhookDataItemSchema = Type.Object({
  name: Type.String(),
  key: webhookDataKeySchema,
});

const webhookAccountOptionSchema = Type.Object({
  id: uniqueIdSchema,
  name: Type.Optional(Type.String()),
  type: accountSourceProviderSchema,
});

const webhookSchema = Type.Object({
  id: Type.String(),
  type: Type.Union([Type.Literal('AUTO'), Type.Literal('TRIGGER')]),
  account_ids: Type.Array(webhookAccountOptionSchema),
  enabled: Type.Boolean(),
  name: Type.Optional(Type.String()),
  request_url: Type.String(),
  format: webhookBodyFormatSchema,
  headers: webhookHeaderItemSchema,
  data: Type.Array(webhookDataItemSchema),
  trigger: Type.Union([webhookButtonSchema, Type.Never()]),
});

/**
 * create webhook input
 */
const webhookCreateBaseBodySchema = Type.Object({
  request_url: Type.String(),
  name: Type.Optional(Type.String()),
  format: Type.Optional(webhookBodyFormatSchema),
  account_ids: Type.Optional(Type.Array(Type.String())),
  enabled: Type.Optional(Type.Boolean()),
  headers: Type.Optional(Type.Array(webhookHeaderItemSchema)),
});

const webhookCreateMessagingBodySchema = Type.Composite([
  webhookCreateBaseBodySchema,
  Type.Object({
    source: Type.Literal('messaging'),
    data: Type.Array(webhookDataItemSchema),
  }),
]);

const webhookCreateAccountsStatusBodySchema = Type.Composite([
  webhookCreateBaseBodySchema,
  Type.Object({
    source: Type.Literal('account_status'),
  }),
]);

export const getWebhooksResponseSchema = Type.Object({
  object: Type.Literal('WebhookList'),
  items: Type.Array(Type.Composite([Type.Object({ object: Type.Literal('Webhook') }), webhookSchema])),
});

export const postWebhookResponseSchema = Type.Object({
  object: Type.Literal('WebhookCreated'),
  webhook_id: Type.String(),
});

export const deleteWebhookResponseSchema = Type.Object({
  object: Type.Literal('WebhookDeleted'),
});

export const postWebhookInputSchema = Type.Union([webhookCreateMessagingBodySchema, webhookCreateAccountsStatusBodySchema]);
