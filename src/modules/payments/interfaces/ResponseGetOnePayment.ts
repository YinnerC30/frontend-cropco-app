export interface PaymentRecord {
  id: string;
  date: string;
  method_of_payment: string;
  value_pay: number;
  employee: Employee;
  payments_harvest: PaymentsHarvest[];
  payments_work: PaymentsWork[];
}

export interface Employee {
  first_name: string;
  last_name: string;
  email: string;
  cell_phone_number: string;
  id: string;
  address: string;
}

export interface PaymentsHarvest {
  id: string;
  harvests_detail: HarvestsDetail;
}

export interface HarvestsDetail {
  id: string;
  amount: number;
  value_pay: number;
  payment_is_pending: boolean;
  harvest: Harvest;
}

export interface Harvest {
  id: string;
  date: Date;
  amount: number;
  value_pay: number;
  observation: string;
}

export interface PaymentsWork {
  id: string;
  works_detail: WorksDetail;
}

export interface WorksDetail {
  id: string;
  value_pay: number;
  payment_is_pending: boolean;
  work: Work;
}

export interface Work {
  id: string;
  date: Date;
  description: string;
  value_pay: number;
}
