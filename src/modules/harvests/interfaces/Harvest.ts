import { ObjectWithId } from "../../core/interfaces/general/ObjectWithId";
import { HarvestDetail } from "./HarvestDetail";
import { HarvestProcessed } from "./HarvestProcessed";

export interface Harvest {
  crop: ObjectWithId;
  date: Date;
  details: HarvestDetail[];
  id?: string;
  observation?: string | undefined;
  total: number;
  value_pay: number;
  processed?: HarvestProcessed[];
  total_processed?: number;
}
