import { DLeague, directus } from '@/lib/directus';
import { mapLeagueFields, mapLeagueResponse } from '@/lib/response-dto';
import { getSingularValue } from '@/lib/utils';
import { readItem } from '@directus/sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/v1/leagues/{id}:
 *   get:
 *     summary: Get a league by ID
 *     tags:
 *       - League
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the league
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/League'
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = getSingularValue(req.query, 'id', 'string');

  if (!id) {
    return res.status(404).json({ error: 'Not Found' });
  }

  try {
    const adminAPI = directus(process.env.DIRECTUS_ADMIN_TOKEN);
    const league = await adminAPI.request<DLeague>(
      readItem('leagues', id, {
        fields: mapLeagueFields,
      }),
    );
    return res.status(200).json({ item: mapLeagueResponse(league) });
  } catch (error) {
    return res.status(404).json({ error: 'Not Found' });
  }
}
