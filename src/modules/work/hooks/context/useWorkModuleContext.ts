import { useContext } from 'react';
import { WorksModuleContext } from '../../components/module/WorkModuleContext';

export const useWorkModuleContext = () => {
  const context = useContext(WorksModuleContext);
  if (!context) {
    throw new Error(
      'useWorksModuleContext must be used within a WorksModuleProvider'
    );
  }
  return context;
};
