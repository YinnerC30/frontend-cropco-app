import { ObjectWithId } from '@/modules/core/interfaces/general/ObjectWithId';
import { Harvest } from './Harvest';

export interface HarvestDetail {
  id?: string;
  employee: ObjectWithId;
  payments_harvest?: any[];
  total: number;
  value_pay: number;
  harvest?: Harvest;
  payment_is_pending?: boolean;
}
