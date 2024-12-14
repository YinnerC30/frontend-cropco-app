import { BreadCrumb } from '@/modules/core/components';
import { SalesModuleProvider } from './SaleModuleContext';
import { SaleModuleTable } from './SaleModuleTable';
import { SaleModuleActions } from './SaleModuleActions';
import { SaleModuleSearchbar } from './SaleModuleSearchbar';

export const SaleModule = () => {
  return (
    <SalesModuleProvider>
      <BreadCrumb finalItem="Ventas" />
      <SaleModuleSearchbar />
      <SaleModuleActions />
      <SaleModuleTable />
    </SalesModuleProvider>
  );
};

export default SaleModule;
