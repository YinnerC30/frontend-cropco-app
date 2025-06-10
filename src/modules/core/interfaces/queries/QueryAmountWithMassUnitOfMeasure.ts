import { MassUnitOfMeasure } from "@/modules/supplies/interfaces/UnitOfMeasure";

export interface QueryAmountWithMassUnitOfMeasureProps {
    filter_by_amount?: boolean;
    type_filter_amount?: string;
    type_unit_of_measure?: MassUnitOfMeasure;
    amount?: number;
  }
  