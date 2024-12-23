import { BreadCrumb } from '@/modules/core/components';
import { EmployeesActions } from './EmployeesActions';
import { EmployeesModuleProvider } from './EmployeesModuleContext';
import { EmployeesSearchBar } from './EmployeesSearchBar';
import { EmployeesTable } from './EmployeesTable';

export const EmployeesModule: React.FC = () => {
  return (
    <EmployeesModuleProvider>
      <div className="select-none">
        <BreadCrumb finalItem="Empleados" hiddenSeparator />
        <EmployeesSearchBar />
        <EmployeesActions />
        <EmployeesTable />
      </div>
    </EmployeesModuleProvider>
  );
};

export default EmployeesModule;
