import { useContext } from 'react';
import { ClientsModuleContext } from '../../components/module';

export const useClientsModuleContext = () => {
  const context = useContext(ClientsModuleContext);
  if (!context) {
    throw new Error(
      'useClientsModuleContext must be used within ClientsModuleProvider'
    );
  }
  return context;
};
