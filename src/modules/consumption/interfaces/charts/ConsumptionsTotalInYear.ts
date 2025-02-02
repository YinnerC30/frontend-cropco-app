export interface ConsumptionTotalInYearData {
  years: Year[];
}

export interface Year {
  year: number;
  data: DataMonth[];
}

export interface DataMonth {
  month_name: string;
  month_number: number;
  quantity_consumptions: number;
}
