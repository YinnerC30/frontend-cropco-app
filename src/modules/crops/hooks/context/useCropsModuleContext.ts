import { useContext } from 'react';
import { CropsModuleContext } from '../../components/module';

export const useCropsModuleContext = () => {
  const context = useContext(CropsModuleContext);
  if (!context) {
    throw new Error(
      'useCropsModuleContext must be used within CropsModuleProvider'
    );
  }
  return context;
};
