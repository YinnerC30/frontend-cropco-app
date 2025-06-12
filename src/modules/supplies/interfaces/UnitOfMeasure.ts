export enum VolumeUnitOfMeasure {
  MILILITROS = 'MILILITROS',
  LITROS = 'LITROS',
  GALONES = 'GALONES',
}

export enum MassUnitOfMeasure {
  GRAMOS = 'GRAMOS',
  KILOGRAMOS = 'KILOGRAMOS',
  LIBRAS = 'LIBRAS',
  ONZAS = 'ONZAS',
  TONELADAS = 'TONELADAS',
}

export enum AllUnitsOfMeasure {
  //MASS
  GRAMOS = 'GRAMOS',
  KILOGRAMOS = 'KILOGRAMOS',
  LIBRAS = 'LIBRAS',
  ONZAS = 'ONZAS',
  TONELADAS = 'TONELADAS',
  //Volume
  MILILITROS = 'MILILITROS',
  LITROS = 'LITROS',
  GALONES = 'GALONES',
}

export type UnitOfMeasure = VolumeUnitOfMeasure | MassUnitOfMeasure;

export const UnitsType: {
  GRAMOS: {
    key: MassUnitOfMeasure;
    value: MassUnitOfMeasure;
    label: string;
  }[];
  MILILITROS: {
    key: VolumeUnitOfMeasure;
    value: VolumeUnitOfMeasure;
    label: string;
  }[];
} = {
  GRAMOS: [
    {
      key: MassUnitOfMeasure.GRAMOS,
      value: MassUnitOfMeasure.GRAMOS,
      label: 'Gramos',
    },
    {
      key: MassUnitOfMeasure.ONZAS,
      value: MassUnitOfMeasure.ONZAS,
      label: 'Onzas',
    },
    {
      key: MassUnitOfMeasure.LIBRAS,
      value: MassUnitOfMeasure.LIBRAS,
      label: 'Libras',
    },
    {
      key: MassUnitOfMeasure.KILOGRAMOS,
      value: MassUnitOfMeasure.KILOGRAMOS,
      label: 'Kilogramos',
    },
    {
      key: MassUnitOfMeasure.TONELADAS,
      value: MassUnitOfMeasure.TONELADAS,
      label: 'Toneladas',
    },
  ],
  MILILITROS: [
    {
      key: VolumeUnitOfMeasure.MILILITROS,
      value: VolumeUnitOfMeasure.MILILITROS,
      label: 'Mililitros',
    },
    {
      key: VolumeUnitOfMeasure.LITROS,
      value: VolumeUnitOfMeasure.LITROS,
      label: 'Litros',
    },
    {
      key: VolumeUnitOfMeasure.GALONES,
      value: VolumeUnitOfMeasure.GALONES,
      label: 'Galones',
    },
  ],
};

export const UnitSymbols: Record<UnitOfMeasure, string> = {
  GRAMOS: 'g',
  KILOGRAMOS: 'kg',
  LIBRAS: 'lb',
  ONZAS: 'oz',
  TONELADAS: 't',
  MILILITROS: 'ml',
  LITROS: 'L',
  GALONES: 'gal',
};
