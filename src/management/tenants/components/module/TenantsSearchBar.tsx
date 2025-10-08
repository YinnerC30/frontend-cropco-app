import { BasicSearchBar } from '@/modules/core/components';
import { useTenantsModuleContext } from './TenantsModuleContext';

export const TenantsSearchBar: React.FC = () => {
  const { paramQuery } = useTenantsModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar query={paramQuery} disabled={false} />
    </div>
  );
};
