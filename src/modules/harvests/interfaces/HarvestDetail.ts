import { ObjectWithId } from '@/modules/core/interfaces/general/ObjectWithId';
import { Harvest } from './Harvest';

export interface HarvestDetail {
  employee: ObjectWithId;
  id: string;
  payments_harvest?: any[];
  total: number;
  value_pay: number;
  harvest: Harvest;
  payment_is_pending: boolean;
}
