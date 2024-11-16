import { ObjectWithId } from "@/modules/core/interfaces/General/ObjectWithId";

export interface WorkDetail {
  id?: string;
  value_pay: number;
  work?: ObjectWithId;
  employee: ObjectWithId;
  payment_is_pending: boolean;
}
