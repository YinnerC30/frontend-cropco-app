import { WorkDetail } from "./WorkDetail";
import { ObjectWithId } from '@/modules/core/interfaces/ObjectWithId';

export interface Work {
  id?: string;
  crop: ObjectWithId;
  date: string | any;
  description: string | undefined;
  total: number;
  details: WorkDetail[];
}
