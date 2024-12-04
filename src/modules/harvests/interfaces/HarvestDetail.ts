import { ObjectWithId } from "@/modules/core/interfaces/general/ObjectWithId";

export interface HarvestDetail {
  employee: ObjectWithId;
  id?: string;
  payments_harvest?: any[];
  total: number | undefined;
  value_pay: number | undefined;
}
