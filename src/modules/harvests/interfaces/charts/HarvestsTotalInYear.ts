export interface HarvestTotalInYearData {
  growth: Growth;
  years: Year[];
}

export interface Growth {
  growth_value: number;
  diference: number;
  is_increment: boolean;
  total_previous: number;
  total_current: number;
}

export interface Year {
  year: number;
  data: Datum[];
}

export interface Datum {
  month: string;
  monthNumber: number;
  total: number;
  value_pay: number;
}
