import { BasicSearchBar } from '@/modules/core/components';
import { useCropsModuleContext } from '../../hooks';

export const CropsSearchBar: React.FC = () => {
  const { paramQuery, actionsCropsModule } = useCropsModuleContext();

  return (
    <div className="flex items-center justify-center w-full">
      <BasicSearchBar
        query={paramQuery}
        disabled={!actionsCropsModule['find_all_crops']}
      />
    </div>
  );
};
