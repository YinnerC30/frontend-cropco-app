import { Badge } from '@/components';
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

  const grupUnit = unitTypeMap[selectedSupply.unit_of_measure as UnitOfMeasure];
  let coreUnit: UnitOfMeasure = MassUnitOfMeasure.GRAMOS;

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

  try {
    convertedAmount = convert(selectedSupply.amount, coreUnit, convertTo);
  } catch (error) {
    console.error('Hubo un error al convertir', error);
  }

  return (
    <Badge className={`${!field.value ? 'hidden' : ''}`} variant={'cyan'}>
      {`Disponibles: ${convertedAmount} ${UnitSymbols[convertTo]}`}
    </Badge>
  );
};
