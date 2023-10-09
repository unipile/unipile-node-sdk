import { Type } from '@sinclair/typebox';

export const cursorParamSchema = Type.String({
  minLength: 1,
});

export const listLimitQuerySchema = Type.Object({
  limit: Type.Optional(
    Type.Integer({
      minimum: 1,
      maximum: 250,
      default: 100,
    }),
  ),
});
