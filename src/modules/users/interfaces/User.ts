import { Module } from "@/modules/core/interfaces";

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  cell_phone_number: string;
  id: string;
  is_active: boolean;
  modules: Module[];
  token: string;
  actions?: any[];
  passwords?: any;
  roles?: string[];
}
