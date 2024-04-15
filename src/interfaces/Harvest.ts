// Generated by https://quicktype.io

import { ObjectWithId } from './ObjectWithId';

export interface Harvest {
  crop: ObjectWithId;
  date: Date;
  details: HarvestDetail[];
  id?: string;
  observation?: string | undefined;
  total: number;
  value_pay: number;
}

export interface HarvestDetail {
  employee: ObjectWithId;
  id?: string;
  payments_harvest?: any[];
  total: number;
  value_pay: number;
}

export interface TableHarvest {
  crop: string;
  date: Date;
  id?: string;
  total: number;
  value_pay: number;
}

export interface HarvestProcessed {
  crop: ObjectWithId;
  date: Date;
  harvest: ObjectWithId;
  id?: string;
  total: number;
}
