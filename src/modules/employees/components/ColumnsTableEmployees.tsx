import { ButtonHeaderTable } from "../../core/components";

import { ColumnDef } from "@tanstack/react-table";

import { Employee } from "../interfaces/Employee";
import { formFieldsEmployee } from "../utils";
import { ActionsTableEmployees } from "./ActionsTableEmployees";

export const columnsTableEmployees: ColumnDef<Employee>[] = [
  {
    accessorKey: formFieldsEmployee.first_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsEmployee.first_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsEmployee.last_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsEmployee.last_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsEmployee.email.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsEmployee.email.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsEmployee.cell_phone_number.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsEmployee.cell_phone_number.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsEmployee.address.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsEmployee.address.label}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ActionsTableEmployees,
  },
];

export default columnsTableEmployees;
