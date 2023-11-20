export type GetProfileInput = {
  account_id: string;
  identifier: string;
};

export type PostInvitationInput = {
  account_id: string;
  provider_id: string;
  message?: string;
};
