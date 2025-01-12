import { ObjectWithId } from "@/modules/core/interfaces/general/ObjectWithId";

export interface PaymentWork {
  id?: string;
  payment: ObjectWithId;
  works_detail: ObjectWithId;
}
