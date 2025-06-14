import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';

interface MonthData {
  month_name: string;
  month_number: number;
  amount: number;
  value_pay: number;
}

interface YearData {
  year: number;
  data: MonthData[];
}

interface GrowthData {
  growth_value: number;
  difference: number;
  is_increment: boolean;
}

export interface HarvestData {
  growth: GrowthData;
  years: YearData[];
  unit_of_measure: MassUnitOfMeasure;
}

interface OrganizedData {
  month_name: string;
  month_number: number;
  current_amount: number;
  previous_amount: number;
}

export function useOrganizeHarvestData(harvestData: HarvestData): {
  organizedData: OrganizedData[];
} {
  const { years, unit_of_measure } = harvestData;

  const { convert } = useUnitConverter();

  // Verificamos que hay datos para al menos dos años
  if (years.length < 2) {
    throw new Error(
      'Se requieren datos de al menos dos años para organizar la información.'
    );
  }

  const [currentYearData, previousYearData] = years;

  // Creamos un mapa para acceder rápidamente a los datos del año anterior
  const previousYearMap = new Map<number, MonthData>();
  previousYearData.data.forEach((monthData) => {
    previousYearMap.set(monthData.month_number, monthData);
  });

  // Organizamos los datos en la estructura deseada
  const organizedData: OrganizedData[] = currentYearData.data.map(
    (currentMonthData) => {
      const previousMonthData = previousYearMap.get(
        currentMonthData.month_number
      ) || {
        amount: 0,
        value_pay: 0,
      };

      const convertedPreviousMonthAmount = convert(
        previousMonthData.amount,
        MassUnitOfMeasure.GRAMOS,
        unit_of_measure
      );

      const convertedCurretMonthAmount = convert(
        currentMonthData.amount,
        MassUnitOfMeasure.GRAMOS,
        unit_of_measure
      );

      return {
        month_name: currentMonthData.month_name,
        month_number: currentMonthData.month_number,
        current_amount: convertedCurretMonthAmount,
        previous_amount: convertedPreviousMonthAmount,
      };
    }
  );

  return { organizedData };
}
