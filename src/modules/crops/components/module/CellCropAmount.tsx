import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { Row } from '@tanstack/react-table';
import { useCropsModuleContext } from '../../hooks';
import { Crop } from '../../interfaces/Crop';

export const CellCropAmount = ({ row }: { row: Row<Crop> }) => {
  const { unitTypeToShowAmount } = useCropsModuleContext();

  const rawValue = row.original.harvests_stock?.amount ?? 0;

  const { convert } = useUnitConverter();

  const convertedValue = convert(
    rawValue,
    'GRAMOS' as any,
    unitTypeToShowAmount as any
  );

  return convertedValue;
};
