import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'saffa_admin_session';
const SESSION_TTL = 60 * 60 * 8;

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
}

async function isValidSession(request: NextRequest) {
  const raw = request.cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!raw || !secret) return false;

  const [username, timestamp, signature] = raw.split('.');
  if (!username || !timestamp || !signature) return false;

  const issued = Number(timestamp);
  if (!Number.isFinite(issued) || Math.floor(Date.now() / 1000) - issued > SESSION_TTL) return false;

  const expected = await sign(`${username}.${timestamp}`, secret);
  return signature === expected && username === process.env.ADMIN_USERNAME;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith('/admin')) return NextResponse.next();
  if (pathname === '/admin/login' || pathname.startsWith('/admin/api/')) return NextResponse.next();

  if (await isValidSession(request)) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  }

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};
