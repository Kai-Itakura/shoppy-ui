'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FORM_STATUS, FormState } from '@/constants/action-status';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createProduct } from '../../actions/create-product';
import { createProductSchema, CreateProductSchema } from '../../schema/create-product.schema';
import { getImageData } from '../../util/get-image-data';

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
      image: new File([], ''),
    },
  });

  const [state, formAction, isPending] = useActionState<FormState, FormData>(createProduct, {
    status: FORM_STATUS.IDLE,
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
  }, [state, form, onSubmitSuccess, toast]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreview(url);
    } else {
      setPreview('');
    }

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

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
        />
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
        />
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
        />
        <FormField
          control={form.control}
          name='image'
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { onChange, value: _value, ...field } }) => (
            <FormItem className='mb-6'>
              <FormLabel>Product image</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  accept='image/jpeg'
                  multiple={false}
                  {...field}
                  onChange={(e) => {
                    const file = getImageData(e);
                    setImageFile(file);
                    onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {preview && (
          <Image
            src={preview}
            alt='preview'
            width={100}
            height={100}
            className='w-100px h-auto'
          />
        )}

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
