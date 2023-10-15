import { UnipileClient } from 'unipile-node-sdk';

const client = new UnipileClient('your base url', 'your access token');

//Authentication with username and password
await client.account.connectLinkedin({
  username: 'your username',
  password: 'your password',
});

//Authentication with with cookies
await client.account.connectLinkedin({
  access_token: 'your access token',
  csrf_token: 'your csrf token',
});

//Authentication with optional proxy
await client.account.connectLinkedin({
  username: 'your Linkedin’s username',
  password: 'your Linkedin’s password',
  proxy: {
    protocol: 'https', //your protocol
    port: 1234, //your port
    host: 'your host',
    username: 'your proxy’s username', //optional
    password: 'your proxy’s password', //optional
  },
});
