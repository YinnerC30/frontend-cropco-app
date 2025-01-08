import { ShoppingDetail } from './ShoppingDetails';

export interface ShoppingSupplies {
  id?: string;
  date: string | Date | undefined;
  total: number;
  details: ShoppingDetail[];
}
