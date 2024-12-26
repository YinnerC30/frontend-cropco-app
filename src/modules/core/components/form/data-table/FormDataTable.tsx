import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import { useFormDataTableContext } from './FormDataTableContext';
import { flexRender } from '@tanstack/react-table';
import { memo } from 'react';

interface Props {
  onCellDoubleClick: (data: any) => void;
  className?: string;
  disabledDoubleClick?: boolean;
}
export const FormDataTable = memo(
  ({ onCellDoubleClick, className, disabledDoubleClick = false }: Props) => {
    const { table, lengthColumns } = useFormDataTableContext();
    return (
      <Table className={`${className}`}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: any) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onDoubleClick={() => {
                  !disabledDoubleClick && onCellDoubleClick(row.original);
                }}
              >
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell key={cell.id} className="py-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={lengthColumns} className="h-24 text-center">
                No hay registros.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
);
