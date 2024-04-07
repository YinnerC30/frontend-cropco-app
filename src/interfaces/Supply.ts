import { UnitOfMeasureSupply } from '@/enums/UnitOfMeasure';

export interface Supply {
  id?: string;
  name: string;
  brand: string;
  unit_of_measure: UnitOfMeasureSupply | string;
  observation: string;
}
