import { LogicDeleteRecordProps } from '@/modules/core/interfaces/general/LogicDeleteRecordProps';
import { ObjectWithId } from '@/modules/core/interfaces/general/ObjectWithId';
import { Harvest } from '@/modules/harvests/interfaces';
import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';

export interface HarvestDetailEmployee extends LogicDeleteRecordProps {
  id: string;
  date: string;
  employee: ObjectWithId;
  unit_of_measure: MassUnitOfMeasure;
  amount: number;
  value_pay: number;
  harvest: Harvest;
  payment_is_pending?: boolean;
}
