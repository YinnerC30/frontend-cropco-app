import { ObjectWithId } from "@/modules/core/interfaces/general/ObjectWithId";

export interface SaleDetail {
  id?: string;
  quantity: number;
  total: number;
  sale?: ObjectWithId;
  crop: ObjectWithId;
  client: ObjectWithId;
  is_receivable: boolean;
}
