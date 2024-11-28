import { useContext } from 'react';
import { AuthenticationContext } from '../components';

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      'useAuthenticationContext must be used within a AuthenticationProvider'
    );
  }
  return context;
};
