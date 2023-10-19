import { Static } from '@sinclair/typebox';
import {
  getAllChatAttendeesInputSchema,
  getMessageAttachementInputSchema,
  postChatMessageInputSchema,
  postWebhookInputSchema,
} from '../schemas/index.js';

// MESSAGING
export type PostChatMessage = Static<typeof postChatMessageInputSchema>;
export type GetAttendees = Static<typeof getAllChatAttendeesInputSchema>;
export type GetMessageAttachement = Static<typeof getMessageAttachementInputSchema>;
// WEBHOOK
export type PostWebhook = Static<typeof postWebhookInputSchema>;
