import { BreadCrumb } from '@/modules/core/components';
import { SuppliesActions } from './SuppliesActions';
import { SuppliesModuleProvider } from './SuppliesModuleContext';
import { SuppliesSearchBar } from './SuppliesSearchBar';
import { SuppliesTable } from './SuppliesTable';

export const SuppliesModule: React.FC = () => {
  return (
    <SuppliesModuleProvider>
      <div className="select-none">
      <BreadCrumb finalItem="Suministros" hiddenSeparator />
        <SuppliesSearchBar />
        <SuppliesActions />
        <SuppliesTable />
      </div>
    </SuppliesModuleProvider>
  );
};

export default SuppliesModule;
