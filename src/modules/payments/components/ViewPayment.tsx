import { ScrollArea, Separator } from "@/components";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { ConvertStringToDate } from "@/modules/core/helpers/ConvertStringToDate";
import { useParams } from "react-router-dom";
import { useGetPayment } from "../hooks/useGetPayment";
import { FormPayment } from "./forms/FormPayment";

export const ViewPayment = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetPayment(id!);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorLoading />;
  }
  return (
    <>
      <BreadCrumb
        items={[{ link: "/payments/view/all", name: "Pagos" }]}
        finalItem={` Información del pago`}
      />

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <FormPayment
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
