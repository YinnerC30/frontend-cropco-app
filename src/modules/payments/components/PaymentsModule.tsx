import { Button } from "@/components/ui/button";

import { PlusIcon } from "@radix-ui/react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DataTable,
  ErrorLoading,
  Loading,
  ToolTipTemplate,
} from "../../core/components";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { ConvertStringToBoolean } from "@/modules/core/helpers/conversion/ConvertStringToBoolean";
import { DateTimeSelection } from "@/modules/core/interfaces/general/DateTimeSelection";
import { MinorOrMajorSelection } from "@/modules/core/interfaces/general/MinorOrMajorSelection";
import { useEffect } from "react";
import { toast } from "sonner";
import { useGetAllPayments } from "../hooks/useGetAllPayments";
import columnsPayment from "./columns/ColumnsTablePayments";
import { SearchBarPayments } from "./SearchBarPayments";

export const PaymentsModule = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const {
    search = "",
    employee = "",
    after_date,
    before_date,
    method_of_payment,
    minor_total,
    major_total,
    filter_by_method_of_payment = "false",
  } = Object.fromEntries(searchParams.entries());

  const minor_total_value = parseInt(minor_total ?? "0", 10);
  const major_total_value = parseInt(major_total ?? "0", 10);

  const filter_by_method_of_payment_value = ConvertStringToBoolean(
    filter_by_method_of_payment
  );

  const { query, pagination, setPagination } = useGetAllPayments({
    searchParameter: search,
    employee,
    after_date,
    before_date,
    method_of_payment,
    minor_total: minor_total_value,
    major_total: major_total_value,
    filter_by_method_of_payment: filter_by_method_of_payment_value,
  });

  useEffect(() => {
    if (query.isSuccess) {
      query?.data?.rows.length < 1 ? toast.success("No hay datos") : null;
    }
  }, [query.isSuccess]);

  const getDateSelection = () => {
    if (after_date) return { date: after_date, type: DateTimeSelection.after };
    if (before_date)
      return { date: before_date, type: DateTimeSelection.before };
    return { date: undefined, type: undefined };
  };
  const getTotalSelection = () => {
    if (minor_total_value != 0)
      return { total: minor_total_value, type: MinorOrMajorSelection.MINOR };
    if (major_total_value != 0)
      return { total: major_total_value, type: MinorOrMajorSelection.MAJOR };
    return { total: undefined, type: undefined };
  };

  if (query.isLoading) return <Loading />;
  if (query.isError || !query.data) return <ErrorLoading />;

  const { date, type } = getDateSelection();
  const { total, type: typeTotal } = getTotalSelection();

  if (query.isLoading) return <Loading />;

  if (query.isError || !query.data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb finalItem={`Pagos`} />

      <Separator className="my-2" />
      <div className="flex justify-evenly">
        <div>
          <SearchBarPayments
            employee={employee}
            date={date}
            time_date={type}
            total={total}
            type_total={typeTotal}
            filter_by_method_of_payment={filter_by_method_of_payment_value}
            method_of_payment={method_of_payment}
          />
        </div>
        <div>
          <ScrollArea className="w-full h-[80vh]">
            {/* TODO: Agregar filtros de fecha, empleado, método de pago */}
            <div className="flex items-center justify-between gap-2 w-[750px] p-1">
              <ToolTipTemplate content={"Crear"}>
                <Button
                  className="bg-blue-600 rounded-full hover:bg-blue-400"
                  onClick={() => navigate("../create")}
                >
                  <PlusIcon className="w-4 h-4 mr-2" /> Crear
                </Button>
              </ToolTipTemplate>
            </div>
            {/* TODO: Agregar filtros de fecha, empleado, método de pago, total a pagar */}
            {/* TODO: Eliminar acción de modificar registro */}
            <div className="w-[750px]">
              <DataTable
                columns={columnsPayment}
                rows={query.data?.rows ?? 0}
                data={query.data}
                pagination={pagination}
                setPagination={setPagination}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default PaymentsModule;
