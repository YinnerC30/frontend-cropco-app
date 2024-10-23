import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthentication } from '@/modules/authentication/hooks/useAuthentication';
import { useTheme } from '@/modules/core/components/ThemeProvider';
import { useRoutesManager } from '@/routes/hooks/useRoutesManager';
import { Bolt } from 'lucide-react';

export const MyAccount = () => {
  const { removeUser } = useAuthentication();
  const { setTheme } = useTheme();

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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Modo</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Oscuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                Sistema
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
