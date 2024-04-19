export interface Crop {
  id?: string | undefined;
  name: string;
  description: string;
  units: number;
  location: string;
  date_of_creation: Date;
  date_of_termination?: Date;
}
