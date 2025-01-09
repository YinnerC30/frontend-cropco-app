import { DataTableTemplate } from '@/modules/core/components';
import { usePaymentModuleContext } from '../../hooks/context/usePaymentModuleContext';

export const PaymentModuleTable: React.FC = () => {
  const {
    dataTable: { table, lengthColumns },
    queryPayments,
    actionsPaymentsModule,
    mutationDeletePayments,
  } = usePaymentModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !actionsPaymentsModule['find_all_payments']
          ? 'No tienes permiso para ver el listado de los pagos 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!actionsPaymentsModule['find_one_payment']}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={queryPayments?.data?.rowCount ?? 0}
      isLoading={
        queryPayments.isLoading ||
        queryPayments.isRefetching ||
        mutationDeletePayments.isPending
      }
    />
  );
};
