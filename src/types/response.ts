import { Static } from '@sinclair/typebox';
import {
  getAccountsResponseSchema,
  postAccountResponseSchema,
  deleteAccountResponseSchema,
  deleteWebhookResponseSchema,
  getAllChatAttendeesResponseSchema,
  getAttendeeResponseSchema,
  getChatAttendeesResponseSchema,
  getChatMessagesResponseSchema,
  getChatResponseSchema,
  getChatsResponseSchema,
  getMessageAttachementResponseSchema,
  getMessageResponseSchema,
  getMessagesResponseSchema,
  getWebhooksResponseSchema,
  postChatMessageResponseSchema,
  postHostedAuthLinkResponseSchema,
  postWebhookResponseSchema,
  getAccountSourceStatusResponseSchema,
  postWhatsappAccountSchema,
} from '../schemas/index.js';

export type UntypedYet = any;
// ACCOUNT
export type Accounts = Static<typeof getAccountsResponseSchema>;
export type AccountSourceStatus = Static<typeof getAccountSourceStatusResponseSchema>;
export type PostAccount = Static<typeof postAccountResponseSchema>;
export type PostWhatsappAccount = Static<typeof postWhatsappAccountSchema>;
export type DeleteAccount = Static<typeof deleteAccountResponseSchema>;
export type HostedAuthLink = Static<typeof postHostedAuthLinkResponseSchema>;
// MESSAGING
export type GetChats = Static<typeof getChatsResponseSchema>;
export type Chat = Static<typeof getChatResponseSchema>;
export type ChatMessages = Static<typeof getChatMessagesResponseSchema>;
export type ChatAttendees = Static<typeof getChatAttendeesResponseSchema>;
export type PostChatMessage = Static<typeof postChatMessageResponseSchema>;
export type Messages = Static<typeof getMessagesResponseSchema>;
export type Message = Static<typeof getMessageResponseSchema>;
export type Attendees = Static<typeof getAllChatAttendeesResponseSchema>;
export type Attendee = Static<typeof getAttendeeResponseSchema>;
export type MessageAttachement = Static<typeof getMessageAttachementResponseSchema>;
// WEBHOOK
export type Webhooks = Static<typeof getWebhooksResponseSchema>;
export type PostWebhook = Static<typeof postWebhookResponseSchema>;
export type DeleteWebhook = Static<typeof deleteWebhookResponseSchema>;
