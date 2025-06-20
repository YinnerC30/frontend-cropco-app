import { useContext } from 'react';
import { FormAdministratorContext } from '../../components/form/FormAdministratorContext';
import { FormAdministratorContextProps } from '../../interfaces/context/FormAdministratorContextProps';

export const useFormAdministratorContext =
  (): FormAdministratorContextProps => {
    const context = useContext(FormAdministratorContext);
    if (!context) {
      throw new Error(
        'useFormAdministratorContext must be used within a FormAdministratorProvider'
      );
    }
    return context;
  };
