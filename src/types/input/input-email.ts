export type GetAllEmailsInput = {
  account_id?: string;
  role?: string;
  folder?: string;
  from?: string;
  to?: string;
  any_email?: string;
  before?: string;
  after?: string;
  limit?: number;
  cursor?: string;
};

export type MoveEmailInput = {
  email_id: string;
  action: 'move' | 'archive';
  folder?: string;
};

export type GetAllFoldersInput = {
  account_id?: string;
};

type MailAttendee = Array<{ display_name?: string; identifier: string }>;

export type SendEmailInput = {
  account_id: string;
  to: MailAttendee;
  cc?: MailAttendee;
  bcc?: MailAttendee;
  subject?: string;
  draft_id?: string;
  body: string;
  attachments?: Array<[string, Buffer]>;
};
