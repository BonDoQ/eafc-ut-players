import { readItems } from '@directus/sdk';
import { DClub, directus } from '@/lib/directus';
import { getSingularValue } from '@/lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mapClubFields, mapClubResponse } from '@/lib/response-dto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = getSingularValue(req.query, 'page', 'number') || 1;
  const limit = getSingularValue(req.query, 'limit', 'string') || 20;

  const adminAPI = directus(process.env.DIRECTUS_ADMIN_TOKEN);

  const clubs = await adminAPI.request<DClub[]>(
    readItems('clubs', {
      limit: +limit,
      page: +page,
      sort: '-date_created',
      fields: mapClubFields,
    }),
  );

  return res.status(200).send({ items: clubs.map(mapClubResponse) });
}
