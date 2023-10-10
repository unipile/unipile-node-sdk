import { Type } from '@sinclair/typebox';

export const postHostedAuthLinkResponseSchema = Type.Object({
  object: Type.Literal('HostedAuthURL'),
  url: Type.String(),
});
