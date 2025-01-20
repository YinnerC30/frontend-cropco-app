import { LogicDeleteRecordProps } from "@/modules/core/interfaces/general/LogicDeleteRecordProps";
import { ObjectWithId } from "@/modules/core/interfaces/general/ObjectWithId";

export interface ConsumptionDetails extends LogicDeleteRecordProps {
  id?: string;
  supply: ObjectWithId;
  crop: ObjectWithId;
  amount: number;
}
