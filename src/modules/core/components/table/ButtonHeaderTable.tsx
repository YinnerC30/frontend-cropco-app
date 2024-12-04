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
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      column.toggleSorting(column.getIsSorted() === 'asc');
    };
    return (
      <Button
        ref={ref}
        className={`px-0 hover:bg-transparent ${className} -ml-2`}
        variant="ghost"
        onClick={handleClick}
      >
        {label}
        <ArrowUpDown className="w-4 h-4 ml-2" />
      </Button>
    );
  }
);

ButtonHeaderTable.displayName = 'ButtonHeaderTable';
