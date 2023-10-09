import { Static } from '@sinclair/typebox';
import { postAccountOutputSchema } from '../schemas/index.js';

// ACCOUNT
export type PostAccount = Static<typeof postAccountOutputSchema>;
export type PostWhatsappAccount = { qrCodeBuffer: Buffer; qrCodeString: string };
