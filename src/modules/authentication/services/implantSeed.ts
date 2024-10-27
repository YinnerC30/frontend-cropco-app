import { cropcoAPI } from '@/api/cropcoAPI';

export const implantSeed = async () => {
  return await cropcoAPI.get(`/seed`);
};
