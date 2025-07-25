import { Badge, Button } from '@/components';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { Client } from '@/modules/clients/interfaces/Client';
import { Employee } from '@/modules/employees/interfaces/Employee';
import { Supplier } from '@/modules/suppliers/interfaces/Supplier';
import { X } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

interface Props extends PropsWithChildren {
  data: Employee | Client | Supplier;
  routeToNavigate: string;
}

export const PersonHoverCard: React.FC<Props> = (props: Props) => {
  const person = props.data;
  const { full_name, email, cell_phone_number, deletedDate = null } = person;

  const isDeletedPerson = deletedDate !== null;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant={'ghost'}
          className={cn(
            'w-auto h-auto p-0 font-semibold',
            isDeletedPerson && 'opacity-75 cursor-not-allowed grayscale'
          )}
        >
          {props.children}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="overflow-hidden w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <Link
              to={props.routeToNavigate}
              className="text-sm font-semibold capitalize hover:underline underline-offset-2 text-muted-foreground text-ellipsis text-wrap hover:text-primary"
              target="_blank"
              tabIndex={isDeletedPerson ? -1 : 0}
              aria-disabled={isDeletedPerson}
              onClick={isDeletedPerson ? (e) => e.preventDefault() : undefined}
              style={
                isDeletedPerson
                  ? { pointerEvents: 'none', opacity: 0.6 }
                  : undefined
              }
            >
              {full_name}
            </Link>
            <p className="text-xs break-words whitespace-pre-line">
              <span className="mr-2 font-semibold ">Correo:</span>
              <span className="break-all">{email}</span>
            </p>
            <p className="text-xs">
              <span className="mr-2 font-semibold">Número celular:</span>
              <span>{cell_phone_number}</span>
            </p>
            {isDeletedPerson && (
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
