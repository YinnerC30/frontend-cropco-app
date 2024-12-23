import { useContext } from 'react';
import {
  FormClientContext,
  FormClientContextProps,
} from '../../components/form';

export const useFormClientContext = (): FormClientContextProps => {
  const context = useContext(FormClientContext);
  if (!context) {
    throw new Error(
      'useFormClientContext must be used within a FormClientProvider'
    );
  }
  return context;
};
