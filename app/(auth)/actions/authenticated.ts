'use server';

import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '../constants/auth-cookie';

export async function authenticated(): Promise<boolean> {
  const cookieManager = await cookies();
  return !!cookieManager.get(AUTH_COOKIE_NAME)?.value;
}
