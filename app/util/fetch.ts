import { API_URL } from '@/constants/api';

export async function post<T>(path: string, parsedData: T): Promise<Response> {
  const res = await fetch(`${API_URL}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedData),
  });

  return res;
}
