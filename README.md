# Unipile Node.js SDK

The Node.js SDK provides you tools to interact with Unipile’s API with ease. To have more informations about how Unipile’s API works and how to use it, please take a look at the following resources.

[Unipile API guide](https://developer.unipile.com/docs)

[Unipile API reference](https://developer.unipile.com/reference)

# Requirements

Node 18 recommended

# Installation

```
  npm install unipile-node-sdk
```

# Usage

```javascript
import { UnipileClient } from 'unipile-node-sdk';

const client = new UnipileClient('your base url', 'your access token');

await client.account.connectLinkedin({
  username: 'your username',
  password: 'your password',
});

const messageListResponse = await client.messaging.getAllMessages();
```
