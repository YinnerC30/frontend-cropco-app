import {
  LengthUnitOfMeasure,
  MassUnitOfMeasure,
  UnitOfMeasure,
  VolumeUnitOfMeasure,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { useCallback } from 'react';

// Factores de conversión a unidades base (gramos, mililitros y milímetros)
const conversionFactors = {
  // Masa (base: gramos)
  KILOGRAMOS: 1000, // 1 kg = 1000 g
  LIBRAS: 453.592, // 1 lb = 453.592 g
  ONZAS: 28.3495, // 1 oz = 28.3495 g
  TONELADAS: 1000000, // 1 t = 1,000,000 g

  // Volumen (base: mililitros)
  LITROS: 1000, // 1 L = 1000 ml
  GALONES: 3785.41, // 1 gal = 3785.41 ml

  // Longitud (base: milímetros)
  CENTIMETROS: 10, // 1 cm = 10 mm
  METROS: 1000, // 1 m = 1000 mm
};

// Mapeo de unidades a su tipo (masa, volumen o longitud)
export const unitTypeMap: Record<UnitOfMeasure, 'MASS' | 'VOLUME' | 'LENGTH'> =
  {
    // Masa
    GRAMOS: 'MASS',
    KILOGRAMOS: 'MASS',
    LIBRAS: 'MASS',
    ONZAS: 'MASS',
    TONELADAS: 'MASS',
    // Volumen
    MILILITROS: 'VOLUME',
    LITROS: 'VOLUME',
    GALONES: 'VOLUME',
    // Longitud
    MILIMETROS: 'LENGTH',
    CENTIMETROS: 'LENGTH',
    METROS: 'LENGTH',
  };

type GetUnitBaseReturn =
  | VolumeUnitOfMeasure.MILILITROS
  | MassUnitOfMeasure.GRAMOS
  | LengthUnitOfMeasure.MILIMETROS
  | null;

export const useUnitConverter = () => {
  const convert = useCallback(
    (
      amount: number,
      fromUnit: UnitOfMeasure,
      toUnit: UnitOfMeasure
    ): number => {
      // Si las unidades son iguales, retornar el mismo valor
      if (fromUnit === toUnit) {
        return amount;
      }

      // Verificar que las unidades sean del mismo tipo (masa, volumen o longitud)
      if (unitTypeMap[fromUnit] !== unitTypeMap[toUnit]) {
        throw new Error(
          `No se puede convertir entre unidades de ${unitTypeMap[fromUnit]} y ${unitTypeMap[toUnit]}`
        );
      }

      // Convertir a la unidad base
      let baseAmount: number;
      if (
        fromUnit === 'GRAMOS' ||
        fromUnit === 'MILILITROS' ||
        fromUnit === 'MILIMETROS'
      ) {
        baseAmount = amount;
      } else {
        baseAmount = amount * conversionFactors[fromUnit];
      }

      // Convertir de la unidad base a la unidad destino
      let finalAmount: number;
      if (
        toUnit === 'GRAMOS' ||
        toUnit === 'MILILITROS' ||
        toUnit === 'MILIMETROS'
      ) {
        finalAmount = baseAmount;
      } else {
        finalAmount = baseAmount / conversionFactors[toUnit];
      }

      // Asegurarse de que la conversión sea correcta cuando la unidad de origen es la base
      if (
        (fromUnit === 'GRAMOS' ||
          fromUnit === 'MILILITROS' ||
          fromUnit === 'MILIMETROS') &&
        toUnit !== 'GRAMOS' &&
        toUnit !== 'MILILITROS' &&
        toUnit !== 'MILIMETROS'
      ) {
        finalAmount = amount / conversionFactors[toUnit];
      }

      return Number(finalAmount.toFixed(3));
    },
    []
  );

  const getUnitBase = (unit: UnitOfMeasure): GetUnitBaseReturn => {
    const grupUnit = unitTypeMap[unit];

    switch (grupUnit) {
      case 'MASS':
        return MassUnitOfMeasure.GRAMOS;

      case 'VOLUME':
        return VolumeUnitOfMeasure.MILILITROS;

      case 'LENGTH':
        return LengthUnitOfMeasure.MILIMETROS;

      default:
        return null;
    }
  };

  // const unitTypeMap = useCallback(
  //   (unit: UnitOfMeasure): 'MASS' | 'VOLUME' | 'length' => {
  //     return unitTypeMap[unit];
  //   },
  //   []
  // );

  return {
    convert,
    // unitTypeMap,
    getUnitBase,
  };
};
