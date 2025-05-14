interface MonthData {
  month_name: string;
  month_number: number;
  quantity_works: number;
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

interface WorkData {
  growth: GrowthData;
  years: YearData[];
}

interface OrganizedData {
  month_name: string;
  month_number: number;
  current_value_pay: number;
  previous_value_pay: number;
}

export function organizeWorkData(harvestData: WorkData): OrganizedData[] {
  const { years } = harvestData;

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
        quantity_works: 0,
      };

      return {
        month_name: currentMonthData.month_name,
        month_number: currentMonthData.month_number,
        current_value_pay: currentMonthData.quantity_works,
        previous_value_pay: previousMonthData.quantity_works,
      };
    }
  );

  return organizedData;
}
