import { Type } from '@sinclair/typebox';

export const uniqueIdSchema = Type.String();

export const cursorSchema = Type.Union([Type.String(), Type.Null()]);

export const listLimitQuerySchema = Type.Object({
  limit: Type.Optional(
    Type.Integer({
      minimum: 1,
      maximum: 250,
    }),
  ),
});

export const listCursorQuerySchema = Type.Composite([Type.Object({ cursor: cursorSchema }), listLimitQuerySchema]);

export const messagingProviderSchema = Type.Union([
  Type.Literal('WHATSAPP'),
  Type.Literal('LINKEDIN'),
  Type.Literal('SLACK'),
  Type.Literal('TWITTER'),
  Type.Literal('INSTAGRAM'),
  Type.Literal('MESSENGER'),
  Type.Literal('TELEGRAM'),
]);

export const accountSourceProviderSchema = Type.Union([
  Type.Literal('GOOGLE'),
  Type.Literal('GOOGLE_CALENDAR'),
  Type.Literal('ICLOUD'),
  Type.Literal('LINKEDIN'),
  Type.Literal('MAIL'),
  Type.Literal('MOBILE'),
  Type.Literal('OUTLOOK'),
  Type.Literal('TWITTER'),
  Type.Literal('WHATSAPP'),
  Type.Literal('SLACK'),
]);

export const UTCDateTimeMsTypeSchema = Type.String();
