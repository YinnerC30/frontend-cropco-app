import { LogicDeleteRecordProps } from '@/modules/core/interfaces/general/LogicDeleteRecordProps';
import { ObjectWithId } from '@/modules/core/interfaces/general/ObjectWithId';
import { UnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';
import { ConsumptionSupplies } from './ConsuptionSupplies';

export interface ConsumptionDetails extends LogicDeleteRecordProps {
  id?: string;
  supply: ObjectWithId;
  crop: ObjectWithId;
  unit_of_measure: UnitOfMeasure | string | undefined;
  amount: number;
  consumption?: ConsumptionSupplies;
}
