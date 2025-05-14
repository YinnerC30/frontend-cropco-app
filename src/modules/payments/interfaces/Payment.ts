import { ObjectWithId } from "@/modules/core/interfaces/general/ObjectWithId";
import { PaymentHarvest } from "./PaymentHarvest";
import { PaymentWork } from "./PaymentWork";
import { MethodOfPayment } from "./MethodOfPayment";

export interface Payment {
  id?: string;
  date: string | any;
  employee: ObjectWithId;
  method_of_payment: MethodOfPayment;
  value_pay: number;
  categories: {
    harvests: PaymentHarvest[];
    works: PaymentWork[];
  };
}
