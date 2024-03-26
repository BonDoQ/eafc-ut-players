import { DPlayer, directus } from '@/lib/directus';
import { mapPlayerFields, mapPlayerResponse } from '@/lib/response-dto';
import { readItem } from '@directus/sdk';
import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/v1/players/{id}:
 *   get:
 *     tags:
 *        - Players
 *     summary: Get a player by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the player to return
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Player found and returned successfully
 *         schema:
 *           type: object
 *           properties:
 *             item:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: Player not found
 *         schema:
 *           $ref: '#/components/schemas/Error'
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  const { error, value } = schema.validate(req.query);

  if (error) {
    return res.status(400).send({ error: error.message });
  }

  const { id } = value;

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
