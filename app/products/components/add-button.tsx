import { PlusIcon } from 'lucide-react';

export default function AddButton() {
  return (
    <div className='absolute bottom-20 left-10 p-5 bg-green-400 shadow-md rounded-full active:shadow-none'>
      <PlusIcon size='20px' />
    </div>
  );
}
