export type GetProfileInput = {
  account_id: string;
  identifier: string;
  linkedin_api?: string;
};

export type GetAllRelationsInput = {
  account_id: string;
  limit?: number;
  cursor?: string;
};

export type PostInvitationInput = {
  account_id: string;
  provider_id: string;
  message?: string;
};

export type GetAllPostsInput = {
  account_id: string;
  identifier: string;
  limit?: number;
  is_company?: boolean;
  cursor?: string;
};

export type GetPostInput = {
  account_id: string;
  post_id: string;
};

export type GetAllPostCommentsInput = {
  account_id: string;
  post_id: string;
  limit?: number;
  cursor?: string;
};

export type SendPostCommentInput = {
  account_id: string;
  post_id: string;
  text: string;
};

export type SendPostReactionInput = {
  account_id: string;
  post_id: string;
  reaction_type: 'like' | 'celebrate' | 'support' | 'love' | 'insightful' | 'funny';
};

export type GetAllInvitationsSentInput = {
  account_id: string;
  limit?: number;
  cursor?: string;
};

export type CancelInvitationsSentInput = {
  account_id: string;
  invitation_id: string;
};
