'use server';

import { authFormSchema } from '@/app/(auth)/schema/auth-form.schema';
import { post } from '@/app/util/fetch';
import { validateFormData } from '@/app/validation/form-validation';
import { FORM_STATUS, FormState } from '@/constants/action-status';

export async function createUser(_prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const parsed = validateFormData(formData, authFormSchema);
    // バリデーションエラー
    if (parsed.error) {
      return {
        status: FORM_STATUS.ERROR,
        message: parsed.error.message,
      };
    }

    const res = await post('user', parsed.data);

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
