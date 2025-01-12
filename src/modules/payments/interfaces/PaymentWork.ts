import { ObjectWithId } from "@/modules/core/interfaces/generall/ObjectWithId";

export interface PaymentWork {
  id?: string;
  payment: ObjectWithId;
  works_detail: ObjectWithId;
}
