import { useAuthContext } from '@/auth';
import { Button, DropdownMenuItem } from '@/components';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { usePatchUserStatus } from '../../hooks/mutations/usePatchStatusUser';

interface Props {
  id: string;
  status: boolean;
  disabled?: boolean;
}

export const ActionToogleStatusUser: React.FC<Props> = ({
  id,
  status,
  disabled = false,
}) => {
  const { user } = useAuthContext();
  const { toggleOpen } = useDataTableMenuActionsContext();
  const { mutate } = usePatchUserStatus();

  const handleToggleUser = () => {
    mutate(id, { onSuccess: () => toggleOpen(false) });
  };

  const showToast = () => {
    toast('Se cerrara la sesión', {
      description:
        'Esta por desactivar su usuario, si desea continuar por favor presione "Desactivar"',
      action: {
        label: 'Desactivar',
        onClick: handleToggleUser,
      },
      duration: 3000,
    });
    // return toast({
    //   title: 'Se cerrara la sesión',
    //   duration: 3000,
    //   description:
    //     'Esta por desactivar su usuario, si desea continuar por favor presione "Desactivar"',

    //   action: (
    //     <ToastAction
    //       onClick={() => {
    //         executeMutation();
    //       }}
    //       altText="Desactivar"
    //     >
    //       Desactivar
    //     </ToastAction>
    //   ),
    // });
  };

  const handleToggleStatus = () => {
    if (user?.id === id) {
      showToast();
    } else {
      handleToggleUser();
    }
  };

  return (
    <DropdownMenuItem asChild>
      <Button
        type="button"
        onClick={handleToggleStatus}
        variant={'ghost'}
        className="cursor-pointer"
        disabled={disabled}
      >
        {status ? (
          <>
            <ToggleLeft className="w-4 h-4 mr-2" /> Desactivar
          </>
        ) : (
          <>
            <ToggleRight className="w-4 h-4 mr-2" /> Activar
          </>
        )}
      </Button>
    </DropdownMenuItem>
  );
};
