import { ColumnDef, HeaderContext } from '@tanstack/react-table';

import { ButtonHeaderTable } from '@/modules/core/components';
import { FormatDate } from '@/modules/core/helpers/formatting/FormatDate';
import { FormatMoneyValue } from '@/modules/core/helpers/formatting/FormatMoneyValue';

import { Badge, Button } from '@/components';
import { Harvest, HarvestDetail } from '../../interfaces';
import { formFieldsHarvest } from '../../utils';
import { CellHarvestAmount } from './CellHarvestAmount';
import { PersonHoverCard } from '../../../core/components/card/PersonHoverCard';
import { Employee } from '@/modules/employees/interfaces/Employee';
import { CropHoverCard } from '@/modules/crops/components/card/CropHoverCard';
import { Crop } from '@/modules/crops/interfaces/Crop';
import { MODULE_EMPLOYEE_PATHS } from '@/modules/employees/routes/pathRoutes';

export const columnsHarvest: ColumnDef<Harvest>[] = [
  {
    accessorKey: formFieldsHarvest.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue('date') });
    },
    header: ({ column }: HeaderContext<Harvest, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.date.label}
        />
      );
    },
  },
  {
    accessorKey: 'crop',
    header: ({ column }: HeaderContext<any, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.crop.label}
        />
      );
    },
    cell: ({ row: { original } }) => {
      const crop = original.crop as any;
      return (
        <CropHoverCard data={crop as Crop}>
          <Badge className="mb-1 mr-1" variant={'purple'}>
            {crop.name}
          </Badge>
        </CropHoverCard>
      );
    },
  },
  {
    accessorKey: 'details',
    header: ({ column }) => (
      <ButtonHeaderTable column={column} label="Empleados:" />
    ),
    cell: ({ row: { original } }) => {
      const employees = original.details.map(({ employee }) => employee);
      const maxVisible = 4;
      const hiddenCount = employees.length - maxVisible;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {employees.slice(0, maxVisible).map((employee, index) => (
            <PersonHoverCard
              data={employee as Employee}
              routeToNavigate={MODULE_EMPLOYEE_PATHS.ViewOne + employee.id}
            >
              <Badge
                key={`${employee?.id}-${index}`}
                className="mb-1 mr-1"
                variant={'orange'}
              >
                {employee.full_name}
              </Badge>
            </PersonHoverCard>
          ))}

          {hiddenCount > 0 && (
            <Button className="h-4 py-3 text-xs font-semibold cursor-pointer">{`Otros... (${hiddenCount})`}</Button>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: formFieldsHarvest.amount.name,
    cell: ({ row }) => <CellHarvestAmount row={row} />,
    header: ({ column }: HeaderContext<Harvest, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.amount.label}
        />
      );
    },
  },

  {
    accessorKey: formFieldsHarvest.value_pay.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue('value_pay'));
    },
    header: ({ column }: HeaderContext<Harvest, unknown>) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsHarvest.value_pay.label}
        />
      );
    },
  },
  {
    id: 'payment_pending_status',
    accessorKey: 'details',
    cell: ({ row }) => {
      const array: HarvestDetail[] = row.getValue('details') ?? [];
      const result = array.some((item) => item.payment_is_pending);
      return result ? (
        <Badge variant={'destructive'}>SI</Badge>
      ) : (
        <Badge variant={'success'}>NO</Badge>
      );
    },
    header: ({ column }: HeaderContext<Harvest, unknown>) => {
      return (
        <ButtonHeaderTable column={column} label={'¿Hay pagos pendientes?'} />
      );
    },
  },
];

export default columnsHarvest;
