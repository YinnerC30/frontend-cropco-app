import { Button } from "@/components/ui/button";

import {
  ArrowUpDown
} from "lucide-react";


import { ColumnDef } from "@tanstack/react-table";

import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";

import { Badge } from "@/components";
import { FormatDate } from "@/modules/core/helpers/FormatDate";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";
import { FormatNumber } from "@/modules/core/helpers/FormatNumber";
import { PaymentPending } from "../../interfaces/PaymentPending";
import { addRecordToPay } from "../../utils/paymentSlice";
import { ActionsTablePaymentsPendingHarvest } from "./ActionsTablePaymentsPendingHarvest";

export const columnsPaymentsPendingHarvest: ColumnDef<PaymentPending>[] = [
  {
    accessorKey: "harvest",
    cell: ({ row }: any) => {
      const { date } = row?.getValue("harvest");
      if (date) {
        return FormatDate({ date });
      }
      return null;
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha:
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "total",
    cell: ({ row }) => {
      return FormatNumber(row.getValue("total"));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Total cosechado:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "value_pay",
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue("value_pay"));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Total a recibir:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "payment_is_pending",
    cell: ({ row }) => {
      const value = row.getValue("payment_is_pending");
      return value ? (
        <Badge variant={"destructive"}>SI</Badge>
      ) : (
        <Badge variant={"success"}>NO</Badge>
      );
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Pago pendiente:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];

export const columnsPaymentsPendingHarvestActions = [
  ...columnsPaymentsPendingHarvest,
  {
    id: "actions",
    cell: ({ row }: any) => {
      const harvestDetail = row.original;

      const dispatch = useAppDispatch();

      const handlePayRecord = () => {
        // dispatch(remove(harvestDetail));
        dispatch(addRecordToPay({ ...harvestDetail, type: "harvest" }));
        toast.success(`Se ha añadido la cosecha para pagarla`);
      };

      return (
        <ActionsTablePaymentsPendingHarvest
          id={harvestDetail.id}
          handlePayRecord={handlePayRecord}
        />
      );
    },
  },
];

export default {
  columnsPaymentsPendingHarvest,
  columnsPaymentsPendingHarvestActions,
};
