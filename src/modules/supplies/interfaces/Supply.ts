import { UnitOfMeasure } from './UnitOfMeasure';

export interface Supply {
  id?: string;
  name: string;
  brand: string;
  unit_of_measure: UnitOfMeasure | string | undefined;
  observation: string;
  stock?: {
    id: string;
    amount: number;
  }
}
