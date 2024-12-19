export const BASE_PATH_API_CROPCO = import.meta.env
  .VITE_HOST_API_CROPCO as string;

export const PATH_HOME_APP = '/app/home';
export const PATH_LOGIN = '/app/authentication/login';

type CacheConfig = {
  shortTerm: {
    staleTime: number;
    cacheTime: number;
  };
  mediumTerm: {
    staleTime: number;
    cacheTime: number;
  };
  longTerm: {
    staleTime: number;
    cacheTime: number | 'Infinity';
  };
};

export const CACHE_CONFIG_TIME: CacheConfig = {
  shortTerm: {
    staleTime: 0, // Siempre se considera obsoleto.
    cacheTime: 60_000, // 1 minuto en milisegundos.
  },
  mediumTerm: {
    staleTime: 60_000 * 10, // 10 minutos en milisegundos.
    cacheTime: 60_000 * 60, // 1 hora en milisegundos.
  },
  longTerm: {
    staleTime: 60_000 * 60 * 24, // 24 horas en milisegundos.
    cacheTime: 'Infinity', // Dato permanece en caché indefinidamente.
  },
};
