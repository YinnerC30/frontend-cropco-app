import { ObjectWithId } from "@/modules/core/interfaces/General/ObjectWithId";

export interface ConsumptionDetails {
  id?: string;
  supply: ObjectWithId;
  crop: ObjectWithId;
  amount: number;
}
