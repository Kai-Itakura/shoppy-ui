'use client';

import AuthForm from '@/components/auth-form';
import { login } from './actions/login';

const Login = () => {
  return (
    <AuthForm
      actionFunction={login}
      mode='login'
    />
  );
};

export default Login;
