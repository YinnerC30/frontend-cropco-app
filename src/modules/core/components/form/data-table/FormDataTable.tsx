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
  validationDisabledCell?: (row: Row<any>) => boolean;
}
export const FormDataTable = memo(
  ({
    onCellDoubleClick,
    className,
    disabledDoubleClick = false,
    validationDisabledCell = () => false,
  }: Props) => {
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
              const disabledCell = validationDisabledCell(row);

              return (
                <TableRow
                  className={
                    disabledCell ? 'bg-red-500/30 hover:bg-red-500/30' : ''
                  }
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onDoubleClick={() => {
                    if (disabledCell) {
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
