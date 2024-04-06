import { AllCollections, aggregate, readItems, readSingleton } from '@directus/sdk';
import { directus } from './index';

export interface DStats {
  players: string;
  cards: string;
  nations: string;
  leagues: string;
  clubs: string;
}

export const getStats = async () => {
  const adminAPI = directus(process.env.DIRECTUS_ADMIN_TOKEN);
  const collections: string[] = ['players', 'cards', 'nations', 'leagues', 'clubs'];

  const result = await Promise.all(
    collections.map(async (c) => {
      const response = await adminAPI.request(aggregate(c as any, { aggregate: { count: '*' } }));
      const count = response[0].count;
      return { [c]: count };
    }),
  ).then((values) => {
    return values.reduce((acc, v) => ({ ...acc, ...v }), {});
  });

  return result;
};
