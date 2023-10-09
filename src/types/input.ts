import { Static } from '@sinclair/typebox';
import {
  getAccountsInputSchema,
  getAllChatAttendeesInputSchema,
  getChatMessagesInputSchema,
  getChatsInputSchema,
  getMessageAttachementInputSchema,
  postChatMessageInputSchema,
  postCodeCheckpointInputSchema,
  postHostedAuthLinkInputSchema,
  postLinkedinAccountInput,
  postWebhookInputSchema,
} from '../schemas/index.js';

// ACCOUNT
export type GetAccounts = Static<typeof getAccountsInputSchema>;
export type PostLinkedinAccount = Static<typeof postLinkedinAccountInput>;
export type PostCodeCheckpoint = Static<typeof postCodeCheckpointInputSchema>;
export type HostedAuthLink = Static<typeof postHostedAuthLinkInputSchema>;
// MESSAGING
export type GetChats = Static<typeof getChatsInputSchema>;
export type PostChatMessage = Static<typeof postChatMessageInputSchema>;
export type GetChatMessages = Static<typeof getChatMessagesInputSchema>;
export type GetAttendees = Static<typeof getAllChatAttendeesInputSchema>;
export type GetMessageAttachement = Static<typeof getMessageAttachementInputSchema>;
// WEBHOOK
export type PostWebhook = Static<typeof postWebhookInputSchema>;
