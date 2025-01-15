import { LogicDeleteRecordProps } from "@/modules/core/interfaces/general/LogicDeleteRecordProps";
import { ObjectWithId } from "@/modules/core/interfaces/general/ObjectWithId";

export interface SaleDetail extends LogicDeleteRecordProps {
  id?: string;
  quantity: number;
  total: number;
  sale?: ObjectWithId;
  crop: ObjectWithId;
  client: ObjectWithId;
  is_receivable: boolean;
}
