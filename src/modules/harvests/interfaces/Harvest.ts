import { ObjectWithId } from "../../core/interfaces/general/ObjectWithId";
import { HarvestDetail } from "./HarvestDetail";
import { HarvestProcessed } from "./HarvestProcessed";

export interface Harvest {
  crop: ObjectWithId;
  date: string;
  details: HarvestDetail[];
  id?: string;
  observation?: string | undefined;
  amount: number;
  value_pay: number;
  processed?: HarvestProcessed[];
  total_amount_processed?: number;
}
