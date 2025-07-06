import { Button, DropdownMenuItem } from '@/components';
import { usePutConfigTenantDB } from '@/management/tenants/hooks/mutations/usePutConfigTenantDB';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import React from 'react';

interface Props {
  id: string;
  status: boolean;
  disabled?: boolean;
}

export const ActionConfigTenantDB: React.FC<Props> = ({
  id,
  status,
  disabled = false,
}) => {
  const { toggleOpen } = useDataTableMenuActionsContext();
  const { mutate } = usePutConfigTenantDB();

  const handleToggleTenantDB = () => {
    mutate(id, { onSuccess: () => toggleOpen(false) });
  };

  return (
    <DropdownMenuItem asChild>
      <Button
        type="button"
        onClick={handleToggleTenantDB}
        variant={'ghost'}
        className="cursor-pointer"
        disabled={status}
      >
        {status ? 'Ya se migró' : 'Migrar'}
      </Button>
    </DropdownMenuItem>
  );
};
