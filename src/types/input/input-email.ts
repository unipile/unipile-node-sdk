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

export type SendEmailInput = {
  draft_id?: string;
  account_id: string;
  subject?: string;
  body: string;
  //attachment_ids?:;
  //to
  //cc
  //bcc
};
