import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
  DropDownMenuActions,
} from '@/modules/core/components';

import { Row } from '@tanstack/react-table';
import React from 'react';
import { useSaleModuleContext } from '../../hooks/context/useSaleModuleContext';
import { Sale } from '../../interfaces';
import { MODULE_SALES_PATHS } from '../../routes/pathRoutes';
import { ActionGetDocument } from './ActionGetDocument';

export const ActionsTableSale: React.FC<{ row: Row<Sale> }> = ({ row }) => {
  const {
    dataTable: { resetSelectionRows },
    actionsSalesModule,
    mutationDeleteSale,
  } = useSaleModuleContext();
  const id = row.original.id ?? '';
  const { mutate } = mutationDeleteSale;

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        resetSelectionRows();
      },
    });
  };
  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={id} />
      <ActionDeleteRecord
        action={handleDelete}
        disabled={!actionsSalesModule['remove_one_sale']}
      />
      <ActionModifyRecord
        id={id}
        path={MODULE_SALES_PATHS.Update + id}
        disabled={!actionsSalesModule['update_one_sale']}
      />
      <ActionViewRecord
        id={id}
        path={MODULE_SALES_PATHS.ViewOne + id}
        disabled={!actionsSalesModule['find_one_sale']}
      />
      <ActionGetDocument id={id} disabled={!actionsSalesModule['export_sale_to_pdf']}/>
    </DropDownMenuActions>
  );
};
