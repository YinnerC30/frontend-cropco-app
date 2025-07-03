import { createCookieManager, cookieUtils, type CookieOptions, getCookieDomain, getDefaultCookieOptions } from './cookieManager';

// Ejemplo 1: Configuración de usuario con dominio automático
interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'es' | 'en';
  notifications: boolean;
}

const userPreferencesManager = createCookieManager<UserPreferences>(
  'user-preferences',
  {
    theme: 'light',
    language: 'es',
    notifications: true,
  },
  getDefaultCookieOptions({
    expires: 30, // 30 días
    sameSite: 'lax' // Menos estricto para preferencias
  })
);

export const userPreferencesExample = {
  // Guardar preferencias del usuario
  savePreferences: (preferences: UserPreferences) => {
    userPreferencesManager.save(preferences);
    console.log('Preferencias guardadas con dominio:', getCookieDomain());
  },

  // Obtener preferencias del usuario
  getPreferences: () => {
    return userPreferencesManager.get();
  },

  // Actualizar solo el tema
  updateTheme: (theme: 'light' | 'dark') => {
    userPreferencesManager.updatePartial({ theme });
  },

  // Verificar si existen preferencias
  hasPreferences: () => {
    return userPreferencesManager.exists();
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

// Ejemplo 3: Configuración de sesión con debug
interface SessionData {
  sessionId: string;
  lastActivity: number;
  userAgent: string;
}

const sessionManager = createCookieManager<SessionData>(
  'session-data',
  {
    sessionId: '',
    lastActivity: 0,
    userAgent: '',
  },
  getDefaultCookieOptions({
    expires: 0.5, // 12 horas
    sameSite: 'strict'
  })
);

export const sessionExample = {
  // Crear nueva sesión
  createSession: (sessionId: string) => {
    const sessionData: SessionData = {
      sessionId,
      lastActivity: Date.now(),
      userAgent: navigator.userAgent,
    };
    sessionManager.save(sessionData);
    
    // Debug para verificar el guardado
    cookieUtils.debug();
    cookieUtils.testCookieSaving('session', sessionId);
  },

  // Obtener datos de sesión
  getSession: () => {
    return sessionManager.get();
  },

  // Actualizar actividad
  updateActivity: () => {
    sessionManager.updatePartial({ lastActivity: Date.now() });
  },

  // Verificar si la sesión es válida (menos de 12 horas)
  isSessionValid: () => {
    const session = sessionManager.get();
    if (!session.sessionId) return false;
    
    const twelveHoursAgo = Date.now() - (12 * 60 * 60 * 1000);
    return session.lastActivity > twelveHoursAgo;
  }
};

// Ejemplo 4: Cookie simple de string
const sessionManagerSimple = createCookieManager<string>(
  'session_id',
  '',
  getDefaultCookieOptions({
    expires: 0.5, // 12 horas
    sameSite: 'lax'
  })
);

export const sessionSimpleExample = {
  // Guardar ID de sesión
  saveSessionId: (sessionId: string) => {
    sessionManagerSimple.saveRaw(sessionId);
  },

  // Obtener ID de sesión
  getSessionId: () => {
    return sessionManagerSimple.getRaw() || '';
  },

  // Verificar si hay sesión activa
  hasActiveSession: () => {
    return sessionManagerSimple.exists();
  }
};

// Ejemplo 5: Configuración específica para diferentes entornos
export const environmentConfigExample = {
  // Configuración para desarrollo
  getDevelopmentOptions: (): CookieOptions => {
    return getDefaultCookieOptions({
      secure: false, // Permitir HTTP en desarrollo
      sameSite: 'lax', // Más permisivo
      expires: 1 // 1 día
    });
  },

  // Configuración para producción
  getProductionOptions: (): CookieOptions => {
    return getDefaultCookieOptions({
      secure: true, // Solo HTTPS
      sameSite: 'strict', // Más seguro
      expires: 7 // 7 días
    });
  },

  // Configuración específica para subdominios
  getSubdomainOptions: (): CookieOptions => {
    const domain = getCookieDomain();
    return getDefaultCookieOptions({
      domain,
      expires: 3, // 3 días para subdominios
      sameSite: 'lax' // Más permisivo para subdominios
    });
  }
};

// Ejemplo 6: Configuración avanzada para diferentes entornos
const createProductionCookieOptions = (): CookieOptions => {
  return getDefaultCookieOptions({
    secure: true,
    sameSite: 'strict',
    expires: 7
  });
};

const createDevelopmentCookieOptions = (): CookieOptions => {
  return getDefaultCookieOptions({
    secure: false,
    sameSite: 'lax',
    expires: 1
  });
};

export const getEnvironmentCookieOptions = (): CookieOptions => {
  return process.env.NODE_ENV === 'production' 
    ? createProductionCookieOptions()
    : createDevelopmentCookieOptions();
};

// Ejemplo 7: Debug y diagnóstico
export const debugExample = {
  // Ejecutar diagnóstico completo
  runDiagnostic: () => {
    console.log('🔍 Iniciando diagnóstico de cookies...');
    cookieUtils.debug();
    
    // Probar guardado con diferentes configuraciones
    cookieUtils.testCookieSaving('diagnostic', 'test-value');
    
    // Verificar dominio detectado
    console.log('Dominio detectado para cookies:', getCookieDomain());
    console.log('Opciones por defecto:', getDefaultCookieOptions());
  },

  // Verificar configuración específica
  checkConfiguration: (key: string) => {
    const allCookies = cookieUtils.getAll();
    console.log(`Cookies existentes para "${key}":`, allCookies[key] || 'No encontrada');
    console.log('Todas las cookies:', allCookies);
  }
};

// Ejemplo 8: Utilidades globales
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