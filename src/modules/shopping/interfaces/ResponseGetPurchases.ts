import { PurchaseSupplies } from "./PurchaseSupplies";

export interface ResponseGetPurchases {
  rowCount: number;
  rows: PurchaseSupplies[];
  pageCount: number;
}
