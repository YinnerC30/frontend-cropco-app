export interface CreateCrop {
  name: string;
  description: string;
  units: number;
  location: string;
  date_of_creation: Date;
  date_of_termination?: Date | undefined;
}

export interface GetCrop extends CreateCrop {
  id: string;
}
