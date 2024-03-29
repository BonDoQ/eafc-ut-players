/**
 * Retrieves a club by its ID.
 *
 * @swagger
 * /api/v1/clubs/{id}:
 *   get:
 *     summary: Retrieves a club by its ID.
 *     tags:
 *       - Clubs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the club to retrieve.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Club'
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
import { DClub, directus } from '@/lib/directus';
import { mapClubFields, mapClubResponse } from '@/lib/response-dto';
import { readItem } from '@directus/sdk';
import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';

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
    const club = await adminAPI.request<DClub>(readItem('clubs', id, { fields: mapClubFields }));
    return res.status(200).json({ item: mapClubResponse(club) });
  } catch (error) {
    return res.status(404).json({ error: 'Not Found' });
  }
}
