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

/**
 * Enum for length units of measure.
 */
export enum LengthUnitOfMeasure {
  MILIMETROS = 'MILIMETROS',
  CENTIMETROS = 'CENTIMETROS',
  METROS = 'METROS',
  // KILOMETROS = 'KILOMETROS',
  // PULGADAS = 'PULGADAS',
  // PIES = 'PIES',
  // YARDAS = 'YARDAS',
  // MILLAS = 'MILLAS',
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
  // Lenght
  MILIMETROS = 'MILIMETROS',
  CENTIMETROS = 'CENTIMETROS',
  METROS = 'METROS',
}

export type UnitOfMeasure = VolumeUnitOfMeasure | MassUnitOfMeasure | LengthUnitOfMeasure;

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
  MILIMETROS: {
    key: LengthUnitOfMeasure;
    value: LengthUnitOfMeasure;
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
  MILIMETROS: [
    {
      key: LengthUnitOfMeasure.MILIMETROS,
      value: LengthUnitOfMeasure.MILIMETROS,
      label: 'Milímetros',
    },
    {
      key: LengthUnitOfMeasure.CENTIMETROS,
      value: LengthUnitOfMeasure.CENTIMETROS,
      label: 'Centímetros',
    },
    {
      key: LengthUnitOfMeasure.METROS,
      value: LengthUnitOfMeasure.METROS,
      label: 'Metros',
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
  MILIMETROS: 'mm',
  CENTIMETROS: 'cm',
  METROS: 'm',
};
