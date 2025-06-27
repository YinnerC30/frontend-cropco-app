import Cookies from 'js-cookie';

/**
 * Opciones para configurar cookies
 */
export interface CookieOptions {
  expires?: number | Date; // Días hasta expirar o fecha específica
  path?: string;
  domain?: string;
  secure?: boolean; // Solo HTTPS
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean; // Solo disponible en el servidor (no accesible desde JS)
}

/**
 * Utilidad genérica para manejar cookies de forma tipada
 */
export class CookieManager<T> {
  private key: string;
  private defaultValue: T;
  private defaultOptions: CookieOptions;

  constructor(
    key: string, 
    defaultValue: T, 
    defaultOptions: CookieOptions = {}
  ) {
    this.key = key;
    this.defaultValue = defaultValue;
    this.defaultOptions = {
      expires: 7, // 7 días por defecto
      secure: window.location.protocol === 'https:', // Secure si es HTTPS
      sameSite: 'lax',
      ...defaultOptions
    };
  }

  /**
   * Obtiene el valor de la cookie o retorna el valor por defecto
   */
  get(): T {
    try {
      const data = Cookies.get(this.key);
      if (!data) {
        return this.defaultValue;
      }
      return { ...this.defaultValue, ...JSON.parse(data) };
    } catch (error) {
      console.warn(`Error parsing cookie data for key "${this.key}":`, error);
      return this.defaultValue;
    }
  }

  /**
   * Guarda un valor en una cookie
   */
  save(value: T, options?: CookieOptions): void {
    try {
      const mergedOptions = { ...this.defaultOptions, ...options };
      Cookies.set(this.key, JSON.stringify(value), mergedOptions);
    } catch (error) {
      console.error(`Error saving cookie for key "${this.key}":`, error);
    }
  }

  /**
   * Elimina la cookie
   */
  remove(options?: Pick<CookieOptions, 'path' | 'domain'>): void {
    Cookies.remove(this.key, options);
  }

  /**
   * Obtiene una propiedad específica del objeto almacenado en la cookie
   */
  getProperty<K extends keyof T>(property: K): T[K] {
    const data = this.get();
    return data[property];
  }

  /**
   * Actualiza solo algunas propiedades del objeto almacenado en la cookie
   */
  updatePartial(updates: Partial<T>, options?: CookieOptions): void {
    const currentData = this.get();
    const updatedData = { ...currentData, ...updates };
    this.save(updatedData, options);
  }

  /**
   * Verifica si existe una cookie para esta clave
   */
  exists(): boolean {
    return Cookies.get(this.key) !== undefined;
  }

  /**
   * Obtiene el valor crudo de la cookie (sin parsear JSON)
   */
  getRaw(): string | undefined {
    return Cookies.get(this.key);
  }

  /**
   * Guarda un valor crudo en la cookie (sin stringify JSON)
   */
  saveRaw(value: string, options?: CookieOptions): void {
    try {
      const mergedOptions = { ...this.defaultOptions, ...options };
      Cookies.set(this.key, value, mergedOptions);
    } catch (error) {
      console.error(`Error saving raw cookie for key "${this.key}":`, error);
    }
  }

  /**
   * Renueva la expiración de la cookie con su valor actual
   */
  refresh(options?: CookieOptions): void {
    const currentValue = this.get();
    this.save(currentValue, options);
  }
}

/**
 * Funciones helper para crear instancias de CookieManager
 */
export const createCookieManager = <T>(
  key: string,
  defaultValue: T,
  defaultOptions?: CookieOptions
): CookieManager<T> => {
  return new CookieManager(key, defaultValue, defaultOptions);
};

/**
 * Funciones de utilidad para cookies simples
 */
export const cookieUtils = {
  /**
   * Verifica si las cookies están habilitadas en el navegador
   */
  isEnabled(): boolean {
    try {
      const testKey = '__cookie_test__';
      Cookies.set(testKey, 'test');
      const isEnabled = Cookies.get(testKey) === 'test';
      Cookies.remove(testKey);
      return isEnabled;
    } catch {
      return false;
    }
  },

  /**
   * Obtiene todas las cookies disponibles
   */
  getAll(): { [key: string]: string } {
    return Cookies.get();
  },

  /**
   * Elimina todas las cookies del dominio actual
   */
  removeAll(): void {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach(key => {
      Cookies.remove(key);
    });
  }
}; 