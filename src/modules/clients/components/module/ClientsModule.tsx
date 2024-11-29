import { ClientsActions } from './ClientsActions';
import { ClientsBreadCrumb } from './ClientsBreadCrumb';
import { ClientsModuleProvider } from './ClientsModuleContext';
import { ClientsSearchBar } from './ClientsSearchBar';
import { ClientsTable } from './ClientsTable';

export const ClientsModule = () => {
  return (
    <ClientsModuleProvider>
      <div className="select-none">
        <ClientsBreadCrumb />
        <ClientsSearchBar />
        <ClientsActions />
        <ClientsTable />
      </div>
    </ClientsModuleProvider>
  );
};

export default ClientsModule;
