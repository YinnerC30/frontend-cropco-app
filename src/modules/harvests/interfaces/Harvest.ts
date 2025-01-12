import { ObjectWithId } from "../../core/interfaces/generall/ObjectWithId";
import { HarvestDetail } from "./HarvestDetail";
import { HarvestProcessed } from "./HarvestProcessed";

export interface Harvest {
  crop: ObjectWithId;
  date: string;
  details: HarvestDetail[];
  id?: string;
  observation?: string | undefined;
  total: number;
  value_pay: number;
  processed?: HarvestProcessed[];
  total_processed?: number;
}
