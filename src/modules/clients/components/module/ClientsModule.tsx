import React from 'react';
import { ClientsActions } from './ClientsActions';

import { ClientsModuleProvider } from './ClientsModuleContext';
import { ClientsSearchBar } from './ClientsSearchBar';
import { ClientsTable } from './ClientsTable';
import { BreadCrumb } from '@/modules/core/components';

export const ClientsModule: React.FC = () => {
  return (
    <ClientsModuleProvider>
      <div className="select-none">
        <BreadCrumb finalItem="Clientes" hiddenSeparator />
        <ClientsSearchBar />
        <ClientsActions />
        <ClientsTable />
      </div>
    </ClientsModuleProvider>
  );
};

export default ClientsModule;
