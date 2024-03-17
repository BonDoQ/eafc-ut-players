import { readItems } from '@directus/sdk';
import { DPlayer, directus } from '@/lib/directus';
import { getSingularValue } from '@/lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mapPlayerFields, mapPlayerResponse } from '@/lib/response-dto';

/**
 * @swagger
 * /api/v1/players:
 *   get:
 *     tags:
 *        - Players
 *     summary: Retrieve a list of players
 *     description: Retrieve a list of players from the Directus database. The players can be filtered and sorted according to various parameters.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of players to retrieve per page.
 *     responses:
 *       200:
 *         description: A list of players was retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Player'
 */
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
