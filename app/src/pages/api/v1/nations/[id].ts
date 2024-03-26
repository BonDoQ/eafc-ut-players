import { DNation, directus } from '@/lib/directus';
import { mapNationFields, mapNationResponse } from '@/lib/response-dto';
import { getSingularValue } from '@/lib/utils';
import { readItem } from '@directus/sdk';
import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/v1/nations/{id}:
 *   get:
 *     tags:
 *       - Nation
 *     summary: Get a nation by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the nation
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nation'
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
    const nation = await adminAPI.request<DNation>(readItem('nations', id, { fields: mapNationFields }));
    return res.status(200).json({ item: mapNationResponse(nation) });
  } catch (error) {
    return res.status(404).json({ error: 'Not Found' });
  }
}
