import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const checkAuthStatus = async () => {
  const response = await cropcoAPI.get(
    `${pathsCropco.authentication}/check-status`
  );
  console.log('Se ejecuto la query');
  return response;
};
