import { BasicSearchBar } from '@/modules/core/components';
import { useEmployeesModuleContext } from '../../hooks';

export const EmployeesSearchBar: React.FC = () => {
  const { paramQuery, actionsEmployeesModule } = useEmployeesModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar
        query={paramQuery}
        disabled={!actionsEmployeesModule['find_all_employees']}
      />
    </div>
  );
};
