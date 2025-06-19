import { Button, DropdownMenuItem } from '@/components';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { Database } from 'lucide-react';
import React from 'react';
import { usePatchTenantDBStatus } from '../../hooks/mutations/usePatchStatusTenantDB';

interface Props {
  id: string;
  status: boolean;
  disabled?: boolean;
}

export const ActionToogleStatusTenantDB: React.FC<Props> = ({
  id,
  status,
  disabled = false,
}) => {
  const { toggleOpen } = useDataTableMenuActionsContext();
  const { mutate } = usePatchTenantDBStatus();

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
        <Database className="w-4 h-4 mr-2" />
        {status ? 'Ya se migró' : 'Migrar DB'}
      </Button>
    </DropdownMenuItem>
  );
};
