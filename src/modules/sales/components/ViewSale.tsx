import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { useParams } from "react-router-dom";
import { useGetSale } from "../hooks";

import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { FormSale } from "./forms/FormSale";
import { ConvertStringToDate } from "@/modules/core/helpers/conversion/ConvertStringToDate";

export const ViewSale = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetSale(id!);

  // Render loading or error states
  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: "/sales/view/all", name: "Ventas" }]}
        finalItem={`Información de la venta`}
      />

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <FormSale
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
