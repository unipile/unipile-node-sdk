import { Type } from '@sinclair/typebox';
import { getAllChatAttendeesResponseSchema } from './chat-attendee.schema.js';
import { messageSchema, getMessagesResponseSchema } from './message.schema.js';
import { listLimitQuerySchema, cursorParamSchema } from './query-parameters.schema.js';
import { messagingProviderSchema, UTCDateTimeMsTypeSchema, cursorSchema } from './utils.schema.js';

const ChatFeaturesSchema = Type.Union([Type.Literal('reactions')]);

const chatSchema = Type.Object({
  object: Type.Literal('Chat'),
  id: Type.String(),
  account_id: Type.String(),
  account_type: Type.String(),
  provider_id: Type.String(),
  attendee_provider_id: Type.Optional(Type.String()),
  name: Type.Union([Type.String(), Type.Null()]),
  type: Type.Enum({ SINGLE: 0, GROUP: 1, CHANNEL: 2 }),
  timestamp: Type.Union([Type.String(), Type.Null()]),
  unread_count: Type.Number(),
  archived: Type.Union([Type.Literal(0), Type.Literal(1)]),
  muted_until: Type.Union([Type.Literal(-1), Type.String(), Type.Null()]),
  read_only: Type.Union([Type.Literal(0), Type.Literal(1), Type.Literal(2)]),
  disabledFeatures: Type.Optional(Type.Array(ChatFeaturesSchema)),
  lastMessage: Type.Optional(Type.Union([messageSchema, Type.Null()])),
});

/**
 * getChatsInput
 */
const chatListOptionsQuerySchema = Type.Object({
  account_id: Type.Optional(Type.String()),
  account_type: Type.Optional(messagingProviderSchema),
  after: Type.Optional(UTCDateTimeMsTypeSchema),
  before: Type.Optional(UTCDateTimeMsTypeSchema),
  //optional limit
});

const chatListQuerySchema = Type.Composite([chatListOptionsQuerySchema, listLimitQuerySchema]);
const listCursorQuerySchema = Type.Composite([Type.Object({ cursor: cursorParamSchema }), listLimitQuerySchema]);

export const getChatsInputSchema = Type.Union([chatListQuerySchema, listCursorQuerySchema]);

export const getChatsResponseSchema = Type.Object({
  object: Type.Literal('ChatList'),
  items: Type.Array(chatSchema),
  cursor: cursorSchema,
});

export const getChatResponseSchema = Type.Composite([
  Type.Object({
    object: Type.Literal('Chat'),
  }),
  chatSchema,
]);

export const getChatMessagesResponseSchema = getMessagesResponseSchema;

export const getChatAttendeesResponseSchema = getAllChatAttendeesResponseSchema;

export const postChatMessageResponseSchema = Type.Object({
  object: Type.Literal('MessageSent'),
});

export const getChatMessagesInputSchema = Type.Object({
  chatId: Type.String(),
  sender_id: Type.Optional(Type.String()),
  before: Type.Optional(Type.String()),
  after: Type.Optional(Type.String()),
  limit: Type.Optional(Type.Number()),
  cursor: Type.Optional(Type.String()),
});

export const postChatMessageInputSchema = Type.Object({
  chatId: Type.String(),
  text: Type.String(),
  thread_id: Type.Optional(Type.String()),
});
