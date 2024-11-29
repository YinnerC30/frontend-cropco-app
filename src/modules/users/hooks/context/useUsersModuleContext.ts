import { useContext } from 'react';
import { UsersModuleContext } from '../../components';


export const useUsersModuleContext = () => {
  const context = useContext(UsersModuleContext);
  if (!context) {
    throw new Error(
      'useUsersModuleContext must be used within UsersModuleProvider'
    );
  }
  return context;
};
