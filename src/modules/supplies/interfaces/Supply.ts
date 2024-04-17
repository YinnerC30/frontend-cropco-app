import { UnitOfMeasureSupply } from '@/modules/supplies/interfaces/UnitOfMeasure';

export interface Supply {
  id?: string;
  name: string;
  brand: string;
  unit_of_measure: UnitOfMeasureSupply | string;
  observation: string;
}
