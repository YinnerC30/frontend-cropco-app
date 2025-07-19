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

export type UnitOfMeasure =
  | VolumeUnitOfMeasure
  | MassUnitOfMeasure
  | LengthUnitOfMeasure;

/**
 * Interface for unit of measure option.
 */
export interface UnitOfMeasureOption<T extends UnitOfMeasure> {
  key: T;
  value: T;
  label: string;
}

/**
 * Diccionario de agrupaciones de unidades de medida por tipo base.
 */
export const UnitsType: Record<
  'GRAMOS' | 'MILILITROS' | 'MILIMETROS',
  UnitOfMeasureOption<any>[]
> = {
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

/**
 * Obtiene el array de opciones de unidades de medida relacionadas a la unidad base proporcionada.
 * @param unit Unidad de medida base (por ejemplo: 'GRAMOS', 'KILOGRAMOS', 'LIBRAS', 'MILILITROS', etc.)
 * @returns Array de opciones de unidades de medida relacionadas.
 */
export function getUnitOfMeasureOptions(
  unit: UnitOfMeasure
): UnitOfMeasureOption<UnitOfMeasure>[] {
  if (Object.values(MassUnitOfMeasure).includes(unit as MassUnitOfMeasure)) {
    return UnitsType.GRAMOS as UnitOfMeasureOption<UnitOfMeasure>[];
  }
  if (
    Object.values(VolumeUnitOfMeasure).includes(unit as VolumeUnitOfMeasure)
  ) {
    return UnitsType.MILILITROS as UnitOfMeasureOption<UnitOfMeasure>[];
  }
  if (
    Object.values(LengthUnitOfMeasure).includes(unit as LengthUnitOfMeasure)
  ) {
    return UnitsType.MILIMETROS as UnitOfMeasureOption<UnitOfMeasure>[];
  }
  return [];
}

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
