import { Button, DropdownMenuItem, ToastAction, useToast } from '@/components';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import React from 'react';
import { usePatchUserStatus } from '../../hooks/mutations/usePatchStatusUser';
import { useAuthContext } from '@/auth';

interface Props {
  id: string;
  status: boolean;
}

export const ActionToogleStatusUser: React.FC<Props> = ({ id, status }) => {
  const { user } = useAuthContext();
  const { toggleOpen } = useDataTableMenuActionsContext();
  const { mutate } = usePatchUserStatus();

  const { toast } = useToast();

  const executeMutation = () => {
    mutate(id, { onSuccess: () => toggleOpen(false) });
  };

  const showToast = () => {
    return toast({
      title: 'Se cerrara la sesión',
      duration: 3000,
      description:
        'Esta por desactivar su usuario, si desea continuar por favor presione "Desactivar"',

      action: (
        <ToastAction
          onClick={() => {
            executeMutation();
          }}
          altText="Desactivar"
        >
          Desactivar
        </ToastAction>
      ),
    });
  };

  const handleToggleStatus = () => {
    if (user?.id === id) {
      showToast();
    } else {
      executeMutation();
    }
  };

  return (
    <DropdownMenuItem asChild>
      <Button
        type="button"
        onClick={handleToggleStatus}
        variant={'ghost'}
        className="cursor-pointer"
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
