export interface HarvestTotalInYearData {
  growth: Growth;
  years: Year[];
}

export interface Growth {
  growth_value: number;
  diference: number;
  status: 'increment' | 'decrement' | 'stable' | 'no-valid';
  total_previous: number;
  total_current: number;
}

export interface Year {
  year: number;
  data: DataMonth[];
}

export interface DataMonth {
  month_name: string;
  month_number: number;
  total: number;
  value_pay: number;
}
