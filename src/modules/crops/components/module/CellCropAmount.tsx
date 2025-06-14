import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { Row } from '@tanstack/react-table';
import { useCropsModuleContext } from '../../hooks';
import { Crop } from '../../interfaces/Crop';
import { MassUnitOfMeasure, UnitSymbols } from '@/modules/supplies/interfaces/UnitOfMeasure';
import { Badge } from '@/components';

export const CellCropAmount = ({ row }: { row: Row<Crop> }) => {
  const { unitTypeToShowAmount } = useCropsModuleContext();

  const rawValue = row.original.harvests_stock?.amount ?? 0;

  const { convert } = useUnitConverter();

  const convertedValue = convert(
    rawValue,
    MassUnitOfMeasure.GRAMOS,
    unitTypeToShowAmount
  );

  const symbolToShow = UnitSymbols[unitTypeToShowAmount];

  return (
    <div className="flex items-center gap-2">
      <span>{convertedValue}</span>
      <Badge>{symbolToShow}</Badge>
    </div>
  );
};
