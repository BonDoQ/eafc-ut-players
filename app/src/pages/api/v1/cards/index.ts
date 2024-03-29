import { readItems } from '@directus/sdk';
import { DCard, directus } from '@/lib/directus';

import type { NextApiRequest, NextApiResponse } from 'next';
import { mapCardFields, mapCardResponse } from '@/lib/response-dto';
import Joi from 'joi';

/**
 * Retrieves a list of cards.
 *
 * @swagger
 * /api/v1/cards:
 *   get:
 *     tags:
 *       - Cards
 *     summary: Retrieves a list of cards.
 *     responses:
 *       '200':
 *         description: Successful response with a list of cards.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Card'
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

  const cards = await adminAPI.request<DCard[]>(
    readItems('cards', {
      limit: limit,
      page: page,
      sort: '-date_created',
      fields: mapCardFields,
    }),
  );

  return res.status(200).send({ items: cards.map(mapCardResponse) });
}
