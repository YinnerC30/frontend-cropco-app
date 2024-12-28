import { ScrollArea } from '@/components';
import { BreadCrumb } from '@/modules/core/components';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import { useParams } from 'react-router-dom';
import { HarvestProcessedProvider } from './HarvestProcessedContext';
import { HarvestProcessedReturnButton } from './HarvestProcessedReturnButton';
import { HarvestProcessedUnion } from './HarvestProcessedUnion';

export const HarvestProcessed: React.FC = () => {
  const { id } = useParams();
  return (
    <HarvestProcessedProvider id={id!}>
      <BreadCrumb
        items={[{ link: MODULE_HARVESTS_PATHS.ViewAll, name: 'Cosechas' }]}
        finalItem={`Inventario`}
      />
      <ScrollArea className={`h-[75vh] w-full pb-2`}>
        <HarvestProcessedUnion />
      </ScrollArea>

      <HarvestProcessedReturnButton />
    </HarvestProcessedProvider>
  );
};

export default HarvestProcessed;
