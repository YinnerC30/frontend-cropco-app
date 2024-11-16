import { ObjectWithId } from "@/modules/core/interfaces/General/ObjectWithId";

export interface PaymentHarvest {
  id?: string;
  payment: ObjectWithId;
  harvests_detail: ObjectWithId;
}
