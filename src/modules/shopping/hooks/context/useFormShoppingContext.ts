import { useContext } from 'react';
import { FormShoppingContext } from '../../components/forms/shopping/FormShoppingContext';

export const useFormShoppingContext = () => {
  const context = useContext(FormShoppingContext);
  if (!context) {
    throw new Error(
      'useFormShoppingContext must be used within a FormShoppingProvider'
    );
  }
  return context;
};
