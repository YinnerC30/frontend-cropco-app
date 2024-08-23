import { ShoppingDetails } from "./ShoppingDetails";


export interface ShoppingSupplies {
  id?: string;
  date: string | any;
  total: number;
  details: ShoppingDetails[];
}
