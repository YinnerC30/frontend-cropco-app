import { ScrollArea } from '@/components';
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
      <ScrollArea className="h-[90vh] w-full pr-6">
        <HarvestModuleSearchbar />
        <HarvestModuleActions />
        <HarvestModuleTable />
      </ScrollArea>
    </HarvestsModuleProvider>
  );
};

export default HarvestModule;
