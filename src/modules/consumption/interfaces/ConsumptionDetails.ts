import { ObjectWithId } from "@/modules/core/interfaces/generall/ObjectWithId";

export interface ConsumptionDetails {
  id?: string;
  supply: ObjectWithId;
  crop: ObjectWithId;
  amount: number;
}
