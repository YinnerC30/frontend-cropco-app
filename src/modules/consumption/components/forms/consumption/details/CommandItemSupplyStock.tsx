import { cn } from '@/lib/utils';
import { FormatNumber } from '@/modules/core/helpers';
import {
  unitTypeMap,
  useUnitConverter,
} from '@/modules/core/hooks/useUnitConverter';
import { SupplyStock } from '@/modules/supplies/interfaces/SupplyStock';
import {
  LengthUnitOfMeasure,
  MassUnitOfMeasure,
  UnitOfMeasure,
  UnitSymbols,
  VolumeUnitOfMeasure,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { CheckIcon } from '@radix-ui/react-icons';
import { ControllerRenderProps } from 'react-hook-form';

interface Props {
  field: ControllerRenderProps<any, any>;
  item: SupplyStock;
  converTo: UnitOfMeasure;
}

export const CommandItemSupplyStock = ({ field, item, converTo }: Props) => {
  console.log(
    '🚀 ~ CommandItemSupplyStock ~ field, item, converTo:',
    field,
    item,
    converTo
  );
  const { convert } = useUnitConverter();

  const isInSameGroup =
    unitTypeMap[converTo] ===
    unitTypeMap[item.unit_of_measure as UnitOfMeasure];
  const alternativeConverTo = item.unit_of_measure as UnitOfMeasure;

  const grupUnit = unitTypeMap[item.unit_of_measure as UnitOfMeasure];
  let coreUnit: UnitOfMeasure = MassUnitOfMeasure.GRAMOS;

  const finalConverTo: UnitOfMeasure = isInSameGroup
    ? converTo
    : alternativeConverTo;

  switch (grupUnit) {
    case 'mass':
      coreUnit = MassUnitOfMeasure.GRAMOS;
      break;
    case 'volume':
      coreUnit = VolumeUnitOfMeasure.MILILITROS;
      break;
    case 'length':
      coreUnit = LengthUnitOfMeasure.MILIMETROS;
      break;

    default:
      break;
  }

  let result: string = '';

  try {
    const convertionValue = convert(item.amount, coreUnit, finalConverTo);
    result = `${convertionValue} ${UnitSymbols[finalConverTo]}`;
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
