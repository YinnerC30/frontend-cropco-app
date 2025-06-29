import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
} from '@/modules/core/components/data-table/menu/actions';
import { DropDownMenuActions } from '@/modules/core/components/data-table/menu/DropDownMenuActions';
import { Row } from '@tanstack/react-table';
import React from 'react';

import {
  Button,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components';
import { Database } from 'lucide-react';
import { Tenant } from '../../interfaces/Tenant';

import { ActionAdminUsers } from './actions/ActionAdministrationUsers';
import { ActionCreateTenantDB } from './actions/ActionCreateTenantDB';
import { ActionVisitSiteTenant } from './actions/ActionVisitSiteTenant';

import { ActionConfigTenantDB } from './actions/ActionConfigTenantDB';
import { ActionToogleStatusTenant } from './actions/ActionToogleStatusTenant';
import { useTenantsModuleContext } from './TenantsModuleContext';

interface Props {
  row: Row<Tenant>;
}

export const TenantsModuleActionsTable: React.FC<Props> = ({ row }) => {
  const { dataTable, mutationDeleteTenant } = useTenantsModuleContext();

  const id = row?.original?.id ?? '';
  const is_active_tenant = row?.original?.is_active ?? false;
  const is_created_db = row?.original?.is_created_db ?? false;
  const is_migrated_db = row?.original?.databases?.[0]?.is_migrated ?? false;

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

      <ActionVisitSiteTenant
        subdomain={subdomain}
        disabled={!is_active_tenant || !is_created_db || !is_migrated_db}
      />

      <ActionDeleteRecord action={handleDelete} disabled={false} />

      <ActionModifyRecord id={id} disabled={false} />

      <ActionViewRecord id={id} disabled={false} />

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className={'h-8'}>
          <Button type="button" variant={'ghost'} className="cursor-pointer">
            <Database className="w-4 h-4 mr-2" />
            {'DB'}
          </Button>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <ActionCreateTenantDB
              id={id}
              status={is_created_db}
              disabled={is_created_db}
            />
            <ActionConfigTenantDB
              id={id}
              status={is_migrated_db}
              disabled={false}
            />
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>

      <ActionToogleStatusTenant
        id={id}
        status={is_active_tenant}
        disabled={false}
      />

      <ActionAdminUsers
        id={id}
        disabled={!is_active_tenant || !is_created_db}
      />
    </DropDownMenuActions>
  );
};
