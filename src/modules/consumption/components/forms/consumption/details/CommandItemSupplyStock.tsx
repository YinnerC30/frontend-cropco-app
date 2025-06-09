import { cn } from '@/lib/utils';
import { FormatNumber } from '@/modules/core/helpers';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
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
  const coreUnit = item.unit_of_measure as UnitOfMeasure;

  let result: string = '';

  const { convert } = useUnitConverter();

  try {
    const convertionValue = convert(item.amount, coreUnit, converTo);
    result = `${convertionValue} ${UnitSymbols[converTo]}`;
  } catch (error) {
    result = `${FormatNumber(item?.['amount'])}  ${UnitSymbols[coreUnit]}`;
  }

  return (
    <>
      <div className="flex justify-between w-full ">
        <span>{item?.['name']}</span>
        <span className="font-bold">{result}</span>
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
