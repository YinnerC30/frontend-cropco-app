import { useContext } from 'react';
import { AdministratorsModuleContextProps } from '../../interfaces/context/AdministratorsModuleContextProps';
import { AdministratorsModuleContext } from '../../components/module/AdministratorsModuleContext';

export const useAdministratorsModuleContext =
  (): AdministratorsModuleContextProps => {
    const context = useContext(AdministratorsModuleContext);
    if (!context) {
      throw new Error(
        'useAdministratorsModuleContext must be used within AdministratorsModuleProvider'
      );
    }
    return context;
  };
