// Generated by https://quicktype.io

import { ObjectWithId } from './ObjectWithId';

export interface Harvest {
  id?: string;
  date: Date;
  crop: ObjectWithId;
  total: number;
  value_pay: number;
  observation?: string | undefined;
  details: HarvestDetail[];
}

export interface HarvestDetail {
  id?: string;
  employee: ObjectWithId;
  total: number;
  value_pay: number;
  payments_harvest?: any[];
}

export interface TableHarvest {
  id?: string;
  date: string;
  crop: string;
  total: number;
  value_pay: number;
}
