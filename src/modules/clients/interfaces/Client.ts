import { LogicDeleteRecordProps } from "@/modules/core/interfaces/general/LogicDeleteRecordProps";
import { SaleDetail } from "@/modules/sales/interfaces";

export interface Client extends LogicDeleteRecordProps {
  id?: string;
  first_name: string;
  last_name: string;
  full_name?:string
  email: string;
  cell_phone_number: string;
  address: string;
  sales_detail?: SaleDetail[];
}
