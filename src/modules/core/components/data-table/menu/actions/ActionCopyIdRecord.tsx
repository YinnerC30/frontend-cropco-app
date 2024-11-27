import { Button } from '@/components';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { useDataTableMenuActionsContext } from '../DataTableMenuActionsContext';

interface Props {
  id: string;
}

export const ActionCopyIdRecord = ({ id }: Props) => {
  const { toggleOpen } = useDataTableMenuActionsContext();
  return (
    <DropdownMenuItem asChild>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(id);
          toggleOpen(false);
          toast.success(`Id copiado al portapapeles ${id}`);
        }}
        variant={'ghost'}
        className="cursor-pointer"
      >
        <PaperPlaneIcon className="w-4 h-4 mr-2" /> Copiar Id
      </Button>
    </DropdownMenuItem>
  );
};
