import { createCookieManager, cookieUtils, type CookieOptions } from './cookieManager';

// Ejemplo 1: Configuración de usuario
interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'es' | 'en';
  notifications: boolean;
}

const userPreferencesManager = createCookieManager<UserPreferences>(
  'user_preferences',
  {
    theme: 'light',
    language: 'es',
    notifications: true
  },
  {
    expires: 30, // 30 días
    secure: true,
    sameSite: 'strict'
  }
);

// Usar el manager
export const userPreferencesExample = {
  // Guardar preferencias
  savePreferences: () => {
    userPreferencesManager.save({
      theme: 'dark',
      language: 'es',
      notifications: false
    });
  },

  // Obtener preferencias
  getPreferences: () => {
    return userPreferencesManager.get();
  },

  // Actualizar solo el tema
  updateTheme: (theme: 'light' | 'dark') => {
    userPreferencesManager.updatePartial({ theme });
  },

  // Obtener solo el idioma
  getLanguage: () => {
    return userPreferencesManager.getProperty('language');
  }
};

// Ejemplo 2: Token de autenticación
interface AuthData {
  token: string;
  refreshToken: string;
  expiresAt: number;
}

const authManager = createCookieManager<AuthData>(
  'auth_data',
  {
    token: '',
    refreshToken: '',
    expiresAt: 0
  },
  {
    expires: 1, // 1 día
    secure: true,
    sameSite: 'strict',
    path: '/'
  }
);

export const authExample = {
  // Guardar tokens de autenticación
  saveAuth: (token: string, refreshToken: string, expiresIn: number) => {
    const expiresAt = Date.now() + (expiresIn * 1000);
    authManager.save({
      token,
      refreshToken,
      expiresAt
    });
  },

  // Obtener token
  getToken: () => {
    return authManager.getProperty('token');
  },

  // Verificar si el token está expirado
  isTokenExpired: () => {
    const expiresAt = authManager.getProperty('expiresAt');
    return Date.now() > expiresAt;
  },

  // Limpiar autenticación
  clearAuth: () => {
    authManager.remove();
  },

  // Renovar cookie de autenticación
  refreshAuth: () => {
    authManager.refresh({ expires: 1 });
  }
};

// Ejemplo 3: Cookie simple de string
const sessionManager = createCookieManager<string>(
  'session_id',
  '',
  {
    expires: 0.5, // 12 horas
    secure: true,
    sameSite: 'lax'
  }
);

export const sessionExample = {
  // Guardar ID de sesión
  saveSessionId: (sessionId: string) => {
    sessionManager.saveRaw(sessionId);
  },

  // Obtener ID de sesión
  getSessionId: () => {
    return sessionManager.getRaw() || '';
  },

  // Verificar si hay sesión activa
  hasActiveSession: () => {
    return sessionManager.exists();
  }
};

// Ejemplo 4: Utilidades globales
export const cookieExamples = {
  // Verificar si las cookies están habilitadas
  checkCookieSupport: () => {
    if (!cookieUtils.isEnabled()) {
      console.warn('Las cookies no están habilitadas en este navegador');
      return false;
    }
    return true;
  },

  // Listar todas las cookies
  listAllCookies: () => {
    return cookieUtils.getAll();
  },

  // Limpiar todas las cookies (usar con cuidado)
  clearAllCookies: () => {
    cookieUtils.removeAll();
  }
};

// Ejemplo 5: Configuración avanzada para diferentes entornos
const createProductionCookieOptions = (): CookieOptions => ({
  secure: true,
  sameSite: 'strict',
  domain: '.tudominio.com'
});

const createDevelopmentCookieOptions = (): CookieOptions => ({
  secure: false,
  sameSite: 'lax'
});

export const getEnvironmentCookieOptions = (): CookieOptions => {
  return process.env.NODE_ENV === 'production' 
    ? createProductionCookieOptions()
    : createDevelopmentCookieOptions();
}; 