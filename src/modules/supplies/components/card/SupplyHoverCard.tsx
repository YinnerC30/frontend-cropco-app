import { Button } from '@/components';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { Supply } from '../../interfaces/Supply';
import { MODULE_SUPPLIES_PATHS } from '../../routes/pathRoutes';


interface Props extends PropsWithChildren {
  data: Supply;
}

export const SupplyHoverCard: React.FC<Props> = (props: Props) => {
  const supply: Supply = props.data;
  const {
    name,
    id,
    brand,
    unit_of_measure,
  } = supply;
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
              to={MODULE_SUPPLIES_PATHS.ViewOne + id}
              className="text-sm font-semibold capitalize hover:underline underline-offset-2 text-muted-foreground text-ellipsis text-wrap"
              target="_blank"
            >
              {name}
            </Link>
            <p className="text-xs text-muted-foreground">
              Marca: { brand }
            </p>
            <p className="text-xs text-muted-foreground">
              Unidad de medida: { unit_of_measure }
            </p>
            {/* <div className="flex items-center gap-2 mt-1">
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
            </div> */}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
