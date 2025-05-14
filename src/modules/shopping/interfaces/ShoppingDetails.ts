import { LogicDeleteRecordProps } from "@/modules/core/interfaces/general/LogicDeleteRecordProps";
import { ObjectWithId } from "@/modules/core/interfaces/general/ObjectWithId";

export interface ShoppingDetail extends LogicDeleteRecordProps {
  id?: string;
  supply: ObjectWithId;
  supplier: ObjectWithId;
  amount: number;
  value_pay: number;
}
