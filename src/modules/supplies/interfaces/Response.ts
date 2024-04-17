import { Supply } from './Supply';

export interface ResponseGetSupplies {
  rowCount: number;
  rows: Supply[];
  pageCount: number;
}
