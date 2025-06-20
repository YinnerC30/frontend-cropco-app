import { BasicSearchBar } from '@/modules/core/components';
import { useAdministratorsModuleContext } from '../../hooks/context/useAdministratorsModuleContext';

export const AdministratorsSearchBar: React.FC = () => {
  const { paramQuery } = useAdministratorsModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar query={paramQuery} disabled={false} />
    </div>
  );
};
