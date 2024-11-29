import { useContext } from 'react';
import { FormEmployeeContext } from '../../components/form';

export const useFormEmployeeContext = () => {
  const context = useContext(FormEmployeeContext);
  if (!context) {
    throw new Error(
      'useFormEmployeeContext must be used within a FormEmployeeProvider'
    );
  }
  return context;
};
