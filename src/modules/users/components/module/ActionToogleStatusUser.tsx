import { Button, DropdownMenuItem } from '@/components';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import React from 'react';
import { usePatchUserStatus } from '../../hooks/mutations/usePatchStatusUser';

interface Props {
  id: string;
  status: boolean;
}

export const ActionToogleStatusUser: React.FC<Props> = ({ id, status }) => {
  const { toggleOpen } = useDataTableMenuActionsContext();
  const { mutate } = usePatchUserStatus();

  const handleToggleStatus = () => {
    mutate(id, { onSuccess: () => toggleOpen(false) });
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
