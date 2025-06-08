import { LogicDeleteRecordProps } from '@/modules/core/interfaces/general/LogicDeleteRecordProps';
import { ObjectWithId } from '@/modules/core/interfaces/general/ObjectWithId';
import { UnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';

export interface ShoppingDetail extends LogicDeleteRecordProps {
  id?: string;
  unit_of_measure: UnitOfMeasure | string | undefined;
  supply: ObjectWithId;
  supplier: ObjectWithId;
  amount: number;
  value_pay: number;
}
