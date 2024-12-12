import { BreadCrumb } from '@/modules/core/components';
import { HarvestsModuleProvider } from './HarvestModuleContext';
import { HarvestModuleTable } from './HarvestModuleTable';
import { HarvestModuleActions } from './HarvestModuleActions';
import { HarvestModuleSearchbar } from './HarvestModuleSearchbar';

export const HarvestModule = () => {
  return (
    <HarvestsModuleProvider>
      <BreadCrumb finalItem="Cosechas" />
      <HarvestModuleSearchbar />
      <HarvestModuleActions />
      <HarvestModuleTable />
    </HarvestsModuleProvider>
  );
};

export default HarvestModule;
