import { UserActive } from '../interfaces';
import { createLocalStorageManager } from '../../lib/localStorageManager';

const defaultValues: UserActive = {
  email: '',
  id: '',
  token: '',
  modules: [],
  is_login: false,
  first_name: '',
  last_name: '',
};

// Crear instancia del manager para user
const userStorage = createLocalStorageManager('user-active', defaultValues);

// Exportar funciones usando la nueva utilidad
export const getTokenToLocalStorage = (): string => {
  return userStorage.getProperty('token');
};

export const getUserInLocalStorage = (): UserActive => {
  return userStorage.get();
};

export const removeUserInLocalStorage = (): void => {
  userStorage.remove();
};

export const saveUserInLocalStorage = (user: UserActive): void => {
  userStorage.save(user);
};

export const renewTokenInLocalStorage = (user: any, token: string): void => {
  userStorage.save({ ...user, token });
};
