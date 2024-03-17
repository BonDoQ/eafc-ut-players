import { readItems } from '@directus/sdk';
import { DPlayer, directus } from '@/lib/directus';
import { getSingularValue } from '@/lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mapPlayerFields, mapPlayerResponse } from '@/lib/response-dto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = getSingularValue(req.query, 'page', 'number') || 1;
  const limit = getSingularValue(req.query, 'limit', 'string') || 20;

  const adminAPI = directus(process.env.DIRECTUS_ADMIN_TOKEN);

  const players = await adminAPI.request<DPlayer[]>(
    readItems('players', {
      limit: +limit,
      page: +page,
      sort: '-date_created',
      fields: mapPlayerFields,
    }),
  );

  res.status(200).send({ items: players.map(mapPlayerResponse) });
  res.end(`Post: all players`);
}
