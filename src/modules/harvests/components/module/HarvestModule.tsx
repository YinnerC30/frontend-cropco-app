import { BreadCrumb } from '@/modules/core/components';
import { HarvestsModuleProvider } from './HarvestModuleContext';
import { HarvestModuleTable } from './HarvestModuleTable';
import { HarvestModuleActions } from './HarvestModuleActions';
import { HarvestModuleSearchbar } from './HarvestModuleSearchbar';
import React from 'react';

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
