import { Type } from '@sinclair/typebox';

const hostedAuthLinkProviderSupportedSchema = Type.Union([Type.Literal('LINKEDIN'), Type.Literal('WHATSAPP')]);

export const postHostedAuthLinkResponseSchema = Type.Object({
  object: Type.Literal('HostedAuthURL'),
  url: Type.String(),
});

export const postHostedAuthLinkInputSchema = Type.Object({
  providers: Type.Union([Type.Array(hostedAuthLinkProviderSupportedSchema), Type.Literal('*')]),
  expiresOn: Type.String(),
});
