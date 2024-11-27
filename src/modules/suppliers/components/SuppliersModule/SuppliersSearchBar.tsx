import { BasicSearchBar } from '@/modules/core/components';
import { useSuppliersModuleContext } from './SuppliersModuleContext';

export const SuppliersSearchBar = () => {
  const { value, hasPermission } = useSuppliersModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar
        query={value}
        disabled={!hasPermission('suppliers', 'find_all_suppliers')}
      />
    </div>
  );
};
