export interface HarvestTotalInYearData {
  growth: Growth;
  years: Year[];
}

export interface Growth {
  growth_value: number;
  difference: number;
  status: 'increment' | 'decrement' | 'stable' | 'no-valid';
  amount_previous: number;
  amount_current: number;
}

export interface Year {
  year: number;
  data: DataMonth[];
}

export interface DataMonth {
  month_name: string;
  month_number: number;
  amount: number;
  value_pay: number;
}
