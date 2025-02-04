import { Button, DropdownMenuItem } from '@/components';
import { Download } from 'lucide-react';

import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { useShoppingModuleContext } from '../../hooks/context/useShoppingModuleContext';

interface Props {
  id: string;
  disabled: boolean;
}
export const ActionGetDocument: React.FC<Props> = ({ id, disabled }: Props) => {
  const { setShoppingIdDocument, setExecuteQuery } = useShoppingModuleContext();
  const { toggleOpen } = useDataTableMenuActionsContext();

  const handleDocumentShopping = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShoppingIdDocument(id);
    toggleOpen(false);
    setExecuteQuery(true);
    event.stopPropagation();
  };
  return (
    <DropdownMenuItem asChild disabled={disabled}>
      <Button variant={'ghost'} onClick={handleDocumentShopping}>
        <Download className="w-4 h-4 mr-1" /> Descargar PDF
      </Button>
    </DropdownMenuItem>
  );
};
