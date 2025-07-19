import { Button, DropdownMenuItem } from '@/components';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import React from 'react';
import { useCreateTenantDB } from '../../../hooks/mutations/useCreateTenantDB';

interface Props {
  id: string;
  status: boolean;
  disabled?: boolean;
}

export const ActionCreateTenantDB: React.FC<Props> = ({
  id,
  status = false,
  disabled = false,
}) => {
  const { toggleOpen } = useDataTableMenuActionsContext();
  const { mutate, isPending } = useCreateTenantDB();

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
        disabled={disabled || status || isPending}
      >
        {status ? 'Ya se creo' : 'Crear'}
      </Button>
    </DropdownMenuItem>
  );
};
