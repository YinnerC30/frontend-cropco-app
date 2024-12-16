import { ShoppingDetail } from "./ShoppingDetails";


export interface ShoppingSupplies {
  id?: string;
  date: string | any;
  total: number;
  details: ShoppingDetail[];
}
