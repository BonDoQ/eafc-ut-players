import { DPlayer, directus } from '@/lib/directus';
import { mapPlayerFields, mapPlayerResponse } from '@/lib/response-dto';
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
    const player = await adminAPI.request<DPlayer>(
      readItem('players', id, {
        fields: mapPlayerFields,
      }),
    );
    return res.status(200).json({ item: mapPlayerResponse(player) });
  } catch (error) {
    return res.status(404).json({ error: 'Not Found' });
  }
}
