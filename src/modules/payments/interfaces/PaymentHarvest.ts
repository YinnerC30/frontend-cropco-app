import { ObjectWithId } from "@/modules/core/interfaces/general/ObjectWithId";

export interface PaymentHarvest {
  id?: string;
  payment: ObjectWithId;
  harvests_detail: ObjectWithId;
}
