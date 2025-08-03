import { Badge } from '@/components/ui/badge';
import { unitTypeMap } from '@/modules/core/hooks/useUnitConverter';
import { Row } from '@tanstack/react-table';
import { useSuppliesModuleContext } from '../../hooks';
import { Supply } from '../../interfaces/Supply';
import {
  CategoriesUnitOfMeasure,
  UnitOfMeasure,
} from '../../interfaces/UnitOfMeasure';
import { getBadgeColor } from '../../utils/getBadgeColor';

export const BadgeColumnsUnitOfMeasure = ({ row }: { row: Row<Supply> }) => {
  const {
    unitMassTypeToShowAmount,
    unitVolumeTypeToShowAmount,
    unitLengthTypeToShowAmount,
  } = useSuppliesModuleContext();

  const group = unitTypeMap[row.original.unit_of_measure as UnitOfMeasure];

  const badgeVariant = getBadgeColor(group);

  const getUnitToShow = (unitType: CategoriesUnitOfMeasure) => {
    switch (unitType) {
      case 'MASS':
        return unitMassTypeToShowAmount;
      case 'VOLUME':
        return unitVolumeTypeToShowAmount;
      case 'LENGTH':
        return unitLengthTypeToShowAmount;
      default:
        return unitMassTypeToShowAmount;
    }
  };

  return <Badge variant={badgeVariant as any}>{getUnitToShow(group)}</Badge>;
};
