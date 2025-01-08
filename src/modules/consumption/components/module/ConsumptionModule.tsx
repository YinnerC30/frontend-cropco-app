import { BreadCrumb } from '@/modules/core/components';
import { ConsumptionModuleProvider } from './ConsumptionModuleContext';
import { ConsumptionModuleTable } from './ConsumptionModuleTable';
import { ConsumptionModuleActions } from './ConsumptionModuleActions';
import { ConsumptionModuleSearchbar } from './ConsumptionModuleSearchbar';

export const ConsumptionModule: React.FC = () => {
  return (
    <ConsumptionModuleProvider>
      <BreadCrumb finalItem="Consumos" hiddenSeparator />
      <ConsumptionModuleSearchbar />
      <ConsumptionModuleActions />
      <ConsumptionModuleTable />
    </ConsumptionModuleProvider>
  );
};

export default ConsumptionModule;
