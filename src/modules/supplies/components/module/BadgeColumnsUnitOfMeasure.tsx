import { Badge } from '@/components/ui/badge';
import { useSuppliesModuleContext } from '../../hooks';
import { Supply } from '../../interfaces/Supply';
import { Row } from '@tanstack/react-table';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { UnitOfMeasure } from '../../interfaces/UnitOfMeasure';

export const BadgeColumnsUnitOfMeasure = ({ row }: { row: Row<Supply> }) => {
  const {
    unitMassTypeToShowAmount,
    unitVolumeTypeToShowAmount,
    unitLengthTypeToShowAmount,
  } = useSuppliesModuleContext();

  const { getUnitType } = useUnitConverter();

  const group = getUnitType(row.original.unit_of_measure as UnitOfMeasure);

  const getBadgeVariant = (unitType: string) => {
    switch (unitType) {
      case 'mass':
        return 'zinc';
      case 'volume':
        return 'blue';
      case 'length':
        return 'success';
      default:
        return 'zinc';
    }
  };

  const getUnitToShow = (unitType: string) => {
    switch (unitType) {
      case 'mass':
        return unitMassTypeToShowAmount;
      case 'volume':
        return unitVolumeTypeToShowAmount;
      case 'length':
        return unitLengthTypeToShowAmount;
      default:
        return unitMassTypeToShowAmount;
    }
  };

  return <Badge variant={getBadgeVariant(group)}>{getUnitToShow(group)}</Badge>;
};
