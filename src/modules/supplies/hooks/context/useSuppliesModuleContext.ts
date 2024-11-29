import { useContext } from 'react';
import { SuppliesModuleContext } from '../../components';

export const useSuppliesModuleContext = () => {
  const context = useContext(SuppliesModuleContext);
  if (!context) {
    throw new Error(
      'useSuppliesModuleContext must be used within SuppliesModuleProvider'
    );
  }
  return context;
};
