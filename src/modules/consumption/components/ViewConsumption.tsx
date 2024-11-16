import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useConsumptionForm } from "../hooks/useConsumptionForm";
import { useGetConsumption } from "../hooks/useGetConsumption";
import { reset } from "../utils/consumptionSlice";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { ConvertStringToDate } from "@/modules/core/helpers/conversion/ConvertStringToDate";
import { FormConsumption } from "./forms/FormConsumption";

export const ViewConsumption = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetConsumption(id!);

  const { dispatch } = useConsumptionForm();

  useEffect(() => {
    dispatch(reset());
  }, []);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: "/consumption/view/all", name: "Consumos" }]}
        finalItem={`Información del consumo`}
      />

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <FormConsumption
          defaultValues={{ ...data, date: ConvertStringToDate(data.date) }}
          readOnly
        />
      </ScrollArea>
    </>
  );
};
