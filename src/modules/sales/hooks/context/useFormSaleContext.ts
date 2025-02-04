import { useContext } from 'react';
import {
  FormSaleContext,
  FormSaleContextValues,
} from '../../components/forms/sale/FormSaleContext';

export const useFormSaleContext = (): FormSaleContextValues => {
  const context = useContext(FormSaleContext);
  if (!context) {
    throw new Error(
      'useFormSaleContext must be used within a FormSaleProvider'
    );
  }
  return context;
};
