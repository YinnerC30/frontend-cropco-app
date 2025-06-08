import { Button } from '@/components';
import { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import React from 'react';

interface Props<T> {
  column: Column<T, unknown>;
  label: string;
  className?: string;
}

export const ButtonHeaderTable = <T,>({
  column,
  label,
  className = '',
}: Props<T>) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    column.toggleSorting(column.getIsSorted() === 'asc');
  };
  return (
    <Button
      className={`px-0 hover:bg-transparent ${className} -ml-2`}
      variant="ghost"
      onClick={handleClick}
      type="button"
    >
      {label}
      <ArrowUpDown className="w-4 h-4 ml-2" />
    </Button>
  );
};

ButtonHeaderTable.displayName = 'ButtonHeaderTable';
