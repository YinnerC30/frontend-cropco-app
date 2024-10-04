import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { Supplier } from "@/modules/suppliers/interfaces/Supplier";

export const updateSupplier = async (supplier: Supplier) => {
  const { id, ...rest } = supplier;
  await cropcoAPI.patch(`${pathsCropco.suppliers}/update/one/${id}`, rest);
};
