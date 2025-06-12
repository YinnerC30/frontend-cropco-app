import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { Row } from '@tanstack/react-table';
import { useSaleModuleContext } from '../../hooks/context/useSaleModuleContext';
import { Sale } from '../../interfaces';
import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';

export const CellSaleAmount = ({ row }: { row: Row<Sale> }) => {
  const { unitTypeToShowAmount } = useSaleModuleContext();

  const rawValue = row.original.amount ?? 0;

  const { convert } = useUnitConverter();

  const convertedValue = convert(
    rawValue,
    MassUnitOfMeasure.GRAMOS,
    unitTypeToShowAmount
  );

  return convertedValue;
};
