import { SuppliesActions } from './SuppliesActions';
import { SuppliesBreadCrumb } from './SuppliesBreadCrumb';
import { SuppliesModuleProvider } from './SuppliesModuleContext';
import { SuppliesSearchBar } from './SuppliesSearchBar';
import { SuppliesTable } from './SuppliesTable';

export const SuppliesModule = () => {
  return (
    <SuppliesModuleProvider>
      <div className="select-none">
        <SuppliesBreadCrumb />
        <SuppliesSearchBar />
        <SuppliesActions />
        <SuppliesTable />
      </div>
    </SuppliesModuleProvider>
  );
};

export default SuppliesModule;
