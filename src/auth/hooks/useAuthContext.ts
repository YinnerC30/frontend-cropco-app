import { useContext } from 'react';
import { AuthContext } from '../components';
import { AuthContextProps } from '../interfaces/AuthContextProps';

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};
