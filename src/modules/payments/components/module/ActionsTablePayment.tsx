import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionViewRecord,
  DropDownMenuActions,
} from '@/modules/core/components';

import { usePaymentModuleContext } from '../../hooks/context/usePaymentModuleContext';
import { useDeletePayment } from '../../hooks/mutations/useDeletePayment';
import { MODULE_PAYMENTS_PATHS } from '../../routes/pathRoutes';
import { Row } from '@tanstack/react-table';
import { Payment } from '../../interfaces/Payment';

export const ActionsTablePayment: React.FC<{ row: Row<Payment> }> = ({
  row,
}) => {
  const {
    dataTable: { resetSelectionRows },
    actionsPaymentsModule,
  } = usePaymentModuleContext();
  const id = row.original.id ?? '';
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
        disabled={!actionsPaymentsModule['remove_one_payment']}
      />

      <ActionViewRecord
        id={id}
        path={MODULE_PAYMENTS_PATHS.ViewOne + id}
        disabled={!actionsPaymentsModule['find_one_payment']}
      />
    </DropDownMenuActions>
  );
};
