import { BreadCrumb } from '@/modules/core/components';
import React from 'react';
import { HarvestModuleActions } from './HarvestModuleActions';
import { HarvestsModuleProvider } from './HarvestModuleContext';
import { HarvestModuleSearchbar } from './HarvestModuleSearchbar';
import { HarvestModuleTable } from './HarvestModuleTable';

export const HarvestModule: React.FC = () => {
  return (
    <HarvestsModuleProvider>
      <BreadCrumb finalItem="Cosechas" hiddenSeparator />
        <HarvestModuleSearchbar />
        <HarvestModuleActions />
        <HarvestModuleTable />
    </HarvestsModuleProvider>
  );
};

export default HarvestModule;
