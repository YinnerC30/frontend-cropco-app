import { Button, DropdownMenuItem } from '@/components';
import { useDataTableMenuActionsContext } from '../DataTableMenuActionsContext';
import { LucideIcon } from 'lucide-react';

interface Props {
  action: () => void;
  disabled?: boolean;
  Icon: LucideIcon;
  label: string;
}
export const ActionButtonCustom: React.FC<Props> = ({
  action,
  disabled = false,
  Icon,
  label,
}) => {
  const { toggleOpen } = useDataTableMenuActionsContext();
  return (
    <DropdownMenuItem disabled={disabled} asChild>
      <Button
        type="button"
        variant={'ghost'}
        onClick={() => {
          action();
          toggleOpen(false);
        }}
      >
        <Icon className="w-4 h-4 mr-2" /> {label}
      </Button>
    </DropdownMenuItem>
  );
};
