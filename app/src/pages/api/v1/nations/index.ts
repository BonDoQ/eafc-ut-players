import { readItems } from '@directus/sdk';
import { DNation, directus } from '@/lib/directus';
import { getSingularValue } from '@/lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mapNationFields, mapNationResponse } from '@/lib/response-dto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = getSingularValue(req.query, 'page', 'number') || 1;
  const limit = getSingularValue(req.query, 'limit', 'string') || 20;

  const adminAPI = directus(process.env.DIRECTUS_ADMIN_TOKEN);

  const nations = await adminAPI.request<DNation[]>(
    readItems('nations', {
      fields: mapNationFields,
      limit: +limit,
      page: +page,
      sort: '-date_created',
    }),
  );

  res.status(200).send({ items: nations.map(mapNationResponse) });
  res.end(`Post: all players`);
}
