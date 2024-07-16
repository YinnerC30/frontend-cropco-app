import { ObjectWithId } from "@/modules/core/interfaces/ObjectWithId";

export interface PurchaseDetails {
  id?: string;
  supply: ObjectWithId;
  supplier: ObjectWithId;
  amount: number;
  total: number;
}
