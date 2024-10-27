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
import { useImplantSeed } from '@/modules/authentication/hooks/useImplantSeed';
import { useTheme } from '@/modules/core/components/ThemeProvider';
import { useRoutesManager } from '@/routes/hooks/useRoutesManager';
import { Bolt } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const MyAccount = () => {
  const { removeUser } = useAuthentication();
  const { setTheme } = useTheme();

  const { redirectToLogin } = useRoutesManager();

  const [isRunningSeed, setIsRunningSeed] = useState(false);

  const query = useImplantSeed(isRunningSeed);

  useEffect(() => {
    if (query.isSuccess) {
      toast.success('La semilla fue plantada con exito 🌱');
      setIsRunningSeed(false);
    }
  }, [query]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Bolt />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel className="text-center">Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />

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
        <DropdownMenuItem
          onClick={() => {
            removeUser();
            redirectToLogin();
          }}
        >
          Salir
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setIsRunningSeed(true);
          }}
        >
          Implantar semilla 🌱
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
