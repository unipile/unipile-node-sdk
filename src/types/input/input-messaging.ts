export type GetAllChatsInput = {
  before?: string;
  after?: string;
  limit?: number;
  account_type?: string;
  account_id?: string;
};

export type GetAllMessagesFromChatInput = {
  chat_id: string;
  cursor?: string;
  before?: string;
  after?: string;
  limit?: number;
  sender_id?: string;
};

export type PostMessageInput = {
  chat_id: string;
  text: string;
  thread_id?: string;
};
