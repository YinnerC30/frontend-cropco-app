import { ObjectWithId } from "@/modules/core/interfaces/generall/ObjectWithId";
import { Work } from "./Work";

export interface WorkDetail {
  id?: string;
  value_pay: number;
  work?: Work;
  employee: ObjectWithId;
  payment_is_pending: boolean;
}
