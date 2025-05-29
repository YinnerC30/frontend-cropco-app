export interface Client {
  id?: string;
  first_name: string;
  last_name: string;
  full_name?:string
  email: string;
  cell_phone_number: string;
  address: string;
}
