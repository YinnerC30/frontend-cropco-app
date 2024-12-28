import { ObjectWithId } from '@/modules/core/interfaces/general/ObjectWithId';

export interface HarvestProcessed {
  crop?: ObjectWithId;
  date: Date | undefined;
  harvest?: ObjectWithId;
  id?: string;
  total: number;
}
