export enum UnitOfMeasure {
  GRAMOS = 'GRAMOS',
  MILILITROS = 'MILILITROS',
}

export interface CreateSupply {
  name: string;
  brand: string;
  unit_of_measure: string;
  observation: string;
}
export interface GetSupply extends CreateSupply {
  id: string;
}
