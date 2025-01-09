import { ConsumptionDetails } from "./ConsumptionDetails";

export interface ConsumptionSupplies {
  id?: string;
  date: string | undefined;
  details: ConsumptionDetails[];
}
