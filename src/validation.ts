import { TypeCompiler } from '@sinclair/typebox/compiler';
import {
  deleteAccountResponseSchema,
  deleteWebhookResponseSchema,
  getAccountSourceStatusResponseSchema,
  getAccountsResponseSchema,
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
  postAccountResponseSchema,
  postChatMessageResponseSchema,
  postHostedAuthLinkResponseSchema,
  postWebhookResponseSchema,
  postWhatsappAccountSchema,
} from './schemas/index.js';
import { Type } from '@sinclair/typebox';

// REQUEST
export const untypedYetValidator = TypeCompiler.Compile(Type.Unknown());
// ACCOUNT
export const accountsValidator = TypeCompiler.Compile(getAccountsResponseSchema);
export const accountSourceStatusValidator = TypeCompiler.Compile(getAccountSourceStatusResponseSchema);
export const postAccountValidator = TypeCompiler.Compile(postAccountResponseSchema);
export const postWhatsappAccountValidator = TypeCompiler.Compile(postWhatsappAccountSchema);
export const deleteAccountValidator = TypeCompiler.Compile(deleteAccountResponseSchema);
export const postHostedAuthLinkValidator = TypeCompiler.Compile(postHostedAuthLinkResponseSchema);
// MESSAGING
export const getChatsValidator = TypeCompiler.Compile(getChatsResponseSchema);
export const getChatValidator = TypeCompiler.Compile(getChatResponseSchema);
export const getChatMessagesValidator = TypeCompiler.Compile(getChatMessagesResponseSchema);
export const getChatAttendeesValidator = TypeCompiler.Compile(getChatAttendeesResponseSchema);
export const postChatMessageValidator = TypeCompiler.Compile(postChatMessageResponseSchema);
export const getAttendeesValidator = TypeCompiler.Compile(getAllChatAttendeesResponseSchema);
export const getAttendeeValidator = TypeCompiler.Compile(getAttendeeResponseSchema);
export const getMessagesValidator = TypeCompiler.Compile(getMessagesResponseSchema);
export const getMessageValidator = TypeCompiler.Compile(getMessageResponseSchema);
export const getMessageAttachementValidator = TypeCompiler.Compile(getMessageAttachementResponseSchema);
// WEBHOOK
export const getWebhooksValidator = TypeCompiler.Compile(getWebhooksResponseSchema);
export const postWebhookValidator = TypeCompiler.Compile(postWebhookResponseSchema);
export const deleteWebhookValidator = TypeCompiler.Compile(deleteWebhookResponseSchema);
