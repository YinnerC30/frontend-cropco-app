import { UserActive } from '../interfaces';
import { createLocalStorageManager } from '../../lib/localStorageManager';

export class UserLocalStorageManager {
  private static readonly defaultValues: UserActive = {
    email: '',
    id: '',
    token: '',
    modules: [],
    is_login: false,
    first_name: '',
    last_name: '',
  };

  private static readonly userStorage = createLocalStorageManager(
    'user-active',
    UserLocalStorageManager.defaultValues
  );

  static getToken(): string {
    return UserLocalStorageManager.userStorage.getProperty('token');
  }

  static getUser(): UserActive {
    return UserLocalStorageManager.userStorage.get();
  }

  static removeUser(): void {
    UserLocalStorageManager.userStorage.remove();
  }

  static saveUser(user: UserActive): void {
    UserLocalStorageManager.userStorage.save(user);
  }

  static renewToken(user: UserActive, token: string): void {
    UserLocalStorageManager.userStorage.save({ ...user, token });
  }
}
