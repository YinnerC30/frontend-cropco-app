import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Supplier } from '@/modules/suppliers/interfaces/Supplier';

export const createSupplier = async (supplier: Supplier) =>
  await cropcoAPI.post(`${pathsCropco.suppliers}`, supplier);
