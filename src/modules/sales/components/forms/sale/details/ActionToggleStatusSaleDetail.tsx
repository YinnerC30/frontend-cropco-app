import { Button, DropdownMenuItem } from '@/components';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { useFormSaleContext } from '@/modules/sales/hooks';
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
  const { isToggleStatusRecord, setIsToggleStatusRecord } =
    useFormSaleContext();
  const { toggleOpen } = useDataTableMenuActionsContext();

  const handleClick = () => {
    action();
    setTimeout(() => {
      setIsToggleStatusRecord(false);
    }, 1000);
    toggleOpen(false);
  };
  return (
    <DropdownMenuItem asChild disabled={isToggleStatusRecord || disabled}>
      <Button variant={'ghost'} onClick={handleClick}>
        <ToggleLeft className="w-full h-4 mr-2 " /> Cambiar estado
      </Button>
    </DropdownMenuItem>
  );
};
