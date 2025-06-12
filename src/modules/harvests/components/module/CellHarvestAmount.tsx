import { Row } from '@tanstack/react-table';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';
import { Harvest } from '../../interfaces';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import {
  MassUnitOfMeasure,
  UnitSymbols,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { Badge } from '@/components';

export const CellHarvestAmount = ({ row }: { row: Row<Harvest> }) => {
  const { unitTypeToShowAmount } = useHarvestModuleContext();

  const rawValue = row.original.amount ?? 0;

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
