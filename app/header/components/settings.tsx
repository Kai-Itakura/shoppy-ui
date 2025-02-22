import { logout } from '@/app/(auth)/actions/logout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import man from '/public/man.png';

const settings = ['Logout'];

export default function Settings() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-fit rounded-full'>
        <Image
          src={man}
          alt='profile'
          width={50}
          height={50}
          className='w-10'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {settings.map((setting) => (
          <DropdownMenuItem
            key={setting}
            onClick={logout}
          >
            {setting}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
