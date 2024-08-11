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
import { useEffect } from "react";
import { toast } from "sonner";

export const HarvestModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    search = "",
    crop = "",
    after_date,
    before_date,
  } = Object.fromEntries(searchParams.entries());

  const { query, pagination, setPagination } = useGetAllHarvests({
    searchParameter: search,
    crop,
    after_date,
    before_date,
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

  if (query.isLoading) return <Loading />;
  if (query.isError || !query.data) return <ErrorLoading />;

  const { date, type } = getDateSelection();

  return (
    <>
      <BreadCrumb finalItem="Cosechas" />
      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        <SearchBarHarvest crop={crop} date={date} time_date={type} />
        <div className="flex items-start justify-between gap-2 w-[800px] p-1">
          <ToolTipTemplate content="Crear">
            <Button
              className="bg-blue-600 rounded-full hover:bg-blue-400"
              onClick={() => navigate("../create")}
            >
              <PlusIcon className="w-4 h-4 mr-2" /> Crear
            </Button>
          </ToolTipTemplate>
        </div>
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
