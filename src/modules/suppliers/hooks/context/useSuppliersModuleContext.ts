import { useContext } from 'react';
import { SuppliersModuleContext } from '../../components/module';

export const useSuppliersModuleContext = () => {
  const context = useContext(SuppliersModuleContext);
  if (!context) {
    throw new Error(
      'useSuppliersModuleContext must be used within SuppliersModuleProvider'
    );
  }
  return context;
};
