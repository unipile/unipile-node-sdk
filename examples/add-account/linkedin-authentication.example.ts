import { UnipileClient } from '../../src/client';

const client = new UnipileClient('your base url', 'your access token');

//Authentication with username and password
await client.account.add({
  provider: 'LINKEDIN',
  username: 'your username',
  password: 'your password',
});

//Authentication with with cookies
await client.account.add({
  provider: 'LINKEDIN',
  access_token: 'your access token',
  csrf_token: 'your csrf token',
});

//Authentication with optional proxy
await client.account.add({
  provider: 'LINKEDIN',
  username: 'your username',
  password: 'your password',
  proxy: {
    protocol: 'https', // your protocol
    port: 1234, // your port
    host: 'your host',
  },
});
