import { Button, DropdownMenuItem } from '@/components';
import { ShieldPlus } from 'lucide-react';
import { useEmployeesModuleContext } from './EmployeesModuleContext';
import { useDataTableMenuActionsContext } from '@/modules/core/components/DataTable';

export const ActionGetCertification = ({ id }: any) => {
  const { setUserIdCertification, setExecuteQuery } =
    useEmployeesModuleContext();
  const { toggleOpen } = useDataTableMenuActionsContext();

  const handleCertificateEmployee = (event: any) => {
    setUserIdCertification(id);
    toggleOpen(false);
    setExecuteQuery(true);
    event.stopPropagation();
  };
  return (
    <DropdownMenuItem asChild>
      <Button variant={'ghost'} onClick={handleCertificateEmployee}>
        <ShieldPlus className="w-4 h-4 mr-1" /> Certificar
      </Button>
    </DropdownMenuItem>
  );
};
