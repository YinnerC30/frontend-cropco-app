import { BasicSearchBar } from '@/modules/core/components';
import { useEmployeesModuleContext } from '../../hooks';

export const EmployeesSearchBar = () => {
  const { value, hasPermission } = useEmployeesModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar
        query={value}
        disabled={!hasPermission('employees', 'find_all_employees')}
      />
    </div>
  );
};
