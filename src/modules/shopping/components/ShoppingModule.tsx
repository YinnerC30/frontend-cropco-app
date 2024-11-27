import { Button, ScrollArea, Separator } from "@/components";
import {
  DataTable,
  ErrorLoading,
  Loading,
  ToolTipTemplate,
} from "@/modules/core/components";
import { PlusIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllShopping } from "../hooks/useGetAllShopping";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import columnsShopping from "./columns/ColumnsTableShopping";
import { DateTimeSelection } from "@/modules/core/interfaces/general/DateTimeSelection";
import { MinorOrMajorSelection } from "@/modules/core/interfaces/general/MinorOrMajorSelection";
import { SearchBarShopping } from "./SearchBarShopping";
import { useEffect } from "react";
import { toast } from "sonner";

export const ShoppingModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    after_date = "",
    before_date = "",
    minor_total = "",
    major_total = "",
  } = Object.fromEntries(searchParams.entries());

  

  
  const minor_total_value = parseInt(
    minor_total.length > 0 ? minor_total : "0",
    10
  );
  const major_total_value = parseInt(
    major_total.length > 0 ? major_total : "0",
    10
  );

  const { query, pagination, setPagination } = useGetAllShopping({
    after_date,
    before_date,
    minor_total: minor_total_value,
    major_total: major_total_value,
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

  const { date, type } = getDateSelection();
  const { total, type: typeTotal } = getTotalSelection();

  if (query.isLoading) return <Loading />;

  if (query.isError || !query.data) {
    return <ErrorLoading />;
  }
  return (
    <>
      <BreadCrumb finalItem={`Compras`} />

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        <div className="flex justify-evenly">
          <div className="w-[400px] border-r px-5">
            <ScrollArea className="w-full h-[80vh]">
              <SearchBarShopping
                date={date}
                time_date={type}
                total={total}
                type_total={typeTotal}
              />
            </ScrollArea>
          </div>

          <div>
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
            {/* TODO: Agregar filtros de fecha y total */}
            <div className="w-[800px]">
              <DataTable
                columns={columnsShopping}
                rows={query.data?.rows ?? 0}
                data={query.data}
                pagination={pagination}
                setPagination={setPagination}
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
};
export default ShoppingModule;
