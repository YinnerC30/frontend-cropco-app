import { LogicDeleteRecordProps } from '@/modules/core/interfaces/general/LogicDeleteRecordProps';
import { Work } from '@/modules/work/interfaces/Work';

export interface WorkDetailEmployee extends LogicDeleteRecordProps {
  id: string;
  value_pay: number;
  work: Work;
  employee: { id: string; full_name: string };
  payment_is_pending?: boolean;
}
