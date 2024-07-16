import { ConsumptionDetails } from "./ConsumptionDetails";

export interface ConsumptionSupplies {
  id?: string;
  date: string | any;
  details: ConsumptionDetails[];
}
