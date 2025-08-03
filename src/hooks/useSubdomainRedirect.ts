import { useEffect } from 'react';

interface UseSubdomainRedirectOptions {
  /** Ruta a la que redirigir cuando se detecta un subdominio */
  redirectRoute?: string;
  /** Dominio base para detectar subdominios (por defecto 'localhost') */
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
 * @param options - Opciones de configuración del hook
 * @returns Objeto con funciones y estado para manejar subdominios
 */
export const useSubdomainRedirect = (
  options: UseSubdomainRedirectOptions = {}
): UseSubdomainRedirectReturn => {
  const {
    redirectRoute = '/management/authentication/login',
    baseDomain = 'localhost',
    autoRedirect = true,
  } = options;

  const currentHost = window.location.hostname;

  // Detecta si el host es un subdominio
  const isSubdomain = (): boolean => {
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
    // const pathname =
    //   window.location.pathname + window.location.search + window.location.hash;

    // Usa la ruta personalizada si se proporciona, sino la ruta por defecto
    const targetPath = customRoute || redirectRoute;

    // Redirige al dominio base con la ruta especificada
    window.location.replace(`${protocol}//${baseDomain}${port}${targetPath}`);
  };

  useEffect(() => {
    if (autoRedirect && isSubdomain()) {
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
