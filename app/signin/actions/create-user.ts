'use server';

import { FORM_STATUS, FormStatus } from '@/constants/action-status';
import { API_URL } from '@/constants/api';
import { authFormSchema } from '@/constants/validation/auth-form.shema';

export async function createUser(_prevState: FormStatus, formData: FormData): Promise<FormStatus> {
  try {
    const data = Object.fromEntries(formData);
    const parsed = authFormSchema.safeParse(data);

    // バリデーションエラー
    if (parsed.error) {
      return {
        status: FORM_STATUS.ERROR,
        message: parsed.error.message,
      };
    }

    const res = await fetch(`${API_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      if (res.status === 409) {
        return {
          status: FORM_STATUS.ERROR,
          message: 'Email is already used!',
        };
      }
      return {
        status: FORM_STATUS.ERROR,
        message: 'Failed to signin!',
      };
    }

    return {
      status: FORM_STATUS.SUCCESS,
      message: 'Successfully signin!',
    };
  } catch (error) {
    console.error(error);
    return {
      status: FORM_STATUS.ERROR,
      message: 'Unknown error occurred!',
    };
  }
}
