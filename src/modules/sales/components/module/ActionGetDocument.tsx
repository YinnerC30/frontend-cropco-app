import { Button, DropdownMenuItem } from '@/components';
import { Download } from 'lucide-react';

import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { useSaleModuleContext } from '../../hooks/context/useSaleModuleContext';

interface Props {
  id: string;
  disabled: boolean;
}
export const ActionGetDocument: React.FC<Props> = ({ id, disabled }: Props) => {
  const { setSaleIdDocument, setExecuteQuery } = useSaleModuleContext();
  const { toggleOpen } = useDataTableMenuActionsContext();

  const handleDocumentSale = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSaleIdDocument(id);
    toggleOpen(false);
    setExecuteQuery(true);
    event.stopPropagation();
  };
  return (
    <DropdownMenuItem asChild disabled={disabled}>
      <Button variant={'ghost'} onClick={handleDocumentSale}>
        <Download className="w-4 h-4 mr-1" /> Descargar PDF
      </Button>
    </DropdownMenuItem>
  );
};
