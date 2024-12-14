import { useContext } from 'react';
import { SalesModuleContext } from '../../components/module/SaleModuleContext';

export const useSaleModuleContext = () => {
  const context = useContext(SalesModuleContext);
  if (!context) {
    throw new Error(
      'useSalesModuleContext must be used within a SalesModuleProvider'
    );
  }
  return context;
};
