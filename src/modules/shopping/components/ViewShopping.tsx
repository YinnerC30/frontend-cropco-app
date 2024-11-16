import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { useParams } from "react-router-dom";

import { ConvertStringToDate } from "@/modules/core/helpers/conversion/ConvertStringToDate";
import { useGetShopping } from "../hooks/useGetShopping";
import { FormShopping } from "./forms/FormShopping";

export const ViewShopping = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetShopping(id!);

  // Render loading or error states
  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: "/shopping/view/all", name: "Compras" }]}
        finalItem={`Información de la compra`}
      />
      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <FormShopping
          defaultValues={{ ...data, date: ConvertStringToDate(data.date) }}
          readOnly
        />
      </ScrollArea>
    </>
  );
};
