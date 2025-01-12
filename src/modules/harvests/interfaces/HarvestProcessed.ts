import { ObjectWithId } from '@/modules/core/interfaces/generall/ObjectWithId';

export interface HarvestProcessed {
  crop?: ObjectWithId;
  date: Date | undefined;
  harvest?: ObjectWithId;
  id?: string;
  total: number;
}
