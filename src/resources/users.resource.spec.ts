import { UnipileClient } from '../client.js';
import { enableFetchMocks } from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';

describe('users.getProfile', () => {
  let client: UnipileClient;

  const BASE_URL = 'http://test';
  const API_URL = BASE_URL + '/api/v1/';

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

  it('serializes linkedin_sections arrays as repeated query parameters', async () => {
    const response = await client.users.getProfile({
      account_id: 'account-id',
      identifier: 'profile-id',
      linkedin_sections: ['education', 'experience', 'about'],
    });

    expect((response as any).url).toBe(
      API_URL +
        'users/profile-id?account_id=account-id&linkedin_sections=education&linkedin_sections=experience&linkedin_sections=about',
    );
  });

  it('keeps a single linkedin_sections value as one query parameter', async () => {
    const response = await client.users.getProfile({
      account_id: 'account-id',
      identifier: 'profile-id',
      linkedin_sections: '*',
    });

    expect((response as any).url).toBe(
      API_URL + 'users/profile-id?account_id=account-id&linkedin_sections=*',
    );
  });
});
