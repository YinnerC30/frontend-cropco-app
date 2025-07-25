import { ConsumptionDetails } from "@/modules/consumption/interfaces";
import { LogicDeleteRecordProps } from "@/modules/core/interfaces/general/LogicDeleteRecordProps";
import { Harvest, HarvestProcessed } from "@/modules/harvests/interfaces";
import { SaleDetail } from "@/modules/sales/interfaces";
import { Work } from "@/modules/work/interfaces/Work";

export interface Crop extends LogicDeleteRecordProps {
  id?: string | undefined;
  name: string;
  description: string;
  units: number;
  number_hectares: number;
  location: string;
  date_of_creation: string;
  date_of_termination: string;
  harvests?: Harvest[];
  works?: Work[];
  sales_detail?: SaleDetail[];
  harvests_processed?: HarvestProcessed[];
  supplies_consumption_details?: ConsumptionDetails[],
  harvests_stock?: {
    id: string;
    amount: number
  }
}
