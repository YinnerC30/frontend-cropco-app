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
import { DialogChangePassword } from '@/modules/users/components/DialogChangePassword';
import { useGetConvertToAdmin } from '@/modules/users/hooks';

import { MODULE_USER_PATHS } from '@/modules/users/routes/pathsRoutes';
import { Bolt } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export const MyAccount = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { removeUser, user, updateUserActions } = useAuthentication();
  const { setTheme } = useTheme();

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

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
    <DropdownMenu modal={false}>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <Button onClick={handleOpenMenu} variant={'ghost'} size={'icon'}>
          <Bolt />
        </Button>
      </DropdownMenuTrigger>
      {/* Content */}
      <DropdownMenuContent>
        {/* Info User Login */}
        <DropdownMenuLabel className="text-center">Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-center">
          {user?.first_name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-center">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Copy Id */}
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(user.id);

            toast.success(`Id copiado al portapapeles ${user.id}`);
          }}
        >
          Copiar mi Id
        </DropdownMenuItem>

        {/* Copy token */}
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(user.token);
            toast.success(`Id copiado al portapapeles ${user.token}`);
          }}
        >
          Copiar mi Token
        </DropdownMenuItem>

        {/* Modificar permisos */}
        <DropdownMenuItem asChild>
          <Link to={`${MODULE_USER_PATHS.Update}${user.id}`}>
            Modificar mis permisos
          </Link>
        </DropdownMenuItem>

        {/* Submenu */}
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

        {/* LogOut */}
        <DropdownMenuItem
          onClick={() => {
            removeUser();
          }}
        >
          Salir
        </DropdownMenuItem>

        {/* Run Seed */}
        <DropdownMenuItem
          onClick={() => {
            setIsRunningSeed(true);
          }}
        >
          Implantar semilla 🌱
        </DropdownMenuItem>

        {/* Turn on Admin */}
        <DropdownMenuItem
          onClick={() => {
            setIsConvertToAdmin(true);
          }}
        >
          Volverte Admin 🤖
        </DropdownMenuItem>

        {/* Change password - route */}
        <DropdownMenuItem asChild>
          <Link to={`${MODULE_USER_PATHS.ChangePassword}`}>
            Cambiar contraseña ruta
          </Link>
        </DropdownMenuItem>

        {/* Change Password Dialog */}
        {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}> */}
        <DialogChangePassword />
        {/* </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
