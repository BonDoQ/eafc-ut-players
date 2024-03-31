import { DirectusClient, RestClient, StaticTokenClient, readItems, updateItem } from '@directus/sdk';
import { DSchema } from './directus';
import { validate as uuidValidate } from 'uuid';

type DirectusAPI = DirectusClient<DSchema> & StaticTokenClient<DSchema> & RestClient<DSchema>;

export async function validateToken(directusAPI: DirectusAPI, token?: string | null): Promise<boolean> {
  if (!token || !uuidValidate(token)) {
    return false;
  }

  const userAccounts = await directusAPI.request(
    readItems('accounts', {
      filter: {
        api_token: { _eq: token },
        api_limit: { _gt: 0 },
      },
    }),
  );

  return userAccounts.length > 0 ? true : false;
}

export async function updateQuoata(directusAPI: DirectusAPI, token?: string | null): Promise<boolean> {
  if (!token || !uuidValidate(token)) {
    return false;
  }

  const userAccounts = await directusAPI.request(
    readItems('accounts', {
      filter: {
        api_token: { _eq: token },
        api_limit: { _gt: 0 },
      },
    }),
  );

  if (userAccounts.length <= 0) return false;

  const userAccount = userAccounts[0];
  const new_quota = userAccount.api_limit - 1;
  await directusAPI.request(
    updateItem('accounts', userAccount.id, {
      api_limit: new_quota,
    }),
  );

  return true;
}
