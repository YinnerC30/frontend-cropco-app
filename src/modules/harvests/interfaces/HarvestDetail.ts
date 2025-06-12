import { LogicDeleteRecordProps } from '@/modules/core/interfaces/general/LogicDeleteRecordProps';
import { ObjectWithId } from '@/modules/core/interfaces/general/ObjectWithId';
import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';
import { Harvest } from './Harvest';

export interface HarvestDetail extends LogicDeleteRecordProps {
  id?: string;
  employee: ObjectWithId;
  payments_harvest?: any[];
  unit_of_measure: MassUnitOfMeasure | undefined;
  amount: number;
  value_pay: number;
  harvest?: Harvest;
  payment_is_pending?: boolean;
}
