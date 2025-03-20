import { API_URL } from '@/constants/api';

export function getProductImagePath(id: number) {
  return `${API_URL}/images/products/${id}.jpeg`;
}
