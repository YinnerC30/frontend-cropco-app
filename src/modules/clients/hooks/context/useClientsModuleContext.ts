import { useContext } from 'react';
import {
  ClientsModuleContext,
  ClientsModuleContextProps,
} from '../../components/module';

export const useClientsModuleContext = (): ClientsModuleContextProps => {
  const context = useContext(ClientsModuleContext);
  if (!context) {
    throw new Error(
      'useClientsModuleContext must be used within ClientsModuleProvider'
    );
  }
  return context;
};
