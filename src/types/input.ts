import { Static } from '@sinclair/typebox';
import { getAllChatAttendeesInputSchema, getMessageAttachementInputSchema } from '../schemas/index.js';

// MESSAGING
export type GetAttendees = Static<typeof getAllChatAttendeesInputSchema>;
export type GetMessageAttachement = Static<typeof getMessageAttachementInputSchema>;
