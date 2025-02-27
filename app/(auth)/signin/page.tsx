import AuthForm from '@/components/auth-form';
import { createUser } from './actions/create-user';

const Signin = () => {
  return (
    <AuthForm
      actionFunction={createUser}
      mode='signin'
    />
  );
};

export default Signin;
