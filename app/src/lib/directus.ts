import { authentication, createDirectus, rest, staticToken } from '@directus/sdk';
import { DSchema } from './directus-schema';

export const directus = (token: string | null = null) => {
  if (token) {
    return createDirectus<DSchema>(process.env.BACKEND_URL || '')
      .with(staticToken(token))
      .with(rest());
  } else {
    return createDirectus(process.env.BACKEND_URL || '')
      .with(authentication('cookie', { credentials: 'include', autoRefresh: true }))
      .with(rest());
  }
};
