import { UserActive } from '../interfaces';

const KEY_USER_LOCAL_STORAGE = 'user-active';

export const getTokenToLocalStorage = (): string => {
  const data = localStorage.getItem(KEY_USER_LOCAL_STORAGE);
  if (!data) {
    return '';
  }
  return JSON.parse(data).token;
};

export const getUserInLocalStorage = (): UserActive => {
  const defaultValues: UserActive = {
    email: '',
    id: '',
    token: '',
    modules: [],
    isLogin: false,
    first_name: '',
    last_name: '',
  };
  const data = localStorage.getItem(KEY_USER_LOCAL_STORAGE);
  if (!data) {
    return defaultValues;
  }
  return JSON.parse(data);
};

export const removeUserInLocalStorage = (): void => {
  localStorage.removeItem(KEY_USER_LOCAL_STORAGE);
};

export const saveUserInLocalStorage = (user: UserActive): void => {
  localStorage.setItem(KEY_USER_LOCAL_STORAGE, JSON.stringify(user));
};

export const renewTokenInLocalStorage = (user: any, token: string): void => {
  localStorage.setItem(
    KEY_USER_LOCAL_STORAGE,
    JSON.stringify({ ...user, token })
  );
};
