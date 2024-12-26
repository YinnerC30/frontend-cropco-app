import { BreadCrumb } from '@/modules/core/components';
import { SuppliersActions } from './SuppliersActions';
import { SuppliersModuleProvider } from './SuppliersModuleContext';
import { SuppliersSearchBar } from './SuppliersSearchBar';
import { SuppliersTable } from './SuppliersTable';

export const SuppliersModule: React.FC = () => {
  return (
    <SuppliersModuleProvider>
      <div className="select-none">
        <BreadCrumb finalItem="Proveedores" hiddenSeparator />
        <SuppliersSearchBar />
        <SuppliersActions />
        <SuppliersTable />
      </div>
    </SuppliersModuleProvider>
  );
};

export default SuppliersModule;
