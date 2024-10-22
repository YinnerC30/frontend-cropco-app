import { UserActive } from '../interfaces';

const KEY_USER_LOCAL_STORAGE = 'user-active';

export const getTokenToLocalStorage = () => {
  const defaultValues = {
    token: '',
  };
  const data = localStorage.getItem(KEY_USER_LOCAL_STORAGE);
  if (!data) {
    return defaultValues;
  }
  return JSON.parse(data).token;
};

export const getUserInLocalStorage = () => {
  const defaultValues = {
    email: '',
    id: '',
    token: '',
    modules: [],
  };
  const data = localStorage.getItem(KEY_USER_LOCAL_STORAGE);
  if (!data) {
    return defaultValues;
  }
  return JSON.parse(data);
};

export const removeUserInLocalStorage = () => {
  localStorage.removeItem(KEY_USER_LOCAL_STORAGE);
};

export const saveUserInLocalStorage = (user: UserActive) => {
  localStorage.setItem(KEY_USER_LOCAL_STORAGE, JSON.stringify(user));
};

export const renewTokenInLocalStorage = (user: any, token: string) => {
  localStorage.setItem(
    KEY_USER_LOCAL_STORAGE,
    JSON.stringify({ ...user, token })
  );
};
