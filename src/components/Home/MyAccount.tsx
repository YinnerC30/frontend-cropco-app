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

import { useImplantSeed } from '@/auth/hooks/queries/useImplantSeed';
import { useAuthContext } from '@/auth/hooks/useAuthContext';
import { useTheme } from '@/modules/core/components/shared/ThemeProvider';
import { DialogChangePassword } from '@/modules/users/components/DialogChangePassword';
import { useGetConvertToAdmin } from '@/modules/users/hooks';

import { useCreationsApp } from '@/auth/hooks/queries/useCreateActionsApp';
import { MODULE_USER_PATHS } from '@/modules/users/routes/pathsRoutes';
import { Bolt, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { SidebarMenuButton } from '../ui/sidebar';

export const MyAccount = () => {
  const [, setOpenMenu] = useState(false);
  const { removeUser, user, updateUserActions } = useAuthContext();
  const { setTheme } = useTheme();

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const [isRunningSeed, setIsRunningSeed] = useState(false);
  const [isConvertToAdmin, setIsConvertToAdmin] = useState(false);

  const queryImplantedSeed = useImplantSeed(isRunningSeed);
  const queryConvertToAdmin = useGetConvertToAdmin(user?.id!, isConvertToAdmin);
  const [runQuery, setRunQuery] = useState(false);
  const queryCreateActions = useCreationsApp({ stateQuery: runQuery });

  useEffect(() => {
    if (queryCreateActions.isSuccess) {
      setRunQuery(false);
    }
  }, [queryCreateActions.isSuccess]);

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
        <SidebarMenuButton size="lg">
          <Bolt className="w-4 h-4 mr-2" />
          <span>Mi Cuenta</span>
          <ChevronDown className="w-4 h-4 ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent side="right">
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
            navigator.clipboard.writeText(user?.id!);

            toast.success(`Id copiado al portapapeles ${user?.id!}`);
          }}
        >
          Copiar mi Id
        </DropdownMenuItem>

        {/* Copy token */}
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(user?.token!);
            toast.success(`Id copiado al portapapeles ${user?.token}`);
          }}
        >
          Copiar mi Token
        </DropdownMenuItem>

        {/* Modificar permisos */}
        <DropdownMenuItem asChild>
          <Link to={`${MODULE_USER_PATHS.Update}${user?.id!}`}>
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

        {/* Create Actions */}
        <DropdownMenuItem
          onClick={() => {
            setRunQuery(true);
          }}
        >
          Crear Acciones 🎭
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
