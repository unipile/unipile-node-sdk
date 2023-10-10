import { Static } from '@sinclair/typebox';
import {
  getAllChatAttendeesInputSchema,
  getChatMessagesInputSchema,
  getChatsInputSchema,
  getMessageAttachementInputSchema,
  postChatMessageInputSchema,
  postWebhookInputSchema,
} from '../schemas/index.js';

// MESSAGING
export type GetChats = Static<typeof getChatsInputSchema>;
export type PostChatMessage = Static<typeof postChatMessageInputSchema>;
export type GetChatMessages = Static<typeof getChatMessagesInputSchema>;
export type GetAttendees = Static<typeof getAllChatAttendeesInputSchema>;
export type GetMessageAttachement = Static<typeof getMessageAttachementInputSchema>;
// WEBHOOK
export type PostWebhook = Static<typeof postWebhookInputSchema>;
