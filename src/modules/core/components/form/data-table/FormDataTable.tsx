import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import { useFormDataTableContext } from './FormDataTableContext';
import {
  Cell,
  flexRender,
  Header,
  HeaderGroup,
  Row,
} from '@tanstack/react-table';
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
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: Header<any, unknown>) => {
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
            table.getRowModel().rows.map((row: Row<any>) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onDoubleClick={() => {
                  !disabledDoubleClick && onCellDoubleClick(row.original);
                }}
              >
                {row.getVisibleCells().map((cell: Cell<any, unknown>) => (
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
