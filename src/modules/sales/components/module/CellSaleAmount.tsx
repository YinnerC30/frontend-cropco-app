import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { Row } from '@tanstack/react-table';
import { useSaleModuleContext } from '../../hooks/context/useSaleModuleContext';
import { Sale } from '../../interfaces';

export const CellSaleAmount = ({ row }: { row: Row<Sale> }) => {
  const { unitTypeToShowAmount } = useSaleModuleContext();

  const rawValue = row.original.amount ?? 0;

  const { convert } = useUnitConverter();

  const convertedValue = convert(
    rawValue,
    'GRAMOS' as any,
    unitTypeToShowAmount as any
  );

  return convertedValue;
};
