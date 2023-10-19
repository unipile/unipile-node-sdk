import { Type } from '@sinclair/typebox';

const MessageEventTypeSchema = Type.Enum({
  UNKNOWN: 0,
  REACTION: 1,
  REACTION_TO_ME: 2,
  GROUP_CREATE: 3,
  GROUP_CHANGE_SUBJECT: 4,
  GROUP_PARTICIPANT_ADD: 5,
  GROUP_PARTICIPANT_REMOVE: 6,
  GROUP_PARTICIPANT_LEAVE: 7,
  CALL_MISSED_VOICE: 8,
  CALL_MISSED_VIDEO: 9,
});

const MessageReactionSchema = Type.Object({
  value: Type.String(),
  sender_id: Type.String(),
  is_sender: Type.Boolean(),
});

const MessageAttachmentSize = Type.Object({
  width: Type.Number(),
  height: Type.Number(),
});

const BaseMessageAttachmentSchema = Type.Object({
  id: Type.String(),
  file_size: Type.Optional(Type.Number()),
  unavailable: Type.Boolean(),
  mimetype: Type.Optional(Type.String()),
  url: Type.Optional(Type.String()),
});

const MessageImageAttachmentSchema = Type.Composite([
  BaseMessageAttachmentSchema,
  Type.Object({
    type: Type.Literal('img'),
    size: MessageAttachmentSize,
    sticker: Type.Boolean(),
  }),
]);

const MessageVideoAttachmentSchema = Type.Composite([
  BaseMessageAttachmentSchema,
  Type.Object({
    type: Type.Literal('video'),
    size: MessageAttachmentSize,
    gif: Type.Boolean(),
  }),
]);

const MessageAudioAttachmentSchema = Type.Composite([
  BaseMessageAttachmentSchema,
  Type.Object({
    type: Type.Literal('audio'),
    duration: Type.Optional(Type.Number()),
    voice_note: Type.Boolean(),
  }),
]);

const MessageFileAttachmentSchema = Type.Composite([
  BaseMessageAttachmentSchema,
  Type.Object({
    type: Type.Literal('file'),
    file_name: Type.String(),
  }),
]);

const MessageLinkAttachmentSchema = Type.Composite([
  BaseMessageAttachmentSchema,
  Type.Object({
    type: Type.Literal('linkedin_post'),
  }),
]);

const MessageAttachmentSchema = Type.Union([
  MessageImageAttachmentSchema,
  MessageVideoAttachmentSchema,
  MessageAudioAttachmentSchema,
  MessageFileAttachmentSchema,
  MessageLinkAttachmentSchema,
]);

const BaseMessageSchema = Type.Object({
  provider_id: Type.String(),
  sender_id: Type.String(),
  text: Type.Union([Type.String(), Type.Null()]),
  attachments: Type.Array(MessageAttachmentSchema),
});

export const messageSchema = Type.Composite([
  BaseMessageSchema,
  Type.Object({
    id: Type.String(),
    account_id: Type.String(),
    chat_id: Type.String(),
    chat_provider_id: Type.String(),
    timestamp: Type.String(),
    is_sender: Type.Union([Type.Literal(0), Type.Literal(1)]),
    quoted: Type.Optional(BaseMessageSchema),
    reactions: Type.Array(MessageReactionSchema),
    seen: Type.Union([Type.Literal(0), Type.Literal(1)]),
    seen_by: Type.Record(Type.String(), Type.Union([Type.String(), Type.Boolean()])),
    hidden: Type.Union([Type.Literal(0), Type.Literal(1)]),
    deleted: Type.Union([Type.Literal(0), Type.Literal(1)]),
    edited: Type.Union([Type.Literal(0), Type.Literal(1)]),
    is_event: Type.Union([Type.Literal(0), Type.Literal(1)]),
    delivered: Type.Union([Type.Literal(0), Type.Literal(1)]),
    behavior: Type.Union([Type.Enum({ SILENT: 0 }), Type.Null()]),
    event_type: Type.Optional(MessageEventTypeSchema),
    original: Type.String(),
    replies: Type.Optional(Type.Number()),
    reply_by: Type.Optional(Type.Array(Type.String())),
    parent: Type.Optional(Type.String()),
  }),
]);

export const getMessageResponseSchema = Type.Composite([
  Type.Object({
    object: Type.Literal('Message'),
  }),
  messageSchema,
]);

export const getMessagesResponseSchema = Type.Object({
  object: Type.Literal('MessageList'),
  items: Type.Array(Type.Composite([Type.Object({ object: Type.Literal('Message') }), messageSchema])),
  cursor: Type.Union([Type.String(), Type.Null()]),
});

export const getMessageAttachementResponseSchema = Type.Any();
