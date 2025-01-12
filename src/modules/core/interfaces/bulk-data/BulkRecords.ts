import { ObjectWithId } from '../generall/ObjectWithId';

export interface BulkRecords {
  [key: string]: ObjectWithId[];
}
