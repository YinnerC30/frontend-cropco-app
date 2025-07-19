import { Row } from '@tanstack/react-table';
import { useSuppliesModuleContext } from '../../hooks';
import { Supply } from '../../interfaces/Supply';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import {
  MassUnitOfMeasure,
  UnitOfMeasure,
  VolumeUnitOfMeasure,
  LengthUnitOfMeasure,
} from '../../interfaces/UnitOfMeasure';
import { FormatNumber } from '@/modules/core/helpers';

export const CellSupplyAmount = ({ row }: { row: Row<Supply> }) => {
  const { getUnitType } = useUnitConverter();
  const { 
    unitMassTypeToShowAmount, 
    unitVolumeTypeToShowAmount,
    unitLengthTypeToShowAmount 
  } = useSuppliesModuleContext();

  const rawValue = row.original.stock?.amount ?? 0;

  const { convert } = useUnitConverter();

  const group = getUnitType(row.original.unit_of_measure as UnitOfMeasure);

  let convertedValue = 0;
  if (group === 'mass') {
    convertedValue = convert(
      rawValue,
      MassUnitOfMeasure.GRAMOS,
      unitMassTypeToShowAmount
    );
  } else if (group === 'volume') {
    convertedValue = convert(
      rawValue,
      VolumeUnitOfMeasure.MILILITROS,
      unitVolumeTypeToShowAmount
    );
  } else if (group === 'length') {
    convertedValue = convert(
      rawValue,
      LengthUnitOfMeasure.MILIMETROS,
      unitLengthTypeToShowAmount
    );
  }

  return FormatNumber(convertedValue);
};
