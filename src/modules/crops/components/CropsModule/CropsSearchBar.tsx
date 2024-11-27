import { BasicSearchBar } from '@/modules/core/components';
import { useCropsModuleContext } from './CropsModuleContext';


export const CropsSearchBar = () => {
  const { value, hasPermission } = useCropsModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar
        query={value}
        disabled={!hasPermission('crops', 'find_all_crops')}
      />
    </div>
  );
};
