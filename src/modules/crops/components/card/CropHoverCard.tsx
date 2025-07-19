import { Button } from '@/components';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { FormatDate, FormatNumber } from '@/modules/core/helpers';
import { CalendarCheck, CalendarX } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { Crop } from '../../interfaces/Crop';
import { MODULE_CROPS_PATHS } from '../../routes/pathRoutes';

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
  } = crop;
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant={'link'} className="w-auto h-auto p-0">
          {props.children}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <Link
              to={MODULE_CROPS_PATHS.ViewOne + id}
              className="text-sm font-semibold capitalize hover:underline underline-offset-2 text-muted-foreground text-ellipsis text-wrap"
              target="_blank"
            >
              {name}
            </Link>
            <p className="text-xs text-muted-foreground">
              N° Hectareas: {FormatNumber(number_hectares)}
            </p>
            <p className="text-xs text-muted-foreground">
              N° Unidades: {FormatNumber(units)}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center text-xs text-muted-foreground">
                <span className="w-4 h-4 mr-1 text-green-600">
                  <CalendarCheck className="w-4 h-4" />
                </span>
                Creado:{' '}
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
                Terminación:{' '}
                {date_of_termination
                  ? FormatDate({ date: date_of_termination })
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
