import { useContext } from 'react';
import { FormPaymentContext } from '../../components/forms/payment/FormPaymentContext';

export const useFormPaymentContext = () => {
  const context = useContext(FormPaymentContext);
  if (!context) {
    throw new Error(
      'useFormPaymentContext must be used within a FormPaymentProvider'
    );
  }
  return context;
};
