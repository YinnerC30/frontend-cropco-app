import { ButtonHeaderTable } from '@/modules/core/components';

import { Badge } from '@/components';

import { formFieldsSupply } from '../../utils';

export const columnsTableSupplies = [
  {
    accessorKey: formFieldsSupply.name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupply.name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupply.brand.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupply.brand.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupply.unit_of_measure.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupply.unit_of_measure.label}
        />
      );
    },
    cell: ({ row }: any) => {
      const unitOfMeasure: string = row.getValue('unit_of_measure');
      return (
        <Badge variant={unitOfMeasure === 'GRAMOS' ? 'lime' : 'cyan'}>
          {unitOfMeasure}
        </Badge>
      );
    },
  },
  {
    accessorKey: formFieldsSupply.observation.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupply.observation.label}
        />
      );
    },
  },
];
