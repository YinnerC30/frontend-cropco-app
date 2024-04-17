import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Crop } from '@/interfaces/Crop';

export const updateCrop = async (crop: Crop) => {
  const { id, ...rest } = crop;
  await cropcoAPI.patch(`${pathsCropco.crops}/${id}`, rest);
};
