import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
  DropDownMenuActions,
} from '@/modules/core/components';

import { useDeleteShopping } from '../../hooks/mutations/useDeleteShopping';
import { MODULE_SHOPPING_PATHS } from '../../routes/pathRoutes';
import { useShoppingModuleContext } from '../../hooks/context/useShoppingModuleContext';

export const ActionsTableShopping = ({ row }: any) => {
  const { resetSelectionRows, permissionsShopping } =
    useShoppingModuleContext();
  const { id } = row.original;
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
        disabled={!permissionsShopping['remove_one_supplies_shopping']}
      />
      <ActionModifyRecord
        id={id}
        path={MODULE_SHOPPING_PATHS.Update + id}
        disabled={!permissionsShopping['update_one_supplies_shopping']}
      />
      <ActionViewRecord
        id={id}
        path={MODULE_SHOPPING_PATHS.ViewOne + id}
        disabled={!permissionsShopping['find_one_supplies_shopping']}
      />
    </DropDownMenuActions>
  );
};
