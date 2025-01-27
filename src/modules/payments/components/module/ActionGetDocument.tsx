import { Button, DropdownMenuItem } from '@/components';
import { Download } from 'lucide-react';

import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { usePaymentModuleContext } from '../../hooks/context/usePaymentModuleContext';

interface Props {
  id: string;
  disabled: boolean;
}
export const ActionGetDocument: React.FC<Props> = ({ id, disabled }: Props) => {
  const { setPaymentIdDocument, setExecuteQuery } = usePaymentModuleContext();
  const { toggleOpen } = useDataTableMenuActionsContext();

  const handleDocumentPayment = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPaymentIdDocument(id);
    toggleOpen(false);
    setExecuteQuery(true);
    event.stopPropagation();
  };
  return (
    <DropdownMenuItem asChild disabled={disabled}>
      <Button variant={'ghost'} onClick={handleDocumentPayment}>
        <Download className="w-4 h-4 mr-1" /> Descargar PDF
      </Button>
    </DropdownMenuItem>
  );
};
