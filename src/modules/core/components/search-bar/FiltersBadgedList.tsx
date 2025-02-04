import { X } from 'lucide-react';
import { FilterSearchBar } from '../../interfaces/queries/FilterSearchBar';
import { ToolTipTemplate } from '../shared/ToolTipTemplate';
import { Badge, Button, Label } from '@/components';
import { memo } from 'react';

interface Props {
  filters: FilterSearchBar[];
  handleRemove: (filter: FilterSearchBar) => void;
}

const FiltersBadgedListComponent: React.FC<Props> = ({
  filters,
  handleRemove,
}) => {
  if (!(filters.length > 0)) {
    return null;
  }
  return (
    <div className="w-2/4 mt-2">
      <Label className="block">Filtros aplicados:</Label>
      <div className="flex flex-wrap gap-2 my-4">
        {filters.map((filter, index) => (
          <Badge key={index} variant="secondary">
            {filter.label}
            <ToolTipTemplate content="Eliminar filtro">
              <Button
                className="ml-3"
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(filter)}
              >
                <X className="w-3 h-3" />
              </Button>
            </ToolTipTemplate>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export const FiltersBadgedList = memo(
  FiltersBadgedListComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.filters === nextProps.filters &&
      prevProps.handleRemove === nextProps.handleRemove
    );
  }
);
