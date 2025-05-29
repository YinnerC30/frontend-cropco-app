import { LogicDeleteRecordProps } from '@/modules/core/interfaces/general/LogicDeleteRecordProps';
import { HarvestDetail } from '@/modules/harvests/interfaces';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';

export interface Employee extends LogicDeleteRecordProps {
  id?: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  email: string;
  cell_phone_number: string;
  address: string;
  harvests_detail?: HarvestDetail[];
  works_detail?: WorkDetail[];
}
