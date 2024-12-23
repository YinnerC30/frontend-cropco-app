import { Button, DropdownMenuItem } from '@/components';
import { ShieldPlus } from 'lucide-react';
import { useEmployeesModuleContext } from '../../hooks';
import { useDataTableMenuActionsContext } from '@/modules/core/components';

interface Props {
  id: string;
  disabled: boolean;
}
export const ActionGetCertification: React.FC<Props> = ({
  id,
  disabled,
}: Props) => {
  const { setUserIdCertification, setExecuteQuery } =
    useEmployeesModuleContext();
  const { toggleOpen } = useDataTableMenuActionsContext();

  const handleCertificateEmployee = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setUserIdCertification(id);
    toggleOpen(false);
    setExecuteQuery(true);
    event.stopPropagation();
  };
  return (
    <DropdownMenuItem asChild disabled={disabled}>
      <Button variant={'ghost'} onClick={handleCertificateEmployee}>
        <ShieldPlus className="w-4 h-4 mr-1" /> Certificar
      </Button>
    </DropdownMenuItem>
  );
};
