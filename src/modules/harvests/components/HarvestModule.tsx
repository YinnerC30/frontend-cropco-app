import { Button } from "@/components/ui/button";

import { PlusIcon } from "@radix-ui/react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import {
  DataTable,
  ErrorLoading,
  Loading,
  ToolTipTemplate,
} from "../../core/components";
import { useGetAllHarvests } from "../hooks/useGetAllHarvests";
import columnsHarvest from "./columns/ColumnsTableHarvest";
import { SearchBarHarvest } from "./SearchBarHarvest";
import { DateTimeSelection } from "../interfaces/DateTimeSelection";

export const HarvestModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParameter = searchParams.get("search") || "";
  const cropParameter = searchParams.get("crop") || "";
  const afterDate = searchParams.get("after_date") || undefined;
  const beforeDate = searchParams.get("before_date") || undefined;

  const { query, pagination, setPagination } = useGetAllHarvests({
    searchParameter,
    crop: cropParameter,
    after_date: afterDate,
    before_date: beforeDate,
  });

  const existAfterDate = !!afterDate;
  const existBeforeDate = !!beforeDate;

  const giveDate = (stateAfterDate: boolean, stateBeforeDate: boolean) => {
    console.log(searchParams);
    if (stateAfterDate) {
      return afterDate;
    }
    if (stateBeforeDate) {
      return beforeDate;
    }
    return undefined;
  };

  if (query.isLoading) return <Loading />;

  if (query.isError || !query.data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb finalItem={`Cosechas`} />

      <Separator className="my-2" />

      <ScrollArea className="w-full h-[80vh]">
        {/* TODO: Agregar filtros de fecha y cultivo */}
        <SearchBarHarvest
          crop={cropParameter}
          date={giveDate(existAfterDate, existBeforeDate)}
          time_date={
            giveDate(existAfterDate, existBeforeDate) == undefined
              ? undefined
              : giveDate(existAfterDate, existBeforeDate)?.includes("after")
              ? DateTimeSelection.after
              : DateTimeSelection.before
          }
        />
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
        {/* TODO Agregar filtros de búsqueda por fecha, cultivo, total cosechado, valor a pagar */}
        <div className="w-[800px]">
          <DataTable
            columns={columnsHarvest}
            rows={query.data?.rows ?? 0}
            data={query.data}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </ScrollArea>
    </>
  );
};

export default HarvestModule;
