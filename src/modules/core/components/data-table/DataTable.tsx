import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { flexRender } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { ScrollArea, ScrollBar } from '@/components';
import { memo } from 'react';
import { Loading } from '../shared/Loading';
import { useDataTableContext } from './DataTableContext';

export const DataTable = memo(() => {
  const { table, disabledDoubleClick, errorMessage, lengthColumns, isLoading } =
    useDataTableContext();
  const navigate = useNavigate();

  return (
    <ScrollArea
      className="h-[50vh] pb-2 border  rounded-sm py-2 px-3"
      type="auto"
    >
      <Table className="mb-4">
        <TableHeader className="w-auto overflow-hidden shadow-md">
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={lengthColumns} className="h-24 text-center">
                <Loading />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: any) => (
              <TableRow
                className=""
                key={row.id}
                onDoubleClick={() => {
                  if (!disabledDoubleClick) {
                    navigate(`../view/one/${row.original.id}`);
                  }
                }}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={lengthColumns} className="h-24 text-center">
                {errorMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ScrollBar className="mt-4" orientation="horizontal" />
    </ScrollArea>
  );
});
