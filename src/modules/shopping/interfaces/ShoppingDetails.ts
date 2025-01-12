import { ObjectWithId } from "@/modules/core/interfaces/generall/ObjectWithId";

export interface ShoppingDetail {
  id?: string;
  supply: ObjectWithId;
  supplier: ObjectWithId;
  amount: number;
  total: number;
}
