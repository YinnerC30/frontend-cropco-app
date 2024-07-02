import { ObjectWithId } from "@/modules/core/interfaces/ObjectWithId";

export interface PaymentWork {
  id?: string;
  payment: ObjectWithId;
  works_detail: ObjectWithId;
}
