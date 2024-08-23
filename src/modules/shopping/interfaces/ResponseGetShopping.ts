import { ShoppingSupplies } from "./ShoppingSupplies";

export interface ResponseGetShopping {
  rowCount: number;
  rows: ShoppingSupplies[];
  pageCount: number;
}
