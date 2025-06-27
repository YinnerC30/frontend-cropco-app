import { UserActive } from '../interfaces';
import {
  createCookieManager,
  type CookieOptions,
  getDefaultCookieOptions,
} from '../../lib/cookieManager';

export class UserCookieManager {
  private static readonly defaultValues: UserActive = {
    email: '',
    id: '',
    token: '',
    modules: [],
    is_login: false,
    first_name: '',
    last_name: '',
  };

  // Configuración de cookies para datos de usuario
  private static readonly cookieOptions: CookieOptions =
    getDefaultCookieOptions({
      expires: 7, // 7 días
      sameSite: 'strict', // Protección CSRF estricta para datos de autenticación
    });

  // Configuración específica para el token (más segura y con menor duración)
  private static readonly tokenCookieOptions: CookieOptions =
    getDefaultCookieOptions({
      expires: 1, // 1 día para el token
      sameSite: 'strict',
    });

  private static readonly userStorage = createCookieManager(
    'user-active',
    UserCookieManager.defaultValues,
    UserCookieManager.cookieOptions
  );

  /**
   * Obtiene el token del usuario
   */
  static getToken(): string {
    return UserCookieManager.userStorage.getProperty('token');
  }

  /**
   * Obtiene todos los datos del usuario
   */
  static getUser(): UserActive {
    return UserCookieManager.userStorage.get();
  }

  /**
   * Elimina todos los datos del usuario de las cookies
   */
  static removeUser(): void {
    // UserCookieManager.userStorage.remove();
  }

  /**
   * Guarda todos los datos del usuario en cookies
   */
  static saveUser(user: UserActive): void {
    UserCookieManager.userStorage.save(user);
  }

  /**
   * Renueva el token del usuario manteniendo los demás datos
   */
  static renewToken(user: UserActive, token: string): void {
    UserCookieManager.userStorage.save(
      { ...user, token },
      UserCookieManager.tokenCookieOptions
    );
  }

  /**
   * Verifica si el usuario está logueado
   */
  static isLoggedIn(): boolean {
    return UserCookieManager.userStorage.getProperty('is_login');
  }

  /**
   * Obtiene solo el ID del usuario
   */
  static getUserId(): string {
    return UserCookieManager.userStorage.getProperty('id');
  }

  /**
   * Obtiene el email del usuario
   */
  static getUserEmail(): string {
    return UserCookieManager.userStorage.getProperty('email');
  }

  /**
   * Obtiene el nombre completo del usuario
   */
  static getFullName(): string {
    const user = UserCookieManager.userStorage.get();
    return `${user.first_name} ${user.last_name}`.trim();
  }

  /**
   * Actualiza solo el estado de login sin cambiar otros datos
   */
  static updateLoginStatus(isLogin: boolean): void {
    UserCookieManager.userStorage.updatePartial({ is_login: isLogin });
  }

  /**
   * Actualiza solo los módulos del usuario
   */
  static updateUserModules(modules: UserActive['modules']): void {
    UserCookieManager.userStorage.updatePartial({ modules });
  }

  /**
   * Renueva la expiración de las cookies del usuario sin cambiar los datos
   */
  static refreshUserSession(): void {
    UserCookieManager.userStorage.refresh(UserCookieManager.cookieOptions);
  }

  /**
   * Limpia solo el token manteniendo otros datos del usuario
   */
  static clearToken(): void {
    UserCookieManager.userStorage.updatePartial({ token: '' });
  }

  /**
   * Verifica si existe algún dato de usuario en cookies
   */
  static hasUserData(): boolean {
    return UserCookieManager.userStorage.exists();
  }

  /**
   * Obtiene los datos del usuario con configuración personalizada de cookies
   */
  static getUserWithCustomExpiry(days: number): UserActive {
    const user = UserCookieManager.userStorage.get();
    // Actualiza la expiración
    UserCookieManager.userStorage.save(user, {
      ...UserCookieManager.cookieOptions,
      expires: days,
    });
    return user;
  }
}
