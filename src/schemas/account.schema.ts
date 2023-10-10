import { Type } from '@sinclair/typebox';
import { uniqueIdSchema } from './utils.schema.js';

const account = Type.Object({
  id: Type.String(),
  type: Type.String(),
  name: Type.String(),
  created_at: Type.String(),
});

export const getAccountsResponseSchema = Type.Object({
  object: Type.Literal('AccountList'),
  items: Type.Array(
    Type.Composite([
      Type.Object({
        object: Type.Literal('Account'),
      }),
      account,
    ]),
  ),
});

export const getAccountSourceStatusResponseSchema = Type.Object({
  object: Type.Literal('AccountSourceStatus'),
  status: Type.Union([
    Type.Literal('OK'),
    Type.Literal('STOPPED'),
    Type.Literal('ERROR'),
    Type.Literal('CREDENTIALS'),
    Type.Literal('PERMISSIONS'),
    Type.Literal('CONNECTING'),
  ]),
});

const accountCreatedApiResponseSchema = Type.Object({
  object: Type.Literal('AccountCreated'),
  account_id: Type.String(),
});

const whatsappOnGoingAccountCreatedApiResponseSchema = Type.Object({
  object: Type.Literal('QrCode'),
  account_id: uniqueIdSchema,
  qrcode: Type.String(),
});

export const postAccountResponseSchema = Type.Union([
  accountCreatedApiResponseSchema,
  whatsappOnGoingAccountCreatedApiResponseSchema,
]);

export const postAccountOutputSchema = Type.Union([
  accountCreatedApiResponseSchema,
  Type.Composite([whatsappOnGoingAccountCreatedApiResponseSchema, Type.Object({ qrcodeImage: Type.String() })]),
]);

export const deleteAccountResponseSchema = Type.Object({
  object: Type.Literal('AccountDeleted'),
});
