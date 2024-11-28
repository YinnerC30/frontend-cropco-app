import { useContext } from 'react';
import { AuthorizationContext } from '../components';

export const useAuthorizationContext = () => {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error(
      'useAuthorizationContext must be used within a AuthorizationProvider'
    );
  }
  return context;
};
