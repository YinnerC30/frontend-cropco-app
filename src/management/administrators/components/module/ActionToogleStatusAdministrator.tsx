import { useAuthContext } from '@/auth';
import { Button, DropdownMenuItem } from '@/components';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { usePatchAdministratorStatus } from '../../hooks/mutations/usePatchStatusAdministrator';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';

interface Props {
  id: string;
  status: boolean;
  disabled?: boolean;
}

export const ActionToogleStatusAdministrator: React.FC<Props> = ({
  id,
  status,
  disabled = false,
}) => {
  const { user } = useAuthTenantContext();
  const { toggleOpen } = useDataTableMenuActionsContext();
  const { mutate } = usePatchAdministratorStatus();

  const handleToggleAdministrator = () => {
    mutate(id, { onSuccess: () => toggleOpen(false) });
  };

  const showToast = () => {
    toast('Se cerrara la sesión', {
      description:
        'Esta por desactivar su usuario, si desea continuar por favor presione "Desactivar"',
      action: {
        label: 'Desactivar',
        onClick: handleToggleAdministrator,
      },
      duration: 3000,
    });
  };

  const handleToggleStatus = () => {
    if (user?.id === id) {
      showToast();
    } else {
      handleToggleAdministrator();
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
            <ToggleRight className="w-4 h-4 mr-2" /> Desactivar
          </>
        ) : (
          <>
            <ToggleLeft className="w-4 h-4 mr-2" /> Activar
          </>
        )}
      </Button>
    </DropdownMenuItem>
  );
};
