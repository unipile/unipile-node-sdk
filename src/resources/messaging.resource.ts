import { UnipileClient } from '../client.js';
import { GetAllChatsInput, Input, RequestOptions, Response } from '../types/index.js';
import {
  getAttendeeValidator,
  getAttendeesValidator,
  getChatAttendeesValidator,
  getChatMessagesValidator,
  getChatValidator,
  getMessageAttachementValidator,
  getMessageValidator,
  postChatMessageValidator,
  untypedYetValidator,
} from '../validation.js';

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

  async getChat(chatId: string, options?: RequestOptions): Promise<Response.Chat> {
    return await this.client.request.send({
      path: ['chats', chatId],
      method: 'GET',
      options,
      validator: getChatValidator,
    });
  }

  async getMessagesByChat(input: Input.GetChatMessages, options?: RequestOptions): Promise<Response.ChatMessages> {
    const { chatId, sender_id, before, after, limit, cursor } = input;

    const parameters: Record<string, string> = {};
    if (sender_id) parameters.sender_id = sender_id;
    if (before) parameters.before = before;
    if (after) parameters.after = after;
    if (limit) parameters.limit = String(limit);
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['chats', chatId, 'messages'],
      method: 'GET',
      parameters,
      options,
      validator: getChatMessagesValidator,
    });
  }

  async getAttendeesByChat(chatId: string, options?: RequestOptions): Promise<Response.ChatAttendees> {
    return await this.client.request.send({
      path: ['chats', chatId, 'attendees'],
      method: 'GET',
      options,
      validator: getChatAttendeesValidator,
    });
  }

  async sendMessage(input: Input.PostChatMessage, options?: RequestOptions): Promise<Response.PostChatMessage> {
    const { chatId, text, thread_id } = input;
    const body = {
      text,
      thread_id,
    };

    return await this.client.request.send({
      path: ['chats', chatId, 'messages'],
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: postChatMessageValidator,
    });
  }

  async getAllMessages(options?: RequestOptions): Promise<Response.Messages> {
    return await this.client.request.send({
      path: ['messages'],
      method: 'GET',
      options,
      validator: getChatMessagesValidator,
    });
  }

  async getMessage(messageId: string, options?: RequestOptions): Promise<Response.Message> {
    return await this.client.request.send({
      path: ['messages', messageId],
      method: 'GET',
      options,
      validator: getMessageValidator,
    });
  }

  async getAllAttendees(input: Input.GetAttendees, options?: RequestOptions): Promise<Response.ChatAttendees> {
    const { before, after, limit, account_id, account_type } = input;

    const parameters: Record<string, string> = {};
    if (before) parameters.before = before;
    if (after) parameters.after = after;
    if (limit) parameters.limit = String(limit);
    if (account_id) parameters.account_id = account_id;
    if (account_type) parameters.account_type = account_type;

    return await this.client.request.send({
      path: ['chat-attendees'],
      method: 'GET',
      parameters,
      options,
      validator: getAttendeesValidator,
    });
  }

  async getAttendee(attendeeId: string, options?: RequestOptions): Promise<Response.Attendee> {
    return await this.client.request.send({
      path: ['chat-attendees', attendeeId],
      method: 'GET',
      options,
      validator: getAttendeeValidator,
    });
  }

  async getMessageAttachement(input: Input.GetMessageAttachement, options?: RequestOptions): Promise<Blob> {
    const { messageId, attachementId } = input;

    return await this.client.request.send({
      path: ['messages', messageId, 'attachments', attachementId],
      method: 'GET',
      options,
      validator: getMessageAttachementValidator,
    });
  }
}
