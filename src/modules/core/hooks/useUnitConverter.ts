import { UnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';
import { useCallback } from 'react';

// Factores de conversión a unidades base (gramos y mililitros)
const conversionFactors = {
  // Masa (base: gramos)
  KILOGRAMOS: 1000, // 1 kg = 1000 g
  LIBRAS: 453.592, // 1 lb = 453.592 g
  ONZAS: 28.3495, // 1 oz = 28.3495 g
  TONELADAS: 1000000, // 1 t = 1,000,000 g

  // Volumen (base: mililitros)
  LITROS: 1000, // 1 L = 1000 ml
  GALONES: 3785.41, // 1 gal = 3785.41 ml
};

// Mapeo de unidades a su tipo (masa o volumen)
const unitTypeMap: Record<UnitOfMeasure, 'mass' | 'volume'> = {
  // Masa
  GRAMOS: 'mass',
  KILOGRAMOS: 'mass',
  LIBRAS: 'mass',
  ONZAS: 'mass',
  TONELADAS: 'mass',
  // Volumen
  MILILITROS: 'volume',
  LITROS: 'volume',
  GALONES: 'volume',
};

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

      // Verificar que las unidades sean del mismo tipo (masa o volumen)
      if (unitTypeMap[fromUnit] !== unitTypeMap[toUnit]) {
        throw new Error(
          `No se puede convertir entre unidades de ${unitTypeMap[fromUnit]} y ${unitTypeMap[toUnit]}`
        );
      }

      // Convertir a la unidad base
      let baseAmount: number;
      if (fromUnit === 'GRAMOS' || fromUnit === 'MILILITROS') {
        baseAmount = amount;
      } else {
        baseAmount = amount * conversionFactors[fromUnit];
      }

      // Convertir de la unidad base a la unidad destino
      let finalAmount: number;
      if (toUnit === 'GRAMOS' || toUnit === 'MILILITROS') {
        finalAmount = baseAmount;
      } else {
        finalAmount = baseAmount / conversionFactors[toUnit];
      }

      // Asegurarse de que la conversión sea correcta cuando la unidad de origen es la base
      if (
        (fromUnit === 'GRAMOS' || fromUnit === 'MILILITROS') &&
        toUnit !== 'GRAMOS' &&
        toUnit !== 'MILILITROS'
      ) {
        finalAmount = amount / conversionFactors[toUnit];
      }

      return Number(finalAmount.toFixed(3));
    },
    []
  );

  const getUnitType = useCallback((unit: UnitOfMeasure): 'mass' | 'volume' => {
    return unitTypeMap[unit];
  }, []);

  return {
    convert,
    getUnitType,
  };
};
