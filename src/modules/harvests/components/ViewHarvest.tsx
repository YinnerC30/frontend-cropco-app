import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { ConvertStringToDate } from "@/modules/core/helpers/ConvertStringToDate";
import { useParams } from "react-router-dom";
import { ErrorLoading, Loading } from "../../core/components";
import { useGetHarvest } from "../hooks/useGetHarvest";
import { FormHarvest } from "./forms/FormHarvest";

export const ViewHarvest = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetHarvest(id!);

  if (isLoading) return <Loading />;

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/harvests/all", name: "Cosechas" }]}
        finalItem={` Información de la cosecha`}
      />

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <FormHarvest
          defaultValues={{
            ...data,
            date: ConvertStringToDate(data.date),
          }}
          readOnly
        />
      </ScrollArea>
    </>
  );
};
