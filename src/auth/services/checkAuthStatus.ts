import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipInterceptor?: boolean; // Agrega esta propiedad opcional
  }
}

export const checkAuthStatus = async (token: string) => {
  const response = await cropcoAPI.get(
    `${pathsCropco.authentication}/check-status`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      skipInterceptor: true,
    }
  );
  return response;
};
