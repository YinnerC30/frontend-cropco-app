import { ButtonHeaderTable } from "@/modules/core/components/table/ButtonHeaderTable";
import { ColumnDef } from "@tanstack/react-table";

import { formFields } from "../../clients/utils";
import { User } from "../interfaces/User";
import { ActionsTableUsers } from "./ActionsTableUsers";

export const columnsTableUsers: ColumnDef<User>[] = [
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
    id: "actions",
    cell: ActionsTableUsers,
  },
];

export default columnsTableUsers;
