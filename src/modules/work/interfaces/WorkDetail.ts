import { LogicDeleteRecordProps } from "@/modules/core/interfaces/general/LogicDeleteRecordProps";
import { ObjectWithId } from "@/modules/core/interfaces/general/ObjectWithId";
import { Work } from "./Work";

export interface WorkDetail extends LogicDeleteRecordProps {
  id?: string;
  value_pay: number;
  work?: Work;
  employee: ObjectWithId;
  payment_is_pending?: boolean;
}
