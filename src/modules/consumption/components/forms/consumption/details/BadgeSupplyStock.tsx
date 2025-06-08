import { Badge } from '@/components';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { SupplyStock } from '@/modules/supplies/interfaces/SupplyStock';
import {
  UnitOfMeasure,
  UnitSymbols,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { ControllerRenderProps } from 'react-hook-form';

interface Props {
  field: ControllerRenderProps<any, any>;
  suppliesStock: SupplyStock[];
  convertTo: UnitOfMeasure;
}

export const BadgeSupplyStock = ({
  field,
  suppliesStock = [],
  //   initialUnitType,
  convertTo,
}: Props) => {
  const { convert } = useUnitConverter();

  const selectedSupply = suppliesStock.find(
    (item: SupplyStock) => item.id === field.value
  );

  if (!selectedSupply || !selectedSupply.unit_of_measure) {
    return null;
  }
  let convertedAmount: number = -1;

  try {
    convertedAmount = convert(
      selectedSupply.amount,
      selectedSupply.unit_of_measure as UnitOfMeasure,
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
