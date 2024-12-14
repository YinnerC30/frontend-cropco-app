import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionModifyRecord,
  ActionViewRecord,
  DropDownMenuActions,
} from '@/modules/core/components';

import { useDeleteSale } from '../../hooks/mutations/useDeleteSale';
import { MODULE_SALES_PATHS } from '../../routes/pathRoutes';
import { useSaleModuleContext } from '../../hooks/context/useSaleModuleContext';

export const ActionsTableSale = ({ row }: any) => {
  const { resetSelectionRows, permissionsSale } = useSaleModuleContext();
  const { id } = row.original;
  const { mutate } = useDeleteSale();

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
        disabled={!permissionsSale['remove_one_sale']}
      />
      <ActionModifyRecord
        id={id}
        path={MODULE_SALES_PATHS.Update + id}
        disabled={!permissionsSale['update_one_sale']}
      />
      <ActionViewRecord
        id={id}
        path={MODULE_SALES_PATHS.ViewOne + id}
        disabled={!permissionsSale['find_one_sale']}
      />
    </DropDownMenuActions>
  );
};
