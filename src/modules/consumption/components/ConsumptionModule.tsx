import { Button, ScrollArea, Separator } from "@/components";
import {
  DataTable,
  ErrorLoading,
  Loading,
  ToolTipTemplate,
} from "@/modules/core/components";
import { BreadCrumb } from "@/modules/core/components/";
import { TypeFilterDate } from "@/modules/core/interfaces/general/TypeFilterDate";
import { PlusIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllConsumptions } from "../hooks/useGetAllConsumptions";
import columnsConsumption from "./columns/ColumnsTableConsumption";
import { SearchBarConsumption } from "./SearchBarConsumption";

export const ConsumptionModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { after_date, before_date } = Object.fromEntries(
    searchParams.entries()
  );

  const { query, pagination, setPagination } = useGetAllConsumptions({
    after_date,
    before_date,
  });

  const getDateSelection = () => {
    if (after_date) return { date: after_date, type: TypeFilterDate.after };
    if (before_date)
      return { date: before_date, type: TypeFilterDate.before };
    return { date: undefined, type: undefined };
  };

  const { date, type } = getDateSelection();

  if (query.isLoading) return <Loading />;

  if (query.isError || !query.data) {
    return <ErrorLoading />;
  }
  return (
    <>
      <BreadCrumb finalItem={`Consumos`} />

      <Separator className="my-2" />

      <ScrollArea className="w-full h-[80vh]">
        <div className="flex justify-evenly">
          <div className="w-[400px] border-r px-5">
            <ScrollArea className="w-full h-[80vh]">
              <SearchBarConsumption date={date} time_date={type} />
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
            {/* TODO: Agregar filtros de fecha */}
            <div className="w-[550px]">
              <DataTable
                columns={columnsConsumption}
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
export default ConsumptionModule;
