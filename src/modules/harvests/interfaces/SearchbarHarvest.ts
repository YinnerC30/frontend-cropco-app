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
  filter_by_amount: boolean;
  type_filter_amount: TypeFilterNumber | string | undefined;
  amount: number | undefined;
  filter_by_value_pay: boolean;
  type_filter_value_pay: TypeFilterNumber | string | undefined;
  value_pay: number | undefined;
}
