import { FormatNumber } from '@/modules/core/helpers';
import {
  unitTypeMap,
  useUnitConverter,
} from '@/modules/core/hooks/useUnitConverter';
import { Row } from '@tanstack/react-table';
import { useSuppliesModuleContext } from '../../hooks';
import { Supply } from '../../interfaces/Supply';
import {
  LengthUnitOfMeasure,
  MassUnitOfMeasure,
  UnitOfMeasure,
  VolumeUnitOfMeasure,
} from '../../interfaces/UnitOfMeasure';

export const CellSupplyAmount = ({ row }: { row: Row<Supply> }) => {
  const {
    unitMassTypeToShowAmount,
    unitVolumeTypeToShowAmount,
    unitLengthTypeToShowAmount,
  } = useSuppliesModuleContext();

  const rawValue = row.original.stock?.amount ?? 0;

  const { convert } = useUnitConverter();

  const group = unitTypeMap[row.original.unit_of_measure as UnitOfMeasure];

  let convertedValue = 0;
  if (group === 'MASS') {
    convertedValue = convert(
      rawValue,
      MassUnitOfMeasure.GRAMOS,
      unitMassTypeToShowAmount
    );
  } else if (group === 'VOLUME') {
    convertedValue = convert(
      rawValue,
      VolumeUnitOfMeasure.MILILITROS,
      unitVolumeTypeToShowAmount
    );
  } else if (group === 'LENGTH') {
    convertedValue = convert(
      rawValue,
      LengthUnitOfMeasure.MILIMETROS,
      unitLengthTypeToShowAmount
    );
  }

  return <span data-testid="span-amount">{FormatNumber(convertedValue)}</span>;
};
