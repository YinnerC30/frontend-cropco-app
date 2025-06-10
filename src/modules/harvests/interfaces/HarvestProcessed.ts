import { ObjectWithId } from '@/modules/core/interfaces/general/ObjectWithId';
import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';

export interface HarvestProcessed {
  crop?: ObjectWithId;
  date: Date | undefined;
  harvest?: ObjectWithId;
  id?: string;
  unit_of_measure: MassUnitOfMeasure | string | undefined;
  amount: number;
}
