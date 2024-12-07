import { BreadCrumb } from '@/modules/core/components';
import { HarvestsModuleProvider } from './HarvestModuleContext';
import { HarvestModuleTable } from './HarvestModuleTable';
import { HarvestModuleActions } from './HarvestModuleActions';

export const HarvestModuleTemplate = () => {
  return (
    <HarvestsModuleProvider>
      <BreadCrumb finalItem="Cosechas" />
      <HarvestModuleActions />
      <HarvestModuleTable />
    </HarvestsModuleProvider>
  );
};
