import { Button, DropdownMenuItem } from '@/components';
import { FileText } from 'lucide-react';

import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';

interface Props {
  id: string;
  disabled: boolean;
}
export const ActionGetDocument: React.FC<Props> = ({
  id,
  disabled,
}: Props) => {
  const { setHarvestIdDocument, setExecuteQuery } = useHarvestModuleContext();
  const { toggleOpen } = useDataTableMenuActionsContext();

  const handleDocumentHarvest = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setHarvestIdDocument(id);
    toggleOpen(false);
    setExecuteQuery(true);
    event.stopPropagation();
  };
  return (
    <DropdownMenuItem asChild disabled={disabled}>
      <Button variant={'ghost'} onClick={handleDocumentHarvest}>
        <FileText className="w-4 h-4 mr-1" /> Certificar
      </Button>
    </DropdownMenuItem>
  );
};
