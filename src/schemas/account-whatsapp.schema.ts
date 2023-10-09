import { Type } from '@sinclair/typebox';

export const postWhatsappAccountSchema = Type.Object({
  object: Type.Literal('Checkpoint'),
  account_id: Type.String(),
  checkpoint: Type.Object({
    type: Type.Literal('QRCODE'),
    qrcode: Type.String(),
  }),
});
