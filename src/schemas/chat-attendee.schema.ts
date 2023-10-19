import { Type } from '@sinclair/typebox';

const chatAttendeeSchema = Type.Object({
  id: Type.String(),
  account_id: Type.String(),
  provider_id: Type.String(),
  name: Type.String(),
  is_self: Type.Union([Type.Literal(1), Type.Literal(0)]),
  hidden: Type.Optional(Type.Union([Type.Literal(1), Type.Literal(0)])),
  picture_url: Type.Optional(Type.String()),
  profile_url: Type.Optional(Type.String()),
});

export const getAttendeeResponseSchema = Type.Composite([
  Type.Object({
    object: Type.Literal('ChatAttendee'),
  }),
  chatAttendeeSchema,
]);

export const getAllChatAttendeesResponseSchema = Type.Object({
  object: Type.Literal('ChatAttendeeList'),
  items: Type.Array(getAttendeeResponseSchema),
});
