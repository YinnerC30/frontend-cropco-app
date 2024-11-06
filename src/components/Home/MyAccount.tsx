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
import { useGetConvertToAdmin } from '@/modules/users/hooks/useGetConvertToAdmin';
import { useRoutesManager } from '@/routes/hooks/useRoutesManager';
import { Bolt } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const MyAccount = () => {
  const { removeUser, user, updateUserActions } = useAuthentication();
  const { setTheme } = useTheme();

  const { redirectToLogin } = useRoutesManager();

  const [isRunningSeed, setIsRunningSeed] = useState(false);
  const [isConvertToAdmin, setIsConvertToAdmin] = useState(false);

  const queryImplantedSeed = useImplantSeed(isRunningSeed);
  const queryConvertToAdmin = useGetConvertToAdmin(user.id, isConvertToAdmin);

  useEffect(() => {
    if (queryImplantedSeed.isSuccess) {
      toast.success('La semilla fue plantada con exito 🌱');
      setIsRunningSeed(false);
    }
  }, [queryImplantedSeed.isSuccess]);

  useEffect(() => {
    if (queryConvertToAdmin.isSuccess) {
      toast.success('Ya te volviste admin');
      updateUserActions(queryConvertToAdmin.data?.modules);
      setIsConvertToAdmin(false);
    }
  }, [queryConvertToAdmin.isSuccess]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Bolt />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel className="text-center">Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-center">
          {user?.first_name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-center">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(user.id);

            toast.success(`Id copiado al portapapeles ${user.id}`);
          }}
        >
          Copiar mi Id
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(user.token);
            toast.success(`Id copiado al portapapeles ${user.token}`);
          }}
        >
          Copiar mi Token
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`http://localhost:5173/app/home/users/modify/${user.id}`}>
            Modificar mis permisos
          </Link>
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
        <DropdownMenuItem
          onClick={() => {
            setIsConvertToAdmin(true);
          }}
        >
          Volverte Admin 🤖
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
