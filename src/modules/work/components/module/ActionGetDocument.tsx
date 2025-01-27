import { Button, DropdownMenuItem } from '@/components';
import { FileText } from 'lucide-react';

import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { useWorkModuleContext } from '../../hooks/context/useWorkModuleContext';

interface Props {
  id: string;
  disabled: boolean;
}
export const ActionGetDocument: React.FC<Props> = ({ id, disabled }: Props) => {
  const { setWorkIdDocument, setExecuteQuery } = useWorkModuleContext();
  const { toggleOpen } = useDataTableMenuActionsContext();

  const handleDocumentWork = (event: React.MouseEvent<HTMLButtonElement>) => {
    setWorkIdDocument(id);
    toggleOpen(false);
    setExecuteQuery(true);
    event.stopPropagation();
  };
  return (
    <DropdownMenuItem asChild disabled={disabled}>
      <Button variant={'ghost'} onClick={handleDocumentWork}>
        <FileText className="w-4 h-4 mr-1" /> Certificar
      </Button>
    </DropdownMenuItem>
  );
};
