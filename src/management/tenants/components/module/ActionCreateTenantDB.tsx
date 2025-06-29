import { Button, DropdownMenuItem } from '@/components';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { Database } from 'lucide-react';
import React from 'react';
import { useCreateTenantDB } from '../../hooks/mutations/useCreateTenantDB';

interface Props {
  id: string;
  disabled?: boolean;
}

export const ActionCreateTenantDB: React.FC<Props> = ({
  id,
  disabled = false,
}) => {
  const { toggleOpen } = useDataTableMenuActionsContext();
  const { mutate } = useCreateTenantDB();

  const handleCreateTenantDB = () => {
    mutate(id, { onSuccess: () => toggleOpen(false) });
  };

  return (
    <DropdownMenuItem asChild>
      <Button
        type="button"
        onClick={handleCreateTenantDB}
        variant={'ghost'}
        className="cursor-pointer"
        disabled={disabled}
      >
        <Database className="w-4 h-4 mr-2" /> Crear DB
      </Button>
    </DropdownMenuItem>
  );
};
