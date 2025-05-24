import { type SaleDetail } from "./SaleDetail";

export interface Sale {
  id?: string;
  date: Date;
  amount: number;
  value_pay: number;
  details: SaleDetail[];
}
