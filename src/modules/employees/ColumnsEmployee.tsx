import { ColumnDef } from "@tanstack/react-table";

import { Employee } from "@/modules/employees/Employee";
import { formFields } from "./ElementsEmployeeForm";
import { useDeleteEmployee } from "./hooks/useDeleteEmployee";
import { ButtonHeaderTable, ActionsTable } from "../core/components";

export let columns: ColumnDef<Employee>[] = [
  {
    accessorKey: formFields.first_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFields.first_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFields.last_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.last_name.label} />
      );
    },
  },
  {
    accessorKey: formFields.email.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.email.label} />
      );
    },
  },
  {
    accessorKey: formFields.cell_phone_number.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFields.cell_phone_number.label}
        />
      );
    },
  },
  {
    accessorKey: formFields.address.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.address.label} />
      );
    },
  },
];

columns.push({
  id: "actions",
  cell: ({ row }: any) => {
    const client = row.original;
    const { id } = client;
    const { mutate } = useDeleteEmployee();
    return <ActionsTable mutate={mutate} id={id} />;
  },
});

export default columns;
