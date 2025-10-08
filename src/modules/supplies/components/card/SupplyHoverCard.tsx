import { Badge, Button } from '@/components';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { Supply } from '../../interfaces/Supply';
import { MODULE_SUPPLIES_PATHS } from '../../routes/pathRoutes';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props extends PropsWithChildren {
  data: Supply;
}

export const SupplyHoverCard: React.FC<Props> = (props: Props) => {
  const supply: Supply = props.data;
  const { name, id, brand, unit_of_measure, deletedDate = null } = supply;
  const isDeletedSupply = deletedDate !== null;
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant={'ghost'}
          className={cn(
            'w-auto h-auto p-0 font-semibold',
            isDeletedSupply && 'opacity-75 cursor-not-allowed grayscale'
          )}
        >
          {props.children}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <Link
              to={MODULE_SUPPLIES_PATHS.ViewOne + id}
              className="text-sm font-semibold capitalize hover:underline underline-offset-2 text-muted-foreground text-ellipsis text-wrap"
              target="_blank"
              tabIndex={isDeletedSupply ? -1 : 0}
              aria-disabled={isDeletedSupply}
              onClick={isDeletedSupply ? (e) => e.preventDefault() : undefined}
              style={
                isDeletedSupply
                  ? { pointerEvents: 'none', opacity: 0.6 }
                  : undefined
              }
            >
              {name}
            </Link>
            <p className="text-xs text-muted-foreground">
              <span className="mr-2 font-semibold">Marca:</span>
              <span>{brand}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="mr-2 font-semibold">Unidad de medida:</span>
              <span>{unit_of_measure}</span>
            </p>
            {isDeletedSupply && (
              <div className="flex items-center justify-center py-2">
                <Badge variant={'red'}>
                  <span className="inline-block w-3 h-3 mr-2">
                    <svg className="hidden" />
                    <X className="w-3 h-3" />
                  </span>
                  <span>Registro eliminado</span>
                </Badge>
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
