'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FORM_STATUS, FormState } from '@/constants/action-status';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createProduct } from '../actions/create-product';
import { createProductSchema, CreateProductSchema } from '../schema/create-product.schema';

type ProductFormProps = {
  onSubmitSuccess: () => void;
};

export default function ProductForm({ onSubmitSuccess }: ProductFormProps) {
  const form = useForm<CreateProductSchema>({
    mode: 'onChange',
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
    },
  });

  const [state, formAction, isPending] = useActionState<FormState, FormData>(createProduct, {
    status: FORM_STATUS.IDOL,
  });

  const { toast } = useToast();
  useEffect(() => {
    switch (state.status) {
      case FORM_STATUS.SUCCESS:
        toast({
          title: state.message,
          variant: 'default',
        });
        form.reset();
        onSubmitSuccess();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Form {...form}>
      <form action={formAction}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='mb-6'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='mb-6'>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='description'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem className='mb-6'>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type='number'
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
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
}
