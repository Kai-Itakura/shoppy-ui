import { cookies } from 'next/headers';

export async function authenticated(): Promise<boolean> {
  const cookieManager = await cookies();
  return !!cookieManager.get('Authentication')?.value;
}
