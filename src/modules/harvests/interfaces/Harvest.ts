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


