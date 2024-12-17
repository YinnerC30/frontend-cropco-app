import { useContext } from 'react';
import { ConsumptionModuleContext } from '../../components/module/ConsumptionModuleContext';

export const useConsumptionModuleContext = () => {
  const context = useContext(ConsumptionModuleContext);
  if (!context) {
    throw new Error(
      'useConsumptionModuleContext must be used within a ConsumptionModuleProvider'
    );
  }
  return context;
};
