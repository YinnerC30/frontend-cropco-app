import { BasicSearchBar } from '@/modules/core/components';
import { useSuppliersModuleContext } from '../../hooks';

export const SuppliersSearchBar: React.FC = () => {
  const { paramQuery, actionsSuppliersModule } = useSuppliersModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar
        query={paramQuery}
        disabled={!actionsSuppliersModule['find_all_suppliers']}
      />
    </div>
  );
};
