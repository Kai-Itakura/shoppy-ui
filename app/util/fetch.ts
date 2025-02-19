import { API_URL } from '@/constants/api';
import { cookies } from 'next/headers';

interface CookieInfo {
  key: string;
  value: string;
  maxAge: number;
}

export async function get(path: string, options?: RequestInit) {
  return fetch(`${API_URL}/${path}`, {
    headers: {
      ...(await getHeaders()),
    },
    ...options,
  });
}

export async function post<T>(path: string, parsedData: T, options?: RequestInit): Promise<Response> {
  const res = await fetch(`${API_URL}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedData),
    ...options,
  });

  await setCookie(res);

  return res;
}

async function getHeaders(): Promise<HeadersInit> {
  return {
    Cookie: (await cookies()).toString(),
  };
}

async function setCookie(res: Response): Promise<void> {
  const setCookies = res.headers.getSetCookie();
  const cookieInfos = setCookies.map<CookieInfo>((setCookie) => {
    const splitCookie = setCookie.split(';');
    const maxAgeString = splitCookie.find((str) => str.includes('Max-Age'))?.split('=')[1];
    const maxAge = parseInt(maxAgeString!);
    return { key: setCookie.split('=')[0], value: setCookie.split(';')[0].split('=')[1], maxAge };
  });

  const cookieManager = await cookies();
  cookieInfos.forEach((cookieInfo) => {
    cookieManager.set(cookieInfo.key, cookieInfo.value, {
      secure: true,
      httpOnly: true,
      maxAge: cookieInfo.maxAge,
    });
  });
}
