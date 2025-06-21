import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/data-table/menu/actions';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import React from 'react';

import { Tenant } from '../../interfaces/Tenant';
import { ActionToogleStatusTenant } from './ActionToogleStatusTenant';
import { ActionVisitSiteTenant } from './ActionVisitSiteTenant';
import { useTenantsModuleContext } from './TenantsModuleContext';
import { ActionAdminUsers } from './ActionAdministrationUsers';

interface Props {
  row: Row<Tenant>;
}

export const TenantsModuleActionsTable: React.FC<Props> = ({ row }) => {
  const { dataTable, mutationDeleteTenant } = useTenantsModuleContext();

  const id = row?.original?.id ?? '';
  const is_active = row?.original?.is_active ?? false;

  const subdomain = row?.original?.subdomain ?? '';

  const handleDelete = () => {
    mutationDeleteTenant.mutate(id, {
      onSuccess: () => {
        dataTable.resetSelectionRows();
      },
    });
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />

      <ActionVisitSiteTenant subdomain={subdomain} disabled={!is_active} />

      <ActionDeleteRecord action={handleDelete} disabled={false} />

      <ActionModifyRecord id={id} disabled={false} />

      <ActionViewRecord id={id} disabled={false} />

      <ActionToogleStatusTenant id={id} status={is_active} disabled={false} />

      <ActionAdminUsers id={id} />

      {/* <ActionToogleStatusTenantDB
        id={id}
        status={is_migrated}
        disabled={false}
      /> */}
    </DropDownMenuActions>
  );
};
