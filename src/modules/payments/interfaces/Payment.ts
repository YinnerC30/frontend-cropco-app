import { ObjectWithId } from "@/modules/core/interfaces/General/ObjectWithId";
import { PaymentHarvest } from "./PaymentHarvest";
import { PaymentWork } from "./PaymentWork";
import { MethodOfPayment } from "./MethodOfPayment";

export interface Payment {
  id?: string;
  date: string | any;
  employee: ObjectWithId;
  method_of_payment: MethodOfPayment;
  total: number;
  categories: {
    harvests: PaymentHarvest[];
    works: PaymentWork[];
  };
}
