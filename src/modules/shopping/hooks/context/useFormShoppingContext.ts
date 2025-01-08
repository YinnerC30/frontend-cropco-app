import { useContext } from 'react';
import { FormShoppingContext, FormShoppingContextValues } from '../../components/forms/shopping/FormShoppingContext';

export const useFormShoppingContext = (): FormShoppingContextValues => {
  const context = useContext(FormShoppingContext);
  if (!context) {
    throw new Error(
      'useFormShoppingContext must be used within a FormShoppingProvider'
    );
  }
  return context;
};
