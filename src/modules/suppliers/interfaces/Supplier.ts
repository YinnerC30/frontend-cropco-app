import { LogicDeleteRecordProps } from '@/modules/core/interfaces/general/LogicDeleteRecordProps';
import { ShoppingDetail } from '@/modules/shopping/interfaces';

export interface Supplier extends LogicDeleteRecordProps {
  id?: string;
  address: string;
  cell_phone_number: string;
  company_name?: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  supplies_shopping_details?: ShoppingDetail[];
}
