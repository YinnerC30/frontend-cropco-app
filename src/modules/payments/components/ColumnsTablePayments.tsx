import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

import { ActionsTable } from "@/modules/core/components";
import { FormatDate } from "@/modules/core/helpers/FormatDate";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";
import { Payment } from "../interfaces/Payment";
import { formFieldsPayment } from "../utils";
import { useDeletePayment } from "../hooks/useDeletePayment";
import { Badge } from "@/components";

export let columnsPayment: ColumnDef<Payment>[] = [
  {
    accessorKey: formFieldsPayment.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue("date") });
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {formFieldsPayment.date.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsPayment.employee.name,
    cell: ({ row }) => {
      const employee: any = row.getValue("employee");
      return employee.first_name;
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {formFieldsPayment.employee.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsPayment.method_of_payment.name,
    cell: ({ row }) => {
      const methodOfPayment = row.getValue("method_of_payment");
      let badge;
      switch (methodOfPayment) {
        case "EFECTIVO":
          badge = <Badge variant={"success"}>Efectivo</Badge>;
          break;
        case "TRANSFERENCIA":
          badge = <Badge variant={"destructive"}>Transferencia</Badge>;
          break;
        case "INTERCAMBIO":
          badge = <Badge variant={"default"}>Intercambio</Badge>;
          break;
        default:
          break;
      }
      return badge;
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {formFieldsPayment.method_of_payment.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsPayment.total.name,
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue("total"));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total a pagar:
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];

columnsPayment.push({
  id: "actions",
  cell: ({ row }: any) => {
    const { id } = row.original;

    const { mutate } = useDeletePayment();

    return <ActionsTable mutate={mutate} id={id} />;
  },
});

export default columnsPayment;
