import { ObjectWithId } from "@/modules/core/interfaces/general/ObjectWithId";

export interface ShoppingDetail {
  id?: string;
  supply: ObjectWithId;
  supplier: ObjectWithId;
  amount: number;
  total: number;
}
