'use client';

import AuthForm, { FORM_TYPE } from '@/components/auth-form';
import { createUser } from './actions/create-user';

const Signin = () => {
  return (
    <AuthForm
      actionFunction={createUser}
      mode={FORM_TYPE.SIGNUP}
    ></AuthForm>
  );
};

export default Signin;
