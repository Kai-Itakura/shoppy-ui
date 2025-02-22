'use server';

import { FORM_STATUS, FormStatus } from '@/app/(auth)/actions/action-status';
import { post } from '@/app/util/fetch';
import { validateFormData } from '@/app/validation/form-validation';
import { authFormSchema } from '@/schema/auth-form.schema';

export async function login(_state: FormStatus, formData: FormData): Promise<FormStatus> {
  try {
    const parsed = validateFormData(formData, authFormSchema);
    if (parsed.error) {
      return {
        status: FORM_STATUS.ERROR,
        message: parsed.error.message,
      };
    }

    const res = await post('auth/login', parsed.data);

    if (!res.ok) {
      if (res.status === 401) {
        return {
          status: FORM_STATUS.ERROR,
          message: 'User unauthorized!',
        };
      }

      return {
        status: FORM_STATUS.ERROR,
        message: 'Failed to login!',
      };
    }

    return {
      status: FORM_STATUS.SUCCESS,
      message: 'Successfully login!',
    };
  } catch (error) {
    console.error(error);
    return {
      status: FORM_STATUS.ERROR,
      message: 'Unknown error occurred!',
    };
  }
}
