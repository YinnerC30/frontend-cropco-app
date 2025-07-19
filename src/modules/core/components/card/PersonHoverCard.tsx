import { Button } from '@/components';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Client } from '@/modules/clients/interfaces/Client';
import { Employee } from '@/modules/employees/interfaces/Employee';
import { MODULE_EMPLOYEE_PATHS } from '@/modules/employees/routes/pathRoutes';
import { Supplier } from '@/modules/suppliers/interfaces/Supplier';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

interface Props extends PropsWithChildren {
  data: Employee | Client | Supplier;
}

export const PersonHoverCard: React.FC<Props> = (props: Props) => {
  const person = props.data;
  const { full_name, email, cell_phone_number, id } = person;
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
              to={MODULE_EMPLOYEE_PATHS.ViewOne + id}
              className="text-sm font-semibold capitalize hover:underline underline-offset-2 text-muted-foreground text-ellipsis text-wrap"
              target="_blank"
            >
              {full_name}
            </Link>
            <p className="text-xs break-words">Correo: {email}</p>
            <p className="text-xs">Número celular: {cell_phone_number}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
