import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import {
  Cell,
  flexRender,
  Header,
  HeaderGroup,
  Row,
} from '@tanstack/react-table';
import { memo } from 'react';
import { toast } from 'sonner';
import { useFormDataTableContext } from './FormDataTableContext';

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
            table.getRowModel().rows.map((row: Row<any>) => {
              const { deletedDate, payment_is_pending } = row.original;
              const isDisabled =
                deletedDate !== null || payment_is_pending === false;
              return (
                <TableRow
                  className={isDisabled ? 'bg-secondary' : ''}
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onDoubleClick={() => {
                    if (isDisabled) {
                      toast.info(
                        'No puedes modificar o eliminar este registro'
                      );
                      return;
                    }
                    if (!disabledDoubleClick) {
                      onCellDoubleClick(row.original);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell: Cell<any, unknown>) => (
                    <TableCell key={cell.id} className="py-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
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
