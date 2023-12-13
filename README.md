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

## Linkedin

```javascript
import { UnipileClient } from 'unipile-node-sdk';

const client = new UnipileClient('https://apiX.unipile.com:XXXX', 'your access token');

//LINKEDIN
await client.account.connectLinkedin({
  username: 'your LinkedIn username',
  password: 'your LinkedIn password',
});

//INSTAGRAM
await client.account.connectInstagram({
  username: 'your Instagram username',
  password: 'your Instagram password',
});

//WHATSAPP
const { qrCodeString: whatsappQrCode } = await client.account.connectWhatsapp();
console.log(whatsappQrCode); // scan the QR code to finish the connection

//TELEGRAM
const { qrCodeString: telegramQrCode } = await client.account.connectTelegram();
console.log(telegramQrCode); // scan the QR code to finish the connection

//MESSENGER
await client.account.connectMessenger({
  username: 'your Messenger username',
  password: 'your Messenger password',
});

const chats = await client.messaging.getAllChats();
const messages = await client.messaging.getAllMessages();
const attendees = await client.messaging.getAllAttendees();
```
