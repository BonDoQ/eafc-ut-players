import { readItems } from '@directus/sdk';
import { DNation, directus } from '@/lib/directus';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mapNationFields, mapNationResponse } from '@/lib/response-dto';
import Joi from 'joi';

/**
 * @swagger
 * /api/v1/nations:
 *   get:
 *     summary: Get all nations
 *     tags:
 *       - Nation
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Nation'
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

  const nations = await adminAPI.request<DNation[]>(
    readItems('nations', {
      fields: mapNationFields,
      limit: limit,
      page: page,
      sort: '-date_created',
    }),
  );

  return res.status(200).send({ items: nations.map(mapNationResponse) });
}
