import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useAuthContext } from '@/auth/hooks/useAuthContext';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { useFormChange } from '@/modules/core/components';
import { DialogChangePassword } from '@/modules/users/components/DialogChangePassword';
import { Button } from '../ui/button';
import { Dialog } from '../ui/dialog';
import { useSidebar } from '../ui/sidebar';

export const MyAccount = () => {
  const { user, hasPermission } = useAuthContext();

  const userCanChangePassword = hasPermission('users', 'change_password_user');

  const [openDialog, setOpenDialog] = useState(false);

  const { hasUnsavedChanges, showToast } = useFormChange();

  const handleTrigger = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (hasUnsavedChanges) {
      showToast({ skipRedirection: true, action: () => setOpenDialog(false) });
      return;
    }
    setOpenDialog(false);
  };

  const { isMobile } = useSidebar();

  const [openDropDown, setOpenDropDown] = useState(false);

  // const [isRunningSeed, setIsRunningSeed] = useState(false);
  // const [isConvertToAdmin, setIsConvertToAdmin] = useState(false);

  // const queryImplantedSeed = useImplantSeed(isRunningSeed);
  // const queryConvertToAdmin = useGetConvertToAdmin(user?.id!, isConvertToAdmin);
  // const [runQuery, setRunQuery] = useState(false);
  // const queryCreateActions = useCreationsApp({ stateQuery: runQuery });

  /* useEffect(() => {
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
  }, [queryConvertToAdmin.isSuccess]); */

  return (
    <Dialog onOpenChange={setOpenDialog} modal={false} open={openDialog}>
      <DropdownMenu
        open={openDropDown}
        onOpenChange={setOpenDropDown}
        modal={true}
      >
        {/* Trigger */}
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className="hover:bg-sidebar-accent">
            <span className="overflow-hidden capitalize text-ellipsis">
              {user?.first_name! + ' ' + user?.last_name!}
            </span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>

        {/* Content */}
        <DropdownMenuContent side={isMobile ? 'bottom' : 'right'}>
          {/* Info User Login */}

          {/* Copy Id */}
          {/* <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(user?.id!);

              toast.success(`Id copiado al portapapeles ${user?.id!}`);
            }}
          >
            Copiar mi Id
          </DropdownMenuItem> */}

          {/* Copy token */}
          {/* <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(user?.token!);
              toast.success(`Id copiado al portapapeles ${user?.token}`);
            }}
          >
            Copiar mi Token
          </DropdownMenuItem> */}

          {/* Modificar permisos */}
          {/* <DropdownMenuItem asChild>
            <Link
              onClick={() => setOpenMobile(false)}
              to={`${MODULE_USER_PATHS.Update}${user?.id!}`}
            >
              Modificar mis permisos
            </Link>
          </DropdownMenuItem> */}

          {/* Run Seed */}
          {/* <DropdownMenuItem
            onClick={() => {
              setIsRunningSeed(true);
            }}
          >
            Implantar semilla 🌱
          </DropdownMenuItem> */}

          {/* Turn on Admin */}
          {/* <DropdownMenuItem
            onClick={() => {
              setIsConvertToAdmin(true);
            }}
          >
            Volverte Admin 🤖
          </DropdownMenuItem> */}

          {/* Create Actions */}
          {/* <DropdownMenuItem
            onClick={() => {
              setRunQuery(true);
            }}
          >
            Crear Acciones 🎭
          </DropdownMenuItem> */}

          {/* Change Password Dialog */}

          {userCanChangePassword && (
            <DropdownMenuItem onClick={handleTrigger}>
              Cambiar contraseña
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {openDialog && userCanChangePassword && (
        <DialogChangePassword
          handleCloseDialog={handleCloseDialog}
          setOpenDialog={setOpenDialog}
        />
      )}
    </Dialog>
  );
};
