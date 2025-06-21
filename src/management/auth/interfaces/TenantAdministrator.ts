export interface TenantAdministrator {
  first_name: string;
  last_name: string;
  email: string;
  cell_phone_number: string;
  id: string;
  password: string;
  role: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  token: string;
  is_login: boolean;
}
