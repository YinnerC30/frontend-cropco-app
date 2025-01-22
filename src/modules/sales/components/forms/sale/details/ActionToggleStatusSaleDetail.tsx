import { Button, DropdownMenuItem } from '@/components';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { ToggleLeft } from 'lucide-react';
import React from 'react';
interface Props {
  action: () => void;
  disabled?: boolean;
}
export const ActionToggleStatusSaleDetail: React.FC<Props> = ({
  action,
  disabled = false,
}) => {
  const { toggleOpen } = useDataTableMenuActionsContext();

  const handleClick = () => {
    action();
    toggleOpen(false);
  };
  return (
    <DropdownMenuItem asChild disabled={disabled}>
      <Button variant={'ghost'} onClick={handleClick}>
        <ToggleLeft className="w-full h-4 mr-2 " /> Cambiar estado
      </Button>
    </DropdownMenuItem>
  );
};
