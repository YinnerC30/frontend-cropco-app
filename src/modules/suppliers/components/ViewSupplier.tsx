import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { useParams } from "react-router-dom";
import { ErrorLoading, Loading } from "../../core/components";
import { useGetSupplier } from "../hooks/useGetSupplier";
import { FormSupplier } from "./FormSupplier";

export const ViewSupplier = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupplier(id!);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/suppliers/all", name: "Proveedores" }]}
        finalItem={`Información del proveedor`}
      />

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <FormSupplier
          defaultValues={{ ...data, company_name: undefined }}
          readOnly
        />
      </ScrollArea>
    </>
  );
};
