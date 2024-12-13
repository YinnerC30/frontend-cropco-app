import { useContext } from 'react';
import { FormWorkContext } from '../../components/forms/work/FormWorkContext';

export const useFormWorkContext = () => {
  const context = useContext(FormWorkContext);
  if (!context) {
    throw new Error(
      'useFormWorkContext must be used within a FormWorkProvider'
    );
  }
  return context;
};
