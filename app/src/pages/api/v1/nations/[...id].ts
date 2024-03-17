import { DNation, directus } from '@/lib/directus';
import { mapNationFields, mapNationResponse } from '@/lib/response-dto';
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
    const nation = await adminAPI.request<DNation>(readItem('nations', id, { fields: mapNationFields }));
    return res.status(200).json({ item: mapNationResponse(nation) });
  } catch (error) {
    return res.status(404).json({ error: 'Not Found' });
  }
}
