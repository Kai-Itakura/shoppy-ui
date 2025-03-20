'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import AddButton from './add-button';
import ProductForm from './product-form';

export default function CreateProductModal() {
  const [open, setOpen] = useState(false);
  const onSubmitSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <AddButton />
      </DialogTrigger>
      <DialogContent className='rounded-md'>
        <DialogHeader>
          <DialogTitle className='text-center'>Create Product</DialogTitle>
          <DialogDescription>Input the new product information below.</DialogDescription>
        </DialogHeader>
        <ProductForm onSubmitSuccess={onSubmitSuccess} />
      </DialogContent>
    </Dialog>
  );
}
