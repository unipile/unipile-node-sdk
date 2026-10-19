import { UnipileClient } from '../client.js';
import { enableFetchMocks } from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';

describe('array extra_params', () => {
  const BASE_URL = 'http://test';
  const API_URL = BASE_URL + '/api/v1/';
  let client: UnipileClient;

  beforeAll(() => {
    enableFetchMocks();
  });

  beforeEach(() => {
    client = new UnipileClient(BASE_URL, 'ACCESS_TOKEN', {
      logRequestPayload: false,
      logRequestResult: false,
      validateRequestPayload: false,
    });
    fetchMock.resetMocks();
    fetchMock.mockResponse(async (req) => ({
      body: JSON.stringify({ url: req.url }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }));
  });

  it('serializes repeated GET query parameters', async () => {
    const response = await client.account.getOne('some_account_id', {
      extra_params: { tag: ['alpha', 'beta'] },
    });
    expect((response as any).url).toBe(
      API_URL + 'accounts/some_account_id?tag=alpha&tag=beta',
    );
  });

  it('serializes repeated DELETE query parameters', async () => {
    const response = await client.account.delete('some_account_id', {
      extra_params: { tag: ['alpha', 'beta'] },
    });
    expect((response as any).url).toBe(
      API_URL + 'accounts/some_account_id?tag=alpha&tag=beta',
    );
  });

  it('preserves arrays in JSON bodies', async () => {
    await client.account.connect(
      { provider: 'WHATSAPP' },
      { extra_params: { tags: ['alpha', 'beta'] } },
    );
    expect(fetchMock.mock.calls[0]?.[1]?.body).toBe(
      JSON.stringify({ tags: ['alpha', 'beta'], provider: 'WHATSAPP' }),
    );
  });

  it('appends repeated multipart fields', async () => {
    await client.email.send(
      { account_id: 'some_account_id', to: [{ identifier: 'att@mail.com' }], body: 'content' },
      { extra_params: { label: ['alpha', 'beta'] } },
    );
    const entries = [...fetchMock.mock.calls[0]?.[1]?.body.entries()];
    expect(entries.filter(([key]) => key === 'label')).toEqual([
      ['label', 'alpha'],
      ['label', 'beta'],
    ]);
  });
});
