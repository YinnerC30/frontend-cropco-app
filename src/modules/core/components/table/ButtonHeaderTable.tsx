import { Button } from '@/components';
import { ArrowUpDown } from 'lucide-react';

import React from 'react';

interface Props {
  column: any;
  label: string;
  className?: string;
}

export const ButtonHeaderTable = React.forwardRef<HTMLButtonElement, Props>(
  ({ column, label, className = '' }, ref) => {
    return (
      <Button
        ref={ref}
        className={`px-0 hover:bg-transparent ${className} -ml-2`}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        {label}
        <ArrowUpDown className="w-4 h-4 ml-2" />
      </Button>
    );
  },
);

ButtonHeaderTable.displayName = 'ButtonHeaderTable';
