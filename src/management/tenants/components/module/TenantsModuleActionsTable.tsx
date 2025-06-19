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
import { ActionToogleStatusTenantDB } from './ActionToogleStatusTenantDB';

interface Props {
  row: Row<Tenant>;
}

export const TenantsModuleActionsTable: React.FC<Props> = ({ row }) => {
  const id = row?.original?.id ?? '';
  const is_active = row?.original?.is_active ?? false;

  const is_migrated = row?.original?.databases?.[0]?.is_migrated ?? false;
  const handleDelete = () => {
    console.log('tenant eliminado');
  };

  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />

      <ActionDeleteRecord action={handleDelete} disabled={false} />

      <ActionModifyRecord id={id} disabled={false} />

      <ActionViewRecord id={id} disabled={false} />

      <ActionToogleStatusTenant id={id} status={is_active} disabled={false} />

      <ActionToogleStatusTenantDB
        id={id}
        status={is_migrated}
        disabled={false}
      />
    </DropDownMenuActions>
  );
};
