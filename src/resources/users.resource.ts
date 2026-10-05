import {
  GetProfileInput,
  RequestOptions,
  UnipileClient,
  PostInvitationInput,
  GetAllPostsInput,
  GetPostInput,
  GetAllPostCommentsInput,
  SendPostCommentInput,
  SendPostReactionInput,
  GetAllInvitationsSentInput,
  CancelInvitationsSentInput,
  GetAllRelationsInput,
  CreatePostInput,
  CompanyProfileInput,
} from '../index.js';
import { LinkedinCompanyProfileApiResponse, LinkedinCompanyProfileApiResponseValidator } from '../linkedin/company.js';
import { PostCommentListApiResponse, PostCommentListApiResponseValidator } from '../posts/comment-list.types.js';
import { CommentPostResponse, CommentPostResponseValidator } from '../posts/comment-send.types.js';
import { CreatePostResponse, CreatePostResponseValidator } from '../posts/post-create.types.js';
import { AccountOwnerProfileApiResponse, AccountOwnerProfileApiResponseValidator } from '../users/account-owner-profile.js';
import { UserPostApiResponse, UserPostApiResponseValidator } from '../users/post.types.js';
import { AddPostReactionResponse, AddPostReactionResponseValidator } from '../users/reaction-add.types.js';
import {
  CancelUserInvitationApiResponse,
  CancelUserInvitationApiResponseValidator,
} from '../users/user-invitation-cancel.types.js';
import {
  UserInvitationSentListApiResponse,
  UserInvitationSentListApiResponseValidator,
} from '../users/user-invitation-sent-list.types.js';
import { UserInviteApiResponse, UserInviteApiResponseValidator } from '../users/user-invite.types.js';
import { UserPostListApiResponse, UserPostListApiResponseValidator } from '../users/user-post-list.types.js';
import { UserProfileApiResponse, UserProfileApiResponseValidator } from '../users/user-profile.types.js';
import { UserRelationsListApiResponse, UserRelationsListApiResponseValidator } from '../users/user-relations-list.types.js';

export class UsersResource {
  constructor(private client: UnipileClient) {}

  async getProfile(input: GetProfileInput, options?: RequestOptions): Promise<UserProfileApiResponse> {
    const { identifier, account_id, linkedin_api, linkedin_sections } = input;

    const parameters: Record<string, string | string[]> = { ...options?.extra_params };
    parameters.account_id = account_id;
    if (linkedin_api) parameters.linkedin_api = linkedin_api;
    if (linkedin_sections) parameters.linkedin_sections = linkedin_sections;

    return await this.client.request.send({
      path: ['users', identifier],
      method: 'GET',
      options,
      parameters,
      validator: UserProfileApiResponseValidator,
    });
  }

  async getOwnProfile(account_id: string, options?: RequestOptions): Promise<AccountOwnerProfileApiResponse> {
    return await this.client.request.send({
      path: ['users', 'me'],
      method: 'GET',
      options,
      parameters: { ...options?.extra_params, account_id },
      validator: AccountOwnerProfileApiResponseValidator,
    });
  }

  async getAllRelations(input: GetAllRelationsInput, options?: RequestOptions): Promise<UserRelationsListApiResponse> {
    const { account_id, limit, cursor } = input;

    const parameters: Record<string, string> = { ...options?.extra_params };
    parameters.account_id = account_id;
    if (limit !== undefined && limit > 0) parameters.limit = String(limit);
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['users', 'relations'],
      method: 'GET',
      options,
      parameters,
      validator: UserRelationsListApiResponseValidator,
    });
  }

  async sendInvitation(input: PostInvitationInput, options?: RequestOptions): Promise<UserInviteApiResponse> {
    return await this.client.request.send({
      path: ['users', 'invite'],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: UserInviteApiResponseValidator,
    });
  }

  async getAllPosts(input: GetAllPostsInput, options?: RequestOptions): Promise<UserPostListApiResponse> {
    const { identifier, account_id, limit, is_company, cursor } = input;

    const parameters: Record<string, string> = { ...options?.extra_params };
    parameters.account_id = account_id;
    if (is_company !== undefined) parameters.is_company = is_company ? 'true' : 'false';
    if (limit) parameters.limit = String(limit);
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['users', identifier, 'posts'],
      method: 'GET',
      parameters,
      options,
      validator: UserPostListApiResponseValidator,
    });
  }

  async getPost(input: GetPostInput, options?: RequestOptions): Promise<UserPostApiResponse> {
    const { account_id, post_id } = input;

    return await this.client.request.send({
      path: ['posts', post_id],
      method: 'GET',
      parameters: {
        ...options?.extra_params,
        account_id,
      },
      options,
      validator: UserPostApiResponseValidator,
    });
  }

  async getAllPostComments(input: GetAllPostCommentsInput, options?: RequestOptions): Promise<PostCommentListApiResponse> {
    const { account_id, post_id, limit, cursor } = input;

    const parameters: Record<string, string> = { ...options?.extra_params };
    parameters.account_id = account_id;
    if (limit !== undefined && limit > 0) parameters.limit = String(limit);
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['posts', post_id, 'comments'],
      method: 'GET',
      parameters,
      options,
      validator: PostCommentListApiResponseValidator,
    });
  }

  async createPost(input: CreatePostInput, options?: RequestOptions): Promise<CreatePostResponse> {
    const { account_id, text, attachments } = input;
    const body = new FormData();

    body.append('text', text);
    if (account_id) body.append('account_id', account_id);

    if (attachments !== undefined) {
      for (const [filename, buffer] of attachments) {
        body.append('attachments', new Blob([buffer]), filename);
      }
    }

    if (options?.extra_params) {
      Object.entries(options.extra_params).forEach(([k, v]) => {
        if (!body.has(k)) {
          body.append(k, v);
        }
      });
    }

    return await this.client.request.send({
      path: ['posts'],
      method: 'POST',
      body,
      headers: {},
      options,
      validator: CreatePostResponseValidator,
    });
  }

  async sendPostComment(input: SendPostCommentInput, options?: RequestOptions): Promise<CommentPostResponse> {
    const { account_id, post_id, text } = input;

    return await this.client.request.send({
      path: ['posts', post_id, 'comments'],
      method: 'POST',
      body: {
        ...options?.extra_params,
        account_id,
        text,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: CommentPostResponseValidator,
    });
  }

  async sendPostReaction(input: SendPostReactionInput, options?: RequestOptions): Promise<AddPostReactionResponse> {
    return await this.client.request.send({
      path: ['posts', 'reaction'],
      method: 'POST',
      body: {
        ...options?.extra_params,
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AddPostReactionResponseValidator,
    });
  }

  async getAllInvitationsSent(
    input: GetAllInvitationsSentInput,
    options?: RequestOptions,
  ): Promise<UserInvitationSentListApiResponse> {
    const { account_id, limit, cursor } = input;

    const parameters: Record<string, string> = { ...options?.extra_params };
    parameters.account_id = account_id;
    if (limit !== undefined && limit > 0) parameters.limit = String(limit);
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['users', 'invite', 'sent'],
      method: 'GET',
      parameters,
      options,
      validator: UserInvitationSentListApiResponseValidator,
    });
  }

  async cancelInvitationSent(
    input: CancelInvitationsSentInput,
    options?: RequestOptions,
  ): Promise<CancelUserInvitationApiResponse> {
    const { account_id, invitation_id } = input;

    return await this.client.request.send({
      path: ['users', 'invite', 'sent', invitation_id],
      method: 'DELETE',
      parameters: {
        ...options?.extra_params,
        account_id,
      },
      options,
      validator: CancelUserInvitationApiResponseValidator,
    });
  }

  async getCompanyProfile(input: CompanyProfileInput, options?: RequestOptions): Promise<LinkedinCompanyProfileApiResponse> {
    const { account_id, identifier } = input;

    return await this.client.request.send({
      path: ['linkedin', 'company', identifier],
      method: 'GET',
      parameters: {
        ...options?.extra_params,
        account_id,
      },
      options,
      validator: LinkedinCompanyProfileApiResponseValidator,
    });
  }
}
