import {
  TypeFilterDate,
  TypeFilterNumber,
  ObjectWithId,
} from '@/modules/core/interfaces';

export interface SearchbarHarvest {
  crop: ObjectWithId;
  filter_by_date: boolean;
  type_filter_date: TypeFilterDate | string | undefined;
  date: Date | undefined;
  filter_by_total: boolean;
  type_filter_total: TypeFilterNumber | string | undefined;
  total: number | undefined;
  filter_by_value_pay: boolean;
  type_filter_value_pay: TypeFilterNumber | string | undefined;
  value_pay: number | undefined;
}
