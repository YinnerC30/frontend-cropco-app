export interface Administrator {
  first_name: string;
  last_name: string;
  email: string;
  cell_phone_number: string;
  id: string;
  is_active: boolean;
  token: string;
  passwords?: any;
  role?: string;
}
