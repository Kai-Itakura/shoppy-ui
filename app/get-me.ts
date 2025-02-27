import { redirect } from 'next/navigation';
import { get } from './util/fetch';

export async function getMe() {
  const res = await get('auth/me');
  console.log('🔥 ~ getMe ~ res:', res.status, res.statusText);

  if (!res.ok) {
    if (res.status === 401) redirect('/login');
    throw new Error('Failed to get!');
  }

  return res.json();
}
