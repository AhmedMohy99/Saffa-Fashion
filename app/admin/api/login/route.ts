import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'saffa_admin_session';
const MAX_AGE = 60 * 60 * 8;

function signature(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!expectedUsername || !expectedPassword || !secret) {
      return NextResponse.json({ error: 'Admin security is not configured. Add ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SESSION_SECRET in Vercel.' }, { status: 503 });
    }

    const usernameOk = typeof username === 'string' && username === expectedUsername;
    const passwordOk = typeof password === 'string' && password === expectedPassword;
    if (!usernameOk || !passwordOk) {
      return NextResponse.json({ error: 'Incorrect username or password.' }, { status: 401 });
    }

    const issued = Math.floor(Date.now() / 1000).toString();
    const value = `${expectedUsername}.${issued}`;
    const signed = `${value}.${signature(value, secret)}`;
    const response = NextResponse.json({ ok: true });
    response.cookies.set(COOKIE_NAME, signed, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
  return response;
}
