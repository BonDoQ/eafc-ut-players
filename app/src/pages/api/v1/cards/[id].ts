import { DCard, directus } from '@/lib/directus';
import { mapCardFields, mapCardResponse } from '@/lib/response-dto';
import { readItem } from '@directus/sdk';
import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Retrieves a card by its ID.
 *
 * @swagger
 * /api/v1/cards/{id}:
 *   get:
 *     summary: Retrieves a card by its ID.
 *     tags:
 *       - Cards
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the card to retrieve.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
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
    return res.status(400).send(error.message);
  }

  const { id } = value;

  try {
    const adminAPI = directus(process.env.DIRECTUS_ADMIN_TOKEN);
    const card = await adminAPI.request<DCard>(readItem('cards', id, { fields: mapCardFields }));
    return res.status(200).json({ item: mapCardResponse(card) });
  } catch (error) {
    return res.status(404).json({ error: 'Not Found' });
  }
}
