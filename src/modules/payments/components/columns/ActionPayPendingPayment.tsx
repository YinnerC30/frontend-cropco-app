import { Button } from '@/components';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { CircleDollarSignIcon } from 'lucide-react';

interface Props {
  action: () => void;
}

export const ActionPayPendingPayment: React.FC<Props> = ({ action }: Props) => {
  const { toggleOpen } = useDataTableMenuActionsContext();
  return (
    <DropdownMenuItem asChild>
      <Button
        onClick={() => {
          toggleOpen(false);
          action();
        }}
        variant={'ghost'}
        className="cursor-pointer"
      >
        <CircleDollarSignIcon className="w-4 h-4 mr-2" /> Pagar
      </Button>
    </DropdownMenuItem>
  );
};
