import { BreadCrumb } from '@/modules/core/components';
import { PaymentModuleActions } from './PaymentModuleActions';
import { PaymentsModuleProvider } from './PaymentModuleContext';
import { PaymentModuleTable } from './PaymentModuleTable';
import { PaymentModuleSearchbar } from './PaymentModuleSearchbar';

export const PaymentsModule: React.FC = () => {
  return (
    <PaymentsModuleProvider>
      <BreadCrumb finalItem="Pagos" hiddenSeparator />
      <PaymentModuleSearchbar />
      <PaymentModuleActions />
      <PaymentModuleTable />
    </PaymentsModuleProvider>
  );
};

export default PaymentsModule;
