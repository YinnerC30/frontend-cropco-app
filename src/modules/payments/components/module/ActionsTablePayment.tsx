import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionViewRecord,
  DropDownMenuActions
} from '@/modules/core/components';

import { usePaymentModuleContext } from '../../hooks/context/usePaymentModuleContext';
import { useDeletePayment } from '../../hooks/mutations/useDeletePayment';
import { MODULE_PAYMENTS_PATHS } from '../../routes/pathRoutes';

export const ActionsTablePayment = ({ row }: any) => {
  const { resetSelectionRows, permissionsPayment } = usePaymentModuleContext();
  const { id } = row.original;
  const { mutate } = useDeletePayment();

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
        disabled={!permissionsPayment['remove_one_payment']}
      />

      <ActionViewRecord
        id={id}
        path={MODULE_PAYMENTS_PATHS.ViewOne + id}
        disabled={!permissionsPayment['find_one_payment']}
      />
    </DropDownMenuActions>
  );
};
