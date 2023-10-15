import { Static } from '@sinclair/typebox';
import { postAccountOutputSchema } from '../schemas/index.js';

// ACCOUNT
export type PostAccount = Static<typeof postAccountOutputSchema>;
export type PostWhatsappAccount = {
  qrCodeString: string;
  code: string;
};
