import { PlusIcon } from 'lucide-react';

export default function AddButton() {
  return (
    <div className='fixed bottom-5 left-5 p-5 bg-green-400 shadow-md rounded-full active:shadow-none'>
      <PlusIcon size='20px' />
    </div>
  );
}
