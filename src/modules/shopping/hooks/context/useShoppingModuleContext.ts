import { useContext } from 'react';
import { ShoppingModuleContext } from '../../components/module/ShoppingModuleContext';

export const useShoppingModuleContext = () => {
  const context = useContext(ShoppingModuleContext);
  if (!context) {
    throw new Error(
      'useShoppingModuleContext must be used within a ShoppingModuleProvider'
    );
  }
  return context;
};
