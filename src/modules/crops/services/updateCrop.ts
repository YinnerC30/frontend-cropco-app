import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Crop } from '@/modules/crops/interfaces/Crop';

export const updateCrop = async (crop: Crop) => {
  const { id, ...rest } = crop;
  await cropcoAPI.patch(`${pathsCropco.crops}/update/one/${id}`, rest);
};
