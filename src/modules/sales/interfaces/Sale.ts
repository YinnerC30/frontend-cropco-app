import { type SaleDetail } from './SaleDetail';

export interface Sale {
  id?: string;
  date: Date;
  quantity: number;
  total: number;
  details: SaleDetail[];
}
