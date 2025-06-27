'use server';

import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '../constants/auth-cookie';

export default async function getAuthentication() {
  return (await cookies()).get(AUTH_COOKIE_NAME);
}
