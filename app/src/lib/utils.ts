import { NextApiRequest } from 'next';

type IQuery = NextApiRequest['query'];

export function getSingularValue(query: IQuery, key: string, type: 'number' | 'string') {
  if (!query || !query[key]) return null;

  const values = query[key];
  const value = Array.isArray(values) ? values[0] : values;

  return value ? (type === 'number' ? parseInt(value, 10) : value) : null;
}
