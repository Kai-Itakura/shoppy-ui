import { get } from './util/fetch';

export async function getMe() {
  const res = await get('auth/me');

  if (!res.ok) {
    throw new Error('User unauthorized!');
  }

  return res.json();
}
