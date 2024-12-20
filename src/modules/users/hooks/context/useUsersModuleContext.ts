import { useContext } from 'react';
import { UsersModuleContext, UsersModuleContextProps } from '../../components';

export const useUsersModuleContext = (): UsersModuleContextProps => {
  const context = useContext(UsersModuleContext);
  if (!context) {
    throw new Error(
      'useUsersModuleContext must be used within UsersModuleProvider'
    );
  }
  return context;
};
