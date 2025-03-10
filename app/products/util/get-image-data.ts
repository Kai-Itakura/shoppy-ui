import { ChangeEvent } from 'react';

export function getImageData(e: ChangeEvent<HTMLInputElement>): File | null {
  e.preventDefault();

  const file = e.target.files && e.target.files[0];

  return file;
}
