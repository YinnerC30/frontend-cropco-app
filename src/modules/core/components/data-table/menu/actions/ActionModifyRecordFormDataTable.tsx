import { Button, DropdownMenuItem } from '@/components';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { Pencil2Icon } from '@radix-ui/react-icons';

export const ActionModifyRecordFormDataTable = ({ action, disabled }: any) => {
  const { toggleOpen } = useDataTableMenuActionsContext();

  const handleClick = () => {
    action();
    toggleOpen(false);
  };
  return (
    <DropdownMenuItem asChild disabled={disabled}>
      <Button variant={'ghost'} onClick={handleClick}>
        <Pencil2Icon className="w-full h-4 mr-2 " /> Modificar
      </Button>
    </DropdownMenuItem>
  );
};
