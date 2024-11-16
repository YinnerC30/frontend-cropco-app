import { ObjectWithId } from "@/modules/core/interfaces/General/ObjectWithId";

export interface ShoppingDetails {
  id?: string;
  supply: ObjectWithId;
  supplier: ObjectWithId;
  amount: number;
  total: number;
}
