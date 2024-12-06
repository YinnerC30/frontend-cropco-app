import { Label } from '@/components';
import { useParams } from 'react-router-dom';
import { FormHarvestProcessed } from './FormHarvestProcessed';
import { HarvestProcessedBreadCrumb } from './HarvestProcessedBreadCrumb';
import { HarvestProcessedProvider } from './HarvestProcessedContext';
import HarvestProcessedDataTable from './HarvestProcessedDataTable';
import { HarvestProcessedFields } from './HarvestProcessedFields';
import { HarvestProcessedReturnButton } from './HarvestProcessedReturnButton';
import { HarvestProcessedScrollArea } from './HarvestProcessedScrollArea';

export const HarvestProcessed = () => {
  const { id } = useParams();
  return (
    <HarvestProcessedProvider id={id!}>
      <HarvestProcessedBreadCrumb />
      <HarvestProcessedScrollArea>
        <div className="flex justify-evenly">
          <div className="w-[500px]">
            <HarvestProcessedFields />
          </div>
          {/* <Separator className="my-4" /> */}
          <div className="w-[600px] ">
            <Label>
              A continuación registre de forma individual la cosecha procesada
              que ha salido hasta el momento:
            </Label>
            <div className="flex flex-col items-center justify-center ">
              <FormHarvestProcessed />
              <HarvestProcessedDataTable />
            </div>
          </div>
        </div>
      </HarvestProcessedScrollArea>
      <HarvestProcessedReturnButton />
    </HarvestProcessedProvider>
  );
};
