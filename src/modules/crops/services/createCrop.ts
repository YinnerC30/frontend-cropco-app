import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Crop } from '@/modules/crops/interfaces/Crop';

export const createCrop = async (crop: Crop) =>
  await cropcoAPI.post(`${pathsCropco.crops}`, crop);
