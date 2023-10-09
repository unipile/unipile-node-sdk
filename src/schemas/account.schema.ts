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

/* const addImapMailAccountInput = Type.Object({
  provider: Type.Union([Type.Literal('MAIL'), Type.Literal('GOOGLE'), Type.Literal('ICLOUD')]),
  email: Type.String(),
  password: Type.String(),
  connection_params: Type.Optional(
    Type.Object({
      imap_host: Type.String(),
      imap_port: Type.Number(),
      smtp_host: Type.String(),
      smtp_port: Type.Number(),
    }),
  ),
}); */

/* const addMicrosoftMailAccountInput = Type.Object({
  provider: Type.Literal('OUTLOOK'),
  username: Type.String(),
  password: Type.String(),
}); */

const addWhatsappAccountInput = Type.Object({
  provider: Type.Literal('WHATSAPP'),
});

/**
 * Inputs
 */
export const getAccountsInputSchema = Type.Optional(
  Type.Object({
    limit: Type.Optional(Type.Integer()),
    cursor: Type.Optional(Type.String()),
  }),
);

export const postAccountInputSchema = Type.Union([
  //addLinkedinAccountInput,
  addWhatsappAccountInput,
  //addImapMailAccountInput,
  //addMicrosoftMailAccountInput,
]);

export const postCodeCheckpointInputSchema = Type.Object({
  provider: Type.Union([Type.Literal('LINKEDIN')]),
  account_id: Type.String(),
  code: Type.String(),
});
