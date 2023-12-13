import { SupportedProvider } from '../client.js';

export type GetAllChatsInput = {
  before?: string;
  after?: string;
  limit?: number;
  account_type?: SupportedProvider;
  account_id?: string;
  cursor?: string;
};

export type GetAllMessagesInput = {
  before?: string;
  after?: string;
  limit?: number;
  sender_id?: string;
  account_id?: string;
  cursor?: string;
};

export type GetAllMessagesFromChatInput = {
  chat_id: string;
  cursor?: string;
  before?: string;
  after?: string;
  limit?: number;
  sender_id?: string;
};

export type GetAllMessagesFromAttendeeInput = {
  attendee_id: string;
  cursor?: string;
  before?: string;
  after?: string;
  limit?: number;
};

export type GetAllChatsFromAttendeeInput = {
  attendee_id: string;
  cursor?: string;
  before?: string;
  after?: string;
  limit?: number;
  account_id?: string;
};

export type PostMessageInput = {
  chat_id: string;
  text: string;
  thread_id?: string;
  attachments?: Array<[string, Buffer]>;
};

export type PostNewChatInput = {
  account_id: string;
  text: string;
  attendees_ids: string;
  title?: string;
  inmail?: string;
  attachments?: Array<[string, Buffer]>;
};

export type GetMessageAttachementInput = {
  message_id: string;
  attachment_id: string;
};

export type GetAllAttendeesInput = {
  cursor?: string;
  limit?: number;
  account_id?: string;
};
