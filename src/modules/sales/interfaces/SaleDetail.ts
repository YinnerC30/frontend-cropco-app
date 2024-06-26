import { ObjectWithId } from "@/modules/core/interfaces/ObjectWithId";

export interface SaleDetail {
  id?: string;
  quantity: number;
  total: number;
  sale?: ObjectWithId;
  crop: ObjectWithId;
  client: ObjectWithId;
}
