import { useContext } from 'react';

import { FormUserContextProps } from '../../interfaces/';
import { FormUserContext } from '../../components';

export const useFormUserContext = (): FormUserContextProps => {
  const context = useContext(FormUserContext);
  if (!context) {
    throw new Error(
      'useFormUserContext must be used within a FormUserProvider'
    );
  }
  return context;
};
