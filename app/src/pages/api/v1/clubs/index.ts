import { readItems } from '@directus/sdk';
import { DClub, directus } from '@/lib/directus';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mapClubFields, mapClubResponse } from '@/lib/response-dto';
import Joi from 'joi';

/**
 * Retrieves a list of clubs.
 *
 * @swagger
 * /api/v1/clubs:
 *   get:
 *     tags:
 *       - Clubs
 *     summary: Retrieves a list of clubs.
 *     responses:
 *       '200':
 *         description: Successful response with a list of clubs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Club'
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(20).default(20),
  });

  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(400).send(error.message);
  }

  const { page, limit } = value;
  const adminAPI = directus(process.env.DIRECTUS_ADMIN_TOKEN);

  const clubs = await adminAPI.request<DClub[]>(
    readItems('clubs', {
      limit: limit,
      page: page,
      sort: '-date_created',
      fields: mapClubFields,
    }),
  );

  return res.status(200).send({ items: clubs.map(mapClubResponse) });
}
