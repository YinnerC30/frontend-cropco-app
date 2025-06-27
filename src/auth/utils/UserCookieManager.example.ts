import { UserActive } from '../interfaces';
import { UserCookieManager } from './UserCookieManager';
import { UserLocalStorageManager } from './UserLocalStorageManager';

/**
 * Ejemplos de uso de UserCookieManager
 */

// Ejemplo 1: Uso básico (reemplazando UserLocalStorageManager)
export const basicUsageExample = {
  // Antes con localStorage
  loginUserWithLocalStorage: (userData: UserActive) => {
    UserLocalStorageManager.saveUser(userData);
    const token = UserLocalStorageManager.getToken();
    console.log('Token desde localStorage:', token);
  },

  // Ahora con cookies
  loginUserWithCookies: (userData: UserActive) => {
    UserCookieManager.saveUser(userData);
    const token = UserCookieManager.getToken();
    console.log('Token desde cookies:', token);
  },

  // Verificar si el usuario está logueado
  checkUserStatus: () => {
    return {
      hasDataInCookies: UserCookieManager.hasUserData(),
      isLoggedIn: UserCookieManager.isLoggedIn(),
      userEmail: UserCookieManager.getUserEmail(),
      fullName: UserCookieManager.getFullName()
    };
  }
};

// Ejemplo 2: Manejo de sesiones
export const sessionManagementExample = {
  // Login completo
  performLogin: (userData: UserActive) => {
    UserCookieManager.saveUser(userData);
    console.log(`Usuario ${UserCookieManager.getFullName()} logueado correctamente`);
  },

  // Renovar token
  renewUserToken: (newToken: string) => {
    const currentUser = UserCookieManager.getUser();
    UserCookieManager.renewToken(currentUser, newToken);
    console.log('Token renovado en cookies');
  },

  // Extender sesión por más tiempo
  extendSession: (days: number) => {
    UserCookieManager.getUserWithCustomExpiry(days);
    console.log(`Sesión extendida por ${days} días`);
  },

  // Refrescar sesión (mantener datos pero renovar expiración)
  refreshSession: () => {
    UserCookieManager.refreshUserSession();
    console.log('Sesión refrescada');
  },

  // Logout
  performLogout: () => {
    UserCookieManager.removeUser();
    console.log('Usuario deslogueado');
  }
};

// Ejemplo 3: Migración de localStorage a cookies
export const migrationExample = {
  // Migrar datos existentes de localStorage a cookies
  migrateFromLocalStorageTooCookies: () => {
    try {
      // Verificar si hay datos en localStorage
      const userFromLocalStorage = UserLocalStorageManager.getUser();
      
      if (userFromLocalStorage.is_login && userFromLocalStorage.token) {
        // Migrar a cookies
        UserCookieManager.saveUser(userFromLocalStorage);
        
        // Opcional: limpiar localStorage después de migrar
        UserLocalStorageManager.removeUser();
        
        console.log('Migración completada de localStorage a cookies');
        return true;
      }
      
      console.log('No hay datos para migrar en localStorage');
      return false;
    } catch (error) {
      console.error('Error durante la migración:', error);
      return false;
    }
  },

  // Verificar qué fuente de datos usar
  determineDataSource: () => {
    const hasCookieData = UserCookieManager.hasUserData();
    const hasLocalStorageData = UserLocalStorageManager.getUser().is_login;

    if (hasCookieData) {
      return {
        source: 'cookies',
        data: UserCookieManager.getUser()
      };
    } else if (hasLocalStorageData) {
      return {
        source: 'localStorage',
        data: UserLocalStorageManager.getUser()
      };
    } else {
      return {
        source: 'none',
        data: null
      };
    }
  }
};

// Ejemplo 4: Configuración para diferentes entornos
export const environmentConfigExample = {
  // Configuración para desarrollo (cookies menos estrictas)
  setupDevelopmentCookies: (userData: UserActive) => {
    UserCookieManager.saveUser(userData);
    console.log('Cookies configuradas para desarrollo');
  },

  // Configuración para producción (cookies más seguras)
  setupProductionCookies: (userData: UserActive) => {
    // En producción, podrías querer usar configuración más estricta
    UserCookieManager.saveUser(userData);
    console.log('Cookies configuradas para producción');
  }
};

// Ejemplo 5: Utilidades para debugging
export const debuggingExample = {
  // Comparar datos entre localStorage y cookies
  compareStorageSources: () => {
    const cookieUser = UserCookieManager.getUser();
    const localStorageUser = UserLocalStorageManager.getUser();

    console.log('Datos en cookies:', cookieUser);
    console.log('Datos en localStorage:', localStorageUser);

    return {
      cookieData: cookieUser,
      localStorageData: localStorageUser,
      areEqual: JSON.stringify(cookieUser) === JSON.stringify(localStorageUser)
    };
  },

  // Estado actual del usuario
  getCurrentUserState: () => {
    return {
      isLoggedIn: UserCookieManager.isLoggedIn(),
      userId: UserCookieManager.getUserId(),
      email: UserCookieManager.getUserEmail(),
      fullName: UserCookieManager.getFullName(),
      hasToken: !!UserCookieManager.getToken(),
      hasUserData: UserCookieManager.hasUserData()
    };
  }
};

// Ejemplo 6: Hook personalizado (para usar en componentes React)
export const createUserCookieHook = () => {
  return {
    getUser: () => UserCookieManager.getUser(),
    saveUser: (user: UserActive) => UserCookieManager.saveUser(user),
    removeUser: () => UserCookieManager.removeUser(),
    isLoggedIn: () => UserCookieManager.isLoggedIn(),
    getToken: () => UserCookieManager.getToken(),
    renewToken: (user: UserActive, token: string) => 
      UserCookieManager.renewToken(user, token),
    refreshSession: () => UserCookieManager.refreshUserSession()
  };
}; 