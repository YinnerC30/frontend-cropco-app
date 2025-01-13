import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useImplantSeed } from '@/auth/hooks/queries/useImplantSeed';
import { useAuthContext } from '@/auth/hooks/useAuthContext';
import { DialogChangePassword } from '@/modules/users/components/DialogChangePassword';
import { useGetConvertToAdmin } from '@/modules/users/hooks';

import { useCreationsApp } from '@/auth/hooks/queries/useCreateActionsApp';
import { MODULE_USER_PATHS } from '@/modules/users/routes/pathsRoutes';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { useSidebar } from '../ui/sidebar';

export const MyAccount = () => {
  const { user, saveUser } = useAuthContext();

  const { isMobile, setOpenMobile } = useSidebar();

  const [openDropDown, setOpenDropDown] = useState(false);

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
      setIsRunningSeed(false);
    }
  }, [queryImplantedSeed.isSuccess]);

  useEffect(() => {
    if (queryConvertToAdmin.isSuccess) {
      toast.success('Ya te volviste admin');
      saveUser({
        ...queryConvertToAdmin.data!,
        isLogin: true,
        token: user?.token!,
      });
      setIsConvertToAdmin(false);
    }
  }, [queryConvertToAdmin.isSuccess]);

  return (
    <DropdownMenu
      open={openDropDown}
      onOpenChange={setOpenDropDown}
      modal={true}
    >
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'}>
          <span className="capitalize">
            {user?.first_name! + ' ' + user?.last_name!}
          </span>
          <ChevronDown className="w-4 h-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent side={isMobile ? 'bottom' : 'right'}>
        {/* Info User Login */}

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
          <Link
            onClick={() => setOpenMobile(false)}
            to={`${MODULE_USER_PATHS.Update}${user?.id!}`}
          >
            Modificar mis permisos
          </Link>
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
