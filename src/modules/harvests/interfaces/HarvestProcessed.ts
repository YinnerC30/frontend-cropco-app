import { ObjectWithId } from "@/modules/core/interfaces/General/ObjectWithId";

export interface HarvestProcessed {
  crop: ObjectWithId;
  date: Date;
  harvest: ObjectWithId;
  id?: string;
  total: number;
}
