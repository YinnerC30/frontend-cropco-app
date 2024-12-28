import { Loading } from '@/modules/core/components';
import { useHarvestProcessedContext } from './HarvestProcessedContext';
import HarvestProcessedDataTable from './HarvestProcessedDataTable';
import { HarvestProcessedFields } from './HarvestProcessedFields';

export const HarvestProcessedUnion: React.FC = () => {
  const {
    queryOneHarvest: { isLoading },
  } = useHarvestProcessedContext();

  if (isLoading) {
    return (
      <div className="w-full h-full mt-40">
        <Loading />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-evenly">
      <div className="w-auto">
        <HarvestProcessedFields />
      </div>

      <div className="md:w-[40%]">
        <HarvestProcessedDataTable />
      </div>
    </div>
  );
};
