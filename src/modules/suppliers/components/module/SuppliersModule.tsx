import { SuppliersActions } from './SuppliersActions';
import { SuppliersBreadCrumb } from './SuppliersBreadCrumb';
import { SuppliersModuleProvider } from './SuppliersModuleContext';
import { SuppliersSearchBar } from './SuppliersSearchBar';
import { SuppliersTable } from './SuppliersTable';

export const SuppliersModule = () => {
  return (
    <SuppliersModuleProvider>
      <div className="select-none">
        <SuppliersBreadCrumb />
        <SuppliersSearchBar />
        <SuppliersActions />
        <SuppliersTable />
      </div>
    </SuppliersModuleProvider>
  );
};

export default SuppliersModule;
