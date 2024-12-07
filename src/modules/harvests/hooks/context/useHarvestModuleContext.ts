import { useContext } from 'react';
import { HarvestsModuleContext } from '../../components/module/HarvestModuleContext';

export const useHarvestModuleContext = () => {
  const context = useContext(HarvestsModuleContext);
  if (!context) {
    throw new Error(
      'useHarvestsModuleContext must be used within a HarvestsModuleProvider'
    );
  }
  return context;
};
