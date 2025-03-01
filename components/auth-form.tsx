'use client';

import { AuthFormSchema, authFormSchema } from '@/app/(auth)/schema/auth-form.schema';
import { FORM_STATUS, FormState } from '@/constants/action-status';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

type AuthFormProps = {
  actionFunction: (state: FormState, formData: FormData) => FormState | Promise<FormState>;
  mode: FormType;
};

enum FORM_TYPE {
  SIGNUP = 'signin',
  LOGIN = 'login',
}

export type FormType = `${FORM_TYPE}`;

const AuthForm = ({ actionFunction, mode }: AuthFormProps) => {
  const form = useForm<AuthFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [state, formAction, isPending] = useActionState<FormState, FormData>(actionFunction, {
    status: FORM_STATUS.IDLE,
  });

  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    switch (state.status) {
      case FORM_STATUS.SUCCESS:
        toast({
          title: state.message,
          variant: 'default',
        });

        form.reset();
        router.push('/');

        break;

      case FORM_STATUS.ERROR:
        toast({
          title: state.message,
          variant: 'destructive',
        });

        break;

      default:
        break;
    }
  }, [state, form, router, toast]);

  const oppositeMode = mode === FORM_TYPE.SIGNUP ? FORM_TYPE.LOGIN : FORM_TYPE.SIGNUP;

  return (
    <div className='flex justify-center items-center mt-[20%]'>
      <Card className='p-6 w-96'>
        <CardHeader>
          <CardTitle className='text-center'>{mode.charAt(0).toUpperCase() + mode.slice(1)}</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form action={formAction}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='mb-6'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='mb-6'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      autoComplete='on'
                      placeholder='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <div className='flex flex-col gap-3 items-center'>
              <Button
                className='w-24'
                disabled={isPending || !form.formState.isValid}
              >
                {mode}
              </Button>
              <Button
                className='w-24'
                variant='ghost'
                asChild
              >
                <Link href={`/${oppositeMode}`}>{oppositeMode}</Link>
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AuthForm;
