import { Badge } from '@/components/ui/badge';
import { useSuppliesModuleContext } from '../../hooks';
import { Supply } from '../../interfaces/Supply';
import { Row } from '@tanstack/react-table';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { UnitOfMeasure } from '../../interfaces/UnitOfMeasure';

export const BadgeColumnsUnitOfMeasure = ({ row }: { row: Row<Supply> }) => {
  const { unitMassTypeToShowAmount, unitVolumeTypeToShowAmount } =
    useSuppliesModuleContext();

  const { getUnitType } = useUnitConverter();

  const group = getUnitType(row.original.unit_of_measure as UnitOfMeasure);

  return (
    <Badge variant={group === 'mass' ? 'lime' : 'cyan'}>
      {group === 'mass' ? unitMassTypeToShowAmount : unitVolumeTypeToShowAmount}
    </Badge>
  );
};
