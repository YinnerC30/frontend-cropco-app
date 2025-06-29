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

import { useTenantsModuleContext } from './TenantsModuleContext';
import { ActionConfigTenantDB } from './actions/ActionConfigTenantDB';
import { ActionToogleStatusTenant } from './actions/ActionToogleStatusTenant';

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

      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Button type="button" variant={'ghost'} className="cursor-pointer">
            <Database className="w-4 h-4 mr-2" />
            {'DB'}
          </Button>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <ActionCreateTenantDB id={id} disabled={false} />
            <ActionConfigTenantDB id={id} status={false} disabled={false} />
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>

      <ActionToogleStatusTenant id={id} status={is_active} disabled={false} />

      <ActionAdminUsers id={id} disabled={!is_active} />
    </DropDownMenuActions>
  );
};
