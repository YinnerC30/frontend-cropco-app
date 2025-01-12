import { ObjectWithId } from "@/modules/core/interfaces/generall/ObjectWithId";

export interface SaleDetail {
  id?: string;
  quantity: number;
  total: number;
  sale?: ObjectWithId;
  crop: ObjectWithId;
  client: ObjectWithId;
  is_receivable: boolean;
}
