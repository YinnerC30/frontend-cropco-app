export interface Tenant {
  company_name: string;
  email: string;
  subdomain: string;
  cell_phone_number: string;
  id?: string;
  is_active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  databases?: any[];
}
