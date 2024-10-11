import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthenticationUser } from '@/modules/authentication/hooks/useAuthenticationUser';
import { useRoutesManager } from '@/routes/hooks/useRoutesManager';
import { Bolt } from 'lucide-react';
export const MyAccount = () => {
  const { removeUser } = useAuthenticationUser();

  const { redirectToLogin } = useRoutesManager();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Bolt />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel className="text-center">Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            removeUser();
            redirectToLogin();
          }}
        >
          Salir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
