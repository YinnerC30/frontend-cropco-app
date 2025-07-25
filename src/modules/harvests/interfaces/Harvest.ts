import { LogicDeleteRecordProps } from "@/modules/core/interfaces/general/LogicDeleteRecordProps";
import { ObjectWithId } from "../../core/interfaces/general/ObjectWithId";
import { HarvestDetail } from "./HarvestDetail";
import { HarvestProcessed } from "./HarvestProcessed";

export interface Harvest extends LogicDeleteRecordProps {
  id?: string;
  crop: ObjectWithId;
  date: string;
  details: HarvestDetail[];
  observation?: string | undefined;
  amount: number;
  value_pay: number;
  processed?: HarvestProcessed[];
  total_amount_processed?: number;
}
