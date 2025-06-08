export interface Crop {
  id?: string | undefined;
  name: string;
  description: string;
  units: number;
  location: string;
  date_of_creation: string;
  date_of_termination: string;
  harvests_stock?: {
    id: string;
    amount: number
  }
}
