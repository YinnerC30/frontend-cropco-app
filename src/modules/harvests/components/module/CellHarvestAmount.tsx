import { Row } from '@tanstack/react-table';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';
import { Harvest } from '../../interfaces';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';

export const CellHarvestAmount = ({ row }: { row: Row<Harvest> }) => {
  const { unitTypeToShowAmount } = useHarvestModuleContext();

  const rawValue = row.original.amount ?? 0;

  const { convert } = useUnitConverter();

  const convertedValue = convert(
    rawValue,
    'GRAMOS' as any,
    unitTypeToShowAmount as any
  );

  return convertedValue;
};
