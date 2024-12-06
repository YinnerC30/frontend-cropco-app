import { Button, DropdownMenuItem } from '@/components';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { Pencil2Icon } from '@radix-ui/react-icons';

export const ActionModifyRecordFormDataTable = ({ action }: any) => {
  const { toggleOpen } = useDataTableMenuActionsContext();

  const handleClick = () => {
    action();
    toggleOpen(false);
  };
  return (
    <DropdownMenuItem asChild>
      <Button variant={'ghost'} onClick={handleClick}>
        <Pencil2Icon className="w-full h-4 mr-2 " /> Modificar
      </Button>
    </DropdownMenuItem>
  );
};
