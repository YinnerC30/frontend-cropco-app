import { EmployeesActions } from './EmployeesActions';
import { EmployeesBreadCrumb } from './EmployeesBreadCrumb';
import { EmployeesModuleProvider } from './EmployeesModuleContext';
import { EmployeesSearchBar } from './EmployeesSearchBar';
import { EmployeesTable } from './EmployeesTable';

export const EmployeesModule = () => {
  return (
    <EmployeesModuleProvider>
      <div className="select-none">
        <EmployeesBreadCrumb />
        <EmployeesSearchBar />
        <EmployeesActions />
        <EmployeesTable />
      </div>
    </EmployeesModuleProvider>
  );
};

export default EmployeesModule;
