import { DataTableTemplate } from '@/modules/core/components';
import { usePaymentModuleContext } from '../../hooks/context/usePaymentModuleContext';

export const PaymentModuleTable = () => {
  const { table, lengthColumns, query, permissionsPayment } =
    usePaymentModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !permissionsPayment['find_all_payments']
          ? 'No tienes permiso para ver el listado de los pagos 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!permissionsPayment['find_one_payment']}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={query?.data?.rowCount ?? 0}
      isLoading={query.isLoading || query.isRefetching}
    />
  );
};
