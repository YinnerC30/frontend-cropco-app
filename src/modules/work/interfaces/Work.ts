import { WorkDetail } from "./WorkDetail";
import { ObjectWithId } from '@/modules/core/interfaces/general/ObjectWithId';

export interface Work {
  id?: string;
  crop: ObjectWithId;
  date: string;
  description: string | undefined;
  total: number;
  details: WorkDetail[];
}
