# Messaging (LinkedIn API, WhatsApp API,etc.) & Email API by Unipile

The Unipile Node.js SDK provides powerful tools to easily integrate with LinkedIn's API, Email API, and other platforms like WhatsApp, Telegram and Instagram. With this SDK, you can seamlessly manage your LinkedIn connections, send messages (including InMail), retrieve profiles, handle invitations, and manage email communications—all using LinkedIn's API and the Email API. Whether you're automating LinkedIn tasks, building scalable messaging solutions across multiple platforms, or managing emails efficiently, Unipile makes it simple and effective.

<p align="center">
  📖 <a href="https://developer.unipile.com/docs" target="_blank">Unipile API Guide</a> &nbsp;&nbsp;
💡<a href="https://developer.unipile.com/reference" target="_blank">Unipile API Reference</a> &nbsp;&nbsp;
  ▶️ <a href="#quick-start">Quick Start</a> &nbsp;&nbsp;
  🗂️ <a href="#installation">Installation</a>
  <br><br>
💬 <a href="#linkedin-api-and-messaging-apis">Messaging API</a> &nbsp;&nbsp;
 ✉️ <a href="#email-api">Email API</a> &nbsp;&nbsp;
🔑 <a href="https://developer.unipile.com/docs/list-provider-features" target="_blank">All Features</a>
<br><br>
</p>

# LinkedIn API and Messaging APIs

## Features for Messaging APIs

🔸 [Account Connection](#account-connection): Generate a Hosted Auth, Implement a custom authentication<br>
<br>
🔸 [Message](#messages): Start a new chat, Send message, List messages in a chat, List chats, Retrieve a chat, List attendees, Retrieve a chat, List attendees, List all attendees from a chat<br>
<br>
🔸 [Attachment](#attachments): Send file attachments, Retrieve an attachment from a message<br>
<br>
🔸 [User Profile](#users): Retrieve users profiles, Retrieve my profile<br>
<br>
🔸 <a href="https://developer.unipile.com/docs/list-provider-features" target="_blank">Documentation</a>: Access to All Messaging API Features

## LinkedIn Specific

🔹 [Send InMail LinkedIn API](#inmail-linkedin-api) <br>
<br>
🔹 [Send Invitation LinkedIn API](#invitations-linkedin-api): Profile view notification, Send invitation, List pending invitation, Delete invitation<br>
<br>
🔹 [LinkedIn Posts API](#posts-linkedin-api): List Users/Companies posts, Retrieve a post, Create a new LinkedIn Post, Send Comments in LinkedIn Post, List Post Comments, Add reaction on a post<br>
<br>
🔹 [Profiles LinkedIn API](#profiles-linkedin-api): List of contacts/Relations, Retrieve Companies Profiles<br>
<br>
🔹 <a href="https://developer.unipile.com/docs/list-provider-features#linkedin-specific" target="_blank">Documentation</a>: Access to All LinkedIn API Features
<br>

# Email API

🔸 [Get emails history](#get-emails-history)<br>
🔸 [Delete an email](#delete-an-email)<br>
🔸 [Send an email](#send-an-email)<br>
🔸 [Reply to an email](#reply-to-an-email)<br>
🔸 <a href="https://developer.unipile.com/docs/list-provider-features" target="_blank">Documentation</a>: Access to All Email API Features

# Installation

Node 18+ required
<br>

```
  npm install unipile-node-sdk
```

# Quick Start

Authenticate using your Unipile account credentials

```javascript
import { UnipileClient } from 'unipile-node-sdk';

const client = new UnipileClient('https://{YOUR_DSN}', '{YOUR_ACCESS_TOKEN}');
```

Add a messaging account : LinkedIn

```javascript
const response = await client.account.connectLinkedin({
  username: 'your LinkedIn username',
  password: 'your LinkedIn password',
});
```

Retrieve a LinkedIn company profile

```javascript
const response = await client.users.getCompanyProfile({
  account_id: linkedinAccount.id,
  identifier: 'Unipile',
});
```

# Features for All APIs

## Account Connection

You can easily connect multiple accounts

- Generate a Hosted Auth Wizard link

  ```javascript
  await client.account.createHostedAuthLink({
    type: 'create', // or reconnect
    expiresOn: '2024-12-22T12:00:00.701Z',
    api_url: 'your api',
    providers: '*', // * means all provider
    success_redirect_url: 'your success url',
    failure_redirect_url: 'your fail url',
    notify_url: 'your notify url',
  });
  ```

- Implement a custom authentication to connect accounts on your application :

  - LinkedIn username/password
    ```javascript
    await client.account.connectLinkedin({
      username: 'your LinkedIn username',
      password: 'your LinkedIn password',
    });
    ```

- LinkedIn cookie/user-agent

  ```javascript
  await client.account.connectLinkedinWithCookie({
    access_token: 'V2VsY29tZSB0byBVbmlwaWxlICE-gU2hhbnRheSB5b3Ugc3RheSAh',
    user_agent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1',
  });
  ```

  - Whatsapp API
    ```javascript
    await client.account.connectWhatsapp();
    ```
  - Instagram API
    ```javascript
    await client.account.connectInstagram({
      username: 'your Instagram username',
      password: 'your Instagram password',
    });
    ```
  - Messenger API
    ```javascript
    await client.account.connectMessenger({
      username: 'your Messenger username',
      password: 'your Messenger password',
    });
    ```
  - Telegram API
    ```javascript
    await client.account.connectTelegram();
    ```
  - X (Twitter) API
    ```javascript
    await client.account.connectTwitter({
      username: 'your X username',
      password: 'your X password',
    });
    ```

- Have 2FA / OTP / In-app validation security ? Solve the checkpoint 2FA / OTP

  ```javascript
  await client.account.solveCodeCheckpoint({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    provider: 'LINKEDIN',
    code: '******',
  });
  ```

- LinkedIn : initiate or monitor a sync process
  ```javascript
  await client.account.resyncLinkedinAccount({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
  });
  ```

## Messages

- Start a new chat
  ```javascript
  await client.messaging.startNewChat({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    attendees_ids: ['user id OR provider id'],
    text: 'new chat with message',
  });
  ```
- Send message
  ```javascript
  await client.messaging.sendMessage({
    chat_id: 'vISKyHtDUmagrk6vrnlXhw',
    text: 'Hello World',
  });
  ```
- List messages in a chat
  ```javascript
  await client.messaging.getAllMessagesFromChat({
    chat_id: 'vISKyHtDUmagrk6vrnlXhw',
  });
  ```
- List chats
  ```javascript
  await client.messaging.getAllChats();
  // OR sort your chats list
  await client.messaging.getAllChats({
    account_type: 'LINKEDIN',
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    limit: 50,
    after: '2024-07-22T12:00:00.000Z',
  });
  ```
- Retrieve a chat
  ```javascript
  await client.messaging.getChat('vISKyHtDUmagrk6vrnlXhw');
  ```
- List attendees
  ```javascript
  await client.messaging.getAllAttendees({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
  });
  ```
- List all attendees from a chat
  ```javascript
  await client.messaging.getAllAttendeesFromChat('vISKyHtDUmagrk6vrnlXhw');
  ```

## Attachments

- Send files attachments

  ```javascript
  const path = './src/unipile.png';
  const fileBuffer = await fs.readFile(path);

  await client.messaging.sendMessage({
    chat_id: 'vISKyHtDUmagrk6vrnlXhw',
    text: 'Hello World',
    attachments: [['unipile.png', fileBuffer]],
  });
  ```

- Retrieve an attachment from a message
  ```javascript
  await client.messaging.getMessageAttachment({
    attachment_id: '5882031366722404334',
    message_id: '3aRdnf34UiympaebB4-NRA',
  });
  ```

## Users

- Retrieve users profiles
  ```javascript
  await client.users.getProfile({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    identifier: 'user id OR user provider id',
  });
  ```
- Retrieve my profile
  ```javascript
  await client.users.getOwnProfile('t5XY4yQzR9WVrlNFyzPMhw');
  ```

## Extra parameters

If you want to pass some extra parameters for a request beyond what the SDK input defines, all methods allow an `extra_params` options.

```javascript
await client.messaging.getMessageAttachment(
  {
    attachment_id: '5882031366722404334',
    message_id: '3aRdnf34UiympaebB4-NRA',
  },
  {
    extra_params: { my_param_name: 'my param value' },
  },
);
```

Depending on the underlying HTTP request mode used, `extra_params` will be added to the request query string or json or formData body.

This may be useful if you know about and want to use a parameter that is either omitted or not yet defined in the sdk.

# LinkedIn Specific

## InMail LinkedIn API

Send InMail LinkedIn API
(message to people outside users’ network)

```javascript
await client.messaging.startNewChat({
  account_id: 't5XY4yQzR9WVrlNFyzPMhw',
  attendees_ids: ['user provider id'],
  text: 'send a inmail',
  options: {
    linkedin: {
      inmail: true,
    },
  },
});
```

## Invitations LinkedIn API

- Notify LinkedIn Profile View
  ```javascript
  await client.users.getProfile({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    identifier: 'user provider id',
    linkedin_sections: '*',
    notify: true,
  });
  ```
- Send LinkedIn Invitation
  ```javascript
  await client.users.sendInvitation({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    provider_id: 'user provider id',
    message: 'Send invitation',
  });
  ```
- List pending LinkedIn invitations
  ```javascript
  await client.users.getAllInvitationsSent({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
  });
  ```
- Delete LinkedIn Invitation
  ```javascript
  await client.users.cancelInvitationSent({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    invitation_id: '7221821214065876992',
  });
  ```

## Posts LinkedIn API

- List Users' and Companies' LinkedIn Posts
  ```javascript
  await client.users.getAllPosts({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    identifier: 'user/company provider id',
  });
  ```
- Retrieve a LinkedIn post
  ```javascript
  await client.users.getPost({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    post_id: '7222176104768270337',
  });
  ```
- Create a LinkedIn Post
  ```javascript
  await client.users.createPost({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    text: 'post content',
  });
  ```
- Send Comments on LinkedIn Post
  ```javascript
  await client.users.sendPostComment({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    post_id: '7222176104768270337',
    text: 'comment',
  });
  ```
- List LinkedIn Post Comments
  ```javascript
  await client.users.getAllPostComments({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    post_id: '7222176104768270337',
  });
  ```
- Add reaction to a LinkedIn post
  ```javascript
  await client.users.sendPostReaction({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    post_id: '7222176104768270337',
    reaction_type: 'funny',
  });
  ```

## Profiles LinkedIn API

- List of contacts/Relations
  ```javascript
  await client.users.getAllRelations({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
  });
  ```
- Retrieve User Profiles
  ```javascript
  await client.users.getProfile({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    identifier: 'user provider id',
    linkedin_api: 'sales_navigator',
    linkedin_sections: ['experience', 'about'],
    notify: true,
  });
  ```
- Retrieve Companies Profiles
  ```javascript
  await client.users.getCompanyProfile({
    account_id: 't5XY4yQzR9WVrlNFyzPMhw',
    identifier: 'Unipile',
  });
  ```

# Email API

## Get emails history

- List all emails

  ```javascript
  await client.email.getAll({ account_id: 't5XY4yQzR9WVrlNFyzPMhw' });
  ```

- Retrieve a specific email

```javascript
await client.email.getOne('TnOWcaycS52dwnhgADlb2w');
```

- Retrieve a specific email by external provider id

```javascript
await client.email.getOne.byProvider('some email provider id', 'some account id');
```

- List all folders from an email Account

```javascript
await client.email.getAllFolders({ account_id: 't5XY4yQzR9WVrlNFyzPMhw' });
```

- Retrieve a specific folder

```javascript
await client.email.getOneFolder('aG0z55cmQOO1y2180eAeuQ');
```

- Retrieve a specific folder by external provider id

```javascript
await client.email.getOneFolder.byProviderId('some folder provider id', 'some account id');
```

- Retrieve a specific attachment

```javascript
await client.email.getEmailAttachment({
  email_id: 'TnOWcaycS52dwnhgADlb2w',
  attachment_id: 'AQMkADAwATNiZmYAZC1jM2ZmAC00MzA1LTAwAi0wMAoARgAAA6zgXpjd',
});
```

- Retrieve a specific attachment using an email external provider id

```javascript
await client.email.getEmailAttachment.byProviderId({
  account_id: 't5XY4yQzR9WVrlNFyzPMhw',
  email_id: 'some email provider id',
  attachment_id: 'AQMkADAwATNiZmYAZC1jM2ZmAC00MzA1LTAwAi0wMAoARgAAA6zgXpjd',
});
```

## Delete an email

- Delete a specific email

```javascript
await client.email.delete('TnOWcaycS52dwnhgADlb2w');
```

- Delete a specific email by external provider id

```javascript
await client.email.delete.byProviderId('some email provider id', 'some account id');
```

## Send an email

```javascript
await client.email.send({
  account_id: 't5XY4yQzR9WVrlNFyzPMhw',
  to: [{ identifier: 'unipile@gmail.com' }],
  subject: 'email subject',
  body: 'email body content',
});
```

## Reply to an email

```javascript
await client.email.send({
  account_id,
  body: 'send a mail',
  subject: 're: parent email subject',
  to: [{ identifier: 'unipile@gmail.com' }],
  reply_to: 'some email provider id',
});
```
