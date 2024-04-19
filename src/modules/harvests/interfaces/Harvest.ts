import { ObjectWithId } from "../../core/interfaces/ObjectWithId";
import { HarvestDetail } from "./HarvestDetail";

export interface Harvest {
  crop: ObjectWithId;
  date: Date;
  details: HarvestDetail[];
  id?: string;
  observation?: string | undefined;
  total: number;
  value_pay: number;
}

export interface HarvestProcessed {
  crop: ObjectWithId;
  date: Date;
  harvest: ObjectWithId;
  id?: string;
  total: number;
}
