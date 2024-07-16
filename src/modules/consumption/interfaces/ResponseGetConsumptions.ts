import { ConsumptionSupplies } from "./ConsuptionSupplies";

export interface ResponseGetConsumptions {
  rowCount: number;
  rows: ConsumptionSupplies[];
  pageCount: number;
}
