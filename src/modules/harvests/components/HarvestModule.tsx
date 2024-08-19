import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  DataTable,
  ErrorLoading,
  Loading,
  ToolTipTemplate,
} from "../../core/components";
import { DateTimeSelection } from "../../core/interfaces/DateTimeSelection";
import { MinorOrMajorSelection } from "../../core/interfaces/MinorOrMajorSelection";
import { useGetAllHarvests } from "../hooks/useGetAllHarvests";
import columnsHarvest from "./columns/ColumnsTableHarvest";
import { SearchBarHarvest } from "./SearchBarHarvest";

export const HarvestModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    search = "",
    crop = "",
    after_date,
    before_date,
    minor_total,
    major_total,
    minor_value_pay,
    major_value_pay,
  } = Object.fromEntries(searchParams.entries());

  const minor_total_value = parseInt(minor_total ?? "0", 10);
  const major_total_value = parseInt(major_total ?? "0", 10);

  const minor_value_pay_value = parseInt(minor_value_pay ?? "0", 10);
  const major_value_pay_value = parseInt(major_value_pay ?? "0", 10);

  const { query, pagination, setPagination } = useGetAllHarvests({
    searchParameter: search,
    crop,
    after_date,
    before_date,
    minor_total: minor_total_value,
    major_total: major_total_value,
    minor_value_pay: minor_value_pay_value,
    major_value_pay: major_value_pay_value,
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
  const getValuePaySelection = () => {
    if (minor_value_pay_value != 0)
      return {
        value_pay: minor_value_pay_value,
        type: MinorOrMajorSelection.MINOR,
      };
    if (major_value_pay_value != 0)
      return {
        value_pay: major_value_pay_value,
        type: MinorOrMajorSelection.MAJOR,
      };
    return { value_pay: undefined, type: undefined };
  };

  if (query.isLoading) return <Loading />;
  if (query.isError || !query.data) return <ErrorLoading />;

  const { date, type } = getDateSelection();
  const { total, type: typeTotal } = getTotalSelection();
  const { value_pay, type: typeValuePay } = getValuePaySelection();

  return (
    <>
      <BreadCrumb finalItem="Cosechas" />

      <ScrollArea className="w-full h-[80vh]">
        <div className="flex justify-evenly">
          <div className="w-[400px] border-r px-5">
            <ScrollArea className="w-full h-[80vh]">
              <SearchBarHarvest
                crop={crop}
                date={date}
                time_date={type}
                total={total}
                type_total={typeTotal}
                value_pay={value_pay}
                type_value_pay={typeValuePay}
              />
            </ScrollArea>
          </div>
          <div>
            <div className="flex  justify-end  gap-2 w-[700px] p-1">
              <ToolTipTemplate content="Crear">
                <Button
                  className="bg-blue-600 rounded-full hover:bg-blue-400"
                  onClick={() => navigate("../create")}
                >
                  <PlusIcon className="w-4 h-4 mr-2" /> Crear
                </Button>
              </ToolTipTemplate>
            </div>
            <div className="w-[700px]">
              <DataTable
                columns={columnsHarvest}
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

export default HarvestModule;
