import { readSingleton } from '@directus/sdk';
import { directus } from '.';

export const getConfigs = async () => {
  const adminAPI = directus(process.env.DIRECTUS_ADMIN_TOKEN);

  return adminAPI.request(readSingleton('configs'));
};
