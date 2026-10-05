import { Static, Type } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { StringEnum, UniqueIdSchema } from '../common/common.types.js';
import { UTCDateTimeMsSchema } from '../common/date.types.js';
import { EmailSchema } from '../users/user.types.js';

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

/**
 *
 */
export const AccountCreateProxyParamsSchema = Type.Object({
  protocol: Type.Optional(StringEnum(['https', 'http', 'socks5'])),
  port: Type.Number(),
  host: Type.String(),
  username: Type.Optional(
    Type.String({
      description: 'Optional username for proxy’s authentication.',
    }),
  ),
  password: Type.Optional(
    Type.String({
      description: 'Optional password for proxy’s authentication.',
    }),
  ),
});

export const MailSyncLimitValueSchema = Type.Union([
  // UTCDateTimeMsSchema, // @todo Maybe later.
  Type.Literal('NO_HISTORY_SYNC'),
  // Type.Literal("NO_LIMIT"),
]);

export const MailSyncLimitSchema = Type.Object({
  sync_limit: Type.Optional(MailSyncLimitValueSchema),
});

export type MailSyncLimit = Static<typeof MailSyncLimitSchema>;

export const MessagingSyncLimitValueSchema = Type.Union(
  [
    UTCDateTimeMsSchema,
    Type.Number({
      minimum: 0,
      description: 'The quantity of data that should be synced from data history. 0 will not sync history.',
    }),
  ],
  {
    description: 'Either a UTC Datetime to start sync from, or a quantity of data.',
  },
);

export const MessagingSyncLimitSchema = Type.Object({
  sync_limit: Type.Optional(
    Type.Object(
      {
        chats: Type.Optional(MessagingSyncLimitValueSchema),
        messages: Type.Optional(MessagingSyncLimitValueSchema),
      },
      {
        description:
          'Set a sync limit either for chats, messages or both. Chats limit will apply to each inbox, whereas messages limit will apply to each chat. No value will not apply any limit (default behaviour). Providers partial support.',
      },
    ),
  ),
});

export type MessagingSyncLimit = Static<typeof MessagingSyncLimitSchema>;

/**
 *
 */
export const AccountCreateBaseSchema = Type.Object({
  ip: Type.Optional(
    Type.String({
      description: 'IP address to associate with the account connection.',
    }),
  ),
  disabled_features: Type.Optional(
    Type.Array(StringEnum(['linkedin_recruiter', 'linkedin_sales_navigator', 'linkedin_organizations_mailboxes']), {
      description: 'An array of features that should be disabled for this account.',
    }),
  ),
});

/**
 * Imap Mail body schema
 */
export const AccountCreateImapMailBodySchema = Type.Composite(
  [
    AccountCreateBaseSchema,
    MailSyncLimitSchema,
    Type.Object({
      provider: Type.Union([Type.Literal('MAIL')]),
      imap_user: EmailSchema,
      smtp_user: EmailSchema,
      imap_password: Type.String(),
      smtp_password: Type.String(),
      imap_host: Type.String(),
      imap_port: Type.Number(),
      smtp_host: Type.String(),
      smtp_port: Type.Number(),
      imap_encryption: Type.String(),
    }),
  ],
  { title: 'IMAP' },
);

/**
 * Google oauth body schema
 */
export const AccountCreateGoogleOauthBodySchema = Type.Composite(
  [
    AccountCreateBaseSchema,
    MailSyncLimitSchema,
    Type.Object({
      provider: Type.Literal('GOOGLE_OAUTH'),
      refresh_token: Type.String(),
      access_token: Type.String(),
    }),
  ],
  { title: 'Gmail' },
);

/**
 * Outlook oauth body schema
 */
export const AccountCreateOutlookBodySchema = Type.Composite(
  [
    AccountCreateBaseSchema,
    MailSyncLimitSchema,
    Type.Object({
      provider: Type.Literal('OUTLOOK'),
      refresh_token: Type.String(),
      access_token: Type.String(),
      username: Type.String(),
      id: Type.String(),
    }),
  ],
  { title: 'Outlook' },
);

/**
 * Linkedin body schema
 */

export const AccountCreateLinkedinBaseBodySchema = Type.Composite([
  AccountCreateBaseSchema,
  MessagingSyncLimitSchema,
  Type.Object({
    provider: Type.Literal('LINKEDIN'),
    proxy: Type.Optional(AccountCreateProxyParamsSchema),
    user_agent: Type.Optional(
      Type.String({
        description: `If encountering disconnection issues, enter the exact user agent of the browser on which the account has been connected. You can easily retrieve it in the browser's console with this command : "console.log(navigator.userAgent)"`,
      }),
    ),
    recruiter_contract_id: Type.Optional(
      Type.String({
        description: 'The contract that should be used with Linkedin Recruiter.',
      }),
    ),
  }),
]);

export const isLinkedinUsernameValid = (value: string) => /(^\S+@\S+$)|(^\+?(\d|\s)+$)/gm.test(value);

export const AccountCreateLinkedinBasicBodySchema = Type.Composite(
  [
    AccountCreateLinkedinBaseBodySchema,
    Type.Object({
      username: Type.String({
        description: 'Should be either an email address or a phone number.',
      }),
      password: Type.String(),
    }),
  ],
  {
    title: 'Basic authentication',
    description: 'Authenticate using your username and password',
  },
);
export const AccountCreateLinkedinCookieBodySchema = Type.Composite(
  [
    AccountCreateLinkedinBaseBodySchema,
    Type.Object({
      access_token: Type.String({
        description: 'Linkedin access token, which is to be found under the key "li_at".',
      }),
      premium_token: Type.Optional(
        Type.String({
          description:
            'Linkedin Recruiter/Sales Navigator authentication cookie, which is to be found under the key "li_a". It should be used if you need to be logged to an existing session. It not provided, a new session will be started.',
        }),
      ),
    }),
  ],
  {
    title: 'Cookie authentication',
    description: 'Authenticate using cookies',
  },
);

export const AccountCreateLinkedinBodySchema = Type.Union([
  AccountCreateLinkedinBasicBodySchema,
  AccountCreateLinkedinCookieBodySchema,
]);

/**
 * Whatsapp body schema
 */
export const AccountCreateWhatsappBodySchema = Type.Composite(
  [AccountCreateBaseSchema, Type.Object({ provider: Type.Literal('WHATSAPP') })],
  {
    title: 'Whatsapp',
    description:
      'You just need to set the provider parameter to "WHATSAPP" to begin the authentication. In response, you will receive a string which needs to be converted to a QR code and scanned to complete the authentication.',
  },
);

export const AccountCreateTelegramBodySchema = Type.Composite(
  [AccountCreateBaseSchema, Type.Object({ provider: Type.Literal('TELEGRAM') })],
  {
    title: 'Telegram',
    description:
      'You just need to set the provider parameter to "TELEGRAM" to begin the authentication. In response, you will receive a string which needs to be converted to a QR code and scanned to complete the authentication.',
  },
);

export const AccountCreateInstagramBodySchema = Type.Composite(
  [
    AccountCreateBaseSchema,
    MessagingSyncLimitSchema,
    Type.Object({
      provider: Type.Literal('INSTAGRAM'),
      username: Type.String({
        description: 'Your Instagram username.',
      }),
      password: Type.String({
        description: 'Your Instagram password.',
      }),
      user_agent: Type.Optional(
        Type.String({
          description: `If encountering disconnection issues, enter the exact user agent of the browser on which the account has been connected. You can easily retrieve it in the browser's console with this command : "console.log(navigator.userAgent)"`,
        }),
      ),
    }),
  ],
  { title: 'Instagram' },
);

export const AccountCreateMessengerBodySchema = Type.Composite(
  [
    AccountCreateBaseSchema,
    MessagingSyncLimitSchema,
    Type.Object({
      provider: Type.Literal('MESSENGER'),
      username: Type.String(),
      password: Type.String(),
    }),
  ],
  { title: 'Messenger' },
);

export const AccountCreateTwitterBodySchema = Type.Composite(
  [
    AccountCreateBaseSchema,
    Type.Object({
      provider: Type.Literal('TWITTER'),
      username: Type.String(),
      email: EmailSchema,
      password: Type.String(),
    }),
  ],
  { title: 'Twitter' },
);

/**
 *
 */
export const AccountCreateBodySchema = Type.Union([
  AccountCreateLinkedinBodySchema,
  AccountCreateWhatsappBodySchema,
  AccountCreateInstagramBodySchema,
  AccountCreateMessengerBodySchema,
  AccountCreateImapMailBodySchema,
  AccountCreateGoogleOauthBodySchema,
  AccountCreateTelegramBodySchema,
  AccountCreateOutlookBodySchema,
  AccountCreateTwitterBodySchema,
  // AccountCreateImapMailBodySchema,
  // AccountCreateMicrosoftMailBodySchema,
]);

export type AccountCreateBody = Static<typeof AccountCreateBodySchema>;

/**
 *
 */
export const AccountCreateBodyValidator = TypeCompiler.Compile(AccountCreateBodySchema);

// /**
//  *
//  */
// export const getAccountCreateBodyOpenApiSchema = makeOpenApiSchemaGetter(
//   AccountCreateBodySchema
// );

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 * Global schema for every account when final creation step is done
 */
export const AccountCreatedApiResponseSchema = Type.Object({
  object: Type.Literal('AccountCreated'),
  account_id: UniqueIdSchema,
});

export type AccountCreatedApiResponse = Static<typeof AccountCreatedApiResponseSchema>;

// /**
//  *
//  */
// export const getAccountCreatedResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   AccountCreatedApiResponseSchema
// );

/**
 *
 */
export const AccountCreateCheckpointApiResponseSchema = Type.Object({
  object: Type.Literal('Checkpoint'),
  account_id: UniqueIdSchema,
  checkpoint: Type.Union([
    Type.Object(
      {
        type: Type.Literal('QRCODE'),
        qrcode: Type.String({
          description: 'This string needs to be converted into a QR code and scanned to complete the authentication.',
        }),
      },
      {
        title: 'QR code',
      },
    ),
    Type.Object(
      {
        type: Type.Literal('2FA', {
          description:
            'You need to provide a code to solve this checkpoint. You can use the route "Solve a code checkpoint" to do it.',
        }),
        source: Type.Optional(
          Type.Union([
            Type.Literal('SMS', {
              description: 'The code has been sent via SMS.',
            }),
            Type.Literal('APP', {
              description: 'The code is available on your authentication app.',
            }),
          ]),
        ),
      },
      {
        title: '2FA',
      },
    ),
    Type.Object(
      {
        type: Type.Literal('OTP', {
          description:
            'You need to provide a code to solve this checkpoint. You can use the route "Solve a code checkpoint" to do it.',
        }),
      },
      {
        title: 'OTP',
      },
    ),
    Type.Object(
      {
        type: Type.Literal('PHONE_REGISTER', {
          description:
            'You need to provide a mobile phone number to receive a 2FA code. You can use the route "Solve a code checkpoint" to do it.',
        }),
      },
      {
        title: 'PHONE_REGISTER',
      },
    ),
    Type.Object(
      {
        type: Type.Literal('IN_APP_VALIDATION', {
          description: 'You need to perform an action in the provider’s app to solve this checkpoint.',
        }),
      },
      { title: 'IN_APP_VALIDATION' },
    ),
    Type.Object(
      {
        type: Type.Literal('CAPTCHA', {
          description: 'The captcha could not be solved by our automatized services.',
        }),
        public_key: Type.Optional(
          Type.String({
            description: 'The public key of the provider for on-device resolution (Arkose Labs captcha).',
          }),
        ),
        data: Type.Optional(
          Type.String({
            description: 'The data payload of the provider for on-device resolution (Arkose Labs captcha).',
          }),
        ),
      },
      { title: 'CAPTCHA' },
    ),
    Type.Object(
      {
        type: Type.Literal('CONTRACT_CHOOSER', {
          description: 'Gives options to pick the contract you need Recruiter to be connected to.',
        }),
        contract_options: Type.Array(Type.Object({ id: Type.String(), name: Type.String() })),
      },
      { title: 'CONTRACT_CHOOSER' },
    ),
  ]),
});

export type AccountCreateCheckpointApiResponse = Static<typeof AccountCreateCheckpointApiResponseSchema>;

// /**
//  *
//  */
// export const getAccountCreateCheckpointResponseOpenApiSchema =
//   makeOpenApiSchemaGetter(AccountCreateCheckpointApiResponseSchema);

/**  */
export const AccountConnectApiResponseSchema = Type.Union([
  AccountCreatedApiResponseSchema,
  AccountCreateCheckpointApiResponseSchema,
]);

export type AccountConnectApiResponse = Static<typeof AccountConnectApiResponseSchema>;

/**  */
export const AccountConnectApiResponseValidator = TypeCompiler.Compile(AccountConnectApiResponseSchema);
