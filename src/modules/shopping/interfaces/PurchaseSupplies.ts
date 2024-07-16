import { PurchaseDetails } from "./PurchaseDetails";

export interface PurchaseSupplies {
  id?: string;
  date: string | any;
  total: number;
  details: PurchaseDetails[];
}
