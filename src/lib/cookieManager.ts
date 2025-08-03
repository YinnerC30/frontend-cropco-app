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
 * Función helper para detectar el dominio correcto para cookies en subdominios
 */
export const getCookieDomain = (): string | undefined => {
  const hostname = window.location.hostname;

  // Si estamos en localhost, no configurar dominio
  if (hostname === 'localhost' || hostname.includes('127.0.0.1')) {
    return undefined;
  }

  // Si estamos en un subdominio, usar el dominio padre
  const parts = hostname.split('.');
  if (parts.length > 2) {
    // Para subdominios como 'tenant1.cropco.org', usar '.cropco.org'
    return `.${parts.slice(-2).join('.')}`;
  }

  // Para dominios principales, usar el dominio completo
  return hostname;
};

/**
 * Función helper para obtener opciones de cookies optimizadas para el entorno actual
 */
export const getDefaultCookieOptions = (
  customOptions: CookieOptions = {}
): CookieOptions => {
  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname.includes('127.0.0.1');
  const isHttps = window.location.protocol === 'https:';

  return {
    expires: 7, // 7 días por defecto
    secure: isHttps, // Secure si es HTTPS
    sameSite: isLocalhost ? 'lax' : 'strict', // Más permisivo en localhost
    path: '/', // Disponible en toda la aplicación
    domain: getCookieDomain(), // Dominio automático para subdominios
    ...customOptions,
  };
};

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
    this.defaultOptions = getDefaultCookieOptions(defaultOptions);
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
    console.log('Cookie eliminada');
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
    Object.keys(allCookies).forEach((key) => {
      Cookies.remove(key);
    });
  },

  /**
   * Guarda un valor crudo en una cookie
   */
  saveRaw(key: string, value: string, options?: CookieOptions): void {
    try {
      const mergedOptions = { ...getDefaultCookieOptions(), ...options };
      Cookies.set(key, value, mergedOptions);
    } catch (error) {
      console.error(`Error saving raw cookie for key "${key}":`, error);
    }
  },

  /**
   * Obtiene el valor crudo de una cookie
   */
  getRaw(key: string): string | undefined {
    return Cookies.get(key);
  },

  /**
   * Elimina una cookie específica
   */
  remove(key: string, options?: Pick<CookieOptions, 'path' | 'domain'>): void {
    Cookies.remove(key, options);
  },

  /**
   * Función de debug para diagnosticar problemas con cookies
   */
  debug(): void {
    console.group('🔍 Debug de Cookies');
    console.log('Hostname:', window.location.hostname);
    console.log('Protocol:', window.location.protocol);
    console.log('Domain detectado:', getCookieDomain());
    console.log('Cookies habilitadas:', this.isEnabled());
    console.log('Todas las cookies:', this.getAll());
    console.log('Opciones por defecto:', getDefaultCookieOptions());
    console.groupEnd();
  },

  /**
   * Función para probar el guardado de cookies con diferentes configuraciones
   */
  testCookieSaving(key: string, value: string): void {
    console.group('🧪 Test de Guardado de Cookies');

    // Test 1: Sin dominio específico
    try {
      Cookies.set(`${key}_test1`, value, { path: '/' });
      const result1 = Cookies.get(`${key}_test1`);
      console.log(
        'Test 1 (sin dominio):',
        result1 === value ? '✅ Éxito' : '❌ Fallo'
      );
      Cookies.remove(`${key}_test1`);
    } catch (error) {
      console.log('Test 1 (sin dominio):', '❌ Error:', error);
    }

    // Test 2: Con dominio automático
    try {
      const options = getDefaultCookieOptions();
      Cookies.set(`${key}_test2`, value, options);
      const result2 = Cookies.get(`${key}_test2`);
      console.log(
        'Test 2 (con dominio automático):',
        result2 === value ? '✅ Éxito' : '❌ Fallo'
      );
      console.log('Opciones usadas:', options);
      Cookies.remove(`${key}_test2`, {
        domain: options.domain,
        path: options.path,
      });
    } catch (error) {
      console.log('Test 2 (con dominio automático):', '❌ Error:', error);
    }

    console.groupEnd();
  },
};
