import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";

import { FormatDate } from "@/modules/core/helpers/FormatDate";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";

import { Badge } from "@/components";
import { PaymentPending } from "../../interfaces/PaymentPending";
import { addRecordToPay, calculateTotal } from "../../utils/paymentSlice";
import { ActionsTablePaymentsPendingWork } from "./ActionsTablePaymentsPendingWork";

export const columnsPaymentsPendingWork: ColumnDef<PaymentPending>[] = [
  {
    accessorKey: "work",
    cell: ({ row }: any) => {
      const work = row?.getValue("work");
      if (work) {
        return FormatDate({ date: work.date });
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

export const columnsPaymentsPendingWorkActions = [
  ...columnsPaymentsPendingWork,
  {
    id: "actions",
    cell: ({ row }: any) => {
      const workDetail = row.original;

      const {
        work: { date },
        id,
        total,
        value_pay,
        payment_is_pending,
      } = workDetail;

      const dispatch = useAppDispatch();

      const handlePayRecord = () => {
        dispatch(
          addRecordToPay({
            date,
            id,
            total,
            value_pay,
            payment_is_pending,
            type: "work",
            work: { id: workDetail?.work?.id },
          })
        );
        dispatch(calculateTotal());
        toast.success(`Se ha añadido el trabajo para pagarlo`);
      };

      return (
        <ActionsTablePaymentsPendingWork
          id={workDetail.id}
          handlePayRecord={handlePayRecord}
        />
      );
    },
  },
];

export default {
  columnsPaymentsPendingWork,
  columnsPaymentsPendingWorkActions,
};
