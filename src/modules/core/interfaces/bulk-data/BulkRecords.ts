import { ObjectWithId } from '../general/ObjectWithId';

export interface BulkRecords {
  [key: string]: ObjectWithId[];
}
