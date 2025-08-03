import { useEffect } from 'react';
import { ENVIRONMENT } from '@/config/environment';

interface UseSubdomainRedirectOptions {
  /** Ruta a la que redirigir cuando se detecta un subdominio */
  redirectRoute?: string;
  /** Dominio base para detectar subdominios (se detecta automáticamente según el entorno) */
  baseDomain?: string;
  /** Si es true, redirige automáticamente. Si es false, solo detecta */
  autoRedirect?: boolean;
}

interface UseSubdomainRedirectReturn {
  /** True si el host actual es un subdominio */
  isSubdomain: boolean;
  /** Función para redirigir manualmente */
  redirectToBaseDomain: (customRoute?: string) => void;
  /** Información del host actual */
  hostInfo: {
    currentHost: string;
    baseDomain: string;
    isSubdomain: boolean;
  };
}

/**
 * Hook para detectar y manejar redirecciones desde subdominios
 * Detecta automáticamente el entorno (desarrollo/producción) y usa el dominio apropiado
 * @param options - Opciones de configuración del hook
 * @returns Objeto con funciones y estado para manejar subdominios
 */
export const useSubdomainRedirect = (
  options: UseSubdomainRedirectOptions = {}
): UseSubdomainRedirectReturn => {
  const {
    redirectRoute = '/management/authentication/login',
    baseDomain: customBaseDomain,
    autoRedirect = true,
  } = options;

  // Usa el dominio base de la configuración de entorno si no se especifica uno personalizado
  const baseDomain = customBaseDomain || ENVIRONMENT.baseDomain;
  const currentHost = window.location.hostname;

  // Detecta si el host es un subdominio
  const isSubdomain = (): boolean => {
    // Verifica que el dominio base esté en la lista de dominios permitidos
    if (!ENVIRONMENT.subdomain.isAllowedDomain(baseDomain)) {
      console.warn(
        `Dominio base "${baseDomain}" no está en la lista de dominios permitidos para subdominios`
      );
      return false;
    }

    return (
      currentHost !== baseDomain &&
      currentHost.endsWith(baseDomain) &&
      currentHost.split('.').length > 1
    );
  };

  // Función para redirigir al dominio base
  const redirectToBaseDomain = (customRoute?: string): void => {
    const protocol = window.location.protocol;
    const port = window.location.port ? `:${window.location.port}` : '';

    // Usa la ruta personalizada si se proporciona, sino la ruta por defecto
    const targetPath = customRoute || redirectRoute;

    // Redirige al dominio base con la ruta especificada
    window.location.replace(`${protocol}//${baseDomain}${port}${targetPath}`);
  };

  useEffect(() => {
    if (autoRedirect && isSubdomain()) {
      console.log(
        `Redirigiendo desde subdominio ${currentHost} a ${baseDomain}${redirectRoute}`
      );
      redirectToBaseDomain();
    }
    // No dependencias: solo se ejecuta una vez al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isSubdomain: isSubdomain(),
    redirectToBaseDomain,
    hostInfo: {
      currentHost,
      baseDomain,
      isSubdomain: isSubdomain(),
    },
  };
};
