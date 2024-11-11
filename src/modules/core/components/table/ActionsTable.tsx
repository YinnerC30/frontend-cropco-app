import { Button } from '@/components/ui/button';

import { MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
  open: boolean;
  onChange: any;
  children: any;
}

export const ActionsTable = ({ open, onChange, children }: Props) => {
  return (
    <DropdownMenu open={open} modal={onChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-8 h-8 p-0 "
          onClick={() => onChange(!open)}
        >
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onPointerDownOutside={() => onChange(false)}
        align="center"
        className="flex flex-col items-center gap-1 "
      >
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator className="w-full" />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
