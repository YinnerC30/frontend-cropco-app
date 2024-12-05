import { BreadCrumb } from '@/modules/core/components';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import { memo } from 'react';

export const HarvestProcessedBreadCrumb = memo(() => {
  return (
    <BreadCrumb
      items={[{ link: MODULE_HARVESTS_PATHS.ViewAll, name: 'Cosechas' }]}
      finalItem={`Inventario`}
    />
  );
});
