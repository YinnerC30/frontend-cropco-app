import { Employee } from "@/modules/employees/interfaces/Employee";

export interface TableHarvest {
    crop: string;
    date: Date;
    id?: string;
    amount: number;
    value_pay: number;
    employees: Employee[]
  }