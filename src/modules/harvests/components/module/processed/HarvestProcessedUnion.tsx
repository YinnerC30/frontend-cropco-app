import { Label } from 'recharts';
import { FormHarvestProcessed } from './FormHarvestProcessed';
import HarvestProcessedDataTable from './HarvestProcessedDataTable';
import { HarvestProcessedFields } from './HarvestProcessedFields';
import { Loading } from '@/modules/core/components';
import { useHarvestProcessedContext } from './HarvestProcessedContext';

export const HarvestProcessedUnion = () => {
  const { isLoading } = useHarvestProcessedContext();

  if (isLoading) {
    return (
      <div className="w-full h-full mt-40">
        <Loading />
      </div>
    );
  }
  return (
    <div className="flex justify-evenly">
      <div className="w-[500px]">
        <HarvestProcessedFields />
      </div>
      {/* <Separator className="my-4" /> */}
      <div className="w-[600px] ">
        <Label>
          A continuación registre de forma individual la cosecha procesada que
          ha salido hasta el momento:
        </Label>
        <div className="flex flex-col items-center justify-center ">
          <FormHarvestProcessed />
          <HarvestProcessedDataTable />
        </div>
      </div>
    </div>
  );
};
