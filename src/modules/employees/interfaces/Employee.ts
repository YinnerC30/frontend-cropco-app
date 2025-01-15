import { HarvestDetail } from '@/modules/harvests/interfaces';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';

export interface Employee {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  cell_phone_number: string;
  address: string;
  harvests_detail?: HarvestDetail[];
  works_detail?: WorkDetail[];
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}
