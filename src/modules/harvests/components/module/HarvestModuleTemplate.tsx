import { BreadCrumb } from '@/modules/core/components';
import { HarvestsModuleProvider } from './HarvestModuleContext';
import { HarvestModuleTable } from './HarvestModuleTable';
import { HarvestModuleActions } from './HarvestModuleActions';
import { HarvestModuleSearchbar } from './HarvestModuleSearchbar';

export const HarvestModuleTemplate = () => {
  return (
    <HarvestsModuleProvider>
        <BreadCrumb finalItem="Cosechas" />
      <div className='flex flex-col items-center'>
        <HarvestModuleSearchbar />
      </div>
        <HarvestModuleActions />
        <HarvestModuleTable />
    </HarvestsModuleProvider>
  );
};
