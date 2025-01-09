import { ObjectWithId } from "@/modules/core/interfaces/general/ObjectWithId";
import { Work } from "./Work";

export interface WorkDetail {
  id: string | undefined;
  value_pay: number;
  work: Work;
  employee: ObjectWithId;
  payment_is_pending: boolean;
}
