export enum UnitOfMeasure {
  GRAMOS = 'GRAMOS',
  MILILITROS = 'MILILITROS',
  KILOGRAMOS = 'KILOGRAMOS',
  LIBRAS = 'LIBRAS',
  ONZAS = 'ONZAS',
  TONELADAS = 'TONELADAS',
  LITROS = 'LITROS',
  GALONES = 'GALONES',
}

export const UnitsType: {
  GRAMOS: {
    key: UnitOfMeasure;
    value: UnitOfMeasure;
    label: string;
  }[];
  MILILITROS: {
    key: UnitOfMeasure;
    value: UnitOfMeasure;
    label: string;
  }[];
} = {
  GRAMOS: [
    {
      key: UnitOfMeasure.GRAMOS,
      value: UnitOfMeasure.GRAMOS,
      label: 'Gramos',
    },
    {
      key: UnitOfMeasure.ONZAS,
      value: UnitOfMeasure.ONZAS,
      label: 'Onzas',
    },
    {
      key: UnitOfMeasure.LIBRAS,
      value: UnitOfMeasure.LIBRAS,
      label: 'Libras',
    },
    {
      key: UnitOfMeasure.KILOGRAMOS,
      value: UnitOfMeasure.KILOGRAMOS,
      label: 'Kilogramos',
    },
    {
      key: UnitOfMeasure.TONELADAS,
      value: UnitOfMeasure.TONELADAS,
      label: 'Toneladas',
    },
  ],
  MILILITROS: [
    {
      key: UnitOfMeasure.MILILITROS,
      value: UnitOfMeasure.MILILITROS,
      label: 'Mililitros',
    },
    {
      key: UnitOfMeasure.LITROS,
      value: UnitOfMeasure.LITROS,
      label: 'Litros',
    },
    {
      key: UnitOfMeasure.GALONES,
      value: UnitOfMeasure.GALONES,
      label: 'Galones',
    },
  ],
};
