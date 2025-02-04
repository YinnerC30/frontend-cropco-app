export interface SaleTotalInYearData {
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
  data: DataMonth[];
}

export interface DataMonth {
  month: string;
  monthNumber: number;
  total: number;
  quantity: number;
}
