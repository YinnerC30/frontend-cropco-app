import { LogicDeleteRecordProps } from '@/modules/core/interfaces/general/LogicDeleteRecordProps';
import { ObjectWithId } from '@/modules/core/interfaces/general/ObjectWithId';
import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';

export interface SaleDetail extends LogicDeleteRecordProps {
  id?: string;
  unit_of_measure: MassUnitOfMeasure | undefined;
  amount: number;
  value_pay: number;
  sale?: ObjectWithId;
  crop: ObjectWithId;
  client: ObjectWithId;
  is_receivable: boolean;
}
