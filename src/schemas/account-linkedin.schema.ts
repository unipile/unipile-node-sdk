import { Type } from '@sinclair/typebox';

const proxyParams = Type.Object({
  protocol: Type.Optional(Type.Union([Type.Literal('https'), Type.Literal('http'), Type.Literal('socks5')])),
  port: Type.Number(),
  host: Type.String(),
  username: Type.Optional(Type.String()),
  password: Type.Optional(Type.String()),
});

export const postLinkedinAccountInput = Type.Union([
  Type.Object({
    proxy: Type.Optional(proxyParams),
    access_token: Type.String(),
    csrf_token: Type.String(),
  }),
  Type.Object({
    proxy: Type.Optional(proxyParams),
    username: Type.String(),
    password: Type.String(),
  }),
]);
