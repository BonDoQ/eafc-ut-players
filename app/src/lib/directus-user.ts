import { createItem, readItems } from '@directus/sdk';
import { DAccount, directus } from './directus';

export const getDirectusUserAccount = async (email: string | undefined, sub: string | undefined) => {
  if (!email || !sub) {
    return null;
  }

  const adminAPI = directus(process.env.DIRECTUS_ADMIN_TOKEN);
  const result = await adminAPI.request<DAccount[]>(
    readItems('accounts', {
      filter: {
        email: { _eq: email },
        google_account_id: { _eq: sub },
      },
    }),
  );

  return result[0];
};

export const upsertDirectusUserAccount = async (acc: Partial<DAccount>) => {
  const adminAPI = directus(process.env.DIRECTUS_ADMIN_TOKEN);
  const result = await getDirectusUserAccount(acc.email, acc.google_account_id);

  if (result) {
    return result;
  }

  return await adminAPI.request(createItem('accounts', acc));
};
