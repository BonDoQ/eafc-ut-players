import { DirectusClient, RestClient, StaticTokenClient, readItems, updateItem } from '@directus/sdk';
import { DSchema } from './directus';
import { validate as uuidValidate } from 'uuid';

type DirectusAPI = DirectusClient<DSchema> & StaticTokenClient<DSchema> & RestClient<DSchema>;

export async function validateToken(directusAPI: DirectusAPI, token?: string | null): Promise<boolean> {
  if (!token || !uuidValidate(token)) {
    return false;
  }

  const metadata = await directusAPI.request(
    readItems('user_metadata', {
      filter: {
        api_token: { _eq: token },
        api_limit: { _gt: 0 },
      },
    }),
  );

  return metadata.length > 0 ? true : false;
}

export async function updateQuoata(directusAPI: DirectusAPI, token?: string | null): Promise<boolean> {
  if (!token || !uuidValidate(token)) {
    return false;
  }

  const metadata = await directusAPI.request(
    readItems('user_metadata', {
      filter: {
        api_token: { _eq: token },
        api_limit: { _gt: 0 },
      },
    }),
  );

  if (metadata.length <= 0) return false;

  const user_metadata = metadata[0];
  const new_quota = user_metadata.api_limit - 1;
  const updated_metadata = await directusAPI.request(
    updateItem('user_metadata', user_metadata.id, {
      api_limit: new_quota,
    }),
  );
  return true;
}
