import { ObjectWithId } from "@/modules/core/interfaces/General/ObjectWithId";

export interface HarvestDetail {
  employee: ObjectWithId;
  id?: string;
  payments_harvest?: any[];
  total: number;
  value_pay: number;
}
