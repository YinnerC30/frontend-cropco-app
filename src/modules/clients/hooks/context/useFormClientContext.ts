import { useContext } from 'react';
import { FormClientContext } from '../../components/form';

export const useFormClientContext = () => {
  const context = useContext(FormClientContext);
  if (!context) {
    throw new Error(
      'useFormClientContext must be used within a FormClientProvider'
    );
  }
  return context;
};
