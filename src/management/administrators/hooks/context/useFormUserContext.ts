import { useContext } from 'react';

import { FormAdministratorContextProps } from '../../interfaces/';
import { FormAdministratorContext } from '../../components';

export const useFormAdministratorContext = (): FormAdministratorContextProps => {
  const context = useContext(FormAdministratorContext);
  if (!context) {
    throw new Error(
      'useFormAdministratorContext must be used within a FormAdministratorProvider'
    );
  }
  return context;
};
