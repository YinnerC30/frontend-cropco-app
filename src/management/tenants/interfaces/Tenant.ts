export interface Tenant {
  company_name: string;
  email: string;
  subdomain: string;
  cell_phone_number: string;
  id?: string;
  is_active: boolean;
  is_created_db: boolean;
  databases: any[];
}
