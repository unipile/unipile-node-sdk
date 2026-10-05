import { AccountCreateBodyValidator } from './accounts-create.types.js';

describe('AccountCreateBaseSchema', () => {
  it('accepts ip on LinkedIn cookie account creation', () => {
    expect(
      AccountCreateBodyValidator.Check({
        provider: 'LINKEDIN',
        access_token: 'cookie',
        ip: '203.0.113.10',
      }),
    ).toBe(true);
  });

  it('accepts ip on QR-based account creation providers', () => {
    expect(
      AccountCreateBodyValidator.Check({
        provider: 'WHATSAPP',
        ip: '203.0.113.10',
      }),
    ).toBe(true);
  });
});
