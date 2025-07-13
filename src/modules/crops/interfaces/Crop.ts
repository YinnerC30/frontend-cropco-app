import { Harvest } from "@/modules/harvests/interfaces";
import { Work } from "@/modules/work/interfaces/Work";

export interface Crop {
  id?: string | undefined;
  name: string;
  description: string;
  units: number;
  location: string;
  date_of_creation: string;
  date_of_termination: string;
  harvests?: Harvest[];
  works?: Work[];
  harvests_stock?: {
    id: string;
    amount: number
  }
}
