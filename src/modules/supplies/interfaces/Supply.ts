import { ShoppingDetail } from '@/modules/shopping/interfaces';
import { UnitOfMeasure } from './UnitOfMeasure';
import { ConsumptionDetails } from '@/modules/consumption/interfaces';
import { LogicDeleteRecordProps } from '@/modules/core/interfaces/general/LogicDeleteRecordProps';

export interface Supply extends LogicDeleteRecordProps {
  id?: string;
  name: string;
  brand: string;
  unit_of_measure: UnitOfMeasure | string | undefined;
  observation: string;
  stock?: {
    id: string;
    amount: number;
  };
  shopping_details?: ShoppingDetail[];
  consumption_details?: ConsumptionDetails[];
}
