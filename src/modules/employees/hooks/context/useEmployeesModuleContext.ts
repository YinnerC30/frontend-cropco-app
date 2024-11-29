import { useContext } from 'react';
import { EmployeesModuleContext } from '../../components/module';

export const useEmployeesModuleContext = () => {
  const context = useContext(EmployeesModuleContext);
  if (!context) {
    throw new Error(
      'useEmployeesModuleContext must be used within EmployeesModuleProvider'
    );
  }
  return context;
};
