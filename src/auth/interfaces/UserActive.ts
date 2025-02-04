import { Module } from "@/modules/core/interfaces";

export interface UserActive {
  id: string;
  token: string;
  email: string;
  first_name: string;
  last_name: string;
  modules: Module[];
  isLogin: boolean;
}
