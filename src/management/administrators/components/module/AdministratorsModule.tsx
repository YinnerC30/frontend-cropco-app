import { BreadCrumb } from '@/modules/core/components';
import { AdministratorsActions } from './AdministratorsActions';
import { AdministratorsModuleProvider } from './AdministratorsModuleContext';
import { AdministratorsSearchBar } from './AdministratorsSearchBar';
import { AdministratorsTable } from './AdministratorsTable';

export const AdministratorsModule = () => {
  return (
    <AdministratorsModuleProvider>
      <div className="select-none">
        <BreadCrumb finalItem="Administradores" hiddenSeparator />
        <AdministratorsSearchBar />
        <AdministratorsActions />
        <AdministratorsTable />
      </div>
    </AdministratorsModuleProvider>
  );
};

export default AdministratorsModule;
