# Manejo de Cookies en Subdominios

## Problema

En un sistema multi-tenant con subdominios (como `tenant1.cropco.org`, `tenant2.cropco.org`), las cookies pueden no guardarse correctamente debido a restricciones de dominio del navegador.

## Solución Implementada

### 1. Detección Automática de Dominio

El sistema ahora detecta automáticamente el dominio correcto para las cookies:

```typescript
import { getCookieDomain, getDefaultCookieOptions } from '@/lib/cookieManager';

// Para 'tenant1.cropco.org' → retorna '.cropco.org'
// Para 'localhost' → retorna undefined
// Para 'cropco.org' → retorna 'cropco.org'
const domain = getCookieDomain();
```

### 2. Configuración Automática de Cookies

```typescript
import { createCookieManager, getDefaultCookieOptions } from '@/lib/cookieManager';

const userManager = createCookieManager(
  'user-data',
  defaultUserData,
  getDefaultCookieOptions({
    expires: 7, // 7 días
    sameSite: 'strict'
  })
);
```

### 3. Funciones de Debug

Para diagnosticar problemas con cookies:

```typescript
import { cookieUtils } from '@/lib/cookieManager';

// Ejecutar debug completo
cookieUtils.debug();

// Probar guardado de cookies
cookieUtils.testCookieSaving('test-key', 'test-value');

// Verificar si las cookies están habilitadas
const enabled = cookieUtils.isEnabled();
```

### 4. Componente de Debug Visual

```tsx
import { CookieDebug } from '@/components';

// En tu componente de desarrollo
<CookieDebug />
```

## Configuraciones por Entorno

### Desarrollo (localhost)
- `secure: false` (permite HTTP)
- `sameSite: 'lax'` (más permisivo)
- `domain: undefined` (no se especifica)

### Producción (subdominios)
- `secure: true` (solo HTTPS)
- `sameSite: 'strict'` (más seguro)
- `domain: '.cropco.org'` (disponible en todos los subdominios)

## Casos de Uso Comunes

### 1. Autenticación de Usuario

```typescript
import { UserCookieManager } from '@/auth/utils/UserCookieManager';

// Guardar datos de usuario
UserCookieManager.saveUser(userData);

// Obtener token
const token = UserCookieManager.getToken();

// Verificar si está logueado
const isLoggedIn = UserCookieManager.isLoggedIn();
```

### 2. Preferencias de Usuario

```typescript
import { createCookieManager, getDefaultCookieOptions } from '@/lib/cookieManager';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'es' | 'en';
}

const preferencesManager = createCookieManager<UserPreferences>(
  'user-preferences',
  { theme: 'light', language: 'es' },
  getDefaultCookieOptions({ expires: 30 })
);

// Guardar preferencias
preferencesManager.save({ theme: 'dark', language: 'en' });

// Obtener preferencias
const prefs = preferencesManager.get();
```

### 3. Sesión Temporal

```typescript
const sessionManager = createCookieManager<string>(
  'session-id',
  '',
  getDefaultCookieOptions({ expires: 0.5 }) // 12 horas
);

// Guardar ID de sesión
sessionManager.saveRaw('session-123');

// Obtener ID de sesión
const sessionId = sessionManager.getRaw();
```

## Diagnóstico de Problemas

### 1. Verificar Configuración

```typescript
import { cookieUtils, getCookieDomain } from '@/lib/cookieManager';

console.log('Hostname:', window.location.hostname);
console.log('Dominio detectado:', getCookieDomain());
console.log('Cookies habilitadas:', cookieUtils.isEnabled());
console.log('Todas las cookies:', cookieUtils.getAll());
```

### 2. Probar Guardado

```typescript
// Test básico
cookieUtils.testCookieSaving('test', 'value');

// Test manual
try {
  const options = getDefaultCookieOptions();
  console.log('Opciones:', options);
  
  cookieUtils.saveRaw('test-key', 'test-value', options);
  const result = cookieUtils.getRaw('test-key');
  console.log('Resultado:', result);
  
  cookieUtils.remove('test-key', { domain: options.domain, path: options.path });
} catch (error) {
  console.error('Error:', error);
}
```

### 3. Problemas Comunes

#### Cookies no se guardan en subdominio
- **Causa**: Dominio no configurado correctamente
- **Solución**: Usar `getDefaultCookieOptions()` que detecta automáticamente el dominio

#### Cookies no persisten entre páginas
- **Causa**: Path no configurado
- **Solución**: Asegurar que `path: '/'` esté configurado

#### Cookies no funcionan en HTTPS
- **Causa**: `secure: true` en entorno HTTP
- **Solución**: El sistema detecta automáticamente el protocolo

#### Cookies no se comparten entre subdominios
- **Causa**: Dominio específico del subdominio
- **Solución**: Usar dominio padre (ej: `.cropco.org` en lugar de `tenant1.cropco.org`)

## Mejores Prácticas

1. **Siempre usar `getDefaultCookieOptions()`** para configuración automática
2. **Usar `createCookieManager()`** para datos tipados
3. **Configurar `sameSite` apropiadamente** según el caso de uso
4. **Usar `secure: true`** en producción
5. **Limpiar cookies al hacer logout**
6. **Usar el componente `CookieDebug`** en desarrollo

## Ejemplo Completo

```typescript
import { 
  createCookieManager, 
  getDefaultCookieOptions, 
  cookieUtils 
} from '@/lib/cookieManager';

// Configurar manager de usuario
const userManager = createCookieManager(
  'user-data',
  { id: '', name: '', email: '' },
  getDefaultCookieOptions({
    expires: 7,
    sameSite: 'strict'
  })
);

// Guardar datos
userManager.save({ id: '123', name: 'Juan', email: 'juan@example.com' });

// Verificar guardado
if (userManager.exists()) {
  console.log('Usuario guardado:', userManager.get());
} else {
  console.error('Error: No se pudo guardar el usuario');
  cookieUtils.debug(); // Diagnosticar problema
}
``` 