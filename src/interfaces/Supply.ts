import { UnitOfMeasure } from '@/enums/UnitOfMeasure';

export interface Supply {
  id?: string;
  name: string;
  brand: string;
  unit_of_measure: UnitOfMeasure | string;
  observation: string;
}
