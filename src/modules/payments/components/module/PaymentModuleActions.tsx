import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';
import { usePaymentModuleContext } from '../../hooks/context/usePaymentModuleContext';

import { MODULE_PAYMENTS_PATHS } from '../../routes/pathRoutes';
import { useDeleteBulkPayments } from '../../hooks/mutations/useDeleteBulkPayments';

export const PaymentModuleActions = () => {
  const {
    query,
    hasSelectedRecords,
    resetSelectionRows,
    permissionsPayment,
    getIdsToRowsSelected,
  } = usePaymentModuleContext();

  const { mutate, isPending } = useDeleteBulkPayments();

  const handleDeleteBulkPayments = () => {
    mutate(
      { paymentIds: getIdsToRowsSelected() },
      {
        onSuccess: () => {
          resetSelectionRows();
        },
      }
    );
  };

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={query.refetch}
        disabled={!permissionsPayment['find_all_payments']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={isPending || !permissionsPayment['remove_bulk_payments']}
          onClick={handleDeleteBulkPayments}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_PAYMENTS_PATHS.Create}
          disabled={!permissionsPayment['create_payment']}
          className=""
        />
      </div>
    </div>
  );
};
