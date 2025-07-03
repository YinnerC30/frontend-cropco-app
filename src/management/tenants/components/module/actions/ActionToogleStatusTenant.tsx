import { Button, DropdownMenuItem } from '@/components';
import { usePatchTenantStatus } from '@/management/tenants/hooks/mutations/usePatchStatusTenant';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import React from 'react';

interface Props {
  id: string;
  status: boolean;
  disabled?: boolean;
}

export const ActionToogleStatusTenant: React.FC<Props> = ({
  id,
  status,
  disabled = false,
}) => {
  const { toggleOpen } = useDataTableMenuActionsContext();
  const { mutate } = usePatchTenantStatus();

  const handleToggleTenant = () => {
    mutate(id, { onSuccess: () => toggleOpen(false) });
  };

  return (
    <DropdownMenuItem asChild>
      <Button
        type="button"
        onClick={handleToggleTenant}
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
