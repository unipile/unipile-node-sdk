import { UnipileClient } from '../client.js';
import {
  GetAllAttendeesInput,
  GetAllChatsInput,
  GetAllMessagesFromChatInput,
  GetAllMessagesInput,
  GetMessageAttachementInput,
  PostMessageInput,
  RequestOptions,
  Response,
} from '../types/index.js';
import { getMessageValidator, untypedYetValidator } from '../validation.js';

export class MessagingResource {
  constructor(private client: UnipileClient) {}

  async getAllChats(input: GetAllChatsInput = {}, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { before, after, limit, account_type, account_id } = input;

    const parameters: Record<string, string> = {};
    if (before) parameters.before = before;
    if (after) parameters.after = after;
    if (limit) parameters.limit = String(limit);
    if (account_type) parameters.account_type = account_type;
    if (account_id) parameters.account_id = account_id;

    return await this.client.request.send({
      path: ['chats'],
      method: 'GET',
      options,
      parameters,
      validator: untypedYetValidator,
    });
  }

  async getChat(chatId: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['chats', chatId],
      method: 'GET',
      options,
      validator: untypedYetValidator,
    });
  }

  async getAllMessagesFromChat(input: GetAllMessagesFromChatInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { chat_id, sender_id, before, after, limit, cursor } = input;

    const parameters: Record<string, string> = {};
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
      validator: untypedYetValidator,
    });
  }

  async sendMessage(input: PostMessageInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { chat_id, text, thread_id } = input;
    const body = {
      text,
      thread_id,
    };

    return await this.client.request.send({
      path: ['chats', chat_id, 'messages'],
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async getAllAttendeesFromChat(chat_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['chats', chat_id, 'attendees'],
      method: 'GET',
      options,
      validator: untypedYetValidator,
    });
  }

  async getMessage(message_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['messages', message_id],
      method: 'GET',
      options,
      validator: getMessageValidator,
    });
  }

  async getAllMessages(input: GetAllMessagesInput = {}, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { before, after, limit, sender_id, account_id } = input;

    const parameters: Record<string, string> = {};
    if (before) parameters.before = before;
    if (after) parameters.after = after;
    if (limit) parameters.limit = String(limit);
    if (sender_id) parameters.sender_id = sender_id;
    if (account_id) parameters.account_id = account_id;

    return await this.client.request.send({
      path: ['messages'],
      method: 'GET',
      parameters,
      options,
      validator: untypedYetValidator,
    });
  }

  async getMessageAttachment(input: GetMessageAttachementInput, options?: RequestOptions): Promise<Blob> {
    const { message_id, attachment_id } = input;

    return await this.client.request.send({
      path: ['messages', message_id, 'attachments', attachment_id],
      method: 'GET',
      options,
      validator: untypedYetValidator,
    });
  }

  async getAllAttendees(input: GetAllAttendeesInput = {}, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { cursor, limit, account_id } = input;

    const parameters: Record<string, string> = {};
    if (cursor) parameters.cursor = cursor;
    if (limit) parameters.limit = String(limit);
    if (account_id) parameters.account_id = account_id;

    return await this.client.request.send({
      path: ['chat_attendees'],
      method: 'GET',
      parameters,
      options,
      validator: untypedYetValidator,
    });
  }

  async getAttendee(attendee_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['chat_attendees', attendee_id],
      method: 'GET',
      options,
      validator: untypedYetValidator,
    });
  }
}
