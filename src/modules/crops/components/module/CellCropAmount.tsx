import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { Row } from '@tanstack/react-table';
import { useCropsModuleContext } from '../../hooks';
import { Crop } from '../../interfaces/Crop';
import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';

export const CellCropAmount = ({ row }: { row: Row<Crop> }) => {
  const { unitTypeToShowAmount } = useCropsModuleContext();

  const rawValue = row.original.harvests_stock?.amount ?? 0;

  const { convert } = useUnitConverter();

  const convertedValue = convert(
    rawValue,
    MassUnitOfMeasure.GRAMOS,
    unitTypeToShowAmount
  );

  return convertedValue;
};
