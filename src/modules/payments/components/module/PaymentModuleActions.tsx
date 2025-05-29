import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';
import { usePaymentModuleContext } from '../../hooks/context/usePaymentModuleContext';

import React from 'react';
import { MODULE_PAYMENTS_PATHS } from '../../routes/pathRoutes';

export const PaymentModuleActions: React.FC = () => {
  const {
    queryPayments,
    dataTable: { hasSelectedRecords, resetSelectionRows, getIdsToRowsSelected },
    actionsPaymentsModule,
    mutationDeletePayments,
    queryEmployees,
  } = usePaymentModuleContext();

  const { mutate, isPending } = mutationDeletePayments;

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

  const handleRefetchData = async () => {
    await Promise.all([queryPayments.refetch(), queryEmployees.refetch()]);
  };

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={handleRefetchData}
        disabled={!actionsPaymentsModule['find_all_payments']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={isPending || !actionsPaymentsModule['remove_bulk_payments']}
          onClick={handleDeleteBulkPayments}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_PAYMENTS_PATHS.Create}
          disabled={!actionsPaymentsModule['create_payment']}
          className=""
        />
      </div>
    </div>
  );
};
