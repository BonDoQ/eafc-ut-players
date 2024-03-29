import { DLeague, directus } from '@/lib/directus';
import { mapLeagueFields, mapLeagueResponse } from '@/lib/response-dto';
import { readItem } from '@directus/sdk';
import Joi from 'joi';
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
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  const { error, value } = schema.validate(req.query);

  if (error) {
    return res.status(404).json({ error: 'Not Found' });
  }

  const { id } = value;

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
