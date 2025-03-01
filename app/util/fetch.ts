import { API_URL } from '@/constants/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface CookieInfo {
  key: string;
  value: string;
  maxAge: number;
}

export async function get(path: string, options?: RequestInit, tags?: string[]) {
  return fetch(`${API_URL}/${path}`, {
    headers: {
      ...(await getHeaders()),
    },
    ...options,
    next: { tags },
  });
}

export async function post<T>(path: string, parsedData: T, options?: RequestInit): Promise<Response> {
  const res = await fetch(`${API_URL}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: await generateRequestCookie(),
    },
    body: JSON.stringify(parsedData),
    credentials: 'include',
    ...options,
  });

  if (res.status === 401) redirect('/login');

  await setCookieInResponse(res);

  return res;
}

async function getHeaders(): Promise<HeadersInit> {
  return {
    Cookie: (await cookies()).toString(),
  };
}

async function generateRequestCookie(): Promise<string> {
  const cookieManager = await cookies();
  const requestCookies = cookieManager.getAll();
  return requestCookies.reduce<string>((cookieString, cookie, index) => {
    const isLast = index === requestCookies.length - 1;
    return (cookieString += isLast ? `${cookie.name}=${cookie.value}` : `${cookie.name}=${cookie.value}; `);
  }, '');
}

async function setCookieInResponse(res: Response): Promise<void> {
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
      sameSite: 'none',
      httpOnly: true,
      maxAge: cookieInfo.maxAge,
    });
  });
}
