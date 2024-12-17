import { useContext } from 'react';
import { PaymentsModuleContext } from '../../components/module/PaymentModuleContext';

export const usePaymentModuleContext = () => {
  const context = useContext(PaymentsModuleContext);
  if (!context) {
    throw new Error(
      'usePaymentsModuleContext must be used within a PaymentsModuleProvider'
    );
  }
  return context;
};
