import { Badge } from '@/components';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import {
  MassUnitOfMeasure,
  UnitSymbols,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { ControllerRenderProps } from 'react-hook-form';
import { CropStock } from '../FormSaleContext';

interface Props {
  field: ControllerRenderProps<any, any>;
  cropsStock: CropStock[];
  convertTo: MassUnitOfMeasure;
}

export const BadgeCropStock = ({
  field,
  cropsStock = [],
  convertTo,
}: Props) => {
  const { convert } = useUnitConverter();

  const selectedCrop = cropsStock.find(
    (item: CropStock) => item.id === field.value
  );

  let convertedAmount: number = -1;

  try {
    convertedAmount = convert(
      selectedCrop?.stock!,
      MassUnitOfMeasure.GRAMOS,
      convertTo
    );
  } catch (error) {
    console.error('Hubo un error al convertir', error);
  }

  return (
    <Badge className={`${!field.value ? 'hidden' : 'ml-10'}`} variant={'cyan'}>
      {`Disponibles: ${convertedAmount} ${UnitSymbols[convertTo]}`}
    </Badge>
  );
};
