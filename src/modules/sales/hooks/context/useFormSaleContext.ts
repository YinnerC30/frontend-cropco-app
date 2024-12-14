import { useContext } from 'react';
import { FormSaleContext } from '../../components/forms/sale/FormSaleContext';

export const useFormSaleContext = () => {
  const context = useContext(FormSaleContext);
  if (!context) {
    throw new Error(
      'useFormSaleContext must be used within a FormSaleProvider'
    );
  }
  return context;
};
