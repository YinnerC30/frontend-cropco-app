import { useContext } from 'react';
import { FormUserContext } from '../../components';

export const useFormUserContext = () => {
  const context = useContext(FormUserContext);
  if (!context) {
    throw new Error(
      'useFormUserContext must be used within a FormUserProvider'
    );
  }
  return context;
};
