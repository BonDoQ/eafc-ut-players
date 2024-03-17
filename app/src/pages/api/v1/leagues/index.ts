import { readItems } from '@directus/sdk';
import { DLeague, directus } from '@/lib/directus';
import { getSingularValue } from '@/lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mapLeagueFields, mapLeagueResponse } from '@/lib/response-dto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = getSingularValue(req.query, 'page', 'number') || 1;
  const limit = getSingularValue(req.query, 'limit', 'string') || 20;

  const adminAPI = directus(process.env.DIRECTUS_ADMIN_TOKEN);

  const leagues = await adminAPI.request<DLeague[]>(
    readItems('leagues', {
      fields: mapLeagueFields,
      limit: +limit,
      page: +page,
      sort: '-date_created',
    }),
  );

  return res.status(200).send({ items: leagues.map(mapLeagueResponse) });
}
