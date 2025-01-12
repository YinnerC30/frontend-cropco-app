import { ObjectWithId } from "@/modules/core/interfaces/generall/ObjectWithId";

export interface PaymentHarvest {
  id?: string;
  payment: ObjectWithId;
  harvests_detail: ObjectWithId;
}
