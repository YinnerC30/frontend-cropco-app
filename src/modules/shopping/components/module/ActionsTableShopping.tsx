import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
  DropDownMenuActions,
} from '@/modules/core/components';

import { Row } from '@tanstack/react-table';
import { useShoppingModuleContext } from '../../hooks/context/useShoppingModuleContext';
import { useDeleteShopping } from '../../hooks/mutations/useDeleteShopping';
import { ShoppingSupplies } from '../../interfaces';
import { MODULE_SHOPPING_PATHS } from '../../routes/pathRoutes';
import React from 'react';

export const ActionsTableShopping: React.FC<{
  row: Row<ShoppingSupplies>;
}> = ({ row }) => {
  const {
    dataTable: { resetSelectionRows },
    actionsShoppingModule,
  } = useShoppingModuleContext();
  const id = row.original.id ?? '';
  const { mutate } = useDeleteShopping();

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
    </DropDownMenuActions>
  );
};
