import { Button } from "@/components/ui/button";

import { PlusIcon } from "@radix-ui/react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { ConvertStringToBoolean } from "@/modules/core/helpers/ConvertStringToBoolean";
import { DateTimeSelection } from "@/modules/core/interfaces/DateTimeSelection";
import { MinorOrMajorSelection } from "@/modules/core/interfaces/MinorOrMajorSelection";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  DataTable,
  ErrorLoading,
  Loading,
  ToolTipTemplate,
} from "../../core/components";
import { useGetAllSales } from "../hooks";
import columnsSale from "./columns/ColumnsTableSale";
import { SearchBarSale } from "./SearchBarSale";

export const SaleModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    after_date,
    before_date,
    minor_total,
    major_total,
    minor_quantity,
    major_quantity,
    filter_by_is_receivable = "false",
    is_receivable = "false",
  } = Object.fromEntries(searchParams.entries());

  const minor_total_value = parseInt(minor_total ?? "0", 10);
  const major_total_value = parseInt(major_total ?? "0", 10);

  const minor_quantity_value = parseInt(minor_quantity ?? "0", 10);
  const major_quantity_value = parseInt(major_quantity ?? "0", 10);

  const filter_by_is_receivable_value = ConvertStringToBoolean(
    filter_by_is_receivable
  );
  const is_receivable_value = ConvertStringToBoolean(is_receivable);

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
  const getQuantitySelection = () => {
    if (minor_quantity_value != 0)
      return {
        quantity: minor_quantity_value,
        type: MinorOrMajorSelection.MINOR,
      };
    if (major_quantity_value != 0)
      return {
        quantity: major_quantity_value,
        type: MinorOrMajorSelection.MAJOR,
      };
    return { quantity: undefined, type: undefined };
  };

  const { date, type } = getDateSelection();
  const { total, type: typeTotal } = getTotalSelection();
  const { quantity, type: typeQuantity } = getQuantitySelection();

  const { query, pagination, setPagination } = useGetAllSales({
    searchParameter: "",
    after_date,
    before_date,
    minor_total: minor_total_value,
    major_total: major_total_value,
    minor_quantity: minor_quantity_value,
    major_quantity: major_quantity_value,
    filter_by_is_receivable: filter_by_is_receivable_value,
    is_receivable: is_receivable_value,
  });

  useEffect(() => {
    if (query.isSuccess) {
      query?.data?.rows.length < 1 ? toast.success("No hay datos") : null;
    }
  }, [query.isSuccess]);

  if (query.isLoading) return <Loading />;

  if (query.isError || !query.data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb finalItem={`Ventas`} />

      <Separator className="my-2" />

      <div className="flex justify-evenly">
        <div className="w-[400px] border-r px-5">
          <ScrollArea className="w-full h-[80vh]">
            <SearchBarSale
              date={date}
              time_date={type}
              total={total}
              type_total={typeTotal}
              quantity={quantity}
              type_quantity={typeQuantity}
              filter_by_is_receivable={filter_by_is_receivable_value}
              is_receivable={is_receivable_value}
            />
          </ScrollArea>
        </div>
        <div>
          <ScrollArea className="w-full h-[80vh]">
            {/* TODO: Agregar filtros de fecha, pago pendiente */}
            <div className="flex items-start justify-between gap-2 w-[800px] p-1">
              <ToolTipTemplate content={"Crear"}>
                <Button
                  className="bg-blue-600 rounded-full hover:bg-blue-400"
                  onClick={() => navigate("../create")}
                >
                  <PlusIcon className="w-4 h-4 mr-2" /> Crear
                </Button>
              </ToolTipTemplate>
            </div>
            {/* TODO: Agregar filtros de fecha, cantidad, total, pendiente de pago */}
            <div className="w-[800px]">
              <DataTable
                columns={columnsSale}
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

export default SaleModule;
