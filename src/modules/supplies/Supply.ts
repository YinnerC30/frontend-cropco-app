import { UnitOfMeasureSupply } from '@/modules/harvests/UnitOfMeasure';

export interface Supply {
  id?: string;
  name: string;
  brand: string;
  unit_of_measure: UnitOfMeasureSupply | string;
  observation: string;
}
