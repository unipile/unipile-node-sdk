import {
  GetAllAttendeesInput,
  GetAllChatsInput,
  GetAllMessagesFromChatInput,
  GetAllMessagesInput,
  GetMessageAttachementInput,
  PostMessageInput,
  RequestOptions,
  untypedYetValidator,
  UnipileClient,
  GetAllMessagesFromAttendeeInput,
  GetAllChatsFromAttendeeInput,
  PostNewChatInput,
  PerformActionInput,
  isLinkedinClassicPostNewChatInputOptions,
  isLinkedinRecruiterPostNewChatInputOptions,
} from '../index.js';
import { ChatListApiResponse, ChatListApiResponseValidator } from '../messaging/chats/chats-list.types.js';
import { ChatResponse, ChatResponseValidator } from '../messaging/chats/chat.types.js';
import { MessageListApiResponse, MessageListApiResponseValidator } from '../messaging/messages/message-list.types.js';
import { MessageSentResponse, MessageSentResponseValidator } from '../messaging/messages/message-send.types.js';
import { ChatStartedApiResponse, ChatStartedApiResponseValidator } from '../messaging/chats/chat-start.types.js';
import {
  ChatAttendeeByChatListApiResponse,
  ChatAttendeeByChatListApiResponseValidator,
  ChatAttendeeListApiResponse,
  ChatAttendeeListApiResponseValidator,
} from '../messaging/chat-attendees/chat-attendees-list.types.js';
import { MessageResponse, MessageResponseValidator } from '../messaging/messages/message.types.js';
import { ChatAttendeeResponse, ChatAttendeeResponseValidator } from '../messaging/chat-attendees/chat-attendee.types.js';
import { ChatPatchedApiResponse, ChatPatchedApiResponseValidator } from '../messaging/chats/chat-patch.types.js';

export class MessagingResource {
  constructor(private client: UnipileClient) {}

  async getAllChats(input: GetAllChatsInput = {}, options?: RequestOptions): Promise<ChatListApiResponse> {
    const { before, after, limit, account_type, account_id, cursor, unread } = input;

    const parameters: Record<string, string | string[]> = { ...options?.extra_params };
    if (before) parameters.before = before;
    if (after) parameters.after = after;
    if (limit) parameters.limit = String(limit);
    if (account_type) parameters.account_type = account_type;
    if (account_id) parameters.account_id = account_id;
    if (cursor) parameters.cursor = cursor;
    if (unread !== undefined) parameters.unread = unread ? 'true' : 'false';

    return await this.client.request.send({
      path: ['chats'],
      method: 'GET',
      options,
      parameters,
      validator: ChatListApiResponseValidator,
    });
  }

  async getChat(chatId: string, options?: RequestOptions): Promise<ChatResponse> {
    return await this.client.request.send({
      path: ['chats', chatId],
      method: 'GET',
      options,
      ...(options?.extra_params && { parameters: options.extra_params }),
      validator: ChatResponseValidator,
    });
  }

  async getAllMessagesFromChat(input: GetAllMessagesFromChatInput, options?: RequestOptions): Promise<MessageListApiResponse> {
    const { chat_id, sender_id, before, after, limit, cursor } = input;

    const parameters: Record<string, string | string[]> = { ...options?.extra_params };
    if (sender_id) parameters.sender_id = sender_id;
    if (before) parameters.before = before;
    if (after) parameters.after = after;
    if (limit) parameters.limit = String(limit);
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['chats', chat_id, 'messages'],
      method: 'GET',
      parameters,
      options,
      validator: MessageListApiResponseValidator,
    });
  }

  async sendMessage(input: PostMessageInput, options?: RequestOptions): Promise<MessageSentResponse> {
    const { chat_id, text, thread_id, attachments } = input;
    const body = new FormData();

    body.append('text', text);
    if (thread_id) body.append('thread_id', thread_id);

    if (attachments !== undefined) {
      for (const [filename, buffer] of attachments) {
        body.append('attachments', new Blob([buffer]), filename);
      }
    }

    if (options?.extra_params) {
      Object.entries(options.extra_params).forEach(([k, v]) => {
        if (!body.has(k)) {
          const values = Array.isArray(v) ? v : [v];
          values.forEach((item) => body.append(k, item));
        }
      });
    }

    return await this.client.request.send({
      path: ['chats', chat_id, 'messages'],
      method: 'POST',
      body,
      headers: {},
      options,
      validator: MessageSentResponseValidator,
    });
  }

  async startNewChat(input: PostNewChatInput, options?: RequestOptions): Promise<ChatStartedApiResponse> {
    const { account_id, text, subject, options: input_options, attendees_ids, attachments } = input;
    const body = new FormData();

    body.append('account_id', account_id);
    body.append('text', text);
    for (const id of attendees_ids) body.append('attendees_ids', id);

    if (subject) body.append('subject', subject);

    if (input_options) {
      if (input_options.linkedin) {
        if (input_options.linkedin.api !== undefined) {
          body.append('linkedin[api]', input_options.linkedin.api);
        }

        if (isLinkedinClassicPostNewChatInputOptions(input_options.linkedin)) {
          if (input_options.linkedin.inmail !== undefined) {
            body.append('linkedin[inmail]', input_options.linkedin.inmail ? 'true' : 'false');
          }
        }

        if (isLinkedinRecruiterPostNewChatInputOptions(input_options.linkedin)) {
          if (input_options.linkedin.signature !== undefined) {
            body.append('linkedin[signature]', input_options.linkedin.signature);
          }

          if (input_options.linkedin.hiring_project_id !== undefined) {
            body.append('linkedin[hiring_project_id]', input_options.linkedin.hiring_project_id);
          }

          if (input_options.linkedin.email_address !== undefined) {
            body.append('linkedin[email_address]', input_options.linkedin.email_address);
          }
        }
      }
    }

    if (attachments !== undefined) {
      for (const [filename, buffer] of attachments) {
        body.append('attachments', new Blob([buffer]), filename);
      }
    }

    if (options?.extra_params) {
      Object.entries(options.extra_params).forEach(([k, v]) => {
        if (!body.has(k)) {
          const values = Array.isArray(v) ? v : [v];
          values.forEach((item) => body.append(k, item));
        }
      });
    }

    return await this.client.request.send({
      path: ['chats'],
      method: 'POST',
      body,
      headers: {},
      options,
      validator: ChatStartedApiResponseValidator,
    });
  }

  async getAllAttendeesFromChat(chat_id: string, options?: RequestOptions): Promise<ChatAttendeeByChatListApiResponse> {
    return await this.client.request.send({
      path: ['chats', chat_id, 'attendees'],
      method: 'GET',
      options,
      ...(options?.extra_params && { parameters: options.extra_params }),
      validator: ChatAttendeeByChatListApiResponseValidator,
    });
  }

  async getMessage(message_id: string, options?: RequestOptions): Promise<MessageResponse> {
    return await this.client.request.send({
      path: ['messages', message_id],
      method: 'GET',
      options,
      ...(options?.extra_params && { parameters: options.extra_params }),
      validator: MessageResponseValidator,
    });
  }

  async getAllMessages(input: GetAllMessagesInput = {}, options?: RequestOptions): Promise<MessageListApiResponse> {
    const { before, after, limit, sender_id, account_id, cursor } = input;

    const parameters: Record<string, string> = {...options?.extra_params };
    if (before) parameters.before = before;
    if (after) parameters.after = after;
    if (limit) parameters.limit = String(limit);
    if (sender_id) parameters.sender_id = sender_id;
    if (account_id) parameters.account_id = account_id;
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['messages'],
      method: 'GET',
      parameters,
      options,
      validator: MessageListApiResponseValidator,
    });
  }

  async getAllMessagesFromAttendee(
    input: GetAllMessagesFromAttendeeInput,
    options?: RequestOptions,
  ): Promise<MessageListApiResponse> {
    const { attendee_id, cursor, before, after, limit } = input;

    const parameters: Record<string, string | string[]> = { ...options?.extra_params };
    if (cursor) parameters.cursor = cursor;
    if (before) parameters.before = before;
    if (after) parameters.after = after;
    if (limit) parameters.limit = String(limit);

    return await this.client.request.send({
      path: ['chat_attendees', attendee_id, 'messages'],
      method: 'GET',
      parameters,
      options,
      validator: MessageListApiResponseValidator,
    });
  }

  async getAllChatsFromAttendee(input: GetAllChatsFromAttendeeInput, options?: RequestOptions): Promise<ChatListApiResponse> {
    const { attendee_id, cursor, before, after, limit, account_id } = input;

    const parameters: Record<string, string | string[]> = { ...options?.extra_params };
    if (cursor) parameters.cursor = cursor;
    if (before) parameters.before = before;
    if (after) parameters.after = after;
    if (limit) parameters.limit = String(limit);
    if (account_id) parameters.account_id = account_id;

    return await this.client.request.send({
      path: ['chat_attendees', attendee_id, 'chats'],
      method: 'GET',
      parameters,
      options,
      validator: ChatListApiResponseValidator,
    });
  }

  async getMessageAttachment(input: GetMessageAttachementInput, options?: RequestOptions): Promise<Blob> {
    const { message_id, attachment_id } = input;

    return await this.client.request.send({
      path: ['messages', message_id, 'attachments', attachment_id],
      method: 'GET',
      options,
      ...(options?.extra_params && { parameters: options.extra_params }),
      validator: untypedYetValidator,
    });
  }

  async getAllAttendees(input: GetAllAttendeesInput = {}, options?: RequestOptions): Promise<ChatAttendeeListApiResponse> {
    const { cursor, limit, account_id } = input;

    const parameters: Record<string, string | string[]> = { ...options?.extra_params };
    if (cursor) parameters.cursor = cursor;
    if (limit) parameters.limit = String(limit);
    if (account_id) parameters.account_id = account_id;

    return await this.client.request.send({
      path: ['chat_attendees'],
      method: 'GET',
      parameters,
      options,
      validator: ChatAttendeeListApiResponseValidator,
    });
  }

  async getAttendee(attendee_id: string, options?: RequestOptions): Promise<ChatAttendeeResponse> {
    return await this.client.request.send({
      path: ['chat_attendees', attendee_id],
      method: 'GET',
      options,
      ...(options?.extra_params && { parameters: options.extra_params }),
      validator: ChatAttendeeResponseValidator,
    });
  }

  async setChatStatus(input: PerformActionInput, options?: RequestOptions): Promise<ChatPatchedApiResponse> {
    const { chat_id, action, value } = input;

    const body = {
      ...options?.extra_params,
      action,
      value,
    };

    return await this.client.request.send({
      path: ['chats', chat_id],
      method: 'PATCH',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: ChatPatchedApiResponseValidator,
    });
  }
}
