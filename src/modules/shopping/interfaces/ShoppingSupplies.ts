import { ShoppingDetail } from './ShoppingDetails';

export interface ShoppingSupplies {
  id?: string;
  date: string | Date | undefined;
  value_pay: number;
  details: ShoppingDetail[];
}
