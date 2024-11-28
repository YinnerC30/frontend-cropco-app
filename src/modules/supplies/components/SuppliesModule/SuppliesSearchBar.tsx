import { BasicSearchBar } from '@/modules/core/components';
import { useSuppliesModuleContext } from './SuppliesModuleContext';

export const SuppliesSearchBar = () => {
  const { value, hasPermission } = useSuppliesModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar
        query={value}
        disabled={!hasPermission('supplies', 'find_all_supplies')}
      />
    </div>
  );
};
