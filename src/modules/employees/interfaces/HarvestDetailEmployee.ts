import { LogicDeleteRecordProps } from '@/modules/core/interfaces/general/LogicDeleteRecordProps';
import { Harvest } from '@/modules/harvests/interfaces';
import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';

export interface HarvestDetailEmployee extends LogicDeleteRecordProps {
  id: string;
  employee: { id: string; full_name: string };
  unit_of_measure: MassUnitOfMeasure;
  amount: number;
  value_pay: number;
  harvest: Harvest;
  payment_is_pending?: boolean;
}
