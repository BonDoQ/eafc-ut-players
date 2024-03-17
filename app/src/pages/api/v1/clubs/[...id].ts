import { DClub, directus } from '@/lib/directus';
import { mapClubFields, mapClubResponse } from '@/lib/response-dto';
import { getSingularValue } from '@/lib/utils';
import { readItem } from '@directus/sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = getSingularValue(req.query, 'id', 'string');

  if (!id) {
    return res.status(404).json({ error: 'Not Found' });
  }

  try {
    const adminAPI = directus(process.env.DIRECTUS_ADMIN_TOKEN);
    const club = await adminAPI.request<DClub>(readItem('clubs', id, { fields: mapClubFields }));
    return res.status(200).json({ item: mapClubResponse(club) });
  } catch (error) {
    return res.status(404).json({ error: 'Not Found' });
  }
}
