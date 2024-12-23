import { useContext } from 'react';
import { EmployeesModuleContext } from '../../components/module';
import { EmployeesModuleContextProps } from '../../interfaces/EmployeesModuleContextProps';

export const useEmployeesModuleContext = (): EmployeesModuleContextProps => {
  const context = useContext(EmployeesModuleContext);
  if (!context) {
    throw new Error(
      'useEmployeesModuleContext must be used within EmployeesModuleProvider'
    );
  }
  return context;
};
