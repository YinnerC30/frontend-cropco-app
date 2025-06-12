import { Badge } from '@/components';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import {
  MassUnitOfMeasure,
  UnitSymbols,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { Row } from '@tanstack/react-table';
import { useSaleModuleContext } from '../../hooks/context/useSaleModuleContext';
import { Sale } from '../../interfaces';

export const CellSaleAmount = ({ row }: { row: Row<Sale> }) => {
  const { unitTypeToShowAmount } = useSaleModuleContext();

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
