import { BreadCrumb } from '@/modules/core/components';
import { PaymentModuleActions } from './PaymentModuleActions';
import { PaymentsModuleProvider } from './PaymentModuleContext';
import { PaymentModuleTable } from './PaymentModuleTable';

export const PaymentsModule = () => {
  return (
    <PaymentsModuleProvider>
      <BreadCrumb finalItem="Pagos" hiddenSeparator />
      {/* <PaymentModuleSearchbar /> */}
      <PaymentModuleActions />
      <PaymentModuleTable />
    </PaymentsModuleProvider>
  );
};

export default PaymentsModule;
