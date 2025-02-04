import {
  ActionCopyIdRecord,
  ActionDeleteRecord,
  ActionViewRecord,
  DropDownMenuActions,
} from '@/modules/core/components';

import { Row } from '@tanstack/react-table';
import { usePaymentModuleContext } from '../../hooks/context/usePaymentModuleContext';
import { Payment } from '../../interfaces/Payment';
import { MODULE_PAYMENTS_PATHS } from '../../routes/pathRoutes';
import { ActionGetDocument } from './ActionGetDocument';

export const ActionsTablePayment: React.FC<{ row: Row<Payment> }> = ({
  row,
}) => {
  const {
    dataTable: { resetSelectionRows },
    actionsPaymentsModule,
    mutationDeletePayment,
  } = usePaymentModuleContext();
  const id = row.original.id ?? '';
  const { mutate } = mutationDeletePayment;

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
      <ActionGetDocument
        id={id!}
        disabled={!actionsPaymentsModule['export_payment_to_pdf']}
      />
    </DropDownMenuActions>
  );
};
