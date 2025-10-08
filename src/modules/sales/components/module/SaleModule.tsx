import { BreadCrumb } from '@/modules/core/components';
import { SalesModuleProvider } from './SaleModuleContext';
import { SaleModuleTable } from './SaleModuleTable';
import { SaleModuleActions } from './SaleModuleActions';
import { SaleModuleSearchbar } from './search-bar/SaleModuleSearchbar';
import React from 'react';

export const SaleModule: React.FC = () => {
  return (
    <SalesModuleProvider>
      <BreadCrumb finalItem="Ventas" hiddenSeparator />
      <SaleModuleSearchbar />
      <SaleModuleActions />
      <SaleModuleTable />
    </SalesModuleProvider>
  );
};

export default SaleModule;
