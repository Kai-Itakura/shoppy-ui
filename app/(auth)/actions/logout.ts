'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '../constants/auth-cookie';

export async function logout() {
  const cookieManager = await cookies();
  cookieManager.delete(AUTH_COOKIE_NAME);
  redirect('/login');
}
