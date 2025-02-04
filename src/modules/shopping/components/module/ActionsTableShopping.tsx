import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
  DropDownMenuActions,
} from '@/modules/core/components';

import { Row } from '@tanstack/react-table';
import React from 'react';
import { useShoppingModuleContext } from '../../hooks/context/useShoppingModuleContext';
import { ShoppingSupplies } from '../../interfaces';
import { MODULE_SHOPPING_PATHS } from '../../routes/pathRoutes';
import { ActionGetDocument } from './ActionGetDocument';

export const ActionsTableShopping: React.FC<{
  row: Row<ShoppingSupplies>;
}> = ({ row }) => {
  const {
    dataTable: { resetSelectionRows },
    actionsShoppingModule,
    mutationDeleteOneShopping,
  } = useShoppingModuleContext();
  const id = row.original.id ?? '';
  const { mutate } = mutationDeleteOneShopping;

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
        disabled={!actionsShoppingModule['remove_one_supplies_shopping']}
      />
      <ActionModifyRecord
        id={id}
        path={MODULE_SHOPPING_PATHS.Update + id}
        disabled={!actionsShoppingModule['update_one_supplies_shopping']}
      />
      <ActionViewRecord
        id={id}
        path={MODULE_SHOPPING_PATHS.ViewOne + id}
        disabled={!actionsShoppingModule['find_one_supplies_shopping']}
      />
      <ActionGetDocument
        id={id}
        disabled={!actionsShoppingModule['export_shopping_to_pdf']}
      />
    </DropDownMenuActions>
  );
};
