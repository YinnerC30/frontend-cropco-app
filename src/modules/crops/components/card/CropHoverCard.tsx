import { Badge, Button } from '@/components';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { FormatDate, FormatNumber } from '@/modules/core/helpers';
import { CalendarCheck, CalendarX, X } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { Crop } from '../../interfaces/Crop';
import { MODULE_CROPS_PATHS } from '../../routes/pathRoutes';
import { cn } from '@/lib/utils';

interface Props extends PropsWithChildren {
  data: Crop;
}

export const CropHoverCard: React.FC<Props> = (props: Props) => {
  const crop: Crop = props.data;
  const {
    name,
    id,
    units,
    date_of_creation,
    date_of_termination,
    number_hectares,
    deletedDate = null,
  } = crop;

  const isCropDeleted = deletedDate !== null;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant={'ghost'}
          className={cn(
            'w-auto h-auto p-0 font-semibold',
            isCropDeleted && 'opacity-75 cursor-not-allowed grayscale'
          )}
        >
          {props.children}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-full">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <Link
              to={MODULE_CROPS_PATHS.ViewOne + id}
              className="text-sm font-semibold capitalize  hover:text-primary hover:underline underline-offset-2 text-muted-foreground text-ellipsis text-wrap"
              target="_blank"
              tabIndex={isCropDeleted ? -1 : 0}
              aria-disabled={isCropDeleted}
              onClick={isCropDeleted ? (e) => e.preventDefault() : undefined}
              style={
                isCropDeleted
                  ? { pointerEvents: 'none', opacity: 0.6 }
                  : undefined
              }
            >
              {name}
            </Link>
            <p className="text-xs text-muted-foreground">
              <span className="mr-2 font-semibold">N° Hectareas:</span>
              <span>{FormatNumber(number_hectares)}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="mr-2 font-semibold">N° Unidades:</span>
              <span>{FormatNumber(units)}</span>
            </p>

            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center text-xs text-muted-foreground">
                <span className="w-4 h-4 mr-1 text-green-600">
                  <CalendarCheck className="w-4 h-4" />
                </span>
                <span className="mr-2 font-semibold">Creado: </span>
                {date_of_creation
                  ? FormatDate({ date: date_of_creation })
                  : 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center text-xs text-muted-foreground">
                <span className="w-4 h-4 mr-1 text-red-600">
                  <CalendarX className="w-4 h-4" />
                </span>
                <span className="mr-2 font-semibold">Terminación: </span>
                {date_of_termination
                  ? FormatDate({ date: date_of_termination })
                  : 'N/A'}
              </span>
            </div>
            {isCropDeleted && (
              <div className="flex items-center justify-center w-full py-2">
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
