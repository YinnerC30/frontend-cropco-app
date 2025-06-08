import { CapitalizeFirstWord } from '@/auth';
import { cn } from '@/lib/utils';
import { FormatNumber } from '@/modules/core/helpers';
import { SupplyStock } from '@/modules/supplies/interfaces/SupplyStock';
import {
  UnitOfMeasure,
  UnitSymbols,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { CheckIcon } from '@radix-ui/react-icons';
import { ControllerRenderProps } from 'react-hook-form';

interface Props {
  field: ControllerRenderProps<any, any>;
  item: SupplyStock;
  converTo: UnitOfMeasure;
}

export const CommandItemSupplyStock = ({ field, item, converTo }: Props) => {
  console.log(item);
  return (
    <>
      <div className="flex justify-between w-full ">
        <span>{item?.['name']}</span>
        <span className="font-bold">
          {FormatNumber(item?.['amount']) + ' ' + ` ${UnitSymbols[converTo]} `}
        </span>
      </div>
      <CheckIcon
        className={cn(
          'ml-auto h-4 w-4',
          item.id! === field?.value ? 'opacity-100' : 'opacity-0'
        )}
      />
    </>
  );
};
