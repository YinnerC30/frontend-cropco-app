import { ObjectWithId } from '../General/ObjectWithId';

export interface BulkRecords {
  [key: string]: ObjectWithId[];
}
