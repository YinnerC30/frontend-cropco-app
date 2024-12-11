import { useParams } from 'react-router-dom';
import { HarvestProcessedBreadCrumb } from './HarvestProcessedBreadCrumb';
import { HarvestProcessedProvider } from './HarvestProcessedContext';
import { HarvestProcessedReturnButton } from './HarvestProcessedReturnButton';
import { HarvestProcessedScrollArea } from './HarvestProcessedScrollArea';
import { HarvestProcessedUnion } from './HarvestProcessedUnion';

export const HarvestProcessed = () => {
  const { id } = useParams();
  return (
    <HarvestProcessedProvider id={id!}>
      <HarvestProcessedBreadCrumb />
      <HarvestProcessedScrollArea>
        <HarvestProcessedUnion />
      </HarvestProcessedScrollArea>
      <HarvestProcessedReturnButton />
    </HarvestProcessedProvider>
  );
};
