import { cn } from '@/lib/utils';
import { FormatNumber } from '@/modules/core/helpers';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import {
  MassUnitOfMeasure,
  UnitSymbols
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { CheckIcon } from '@radix-ui/react-icons';
import { ControllerRenderProps } from 'react-hook-form';
import { CropStock } from '../FormSaleContext';

interface Props {
  field: ControllerRenderProps<any, any>;
  item: CropStock;
  converTo: MassUnitOfMeasure;
}

export const CommandItemCropStock = ({ field, item, converTo }: Props) => {
  const coreUnit = MassUnitOfMeasure.GRAMOS;

  let result: string = '';

  const { convert } = useUnitConverter();

  try {
    const convertionValue = convert(item.stock, coreUnit, converTo);
    result = `${convertionValue} ${UnitSymbols[converTo]}`;
  } catch (error) {
    result = `${FormatNumber(item?.['stock'])}  ${UnitSymbols[coreUnit]}`;
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
