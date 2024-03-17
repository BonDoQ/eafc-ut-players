import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateToken, updateQuoata } from '@/lib/validate-token';
import { directus } from './lib/directus';
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.headers.get('x-auth-token') as string;
  const adminAPI = directus(process.env.DIRECTUS_ADMIN_TOKEN);
  const isvalidToken = await validateToken(adminAPI, token);

  if (!isvalidToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const response = await NextResponse.next();

  await updateQuoata(adminAPI, token);

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/v1/:path*',
};
