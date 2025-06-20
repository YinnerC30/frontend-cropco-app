import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Button, Dialog, useSidebar } from '@/components';
import { userPatchChangePasswordAdministrator } from '@/management/administrators/hooks/mutations/userPatchChangePasswordAdministrator';
import { useFormChange } from '@/modules/core/components';
import { DialogChangePassword } from '@/modules/users/components/DialogChangePassword';
import { useAuthTenantContext } from './AuthTenantContext';

export const MyAdministratorAccount = () => {
  const { user } = useAuthTenantContext();

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

  const { isPending, mutate } = userPatchChangePasswordAdministrator();

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

          <DropdownMenuItem onClick={handleTrigger}>
            Cambiar contraseña
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {openDialog && (
        <DialogChangePassword
          handleCloseDialog={handleCloseDialog}
          setOpenDialog={setOpenDialog}
          isPending={isPending}
          mutate={mutate}
          id={user?.id!}
        />
      )}
    </Dialog>
  );
};
